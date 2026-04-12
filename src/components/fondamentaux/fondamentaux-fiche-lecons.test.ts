import { describe, expect, it } from 'vitest';

import { FONDAMENTAUX_FICHE_LECON_IDS } from '@/components/fondamentaux/FondamentauxFicheLessonBlocks';
import { FONDAMENTAUX_PART1 } from '@/data/fondamentaux-fiches-part1';
import { FONDAMENTAUX_PART2 } from '@/data/fondamentaux-fiches-part2';
import { FONDAMENTAUX_PART3 } from '@/data/fondamentaux-fiches-part3';
import { FONDAMENTAUX_PART4 } from '@/data/fondamentaux-fiches-part4';

function curatedFicheIds(): string[] {
  return [
    ...FONDAMENTAUX_PART1,
    ...FONDAMENTAUX_PART2,
    ...FONDAMENTAUX_PART3,
    ...FONDAMENTAUX_PART4,
  ].map((f) => f.id);
}

describe('Fondamentaux — blocs leçons', () => {
  it('couvre exactement les fiches corpus principal (parts 1–4)', () => {
    const curated = [...new Set(curatedFicheIds())].sort((a, b) => a.localeCompare(b, 'fr'));
    const lecon = [...FONDAMENTAUX_FICHE_LECON_IDS].sort((a, b) => a.localeCompare(b, 'fr'));
    expect(lecon).toEqual(curated);
  });
});
