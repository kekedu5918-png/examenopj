'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

import { ANALYTICS_CONSENT_KEY } from '@/lib/analytics/consent';
import { ensurePosthog } from '@/lib/analytics/posthog-init';

/**
 * Pageviews manuels (capture_pageview: false à l’init) pour App Router.
 */
export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(ANALYTICS_CONSENT_KEY) !== 'granted') return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    ensurePosthog();
    try {
      const url = window.location.href;
      posthog.capture('$pageview', { $current_url: url });
    } catch {
      /* noop */
    }
  }, [pathname, searchParams]);

  return null;
}
