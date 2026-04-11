'use client';

import { todayIso } from '@/utils/date';

function todayKey() {
  return todayIso();
}

const PREFIX_QUIZ = 'examenopj-quiz-q-';
const PREFIX_FC = 'examenopj-fc-reviews-';

export function getDailyQuizQuestionCount(): number {
  if (typeof window === 'undefined') return 0;
  const v = window.localStorage.getItem(PREFIX_QUIZ + todayKey());
  return v ? Number.parseInt(v, 10) || 0 : 0;
}

export function addDailyQuizQuestionCount(delta: number) {
  if (typeof window === 'undefined' || delta <= 0) return;
  const k = PREFIX_QUIZ + todayKey();
  const n = getDailyQuizQuestionCount() + delta;
  window.localStorage.setItem(k, String(n));
}

export function getDailyFlashcardReviewCount(): number {
  if (typeof window === 'undefined') return 0;
  const v = window.localStorage.getItem(PREFIX_FC + todayKey());
  return v ? Number.parseInt(v, 10) || 0 : 0;
}

export function addDailyFlashcardReviewCount(delta: number) {
  if (typeof window === 'undefined' || delta <= 0) return;
  const k = PREFIX_FC + todayKey();
  const n = getDailyFlashcardReviewCount() + delta;
  window.localStorage.setItem(k, String(n));
}
