'use server';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

type FlashcardReviewInsert = Database['public']['Tables']['flashcard_reviews']['Insert'];

export type RecordFlashcardReviewInput = {
  cardId: string;
  scope: string;
  bucket: 'know' | 'review' | 'dontKnow';
};

/** Upsert l’état d’une carte (clé locale) pour un utilisateur connecté — no-op si invité. */
export async function recordFlashcardReview(input: RecordFlashcardReviewInput): Promise<{ ok: boolean }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: true };
  }

  const row: FlashcardReviewInsert = {
    user_id: user.id,
    card_id: input.cardId,
    scope: input.scope,
    bucket: input.bucket,
    updated_at: new Date().toISOString(),
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
