import Stripe from 'stripe';

import { getEnvVar } from '@/utils/get-env-var';

let stripeAdminSingleton: Stripe | null = null;

/** Lazy init so `next build` does not require Stripe env vars (they are still required at runtime). */
export function getStripeAdmin(): Stripe {
  if (!stripeAdminSingleton) {
    stripeAdminSingleton = new Stripe(getEnvVar(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
      appInfo: {
        name: 'UPDATE_THIS_WITH_YOUR_STRIPE_APP_NAME',
        version: '0.1.0',
      },
    });
  }
  return stripeAdminSingleton;
}
