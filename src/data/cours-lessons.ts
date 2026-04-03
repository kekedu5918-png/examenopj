export type CoursLessonDomain = 'DPS' | 'DPG' | 'Procédure pénale';

export type CoursLesson = {
  slug: string;
  fascicule: number;
  titre: string;
  /** Sous-titre affiché (ex. partie manuscrite, domaine) */
  sousTitre?: string;
  domaine: CoursLessonDomain;
  /** Fichier sous /cours-texte/ */
  fichier: string;
};

/**
 * Ordre pédagogique : F01 (partie 2 fournie) → F15.
 * Les contenus sont servis depuis `public/cours-texte/*.txt`.
 */
export const coursLessons: CoursLesson[] = [
  {
    slug: 'f01-partie-2',
    fascicule: 1,
    titre: 'Crimes et délits contre la personne',
    sousTitre: 'Partie 2/2',
    domaine: 'DPS',
    fichier: 'f01-partie-2.txt',
  },
  {
    slug: 'f02',
    fascicule: 2,
    titre: 'Crimes et délits contre les biens',
    domaine: 'DPS',
    fichier: 'f02.txt',
  },
  {
    slug: 'f03',
    fascicule: 3,
    titre: 'Infractions à la circulation routière',
    domaine: 'DPS',
    fichier: 'f03.txt',
  },
  {
    slug: 'f04',
    fascicule: 4,
    titre: 'Crimes et délits contre la nation, l’État et la paix publique',
    domaine: 'DPS',
    fichier: 'f04.txt',
  },
  {
    slug: 'f05',
    fascicule: 5,
    titre: 'Usage et trafic de stupéfiants',
    domaine: 'DPS',
    fichier: 'f05.txt',
  },
  {
    slug: 'f06',
    fascicule: 6,
    titre: 'Atteintes aux mineurs et à la famille',
    domaine: 'DPS',
    fichier: 'f06.txt',
  },
  {
    slug: 'f07',
    fascicule: 7,
    titre: 'Armes, munitions et matériels de guerre',
    domaine: 'DPS',
    fichier: 'f07.txt',
  },
  {
    slug: 'f08',
    fascicule: 8,
    titre: 'Libertés publiques',
    domaine: 'DPS',
    fichier: 'f08.txt',
  },
  {
    slug: 'f09',
    fascicule: 9,
    titre: 'Loi pénale et responsabilité pénale',
    domaine: 'DPG',
    fichier: 'f09.txt',
  },
  {
    slug: 'f10',
    fascicule: 10,
    titre: 'La sanction',
    domaine: 'DPG',
    fichier: 'f10.txt',
  },
  {
    slug: 'f11',
    fascicule: 11,
    titre: 'Cadres juridiques et actes de la mission de PJ',
    domaine: 'Procédure pénale',
    fichier: 'f11.txt',
  },
  {
    slug: 'f12',
    fascicule: 12,
    titre: 'Instruction, mandats, contrôle judiciaire, détention provisoire',
    domaine: 'Procédure pénale',
    fichier: 'f12.txt',
  },
  {
    slug: 'f13',
    fascicule: 13,
    titre: 'Juridictions de jugement et exécution des décisions',
    domaine: 'Procédure pénale',
    fichier: 'f13.txt',
  },
  {
    slug: 'f14',
    fascicule: 14,
    titre: 'Action publique / civile, autorités de PJ, contrôle de la PJ',
    domaine: 'Procédure pénale',
    fichier: 'f14.txt',
  },
  {
    slug: 'f15',
    fascicule: 15,
    titre: 'Nullité des actes de procédure',
    domaine: 'Procédure pénale',
    fichier: 'f15.txt',
  },
];

export const coursLessonBySlug = new Map(coursLessons.map((l) => [l.slug, l]));

export const defaultCoursSlug = coursLessons[0].slug;

export function domaineBadgeClass(domaine: CoursLessonDomain): string {
  switch (domaine) {
    case 'DPS':
      return 'bg-rose-500/15 text-rose-200 border-rose-500/25';
    case 'DPG':
      return 'bg-violet-500/15 text-violet-200 border-violet-500/25';
    case 'Procédure pénale':
      return 'bg-sky-500/15 text-sky-200 border-sky-500/25';
    default:
      return 'bg-white/10 text-gray-200 border-white/15';
  }
}
