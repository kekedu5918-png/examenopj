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

/** Appeler à chaque quiz terminé (série complète). */
export function recordQuizCompleted(): { streak: number; totalQuizzes: number } {
  if (typeof window === 'undefined') return { streak: 0, totalQuizzes: 0 };
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
    badges.add('first-quiz');
    if (total >= 10) badges.add('ten-quizzes');
    if (streak >= 7) badges.add('streak-7');
    localStorage.setItem(BADGES_KEY, JSON.stringify([...badges]));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('examenopj:quiz-gamification'));
    }

    return { streak, totalQuizzes: total };
  } catch {
    return { streak: 0, totalQuizzes: 0 };
  }
}

/** Badge « 100 % sur un thème » (fascicule) — à appeler quand un quiz module est réussi sans faute. */
export function recordThemePerfectScore(fasciculeNum: number): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `f${String(fasciculeNum).padStart(2, '0')}`;
    const perfect = new Set(JSON.parse(localStorage.getItem('examenopj:quiz-perfect-themes') ?? '[]') as string[]);
    perfect.add(key);
    localStorage.setItem('examenopj:quiz-perfect-themes', JSON.stringify([...perfect]));
    const badges = new Set(JSON.parse(localStorage.getItem(BADGES_KEY) ?? '[]') as string[]);
    badges.add('theme-100');
    localStorage.setItem(BADGES_KEY, JSON.stringify([...badges]));
  } catch {
    /* ignore */
  }
}

export function getQuizStreak(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return Number.parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
}

