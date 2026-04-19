/**
 * Gamification légère (localStorage) — streak de quiz et badges côté client.
 */

const STREAK_KEY = 'examenopj:quiz-streak-days';
const LAST_DAY_KEY = 'examenopj:quiz-last-activity-day';
const TOTAL_KEY = 'examenopj:quiz-total-completed';
const BADGES_KEY = 'examenopj:quiz-badges';

function todayId(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Catalogue centralisé des badges gamification — utilisé par toasts et page Badges. */
export type BadgeId =
  | 'first-quiz'
  | 'ten-quizzes'
  | 'fifty-quizzes'
  | 'hundred-quizzes'
  | 'streak-3'
  | 'streak-7'
  | 'streak-14'
  | 'streak-30'
  | 'theme-100';

export type BadgeDefinition = {
  id: BadgeId;
  label: string;
  description: string;
  icon: string;
};

export const BADGE_CATALOG: readonly BadgeDefinition[] = [
  { id: 'first-quiz', label: 'Premier quiz', description: 'Vous avez bouclé votre toute première session.', icon: '🎯' },
  { id: 'ten-quizzes', label: '10 quiz', description: '10 sessions complétées — la régularité s’installe.', icon: '🏅' },
  { id: 'fifty-quizzes', label: '50 quiz', description: '50 sessions — vous êtes en plein rythme d’examen.', icon: '🥈' },
  { id: 'hundred-quizzes', label: '100 quiz', description: 'Cap des 100 sessions franchi — performance d’élite.', icon: '🥇' },
  { id: 'streak-3', label: '3 jours d’affilée', description: 'Trois jours consécutifs : la série démarre.', icon: '🔥' },
  { id: 'streak-7', label: 'Perfect Week', description: '7 jours d’affilée — habitude installée.', icon: '⭐' },
  { id: 'streak-14', label: 'Quinzaine', description: '14 jours d’affilée — discipline solide.', icon: '💪' },
  { id: 'streak-30', label: 'Mois complet', description: '30 jours sans interruption — résultat garanti.', icon: '🏆' },
  { id: 'theme-100', label: 'Sans-faute thème', description: '100 % sur un quiz par thème — vous maîtrisez le sujet.', icon: '🎖️' },
] as const;

export function getBadgeDefinition(id: string): BadgeDefinition | undefined {
  return BADGE_CATALOG.find((b) => b.id === id);
}

/** Appeler à chaque quiz terminé (série complète). */
export function recordQuizCompleted(): { streak: number; totalQuizzes: number; newBadges: BadgeId[] } {
  if (typeof window === 'undefined') return { streak: 0, totalQuizzes: 0, newBadges: [] };
  try {
    const day = todayId();
    const lastDay = localStorage.getItem(LAST_DAY_KEY);
    let streak = Number.parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10) || 0;

    const total = (Number.parseInt(localStorage.getItem(TOTAL_KEY) ?? '0', 10) || 0) + 1;
    localStorage.setItem(TOTAL_KEY, String(total));

    if (lastDay !== day) {
      if (!lastDay) {
        streak = 1;
      } else {
        const prev = new Date(`${lastDay}T12:00:00`);
        const cur = new Date(`${day}T12:00:00`);
        const diffDays = Math.round((cur.getTime() - prev.getTime()) / (24 * 60 * 60 * 1000));
        if (diffDays === 1) streak += 1;
        else streak = 1;
      }
      localStorage.setItem(LAST_DAY_KEY, day);
      localStorage.setItem(STREAK_KEY, String(streak));
    }

    const badges = new Set(JSON.parse(localStorage.getItem(BADGES_KEY) ?? '[]') as string[]);
    const before = new Set(badges);
    badges.add('first-quiz');
    if (total >= 10) badges.add('ten-quizzes');
    if (total >= 50) badges.add('fifty-quizzes');
    if (total >= 100) badges.add('hundred-quizzes');
    if (streak >= 3) badges.add('streak-3');
    if (streak >= 7) badges.add('streak-7');
    if (streak >= 14) badges.add('streak-14');
    if (streak >= 30) badges.add('streak-30');
    localStorage.setItem(BADGES_KEY, JSON.stringify([...badges]));

    const newBadges: BadgeId[] = [...badges].filter((b): b is BadgeId => !before.has(b)) as BadgeId[];

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('examenopj:quiz-gamification'));
      if (newBadges.length > 0) {
        window.dispatchEvent(
          new CustomEvent('examenopj:badge-earned', { detail: { ids: newBadges } }),
        );
      }
    }

    return { streak, totalQuizzes: total, newBadges };
  } catch {
    return { streak: 0, totalQuizzes: 0, newBadges: [] };
  }
}

/** Badge « 100 % sur un thème » (fascicule) — à appeler quand un quiz module est réussi sans faute. */
export function recordThemePerfectScore(fasciculeNum: number): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const key = `f${String(fasciculeNum).padStart(2, '0')}`;
    const perfect = new Set(JSON.parse(localStorage.getItem('examenopj:quiz-perfect-themes') ?? '[]') as string[]);
    perfect.add(key);
    localStorage.setItem('examenopj:quiz-perfect-themes', JSON.stringify([...perfect]));
    const badges = new Set(JSON.parse(localStorage.getItem(BADGES_KEY) ?? '[]') as string[]);
    const isNew = !badges.has('theme-100');
    badges.add('theme-100');
    localStorage.setItem(BADGES_KEY, JSON.stringify([...badges]));
    if (isNew && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('examenopj:badge-earned', { detail: { ids: ['theme-100'] } }),
      );
    }
    return isNew;
  } catch {
    return false;
  }
}

export function getQuizBadges(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(BADGES_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

/** @deprecated alias */
export function recordQuizCompletedToday(): ReturnType<typeof recordQuizCompleted> {
  return recordQuizCompleted();
}

export function getQuizStreak(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return Number.parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
}

/**
 * Indique si la série en cours risque d'être perdue (aucun quiz aujourd'hui alors qu'une série existe).
 * Retourne `true` si streak > 0 ET la dernière activité n'est pas aujourd'hui.
 */
export function isStreakAtRisk(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const streak = Number.parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10) || 0;
    if (streak <= 0) return false;
    const lastDay = localStorage.getItem(LAST_DAY_KEY);
    return lastDay !== todayId();
  } catch {
    return false;
  }
}

export function getTotalQuizzesCompleted(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return Number.parseInt(localStorage.getItem(TOTAL_KEY) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
}
