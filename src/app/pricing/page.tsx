import type { Metadata } from 'next';

import { PricingMarketingPage } from '@/components/pricing/PricingMarketingPage';
import { getSession } from '@/features/account/controllers/get-session';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { pickFreemiumStripePrices } from '@/features/pricing/controllers/pick-freemium-stripe-prices';
import { openGraphForPage } from '@/utils/seo-metadata';

export const dynamic = 'force-dynamic';

const title = 'Tarifs — Examen OPJ';
const description =
  "Gratuit ou accès complet : guide, modules, quiz, flashcards et sujets blancs. Tarifs mensuel ou annuel (-20 % sur l'annuel).";

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

  const { monthly, yearly } = pickFreemiumStripePrices(products);

  return (
    <PricingMarketingPage
      isLoggedIn={!!session}
      monthlyPrice={monthly}
      yearlyPrice={yearly}
      createCheckoutAction={createCheckoutAction}
    />
  );
}
