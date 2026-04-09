import { fasciculesList } from '@/data/fascicules-list';
import { flashcardsData } from '@/data/flashcards-data';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type HeroStats = {
  totalMastered: number;
  totalCards: number;
  progressionPct: number;
  weeklyQuizCount: number;
  weeklyQuestionsAnswered: number;
  weeklySuccessRate: number;
  weeklyDelta: number;
};

export type FlashcardToReview = {
  id: string;
  nom: string;
  fascicule: number;
  domaine: string;
  categorie?: string;
  bucket: 'review' | 'dontKnow';
  updatedAt: string | null;
};

export type CategoryStat = {
  slug: string;
  label: string;
  mastered: number;
  total: number;
  pct: number;
  quizSuccessRate: number | null;
  toReview: number;
};

export type DayCalendar = {
  dateIso: string;
  label: string;
  count: number;
  items: string[];
};

export type ChartPoint = {
  date: string;
  pct: number;
  attempts: number;
};

export type SessionReport = {
  attempt: {
    id: string;
    mode: string;
    fascicule_num: number | null;
    domain_key: string | null;
    score: number;
    total: number;
    percent: number;
    created_at: string | null;
  };
  fasciculeMeta: (typeof fasciculesList)[0] | null;
  flashcardStats: { know: number; review: number; dontKnow: number; total: number };
  recentHistory: { score: number; total: number; percent: number; created_at: string | null }[];
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function supabaseAny(client: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  return client as unknown as SupabaseClient<any>;
}

const sevenDaysAgo = () => new Date(Date.now() - 7 * 86_400_000).toISOString();
const fourteenDaysAgo = () => new Date(Date.now() - 14 * 86_400_000).toISOString();
const thirtyDaysAgo = () => new Date(Date.now() - 30 * 86_400_000).toISOString();

// ─────────────────────────────────────────────
// Hero stats
// ─────────────────────────────────────────────

export async function getHeroStats(userId: string): Promise<HeroStats> {
  const sb = supabaseAny(await createSupabaseServerClient());

  const [{ data: reviews }, { data: thisWeek }, { data: lastWeek }] = await Promise.all([
    sb.from('flashcard_reviews').select('card_id, bucket').eq('user_id', userId),
    sb
      .from('quiz_attempts')
      .select('total, percent')
      .eq('user_id', userId)
      .gte('created_at', sevenDaysAgo()),
    sb
      .from('quiz_attempts')
      .select('percent')
      .eq('user_id', userId)
      .gte('created_at', fourteenDaysAgo())
      .lt('created_at', sevenDaysAgo()),
  ]);

  const totalMastered = new Set(
    (reviews ?? []).filter((r: any) => r.bucket === 'know').map((r: any) => r.card_id as string),
  ).size;
  const totalCards = flashcardsData.length;

  const thisWeekRows: { total: number; percent: number }[] = thisWeek ?? [];
  const lastWeekRows: { percent: number }[] = lastWeek ?? [];

  const weeklyQuestionsAnswered = thisWeekRows.reduce((s, r) => s + (r.total ?? 0), 0);
  const weeklySuccessRate =
    thisWeekRows.length > 0
      ? Math.round(thisWeekRows.reduce((s, r) => s + Number(r.percent), 0) / thisWeekRows.length)
      : 0;
  const lastWeekRate =
    lastWeekRows.length > 0
      ? Math.round(lastWeekRows.reduce((s, r) => s + Number(r.percent), 0) / lastWeekRows.length)
      : 0;

  return {
    totalMastered,
    totalCards,
    progressionPct: totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0,
    weeklyQuizCount: thisWeekRows.length,
    weeklyQuestionsAnswered,
    weeklySuccessRate,
    weeklyDelta: weeklySuccessRate - lastWeekRate,
  };
}

// ─────────────────────────────────────────────
// Flashcards to review
// ─────────────────────────────────────────────

export async function getFlashcardsToReview(userId: string, limit = 6): Promise<FlashcardToReview[]> {
  const sb = supabaseAny(await createSupabaseServerClient());

  const { data } = await sb
    .from('flashcard_reviews')
    .select('card_id, bucket, updated_at')
    .eq('user_id', userId)
    .in('bucket', ['review', 'dontKnow'])
    .order('updated_at', { ascending: true });

  const rows: { card_id: string; bucket: 'review' | 'dontKnow'; updated_at: string | null }[] = data ?? [];

  // dontKnow = highest priority
  rows.sort((a, b) => {
    if (a.bucket !== b.bucket) return a.bucket === 'dontKnow' ? -1 : 1;
    return 0;
  });

  return rows.slice(0, limit).map((r) => {
    const card = flashcardsData.find((c) => c.id === r.card_id);
    return {
      id: r.card_id,
      nom: card?.nom ?? r.card_id,
      fascicule: card?.fascicule ?? 0,
      domaine: card?.domaine ?? '',
      categorie: card?.categorie,
      bucket: r.bucket,
      updatedAt: r.updated_at,
    };
  });
}

// ─────────────────────────────────────────────
// 7-day review calendar
// ─────────────────────────────────────────────

export async function getWeeklyCalendar(userId: string): Promise<DayCalendar[]> {
  const sb = supabaseAny(await createSupabaseServerClient());
  const { data } = await sb
    .from('flashcard_reviews')
    .select('card_id, bucket, updated_at')
    .eq('user_id', userId)
    .in('bucket', ['review', 'dontKnow']);

  const rows: { card_id: string; bucket: string; updated_at: string | null }[] = data ?? [];

  const now = new Date();
  const days: DayCalendar[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);

    // Simplified SRS: dontKnow → today, review → tomorrow (simple proxy)
    const items = rows
      .filter((r) => {
        if (r.bucket === 'dontKnow') return i === 0;
        if (r.bucket === 'review') {
          const updatedAt = r.updated_at ? new Date(r.updated_at) : null;
          if (!updatedAt) return i === 1;
          const daysSince = Math.floor((now.getTime() - updatedAt.getTime()) / 86_400_000);
          // Basic interval: updated < 1 day ago → due in 1 day, 1-3 → due in 2, 3+ → due in 3+
          if (daysSince < 1) return i === 1;
          if (daysSince < 3) return i === 2;
          return i === Math.min(daysSince, 6);
        }
        return false;
      })
      .map((r) => {
        const card = flashcardsData.find((c) => c.id === r.card_id);
        return card?.nom ?? r.card_id;
      });

    let label: string;
    if (i === 0) label = "Aujourd'hui";
    else if (i === 1) label = 'Demain';
    else {
      label = `+${i} jours (${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })})`;
    }

    days.push({ dateIso: iso, label, count: items.length, items: items.slice(0, 3) });
  }

  return days;
}

