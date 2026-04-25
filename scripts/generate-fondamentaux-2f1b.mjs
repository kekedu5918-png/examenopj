/**
 * Phase 2F.1.b — génère les fiches `content/cours` depuis FONDAMENTAUX.pdf
 * (sauf pilotes 1, 19, 31, sauf `--all`).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import sharp from 'sharp';

import { FONDAMENTAUX_CHAPITRES } from './lib/fondamentaux-annexe-b.mjs';
import { bodyToMarkdown, parseHeaderLine } from './lib/fondamentaux-md-convert.mjs';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const PDF_PATH = path.join(root, 'content/_sources/fondamentaux-2026/FONDAMENTAUX.pdf');
const OUT_COURS = path.join(root, 'content/cours');
const OUT_IMG = path.join(root, 'public/fondamentaux');
const RAPPORT = path.join(root, 'docs/audits/2f1b-rapport-qualite-ocr.md');
const ARTICLES = path.join(root, 'docs/audits/2f1b-articles-cites.md');

const PILOTS = new Set([1, 19, 31]);
const args = new Set(process.argv.slice(2));
const FORCE_PILOTS = args.has('--all');

function extractChapterText(fullText, n) {
  const start = fullText.indexOf(`CHAPITRE ${n} `);
  if (start < 0) throw new Error(`CHAPITRE ${n} not found`);
  const end = n === 46 ? fullText.length : fullText.indexOf(`CHAPITRE ${n + 1} `, start);
  if (n < 46 && end < 0) throw new Error(`CHAPITRE ${n + 1} not found after ${n}`);
  return fullText.slice(start, end);
}

function pageNumbersInChunk(chunk) {
  return [...new Set([...chunk.matchAll(/--\s*(\d+)\s+of\s*74\s*--/g)].map((m) => +m[1]))].sort(
    (a, b) => a - b,
  );
}

/**
 * @param {string} chunk texte d'un seul chapitre
 * @returns {number[]} numéros de page dont le contenu (après le marqueur) contient Schéma/Tableau
 */
function findSchemaTablePagesInChunk(chunk) {
  const parts = chunk.split(/--\s*(\d+)\s+of\s*74\s*--/);
  const out = [];
  for (let p = 1; p < parts.length; p += 2) {
    const n = +parts[p];
    const after = parts[p + 1] || '';
    if (after && /schéma|tableau/i.test(after.slice(0, 2000))) out.push(n);
  }
  return out;
}

function stripFootersAndNoise(raw) {
  return raw
    .replace(/\n--\s*\d+\s+of\s*74\s*--/g, '\n')
    .replace(/SYNTHÈSE OPJ[^\n]*/g, '')
    .replace(/©\s*Synthèse[^\n]*/g, '')
    .replace(/examenopj\.fr/g, '')
    .replace(/Page \d+[^\n]*/g, '')
    .replace(/\n{3,}/g, '\n\n');
}

const ART_PATTERNS = [
  /art\.\s*[\d-]+(?:\s*al\.\s*\d+)?(?:\s*C\.\s*p\.?e?n\.?|CPP|C\.?P\.?P\.?)?/gi,
  /L\.\s*[\d-]+(?:\s*CJPM)?/gi,
  /R\.\s*11[-\d]*/gi,
  /loi\s*n[°o]?\s*[\d-]+/gi,
];

function extractArticlesCites(bodiesText) {
  const byKey = new Map();
  for (const re of ART_PATTERNS) {
    re.lastIndex = 0;
    let m;
    const t = bodiesText;
    while ((m = re.exec(t)) != null) {
      let s = m[0].replace(/\s+/g, ' ').trim();
      if (s.length < 4 || s.length > 100) continue;
      if (/^l\.\s*\d$/.test(s)) continue;
      s = s.replace(/^art\./i, 'art.');
      const key = s.toLowerCase();
      if (!byKey.has(key)) byKey.set(key, s);
    }
  }
  return [...byKey.values()].sort((a, b) => a.localeCompare(b, 'fr'));
}

function tagsForPartie(p) {
  const base = ['fondamentaux', `Partie ${p}`, '2F.1.b'];
  if (p === 'I') base.push('procédure');
  if (p === 'II') base.push('mesures enquête');
  if (p === 'III') base.push('phase juridictionnelle');
  if (p === 'IV') base.push('droit pénal général');
  if (p === 'V') base.push('droit pénal spécial');
  if (p === 'VI') base.push('transversal', 'OPJ 2026');
  return base;
}

