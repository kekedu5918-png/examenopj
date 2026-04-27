/**
 * Enrichit le frontmatter V3 des fiches `content/cours` depuis la synthèse 46 chapitres.
 * Préserve le corps markdown. Ignore les slugs dans SYNTHESE_ENRICH_SKIP_SLUGS.
 *
 * Usage : node scripts/enrich-cours-v3-from-synthese.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import yaml from 'js-yaml';

import { FONDAMENTAUX_CHAPITRES } from './lib/fondamentaux-annexe-b.mjs';
import {
  normalizeSyntheseChapters,
  SLUG_TO_SYNTHESE_CHAPTER,
  SYNTHESE_ENRICH_SKIP_SLUGS,
} from './lib/fondamentaux-synthese-chapter-map.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const coursDir = path.join(root, 'content/cours');
const syntheseDir = path.join(root, 'content/_sources/synthese-46-chapitres');

const SYNTHESE_FILES = [
  'chapitres-01-10.md',
  'chapitres-11-20.md',
  'chapitres-21-30.md',
  'chapitres-31-40.md',
  'chapitres-41-46.md',
];

const ROMAN_TO_NUM = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };

function clip(s, max) {
  if (!s || typeof s !== 'string') return '';
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + '…';
}

function sliceBetween(block, startTag, endTags) {
  const i = block.indexOf(startTag);
  if (i < 0) return '';
  const from = block.slice(i);
  let end = from.length;
  for (const tag of endTags) {
    const j = from.indexOf(tag, startTag.length);
    if (j >= 0 && j < end) end = j;
  }
  return from.slice(0, end).trim();
}

/** @returns {Map<number, string>} */
async function loadSyntheseChapters() {
  const map = new Map();
  for (const fn of SYNTHESE_FILES) {
    const raw = await fs.readFile(path.join(syntheseDir, fn), 'utf8');
    const re = /^CHAPITRE (\d+) — (.+)$/gm;
    let m;
    const matches = [];
    while ((m = re.exec(raw)) !== null) {
      matches.push({ n: +m[1], index: m.index });
    }
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index;
      const end = i + 1 < matches.length ? matches[i + 1].index : raw.length;
      map.set(matches[i].n, raw.slice(start, end).trim());
    }
  }
  return map;
}

function parseStats(statsSection) {
  const parts = statsSection
    .replace(/^📊 4 Stats clés\n?/m, '')
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean);
  const four = parts.slice(0, 4);
  while (four.length < 4) four.push('Repère — approfondir dans le corps de fiche.');
  return four.slice(0, 4).map((line, idx) => {
    const numMatch = line.match(
      /^(\+?\d[\d\s]*(?:ans|j|h|€)?|[<≤≥]\d+\s*ans?|\d+\/\d+|Art\.\s*[\d-]+|Loi\s*n[°o]?\s*\d+)/i,
    );
    const num = numMatch
      ? numMatch[1].replace(/\s+/g, ' ').trim().slice(0, 16)
      : String(idx + 1);
    return { num, label: clip(line, 58) };
  });
}

