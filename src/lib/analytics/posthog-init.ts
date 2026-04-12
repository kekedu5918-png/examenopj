import posthog from 'posthog-js';

import { ANALYTICS_CONSENT_KEY } from '@/lib/analytics/consent';

let initialized = false;

/** Initialise PostHog une seule fois si consentement accordé et clé présente. */
export function ensurePosthog(): void {
  if (typeof window === 'undefined' || initialized) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  if (localStorage.getItem(ANALYTICS_CONSENT_KEY) !== 'granted') return;
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    capture_pageview: false,
    persistence: 'localStorage+cookie',
  });
  initialized = true;
}
