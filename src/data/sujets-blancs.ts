import { SESSION_BLANC_A } from '@/data/sujets-blancs-session-a';
import { SESSION_BLANC_B } from '@/data/sujets-blancs-session-b';
import { SESSION_BLANC_C } from '@/data/sujets-blancs-session-c';
import type {
  Epreuve1DPS,
  Epreuve2Procedure,
  Epreuve3Oral,
  QuestionProcedure,
  SujetBlanc,
} from '@/data/sujets-blancs-types';

export type { Epreuve1DPS, Epreuve2Procedure, Epreuve3Oral, QuestionProcedure, SujetBlanc };

export const SUJETS_BLANCS: SujetBlanc[] = [SESSION_BLANC_A, SESSION_BLANC_B, SESSION_BLANC_C];

export function getSujetBlancById(id: string): SujetBlanc | undefined {
  return SUJETS_BLANCS.find((s) => s.id === id);
}

export function getSujetsBlancsIds(): string[] {
  return SUJETS_BLANCS.map((s) => s.id);
}