function parseSchema(schemaSection) {
  const line0End = schemaSection.indexOf('\n');
  const firstLine = line0End >= 0 ? schemaSection.slice(0, line0End).trim() : schemaSection.trim();
  const m = firstLine.match(/^🔷 Schéma mémo — (.+)$/);
  const titre = m ? m[1].trim() : 'Schéma mémo';
  const body = line0End >= 0 ? schemaSection.slice(line0End + 1).trim() : '';

  const lines = body.split('\n').filter((l) => l.trim());
  if (lines.length === 0) {
    return { type: 'tableau', titre, rows: [{ Repère: 'Voir le schéma dans le corps de la fiche.' }] };
  }

  const tabLines = lines.filter((l) => l.includes('\t'));
  if (tabLines.length >= 2) {
    const headerLine = lines.find((l) => l.includes('\t'));
    const header = headerLine.split('\t').map((s) => s.trim());
    const dataLines = lines.filter((l) => l.includes('\t') && l !== headerLine);
    if (header[0] === 'Lettre' && header[1] === 'Cas') {
      const cards = [];
      for (const row of dataLines) {
        const cells = row.split('\t').map((s) => s.trim());
        if (cells.length >= 3) cards.push({ lettre: cells[0], mot: cells[1], desc: cells[2] });
      }
      const acro = titre.match(/\(([A-Z.]+)\)/);
      return { type: 'acronyme', titre, acronyme: acro?.[1], cards: cards.length ? cards : undefined };
    }
    const rows = [];
    for (const row of dataLines) {
      const cells = row.split('\t').map((s) => s.trim());
      const obj = {};
      header.forEach((h, j) => {
        obj[h] = cells[j] ?? '';
      });
      rows.push(obj);
    }
    const low = titre.toLowerCase();
    const type = low.includes('vs') || low.includes('comparatif') ? 'comparatif' : 'tableau';
    return { type, titre, rows: rows.length ? rows : [{ A: '—', B: '—' }] };
  }

  if (lines[0]?.trim().toLowerCase() === 'text') {
    const treeLines = lines
      .slice(1)
      .map((l) => l.replace(/^[│├└┴┬─\s]+/u, '').trim())
      .filter(Boolean);
    const rows = treeLines.slice(0, 16).map((t) => ({ Repère: clip(t, 140) }));
    return { type: 'arbre', titre, rows: rows.length ? rows : undefined };
  }

  return {
    type: 'tableau',
    titre,
    rows: [{ Synthèse: clip(body.replace(/\n/g, ' '), 240) }],
  };
}

function parseBlocs(block) {
  const def = sliceBetween(block, '📘 Définition', ['⚠️ Piège'])
    .replace(/^📘 Définition\n?/m, '')
    .replace(/\n/g, ' ')
    .trim();
  const piege = sliceBetween(block, '⚠️ Piège', ['🔑 Point clé'])
    .replace(/^⚠️ Piège\n?/m, '')
    .replace(/\n/g, ' ')
    .trim();
  const point = sliceBetween(block, '🔑 Point clé', ['💡 Mémo'])
    .replace(/^🔑 Point clé\n?/m, '')
    .replace(/\n/g, ' ')
    .trim();
  const memo = sliceBetween(block, '💡 Mémo', ['⏱️ Timeline', '📂 Plan détaillé'])
    .replace(/^💡 Mémo\n?/m, '')
    .replace(/\n/g, ' ')
    .trim();
  return {
    definition: def || 'Voir la définition développée dans le corps de la fiche.',
    piege: piege || 'Relier les faits aux textes et à la procédure applicable.',
    pointCle: point || memo || 'Articuler qualification, articles et voies de procédure.',
    memo: memo || point || 'Réviser le plan puis valider en quiz / articulation.',
  };
}

function parsePlan(block) {
  const planText = sliceBetween(block, '📂 Plan détaillé', ['📜 Articles clés']);
  const out = [];
  const re = /▶ Section \d+ — ([^\n]+)/g;
  let m;
  while ((m = re.exec(planText)) !== null) {
    const titre = m[1].trim();
    if (titre) out.push(titre);
  }
  const durees = ['10 min', '12 min', '10 min', '14 min', '10 min', '12 min', '10 min', '15 min'];
  return out.slice(0, 8).map((titre, i) => ({
    num: String(i + 1),
    titre: clip(titre.replace(/^\d+\.\d+\s+/, ''), 64),
    duree: durees[i % durees.length],
  }));
}

