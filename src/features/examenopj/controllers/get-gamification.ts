import { flashcardsData } from '@/data/flashcards-data';
import { BADGE_DEFINITIONS, CATEGORY_META } from '@/lib/gamification-definitions';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

function supabaseAny(client: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  return client as unknown as SupabaseClient<any>;
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type CategoryProgress = {
  slug: string;
  label: string;
  color: string;
  mastered: number;
  total: number;
  pct: number;
};

export type EarnedBadge = {
  badgeId: string;
  earnedAt: string;
};

export type GamificationData = {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  lastActivityDate: string | null;
  earnedBadges: EarnedBadge[];
  categoryProgress: CategoryProgress[];
  totalMastered: number;
  totalCards: number;
  totalQuestionsAnswered: number;
};

// ─────────────────────────────────────────────
// Controller
// ─────────────────────────────────────────────

export async function getGamification(userId: string): Promise<GamificationData> {
  const sb = supabaseAny(await createSupabaseServerClient());

  // Fetch all data in parallel
  const [
    { data: streakRow },
    { data: badgeRows },
    { data: sm2Rows },
    { data: quizAttempts },
  ] = await Promise.all([
    sb.from('user_streaks').select('*').eq('user_id', userId).maybeSingle(),
    sb.from('user_badges').select('badge_id, earned_at').eq('user_id', userId),
    sb
      .from('user_review_schedule')
      .select('content_id, status')
      .eq('user_id', userId)
      .eq('content_type', 'flashcard')
      .eq('status', 'mastered'),
    sb.from('quiz_attempts').select('total').eq('user_id', userId),
  ]);

  // ── Streak data ──
  const currentStreak = (streakRow?.current_streak as number) ?? 0;
  const longestStreak = (streakRow?.longest_streak as number) ?? 0;
  const totalSessions = (streakRow?.total_sessions as number) ?? 0;
  const lastActivityDate = (streakRow?.last_activity_date as string) ?? null;

  // ── Mastery (SM-2) ──
  const masteredIds = new Set(
    ((sm2Rows ?? []) as { content_id: string; status: string }[]).map((r) => r.content_id),
  );
  const totalMastered = masteredIds.size;
  const totalCards = flashcardsData.length;

  // ── Questions answered ──
  const totalQuestionsAnswered = ((quizAttempts ?? []) as { total: number }[]).reduce(
    (sum, r) => sum + (r.total ?? 0),
    0,
  );

  // ── Category progress ──
  const categoryProgress: CategoryProgress[] = CATEGORY_META.map((meta) => {
    const cards = flashcardsData.filter((c) => c.categorieSlug === meta.slug);
    const mastered = cards.filter((c) => masteredIds.has(c.id)).length;
    const total = cards.length;
    return {
      slug: meta.slug,
      label: meta.label,
      color: meta.color,
      mastered,
      total,
      pct: total > 0 ? Math.round((mastered / total) * 100) : 0,
    };
  });

  // ── Earned badges (from DB) ──
  const earnedBadges: EarnedBadge[] = ((badgeRows ?? []) as { badge_id: string; earned_at: string }[]).map(
    (r) => ({ badgeId: r.badge_id, earnedAt: r.earned_at }),
  );

  // ── Lazily award mastery + questions badges ──
  const earnedSet = new Set(earnedBadges.map((b) => b.badgeId));

  const toAward = BADGE_DEFINITIONS.filter((b) => {
    if (earnedSet.has(b.id)) return false;
    if (b.condition.type === 'mastery') {
      const target = b.condition.target;
      return target === 999 ? totalMastered >= totalCards && totalCards > 0 : totalMastered >= target;
    }
    if (b.condition.type === 'questions') return totalQuestionsAnswered >= b.condition.target;
    return false;
  });

  if (toAward.length > 0) {
    const rows = toAward.map((b) => ({ user_id: userId, badge_id: b.id }));
    const { data: inserted } = await sb
      .from('user_badges')
      .upsert(rows, { onConflict: 'user_id,badge_id', ignoreDuplicates: true })
      .select('badge_id, earned_at');

    if (inserted) {
      for (const r of inserted as { badge_id: string; earned_at: string }[]) {
        if (!earnedSet.has(r.badge_id)) {
          earnedBadges.push({ badgeId: r.badge_id, earnedAt: r.earned_at });
          earnedSet.add(r.badge_id);
        }
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalSessions,
    lastActivityDate,
    earnedBadges,
    categoryProgress,
    totalMastered,
    totalCards,
    totalQuestionsAnswered,
  };
}
