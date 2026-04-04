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
    description: 'Fiches F11–F15 : mission PJ, instruction, juridictions, parquet, nullités.',
    href: '/cours/modules#cours-domain-PROCEDURE',
    ordre: 1,
  },
  {
    id: '_02',
    titre: 'Infractions personnes',
    description: 'Référentiel et fiches F01 : atteintes aux personnes.',
    href: '/dashboard/infractions',
    ordre: 2,
  },
  {
    id: '_03',
    titre: 'Biens et circulation',
    description: 'Atteintes aux biens, route et thèmes voisins (F02, F03…).',
    href: '/dashboard/infractions',
    ordre: 3,
  },
  {
    id: '_04',
    titre: 'Droit pénal général',
    description: 'Fiches F09–F10 : loi pén, responsabilité, peines et récidive.',
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
