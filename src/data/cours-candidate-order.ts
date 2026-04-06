/**
 * Ordre d’étude « vue candidat » : P0 d’abord, puis pondération globale aux trois épreuves.
 * Les numéros F restent en rappel discret — la logique affichée est celle du concours.
 */

import { type FasciculeExamProfile,getFasciculeExamProfile } from '@/data/exam-competency-map';
import type { FasciculeMetadata } from '@/data/fascicules-list';
import { fasciculesList } from '@/data/fascicules-list';

export function totalEpreuveWeight(profile: FasciculeExamProfile): number {
  return profile.epreuveWeight[1] + profile.epreuveWeight[2] + profile.epreuveWeight[3];
}

export function compareModulesForCandidate(a: { id: string }, b: { id: string }): number {
  const pa = getFasciculeExamProfile(a.id);
  const pb = getFasciculeExamProfile(b.id);
  if (pa.priority !== pb.priority) return pa.priority === 'P0' ? -1 : 1;
  const wa = totalEpreuveWeight(pa);
  const wb = totalEpreuveWeight(pb);
  if (wa !== wb) return wb - wa;
  return a.id.localeCompare(b.id);
}

/** Toutes les fiches, triées pour l’affichage « priorité concours ». */
export function getFasciculesOrderedForCandidate(): FasciculeMetadata[] {
  return [...fasciculesList].sort(compareModulesForCandidate);
}
