import { CADRES_STEPS } from '@/data/parcours-cadres-enquetes';
import { quizQuestions } from '@/data/quiz-questions';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';

import 'server-only';

type PublicRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
type LpRow<T extends keyof Database['learning_path']['Tables']> = Database['learning_path']['Tables'][T]['Row'];

/** Corpus quiz local (pas la table Supabase `questions`). */
const TOTAL_QUESTIONS_QUIZ_LOCAL = quizQuestions.length;

function formatQuizAttemptLabel(row: {
  mode: string;
  fascicule_num: number | null;
  domain_key: string | null;
}): string {
  if ((row.mode === 'fascicule' || row.mode === 'module') && row.fascicule_num != null) {
    return `Thème ${String(row.fascicule_num).padStart(2, '0')}`;
  }
  if (row.mode === 'domain' && row.domain_key) return row.domain_key;
  if (row.mode === 'global') return 'Quiz global';
  return row.mode;
}

export async function getDashboardStats(userId: string) {
  const supabase = await createSupabaseServerClient();

  const learningPath = () => supabase.schema('learning_path');

  const [
    quizAttemptsRes,
    userProgressRes,
    streakRes,
    badgesRes,
    xpRes,
    parcoursRes,
    lpCompletedRes,
    totalLessonsRes,
  ] = await Promise.all([
    supabase
      .from('quiz_attempts')
      .select('id, score, total, percent, mode, fascicule_num, domain_key, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('user_progress')
      .select('question_id, flashcard_id, resultat, next_review, created_at')
      .eq('user_id', userId),
    supabase
      .from('user_streaks')
      .select('current_streak, longest_streak, last_session_date')
      .eq('user_id', userId)
      .maybeSingle(),
    supabase.from('user_badges').select('badge_id, earned_at, earned').eq('user_id', userId).eq('earned', true).order('earned_at', { ascending: false }),
    learningPath()
      .from('xp_events')
      .select('amount')
      .eq('user_id', userId),
    supabase
      .from('parcours_cadres_progress')
      .select('step_slug, lesson_completed, quiz_passed, updated_at')
      .eq('user_id', userId),
    learningPath()
      .from('user_progress')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .not('completed_at', 'is', null),
    learningPath().from('lessons').select('id', { count: 'exact', head: true }),
  ]);

  const attempts = (quizAttemptsRes.data ?? []) as PublicRow<'quiz_attempts'>[];
  const progress = (userProgressRes.data ?? []) as PublicRow<'user_progress'>[];
  const streak = streakRes.data as PublicRow<'user_streaks'> | null;
  const badgesEarned = (badgesRes.data ?? []) as PublicRow<'user_badges'>[];
  const xpRows = (xpRes.data ?? []) as LpRow<'xp_events'>[];
  const parcoursSteps = (parcoursRes.data ?? []) as PublicRow<'parcours_cadres_progress'>[];

  const fichesCompleted = lpCompletedRes.count ?? 0;
  const totalFichesCatalog = totalLessonsRes.count ?? 46;
  const progressFiches =
    totalFichesCatalog > 0 ? Math.round((Math.min(fichesCompleted, totalFichesCatalog) / totalFichesCatalog) * 100) : 0;

  const sessionKeys = new Set(
    attempts.map((a) =>
      `${a.mode}:${a.fascicule_num ?? ''}:${a.domain_key ?? ''}`,
    ),
  );

  const scoreMoyen =
    attempts.length > 0
      ? Math.round(attempts.reduce((acc, a) => acc + Number(a.percent), 0) / attempts.length)
      : 0;

  const flashcardsMaitrisees = progress.filter((p) => (p.resultat ?? 0) >= 4 && p.flashcard_id != null).length;

  const xpTotal = xpRows.reduce((acc, e) => acc + (e.amount ?? 0), 0);

  const recentActivity = [
    ...attempts.slice(0, 5).map((a) => ({
      type: 'quiz' as const,
      label: `Quiz — ${formatQuizAttemptLabel(a)}`,
      score: `${a.score}/${a.total}`,
      date: a.created_at,
    })),
    ...progress
      .filter((p) => (p.resultat ?? 0) >= 4)
      .sort((a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())
      .slice(0, 3)
      .map((p) => ({
        type: 'fiche' as const,
        label: p.flashcard_id ? 'Flashcard — révision' : 'Question — révision',
        score: null as string | null,
        date: p.created_at,
      })),
  ]
    .sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime())
    .slice(0, 8);

  const totalParcoursSteps = CADRES_STEPS.length;
  const bySlug = Object.fromEntries(parcoursSteps.map((s) => [s.step_slug, s]));

  let stepsDone = 0;
  for (const step of CADRES_STEPS) {
    const row = bySlug[step.slug] as { lesson_completed: boolean; quiz_passed: boolean } | undefined;
    if (!row?.lesson_completed) continue;
    if (step.kind === 'intro' || step.kind === 'synthese') {
      stepsDone += 1;
      continue;
    }
    if (row.quiz_passed) stepsDone += 1;
  }

  const progressParcours = totalParcoursSteps > 0 ? Math.round((stepsDone / totalParcoursSteps) * 100) : 0;

  return {
    fiches: {
      done: fichesCompleted,
      total: totalFichesCatalog,
      progress: progressFiches,
    },
    quiz: {
      attemptCount: attempts.length,
      uniqueSessions: sessionKeys.size,
      total: TOTAL_QUESTIONS_QUIZ_LOCAL,
      scoreMoyen,
    },
    flashcards: {
      mastered: flashcardsMaitrisees,
    },
    streak: {
      current: streak?.current_streak ?? 0,
      longest: streak?.longest_streak ?? 0,
      lastActivity: streak?.last_session_date ?? null,
    },
    xp: xpTotal,
    badges: {
      count: badgesEarned.length,
      recent: badgesEarned.slice(0, 3),
    },
    parcours: {
      done: stepsDone,
      total: totalParcoursSteps,
      progress: progressParcours,
    },
    recentActivity,
  };
}

export type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;
