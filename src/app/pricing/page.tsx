import type { Metadata } from 'next';

import { PricingThreeColumnPage } from '@/components/pricing/PricingThreeColumnPage';
import { getSession } from '@/features/account/controllers/get-session';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import { PricingFallbackPlans } from '@/features/pricing/components/pricing-fallback-plans';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { pickFreemiumStripePrices } from '@/features/pricing/controllers/pick-freemium-stripe-prices';
import { openGraphForPage } from '@/utils/seo-metadata';

export const dynamic = 'force-dynamic';

const title = 'Tarifs — Examen OPJ';
const description =
  'Gratuit, 9,90 €/mois ou 49 € jusqu’au 11 juin 2026 : enquêtes, PV, articulation, fondamentaux et quiz.';

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: '/pricing' },
  ...openGraphForPage('/pricing', title, description),
};

export default async function PricingPage() {
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
      <div className='mx-auto max-w-4xl px-4 py-16 md:py-24'>
        <h1 className='mb-2 text-center font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl'>
          Choisissez votre accès
        </h1>
        <p className='mb-12 text-center text-gray-400'>Gratuit pour démarrer. Premium pour réussir.</p>
        <PricingFallbackPlans />
      </div>
    );
  }

  return (
    <PricingThreeColumnPage
      isLoggedIn={!!session}
      monthlyPrice={monthly}
      examPrice={exam}
      createCheckoutAction={createCheckoutAction}
    />
  );
}
