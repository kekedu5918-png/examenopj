import { ALPHA_ARTICULATION_CARTOUCHES } from '@/data/enquetes/alpha-articulation-transcription';
import { BRAVO_ARTICULATION_CARTOUCHES } from '@/data/enquetes/bravo-articulation-transcription';

export type ArticulationReferenceModel = {
  enqueteId: string;
  /** Titres attendus dans l’ordre de référence (copie fidèle du corrigé-type). */
  titresOrdre: string[];
};

const alpha: ArticulationReferenceModel = {
  enqueteId: 'alpha',
  titresOrdre: ALPHA_ARTICULATION_CARTOUCHES.map((c) => c.titre.trim()),
};

const bravo: ArticulationReferenceModel = {
  enqueteId: 'bravo',
  titresOrdre: BRAVO_ARTICULATION_CARTOUCHES.map((c) => c.titre.trim()),
};

const BY_ID: Record<string, ArticulationReferenceModel> = {
  alpha,
  bravo,
};

export function getArticulationReferenceModel(enqueteId: string | undefined): ArticulationReferenceModel | null {
  if (!enqueteId) return null;
  return BY_ID[enqueteId.toLowerCase()] ?? null;
}
