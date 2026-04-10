'use server';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

type FlashcardReviewRow = Database['public']['Tables']['flashcard_reviews']['Row'];
type FlashcardReviewInsert = Database['public']['Tables']['flashcard_reviews']['Insert'];

export type RecordFlashcardReviewInput = {
  cardId: string;
  scope: string;
  bucket: 'know' | 'review' | 'dontKnow';
};

/**
 * Algorithme SM-2 simplifié.
 * grade : know=5, review=3, dontKnow=1
 * Retourne le nouvel ease_factor, l'intervalle en jours et la prochaine date de révision.
 */
function computeSM2(
  bucket: RecordFlashcardReviewInput['bucket'],
  currentEF: number,
  currentInterval: number,
): { easeFactor: number; intervalDays: number; nextReviewAt: string } {
  const grade = bucket === 'know' ? 5 : bucket === 'review' ? 3 : 1;

  // Mise à jour du facteur d'aisance
  let newEF = currentEF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (newEF < 1.3) newEF = 1.3;

  // Mise à jour de l'intervalle
  let newInterval: number;
  if (grade < 3) {
    // Mauvaise réponse → réinitialisation
    newInterval = 1;
  } else if (currentInterval === 0) {
    newInterval = 1;
  } else if (currentInterval === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(currentInterval * newEF);
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    easeFactor: Math.round(newEF * 100) / 100,
    intervalDays: newInterval,
    nextReviewAt: nextReview.toISOString(),
  };
}

/** Upsert l'état d'une carte pour un utilisateur connecté — no-op si invité. Met à jour SM-2. */
export async function recordFlashcardReview(input: RecordFlashcardReviewInput): Promise<{ ok: boolean }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: true };
  }

  // Récupérer l'état SM-2 actuel de la carte
  const { data: existing } = await (supabase as unknown as SupabaseClient<any>)
    .from('flashcard_reviews')
    .select('ease_factor, interval_days')
    .eq('user_id', user.id)
    .eq('card_id', input.cardId)
    .eq('scope', input.scope)
    .maybeSingle();

  const currentRow = existing as Pick<FlashcardReviewRow, 'ease_factor' | 'interval_days'> | null;
  const currentEF = currentRow?.ease_factor ?? 2.5;
  const currentInterval = currentRow?.interval_days ?? 0;

  const { easeFactor, intervalDays, nextReviewAt } = computeSM2(input.bucket, Number(currentEF), currentInterval);

  const row: FlashcardReviewInsert & {
    ease_factor: number;
    interval_days: number;
    next_review_at: string;
  } = {
    user_id: user.id,
    card_id: input.cardId,
    scope: input.scope,
    bucket: input.bucket,
    updated_at: new Date().toISOString(),
    ease_factor: easeFactor,
    interval_days: intervalDays,
    next_review_at: nextReviewAt,
  };

  const { error } = await (supabase as unknown as SupabaseClient<any>)
    .from('flashcard_reviews')
    .upsert(row, { onConflict: 'user_id,card_id,scope' });

  if (error) {
    console.error('[recordFlashcardReview]', error);
    return { ok: false };
  }

  return { ok: true };
}
