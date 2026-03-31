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
    titre: 'Strategie OPJ',
    description: 'Pomodoro, planning hebdomadaire et revision ciblee.',
    href: '/dashboard/courses',
    ordre: 0,
  },
  {
    id: '_01',
    titre: 'Procedure penale',
    description: 'Fondamentaux de la mission de police judiciaire.',
    href: '/dashboard/courses',
    ordre: 1,
  },
  {
    id: '_02',
    titre: 'Infractions personnes',
    description: 'Crimes et delits contre les personnes (CPP IV).',
    href: '/dashboard/infractions',
    ordre: 2,
  },
  {
    id: '_03',
    titre: 'Biens et circulation',
    description: 'Atteintes aux biens et infractions routieres.',
    href: '/dashboard/infractions',
    ordre: 3,
  },
  {
    id: '_04',
    titre: 'Droit penal general',
    description: 'Loi penale, responsabilite et sanctions.',
    href: '/dashboard/courses',
    ordre: 4,
  },
  {
    id: '_05',
    titre: 'Mission OPJ avancee',
    description: 'Instruction, nullites et controle de la mission OPJ.',
    href: '/dashboard/courses',
    ordre: 5,
  },
];
