import type { InfractionOfficielleMeta, InfractionOfficielleRecord } from '@/types/infractions-officielles';

import audit from '../../reference/audit/infractions_officielles.json';

export type InfractionsOfficiellesFile = {
  meta: InfractionOfficielleMeta;
  infractions: InfractionOfficielleRecord[];
  migration_site?: { recapitulatif_typescript?: string; lignes_catalogue_actuel?: number; statut?: string };
};

// JSON d'audit : entrées complètes ou en cours d'extraction (TODO fascicule).
const data = audit as unknown as InfractionsOfficiellesFile;

export function getInfractionsOfficielles(): InfractionOfficielleRecord[] {
  return data.infractions;
}

export function getInfractionOfficielleById(id: string): InfractionOfficielleRecord | undefined {
  return data.infractions.find((i) => i.id === id);
}

export function getInfractionsOfficiellesMeta(): InfractionOfficielleMeta {
  return data.meta;
}