function hasLoi2025(text) {
  return /20\s?25[–-]?\d{3}|\b2025[-–]\d{2,3}\b|loi\s*n[°o]?\s*20\s*25|loi\s*20\s*25[-–]?\d/i.test(
    text,
  );
}

function buildFrontmatter({ titre, desc, tags, partie, ch, loi2025, articlesCites }) {
  const y = (s) => JSON.stringify(s);
  const list = articlesCites.slice(0, 100);
  const acYaml = list.length
    ? `articlesCites:\n${list.map((a) => `  - ${y(a)}`).join('\n')}`
    : 'articlesCites: []';
  return `---
title: ${y(titre)}
description: ${y(desc)}
tags: ${JSON.stringify(tags)}
partie: ${y(partie)}
chapitre: ${ch}
derniereMiseAJour: "2025-12-01"
loi2025: ${loi2025}
${acYaml}
---
`;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const buf = await fs.readFile(PDF_PATH);
  const parser = new PDFParse({ data: buf });
  const { text: full } = await parser.getText();

  const chapterBlocks = new Map();
  for (const c of FONDAMENTAUX_CHAPITRES) {
    chapterBlocks.set(c.ch, extractChapterText(full, c.ch));
  }
  await parser.destroy();

  const parser2 = new PDFParse({ data: buf });

  await fs.mkdir(OUT_COURS, { recursive: true });
  await fs.mkdir(OUT_IMG, { recursive: true });
  const rapport = [];
  const articlesList = [
    '# Citations (regex) — 2F.1.b\n',
    '*Génération automatique — relecture juridique 2F.1.c requise.*\n\n',
  ];
  const overwrites = [];
  const newSlugs = [];
  const imagesWritten = new Set();

  for (const meta of FONDAMENTAUX_CHAPITRES) {
    if (PILOTS.has(meta.ch) && !FORCE_PILOTS) {
      rapport.push(
        `### ch. ${meta.ch} — \`${meta.slug}.md\` — **PILOTE 2F.1.a (conservé)**\n- Non régénéré. Relecture 2F.1.c.\n`,
      );
      const pilotPath = path.join(OUT_COURS, `${meta.slug}.md`);
      const p = await fs.readFile(pilotPath, 'utf8');
      const ac = extractArticlesCites(p);
      articlesList.push(`## ${meta.slug}.md (pilote 2F.1.a)\n\n`);
      for (const a of ac.slice(0, 150)) {
        articlesList.push(`- ${a}\n`);
      }
      articlesList.push('\n');
      continue;
    }

    const raw = chapterBlocks.get(meta.ch);
    const cleaned = stripFootersAndNoise(raw);
    const { title: pdfTitle } = parseHeaderLine(cleaned.split('\n')[0]?.trim() || '');
    const displayTitle = meta.titre || pdfTitle;
    const bodyMd = bodyToMarkdown(cleaned, { titre: displayTitle });
    const combined = bodyMd;
    const articlesCites = extractArticlesCites(combined);
    const loi2025 = meta.ch === 31 || meta.ch === 44 || hasLoi2025(combined);

    const firstWords = bodyMd
      .replace(/^#.+$/m, '')
      .replace(/[#>*]/g, '')
      .slice(0, 220)
      .trim();
    const desc = `${displayTitle} — Fiche synthèse (session JUIN 2026). ${firstWords.replace(/\s+/g, ' ').slice(0, 200)}${
      firstWords.length > 200 ? '…' : ''
    }`.replace(/\n/g, ' ');

    const fm = buildFrontmatter({
      titre: displayTitle,
      desc,
      tags: tagsForPartie(meta.partie),
      partie: meta.partie,
      ch: meta.ch,
      loi2025,
      articlesCites,
    });

    const pages = pageNumbersInChunk(raw);
    const schemaPages = findSchemaTablePagesInChunk(raw);
    const pickPages = (schemaPages.length ? schemaPages : pages).slice(0, 2);

    const outPath = path.join(OUT_COURS, `${meta.slug}.md`);
    const existedBefore = await fileExists(outPath);
    if (existedBefore) {
      if (meta.reuse17) overwrites.push(meta.slug);
    } else {
      newSlugs.push(meta.slug);
    }

    const imgRefs = [];
    for (const pageNum of pickPages) {
      const type = schemaPages.includes(pageNum) ? 'schema' : 'tableau';
      const fname = `${meta.slug}-${type}-p${pageNum}.jpg`;
      if (!imagesWritten.has(fname)) {
        const shot = await parser2.getScreenshot({
          partial: [pageNum],
          scale: 1.1,
          imageDataUrl: false,
          imageBuffer: true,
        });
        const page = shot.pages[0];
        if (page?.data) {
          const jpeg = await sharp(Buffer.from(page.data)).jpeg({ quality: 84 }).toBuffer();
          await fs.writeFile(path.join(OUT_IMG, fname), jpeg);
          imagesWritten.add(fname);
        }
      }
      imgRefs.push(`![p. ${pageNum}](${path.posix.join('/fondamentaux', fname)})`);
    }

    const md = `${fm}\n${imgRefs.length ? imgRefs.join('\n') + '\n\n' : ''}${combined}`;

    await fs.writeFile(outPath, md, 'utf8');

    const uncertain = [];
    if (/L\.\s*121-/.test(combined)) uncertain.push('L. 121-… (recoupement code)');
    if (hasLoi2025(combined) && meta.ch !== 31 && meta.ch !== 44) uncertain.push('loi 2025 (signalement regex — valider le fond)');
    if (bodyMd.length < 400) uncertain.push('corps court (structure PDF / tableaux imparfaits)');
    if (!schemaPages.length && pages.length) uncertain.push('aucune page repérée Schéma/Tableau — image(s) = premières pages du chapitre');
    uncertain.push('conversion automatique (tableaux GFM : relecture 2F.1.c)');

    rapport.push(
      `### ch. ${meta.ch} — \`${meta.slug}.md\`\n- **Pages (repères)** : ${pages.join(', ') || '—'}\n- **Images** : ${pickPages.map((p) => `${meta.slug}-*-p${p}.jpg`).join(', ') || '—'}\n- **[OCR_INCERTAIN]** : ${uncertain.join(' — ')}\n`,
    );

    articlesList.push(`## ${meta.slug}.md\n\n`);
    for (const a of articlesCites) {
      articlesList.push(`- ${a}\n`);
    }
    articlesList.push('\n');
  }

  await parser2.destroy();

  const uniqueOw = [...new Set(overwrites)];
  const slugsJamaisAnciens = FONDAMENTAUX_CHAPITRES.filter(
    (c) => !PILOTS.has(c.ch) && !c.reuse17,
  ).map((c) => c.slug);

  await fs.writeFile(
    RAPPORT,
    `# Rapport qualité 2F.1.b — 43 chapitres générés (PDF + pipeline)\n\n**Date (UTC)** : ${new Date().toISOString()}\n\n## Contexte\n\n- Source : \`content/_sources/fondamentaux-2026/FONDAMENTAUX.pdf\` (74 p.).\n- **Pilotes 2F.1.a** (ch. 1, 19, 31) : **conservés** tels quels (pas de régénération).\n- **Fichiers remplacés (slug Annexe B = ancienne fiche des 17)** : **${uniqueOw.length}** — ${uniqueOw.map((s) => `\`${s}\``).join(', ')}.\n- **Nouveaux slugs (aucun .md homonyme avant 2F.1.b)** : **${slugsJamaisAnciens.length}** fiches : ${slugsJamaisAnciens.map((s) => `\`${s}\``).join(', ')}.\n- **DETTE 2F.1.c (relecture OPJ + corrections) — 46 fiches cibles**.\n  - *viol-agressions-sexuelles* (pilote) : **loi 2025-532** = narcotrafic (ne **pas** imputer aux infractions sexuelles) — **dette tracée** ; **loi 2025-623** = contextualiser (C. pén. + fascicule).\n  - Tous chapitres : tableaux, schémas raster, articles extraits par regex, encadrés repliés en bloc.\n\n## [OCR_INCERTAIN] par chapitre (relecture ciblée)\n\n${rapport.join('\n')}\n\n## Notes\n\n- Hors périmètre : deep-links, hub, 301 (phases 2F.2 / 2F.3).\n- Sitemap : une entrée par basename dans \`content/cours\` (46 + 8 fiches héritées hors Annexe = **54** .md possibles le temps de la cohabitation).\n`,
    'utf8',
  );
  await fs.writeFile(ARTICLES, articlesList.join(''), 'utf8');

  console.log('2F.1.b OK');
  console.log('Écrasements reuse17:', uniqueOw);
  console.log('Nouveaux slugs:', newSlugs.length);
  console.log('Images:', imagesWritten.size);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
