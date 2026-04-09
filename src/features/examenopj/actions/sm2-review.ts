'use server';

import type { SupabaseClient } from '@supabase/supabase-js';

import { applySM2Quality, DEFAULT_SM2_STATE } from '@/lib/sm2';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

function sb(client: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  return client as unknown as SupabaseClient<any>;
}

// ─────────────────────────────────────────────
// Upsert a schedule row (create or get existing)
// ─────────────────────────────────────────────

export async function getOrCreateSchedule(
  contentId: string,
  contentType: 'flashcard' | 'question' | 'infraction' = 'flashcard',
): Promise<{ ok: boolean; scheduleId?: string }> {
  const supabase = sb(await createSupabaseServerClient());
  const {
    data: { user },
  } = await (supabase as any).auth.getUser();
  if (!user) return { ok: false };

  // Try to get existing row
  const { data: existing } = await supabase
    .from('user_review_schedule')
    .select('id')
    .eq('user_id', user.id)
    .eq('content_id', contentId)
    .eq('content_type', contentType)
    .maybeSingle();

  if (existing?.id) return { ok: true, scheduleId: existing.id };

  // Create new row with default SM-2 state
  const { data, error } = await supabase
    .from('user_review_schedule')
    .insert({
      user_id: user.id,
      content_id: contentId,
      content_type: contentType,
      easiness_factor: DEFAULT_SM2_STATE.easinessFactor,
      interval_days: DEFAULT_SM2_STATE.intervalDays,
      repetitions: DEFAULT_SM2_STATE.repetitions,
      status: 'new',
    })
    .select('id')
    .single();

  if (error) {
    console.error('[getOrCreateSchedule]', error);
    return { ok: false };
  }

  return { ok: true, scheduleId: (data as { id: string }).id };
}

// ─────────────────────────────────────────────
// Submit a SM-2 review
// ─────────────────────────────────────────────

export type SubmitSM2ReviewInput = {
  scheduleId: string;
  quality: number;          // 0–5
  timeSpentSeconds?: number;
  responseText?: string;
};

export type SubmitSM2ReviewResult = {
  ok: boolean;
  nextReviewDate?: string;
  intervalDays?: number;
  easinessFactor?: number;
  repetitions?: number;
  status?: string;
  correct?: boolean;
};

export async function submitSM2Review(
  input: SubmitSM2ReviewInput,
): Promise<SubmitSM2ReviewResult> {
  const { scheduleId, quality, timeSpentSeconds, responseText } = input;

  if (quality < 0 || quality > 5) return { ok: false };

  const supabase = sb(await createSupabaseServerClient());
  const {
    data: { user },
  } = await (supabase as any).auth.getUser();
  if (!user) return { ok: false };

  // Fetch current SM-2 state
  const { data: row, error: fetchError } = await supabase
    .from('user_review_schedule')
    .select(
      'id, easiness_factor, interval_days, repetitions, total_attempts, correct_attempts',
    )
    .eq('id', scheduleId)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !row) {
    console.error('[submitSM2Review] fetch', fetchError);
    return { ok: false };
  }

  // Apply SM-2 algorithm
  const result = applySM2Quality(
    {
      easinessFactor: Number(row.easiness_factor),
      intervalDays: Number(row.interval_days),
      repetitions: Number(row.repetitions),
    },
    quality,
  );

  const totalAttempts = Number(row.total_attempts) + 1;
  const correctAttempts = Number(row.correct_attempts) + (result.correct ? 1 : 0);
  const successRate = Number(((correctAttempts / totalAttempts) * 100).toFixed(2));

  // Update schedule
  const { error: updateError } = await supabase
    .from('user_review_schedule')
    .update({
      easiness_factor: result.easinessFactor,
      interval_days: result.intervalDays,
      repetitions: result.repetitions,
      next_review_date: result.nextReviewDate,
      last_reviewed_at: new Date().toISOString(),
      quality_last_review: quality,
      total_attempts: totalAttempts,
      correct_attempts: correctAttempts,
      success_rate: successRate,
      status: result.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', scheduleId)
    .eq('user_id', user.id);

  if (updateError) {
    console.error('[submitSM2Review] update', updateError);
    return { ok: false };
  }

  // Log to review_history
  await supabase.from('review_history').insert({
    schedule_id: scheduleId,
    user_id: user.id,
    quality,
    time_spent_seconds: timeSpentSeconds ?? null,
    correct: result.correct,
    response_text: responseText ?? null,
  });

  return {
    ok: true,
    nextReviewDate: result.nextReviewDate,
    intervalDays: result.intervalDays,
    easinessFactor: result.easinessFactor,
    repetitions: result.repetitions,
    status: result.status,
    correct: result.correct,
  };
}

// ─────────────────────────────────────────────
// Bulk-initialize SM-2 from existing flashcard_reviews
// ─────────────────────────────────────────────

/**
 * Migrates existing flashcard_reviews (know/review/dontKnow buckets) into
 * user_review_schedule rows so returning users have a starting SM-2 state.
 * Safe to call multiple times — uses upsert with conflict ignore.
 */
export async function initSM2FromFlashcardReviews(): Promise<{ ok: boolean; created: number }> {
  const supabase = sb(await createSupabaseServerClient());
  const {
    data: { user },
  } = await (supabase as any).auth.getUser();
  if (!user) return { ok: false, created: 0 };

  const { data: reviews } = await supabase
    .from('flashcard_reviews')
    .select('card_id, bucket')
    .eq('user_id', user.id);

  if (!reviews || reviews.length === 0) return { ok: true, created: 0 };

  // Filter out cards that already have a schedule row
  const { data: existing } = await supabase
    .from('user_review_schedule')
    .select('content_id')
    .eq('user_id', user.id)
    .eq('content_type', 'flashcard');

  const existingIds = new Set((existing ?? []).map((r: any) => r.content_id as string));

  const toInsert = (reviews as { card_id: string; bucket: string }[])
    .filter((r) => !existingIds.has(r.card_id))
    .map((r) => {
      const quality = r.bucket === 'know' ? 5 : r.bucket === 'review' ? 3 : 0;
      // Seed initial SM-2 state based on bucket
      const state = applySM2Quality(DEFAULT_SM2_STATE, quality);
      return {
        user_id: user.id,
        content_id: r.card_id,
        content_type: 'flashcard',
        easiness_factor: state.easinessFactor,
        interval_days: state.intervalDays,
        repetitions: state.repetitions,
        next_review_date: state.nextReviewDate,
        last_reviewed_at: new Date().toISOString(),
        quality_last_review: quality,
        total_attempts: 1,
        correct_attempts: state.correct ? 1 : 0,
        success_rate: state.correct ? 100 : 0,
        status: state.status,
      };
    });

  if (toInsert.length === 0) return { ok: true, created: 0 };

  const { error } = await supabase.from('user_review_schedule').insert(toInsert);

  if (error) {
    console.error('[initSM2FromFlashcardReviews]', error);
    return { ok: false, created: 0 };
  }

  return { ok: true, created: toInsert.length };
}
