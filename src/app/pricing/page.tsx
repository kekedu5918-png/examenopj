import type { Metadata } from 'next';
import Image from 'next/image';

import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import { FreemiumPricingPlans } from '@/features/pricing/components/freemium-pricing-plans';
import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';

export const metadata: Metadata = {
  title: 'Tarifs — Préparez-vous sans limite | Examen OPJ',
  description:
    'Essai 7 jours, puis freemium (5 quiz et 5 flashcards/jour) ou Premium 9,90€/mois ou 29,90€ jusqu’au concours OPJ Juin 2026.',
};

export default async function PricingPage() {
  const products = await getProducts();

  return (
    <section className='relative min-h-screen rounded-lg bg-black py-8'>
      <FreemiumPricingPlans />

      {products.length > 0 ? (
        <div className='relative z-10 mx-auto max-w-[1200px] border-t border-white/10 px-4 pb-16 pt-12'>
          <h2 className='text-center text-xl font-bold text-white'>Offres de paiement Stripe</h2>
          <p className='mx-auto mt-2 max-w-xl text-center text-sm text-gray-500'>
            Complétez votre abonnement via notre passerelle sécurisée lorsque les prix sont configurés.
          </p>
          <div className='mt-8 flex w-full flex-col items-center justify-center gap-8 lg:flex-row'>
            {products.map((product) => (
              <PricingCard key={product.id} product={product} createCheckoutAction={createCheckoutAction} />
            ))}
          </div>
        </div>
      ) : null}

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
