import type { CadresStepSlug } from '@/data/parcours-cadres-enquetes';
import { CADRES_QUIZ_PASS_PCT } from '@/data/parcours-cadres-enquetes';
import { isCadresStepUnlocked } from '@/data/parcours-cadres-unlock';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

import 'server-only';

type CadresDbRow = Database['public']['Tables']['parcours_cadres_progress']['Row'];
type CadresInsert = Database['public']['Tables']['parcours_cadres_progress']['Insert'];

function cadresDb(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  return supabase as unknown as SupabaseClient<Database>;
}

export type CadresProgressRow = {
  step_slug: CadresStepSlug;
  lesson_completed: boolean;
  quiz_best_score: number | null;
  quiz_passed: boolean;
};

export function isStepUnlocked(
  slug: CadresStepSlug,
  bySlug: Partial<Record<CadresStepSlug, CadresProgressRow>>,
): boolean {
  return isCadresStepUnlocked(slug, bySlug);
}

export async function fetchCadresProgressMap(userId: string): Promise<Partial<Record<CadresStepSlug, CadresProgressRow>>> {
  const supabase = cadresDb(await createSupabaseServerClient());
  const { data, error } = await supabase
    .from('parcours_cadres_progress')
    .select('step_slug, lesson_completed, quiz_best_score, quiz_passed')
    .eq('user_id', userId);
  if (error || !data) {
    return {};
  }
  const map: Partial<Record<CadresStepSlug, CadresProgressRow>> = {};
  for (const row of data as Pick<
    CadresDbRow,
    'step_slug' | 'lesson_completed' | 'quiz_best_score' | 'quiz_passed'
  >[]) {
    map[row.step_slug as CadresStepSlug] = {
      step_slug: row.step_slug as CadresStepSlug,
      lesson_completed: row.lesson_completed,
      quiz_best_score: row.quiz_best_score,
      quiz_passed: row.quiz_passed,
    };
  }
  return map;
}

export async function upsertCadresLessonComplete(userId: string, stepSlug: CadresStepSlug) {
  const supabase = cadresDb(await createSupabaseServerClient());
  const { data: existing } = await supabase
    .from('parcours_cadres_progress')
    .select('quiz_best_score, quiz_passed')
    .eq('user_id', userId)
    .eq('step_slug', stepSlug)
    .maybeSingle();

  const row: CadresInsert = {
    user_id: userId,
    step_slug: stepSlug,
    lesson_completed: true,
    quiz_best_score: existing?.quiz_best_score ?? null,
    quiz_passed: existing?.quiz_passed ?? false,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('parcours_cadres_progress').upsert(row, { onConflict: 'user_id,step_slug' });
  return { error: error?.message ?? null };
}

export async function upsertCadresQuizResult(userId: string, stepSlug: CadresStepSlug, scorePct: number) {
  const supabase = cadresDb(await createSupabaseServerClient());
  const { data: existing } = await supabase
    .from('parcours_cadres_progress')
    .select('quiz_best_score, quiz_passed, lesson_completed')
    .eq('user_id', userId)
    .eq('step_slug', stepSlug)
    .maybeSingle();

  const prevBest = existing?.quiz_best_score ?? null;
  const best = prevBest == null ? scorePct : Math.max(prevBest, scorePct);
  const passed = (existing?.quiz_passed ?? false) || scorePct >= CADRES_QUIZ_PASS_PCT;

  const row: CadresInsert = {
    user_id: userId,
    step_slug: stepSlug,
    lesson_completed: existing?.lesson_completed ?? false,
    quiz_best_score: best,
    quiz_passed: passed,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('parcours_cadres_progress').upsert(row, { onConflict: 'user_id,step_slug' });

  return { error: error?.message ?? null, passed: scorePct >= CADRES_QUIZ_PASS_PCT, bestScore: best };
}
