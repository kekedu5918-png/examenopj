import posthog from 'posthog-js';

import { ANALYTICS_CONSENT_KEY } from '@/lib/analytics/consent';
import { ensurePosthog } from '@/lib/analytics/posthog-init';

export { ANALYTICS_CONSENT_KEY } from '@/lib/analytics/consent';

/** 10 événements funnel / produit (PostHog). */
export const AnalyticsEvents = {
  pricingViewed: 'pricing_viewed',
  checkoutStart: 'checkout_start',
  signupStart: 'signup_start',
  loginSuccess: 'login_success',
  quizSessionStart: 'quiz_session_start',
  flashcardSessionStart: 'flashcard_session_start',
  learningPathView: 'learning_path_view',
  paymentSuccess: 'payment_success',
  paymentFailed: 'payment_failed',
  onboardingComplete: 'onboarding_complete',
  learningPathStepCompleted: 'learning_path_step_completed',
  learningPathModuleCompleted: 'learning_path_module_completed',
} as const;

export function track(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(ANALYTICS_CONSENT_KEY) !== 'granted') return;
  ensurePosthog();
  try {
    posthog.capture(event, properties);
  } catch {
    /* noop */
  }
}
