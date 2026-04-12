'use client';

import { type PropsWithChildren, Suspense, useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { CookieConsentBanner } from '@/components/analytics/CookieConsentBanner';
import { PostHogPageView } from '@/components/analytics/PostHogPageView';
import { ensurePosthog } from '@/lib/analytics/posthog-init';

export function AnalyticsProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    ensurePosthog();
    const onConsent = () => ensurePosthog();
    window.addEventListener('examenopj:analytics-consent', onConsent);
    return () => window.removeEventListener('examenopj:analytics-consent', onConsent);
  }, []);

  return (
    <PostHogProvider client={posthog}>
      {children}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <CookieConsentBanner />
    </PostHogProvider>
  );
}
