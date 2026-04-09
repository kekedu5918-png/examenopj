import { fasciculesList } from '@/data/fascicules-list';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

export type LoginResumeData = {
  userName: string | null;
  progress: {
    percentage: number;
    itemsMastered: number;
    totalItems: number;
    lastSession: {
      content: string;
      score: string;
      daysAgo: number;
      fasciculeNum: number | null;
    } | null;
  };
  streak: {
    current: number;
    longest: number;
    willBreak: boolean;
    message: string;
  };
  recommendations: Array<{
    priority: number;
    type: 'review' | 'new' | 'plan';
    title: string;
    reason: string;
    timeMinutes: number;
    href: string;
  }>;
  showResume: boolean;
};

function daysAgo(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  d.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)));
}

function getFasciculeName(num: number): string {
  const f = fasciculesList.find((f) => f.numero === num);
  return f ? `F${String(num).padStart(2, '0')} — ${f.titre}` : `F${String(num).padStart(2, '0')}`;
}

export async function getLoginResumeData(userId: string): Promise<LoginResumeData> {
  const supabase = await createSupabaseServerClient();
  const db = supabase as unknown as SupabaseClient<any>;

  const [userRes, streakRes, attemptsRes, progressRes] = await Promise.all([
    supabase.auth.getUser(),
    db.from('user_streaks').select('*').eq('user_id', userId).maybeSingle(),
    db
      .from('quiz_attempts')
      .select('fascicule_num, percent, score, total, mode, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5),
    db.from('user_progress').select('resultat').eq('user_id', userId),
  ]);

  const user = userRes.data.user;
  const userName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? null;

  // ── Streak ──────────────────────────────────────────────
  const streakRow = streakRes.data;
  const currentStreak = streakRow?.current_streak ?? 0;
  const longestStreak = streakRow?.longest_streak ?? 0;
  const lastSessionDate = streakRow?.last_session_date;

  const today = new Date().toISOString().slice(0, 10);
  const hasStudiedToday = lastSessionDate === today;
  const daysSinceLastSession = lastSessionDate ? daysAgo(lastSessionDate) : 999;

  const willBreak = !hasStudiedToday && currentStreak > 0;
  const streakMessage = willBreak
    ? `Vous aviez ${currentStreak} jours ! Une session aujourd'hui sauvegarde votre streak.`
    : currentStreak > 0
      ? `Streak actuel : ${currentStreak} jours. Continuez !`
      : 'Commencez votre première session pour démarrer un streak.';

  // ── Progression ──────────────────────────────────────────
  const progressRows = progressRes.data ?? [];
  const totalItems = 55;
  const mastered = progressRows.filter((r: any) => (r.resultat ?? 0) >= 4).length;
  const percentage = totalItems > 0 ? Math.round((mastered / totalItems) * 100) : 0;

  // ── Dernière session ─────────────────────────────────────
  const attempts = attemptsRes.data ?? [];
  const lastAttempt = attempts[0] ?? null;
  let lastSession: LoginResumeData['progress']['lastSession'] = null;

  if (lastAttempt) {
    const fNum = lastAttempt.fascicule_num;
    const fascName = fNum != null ? getFasciculeName(fNum) : (lastAttempt.mode === 'global' ? 'Quiz global' : lastAttempt.mode);
    lastSession = {
      content: fascName,
      score: `${lastAttempt.score}/${lastAttempt.total} (${Number(lastAttempt.percent).toFixed(0)}%)`,
      daysAgo: lastAttempt.created_at ? daysAgo(lastAttempt.created_at) : 0,
      fasciculeNum: fNum,
    };
  }

  // ── Recommandations ──────────────────────────────────────
  const recommendations: LoginResumeData['recommendations'] = [];

  if (lastSession && lastSession.daysAgo > 0 && lastSession.fasciculeNum) {
    const fId = fasciculesList.find((f) => f.numero === lastSession!.fasciculeNum)?.id;
    recommendations.push({
      priority: 1,
      type: 'review',
      title: `Revoir ${lastSession.content}`,
      reason: `Dernière session il y a ${lastSession.daysAgo} jour${lastSession.daysAgo > 1 ? 's' : ''}`,
      timeMinutes: 30,
      href: fId ? `/quiz?mode=module&f=${fId}` : '/quiz',
    });
  }

  // Suggérer le fascicule suivant si le dernier quiz portait sur un fascicule
  if (lastSession?.fasciculeNum) {
    const nextFNum = lastSession.fasciculeNum + 1;
    const nextFascicule = fasciculesList.find((f) => f.numero === nextFNum);
    if (nextFascicule) {
      recommendations.push({
        priority: 2,
        type: 'new',
        title: `Commencer ${getFasciculeName(nextFNum)}`,
        reason: 'Progression logique — suite du programme',
        timeMinutes: 25,
        href: `/cours/modules/${nextFascicule.id}`,
      });
    }
  }

  recommendations.push({
    priority: 3,
    type: 'plan',
    title: 'Voir mon plan de cette semaine',
    reason: 'Suivre le plan personnalisé',
    timeMinutes: 0,
    href: '/dashboard/progression',
  });

  // Montrer l'écran de reprise seulement si l'utilisateur a déjà eu au moins une session
  // et que ce n'est pas son tout premier login
  const showResume = attempts.length > 0 && daysSinceLastSession >= 1;

  return {
    userName,
    progress: { percentage, itemsMastered: mastered, totalItems, lastSession },
    streak: { current: currentStreak, longest: longestStreak, willBreak, message: streakMessage },
    recommendations,
    showResume,
  };
}
