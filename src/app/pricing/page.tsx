import type { Metadata } from 'next';
import Image from 'next/image';

import { getSession } from '@/features/account/controllers/get-session';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import { FreemiumPricingPlans } from '@/features/pricing/components/freemium-pricing-plans';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { pickFreemiumStripePrices } from '@/features/pricing/controllers/pick-freemium-stripe-prices';

export const metadata: Metadata = {
  title: 'Tarifs — Préparez-vous sans limite | Examen OPJ',
  description:
    'Essai 7 jours, puis freemium (5 quiz et 5 flashcards/jour) ou Premium 9,90€/mois ou 29,90€ jusqu’au concours OPJ Juin 2026.',
};

export default async function PricingPage() {
  const session = await getSession();
  const products = await getProducts();
  const { monthly, exam } = pickFreemiumStripePrices(products);
  const freePlanHref = session ? '/entrainement' : '/signup';

  return (
    <section className='relative min-h-screen rounded-lg bg-black py-8'>
      <FreemiumPricingPlans
        freePlanHref={freePlanHref}
        isLoggedIn={!!session}
        monthlyPrice={monthly}
        examPrice={exam}
        createCheckoutAction={createCheckoutAction}
      />

      <Image
        src='/section-bg.png'
        width={1440}
        height={462}
        alt=''
        className='pointer-events-none absolute left-0 top-0 rounded-t-lg opacity-40'
        priority
        quality={100}
      />
    </section>
  );
}
