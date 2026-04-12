import { describe, expect, it } from 'vitest';

import { FREEMIUM_FLASHCARDS_PER_DAY, FREEMIUM_QUIZ_QUESTIONS_PER_DAY } from '@/features/access/get-content-access';

/**
 * Garde-fous sur les constantes freemium — toute évolution doit rester alignée avec l’UI et les Server Actions.
 */
describe('getContentAccess constants', () => {
  it('expose des plafonds freemium strictement positifs', () => {
    expect(FREEMIUM_QUIZ_QUESTIONS_PER_DAY).toBeGreaterThan(0);
    expect(FREEMIUM_FLASHCARDS_PER_DAY).toBeGreaterThan(0);
  });
});
