import { type QuizCadreEnquete, type QuizEnqueteCode, type QuizQuestion } from '@/data/types';

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

export type QuizTaxonomyFilter = {
  epreuve?: 1 | 2 | 3;
  cadreEnquete?: QuizCadreEnquete;
  enqueteCode?: QuizEnqueteCode | string;
  fondamentalSlug?: string;
};

/** Filtre les questions selon les métadonnées optionnelles (ET logique sur les dimensions renseignées). */
export function applyTaxonomyFilter(
  pool: QuizQuestion[],
  tax: Partial<QuizTaxonomyFilter> | null | undefined
): QuizQuestion[] {
  if (!tax) return pool;
  const hasE = tax.epreuve != null;
  const hasC = tax.cadreEnquete != null;
  const hasEn = tax.enqueteCode != null && tax.enqueteCode !== '';
  const hasF = tax.fondamentalSlug != null && tax.fondamentalSlug !== '';

  if (!hasE && !hasC && !hasEn && !hasF) return pool;

  return pool.filter((q) => {
    if (hasE) {
      if (q.epreuveCible != null && q.epreuveCible !== tax.epreuve) return false;
    }
    if (hasC) {
      if (q.cadreEnquete != null && q.cadreEnquete !== tax.cadreEnquete) return false;
    }
    if (hasEn) {
      if (q.enqueteCode != null && q.enqueteCode !== tax.enqueteCode) return false;
    }
    if (hasF) {
      if (q.fondamentalSlug != null && q.fondamentalSlug !== tax.fondamentalSlug) return false;
    }
    return true;
  });
}

export function serializeQuizFilterContext(tax: Partial<QuizTaxonomyFilter> | null | undefined): string | null {
  if (!tax) return null;
  const parts: string[] = [];
  if (tax.epreuve != null) parts.push(`ep=${tax.epreuve}`);
  if (tax.cadreEnquete) parts.push(`cad=${tax.cadreEnquete}`);
  if (tax.enqueteCode) parts.push(`enq=${tax.enqueteCode}`);
  if (tax.fondamentalSlug) parts.push(`fond=${tax.fondamentalSlug}`);
  if (parts.length === 0) return null;
  return `quizctx:${parts.join('|')}`;
}

export function applyQuestionLimit(
  questions: QuizQuestion[],
  limit: 10 | 20 | 30 | 'all' | number
): QuizQuestion[] {
  if (limit === 'all') return questions;
  const n = typeof limit === 'number' ? Math.min(200, Math.max(1, Math.floor(limit))) : limit;
  return questions.slice(0, Math.min(n, questions.length));
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
