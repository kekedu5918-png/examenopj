import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { Tables } from '@/libs/supabase/types';

export type ModuleRow = Tables<'modules'>;
export type ChapitreRow = Tables<'chapitres'>;
export type QuestionRow = Tables<'questions'>;
export type FlashcardRow = Tables<'flashcards'>;

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
