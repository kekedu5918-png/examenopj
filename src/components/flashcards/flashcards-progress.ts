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

export function progressStorageKey(fascicule: number | 'all'): string {
  return `flashcards-progress-${fascicule === 'all' ? 'all' : String(fascicule)}`;
}

export function loadFlashcardsProgress(fascicule: number | 'all'): FlashcardsStoredProgress {
  if (typeof window === 'undefined') return { ...empty };
  return parse(localStorage.getItem(progressStorageKey(fascicule)));
}

export function recordFlashcardAnswer(
  fascicule: number | 'all',
  cardId: string,
  bucket: FlashcardsProgressBucket
): void {
  if (typeof window === 'undefined') return;
  const key = progressStorageKey(fascicule);
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
