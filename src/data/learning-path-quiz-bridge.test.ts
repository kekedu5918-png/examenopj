import { describe, expect, it } from 'vitest';

import { QUIZ_BRIDGE_CLIENT_KEYS, quizAttemptToLessonClientKey } from '@/data/learning-path-quiz-bridge';

describe('quizAttemptToLessonClientKey', () => {
  it('ne mappe pas le quiz global', () => {
    expect(
      quizAttemptToLessonClientKey({
        mode: 'global',
        fasciculeNum: 3,
      }),
    ).toBeNull();
  });

  it('mappe le domaine DPS vers inf-2', () => {
    expect(
      quizAttemptToLessonClientKey({
        mode: 'domain',
        domainKey: 'DPS',
      }),
    ).toBe(QUIZ_BRIDGE_CLIENT_KEYS.infractionsQcm);
  });

  it('mappe le domaine Procédure pénale vers fla-2', () => {
    expect(
      quizAttemptToLessonClientKey({
        mode: 'domain',
        domainKey: 'Procédure pénale',
      }),
    ).toBe(QUIZ_BRIDGE_CLIENT_KEYS.procedureQcm);
  });

  it('mappe un fascicule DPS (ex. F03) vers inf-2', () => {
    expect(
      quizAttemptToLessonClientKey({
        mode: 'module',
        fasciculeNum: 3,
      }),
    ).toBe(QUIZ_BRIDGE_CLIENT_KEYS.infractionsQcm);
  });

  it('mappe un fascicule procédure (ex. F11) vers fla-2', () => {
    expect(
      quizAttemptToLessonClientKey({
        mode: 'fascicule',
        fasciculeNum: 11,
      }),
    ).toBe(QUIZ_BRIDGE_CLIENT_KEYS.procedureQcm);
  });
});
