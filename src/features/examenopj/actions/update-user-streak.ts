'use server';

import { BADGE_DEFINITIONS } from '@/lib/gamification-definitions';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { todayIso } from '@/utils/date';
import type { SupabaseClient } from '@supabase/supabase-js';

function sb(client: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  return client as unknown as SupabaseClient<any>;
}

export type UpdateStreakResult = {
  ok: boolean;
  currentStreak?: number;
  longestStreak?: number;
  totalSessions?: number;
  newBadges?: string[];
};

/**
 * Called (fire-and-forget) when the user completes a quiz or SM-2 session.
 * Creates or updates the user_streaks row and awards streak badges.
 */
export async function updateUserStreak(): Promise<UpdateStreakResult> {
  const supabase = sb(await createSupabaseServerClient());

  const {
    data: { user },
  } = await (supabase as any).auth.getUser();

  if (!user) return { ok: true };

  const today = todayIso();

  // ── Fetch existing streak row ──
  const { data: existing } = await supabase
    .from('user_streaks')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  let currentStreak = 1;
  let longestStreak = 1;
  let streakStartDate = today;
  const totalSessions = (existing?.total_sessions ?? 0) + 1;

  if (existing) {
    const last = existing.last_activity_date as string | null;

    if (last === today) {
      // Already recorded today — just increment session count
      await supabase
        .from('user_streaks')
        .update({
          total_sessions: totalSessions,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      return {
        ok: true,
        currentStreak: existing.current_streak,
        longestStreak: existing.longest_streak,
        totalSessions,
      };
    }

    const prevDate = last ? new Date(`${last}T12:00:00`) : null;
    const todayDate = new Date(`${today}T12:00:00`);
    const diffDays = prevDate
      ? Math.round((todayDate.getTime() - prevDate.getTime()) / (24 * 60 * 60 * 1000))
      : null;

    if (diffDays === 1) {
      // Consecutive day — continue streak
      currentStreak = (existing.current_streak as number) + 1;
      streakStartDate = existing.streak_start_date as string ?? today;
    } else {
      // Gap — reset streak
      currentStreak = 1;
      streakStartDate = today;
    }

    longestStreak = Math.max(currentStreak, existing.longest_streak as number ?? 0);
  }

  // ── Upsert streak row ──
  const { error: upsertError } = await supabase.from('user_streaks').upsert(
    {
      user_id: user.id,
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
      streak_start_date: streakStartDate,
      total_sessions: totalSessions,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (upsertError) {
    console.error('[updateUserStreak] upsert', upsertError);
    return { ok: false };
  }

  // ── Award streak badges ──
  const streakBadgeDefs = BADGE_DEFINITIONS.filter(
    (b) => b.condition.type === 'streak' || b.condition.type === 'sessions',
  );

  const toAward = streakBadgeDefs.filter((b) => {
    if (b.condition.type === 'streak') return currentStreak >= b.condition.target;
    if (b.condition.type === 'sessions') return totalSessions >= b.condition.target;
    return false;
  });

  const newBadges: string[] = [];

  if (toAward.length > 0) {
    const rows = toAward.map((b) => ({ user_id: user.id, badge_id: b.id }));
    const { data: inserted } = await supabase
      .from('user_badges')
      .upsert(rows, { onConflict: 'user_id,badge_id', ignoreDuplicates: true })
      .select('badge_id');

    if (inserted) {
      newBadges.push(...(inserted as { badge_id: string }[]).map((r) => r.badge_id));
    }
  }

  return { ok: true, currentStreak, longestStreak, totalSessions, newBadges };
}
