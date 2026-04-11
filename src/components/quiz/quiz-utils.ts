import { type QuizQuestion } from '@/data/types';
import { shuffle } from '@/utils/shuffle';

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

/** @deprecated Use `shuffle` from `@/utils/shuffle` directly. Kept for backwards compatibility. */
export function fisherYates<T>(array: T[]): T[] {
  return shuffle(array);
}

/** Mélange les propositions à chaque session : la bonne réponse ne reste pas toujours au même rang. */
export function shuffleQuizQuestionOptions(q: QuizQuestion): QuizQuestion {
  const n = q.options.length;
  if (n < 2) return q;
  const order = fisherYates([...Array(n).keys()]);
  const newOptions = order.map((i) => q.options[i]);
  const newCorrect = order.indexOf(q.correctIndex);
  if (newCorrect < 0) return q;
  return { ...q, options: newOptions, correctIndex: newCorrect };
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

/** Clé localStorage : meilleur % de bonnes réponses sur un quiz thématique lié au module (`f01`, `f03`, …). */
export function getModuleQuizProgressStorageKey(moduleId: string): string {
  return `progress_${moduleId}`;
}

export type ModuleQuizProgressStored = { percent: number; updatedAt: number };

export function readModuleQuizProgress(moduleId: string): ModuleQuizProgressStored | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(getModuleQuizProgressStorageKey(moduleId));
    if (!raw) return null;
    const p = JSON.parse(raw) as ModuleQuizProgressStored;
    if (typeof p.percent !== 'number' || !Number.isFinite(p.percent)) return null;
    return p;
  } catch {
    return null;
  }
}

/** Mémorise le meilleur pourcentage de réussite (session quiz thématique) pour affichage sur la fiche module. */
export function recordModuleQuizBestPercent(moduleId: string, percent: number): void {
  if (typeof window === 'undefined') return;
  const rounded = Math.round(percent * 10) / 10;
  const prev = readModuleQuizProgress(moduleId)?.percent ?? 0;
  const next = Math.max(prev, rounded);
  const payload: ModuleQuizProgressStored = { percent: next, updatedAt: Date.now() };
  try {
    localStorage.setItem(getModuleQuizProgressStorageKey(moduleId), JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent('examenopj:module-quiz-progress', { detail: { moduleId } }));
  } catch {
    /* ignore */
  }
}
