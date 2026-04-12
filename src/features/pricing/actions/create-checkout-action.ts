'use server';

import { getOrCreateCustomer } from '@/features/account/controllers/get-or-create-customer';
import { getSession } from '@/features/account/controllers/get-session';
import { Price } from '@/features/pricing/types';
import { getStripeAdmin } from '@/libs/stripe/stripe-admin';
import { getURL } from '@/utils/get-url';

/** Retour JSON (pas `redirect`) pour que le client fasse la navigation : évite les conflits avec `useTransition` / erreur React #310. */
export type CreateCheckoutResult =
  | { ok: true; url: string }
  | { ok: false; redirectTo: string };

export async function createCheckoutAction({ price }: { price: Price }): Promise<CreateCheckoutResult> {
  // 1. Get the user from session
  const session = await getSession();

  if (!session?.user) {
    return { ok: false, redirectTo: `${getURL()}/inscription` };
  }

  if (!session.user.email) {
    throw Error('Could not get email');
  }

  // 2. Retrieve or create the customer in Stripe
  const customer = await getOrCreateCustomer({
    userId: session.user.id,
    email: session.user.email,
  });

  // 3. Create a checkout session in Stripe
  const checkoutSession = await getStripeAdmin().checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    customer,
    customer_update: {
      address: 'auto',
    },
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: price.type === 'recurring' ? 'subscription' : 'payment',
    allow_promotion_codes: true,
    success_url: `${getURL()}/account?checkout=success`,
    cancel_url: `${getURL()}/pricing?checkout=cancelled`,
  });

  if (!checkoutSession?.url) {
    throw Error('checkoutSession is not defined');
  }

  return { ok: true, url: checkoutSession.url };
}
