/** Styles partagés pour badges / bordures selon la clé `couleur` des catégories. */
export const COULEURS: Record<
  string,
  {
    badge: string;
    border: string;
    borderLeft: string;
    /** Bandeau d’accroche dans le panneau fiche (bordure gauche épaisse + fond léger). */
    drawerIntro: string;
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
    drawerIntro: 'border-l-[6px] border-emerald-500 bg-emerald-500/[0.07]',
    borderHover: 'hover:border-emerald-500/50',
    title: 'text-emerald-400',
    dot: 'bg-emerald-400',
    tabActive: 'bg-emerald-500/15 text-emerald-200',
    tabUnderline: 'after:bg-emerald-400',
    tableHeader: 'bg-emerald-500/20 text-emerald-100',
    outlineBtn:
      'border-emerald-500/45 bg-emerald-500/[0.08] text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/70',
  },
  red: {
    badge: 'border-red-500/30 bg-red-500/10 text-red-300',
    border: 'border-red-500/40',
    borderLeft: 'border-l-red-500',
    drawerIntro: 'border-l-[6px] border-red-500 bg-red-500/[0.07]',
    borderHover: 'hover:border-red-500/50',
    title: 'text-red-400',
    dot: 'bg-red-400',
    tabActive: 'bg-red-500/15 text-red-200',
    tabUnderline: 'after:bg-red-400',
    tableHeader: 'bg-red-500/20 text-red-100',
    outlineBtn: 'border-red-500/45 bg-red-500/[0.08] text-red-200 hover:bg-red-500/15 hover:border-red-400/70',
  },
  blue: {
    badge: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
    border: 'border-blue-500/40',
    borderLeft: 'border-l-blue-500',
    drawerIntro: 'border-l-[6px] border-blue-500 bg-blue-500/[0.07]',
    borderHover: 'hover:border-blue-500/50',
    title: 'text-blue-400',
    dot: 'bg-blue-400',
    tabActive: 'bg-blue-500/15 text-blue-200',
    tabUnderline: 'after:bg-blue-400',
    tableHeader: 'bg-blue-500/20 text-blue-100',
    outlineBtn:
      'border-blue-500/45 bg-blue-500/[0.08] text-blue-200 hover:bg-blue-500/15 hover:border-blue-400/70',
  },
  violet: {
    badge: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
    border: 'border-violet-500/40',
    borderLeft: 'border-l-violet-500',
    drawerIntro: 'border-l-[6px] border-violet-500 bg-violet-500/[0.07]',
    borderHover: 'hover:border-violet-500/50',
    title: 'text-violet-400',
    dot: 'bg-violet-400',
    tabActive: 'bg-violet-500/15 text-violet-200',
    tabUnderline: 'after:bg-violet-400',
    tableHeader: 'bg-violet-500/20 text-violet-100',
    outlineBtn:
      'border-violet-500/45 bg-violet-500/[0.08] text-violet-200 hover:bg-violet-500/15 hover:border-violet-400/70',
  },
  amber: {
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
    border: 'border-amber-500/40',
    borderLeft: 'border-l-amber-500',
    drawerIntro: 'border-l-[6px] border-amber-500 bg-amber-500/[0.07]',
    borderHover: 'hover:border-amber-500/50',
    title: 'text-amber-300',
    dot: 'bg-amber-400',
    tabActive: 'bg-amber-500/15 text-amber-100',
    tabUnderline: 'after:bg-amber-400',
    tableHeader: 'bg-amber-500/20 text-amber-100',
    outlineBtn:
      'border-amber-500/45 bg-amber-500/[0.08] text-amber-100 hover:bg-amber-500/15 hover:border-amber-400/70',
  },
};

/** Bouton secondaire du tiroir fiche (« Voir le module ») — neutre gris. */
export const DRAWER_MODULE_BTN =
  'border border-slate-500/40 bg-white/[0.02] text-slate-200 hover:border-slate-400/55 hover:bg-white/[0.06]';

export const CAT_ORDER = ['procedure', 'droit-penal', 'acteurs', 'juridictions', 'special'] as const;

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
