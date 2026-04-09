import { flashcardsData } from '@/data/flashcards-data';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ReviewScheduleRow = {
  id: string;
  content_id: string;
  content_type: string;
  easiness_factor: number;
  interval_days: number;
  repetitions: number;
  last_reviewed_at: string | null;
  next_review_date: string | null;
  quality_last_review: number | null;
  total_attempts: number;
  correct_attempts: number;
  success_rate: number;
  status: 'new' | 'learning' | 'reviewing' | 'mastered';
  created_at: string;
  updated_at: string;
};

export type ScheduleItem = ReviewScheduleRow & {
  title: string;          // Human-readable content label
  fascicule?: number;
  categorie?: string;
};

export type SM2Schedule = {
  today: ScheduleItem[];
  upcoming: ScheduleItem[];
  mastered: ScheduleItem[];
  stats: {
    totalItems: number;
    todayCount: number;
    upcomingWeekCount: number;
    masteredCount: number;
    overallSuccessRate: number;
  };
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function sb(client: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  return client as unknown as SupabaseClient<any>;
}

function enrichWithTitle(row: ReviewScheduleRow): ScheduleItem {
  if (row.content_type === 'flashcard') {
    const card = flashcardsData.find((c) => c.id === row.content_id);
    return {
      ...row,
      title: card
        ? `${card.nom} (F${String(card.fascicule).padStart(2, '0')})`
        : row.content_id,
      fascicule: card?.fascicule,
      categorie: card?.categorie,
    };
  }
  return { ...row, title: row.content_id };
}

function addDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// ─────────────────────────────────────────────
// Main query
// ─────────────────────────────────────────────

export async function getSM2Schedule(userId: string): Promise<SM2Schedule> {
  const supabase = sb(await createSupabaseServerClient());
  const today = new Date().toISOString().slice(0, 10);
  const in7Days = addDays(7);

  const { data: rows, error } = await supabase
    .from('user_review_schedule')
    .select('*')
    .eq('user_id', userId)
    .order('next_review_date', { ascending: true, nullsFirst: true });

  if (error) {
    console.error('[getSM2Schedule]', error);
    return {
      today: [],
      upcoming: [],
      mastered: [],
      stats: { totalItems: 0, todayCount: 0, upcomingWeekCount: 0, masteredCount: 0, overallSuccessRate: 0 },
    };
  }

  const all: ReviewScheduleRow[] = rows ?? [];

  const todayItems = all
    .filter((r) => r.status !== 'mastered' && (r.next_review_date == null || r.next_review_date <= today))
    .map(enrichWithTitle);

  const upcomingItems = all
    .filter(
      (r) =>
        r.status !== 'mastered' &&
        r.next_review_date != null &&
        r.next_review_date > today &&
        r.next_review_date <= in7Days,
    )
    .map(enrichWithTitle);

  const masteredItems = all.filter((r) => r.status === 'mastered').map(enrichWithTitle);

  const overallSuccessRate =
    all.length > 0
      ? Math.round(all.reduce((s, r) => s + Number(r.success_rate), 0) / all.length)
      : 0;

  return {
    today: todayItems,
    upcoming: upcomingItems,
    mastered: masteredItems,
    stats: {
      totalItems: all.length,
      todayCount: todayItems.length,
      upcomingWeekCount: upcomingItems.length,
      masteredCount: masteredItems.length,
      overallSuccessRate,
    },
  };
}

/** Fetch a single schedule row (for server-side review session hydration). */
export async function getSM2ScheduleItems(
  userId: string,
  ids: string[],
): Promise<ReviewScheduleRow[]> {
  if (ids.length === 0) return [];
  const supabase = sb(await createSupabaseServerClient());
  const { data } = await supabase
    .from('user_review_schedule')
    .select('*')
    .eq('user_id', userId)
    .in('id', ids);
  return (data ?? []) as ReviewScheduleRow[];
}
