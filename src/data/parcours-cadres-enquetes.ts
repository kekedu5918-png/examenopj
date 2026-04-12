import type { LucideIcon } from 'lucide-react';
import { Compass, Flag, Gavel, Map, Sparkles } from 'lucide-react';

export const CADRES_PARCOURS_SLUG = 'cadres-enquetes' as const;

export type CadresStepSlug = 'intro' | 'flagrance' | 'garde-a-vue' | 'enquete-preliminaire' | 'synthese';

export type CadresStepMeta = {
  slug: CadresStepSlug;
  title: string;
  shortTitle: string;
  subtitle: string;
  Icon: LucideIcon;
  /** Gradient stops (Tailwind-ish) */
  gradient: string;
  glow: string;
  /** intro = pas de quiz ; synthese = déblocage final */
  kind: 'intro' | 'lesson' | 'synthese';
};

export const CADRES_STEPS: CadresStepMeta[] = [
  {
    slug: 'intro',
    title: 'Cartographier les cadres',
    shortTitle: 'Introduction',
    subtitle: 'Vue d’ensemble avant d’entrer dans le détail',
    Icon: Compass,
    gradient: 'from-cyan-500/25 via-sky-600/15 to-indigo-900/40',
    glow: 'shadow-[0_0_60px_-12px_rgba(34,211,238,0.35)]',
    kind: 'intro',
  },
  {
    slug: 'flagrance',
    title: 'La flagrance',
    shortTitle: 'Flagrance',
    subtitle: 'Critères, effets, durée',
    Icon: Flag,
    gradient: 'from-rose-500/25 via-orange-600/15 to-amber-950/40',
    glow: 'shadow-[0_0_60px_-12px_rgba(251,113,133,0.35)]',
    kind: 'lesson',
  },
  {
    slug: 'garde-a-vue',
    title: 'La garde à vue',
    shortTitle: 'GAV',
    subtitle: 'Cadre, droits, prolongations',
    Icon: Gavel,
    gradient: 'from-violet-500/25 via-fuchsia-600/15 to-purple-950/40',
    glow: 'shadow-[0_0_60px_-12px_rgba(167,139,250,0.35)]',
    kind: 'lesson',
  },
  {
    slug: 'enquete-preliminaire',
    title: 'L’enquête préliminaire',
    shortTitle: 'EP / AP',
    subtitle: 'Ouverture, actes, contrôle',
    Icon: Map,
    gradient: 'from-emerald-500/25 via-teal-600/15 to-slate-950/40',
    glow: 'shadow-[0_0_60px_-12px_rgba(52,211,153,0.35)]',
    kind: 'lesson',
  },
  {
    slug: 'synthese',
    title: 'Synthèse débloquée',
    shortTitle: 'Synthèse',
    subtitle: 'Ta carte mentale du module',
    Icon: Sparkles,
    gradient: 'from-amber-400/30 via-yellow-600/20 to-orange-950/50',
    glow: 'shadow-[0_0_70px_-10px_rgba(251,191,36,0.45)]',
    kind: 'synthese',
  },
];

export const CADRES_QUIZ_PASS_PCT = 70;

export type CadresQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  /** index 0-based */
  correctIndex: number;
  explain: string;
};

