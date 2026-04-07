import { quizHrefForFasciculeId } from '@/data/fondamentaux-fascicule-reperes';
import type { Fiche } from '@/data/fondamentaux-types';

/** Durée indicative de lecture (minutes). */
export function getEstimatedMinutesForFiche(f: Fiche): number {
  if (f.estimatedMinutes != null) return f.estimatedMinutes;
  const base = 10;
  const fromRules = f.regles.length * 2;
  const fromBlocs = (f.blocsDetail?.length ?? 0) * 4;
  return Math.min(48, base + fromRules + fromBlocs);
}

/** Lien quiz cohérent avec la fiche (module fascicule ou tag fondamental). */
export function resolveQuizHrefForFiche(f: Fiche): string | null {
  if (f.lienQuiz) return f.lienQuiz;
  if (f.fasciculeId) return quizHrefForFasciculeId(f.fasciculeId);
  const tag = f.quizTag ?? f.id;
  return `/quiz?fondamental=${encodeURIComponent(tag)}`;
}
