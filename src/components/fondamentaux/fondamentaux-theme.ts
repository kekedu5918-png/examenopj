/** Styles partagés pour badges / bordures selon la clé `couleur` des catégories. */
export const COULEURS: Record<
  string,
  {
    badge: string;
    border: string;
    borderLeft: string;
    borderHover: string;
    title: string;
    dot: string;
    tabActive: string;
    tabUnderline: string;
    tableHeader: string;
    outlineBtn: string;
  }
> = {
  emerald: {
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    border: 'border-emerald-500/40',
    borderLeft: 'border-l-emerald-500',
    borderHover: 'hover:border-emerald-500/50',
    title: 'text-emerald-400',
    dot: 'bg-emerald-400',
    tabActive: 'bg-emerald-500/15 text-emerald-200',
    tabUnderline: 'after:bg-emerald-400',
    tableHeader: 'bg-emerald-500/20 text-emerald-100',
    outlineBtn:
      'border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/60',
  },
  red: {
    badge: 'border-red-500/30 bg-red-500/10 text-red-300',
    border: 'border-red-500/40',
    borderLeft: 'border-l-red-500',
    borderHover: 'hover:border-red-500/50',
    title: 'text-red-400',
    dot: 'bg-red-400',
    tabActive: 'bg-red-500/15 text-red-200',
    tabUnderline: 'after:bg-red-400',
    tableHeader: 'bg-red-500/20 text-red-100',
    outlineBtn: 'border-red-500/40 text-red-300 hover:bg-red-500/10 hover:border-red-400/60',
  },
  blue: {
    badge: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
    border: 'border-blue-500/40',
    borderLeft: 'border-l-blue-500',
    borderHover: 'hover:border-blue-500/50',
    title: 'text-blue-400',
    dot: 'bg-blue-400',
    tabActive: 'bg-blue-500/15 text-blue-200',
    tabUnderline: 'after:bg-blue-400',
    tableHeader: 'bg-blue-500/20 text-blue-100',
    outlineBtn: 'border-blue-500/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/60',
  },
  violet: {
    badge: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
    border: 'border-violet-500/40',
    borderLeft: 'border-l-violet-500',
    borderHover: 'hover:border-violet-500/50',
    title: 'text-violet-400',
    dot: 'bg-violet-400',
    tabActive: 'bg-violet-500/15 text-violet-200',
    tabUnderline: 'after:bg-violet-400',
    tableHeader: 'bg-violet-500/20 text-violet-100',
    outlineBtn:
      'border-violet-500/40 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400/60',
  },
};

export const CAT_ORDER = ['procedure', 'droit-penal', 'acteurs', 'juridictions'] as const;

/** Premières fiches accessibles en freemium (ordre pédagogique dans les données). */
export const FREEMIUM_UNLOCKED_IDS = new Set([
  'cadres-enquete',
  'controle-identite',
  'garde-a-vue',
  'perquisition',
  'mandats-justice',
  'audition',
]);

export const FONDAMENTAUX_VUES_STORAGE_KEY = 'examenopj:fondamentaux-vues';
