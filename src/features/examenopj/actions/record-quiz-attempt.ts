'use server';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

type QuizAttemptInsert = Database['public']['Tables']['quiz_attempts']['Insert'];

export type RecordQuizAttemptInput = {
  mode: 'global' | 'fascicule' | 'module' | 'domain';
  fasciculeNum?: number | null;
  domainKey?: string | null;
  /** Résumé des filtres métier (stocké en `domain_key` côté base si le mode n’est pas « domaine »). */
  filterContext?: string | null;
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

  const domainKeyResolved =
    input.mode === 'domain'
      ? (input.domainKey ?? null)
      : (input.filterContext ?? input.domainKey ?? null);

  const row: QuizAttemptInsert = {
    user_id: user.id,
    mode: dbMode,
    fascicule_num: input.fasciculeNum ?? null,
    domain_key: domainKeyResolved,
    score: input.score,
    total: input.total,
    percent: Math.round(input.percent * 100) / 100,
  };

  // Cast : le client typé `Database` résout parfois `.from('quiz_attempts')` en `never` (schéma partiel vs postgrest-js).
  const { error } = await (supabase as unknown as SupabaseClient<any>).from('quiz_attempts').insert(row);

  if (error) {
    console.error('[recordQuizAttempt]', error);
    return { ok: false };
  }

  return { ok: true };
}
