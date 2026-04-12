'use server';

import { revalidatePath } from 'next/cache';

import type { CadresStepSlug } from '@/data/parcours-cadres-enquetes';
import { CADRES_QUIZZES } from '@/data/parcours-cadres-enquetes';
import { getSession } from '@/features/account/controllers/get-session';
import {
  fetchCadresProgressMap,
  isStepUnlocked,
  upsertCadresLessonComplete,
  upsertCadresQuizResult,
} from '@/features/parcours/cadres-progress';

export async function cadresMarkLessonCompleteAction(stepSlug: CadresStepSlug) {
  const session = await getSession();
  if (!session?.user?.id) {
    return { ok: false as const, error: 'Non connecté' };
  }
  const map = await fetchCadresProgressMap(session.user.id);
  if (!isStepUnlocked(stepSlug, map)) {
    return { ok: false as const, error: 'Étape non débloquée' };
  }
  const { error } = await upsertCadresLessonComplete(session.user.id, stepSlug);
  if (error) return { ok: false as const, error };
  revalidatePath('/entrainement/parcours/cadres-enquetes');
  revalidatePath(`/entrainement/parcours/cadres-enquetes/${stepSlug}`);
  return { ok: true as const };
}

export async function cadresSubmitQuizAction(stepSlug: CadresStepSlug, answerIndices: number[]) {
  const session = await getSession();
  if (!session?.user?.id) {
    return { ok: false as const, error: 'Non connecté' };
  }
  const map = await fetchCadresProgressMap(session.user.id);
  if (!isStepUnlocked(stepSlug, map)) {
    return { ok: false as const, error: 'Étape non débloquée' };
  }
  const quiz = CADRES_QUIZZES[stepSlug as keyof typeof CADRES_QUIZZES];
  if (!quiz || quiz.length === 0) {
    return { ok: false as const, error: 'Pas de quiz pour cette étape' };
  }
  if (answerIndices.length !== quiz.length) {
    return { ok: false as const, error: 'Réponses incomplètes' };
  }
  let correct = 0;
  for (let i = 0; i < quiz.length; i++) {
    if (answerIndices[i] === quiz[i]!.correctIndex) correct++;
  }
  const scorePct = Math.round((correct / quiz.length) * 100);
  const { error, passed, bestScore } = await upsertCadresQuizResult(session.user.id, stepSlug, scorePct);
  if (error) return { ok: false as const, error };
  revalidatePath('/entrainement/parcours/cadres-enquetes');
  revalidatePath(`/entrainement/parcours/cadres-enquetes/${stepSlug}`);
  return {
    ok: true as const,
    scorePct,
    passed,
    bestScore,
    correct,
    total: quiz.length,
  };
}
