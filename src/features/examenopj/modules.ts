export type ExamenModule = {
  id: string;
  titre: string;
  description: string;
  href: string;
  ordre: number;
};

export const examenModules: ExamenModule[] = [
  {
    id: '_00',
    titre: 'Stratégie de révision',
    description: 'Méthode, planning et charge cognitive jusqu’au concours.',
    href: '/guide-revision-opj',
    ordre: 0,
  },
  {
    id: '_01',
    titre: 'Procédure pénale',
    description:
      'Synthèses procédure : mission PJ, instruction, juridictions, parquet, nullités — thèmes 11 à 15 du programme.',
    href: '/cours/modules#cours-domain-PROCEDURE',
    ordre: 1,
  },
  {
    id: '_02',
    titre: 'Infractions personnes',
    description: 'Référentiel et thème « personnes » (programme n°1) : atteintes aux personnes.',
    href: '/dashboard/infractions',
    ordre: 2,
  },
  {
    id: '_03',
    titre: 'Biens et circulation',
    description: 'Atteintes aux biens, circulation routière et thèmes voisins du programme.',
    href: '/dashboard/infractions',
    ordre: 3,
  },
  {
    id: '_04',
    titre: 'Droit pénal général',
    description: 'Droit pénal général : loi pénale, responsabilité, peines et récidive (thèmes 9 et 10).',
    href: '/cours/modules#cours-domain-DPG',
    ordre: 4,
  },
  {
    id: '_05',
    titre: 'Mission OPJ avancée',
    description: 'Articulation procédure / rédaction (épreuves 2 et 3).',
    href: '/entrainement',
    ordre: 5,
  },
];
