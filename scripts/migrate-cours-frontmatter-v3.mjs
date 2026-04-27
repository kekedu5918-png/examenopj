/**
 * Migration one-shot : frontmatter legacy (articlesCites, partie "I"…) → schéma V3 (Zod).
 * Idempotent : les fiches déjà en V3 sont ignorées.
 *
 * Usage : node scripts/migrate-cours-frontmatter-v3.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import yaml from 'js-yaml';

import { FONDAMENTAUX_CHAPITRES } from './lib/fondamentaux-annexe-b.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const coursDir = path.join(root, 'content/cours');

const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };
const ROMAN_BY_NUM = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const ART_PATTERNS = [
  /art\.\s*[\d-]+(?:\s*al\.\s*\d+)?(?:\s*C\.\s*p\.?e?n\.?|CPP|C\.?P\.?P\.?)?/gi,
  /L\.\s*[\d-]+(?:\s*CJPM)?/gi,
  /R\.\s*11[-\d]*/gi,
  /loi\s*n[°o]?\s*[\d-]+/gi,
];

const PIEGE_BY_PARTIE = {
  1: 'Confondre les cadres procéduraux (flagrance, préliminaire, instruction) : pouvoirs et délais diffèrent.',
  2: 'Oublier assentiment, JLD ou délais légaux sur les actes de voie de fait et la garde à vue.',
  3: 'Mélanger rôles parquet / juge d’instruction / juridictions de jugement et leurs recours.',
  4: 'Négliger l’élément intentionnel, la tentative ou les causes d’aggravation en DPG.',
  5: 'Qualifier sans citer les éléments matériels et moraux précis du type d’infraction.',
  6: 'Oublier les actualisations 2026 : vérifier les textes consolidés et la veille législative.',
};

function clip(s, max) {
  if (s == null || typeof s !== 'string') return '';
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + '…';
}

function isAlreadyV3(data) {
  return (
    Array.isArray(data.articlesCles) &&
    data.articlesCles.length === 5 &&
    Array.isArray(data.stats) &&
    data.stats.length === 4 &&
    data.schemaMemo &&
    typeof data.schemaMemo === 'object' &&
    typeof data.schemaMemo.type === 'string' &&
    data.blocs &&
    typeof data.blocs === 'object' &&
    typeof data.blocs.definition === 'string' &&
    Array.isArray(data.plan) &&
    data.plan.length >= 1
  );
}

function extractArticles(text) {
  const byKey = new Map();
  for (const re of ART_PATTERNS) {
    re.lastIndex = 0;
    let m;
    const t = text;
    while ((m = re.exec(t)) != null) {
      let s = m[0].replace(/\s+/g, ' ').trim();
      if (s.length < 4 || s.length > 100) continue;
      if (/^l\.\s*\d$/.test(s)) continue;
      s = s.replace(/^art\./i, 'Art.');
      const key = s.toLowerCase();
      if (!byKey.has(key)) byKey.set(key, s);
    }
  }
  return [...byKey.values()].sort((a, b) => a.localeCompare(b, 'fr'));
}

function extractH2Titles(md) {
  const re = /^## (.+)$/gm;
  return [...md.matchAll(re)].map((m) => m[1].trim());
}

function partieIndexFrom(data, row) {
  const raw = data.partie;
  if (typeof raw === 'number' && raw >= 1 && raw <= 6 && Number.isInteger(raw)) return raw;
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (/^[1-6]$/.test(t)) return Number(t);
    const u = t.toUpperCase();
    if (u in ROMAN) return ROMAN[u];
  }
  return ROMAN[row.partie];
}

