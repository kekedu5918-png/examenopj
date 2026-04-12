import { describe, expect, it } from 'vitest';

import { getFasciculeExamProfile } from '@/data/exam-competency-map';

describe('exam-competency-map', () => {
  it('returns profile with primary epreuves for f01', () => {
    const p = getFasciculeExamProfile('f01');
    expect(p.fasciculeId).toBe('f01');
    expect(p.primaryEpreuves).toContain(1);
    expect(p.epreuveWeight[1]).toBeGreaterThanOrEqual(2);
  });

});
