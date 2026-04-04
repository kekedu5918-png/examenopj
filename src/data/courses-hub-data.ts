export type CourseAccent = 'rose' | 'violet' | 'blue' | 'emerald' | 'amber';

export type CourseStepKind = 'read' | 'train' | 'anchor' | 'map';

export type CourseStep = {
  kind: CourseStepKind;
  label: string;
  href: string;
  hint?: string;
};

export type CoursePillar = {
  id: string;
  title: string;
  hook: string;
  description: string;
  accent: CourseAccent;
  /** Nom d’icône lucide (résolu côté client) */
  iconName: 'Scale' | 'BookMarked' | 'FolderGit2' | 'Network' | 'Sparkles';
  /** Indication temps / charge cognitive */
  rhythm: string;
  steps: CourseStep[];
};

/** Piliers « base métier » : savoir de policier, distinct de la préparation épreuve écrite/orale. */
export const coursePillars: CoursePillar[] = [
  {
    id: 'dps',
    title: 'Droit pénal spécial',
    hook: 'Qualifier et classer les infractions du quotidien',
    description:
      'Violences, atteintes aux biens, stupéfiants, armes, économique… Le cœur du terrain judiciaire. Tu consolides ici ce que tu appliques déjà en procédure.',
    accent: 'rose',
    iconName: 'Scale',
    rhythm: 'Rythme suggéré : un thème par session',
    steps: [
      { kind: 'read', label: 'Modules DPS', href: '/cours/modules', hint: 'F01 → F08' },
      { kind: 'train', label: 'Quiz DPS', href: '/entrainement/quiz?mode=domain&domain=DPS' },
      { kind: 'anchor', label: 'Flashcards', href: '/entrainement/flashcards?cat=atteintes-aux-biens' },
      { kind: 'map', label: 'Référentiel infractions', href: '/infractions' },
    ],
  },
  {
    id: 'dpg',
    title: 'Droit pénal général',
    hook: 'Principes, responsabilité, peines, circonstances',
    description:
      'Classification, éléments constitutifs, complicité, causes d’irresponsabilité, concours de peines… La charpente qui donne du sens à tes qualifications.',
    accent: 'violet',
    iconName: 'BookMarked',
    rhythm: 'À alterner avec du DPS pour lier théorie et faits',
    steps: [
      { kind: 'read', label: 'Modules DPG', href: '/cours/modules', hint: 'F09 & F10' },
      { kind: 'train', label: 'Quiz DPG', href: '/entrainement/quiz?mode=domain&domain=DPG' },
      { kind: 'anchor', label: 'Flashcards personnes', href: '/entrainement/flashcards?cat=atteintes-aux-personnes' },
      { kind: 'map', label: 'Récap F01', href: '/entrainement/recapitulatif' },
    ],
  },
  {
    id: 'procedure',
    title: 'Procédure pénale',
    hook: 'Actes, cadres et valeur des écrits',
    description:
      'Enquête, garde à vue, perquisitions, nullités… Ce que tu opérationnalises avec le parquet et le juge. Ici on renforce la précision, pas la « copie type concours ».',
    accent: 'blue',
    iconName: 'FolderGit2',
    rhythm: 'Bonne entrée après une mise en cause réelle ou un cas fil',
    steps: [
      { kind: 'read', label: 'Fascicules procédure', href: '/fascicules', hint: 'F12 → F15' },
      { kind: 'train', label: 'Quiz procédure', href: '/entrainement/quiz?mode=domain&domain=procedure' },
      { kind: 'anchor', label: 'Flashcards (toutes)', href: '/entrainement/flashcards' },
      { kind: 'map', label: 'Récap F02', href: '/entrainement/recapitulatif' },
    ],
  },
  {
    id: 'synthese',
    title: 'Vision transversale',
    hook: 'Relier qualification, éléments et textes',
    description:
      'Tableaux récapitulatifs et listes d’infractions pour tester ta vision d’ensemble avant de replonger dans un module.',
    accent: 'emerald',
    iconName: 'Network',
    rhythm: 'Idéal en ouverture ou en fin de semaine',
    steps: [
      { kind: 'map', label: 'Récapitulatif complet', href: '/entrainement/recapitulatif' },
      { kind: 'map', label: 'Infractions & liens', href: '/infractions' },
      { kind: 'train', label: 'Quiz global', href: '/entrainement/quiz?mode=global' },
    ],
  },
  {
    id: 'boost',
    title: 'Micro-sprints',
    hook: 'Court, régulier, sans culpabiliser',
    description:
      'Dix questions, quelques cartes, un coup d’œil au référentiel : assez pour garder le rythme entre deux services ou après une garde.',
    accent: 'amber',
    iconName: 'Sparkles',
    rhythm: '≈ 15 minutes',
    steps: [
      { kind: 'train', label: 'Quiz 10 questions', href: '/entrainement/quiz' },
      { kind: 'anchor', label: 'Flashcards au choix', href: '/entrainement/flashcards' },
      { kind: 'map', label: 'Une infraction au hasard', href: '/infractions' },
    ],
  },
];

export const courseStepMeta: Record<
  CourseStepKind,
  { label: string; emoji: string }
> = {
  read: { label: 'Lire', emoji: '📖' },
  train: { label: "S'entraîner", emoji: '⚡' },
  anchor: { label: 'Ancrer', emoji: '🧠' },
  map: { label: 'Cartographier', emoji: '🗺️' },
};
