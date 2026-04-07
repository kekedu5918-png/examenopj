/**
 * Extrait les fiches infraction (I–V + TENTATIVE/COMPLICITÉ) depuis F01.txt–F07.txt
 * et écrit reference/audit/infractions_officielles.json (schéma mission).
 *
 * Usage : npx tsx scripts/extract-infractions-fascicules.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'reference/audit/infractions_officielles.json');

type Marker = 'I' | 'II' | 'III' | 'IV' | 'V';

function compact(line: string): string {
  return line.replace(/\s+/g, '').replace(/\u00a0/g, '');
}

function isFooter(line: string): boolean {
  const t = line.trim();
  return (
    /^Version au \d/i.test(t) ||
    /^Page\s+\d+$/i.test(t) ||
    /©\s*SDCP/i.test(t) ||
    /^EXAMEN JUIN 20\d{2}/i.test(t)
  );
}

function markerType(line: string): Marker | 'NEXT_I' | null {
  const c = compact(line);
  if (/^I-ÉLÉMENTLÉGAL/i.test(c)) return 'I';
  if (/^II-ÉLÉMENTMATÉRIEL/i.test(c)) return 'II';
  if (/^III-ÉLÉMENTMORAL/i.test(c)) return 'III';
  if (/^IV-CIRCONSTANCESAGGRAVANTES/i.test(c)) return 'IV';
  if (/^V-RÉPRESSION/i.test(c)) return 'V';
  if (/^I-ÉLÉMENTLÉGAL/i.test(c)) return 'NEXT_I';
  return null;
}

function isTocLine(line: string): boolean {
  return /\.{8,}/.test(line) && /P\.\s*\d+/i.test(line);
}

function isTitleCandidate(line: string): boolean {
  const t = line.trim();
  if (t.length < 4 || t.length > 140) return false;
  if (isTocLine(t)) return false;
  const letters = t.replace(/[^a-zA-ZÀ-ÿ]/g, '');
  if (letters.length < 4) return false;
  const lower = letters.replace(/[A-ZÀÂÄÉÈÊËÏÎÔÙÛÜÇ]/g, '');
  const ratio = 1 - lower.length / letters.length;
  return ratio >= 0.55;
}

function extractTitleAccroche(lines: string[], legalIdx: number): { titre: string; accroche: string } {
  const accRev: string[] = [];
  let j = legalIdx - 1;
  while (j >= 0) {
    const line = lines[j];
    if (isFooter(line)) {
      j--;
      continue;
    }
    const t = line.trim();
    if (t === '') {
      if (accRev.length) break;
      j--;
      continue;
    }
    if (isTocLine(t)) {
      j--;
      continue;
    }
    if (isTitleCandidate(t)) {
      return { titre: t, accroche: accRev.reverse().join('\n').trim() };
    }
    accRev.push(line);
    j--;
  }
  const fallback = accRev.length ? accRev[accRev.length - 1].trim() : 'TODO';
  return { titre: fallback, accroche: accRev.slice(0, -1).reverse().join('\n').trim() };
}

function parseTentativeComplicite(repText: string): { tentative: string; complicite: string } {
  let tentative = 'TODO';
  let complicite = 'TODO';
  const m1 = repText.match(/(?:LA\s+)?TENTATIVE\s*:\s*(OUI|NON)/i);
  if (m1) tentative = m1[1].toUpperCase();
  const m2 = repText.match(/(?:LA\s+)?COMPLICITÉ\s*:\s*(OUI|NON)/i);
  if (m2) complicite = m2[1].toUpperCase();
  return { tentative, complicite };
}

/** Exclut titre + accroche de l’infraction suivante (placés avant le prochain I — élément légal). */
function looseTitleLine(line: string): boolean {
  const t = line.trim();
  if (t.length < 4 || t.length > 130) return false;
  if (isTocLine(t)) return false;
  const letters = t.replace(/[^a-zA-ZÀ-ÿ]/g, '');
  if (letters.length < 4) return false;
  const lower = (t.match(/[a-zà-ÿ]/g) ?? []).length;
  return lower / t.length < 0.08;
}

