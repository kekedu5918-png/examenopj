import { Suspense } from 'react';

import { PricingCheckoutCancelledAnalytics } from '@/components/analytics/CheckoutReturnAnalytics';
import { TrackOnMount } from '@/components/analytics/TrackOnMount';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { PricingThreeColumnPage } from '@/components/pricing/PricingThreeColumnPage';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getSession } from '@/features/account/controllers/get-session';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import { PricingFallbackPlans } from '@/features/pricing/components/pricing-fallback-plans';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { pickFreemiumStripePrices } from '@/features/pricing/controllers/pick-freemium-stripe-prices';
import { AnalyticsEvents } from '@/lib/analytics/events';

export async function PricingPageServer() {
  let session = null;
  try {
    session = await getSession();
  } catch (e) {
    console.error('[pricing] getSession', e);
  }

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error('[pricing] getProducts', e);
  }

  const { monthly, exam } = pickFreemiumStripePrices(products);

  if (!monthly && !exam) {
    return (
      <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.pricing} pad='default' innerClassName='py-16 md:py-24'>
        <Suspense fallback={null}>
          <PricingCheckoutCancelledAnalytics />
        </Suspense>
        <TrackOnMount event={AnalyticsEvents.pricingViewed} />
        <header className='relative mb-12 text-center'>
          <h1 className='bg-gradient-to-br from-white via-slate-100 to-violet-200/90 bg-clip-text font-sans text-3xl font-extrabold tracking-tight text-transparent md:text-4xl'>
            Choisissez votre accès
          </h1>
          <p className='mx-auto mt-4 max-w-xl text-lg text-slate-400'>
            Gratuit pour démarrer. Premium pour réussir — configuration Stripe en cours sur ce déploiement.
          </p>
        </header>
        <PricingFallbackPlans />
      </InteriorPageShell>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <PricingCheckoutCancelledAnalytics />
      </Suspense>
      <TrackOnMount event={AnalyticsEvents.pricingViewed} />
      <PricingThreeColumnPage
        isLoggedIn={!!session}
        monthlyPrice={monthly}
        examPrice={exam}
        createCheckoutAction={createCheckoutAction}
      />
    </>
  );
}
