// ─────────────────────────────────────────────
// Badge definitions
// ─────────────────────────────────────────────

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export type BadgeCondition =
  | { type: 'sessions'; target: number }
  | { type: 'streak'; target: number }
  | { type: 'mastery'; target: number }
  | { type: 'questions'; target: number };

export type BadgeId =
  | 'first-session'
  | 'streak-7'
  | 'streak-30'
  | 'streak-60'
  | 'streak-100'
  | 'mastery-5'
  | 'mastery-20'
  | 'mastery-all'
  | 'questions-50'
  | 'questions-100'
  | 'questions-500';

export type BadgeDef = {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  condition: BadgeCondition;
};

export const BADGE_DEFINITIONS: BadgeDef[] = [
  {
    id: 'first-session',
    name: 'Première session',
    description: 'Complétez votre première session d'étude.',
    icon: '🎯',
    tier: 'bronze',
    condition: { type: 'sessions', target: 1 },
  },
  {
    id: 'streak-7',
    name: 'Semaine parfaite',
    description: '7 jours consécutifs de révision.',
    icon: '🔥',
    tier: 'bronze',
    condition: { type: 'streak', target: 7 },
  },
  {
    id: 'streak-30',
    name: 'Discipline',
    description: '30 jours consécutifs de révision.',
    icon: '⚡',
    tier: 'silver',
    condition: { type: 'streak', target: 30 },
  },
  {
    id: 'streak-60',
    name: 'Inarrêtable',
    description: '60 jours consécutifs de révision.',
    icon: '💪',
    tier: 'gold',
    condition: { type: 'streak', target: 60 },
  },
  {
    id: 'streak-100',
    name: 'Légende',
    description: '100 jours consécutifs de révision.',
    icon: '👑',
    tier: 'platinum',
    condition: { type: 'streak', target: 100 },
  },
  {
    id: 'mastery-5',
    name: 'Premiers acquis',
    description: '5 flashcards maîtrisées (SM-2).',
    icon: '📚',
    tier: 'bronze',
    condition: { type: 'mastery', target: 5 },
  },
  {
    id: 'mastery-20',
    name: 'Fondamentaux solides',
    description: '20 flashcards maîtrisées (SM-2).',
    icon: '🧠',
    tier: 'silver',
    condition: { type: 'mastery', target: 20 },
  },
  {
    id: 'mastery-all',
    name: 'Expert OPJ',
    description: 'Toutes les flashcards maîtrisées (SM-2).',
    icon: '🏆',
    tier: 'platinum',
    condition: { type: 'mastery', target: 999 },
  },
  {
    id: 'questions-50',
    name: 'Entraîné',
    description: '50 questions répondues au quiz.',
    icon: '✅',
    tier: 'bronze',
    condition: { type: 'questions', target: 50 },
  },
  {
    id: 'questions-100',
    name: 'Régulier',
    description: '100 questions répondues au quiz.',
    icon: '📝',
    tier: 'silver',
    condition: { type: 'questions', target: 100 },
  },
  {
    id: 'questions-500',
    name: 'Acharné',
    description: '500 questions répondues au quiz.',
    icon: '🚀',
    tier: 'gold',
    condition: { type: 'questions', target: 500 },
  },
];

// ─────────────────────────────────────────────
// Category metadata
// ─────────────────────────────────────────────

export type CategoryMeta = {
  slug: string;
  label: string;
  color: string; // Tailwind color key (e.g. 'cyan', 'red', 'violet')
};

export const CATEGORY_META: CategoryMeta[] = [
  { slug: 'atteintes-aux-personnes', label: 'Atteintes aux personnes', color: 'red' },
  { slug: 'atteintes-aux-biens', label: 'Atteintes aux biens', color: 'amber' },
  { slug: 'circulation-routiere', label: 'Circulation routière', color: 'cyan' },
  { slug: 'etat-et-paix-publique', label: 'Nation, État et paix publique', color: 'violet' },
  { slug: 'stupefiants', label: 'Stupéfiants', color: 'emerald' },
  { slug: 'mineurs-et-famille', label: 'Mineurs et famille', color: 'pink' },
  { slug: 'armes-et-munitions', label: 'Armes et munitions', color: 'orange' },
];

// ─────────────────────────────────────────────
// Tier styling
// ─────────────────────────────────────────────

export const TIER_STYLES: Record<BadgeTier, { border: string; bg: string; text: string; label: string }> = {
  bronze: {
    border: 'border-amber-700/40',
    bg: 'bg-amber-900/20',
    text: 'text-amber-600',
    label: 'Bronze',
  },
  silver: {
    border: 'border-slate-400/40',
    bg: 'bg-slate-700/20',
    text: 'text-slate-400',
    label: 'Argent',
  },
  gold: {
    border: 'border-yellow-500/40',
    bg: 'bg-yellow-900/20',
    text: 'text-yellow-400',
    label: 'Or',
  },
  platinum: {
    border: 'border-cyan-400/40',
    bg: 'bg-cyan-900/20',
    text: 'text-cyan-300',
    label: 'Platine',
  },
};
