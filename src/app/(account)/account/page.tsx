import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { AccountLearningShortcuts } from '@/components/account/AccountLearningShortcuts';
import { AccountSectionCard } from '@/components/account/AccountSectionCard';
import { EngagementPreferencesCard } from '@/components/account/EngagementPreferencesCard';
import { AccountCheckoutSuccessAnalytics } from '@/components/analytics/CheckoutReturnAnalytics';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { Button } from '@/components/ui/button';
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
      <section className='rounded-2xl border border-ds-border bg-ds-bg-secondary/90 px-4 py-10 ring-1 ring-ds-border/80 dark:bg-black/35 dark:ring-white/10 sm:px-6 sm:py-12'>
        <h1 className='text-center font-sans text-2xl font-bold tracking-tight text-ds-text-primary sm:text-3xl'>
          Mon compte
        </h1>
        <p className='mx-auto mb-10 max-w-lg text-center text-sm leading-relaxed text-ds-text-muted'>
          Pilotage de votre préparation : accès pédagogique, communications et facturation — tout au même endroit.
        </p>

        <div className='flex flex-col gap-5'>
          <AccountSectionCard
            title='Préparation OPJ'
            description='Les raccourcis les plus utiles pour progresser sans friction.'
          >
            <AccountLearningShortcuts />
          </AccountSectionCard>

          <AccountSectionCard
            id='preferences-email'
            title='Rappels et communications'
            description='Vous gardez le contrôle : activation explicite, conformité RGPD.'
          >
            <EngagementPreferencesCard />
          </AccountSectionCard>

          <AccountSectionCard
            title='Votre formule'
            description='Abonnement et facturation sécurisés via Stripe.'
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
              <div className='space-y-3 text-sm text-ds-text-muted dark:text-zinc-300'>
                <p>Vous n&apos;avez pas d&apos;abonnement actif (ou la synchronisation Stripe n&apos;est pas encore à jour).</p>
                <p className='text-ds-text-muted/90 dark:text-zinc-400'>
                  Les tarifs et le paiement passent par Stripe ; après souscription, le statut apparaît ici une fois les
                  webhooks reçus. Vérifiez la page{' '}
                  <Link className='font-medium text-cyan-600 underline underline-offset-2 hover:text-cyan-500 dark:text-cyan-400' href='/pricing'>
                    Tarifs
                  </Link>{' '}
                  (à partir de 9,90&nbsp;€/mois).
                </p>
              </div>
            )}
          </AccountSectionCard>
        </div>
      </section>
    </InteriorPageShell>
  );
}
