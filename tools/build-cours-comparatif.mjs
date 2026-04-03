/**
 * Génère src/data/cours-comparatif-data.json : stats TXT + recoupement thématique
 * avec les chapitres « Mes Leçons » OPJ Elite (elite-lecons-content.json).
 *
 * ⚠️ Garder `eliteChapterToFasciculeNums` aligné avec `src/data/lecons-fascicules-policy.ts`
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

/** Même logique que eliteChapterToFascicules (liste des F par chapitre Elite). */
const eliteChapterToFasciculeNums = {
  ch1: [14, 13, 9],
  ch2: [14, 15],
  ch3: [14, 15],
  ch4: [14, 15],
  ch5: [9, 10],
  ch6: [1],
  ch7: [2, 3, 4, 5, 6, 7],
  ch8: [14, 12],
  ch9: [8, 14, 15],
  ch10: [9, 10, 14],
  ch11: [14, 15],
  ch12: [12, 14, 15],
  ch13: [10, 14],
  ch14: [14, 15],
  ch15: [14],
};

function invertPolicy() {
  /** @type {Record<number, string[]>} */
  const byF = {};
  for (const [chId, nums] of Object.entries(eliteChapterToFasciculeNums)) {
    for (const n of nums) {
      if (!byF[n]) byF[n] = [];
      byF[n].push(chId);
    }
  }
  return byF;
}

const chapters = JSON.parse(readFileSync(join(root, 'src', 'data', 'elite-lecons-content.json'), 'utf8'));

const fasciculeFiles = [
  { numero: 1, fichier: 'f01-partie-2.txt' },
  { numero: 2, fichier: 'f02.txt' },
  { numero: 3, fichier: 'f03.txt' },
  { numero: 4, fichier: 'f04.txt' },
  { numero: 5, fichier: 'f05.txt' },
  { numero: 6, fichier: 'f06.txt' },
  { numero: 7, fichier: 'f07.txt' },
  { numero: 8, fichier: 'f08.txt' },
  { numero: 9, fichier: 'f09.txt' },
  { numero: 10, fichier: 'f10.txt' },
  { numero: 11, fichier: 'f11.txt' },
  { numero: 12, fichier: 'f12.txt' },
  { numero: 13, fichier: 'f13.txt' },
  { numero: 14, fichier: 'f14.txt' },
  { numero: 15, fichier: 'f15.txt' },
];

const byF = invertPolicy();

let totalWords = 0;
let totalEliteLessons = 0;
for (const ch of chapters) {
  totalEliteLessons += ch.lessons.length;
}

const fascicules = fasciculeFiles.map(({ numero, fichier }) => {
  const pathTxt = join(root, 'public', 'cours-texte', fichier);
  let words = 0;
  let chars = 0;
  try {
    const raw = readFileSync(pathTxt, 'utf8');
    chars = raw.length;
    words = raw.split(/\s+/).filter(Boolean).length;
  } catch {
    words = 0;
  }
  totalWords += words;

  const chIds = byF[numero] ?? [];
  const eliteChapters = chIds.map((id) => {
    const ch = chapters.find((c) => c.id === id);
    if (!ch) return null;
    return {
      id: ch.id,
      num: ch.num,
      title: ch.title,
      lessonCount: ch.lessons.length,
      lessons: ch.lessons.map((l) => ({ id: l.id, name: l.name, ref: l.ref })),
    };
  }).filter(Boolean);

  return {
    numero,
    fichier,
    words,
    chars,
    eliteChapters,
    eliteLessonTotal: eliteChapters.reduce((a, c) => a + c.lessonCount, 0),
  };
});

const out = {
  generatedAt: new Date().toISOString(),
  canonicalSource: {
    id: 'fascicule_txt',
    label: 'Fichiers fascicules (extraits texte SDCP / session)',
    priorityRule:
      "En cas de divergence de fond, de chiffrage de peine, de référence d'article ou de jurisprudence : le texte du fascicule affiché dans « Cours » fait foi. Les leçons de l'application OPJ Elite (chapitres exportés) sont un complément pédagogique, non contractuel par rapport aux fascicules.",
  },
  methodology: {
    comparisonType: 'thematic_and_volumetric',
    disclaimer:
      "Ce comparatif ne constitue pas une relecture juridique mot à mot de l'intégralité des sources. Il indique quels chapitres Elite recoupent chaque fascicule et compare les volumes textuels (nombre de mots).",
  },
  totals: {
    fasciculeTxtWords: totalWords,
    eliteLessonCount: totalEliteLessons,
    eliteChapterCount: chapters.length,
  },
  fascicules,
};

writeFileSync(join(root, 'src', 'data', 'cours-comparatif-data.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('OK cours-comparatif-data.json', 'fascicules', fascicules.length, 'totalWords', totalWords);
