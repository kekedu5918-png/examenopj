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
  { id: 'all', label: 'Toutes les familles', hint: 'Programme DPS + liés' },
  { id: 'personnes', label: 'Contre les personnes', hint: 'F01 — vie, intégrité, libertés…' },
  { id: 'biens', label: 'Contre les biens', hint: 'F02 — vol, escroquerie, recel…' },
  { id: 'circulation', label: 'Circulation routière', hint: 'F03' },
  { id: 'ordre-public', label: 'Nation, État, paix publique', hint: 'F04' },
  { id: 'stupefiants', label: 'Stupéfiants', hint: 'F05' },
  { id: 'mineurs-famille', label: 'Mineurs & famille', hint: 'F06' },
  { id: 'armes', label: 'Armes & munitions', hint: 'F07' },
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
