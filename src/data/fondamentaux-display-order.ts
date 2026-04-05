import { fasciculesList } from '@/data/fascicules-list';
import type { Categorie, Fiche } from '@/data/fondamentaux-types';

const THEME_ORDER: Categorie[] = ['procedure', 'droit-penal', 'acteurs', 'juridictions', 'special'];

/** Ordre « programme officiel » : F01…F15, puis fiches ⭐, puis titre. */
export function sortFichesProgramme(a: Fiche, b: Fiche): number {
  const fa = a.fasciculeNumero ?? 100;
  const fb = b.fasciculeNumero ?? 100;
  if (fa !== fb) return fa - fb;
  if (Boolean(b.indispensableExamen) !== Boolean(a.indispensableExamen)) {
    return a.indispensableExamen ? -1 : 1;
  }
  return a.titre.localeCompare(b.titre, 'fr', { sensitivity: 'base' });
}

/** Ordre par grande catégorie pédagogique du site. */
export function sortFichesTheme(a: Fiche, b: Fiche): number {
  const ia = THEME_ORDER.indexOf(a.categorie);
  const ib = THEME_ORDER.indexOf(b.categorie);
  if (ia !== ib) return ia - ib;
  if (Boolean(b.indispensableExamen) !== Boolean(a.indispensableExamen)) {
    return a.indispensableExamen ? -1 : 1;
  }
  return a.titre.localeCompare(b.titre, 'fr', { sensitivity: 'base' });
}

export type FicheProgrammeGroup = {
  fasciculeNumero: number | null;
  titre: string;
  fiches: Fiche[];
};

/** Regroupe les fiches par n° de fascicule officiel (une section par F01–F15 + Hors grille). */
export function groupFichesByProgramme(fiches: Fiche[]): FicheProgrammeGroup[] {
  const sorted = [...fiches].sort(sortFichesProgramme);
  const m = new Map<string, Fiche[]>();
  for (const f of sorted) {
    const n = f.fasciculeNumero;
    const key = n != null ? `f${n}` : 'none';
    m.set(key, [...(m.get(key) ?? []), f]);
  }
  const keys = [...m.keys()].sort((a, b) => {
    if (a === 'none') return 1;
    if (b === 'none') return -1;
    return Number(a.slice(1)) - Number(b.slice(1));
  });
  return keys.map((key) => {
    const list = m.get(key)!;
    const n = key === 'none' ? null : Number(key.slice(1));
    const meta = n != null ? fasciculesList.find((x) => x.numero === n) : undefined;
    return {
      fasciculeNumero: n,
      titre:
        meta != null
          ? `F${n!.toString().padStart(2, '0')} · ${meta.titre}`
          : 'Hors grille programme · fiches transverses',
      fiches: list,
    };
  });
}
