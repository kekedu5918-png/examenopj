import { describe, expect, it } from 'vitest';

import { estimateReadingMinutesFromPlan, extractFasciculeTag } from './course-plan-meta';

describe('extractFasciculeTag', () => {
  it('retourne le premier tag fascicule F08–F15', () => {
    expect(extractFasciculeTag(['procédure', 'F11', 'CPP'])).toBe('F11');
    expect(extractFasciculeTag(['F08'])).toBe('F08');
    expect(extractFasciculeTag(['F15', 'F11'])).toBe('F15');
  });

  it('ignore les tags hors plage', () => {
    expect(extractFasciculeTag(['F07', 'fondamentaux'])).toBeUndefined();
    expect(extractFasciculeTag([])).toBeUndefined();
  });
});

describe('estimateReadingMinutesFromPlan', () => {
  it('somme les durées du plan', () => {
    expect(
      estimateReadingMinutesFromPlan({
        plan: [{ duree: '5 min' }, { duree: '10 min' }],
      }),
    ).toBe(15);
  });

  it('plancher à 5 min si la somme est faible', () => {
    expect(estimateReadingMinutesFromPlan({ plan: [{ duree: '2 min' }] })).toBe(5);
  });

  it('retourne undefined si pas de plan ou pas de durées', () => {
    expect(estimateReadingMinutesFromPlan({})).toBeUndefined();
    expect(estimateReadingMinutesFromPlan({ plan: [] })).toBeUndefined();
    expect(estimateReadingMinutesFromPlan({ plan: [{ titre: 'x' }] })).toBeUndefined();
  });
});
