import { PropsWithChildren, ReactNode, Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { AccountCheckoutSuccessAnalytics } from '@/components/analytics/CheckoutReturnAnalytics';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { Price, ProductWithPrices } from '@/features/pricing/types';

export default async function AccountPage() {
  const [session, subscription, products] = await Promise.all([getSession(), getSubscription(), getProducts()]);

  if (!session) {
    redirect('/login');
  }

  let userProduct: ProductWithPrices | undefined;
  let userPrice: Price | undefined;

  if (subscription?.prices?.products) {
    const { products: linkedProduct, ...priceRow } = subscription.prices;
    userPrice = priceRow as Price;
    userProduct = { ...linkedProduct, prices: [userPrice] };
  } else if (subscription) {
    for (const product of products) {
      if (product.prices && product.prices.length > 0) {
        for (const price of product.prices) {
          if (price.id === subscription.price_id) {
            userProduct = product;
            userPrice = price;
            break;
          }
        }
      }
    }
  }

  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.account} pad='default'>
    <Suspense fallback={null}>
      <AccountCheckoutSuccessAnalytics />
    </Suspense>
    <GlassCard topGlow radius='3xl' padding='p-6 md:p-10' className='mx-auto w-full'>
      <h1 className='mb-8 text-center font-display text-3xl font-semibold tracking-tight text-white md:text-4xl'>
        Mon compte
      </h1>

      <div className='flex flex-col gap-4'>
        <Card
          title='Votre formule'
          footer={
            subscription ? (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/manage-subscription'>Gérer mon abonnement</Link>
              </Button>
            ) : (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/pricing'>Souscrire un abonnement</Link>
              </Button>
            )
          }
        >
          {userProduct && userPrice ? (
            <PricingCard product={userProduct} price={userPrice} />
          ) : (
            <div className='space-y-3 text-sm text-zinc-300'>
              <p>Vous n&apos;avez pas d&apos;abonnement actif (ou la synchronisation Stripe n&apos;est pas encore à jour).</p>
              <p className='text-zinc-400'>
                Les tarifs et le paiement passent par Stripe ; après souscription, le statut apparaît ici une fois les
                webhooks reçus. Vérifiez la page{' '}
                <Link className='text-cyan-400 underline underline-offset-2 hover:text-cyan-300' href='/pricing'>
                  Tarifs
                </Link>{' '}
                (à partir de 9,90&nbsp;€/mois).
              </p>
            </div>
          )}
        </Card>
      </div>
    </GlassCard>
    </InteriorPageShell>
  );
}

function Card({
  title,
  footer,
  children,
}: PropsWithChildren<{
  title: string;
  footer?: ReactNode;
}>) {
  return (
    <div className='m-auto w-full max-w-3xl overflow-hidden rounded-2xl border-[color:var(--ex-border-subtle)] bg-[color:var(--ex-panel)]/60 shadow-lg shadow-black/20'>
      <div className='p-4 md:p-6'>
        <h2 className='mb-1 text-xl font-semibold text-white'>{title}</h2>
        <div className='py-4 text-slate-200'>{children}</div>
      </div>
      <div className='flex justify-end border-t border-[color:var(--ex-border-subtle)] bg-black/20 p-4'>
        {footer}
      </div>
    </div>
  );
}
