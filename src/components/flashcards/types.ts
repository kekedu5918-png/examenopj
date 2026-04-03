import type { Flashcard } from '@/data/flashcards-data';

export type FlashcardFacet = 'materiel' | 'moral' | 'legal' | 'materielMoral';

/** Modes proposés à l’écran (le facet « matériel + moral » est déduit pour les cartes F02, etc.) */
export type ContentStudyMode = 'materiel' | 'moral' | 'legal' | 'mixed';

export type PreparedFlashcard = {
  card: Flashcard;
  facet: FlashcardFacet;
};
