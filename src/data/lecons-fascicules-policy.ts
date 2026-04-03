/**
 * Règle produit : le texte et la structuration à jour sont celles des fascicules ExamenOPJ.
 * Le contenu des leçons Elite sert de référence / complément ; en cas d’écart, le fascicule prime.
 *
 * Les chapitres Elite « infractions » (ch6, ch7) ne doivent pas être reproduits comme tels :
 * le rangement pédagogique attendu est celui des fascicules DPS (F01–F07), pas la découpe L6xx/L7xx.
 */

import { fasciculesList } from './fascicules-list';

export const canonicalContentRule =
  'En cas de divergence entre une leçon OPJ Elite et un fascicule ExamenOPJ, la version fascicule fait foi.';

export type EliteChapterId =
  | 'ch1'
  | 'ch2'
  | 'ch3'
  | 'ch4'
  | 'ch5'
  | 'ch6'
  | 'ch7'
  | 'ch8'
  | 'ch9'
  | 'ch10'
  | 'ch11'
  | 'ch12'
  | 'ch13'
  | 'ch14'
  | 'ch15';

export type ChapterFasciculePolicy = {
  /** Numéros de fascicules dont le contenu prime sur les leçons Elite de ce chapitre. */
  fasciculeNumeros: number[];
  /** Si true, ne pas calquer la granularité Elite (liste de leçons) pour ce thème. */
  ignoreEliteLessonGranularity?: boolean;
  note: string;
};

/** Alignement thématique chapitre Elite → fascicules (référentiel `fascicules-list.ts`). */
export const eliteChapterToFascicules: Record<EliteChapterId, ChapterFasciculePolicy> = {
  ch1: {
    fasciculeNumeros: [14, 13, 9],
    note: "Organisation judiciaire, OPJ, action publique / civile, phases : F14 (acciaire), F13 (juridictions, exécution), F09 (classification).",
  },
  ch2: {
    fasciculeNumeros: [14, 15],
    note: "Cadres d’enquête, flagrance, préliminaire, CR, art. 74 : F14 ; nullités possibles F15.",
  },
  ch3: {
    fasciculeNumeros: [14, 15],
    note: "Garde à vue et régimes voisins : traité dans l’acciaire général F14 ; contrôle des actes F15.",
  },
  ch4: {
    fasciculeNumeros: [14, 15],
    note: "Perquisitions, auditions : F14 ; vices de forme F15.",
  },
  ch5: {
    fasciculeNumeros: [9, 10],
    note: "Droit pénal général et peines : F09 et F10.",
  },
  ch6: {
    fasciculeNumeros: [1],
    ignoreEliteLessonGranularity: true,
    note: "Infractions contre les personnes : suivre F01 (et renvois transverses DPS), pas la liste des leçons Elite.",
  },
  ch7: {
    fasciculeNumeros: [2, 3, 4, 5, 6, 7],
    ignoreEliteLessonGranularity: true,
    note: "Infractions économiques / biens / stups / armes / mineurs : fascicules F02 à F07 selon le thème, pas la découpe L7xx Elite.",
  },
  ch8: {
    fasciculeNumeros: [14, 12],
    note: "Procédures spéciales, CO, mineurs : F14 et mesures d’instruction F12 selon les actes.",
  },
  ch9: {
    fasciculeNumeros: [14, 15],
    note: "Libertés fondamentales, CEDH : cadre procédural F14 ; atteintes aux droits F15.",
  },
  ch10: {
    fasciculeNumeros: [9, 10, 14],
    note: "Prescription, récidive, alternatives : F09, F10 ; cadre poursuites F14.",
  },
  ch11: {
    fasciculeNumeros: [14, 15],
    note: "Contrôles d’identité, vérifications : F14 ; nullités F15.",
  },
  ch12: {
    fasciculeNumeros: [12, 14, 15],
    note: "CJ, ARSE, DP, mandats : F12 ; cadre général F14 ; nullités F15.",
  },
  ch13: {
    fasciculeNumeros: [10, 14],
    note: "Saisies, confiscation, blanchiment : peines / mesures F10 ; cadre procédural F14.",
  },
  ch14: {
    fasciculeNumeros: [14, 15],
    note: "Géolocalisation : F14 ; régularité des actes F15.",
  },
  ch15: {
    fasciculeNumeros: [14],
    note: "Réquisitions : F14 (art. 60, 77-1, etc.).",
  },
};

export function fasciculePath(numero: number): string {
  const m = fasciculesList.find((f) => f.numero === numero);
  if (m?.id) return `/fascicules/${m.id}`;
  return `/fascicules/f${String(numero).padStart(2, '0')}`;
}

export function fasciculeMetaForChapter(chapterId: EliteChapterId) {
  const policy = eliteChapterToFascicules[chapterId];
  const metas = fasciculesList.filter((f) => policy.fasciculeNumeros.includes(f.numero));
  return { policy, metas, hrefs: policy.fasciculeNumeros.map(fasciculePath) };
}