// ─────────────────────────────────────────────
// Category stats
// ─────────────────────────────────────────────

export async function getCategoryStats(userId: string): Promise<CategoryStat[]> {
  const sb = supabaseAny(await createSupabaseServerClient());

  const [{ data: reviews }, { data: quizAttempts }] = await Promise.all([
    sb.from('flashcard_reviews').select('card_id, bucket').eq('user_id', userId),
    sb
      .from('quiz_attempts')
      .select('fascicule_num, percent')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo()),
  ]);

  const reviewMap = new Map<string, string>();
  for (const r of (reviews ?? []) as { card_id: string; bucket: string }[]) {
    reviewMap.set(r.card_id, r.bucket);
  }

  // Group flashcards by category
  const catMap = new Map<
    string,
    { label: string; slug: string; cards: (typeof flashcardsData)[0][] }
  >();
  for (const card of flashcardsData) {
    const slug = card.categorieSlug ?? `f${String(card.fascicule).padStart(2, '0')}`;
    const label = card.categorie ?? `Fascicule F${String(card.fascicule).padStart(2, '0')}`;
    if (!catMap.has(slug)) catMap.set(slug, { label, slug, cards: [] });
    catMap.get(slug)!.cards.push(card);
  }

  const attempts: { fascicule_num: number | null; percent: number }[] = quizAttempts ?? [];
  const result: CategoryStat[] = [];

  for (const [, { label, slug, cards }] of catMap) {
    const mastered = cards.filter((c) => reviewMap.get(c.id) === 'know').length;
    const toReview = cards.filter((c) =>
      ['review', 'dontKnow'].includes(reviewMap.get(c.id) ?? ''),
    ).length;

    const fasciculeNums = [...new Set(cards.map((c) => c.fascicule))];
    const relevant = attempts.filter(
      (a) => a.fascicule_num != null && fasciculeNums.includes(a.fascicule_num),
    );
    const quizSuccessRate =
      relevant.length > 0
        ? Math.round(relevant.reduce((s, a) => s + Number(a.percent), 0) / relevant.length)
        : null;

    result.push({
      slug,
      label,
      mastered,
      total: cards.length,
      pct: cards.length > 0 ? Math.round((mastered / cards.length) * 100) : 0,
      quizSuccessRate,
      toReview,
    });
  }

  return result.sort((a, b) => b.total - a.total).slice(0, 5);
}

