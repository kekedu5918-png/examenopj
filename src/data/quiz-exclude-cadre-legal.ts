import type { QuizQuestion } from '@/data/types';

/**
 * Exclut les QCM centrés sur le « cadre légal » au sens strict :
 * choix du bon article / code pour une infraction donnée, et questions focalisées sur l’élément légal de l’incrimination.
 * Les questions structurelles (tentative, complicité, nullités, rôle du parquet…) restent via KEEP_QUESTION.
 */
const KEEP_QUESTION = new RegExp(
  [
    'tentative est',
    'complicité est',
    'bande organisée',
    'préméditation est',
    'effraction est',
    'guet-apens',
    'concours réel',
    'classification tripartite',
    'mandats de justice',
    'nullités substantielles',
    "802 du CPP",
    '171 CPP',
    'garde à vue',
    'comparution sur reconnaissance',
    "opportunité des poursuites",
    'mission de la police judiciaire',
    'classification des peines',
    'trouble mental',
    'légitime défense',
    'état de nécessité',
    'concours de infractions',
    'effet rétroactif',
  ].join('|'),
  'i',
);

/** Questions portant sur l’incrimination textuelle plutôt que sur la pratique OPJ / la procédure. */
const ELEMENT_LEGAL_OR_ARTICLE_FOCUS = new RegExp(
  [
    'éléments?\\s+légaux?',
    'élément\\s+légal',
    "l'incrimination",
    'texte\\s+incrimine',
    'prévu par quel article',
    'prévue par quel article',
    "à quel article d[u']",
    'quel article du',
    'quel article de',
    'prévu par \\:',
    'prévue par \\:',
  ].join('|'),
  'i',
);

function optionsMostlyLegalCodes(q: QuizQuestion): boolean {
  let hits = 0;
  for (const o of q.options) {
    const t = o.trim();
    if (/\d{2,3}-\d/.test(t) && /C\.P\.|CPP|C\.S\.P\.|C\.R\.|C\.civ\.|C\.S\.I\./i.test(t)) hits++;
    if (/^art\.\s*\d{2,3}/i.test(t)) hits++;
  }
  return hits >= 3;
}

const EXCLUDE_QUESTION = new RegExp(
  [
    'quel article',
    'à quel article',
    'réprimé par',
    'réprimée par',
    'réprimés par',
    'réprimées par',
    'sanctionné par',
    'sanctionnée par',
    'incriminé par',
    'incriminée par',
    'incriminés par',
    'punissable pour \\d',
    "définie à l'article",
    "défini à l'article",
    "définie\\s+à\\s+l['\u2019]\\s*article",
  ].join('|'),
  'i',
);

export function excludeCadreLegalQuizQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.filter((q) => {
    if (KEEP_QUESTION.test(q.question)) return true;
    if (ELEMENT_LEGAL_OR_ARTICLE_FOCUS.test(q.question)) return false;
    if (optionsMostlyLegalCodes(q)) return false;
    if (EXCLUDE_QUESTION.test(q.question)) return false;
    return true;
  });
}