function findContentEndExclusive(lines: string[], legalStart: number, nextLegal: number): number {
  if (nextLegal >= lines.length) return nextLegal;
  let j = nextLegal - 1;
  while (j > legalStart && (isFooter(lines[j]) || lines[j].trim() === '')) j--;
  while (j > legalStart + 1) {
    const t = lines[j].trim();
    const isAcc =
      /^(le|la|les|un|une|des|l’|l'|du|de|ce|cette|par|dans|sur|à|pour|quel|si|même|une|un)/i.test(t) ||
      /^[a-zà-ÿ]/.test(t);
    if (isAcc) {
      j--;
      continue;
    }
    if (looseTitleLine(lines[j]) || isTitleCandidate(lines[j])) {
      return j;
    }
    break;
  }
  return nextLegal;
}

function extractArticleLegal(legalText: string): { article: string; texte: string } {
  const t = legalText.trim();
  const m = t.match(
    /^(L['’]article\s+[^.\n]+?du\s+C\.(?:P\.|R\.|S\.P\.)[^.\n]*\.?)/i,
  );
  if (m) {
    return { article: m[1].replace(/\s+/g, ' ').trim(), texte: t };
  }
  const firstLine = t.split('\n')[0] ?? t;
  return { article: firstLine.slice(0, 120), texte: t };
}

function circonstancesAucune(text: string): boolean {
  const u = text.trim().toUpperCase();
  return u === 'AUCUNE' || /^AUCUNE\s*\.?\s*$/i.test(u) || u.startsWith('AUCUNE CIRCONSTANCE');
}

function parseRepressionTable(repRaw: string): { rows: { qualification: string; article: string; circonstances: string; peines: string }[] } {
  const lines = repRaw.split('\n').filter((l) => l.trim() && !isFooter(l));
  if (lines.length === 0) return { rows: [{ qualification: '—', article: '—', circonstances: '', peines: '—' }] };
  const joined = repRaw.trim();
  if (joined.length < 400) {
    return {
      rows: [
        {
          qualification: 'Voir fascicule',
          article: '—',
          circonstances: '',
          peines: joined,
        },
      ],
    };
  }
  return {
    rows: [
      {
        qualification: 'TABLEAU (texte intégral fascicule)',
        article: '—',
        circonstances: '',
        peines: joined,
      },
    ],
  };
}

function extractInfractionsFromLines(
  lines: string[],
  fascicule: string,
  fasciculePart: string | undefined,
  groupTitle: string,
): ReturnType<typeof buildEntry>[] {
  const legalIdxs: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = markerType(lines[i]);
    if (m === 'I') legalIdxs.push(i);
  }

  const entries: ReturnType<typeof buildEntry>[] = [];
  for (let k = 0; k < legalIdxs.length; k++) {
    const legalStart = legalIdxs[k];
    const nextLegal = legalIdxs[k + 1] ?? lines.length;
    const contentEnd = findContentEndExclusive(lines, legalStart, nextLegal);
    const { titre, accroche } = extractTitleAccroche(lines, legalStart);
    if (!titre || titre === 'TODO') continue;

    const sect = { legal: [] as string[], mat: [] as string[], mor: [] as string[], circ: [] as string[], rep: [] as string[] };
    let phase: 'legal' | 'mat' | 'mor' | 'circ' | 'rep' = 'legal';

    for (let i = legalStart + 1; i < contentEnd; i++) {
      const line = lines[i];
      if (isFooter(line)) continue;
      const mt = markerType(line);
      if (mt === 'II') {
        phase = 'mat';
        continue;
      }
      if (mt === 'III') {
        phase = 'mor';
        continue;
      }
      if (mt === 'IV') {
        phase = 'circ';
        continue;
      }
      if (mt === 'V') {
        phase = 'rep';
        continue;
      }
      if (mt === 'I') break; // sécurité
      sect[phase === 'legal' ? 'legal' : phase === 'mat' ? 'mat' : phase === 'mor' ? 'mor' : phase === 'circ' ? 'circ' : 'rep'].push(line);
    }

    const legalText = sect.legal.join('\n').trim();
    const matText = sect.mat.join('\n').trim();
    const morText = sect.mor.join('\n').trim();
    const circText = sect.circ.join('\n').trim();
    const repText = sect.rep.join('\n').trim();

    if (!legalText || !matText) continue;

    const el = extractArticleLegal(legalText);
    const { tentative, complicite } = parseTentativeComplicite(repText);
    const { rows } = parseRepressionTable(repText);
    const circAucune = circonstancesAucune(circText);

    entries.push(
      buildEntry({
        fascicule,
        fasciculePart,
        groupTitle,
        titre,
        accroche: accroche || 'TODO',
        element_legal: el,
        element_materiel: { contenu_complet: matText },
        element_moral: { contenu_complet: morText || 'TODO' },
        circonstances_aggravantes: {
          aucune: circAucune,
          contenu_complet: circText || '—',
        },
        repression: {
          tableau: rows,
          tentative,
          complicite,
          immunite: null,
          nota: null,
        },
        maj_2025: false,
        badge_maj: null,
        piege_examen: null as string | null,
      }),
    );
  }
  return entries;
}

function buildEntry(x: {
  fascicule: string;
  fasciculePart?: string;
  groupTitle: string;
  titre: string;
  accroche: string;
  element_legal: { article: string; texte: string };
  element_materiel: { contenu_complet: string };
  element_moral: { contenu_complet: string };
  circonstances_aggravantes: { aucune: boolean; contenu_complet: string };
  repression: {
    tableau: { qualification: string; article: string; circonstances: string; peines: string }[];
    tentative: string;
    complicite: string;
    immunite: string | null;
    nota: string | null;
  };
  maj_2025: boolean;
  badge_maj: string | null;
  piege_examen: string | null;
}) {
  return x;
}

function processFile(
  fname: string,
  fascicule: string,
  fasciculePart: string | undefined,
  groupTitle: string,
  lineOffset = 0,
  lineEnd?: number,
): ReturnType<typeof buildEntry>[] {
  const p = join(ROOT, 'reference/audit/fascicules', fname);
  const raw = readFileSync(p, 'utf8');
  const allLines = raw.split(/\r?\n/);
  const slice = lineEnd != null ? allLines.slice(lineOffset, lineEnd) : allLines.slice(lineOffset);
  return extractInfractionsFromLines(slice, fascicule, fasciculePart, groupTitle);
}

function main() {
  const all: ReturnType<typeof buildEntry>[] = [];

  const f01 = readFileSync(join(ROOT, 'reference/audit/fascicules/F01.txt'), 'utf8').split(/\r?\n/);
  const p2Line = f01.findIndex((l) => l.includes('Fascicule n°1 Partie 2'));
  if (p2Line < 0) throw new Error('F01: ligne Partie 2 introuvable');

  all.push(
    ...extractInfractionsFromLines(
      f01.slice(0, p2Line),
      'F01',
      'Partie 1',
      'F01 — Crimes et délits contre les personnes (partie 1)',
    ),
  );
  all.push(
    ...extractInfractionsFromLines(
      f01.slice(p2Line),
      'F01',
      'Partie 2',
      'F01 — Crimes et délits contre les personnes (partie 2)',
    ),
  );

  all.push(
    ...processFile('F02.txt', 'F02', undefined, 'F02 — Crimes et délits contre les biens'),
  );
  all.push(
    ...processFile('F03.txt', 'F03', undefined, 'F03 — Infractions à la circulation routière'),
  );
  all.push(
    ...processFile(
      'F04.txt',
      'F04',
      undefined,
      'F04 — Atteintes à la nation, à l’État et à la paix publique',
    ),
  );
  all.push(...processFile('F05.txt', 'F05', undefined, 'F05 — Stupéfiants'));
  all.push(
    ...processFile('F06.txt', 'F06', undefined, 'F06 — Atteintes aux mineurs et à la famille'),
  );
  all.push(
    ...processFile('F07.txt', 'F07', undefined, 'F07 — Matériels de guerre, armes et munitions'),
  );

  const counts: Record<string, number> = {};
  const infractionsFinal = all.map((e) => {
    const key =
      e.fascicule === 'F01' && e.fasciculePart === 'Partie 2'
        ? 'F01p2'
        : e.fascicule === 'F01'
          ? 'F01p1'
          : e.fascicule;
    counts[key] = (counts[key] ?? 0) + 1;
    const n = counts[key];
    const id =
      key === 'F01p2'
        ? `F01-p2-${String(n).padStart(3, '0')}`
        : key === 'F01p1'
          ? `F01-${String(n).padStart(3, '0')}`
          : `${e.fascicule}-${String(n).padStart(3, '0')}`;
    return {
      id,
      fascicule: e.fascicule,
      fasciculePart: e.fasciculePart,
      groupTitle: e.groupTitle,
      titre: e.titre,
      accroche: e.accroche,
      element_legal: e.element_legal,
      element_materiel: e.element_materiel,
      element_moral: e.element_moral,
      circonstances_aggravantes: e.circonstances_aggravantes,
      repression: e.repression,
      piege_examen: e.piege_examen,
      maj_2025: e.maj_2025,
      badge_maj: e.badge_maj,
    };
  });

  const payload = {
    meta: {
      version: '2.0.0',
      generatedAt: new Date().toISOString(),
      generator: 'scripts/extract-infractions-fascicules.ts',
      notice:
        'Textes I–V extraits automatiquement depuis les .txt des fascicules (réf. audit). Contrôle manuel recommandé pour tableaux et titres OCR.',
      fasciculesSources: ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07'],
      totalInfractions: infractionsFinal.length,
    },
    infractions: infractionsFinal,
  };

  writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Écrit ${infractionsFinal.length} infractions dans ${OUT}`);
}

main();
