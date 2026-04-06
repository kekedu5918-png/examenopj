import type { Flashcard } from '@/data/flashcards-data';

export type FlashcardFacet = 'materiel' | 'moral' | 'materielMoral';

/** Modes proposés à l’écran ; le cadre légal est affiché sur le recto, pas interrogé au verso. */
export type ContentStudyMode = 'materiel' | 'moral' | 'mixed';

export type PreparedFlashcard = {
  card: Flashcard;
  facet: FlashcardFacet;
};
