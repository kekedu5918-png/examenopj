/**
 * Regroupement « candidat » des infractions du référentiel (F01–F07),
 * sans imposer les codes fascicule en premier.
 */

import type { InfractionCatalogItem, RecapFasciculeId } from '@/data/recapitulatif-data';

export type InfractionFamily =
  | 'all'
  | 'personnes'
  | 'biens'
  | 'circulation'
  | 'ordre-public'
  | 'stupefiants'
  | 'mineurs-famille'
  | 'armes';

export const INFRACTION_FAMILY_OPTIONS: { id: InfractionFamily; label: string; hint: string }[] = [
  { id: 'all', label: 'Toutes les familles', hint: 'Tout le référentiel' },
  { id: 'personnes', label: 'Contre les personnes', hint: 'Vie, intégrité, libertés…' },
  { id: 'biens', label: 'Contre les biens', hint: 'Vol, escroquerie, recel…' },
  { id: 'circulation', label: 'Circulation routière', hint: 'Infractions routières' },
  { id: 'ordre-public', label: 'Nation, État, paix publique', hint: 'Atteintes à l’ordre public' },
  { id: 'stupefiants', label: 'Stupéfiants', hint: 'Usage, trafic…' },
  { id: 'mineurs-famille', label: 'Mineurs & famille', hint: 'Protection des mineurs' },
  { id: 'armes', label: 'Armes & munitions', hint: 'Détention, port…' },
];

const FASC_TO_FAMILY: Record<RecapFasciculeId, Exclude<InfractionFamily, 'all'>> = {
  F01: 'personnes',
  F02: 'biens',
  F03: 'circulation',
  F04: 'ordre-public',
  F05: 'stupefiants',
  F06: 'mineurs-famille',
  F07: 'armes',
};

export function fasciculeToFamily(fasc: RecapFasciculeId): Exclude<InfractionFamily, 'all'> {
  return FASC_TO_FAMILY[fasc];
}

export function matchesInfractionFamily(item: InfractionCatalogItem, family: InfractionFamily): boolean {
  if (family === 'all') return true;
  return fasciculeToFamily(item.fascicule) === family;
}

const FAMILY_LIST_ORDER: Exclude<InfractionFamily, 'all'>[] = [
  'personnes',
  'biens',
  'circulation',
  'ordre-public',
  'stupefiants',
  'mineurs-famille',
  'armes',
];

/** Regroupement affichage liste (raccourci) : ordre stable des familles. */
export function groupInfractionsByFamilyForList(items: InfractionCatalogItem[]): {
  value: string;
  label: string;
  items: InfractionCatalogItem[];
}[] {
  const map = new Map<Exclude<InfractionFamily, 'all'>, InfractionCatalogItem[]>();
  for (const it of items) {
    const fam = fasciculeToFamily(it.fascicule);
    const arr = map.get(fam) ?? [];
    arr.push(it);
    map.set(fam, arr);
  }
  return FAMILY_LIST_ORDER.filter((f) => map.has(f)).map((f) => ({
    value: `fam:${f}`,
    label: INFRACTION_FAMILY_OPTIONS.find((o) => o.id === f)?.label ?? f,
    items: map.get(f)!,
  }));
}
