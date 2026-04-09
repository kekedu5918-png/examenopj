/**
 * SM-2 (SuperMemo 2) spaced repetition algorithm.
 * Reference: Wozniak, 1987 — https://supermemo.com/en/archives1990-2015/english/ol/2new.htm
 *
 * Quality scale (0–5):
 *   0 — Oublié (completely forgotten)
 *   1 — Incorrect, remembered after seeing answer
 *   2 — Incorrect but recognized as familiar
 *   3 — Correct with significant effort
 *   4 — Correct with some effort
 *   5 — Correct, immediate recall
 */

export const SM2_QUALITY_LABELS: Record<number, string> = {
  0: 'Oublié',
  2: 'Difficile',
  3: 'Correct',
  4: 'Bien',
  5: 'Facile',
};

export type SM2State = {
  easinessFactor: number; // EF, min 1.3, default 2.5
  intervalDays: number;   // Current interval in days
  repetitions: number;    // Consecutive successful repetitions
};

export type SM2Result = SM2State & {
  nextReviewDate: string;                               // ISO date 'YYYY-MM-DD'
  status: 'new' | 'learning' | 'reviewing' | 'mastered';
  correct: boolean;
};

export const DEFAULT_SM2_STATE: SM2State = {
  easinessFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
};

/**
 * Apply a quality rating to the current SM-2 state.
 * Returns the new state + next review date.
 */
export function applySM2Quality(state: SM2State, quality: number): SM2Result {
  if (quality < 0 || quality > 5) {
    throw new RangeError(`SM-2 quality must be 0–5, got ${quality}`);
  }

  let { easinessFactor, intervalDays, repetitions } = state;
  const correct = quality >= 3;

  if (correct) {
    repetitions += 1;

    if (repetitions === 1) {
      intervalDays = 1;
    } else if (repetitions === 2) {
      intervalDays = 3;
    } else {
      intervalDays = Math.round(intervalDays * easinessFactor);
    }

    intervalDays = Math.max(1, intervalDays);

    // EF = EF + (0.1 − (5 − q) × (0.08 + (5 − q) × 0.02))
    easinessFactor =
      easinessFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    easinessFactor = Math.max(1.3, Number(easinessFactor.toFixed(3)));
  } else {
    // Incorrect: reset repetition chain, review tomorrow
    repetitions = 0;
    intervalDays = 1;
    easinessFactor = Math.max(1.3, Number((easinessFactor - 0.2).toFixed(3)));
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);
  const nextReviewDate = nextDate.toISOString().slice(0, 10);

  // Status transition: 5+ consecutive correct reviews at quality ≥ 4 → mastered
  const status: SM2Result['status'] =
    !correct
      ? 'learning'
      : repetitions >= 5 && quality >= 4
        ? 'mastered'
        : repetitions > 0
          ? 'reviewing'
          : 'new';

  return { easinessFactor, intervalDays, repetitions, nextReviewDate, status, correct };
}

/** Map a simple 3-bucket flashcard state to a SM-2 quality rating. */
export function bucketToQuality(bucket: 'know' | 'review' | 'dontKnow'): number {
  if (bucket === 'know') return 5;
  if (bucket === 'review') return 3;
  return 0;
}
