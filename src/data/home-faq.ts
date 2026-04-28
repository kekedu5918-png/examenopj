/** FAQ page d’accueil — unique source pour UI + JSON-LD FAQPage. */
export type HomeFaqItem = {
  question: string;
  answer: string;
};

export const HOME_PAGE_FAQ_ITEMS: readonly HomeFaqItem[] = [
  {
    question: 'Qui peut passer l’examen OPJ ?',
    answer:
      "L'examen OPJ est ouvert aux fonctionnaires actifs de la Police nationale titulaires, comptant au moins 3 ans de services effectifs et possédant un casier judiciaire vierge.",
  },
  {
    question: 'Combien d’épreuves comporte l’examen OPJ ?',
    answer:
      "L'examen OPJ comporte 3 épreuves : l'Épreuve 1 (DPG/DPS, 3h, coef. 2), l'Épreuve 2 (procédure pénale et rédaction de PV, 4h) et l'Épreuve 3 (oral, mise en situation, 40 min de préparation).",
  },
  {
    question: 'Le contenu d’ExamenOPJ est-il à jour pour la session 2026 ?',
    answer:
      "Oui. ExamenOPJ est rédigé par un gardien de la paix actuellement en formation OPJ en présentiel. Les fiches sont mises à jour au fil des cours, et les réformes législatives 2025 sont intégrées dans plusieurs fiches identifiées par un badge « Mise à jour 2025 ».",
  },
  {
    question: 'Quelle est la différence entre l’accès gratuit et Premium ?',
    answer:
      "L'accès gratuit permet de tester le rythme avec un sous-ensemble de fiches fondamentaux et un quota de quiz quotidien. L'accès Premium débloque l'ensemble du programme : fondamentaux complets, référentiel infractions, enquêtes types, quiz illimités et outils de révision avancés selon les conditions affichées sur la page Tarifs.",
  },
];
