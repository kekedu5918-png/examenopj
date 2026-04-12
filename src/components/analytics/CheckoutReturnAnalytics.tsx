'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { AnalyticsEvents, track } from '@/lib/analytics/events';

/** Après retour Stripe réussi : `?checkout=success`. */
export function AccountCheckoutSuccessAnalytics() {
  const sp = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (sp.get('checkout') !== 'success') return;
    fired.current = true;
    track(AnalyticsEvents.paymentSuccess, { source: 'stripe_checkout' });
    window.history.replaceState({}, '', '/account');
  }, [sp]);

  return null;
}

/** Après abandon du paiement Stripe : `?checkout=cancelled`. */
export function PricingCheckoutCancelledAnalytics() {
  const sp = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (sp.get('checkout') !== 'cancelled') return;
    fired.current = true;
    track(AnalyticsEvents.paymentFailed, { reason: 'checkout_cancelled' });
    window.history.replaceState({}, '', '/pricing');
  }, [sp]);

  return null;
}