function parseArticles(block) {
  const art = sliceBetween(block, '📜 Articles clés', ['CHAPITRE ']);
  const lines = art
    .replace(/^📜 Articles clés\n?/m, '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 8 && /^Art\.|^L\.|^R\.|^Loi/i.test(l));
  const out = lines.map((l) => clip(l, 98));
  while (out.length < 5) out.push('Voir références détaillées dans le corps de la fiche.');
  return out.slice(0, 5);
}

function parseTimeline(block) {
  const raw = sliceBetween(block, '⏱️ Timeline', ['📂 Plan détaillé']).replace(/^⏱️ Timeline\n?/m, '');
  if (!raw || raw.length < 24) return undefined;
  const lines = raw
    .split('\n')
    .map((l) => l.replace(/^[│├└┴┬─\s]+/u, '').trim())
    .filter((l) => l.length > 8 && !/^text$/i.test(l));
  const picked = lines.filter((l) => /\d|art\.|CPP|CP|PR|jour|an|max|min/i.test(l)).slice(0, 4);
  if (picked.length < 2) return undefined;
  return picked.map((line, i) => ({
    temps: ['Étape 1', 'Étape 2', 'Étape 3', 'Étape 4'][i],
    event: clip(line.split(/[.:]/)[0] || line, 44),
    detail: clip(line, 130),
  }));
}

function hasLoi2025(block, titre) {
  return /2025|loi\s*n[°o]?\s*2025/i.test(block) || /2025/i.test(titre);
}

/** @param {string[]} blocks */
function mergeStatsFromBlocks(blocks) {
  if (blocks.length === 1) {
    const statsSection = sliceBetween(blocks[0], '📊 4 Stats clés', ['🔷 Schéma mémo']);
    return parseStats(statsSection);
  }
  const out = [];
  for (const block of blocks) {
    const statsSection = sliceBetween(block, '📊 4 Stats clés', ['🔷 Schéma mémo']);
    const parsed = parseStats(statsSection);
    out.push(...parsed.slice(0, 2));
  }
  while (out.length < 4) out.push({ num: '—', label: 'Repère — approfondir dans le corps de fiche.' });
  return out.slice(0, 4);
}

/** @param {string[]} blocks */
function mergePlanFromBlocks(blocks) {
  if (blocks.length === 1) {
    const p = parsePlan(blocks[0]);
    return p.length ? p : [{ num: '1', titre: 'Vue densemble', duree: '12 min' }];
  }
  const durees = ['10 min', '12 min', '10 min', '14 min', '10 min', '12 min', '10 min', '15 min'];
  const out = [];
  let idx = 0;
  for (const block of blocks) {
    const p = parsePlan(block);
    for (const item of p) {
      if (out.length >= 8) break;
      out.push({
        num: String(++idx),
        titre: item.titre,
        duree: item.duree || durees[(idx - 1) % durees.length],
      });
    }
    if (out.length >= 8) break;
  }
  return out.length ? out : [{ num: '1', titre: 'Vue densemble', duree: '12 min' }];
}

/** @param {string[]} blocks */
function mergeArticlesFromBlocks(blocks) {
  if (blocks.length === 1) return parseArticles(blocks[0]);
  const seen = new Set();
  const out = [];
  for (const block of blocks) {
    for (const a of parseArticles(block)) {
      const key = a.split(/[—\-]/)[0].trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(a);
      if (out.length >= 5) return out;
    }
  }
  while (out.length < 5) out.push('Voir références détaillées dans le corps de la fiche.');
  return out.slice(0, 5);
}

/** @param {string[]} blocks */
function mergeBlocsFromBlocks(blocks) {
  if (blocks.length === 1) return parseBlocs(blocks[0]);
  const parts = blocks.map((b) => parseBlocs(b));
  return {
    definition: clip(parts.map((p) => p.definition).join(' '), 520),
    piege: clip(parts.map((p) => p.piege).join(' '), 450),
    pointCle: clip(parts.map((p) => p.pointCle).join(' '), 360),
    memo: clip(parts.map((p) => p.memo).join(' | '), 360),
  };
}

/** @param {string[]} blocks */
function mergeTimelineFromBlocks(blocks) {
  for (const block of blocks) {
    const t = parseTimeline(block);
    if (t?.length) return t;
  }
  return undefined;
}

/** @param {string[]} blocks @param {string} titre */
function hasLoi2025Any(blocks, titre) {
  return blocks.some((b) => hasLoi2025(b, titre));
}

async function main() {
  const chapters = await loadSyntheseChapters();
  if (chapters.size < 40) {
    console.error('Synthèse incomplète :', chapters.size, 'chapitres');
    process.exit(1);
  }

  for (const row of FONDAMENTAUX_CHAPITRES) {
    const { slug } = row;
    if (SYNTHESE_ENRICH_SKIP_SLUGS.has(slug)) {
      console.log(`skip (pilote main)\t${slug}`);
      continue;
    }
    const spec = SLUG_TO_SYNTHESE_CHAPTER[slug];
    const synthNums = normalizeSyntheseChapters(spec);
    if (synthNums.length === 0) {
      console.warn(`pas de map synthèse\t${slug}`);
      continue;
    }
    const blocks = [];
    for (const n of synthNums) {
      const block = chapters.get(n);
      if (!block) {
        console.warn(`bloc synthèse absent\t${slug} → CH${n}`);
      } else {
        blocks.push(block);
      }
    }
    if (blocks.length === 0) continue;

    const fp = path.join(coursDir, `${slug}.md`);
    const fileRaw = await fs.readFile(fp, 'utf8');
    const parsed = matter(fileRaw);
    const { content, data: prev } = parsed;

    const primary = blocks[0];
    const schemaSection = sliceBetween(primary, '🔷 Schéma mémo', ['📘 Définition']);

    const stats = mergeStatsFromBlocks(blocks);
    const schemaMemo = parseSchema(schemaSection);
    const blocs = mergeBlocsFromBlocks(blocks);
    const plan = mergePlanFromBlocks(blocks);
    const articlesCles = mergeArticlesFromBlocks(blocks);
    const timeline = mergeTimelineFromBlocks(blocks);
    const description = clip(blocs.definition, 200);

    const tags = new Set(['fondamentaux', `Partie ${row.partie}`, 'synthèse-46']);
    if (Array.isArray(prev.tags)) {
      for (const t of prev.tags) {
        if (typeof t === 'string' && t && !t.startsWith('Partie ') && t !== 'synthèse-46') tags.add(t);
      }
    }

    const title =
      typeof prev.title === 'string' && prev.title.trim() ? prev.title.trim() : row.titre;

    const newData = {
      title,
      chapitre: row.ch,
      partie: ROMAN_TO_NUM[row.partie],
      description,
      tags: [...tags],
      loi2025: hasLoi2025Any(blocks, row.titre) || prev.loi2025 === true,
      derniereMiseAJour:
        typeof prev.derniereMiseAJour === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(prev.derniereMiseAJour)
          ? prev.derniereMiseAJour
          : '2025-12-01',
      articlesCles,
      stats,
      schemaMemo,
      blocs: {
        definition: clip(blocs.definition, 520),
        piege: clip(blocs.piege, 450),
        pointCle: clip(blocs.pointCle, 360),
        memo: clip(blocs.memo, 360),
      },
      plan: plan.length ? plan : [{ num: '1', titre: 'Vue densemble', duree: '12 min' }],
      ...(timeline?.length ? { timeline } : {}),
    };

    const front = yaml.dump(newData, { lineWidth: 100, noRefs: true }).trimEnd();
    const out = `---\n${front}\n---\n\n${content.replace(/^\s+/, '')}`;
    await fs.writeFile(fp, out, 'utf8');
    const chLabel = synthNums.map((n) => `CH${n}`).join('+');
    console.log(`enrichi\t${slug}\t← synthèse ${chLabel}`);
  }
  console.log('Terminé.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
