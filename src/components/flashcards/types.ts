import type { Flashcard } from '@/data/flashcards-data';

export type FlashcardFacet = 'materiel' | 'moral' | 'legal';

export type ContentStudyMode = FlashcardFacet | 'mixed';

export type PreparedFlashcard = {
  card: Flashcard;
  facet: FlashcardFacet;
};
