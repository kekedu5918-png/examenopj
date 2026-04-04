import type { QuizQuestion } from '@/data/types';

/**
 * Exclut les QCM dont le cœur est « quel article incrimine telle infraction » (cadre légal de l’incrimination),
 * tout en conservant les questions sur articles « structurels » (tentative, complicité, nullités, etc.)
 * et les questions qui ne sont pas des QCM « quatre articles ».
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
    'sanctionné par',
    'sanctionnée par',
    'incriminé par',
    'incriminée par',
    'punissable pour \\d',
  ].join('|'),
  'i',
);

export function excludeCadreLegalQuizQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.filter((q) => {
    if (KEEP_QUESTION.test(q.question)) return true;
    if (!optionsMostlyLegalCodes(q)) return true;
    if (EXCLUDE_QUESTION.test(q.question)) return false;
    return true;
  });
}
