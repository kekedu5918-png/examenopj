import type { Metadata } from 'next';

import { PricingThreeColumnPage } from '@/components/pricing/PricingThreeColumnPage';
import { getSession } from '@/features/account/controllers/get-session';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
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

  return (
    <PricingThreeColumnPage
      isLoggedIn={!!session}
      monthlyPrice={monthly}
      examPrice={exam}
      createCheckoutAction={createCheckoutAction}
    />
  );
}
