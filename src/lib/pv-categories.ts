import type { PVCategorie } from '@/types/pv';

export type PVCategorieMeta = {
  label: string;
  shortLabel: string;
  badgeClass: string;
};

export const PV_CATEGORIE_META: Record<PVCategorie, PVCategorieMeta> = {
  plainte: {
    label: 'Plainte',
    shortLabel: 'Plainte',
    badgeClass: 'bg-sky-500/20 text-sky-100 ring-sky-400/30',
  },
  constatation: {
    label: 'Constatation',
    shortLabel: 'Constat.',
    badgeClass: 'bg-emerald-500/20 text-emerald-100 ring-emerald-400/30',
  },
  voisinage: {
    label: 'Voisinage',
    shortLabel: 'Voisin.',
    badgeClass: 'bg-teal-500/20 text-teal-100 ring-teal-400/30',
  },
  interpellation: {
    label: 'Interpellation',
    shortLabel: 'Interp.',
    badgeClass: 'bg-rose-500/20 text-rose-100 ring-rose-400/30',
  },
  'audition-temoin': {
    label: 'Audition témoin',
    shortLabel: 'Témoin',
    badgeClass: 'bg-violet-500/20 text-violet-100 ring-violet-400/30',
  },
  'audition-suspect-gav': {
    label: 'Audition GAV',
    shortLabel: 'Aud. GAV',
    badgeClass: 'bg-amber-500/20 text-amber-100 ring-amber-400/35',
  },
  confrontation: {
    label: 'Confrontation',
    shortLabel: 'Confr.',
    badgeClass: 'bg-fuchsia-500/20 text-fuchsia-100 ring-fuchsia-400/30',
  },
  perquisition: {
    label: 'Perquisition',
    shortLabel: 'Perquis.',
    badgeClass: 'bg-orange-500/20 text-orange-100 ring-orange-400/35',
  },
  scelle: {
    label: 'Scellé',
    shortLabel: 'Scellé',
    badgeClass: 'bg-slate-500/20 text-slate-100 ring-slate-400/30',
  },
  requisition: {
    label: 'Réquisition',
    shortLabel: 'Réquis.',
    badgeClass: 'bg-indigo-500/20 text-indigo-100 ring-indigo-400/30',
  },
  'rapport-synthese': {
    label: 'Rapport de synthèse',
    shortLabel: 'Rapport',
    badgeClass: 'bg-cyan-500/20 text-cyan-100 ring-cyan-400/30',
  },
};

export const PV_CATEGORIES_ORDER: PVCategorie[] = [
  'plainte',
  'constatation',
  'voisinage',
  'interpellation',
  'audition-temoin',
  'audition-suspect-gav',
  'confrontation',
  'perquisition',
  'scelle',
  'requisition',
  'rapport-synthese',
];

export function pvCategorieLabel(c: PVCategorie): string {
  return PV_CATEGORIE_META[c].label;
}