// ─────────────────────────────────────────────
// Progression chart (last 30 days)
// ─────────────────────────────────────────────

export async function getProgressionChart(userId: string): Promise<ChartPoint[]> {
  const sb = supabaseAny(await createSupabaseServerClient());

  const { data } = await sb
    .from('quiz_attempts')
    .select('percent, created_at')
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo())
    .order('created_at', { ascending: true });

  const dayMap = new Map<string, { sum: number; count: number }>();
  for (const row of (data ?? []) as { percent: number; created_at: string }[]) {
    const day = row.created_at.slice(0, 10);
    if (!dayMap.has(day)) dayMap.set(day, { sum: 0, count: 0 });
    const entry = dayMap.get(day)!;
    entry.sum += Number(row.percent);
    entry.count += 1;
  }

  return [...dayMap.entries()].map(([date, { sum, count }]) => ({
    date: date.slice(5).replace('-', '/'), // MM/DD → DD/MM
    pct: Math.round(sum / count),
    attempts: count,
  }));
}

// ─────────────────────────────────────────────
// Session report
// ─────────────────────────────────────────────

export async function getSessionReport(
  userId: string,
  attemptId: string,
): Promise<SessionReport | null> {
  const sb = supabaseAny(await createSupabaseServerClient());

  const [{ data: attempt, error }, { data: allReviews }, { data: history }] = await Promise.all([
    sb
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('id', attemptId)
      .single(),
    sb.from('flashcard_reviews').select('card_id, bucket').eq('user_id', userId),
    sb
      .from('quiz_attempts')
      .select('score, total, percent, created_at, fascicule_num, mode')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(15),
  ]);

  if (error || !attempt) return null;

  const reviewMap = new Map<string, string>();
  for (const r of (allReviews ?? []) as { card_id: string; bucket: string }[]) {
    reviewMap.set(r.card_id, r.bucket);
  }

  const fasciculeCards =
    attempt.fascicule_num != null
      ? flashcardsData.filter((c) => c.fascicule === attempt.fascicule_num)
      : [];

  const flashcardStats = {
    know: fasciculeCards.filter((c) => reviewMap.get(c.id) === 'know').length,
    review: fasciculeCards.filter((c) => reviewMap.get(c.id) === 'review').length,
    dontKnow: fasciculeCards.filter((c) => reviewMap.get(c.id) === 'dontKnow').length,
    total: fasciculeCards.length,
  };

  // Recent history for same fascicule (or all if global)
  const recentHistory = (
    (history ?? []) as {
      score: number;
      total: number;
      percent: number;
      created_at: string | null;
      fascicule_num: number | null;
      mode: string;
    }[]
  )
    .filter((h) => {
      if (attempt.mode === 'global') return h.mode === 'global';
      return h.fascicule_num === attempt.fascicule_num;
    })
    .filter((h) => h.created_at !== attempt.created_at) // exclude current
    .slice(0, 5);

  const fasciculeMeta =
    attempt.fascicule_num != null
      ? (fasciculesList.find((f) => f.numero === attempt.fascicule_num) ?? null)
      : null;

  return {
    attempt: {
      id: attempt.id,
      mode: attempt.mode,
      fascicule_num: attempt.fascicule_num,
      domain_key: attempt.domain_key,
      score: attempt.score,
      total: attempt.total,
      percent: Number(attempt.percent),
      created_at: attempt.created_at,
    },
    fasciculeMeta,
    flashcardStats,
    recentHistory,
  };
}
