/**
 * Parcours « leçons » : synthèse pédagogique en chapitres (affichage type fiches courtes),
 * reliée aux fiches F et fondamentaux pour la progression (localStorage modules lus).
 */

export type LeconAccent = 'blue' | 'red' | 'amber' | 'violet' | 'teal' | 'cyan' | 'emerald' | 'rose' | 'indigo';

/** Clé d’icône Lucide — résolue dans `LeconsSyntheseList`. */
export type LeconIconKey =
  | 'Scale'
  | 'Siren'
  | 'Lock'
  | 'FileSearch'
  | 'BookOpen'
  | 'Users'
  | 'Package'
  | 'Network'
  | 'Globe2';

export type CoursLeconChapitre = {
  id: string;
  /** Affiché comme « CHAPITRE 01 ». */
  ordre: number;
  titre: string;
  motsCles: string[];
  href: string;
  accent: LeconAccent;
  icon: LeconIconKey;
  /** Fascicules F dont la lecture compte pour « x/y » sur cette carte (marquage lu sur la fiche). */
  moduleIdsPourProgression: string[];
};

export const COURS_LECONS_SYNTHESE: CoursLeconChapitre[] = [
  {
    id: 'opj-proces',
    ordre: 1,
    titre: "L'OPJ & le Procès Pénal",
    motsCles: ['Missions', 'Compétences', 'Contrôle'],
    href: '/cours/modules/f14',
    accent: 'blue',
    icon: 'Scale',
    moduleIdsPourProgression: ['f14', 'f13'],
  },
  {
    id: 'cadres-enquete',
    ordre: 2,
    titre: "Les Cadres d'Enquête",
    motsCles: ['Flagrance', 'Préliminaire', 'CR', 'Art. 74'],
    href: '/cours/modules/f11',
    accent: 'red',
    icon: 'Siren',
    moduleIdsPourProgression: ['f11'],
  },
  {
    id: 'garde-a-vue',
    ordre: 3,
    titre: 'La Garde à Vue',
    motsCles: ['Tous régimes', 'Droits', 'Prolongations'],
    href: '/fondamentaux/garde-a-vue',
    accent: 'amber',
    icon: 'Lock',
    /** Fiche fondamentaux — pas de compteur F ; enchaînez avec la procédure F11 pour la grille officielle. */
    moduleIdsPourProgression: [],
  },
  {
    id: 'perquisitions',
    ordre: 4,
    titre: 'Perquisitions & Auditions',
    motsCles: ['Procédures', 'Lieux protégés', 'Audition libre'],
    href: '/cours/modules/f11',
    accent: 'violet',
    icon: 'FileSearch',
    moduleIdsPourProgression: ['f11', 'f15'],
  },
  {
    id: 'dpg',
    ordre: 5,
    titre: 'Droit Pénal Général',
    motsCles: ['Infractions', 'Tentative', 'Complicité', 'Responsabilité'],
    href: '/cours/modules/f09',
    accent: 'teal',
    icon: 'BookOpen',
    moduleIdsPourProgression: ['f09', 'f10'],
  },
  {
    id: 'personnes',
    ordre: 6,
    titre: 'Infractions contre les Personnes',
    motsCles: ['Homicide', 'Violences', 'Agressions sexuelles', 'Séquestration'],
    href: '/cours/modules/f01',
    accent: 'rose',
    icon: 'Users',
    moduleIdsPourProgression: ['f01'],
  },
  {
    id: 'biens',
    ordre: 7,
    titre: 'Infractions contre les Biens',
    motsCles: ['Vol', 'Escroquerie', 'Recel', 'Stups'],
    href: '/cours/modules/f02',
    accent: 'cyan',
    icon: 'Package',
    moduleIdsPourProgression: ['f02', 'f05'],
  },
  {
    id: 'procedures-speciales',
    ordre: 8,
    titre: 'Procédures Spéciales & CO',
    motsCles: ['Criminalité organisée', 'Mineurs', 'Fichiers'],
    href: '/cours/modules/f04',
    accent: 'indigo',
    icon: 'Network',
    moduleIdsPourProgression: ['f04', 'f06', 'f12'],
  },
  {
    id: 'libertes-cedh',
    ordre: 9,
    titre: 'Libertés & CEDH',
    motsCles: ['Droits fondamentaux', 'Présomption d’innocence', 'Contrôles'],
    href: '/cours/modules/f08',
    accent: 'emerald',
    icon: 'Globe2',
    moduleIdsPourProgression: ['f08'],
  },
];