export const CADRES_QUIZZES: Record<Exclude<CadresStepSlug, 'intro' | 'synthese'>, CadresQuizQuestion[]> = {
  flagrance: [
    {
      id: 'fl-1',
      prompt: 'La flagrance suppose notamment que le crime ou le délit se commet…',
      options: [
        'Dans un délai de 30 jours après les faits',
        'Au moment où l’OPJ en a connaissance',
        'Lorsqu’il est commis ou sur le point de l’être',
        'Uniquement si la victime porte plainte immédiatement',
      ],
      correctIndex: 2,
      explain:
        'La notion opérationnelle vise des faits en cours ou imminents — pas une simple rétroactivité calendaire.',
    },
    {
      id: 'fl-2',
      prompt: 'En flagrance, l’OPJ peut notamment…',
      options: [
        'Ouvrir une enquête préliminaire sans autorité',
        'Réaliser des actes urgents conformément au CPP (selon les cas)',
        'Dispenser de tout contrôle judiciaire toute mesure coercitive',
        'Transformer seul la procédure en instruction',
      ],
      correctIndex: 1,
      explain: 'Les pouvoirs sont encadrés : flagrance = cadre procédural spécifique, pas « tout pouvoir ».',
    },
    {
      id: 'fl-3',
      prompt: 'La durée de la garde à vue en procédure de flagrance est plafonnée à…',
      options: ['12 h', '24 h', '48 h (prolongations possibles selon cas)', '96 h systématiquement'],
      correctIndex: 2,
      explain: 'Retenir l’ordre de grandeur 48 h et les prolongations comme point de contrôle en révision.',
    },
  ],
  'garde-a-vue': [
    {
      id: 'gav-1',
      prompt: 'La garde à vue vise avant tout à…',
      options: [
        'Punir la personne entendue',
        'Permettre l’identification et les investigations nécessaires dans le temps légal',
        'Remplacer l’audition libre',
        'Éviter toute information au parquet',
      ],
      correctIndex: 1,
      explain: 'Finalité procédurale : enquête et identification, dans un régime strict de droits.',
    },
    {
      id: 'gav-2',
      prompt: 'Parmi les droits du gardé à vue (principes généraux), on retrouve notamment…',
      options: [
        'Le droit de ne jamais être assisté',
        'L’information sur ses droits et l’assistance d’un avocat (selon cadre légal)',
        'L’absence de notification à l’autorité judiciaire',
        'La suppression du procès-verbal',
      ],
      correctIndex: 1,
      explain: 'Les textes et la jurisprudence encadrent l’information et l’assistance — maîtrise les articulations.',
    },
    {
      id: 'gav-3',
      prompt: 'Une prolongation de garde à vue doit généralement…',
      options: [
        'Être décidée par l’OPJ seul, sans formalisme',
        'Respecter les conditions et autorisations prévues par le CPP',
        'Être systématique après 12 h',
        'Être notifiée uniquement au suspect',
      ],
      correctIndex: 1,
      explain: 'Les prolongations sont des actes encadrés : autorisations, durées, motivation.',
    },
  ],
  'enquete-preliminaire': [
    {
      id: 'ep-1',
      prompt: "L'enquête préliminaire est ouverte notamment…",
      options: [
        'Par le préfet',
        'Par le procureur de la République (ou compétence liée)',
        'Par le juge d’instruction spontanément',
        'Par le suspect',
      ],
      correctIndex: 1,
      explain: 'Le parquet pilote l’ouverture EP dans le schéma classique — à croiser avec ton cours.',
    },
    {
      id: 'ep-2',
      prompt: 'Par rapport à la flagrance, l’EP permet souvent…',
      options: [
        'De supprimer toutes les nullités',
        'D’étendre le champ des actes d’enquête dans un cadre différent',
        "D'éviter tout écrit",
        'De clore définitivement les poursuites seul',
      ],
      correctIndex: 1,
      explain: 'Chaque cadre a son régime d’actes et de contrôles : pense « boîte à outils ».',
    },
    {
      id: 'ep-3',
      prompt: 'Les actes coercitifs en EP sont en principe…',
      options: [
        'Libres sans autorisation',
        'Soumis aux conditions et autorisations prévues (selon nature de l’acte)',
        'Identiques à la garde à vue sans distinction',
        'Réservés au seul OPJ sans parquet',
      ],
      correctIndex: 1,
      explain: 'La précision « selon l’acte » est clé en dissertation comme à l’oral.',
    },
  ],
};

export function cadresMarkdownPath(slug: CadresStepSlug): string {
  return `parcours/cadres-enquetes/${slug}.md`;
}
