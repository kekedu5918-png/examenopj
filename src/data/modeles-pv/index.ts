import { modeleAuditionSuspectGav } from '@/data/modeles-pv/audition-suspect-gav';
import { modeleInterpellationFlagrance } from '@/data/modeles-pv/interpellation-flagrance';
import { modelePerquisitionFlagrance } from '@/data/modeles-pv/perquisition-flagrance';
import { modelePlainteContreX } from '@/data/modeles-pv/plainte-contre-x';
import { modelePlainteHorsLocaux } from '@/data/modeles-pv/plainte-hors-locaux';
import { modelePlaintePoursuiteEnquete } from '@/data/modeles-pv/plainte-poursuite-enquete';
import { modeleRapportSynthese } from '@/data/modeles-pv/rapport-synthese';
import { modeleVoisinage } from '@/data/modeles-pv/voisinage';
import type { ModelePV } from '@/types/pv';

export const MODELES_PV: ModelePV[] = [
  modelePlainteContreX,
  modelePlainteHorsLocaux,
  modelePlaintePoursuiteEnquete,
  modeleVoisinage,
  modeleInterpellationFlagrance,
  modeleAuditionSuspectGav,
  modelePerquisitionFlagrance,
  modeleRapportSynthese,
];

export function getModelePVBySlug(slug: string): ModelePV | undefined {
  return MODELES_PV.find((m) => m.id === slug);
}

export function getModelesPVSlugs(): string[] {
  return MODELES_PV.map((m) => m.id);
}

/** `fascicule` attendu du type `F01`…`F15`. */
export function getModelesByFasciculeCode(code: string): ModelePV[] {
  const u = code.trim().toUpperCase();
  return MODELES_PV.filter((m) => m.fascicule === u);
}

export {
  modeleAuditionSuspectGav,
  modeleInterpellationFlagrance,
  modelePerquisitionFlagrance,
  modelePlainteContreX,
  modelePlainteHorsLocaux,
  modelePlaintePoursuiteEnquete,
  modeleRapportSynthese,
  modeleVoisinage,
};
