import { describe, expect, it } from 'vitest';

import { getFasciculeExamProfile, getSujetsBlancsForFascicule } from '@/data/exam-competency-map';

describe('exam-competency-map', () => {
  it('returns profile with primary epreuves for f01', () => {
    const p = getFasciculeExamProfile('f01');
    expect(p.fasciculeId).toBe('f01');
    expect(p.primaryEpreuves).toContain(1);
    expect(p.epreuveWeight[1]).toBeGreaterThanOrEqual(2);
  });

  it('maps fascicules to sujets blancs', () => {
    const forF03 = getSujetsBlancsForFascicule('f03');
    expect(forF03.some((s) => s.id === 'session-2026-B')).toBe(true);
    const forF01 = getSujetsBlancsForFascicule('f01');
    expect(forF01.some((s) => s.id === 'session-2026-A')).toBe(true);
  });
});
