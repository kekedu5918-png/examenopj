/**
 * Regroupement « candidat » des infractions du référentiel (blocs thématiques 01 à 07),
 * sans imposer les codes internes en premier.
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
  { id: 'all', label: 'Toutes les familles', hint: 'Vue complète du référentiel' },
  { id: 'personnes', label: 'Contre les personnes', hint: 'Vie, intégrité, libertés, atteintes sexuelles…' },
  { id: 'biens', label: 'Contre les biens', hint: 'Vol, escroquerie, recel, destructions…' },
  { id: 'circulation', label: 'Circulation routière', hint: 'Accidentologie, délit de fuite…' },
  { id: 'ordre-public', label: 'Nation, État, paix publique', hint: 'Atteintes aux institutions, administration…' },
  { id: 'stupefiants', label: 'Stupéfiants', hint: 'Usage, trafic, figures associées' },
  { id: 'mineurs-famille', label: 'Mineurs & famille', hint: 'Protection de l’enfance, autorité parentale…' },
  { id: 'armes', label: 'Armes & munitions', hint: 'Détention, port, infractions associées' },
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
