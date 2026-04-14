'use server';

import { revalidatePath } from 'next/cache';

import { quizAttemptToLessonClientKey } from '@/data/learning-path-quiz-bridge';
import { updateStreakAfterSession } from '@/features/gamification/actions/update-streak';
import { completeLesson, getLessonIdByClientKey, UNLOCK_MIN_SCORE_PCT } from '@/lib/learningPath';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

type QuizAttemptInsert = Database['public']['Tables']['quiz_attempts']['Insert'];

export type RecordQuizAttemptInput = {
  mode: 'global' | 'fascicule' | 'module' | 'domain';
  fasciculeNum?: number | null;
  domainKey?: string | null;
  score: number;
  total: number;
  percent: number;
};

/** Enregistre une session de quiz pour un utilisateur connecté (no-op si invité). */
export async function recordQuizAttempt(input: RecordQuizAttemptInput): Promise<{ ok: boolean }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: true };
  }

  const dbMode = input.mode === 'module' ? 'fascicule' : input.mode;

  const row: QuizAttemptInsert = {
    user_id: user.id,
    mode: dbMode,
    fascicule_num: input.fasciculeNum ?? null,
    domain_key: input.domainKey ?? null,
    score: input.score,
    total: input.total,
    percent: Math.round(input.percent * 100) / 100,
  };

  const { error } = await (supabase as unknown as SupabaseClient<Database>)
    .from('quiz_attempts')
    .insert(row);

  if (error) {
    console.error('[recordQuizAttempt]', error);
    return { ok: false };
  }

  // Pont parcours OPJ : quiz thématique ≥ seuil → complète la leçon « QCM guidé » correspondante (idempotent côté XP si régression).
  const clientKey = quizAttemptToLessonClientKey(input);
  if (clientKey && input.percent >= UNLOCK_MIN_SCORE_PCT) {
    const lessonId = await getLessonIdByClientKey(clientKey);
    if (lessonId) {
      const scoreRounded = Math.min(100, Math.max(0, Math.round(Number(input.percent))));
      const pathResult = await completeLesson(user.id, lessonId, scoreRounded);
      if (pathResult.success) {
        revalidatePath('/dashboard');
        revalidatePath('/dashboard/parcours');
        revalidatePath('/dashboard/progression');
      }
    }
  }

  // Mise à jour du streak et badges (fire-and-forget, sans bloquer)
  updateStreakAfterSession(input.total).catch((e) =>
    console.error('[updateStreakAfterSession]', e),
  );

  return { ok: true };
}
