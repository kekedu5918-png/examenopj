import { test as base, expect } from '@playwright/test';

/** Même clé que `src/lib/analytics/consent.ts` — évite la bannière (snapshots + axe stables). */
const ANALYTICS_CONSENT_KEY = 'examenopj_analytics_consent';

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.addInitScript((key) => {
      try {
        localStorage.setItem(key, 'denied');
      } catch {
        /* ignore */
      }
    }, ANALYTICS_CONSENT_KEY);
    await use(context);
  },
});

export { expect };
