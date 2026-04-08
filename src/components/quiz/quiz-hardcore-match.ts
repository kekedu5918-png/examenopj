import type { QuizQuestion } from '@/data/types';

/** Ponctuation et guillemets fréquents — remplacés par des espaces pour la comparaison. */
const PUNCT_RE = /[\u2018\u2019\u201c\u201d'".,;:!?()[\]{}«»]/g;

/** Normalise une saisie ou une réponse modèle (insensible à la casse, accents, espaces). */
export function normalizeQuizAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(PUNCT_RE, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a.length < b.length) return levenshtein(b, a);
  if (b.length === 0) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur: number[] = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
    }
    prev = cur;
  }
  return prev[b.length]!;
}

function similarityRatio(a: string, b: string): number {
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const d = levenshtein(a, b);
  return 1 - d / Math.max(a.length, b.length);
}

/**
 * Évalue la réponse libre : égalité normalisée, inclusion raisonnable (réponses longues),
 * distance de Levenshtein (fautes de frappe légères).
 */
export function isHardcoreAnswerCorrect(rawUser: string, q: QuizQuestion): boolean {
  const user = normalizeQuizAnswer(rawUser);
  if (!user) return false;

  const expected = q.options[q.correctIndex];
  const candidates = [expected, ...(q.hardcoreAliases ?? [])]
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
    .map((s) => normalizeQuizAnswer(s));

  for (const c of candidates) {
    if (!c) continue;
    if (user === c) return true;

    const long = c.length >= user.length ? c : user;
    const short = c.length >= user.length ? user : c;
    if (short.length >= 4 && long.includes(short)) {
      const ratio = short.length / long.length;
      if (long.length <= 24 || ratio >= 0.45) return true;
    }

    const maxLen = Math.max(user.length, c.length);
    if (maxLen >= 3 && similarityRatio(user, c) >= 0.85) return true;
  }

  return false;
}
