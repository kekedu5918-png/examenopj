import { describe, expect, it } from 'vitest';

import { compareModulesForCandidate, getFasciculesOrderedForCandidate } from '@/data/cours-candidate-order';
import { getFasciculeExamProfile } from '@/data/exam-competency-map';

describe('cours-candidate-order', () => {
  it('places P0 before P1', () => {
    expect(compareModulesForCandidate({ id: 'f01' }, { id: 'f03' })).toBeLessThan(0);
    expect(getFasciculeExamProfile('f01').priority).toBe('P0');
    expect(getFasciculeExamProfile('f03').priority).toBe('P1');
  });

  it('orders by total exam weight within same priority', () => {
    const p14 = getFasciculeExamProfile('f14');
    const p15 = getFasciculeExamProfile('f15');
    expect(p14.priority).toBe('P0');
    expect(p15.priority).toBe('P0');
    const w14 = p14.epreuveWeight[1] + p14.epreuveWeight[2] + p14.epreuveWeight[3];
    const w15 = p15.epreuveWeight[1] + p15.epreuveWeight[2] + p15.epreuveWeight[3];
    expect(w14).toBeGreaterThanOrEqual(w15);
    expect(compareModulesForCandidate({ id: 'f14' }, { id: 'f15' })).toBeLessThanOrEqual(0);
  });

  it('getFasciculesOrderedForCandidate starts with P0', () => {
    const ordered = getFasciculesOrderedForCandidate();
    const firstP1 = ordered.findIndex((m) => getFasciculeExamProfile(m.id).priority === 'P1');
    const lastP0 = ordered.map((m) => getFasciculeExamProfile(m.id).priority).lastIndexOf('P0');
    expect(firstP1).toBeGreaterThan(lastP0);
  });
});
