import { type QuizQuestion } from '@/data/types';

export type QuizMode = 'global' | 'fascicule' | 'module' | 'domain';

/** Exclut les entrées corrompues ou incomplètes (évite un QCM « vide » à l’écran). */
export function isValidQuizQuestion(q: QuizQuestion): boolean {
  const text = typeof q.question === 'string' ? q.question.trim() : '';
  if (text.length < 8) return false;
  if (!Array.isArray(q.options) || q.options.length < 4) return false;
  if (!q.options.every((o) => typeof o === 'string' && o.trim().length > 0)) return false;
  if (
    typeof q.correctIndex !== 'number' ||
    q.correctIndex < 0 ||
    q.correctIndex >= q.options.length
  ) {
    return false;
  }
  return true;
}

export function isThemeQuizMode(mode: QuizMode): boolean {
  return mode === 'fascicule' || mode === 'module';
}

export function fisherYates<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function filterQuestions(
  all: QuizQuestion[],
  mode: QuizMode,
  fascicule?: number,
  domain?: QuizQuestion['domaine']
): QuizQuestion[] {
  let pool: QuizQuestion[];
  if (mode === 'global') pool = [...all];
  else if (isThemeQuizMode(mode) && fascicule != null) pool = all.filter((q) => q.fascicule === fascicule);
  else if (mode === 'domain' && domain) pool = all.filter((q) => q.domaine === domain);
  else pool = [...all];
  return pool.filter(isValidQuizQuestion);
}

export function applyQuestionLimit(
  questions: QuizQuestion[],
  limit: 10 | 20 | 30 | 'all'
): QuizQuestion[] {
  if (limit === 'all') return questions;
  return questions.slice(0, Math.min(limit, questions.length));
}

export type QuizAnswerMode = 'mcq' | 'hardcore';

export function getQuizStorageKey(
  mode: QuizMode,
  fascicule?: number,
  domain?: QuizQuestion['domaine'],
  answerMode: QuizAnswerMode = 'mcq'
): string {
  const suffix = answerMode === 'hardcore' ? ':hardcore' : '';
  if (isThemeQuizMode(mode) && fascicule != null) return `quiz-best-fascicule-${fascicule}${suffix}`;
  if (mode === 'domain' && domain) return `quiz-best-domain-${domain}${suffix}`;
  return `quiz-best-global${suffix}`;
}

export function readBestQuizPercent(key: string): number | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : null;
}

/** Enregistre le pourcentage si meilleur que l’existant ; retourne le record actuel après écriture. */
export function recordQuizBestPercent(key: string, percent: number): number {
  if (typeof window === 'undefined') return percent;
  const rounded = Math.round(percent * 10) / 10;
  const prev = readBestQuizPercent(key);
  if (prev == null || rounded > prev) {
    localStorage.setItem(key, String(rounded));
    return rounded;
  }
  return prev;
}