function definitionFromBody(body, desc, title) {
  const afterH1 = body.replace(/^\s*#[^\n]*\n+/, '');
  const parts = afterH1.split(/^## /m);
  const firstSec = parts.length > 1 ? parts[1].replace(/^[^\n]+\n+/, '') : '';
  const firstBlock = firstSec.split(/\n\n+/).find((b) => {
    const x = b.trim();
    return x && !x.startsWith('![') && !x.startsWith('|') && !x.startsWith('##');
  });
  if (firstBlock) {
    const plain = firstBlock
      .replace(/[*_`#]/g, '')
      .replace(/\n/g, ' ')
      .trim();
    if (plain.length >= 50) return clip(plain, 480);
  }
  const d = clip(desc, 400);
  if (d.length >= 40) return d;
  return `${title} — fiche synthèse fondamentaux (structure détaillée dans le corps).`;
}

function extractPointCle(body) {
  const m = body.match(/^>\s*\*\*([^*]+)\*\*[—\-–:\s]*([^\n]+)/m);
  if (m) return clip(m[2].trim(), 200);
  const m2 = body.match(/^>\s*\*\*([^*]+)\*\*\s*([^\n]+)/m);
  if (m2) return clip(m2[2].trim(), 200);
  const m3 = body.match(/^>\s*(.{25,220})/m);
  if (m3) return clip(m3[1].replace(/^>\s*/, '').trim(), 200);
  return 'Articuler définition, conditions de fond, procédure et sanctions pour le jury.';
}

function buildArticlesCles(extracted, cites, title) {
  const fromCites = (Array.isArray(cites) ? cites : [])
    .map((a) =>
      clip(String(a).replace(/\s+/g, ' ').replace(/^art\./i, 'Art.').trim(), 95),
    )
    .filter(Boolean);
  const merged = [];
  const seen = new Set();
  for (const s of [...fromCites, ...extracted.map((x) => clip(x + ' — repère', 95))]) {
    const k = s.toLowerCase().slice(0, 40);
    if (seen.has(k)) continue;
    seen.add(k);
    merged.push(s);
    if (merged.length >= 5) break;
  }
  let i = 0;
  while (merged.length < 5) {
    i += 1;
    merged.push(clip(`Texte / doctrine — ${title} (complément ${i})`, 95));
  }
  return merged.slice(0, 5);
}

function schemaMemoFromH2(titre, h2s) {
  const rows = h2s.slice(0, 8).map((t, idx) => ({
    Étapes: String(idx + 1),
    Thème: clip(t.replace(/^\d+\.\d+\s+/, ''), 85),
  }));
  if (rows.length >= 2) {
    return { type: 'tableau', titre: 'Plan — grandes lignes', rows };
  }
  return {
    type: 'acronyme',
    titre: clip(`Repères — ${titre}`, 72),
    acronyme: 'L.I.R.E.',
    cards: [
      { lettre: 'L', mot: 'Lire', desc: clip(`Structurer ${titre} avant l’oral.`, 90) },
      { lettre: 'I', mot: 'Indices', desc: 'Repérer faits, qualifications et textes applicables.' },
      { lettre: 'R', mot: 'Régime', desc: 'Procédure, juridiction et nullités éventuelles.' },
      { lettre: 'E', mot: 'Examen', desc: 'Entraînement quiz et articulation avec les autres fiches.' },
    ],
  };
}

function planFromH2(h2s) {
  const titles = h2s.length ? h2s : ['Vue d’ensemble'];
  return titles.slice(0, 8).map((t, idx) => ({
    num: String(idx + 1),
    titre: clip(t.replace(/^\d+\.\d+\s+/, ''), 62),
    duree: '~10 min',
  }));
}

function parseLoi2025(data, body) {
  if (data.loi2025 === true || data.loi2025 === 'true') return true;
  if (data.loi2025 === false || data.loi2025 === 'false') return false;
  return /20\s?25[–-]?\d{3}|\b2025[-–]\d{2,3}\b|loi\s*n[°o]?\s*20\s*25/i.test(body);
}

for (const row of FONDAMENTAUX_CHAPITRES) {
  const fp = path.join(coursDir, `${row.slug}.md`);
  const raw = await fs.readFile(fp, 'utf8');
  const parsed = matter(raw);
  const { data, content } = parsed;

  if (isAlreadyV3(data)) {
    console.log(`skip (déjà V3)\t${row.slug}`);
    continue;
  }

  const title = typeof data.title === 'string' ? data.title : row.titre;
  const chapitre = typeof data.chapitre === 'number' ? data.chapitre : row.ch;
  const partieNum = partieIndexFrom(data, row);
  const partieR = ROMAN_BY_NUM[partieNum - 1] ?? 'I';
  const description = clip(typeof data.description === 'string' ? data.description : row.titre, 200);
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t) => typeof t === 'string')
    : ['fondamentaux', `Partie ${partieR}`, '2F.1.b'];
  if (!tags.includes('fondamentaux')) tags.unshift('fondamentaux');

  const h2s = extractH2Titles(content);
  const extracted = extractArticles(`${content}\n${description}`);
  const articlesCles = buildArticlesCles(extracted, data.articlesCites, title);

  const stats = [
    { num: String(chapitre), label: `Chapitre ${chapitre} (annexe B)` },
    { num: partieR, label: `Partie ${partieNum} — synthèse` },
    { num: String(Math.max(1, h2s.length)), label: 'Sections (titres H2)' },
    { num: '2026', label: 'Objectif concours OPJ' },
  ];

  const schemaMemo = schemaMemoFromH2(title, h2s);
  const plan = planFromH2(h2s);
  const def = definitionFromBody(content, typeof data.description === 'string' ? data.description : '', title);
  const pointCle = extractPointCle(content);
  const piege = PIEGE_BY_PARTIE[partieNum] ?? PIEGE_BY_PARTIE[1];
  const memo = clip(
    typeof data.description === 'string'
      ? data.description.replace(/^[^:]+:\s*/, '').slice(0, 200)
      : pointCle,
    200,
  );

  const newData = {
    title,
    chapitre,
    partie: partieNum,
    description,
    tags,
    loi2025: parseLoi2025(data, content),
    derniereMiseAJour:
      typeof data.derniereMiseAJour === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.derniereMiseAJour)
        ? data.derniereMiseAJour
        : '2025-12-01',
    articlesCles,
    stats,
    schemaMemo,
    blocs: {
      definition: def,
      piege,
      pointCle,
      memo: memo.length >= 40 ? memo : pointCle,
    },
    plan,
  };

  const front = yaml.dump(newData, { lineWidth: 100, noRefs: true, sortKeys: false }).trimEnd();
  const out = `---\n${front}\n---\n\n${content.replace(/^\s+/, '')}`;
  await fs.writeFile(fp, out, 'utf8');
  console.log(`migré\t${row.slug}`);
}

console.log('Terminé.');
