/** Date de l’examen OPJ — session juin 2026 (référence produit). */
export const EXAM_OPJ_DATE_2026 = new Date('2026-06-11T08:00:00+02:00');

/** Jours restants avant l’examen (≥ 0). */
export function getDaysUntilExam(date: Date = EXAM_OPJ_DATE_2026): number {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfExam = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.max(0, Math.ceil((startOfExam - startOfToday) / (24 * 60 * 60 * 1000)));
}

export function formatExamCountdownBadge(): string {
  const d = getDaysUntilExam();
  return `Session 2026 — J-${d} avant l'examen`;
}
