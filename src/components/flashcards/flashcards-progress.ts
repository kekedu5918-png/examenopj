export type FlashcardsProgressBucket = 'know' | 'review' | 'dontKnow';

export type FlashcardsStoredProgress = {
  masteredIds: string[];
  reviewIds: string[];
  unknownIds: string[];
};

const empty: FlashcardsStoredProgress = {
  masteredIds: [],
  reviewIds: [],
  unknownIds: [],
};

function parse(raw: string | null): FlashcardsStoredProgress {
  if (!raw) return { ...empty, masteredIds: [], reviewIds: [], unknownIds: [] };
  try {
    const j = JSON.parse(raw) as Partial<FlashcardsStoredProgress>;
    return {
      masteredIds: Array.isArray(j.masteredIds) ? j.masteredIds : [],
      reviewIds: Array.isArray(j.reviewIds) ? j.reviewIds : [],
      unknownIds: Array.isArray(j.unknownIds) ? j.unknownIds : [],
    };
  } catch {
    return { ...empty, masteredIds: [], reviewIds: [], unknownIds: [] };
  }
}

/** Portée de session : `all`, numéro de fascicule (`2`), ou `cat-atteintes-aux-biens`. */
export function progressStorageKey(scope: string): string {
  return `flashcards-progress-${scope}`;
}

export function loadFlashcardsProgress(scope: string): FlashcardsStoredProgress {
  if (typeof window === 'undefined') return { ...empty };
  return parse(localStorage.getItem(progressStorageKey(scope)));
}

export function recordFlashcardAnswer(
  scope: string,
  cardId: string,
  bucket: FlashcardsProgressBucket
): void {
  if (typeof window === 'undefined') return;
  const key = progressStorageKey(scope);
  const p = parse(localStorage.getItem(key));
  const remove = (id: string) => {
    p.masteredIds = p.masteredIds.filter((x) => x !== id);
    p.reviewIds = p.reviewIds.filter((x) => x !== id);
    p.unknownIds = p.unknownIds.filter((x) => x !== id);
  };
  remove(cardId);
  if (bucket === 'know') p.masteredIds.push(cardId);
  else if (bucket === 'review') p.reviewIds.push(cardId);
  else p.unknownIds.push(cardId);
  localStorage.setItem(key, JSON.stringify(p));
}
