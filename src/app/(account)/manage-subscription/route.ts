import { redirect } from 'next/navigation';

import { getCustomerId } from '@/features/account/controllers/get-customer-id';
import { getSession } from '@/features/account/controllers/get-session';
import { getStripeAdmin } from '@/libs/stripe/stripe-admin';
import { getURL } from '@/utils/get-url';
import { safeInternalPath } from '@/utils/safe-internal-path';

export const dynamic = 'force-dynamic';
/**
 * Bug 0.4 — Stripe SDK n'est pas Edge-compatible : on verrouille le runtime
 * Node.js explicitement pour éviter qu'un futur opt-in Edge ne casse le
 * portail facturation. Couplé au lazy `getStripeAdmin()`, cela garantit
 * qu'aucun `process.env.STRIPE_*` n'est lu pendant le build statique.
 */
export const runtime = 'nodejs';

const MANAGE_SUB_PATH = '/manage-subscription';

function isNextRedirectError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as { digest?: unknown }).digest === 'string' &&
    (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
  );
}

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      const next = encodeURIComponent(safeInternalPath(MANAGE_SUB_PATH, MANAGE_SUB_PATH));
      redirect(`/login?next=${next}`);
    }

    let customer: string | null = null;
    try {
      customer = await getCustomerId({ userId: session.user.id });
    } catch {
      redirect('/account?error=subscription_error');
    }

    if (!customer) {
      redirect('/account?error=no_subscription');
    }

    const { url } = await getStripeAdmin().billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`,
    });

    redirect(url);
  } catch (error) {
    if (isNextRedirectError(error)) {
      throw error;
    }
    redirect('/account?error=subscription_error');
  }
}
