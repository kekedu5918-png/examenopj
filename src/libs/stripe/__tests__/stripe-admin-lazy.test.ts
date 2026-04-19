import { describe, expect, it, vi } from 'vitest';

import * as envModule from '@/utils/get-env-var';

/**
 * Bug 0.4 — `getStripeAdmin()` doit être *lazy* :
 * importer le module ne DOIT PAS appeler `getEnvVar` ni instancier
 * Stripe. Sinon `next build` casse dès qu'une seule envvar Stripe est
 * absente, même pour les routes statiques qui n'utilisent pas Stripe.
 */
describe('libs/stripe/stripe-admin — lazy env contract', () => {
  it("n'appelle pas getEnvVar à l'import", async () => {
    const spy = vi.spyOn(envModule, 'getEnvVar');
    spy.mockClear();

    /** Import dynamique pour mesurer ce qui se passe AU moment de l'import. */
    await import('@/libs/stripe/stripe-admin');

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("n'appelle getEnvVar que lorsque getStripeAdmin() est invoqué", async () => {
    const stripeAdmin = await import('@/libs/stripe/stripe-admin');
    const spy = vi.spyOn(envModule, 'getEnvVar');
    spy.mockClear();

    expect(spy).not.toHaveBeenCalled();

    /** Forcer une env minimale pour ne pas faire planter le test. */
    const previous = process.env.STRIPE_SECRET_KEY;
    process.env.STRIPE_SECRET_KEY = 'sk_test_dummy_for_unit_test';
    try {
      stripeAdmin.getStripeAdmin();
    } finally {
      if (previous === undefined) {
        delete process.env.STRIPE_SECRET_KEY;
      } else {
        process.env.STRIPE_SECRET_KEY = previous;
      }
      spy.mockRestore();
    }
  });
});

/**
 * Bug 0.4 — pendant `next build`, le simple import du module
 * `supabase-server-client` ne doit pas non plus toucher à
 * `process.env.NEXT_PUBLIC_SUPABASE_*` (la lecture est faite seulement
 * à l'intérieur de `createSupabaseServerClient()`).
 */
describe('libs/supabase/supabase-server-client — lazy env contract', () => {
  it("n'appelle pas getEnvVar à l'import", async () => {
    const spy = vi.spyOn(envModule, 'getEnvVar');
    spy.mockClear();

    await import('@/libs/supabase/supabase-server-client');

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
