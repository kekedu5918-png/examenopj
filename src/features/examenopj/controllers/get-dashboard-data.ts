import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { Tables } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export type ModuleRow = Tables<'modules'>;
export type ChapitreRow = Tables<'chapitres'>;
export type QuestionRow = Tables<'questions'>;
export type FlashcardRow = Tables<'flashcards'>;
export type UserProgressRow = Tables<'user_progress'>;
export type QuizAttemptRow = Tables<'quiz_attempts'>;
export type FlashcardReviewRow = Tables<'flashcard_reviews'>;

export type FlashcardReviewSummary = {
  totalCards: number;
  know: number;
  review: number;
  dontKnow: number;
  lastUpdated: string | null;
};

export async function getFlashcardReviewSummary(userId: string): Promise<FlashcardReviewSummary> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await (supabase as unknown as SupabaseClient<any>)
    .from('flashcard_reviews')
    .select('bucket, updated_at')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
    return { totalCards: 0, know: 0, review: 0, dontKnow: 0, lastUpdated: null };
  }

  const rows = (data ?? []) as Pick<FlashcardReviewRow, 'bucket' | 'updated_at'>[];
  let last: string | null = null;
  for (const r of rows) {
    if (r.updated_at && (!last || r.updated_at > last)) last = r.updated_at;
  }

  return {
    totalCards: rows.length,
    know: rows.filter((r) => r.bucket === 'know').length,
    review: rows.filter((r) => r.bucket === 'review').length,
    dontKnow: rows.filter((r) => r.bucket === 'dontKnow').length,
    lastUpdated: last,
  };
}

export async function getRecentQuizAttempts(userId: string, limit = 8) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    return [] as QuizAttemptRow[];
  }
  return data ?? [];
}

export async function getQuizAttemptsCount(userId: string): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from('quiz_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error(error);
    return 0;
  }
  return count ?? 0;
}

export async function getModules() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('modules').select('*').order('ordre', { ascending: true });
  if (error) {
    console.error(error);
    return [] as ModuleRow[];
  }
  return data;
}

export async function getLatestQuestions(limit = 24) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit);
  if (error) {
    console.error(error);
    return [] as QuestionRow[];
  }
  return data;
}

export async function getQuestionsPage({
  page = 1,
  pageSize = 12,
  query,
  difficulte,
}: {
  page?: number;
  pageSize?: number;
  query?: string;
  difficulte?: string;
}) {
  const supabase = await createSupabaseServerClient();
  let request = supabase
    .from('questions')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false });

  if (query) {
    request = request.ilike('question', `%${query}%`);
  }
  if (difficulte) {
    request = request.eq('difficulte', difficulte);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await request.range(from, to);

  if (error) {
    console.error(error);
    return { data: [] as QuestionRow[], total: 0 };
  }

  return { data, total: count ?? 0 };
}

export async function getLatestFlashcards(limit = 24) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit);
  if (error) {
    console.error(error);
    return [] as FlashcardRow[];
  }
  return data;
}

export async function getLatestChapitres(limit = 24) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('chapitres')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit);
  if (error) {
    console.error(error);
    return [] as ChapitreRow[];
  }
  return data;
}

export async function getRevisionStats(userId: string) {
  const supabase = await createSupabaseServerClient();

  const [{ data: progress, error: progressError }, { count: totalQuestions, error: questionsError }, { count: totalFlashcards, error: flashcardsError }] =
    await Promise.all([
      supabase.from('user_progress').select('*').eq('user_id', userId),
      supabase.from('questions').select('*', { count: 'exact', head: true }),
      supabase.from('flashcards').select('*', { count: 'exact', head: true }),
    ]);

  if (progressError || questionsError || flashcardsError) {
    console.error(progressError || questionsError || flashcardsError);
    return {
      totalQuestions: totalQuestions ?? 0,
      totalFlashcards: totalFlashcards ?? 0,
      revisionDue: 0,
      mastered: 0,
      averageScore: 0,
    };
  }

  const nowIso = new Date().toISOString().slice(0, 10);
  const revisionDue = (progress as UserProgressRow[]).filter((item) => item.next_review && item.next_review <= nowIso).length;
  const mastered = (progress as UserProgressRow[]).filter((item) => (item.resultat ?? 0) >= 4).length;
  const averageScore =
    (progress as UserProgressRow[]).length > 0
      ? (progress as UserProgressRow[]).reduce((acc, item) => acc + (item.resultat ?? 0), 0) / (progress as UserProgressRow[]).length
      : 0;

  return {
    totalQuestions: totalQuestions ?? 0,
    totalFlashcards: totalFlashcards ?? 0,
    revisionDue,
    mastered,
    averageScore,
  };
}

export async function searchLearningContent(query: string) {
  const supabase = await createSupabaseServerClient();
  const q = query.trim();
  if (!q) {
    return { questions: [] as QuestionRow[], chapitres: [] as ChapitreRow[], flashcards: [] as FlashcardRow[] };
  }

  const [{ data: questions, error: questionsError }, { data: chapitres, error: chapitresError }, { data: flashcards, error: flashcardsError }] =
    await Promise.all([
      supabase.from('questions').select('*').ilike('question', `%${q}%`).limit(20),
      supabase.from('chapitres').select('*').ilike('titre', `%${q}%`).limit(20),
      supabase.from('flashcards').select('*').ilike('recto', `%${q}%`).limit(20),
    ]);

  if (questionsError || chapitresError || flashcardsError) {
    console.error(questionsError || chapitresError || flashcardsError);
    return { questions: [] as QuestionRow[], chapitres: [] as ChapitreRow[], flashcards: [] as FlashcardRow[] };
  }

  return {
    questions: questions ?? [],
    chapitres: chapitres ?? [],
    flashcards: flashcards ?? [],
  };
}
