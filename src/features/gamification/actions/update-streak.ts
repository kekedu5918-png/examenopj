'use server';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

export type BadgeId =
  | 'first_quiz'
  | 'perfect_week'
  | 'discipline'
  | 'unstoppable'
  | 'legendary'
  | 'bibliotheque'
  | 'questions_100'
  | 'complet';

export const BADGE_DEFINITIONS: Record<BadgeId, { name: string; icon: string; description: string }> = {
  first_quiz: { name: 'Premier Quiz', icon: '🎯', description: 'Premier quiz complété !' },
  perfect_week: { name: 'Perfect Week', icon: '⭐', description: '7 jours consécutifs d\'étude' },
  discipline: { name: 'Discipline', icon: '🔥', description: '30 jours consécutifs d\'étude' },
  unstoppable: { name: 'Inarrêtable', icon: '💪', description: '60 jours consécutifs d\'étude' },
  legendary: { name: 'Légendaire', icon: '👑', description: '100 jours consécutifs d\'étude' },
  bibliotheque: { name: 'Bibliothèque', icon: '📚', description: '20 quiz complétés' },
  questions_100: { name: '100 Questions', icon: '🚀', description: '100 questions répondues' },
  complet: { name: 'Complet', icon: '💯', description: 'Score parfait sur un thème' },
};

const STREAK_BADGE_THRESHOLDS: Array<{ streak: number; badge: BadgeId }> = [
  { streak: 7, badge: 'perfect_week' },
  { streak: 30, badge: 'discipline' },
  { streak: 60, badge: 'unstoppable' },
  { streak: 100, badge: 'legendary' },
];

async function unlockBadgeIfNeeded(
  db: SupabaseClient<any>,
  userId: string,
  badgeId: BadgeId,
  currentProgress: number,
  targetProgress: number,
): Promise<void> {
  const { data: existing } = await db
    .from('user_badges')
    .select('earned, id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .maybeSingle();

  if (existing?.earned) return;

  const earned = currentProgress >= targetProgress;

  await db.from('user_badges').upsert(
    {
      user_id: userId,
      badge_id: badgeId,
      earned,
      earned_at: earned ? new Date().toISOString() : null,
      current_progress: currentProgress,
      target_progress: targetProgress,
    },
    { onConflict: 'user_id,badge_id' },
  );
}

/**
 * À appeler après chaque session (quiz ou flashcard complété).
 * Met à jour le streak côté serveur et débloque les badges applicables.
 */
export async function updateStreakAfterSession(totalQuestionsAnswered?: number): Promise<{
  ok: boolean;
  newStreak?: number;
  longestStreak?: number;
  newBadges?: BadgeId[];
}> {
  const supabase = await createSupabaseServerClient();
  const db = supabase as unknown as SupabaseClient<any>;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false };

  const today = new Date().toISOString().slice(0, 10);

  // Récupérer streak existant
  const { data: existingStreak } = await db
    .from('user_streaks')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  let currentStreak = 1;
  let longestStreak = existingStreak?.longest_streak ?? 0;
  let isNewDay = false;

  if (existingStreak) {
    const lastDate = existingStreak.last_session_date;

    if (lastDate === today) {
      // Déjà eu une session aujourd'hui — on ne change pas le streak
      return { ok: true, newStreak: existingStreak.current_streak, longestStreak: existingStreak.longest_streak, newBadges: [] };
    }

    isNewDay = true;
    const lastDateObj = new Date(`${lastDate}T12:00:00`);
    const todayObj = new Date(`${today}T12:00:00`);
    const diffDays = Math.round((todayObj.getTime() - lastDateObj.getTime()) / (24 * 60 * 60 * 1000));

    if (diffDays === 1) {
      currentStreak = existingStreak.current_streak + 1;
    } else {
      currentStreak = 1;
    }
  } else {
    isNewDay = true;
    currentStreak = 1;
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  await db.from('user_streaks').upsert(
    {
      user_id: user.id,
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_session_date: today,
      streak_start_date: existingStreak?.streak_start_date && currentStreak > 1 ? existingStreak.streak_start_date : today,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  // Débloquer badges streak
  const newBadges: BadgeId[] = [];
  if (isNewDay) {
    for (const { streak: threshold, badge } of STREAK_BADGE_THRESHOLDS) {
      if (currentStreak >= threshold) {
        const { data: existing } = await db
          .from('user_badges')
          .select('earned')
          .eq('user_id', user.id)
          .eq('badge_id', badge)
          .maybeSingle();

        if (!existing?.earned) {
          newBadges.push(badge);
        }
        await unlockBadgeIfNeeded(db, user.id, badge, currentStreak, threshold);
      } else {
        // Mettre à jour la progression
        await unlockBadgeIfNeeded(db, user.id, badge, currentStreak, threshold);
      }
    }
  }

  // Badge premier quiz
  await unlockBadgeIfNeeded(db, user.id, 'first_quiz', 1, 1);

  // Badges volume (quiz total)
  if (totalQuestionsAnswered !== undefined) {
    await unlockBadgeIfNeeded(db, user.id, 'questions_100', totalQuestionsAnswered, 100);
  }

  return { ok: true, newStreak: currentStreak, longestStreak, newBadges };
}
