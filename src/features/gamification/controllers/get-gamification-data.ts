import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

import { BADGE_DEFINITIONS, type BadgeId } from '../badge-definitions';

export type StreakData = {
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
  nextMilestone: { days: number; badge: string; icon: string; progress: number } | null;
  currentMilestoneBadge: string | null;
};

export type BadgeData = {
  id: BadgeId;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt: string | null;
  progress: number;
  target: number;
  progressPercent: number;
};

export type CategoryProgressData = {
  fasciculeNum: number;
  name: string;
  averagePercent: number;
  totalAttempts: number;
  urgency: 'critical' | 'high' | 'medium' | 'low';
};

export type GamificationData = {
  streak: StreakData;
  badges: BadgeData[];
  categoryProgress: CategoryProgressData[];
  totalQuizAttempts: number;
};

const STREAK_MILESTONES = [
  { days: 7, badge: 'Perfect Week', icon: '⭐' },
  { days: 14, badge: '2 Semaines', icon: '🔥' },
  { days: 30, badge: 'Discipline', icon: '💪' },
  { days: 60, badge: 'Inarrêtable', icon: '🏆' },
  { days: 100, badge: 'Légendaire', icon: '👑' },
];

export async function getGamificationData(userId: string): Promise<GamificationData> {
  const supabase = await createSupabaseServerClient();
  const db = supabase as unknown as SupabaseClient<any>;

  const [streakRes, badgesRes, attemptsRes] = await Promise.all([
    db.from('user_streaks').select('*').eq('user_id', userId).maybeSingle(),
    db.from('user_badges').select('*').eq('user_id', userId),
    db.from('quiz_attempts').select('fascicule_num, percent, mode').eq('user_id', userId).order('created_at', { ascending: false }).limit(200),
  ]);

  // ── Streak ──────────────────────────────────────────────
  const raw = streakRes.data;
  const currentStreak = raw?.current_streak ?? 0;

  let nextMilestone: StreakData['nextMilestone'] = null;
  let currentMilestoneBadge: string | null = null;

  for (const m of STREAK_MILESTONES) {
    if (currentStreak >= m.days) {
      currentMilestoneBadge = `${m.icon} ${m.badge}`;
    } else if (!nextMilestone) {
      nextMilestone = { days: m.days, badge: m.badge, icon: m.icon, progress: currentStreak };
    }
  }

  const streak: StreakData = {
    currentStreak,
    longestStreak: raw?.longest_streak ?? 0,
    lastSessionDate: raw?.last_session_date ?? null,
    nextMilestone,
    currentMilestoneBadge,
  };

  // ── Badges ───────────────────────────────────────────────
  const badgeRows: Record<string, any> = {};
  for (const b of badgesRes.data ?? []) {
    badgeRows[b.badge_id] = b;
  }

  const badges: BadgeData[] = (Object.keys(BADGE_DEFINITIONS) as BadgeId[]).map((id) => {
    const def = BADGE_DEFINITIONS[id];
    const row = badgeRows[id];
    const progress = row?.current_progress ?? 0;
    const target = row?.target_progress ?? 1;
    return {
      id,
      name: def.name,
      icon: def.icon,
      description: def.description,
      earned: row?.earned ?? false,
      earnedAt: row?.earned_at ?? null,
      progress,
      target,
      progressPercent: target > 0 ? Math.min(100, Math.round((progress / target) * 100)) : 0,
    };
  });

  // ── Progress par catégorie (fascicule) ─────────────────
  const attempts = attemptsRes.data ?? [];
  const totalQuizAttempts = attempts.length;

  const byFascicule: Record<number, number[]> = {};
  for (const a of attempts) {
    if (a.fascicule_num != null) {
      byFascicule[a.fascicule_num] = byFascicule[a.fascicule_num] ?? [];
      byFascicule[a.fascicule_num].push(Number(a.percent));
    }
  }

  const FASCICULE_NAMES: Record<number, string> = {
    1: 'Infractions Graves I (Homicides)',
    2: 'Infractions Graves II (Viols)',
    3: 'Atteintes aux Biens I (Vol)',
    4: 'Atteintes aux Biens II (Recel, Escroquerie)',
    5: 'Violences Volontaires',
    6: 'Procédure Pénale I (GAV)',
    7: 'Procédure Pénale II (Perquisition)',
    8: 'Procédure Pénale III (Instruction)',
    9: 'Fausses Déclarations',
    10: 'Stupéfiants',
    11: 'Infractions Routières',
    12: 'Infractions Diverses',
    13: 'Ordre Public',
    14: 'Épreuves Pratiques',
    15: 'Révision Générale',
  };

  const categoryProgress: CategoryProgressData[] = Object.entries(byFascicule)
    .map(([num, percents]) => {
      const avg = percents.reduce((a, b) => a + b, 0) / percents.length;
      let urgency: CategoryProgressData['urgency'] = 'low';
      if (avg < 40) urgency = 'critical';
      else if (avg < 55) urgency = 'high';
      else if (avg < 70) urgency = 'medium';

      return {
        fasciculeNum: Number(num),
        name: FASCICULE_NAMES[Number(num)] ?? `Fascicule F${String(num).padStart(2, '0')}`,
        averagePercent: Math.round(avg),
        totalAttempts: percents.length,
        urgency,
      };
    })
    .sort((a, b) => a.fasciculeNum - b.fasciculeNum);

  return { streak, badges, categoryProgress, totalQuizAttempts };
}
