'use client';

import { useState, useTransition } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Lock, Mail, RotateCcw } from 'lucide-react';

import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import type { Price } from '@/features/pricing/types';
import { cn } from '@/utils/cn';

type CreateCheckoutFn = (args: { price: Price }) => Promise<void>;

export type PricingPageContentProps = {
  freePlanHref: string;
  isLoggedIn: boolean;
  monthlyPrice: Price | null;
  yearlyPrice: Price | null;
  createCheckoutAction: CreateCheckoutFn;
};

const FAQ_ITEMS = [
  {
    q: 'Qu’est-ce qui est vraiment gratuit ?',
    a: "L’accès Découverte est permanent et sans carte bancaire. Vous accédez aux 15 fiches de synthèse, au guide de révision et à 10 questions de quiz par jour, sans limite de temps.",
  },
  {
    q: 'Puis-je annuler mon abonnement Premium ?',
    a: "Oui, à tout moment depuis votre espace membre, en un clic. Aucun frais de résiliation. Votre accès reste actif jusqu’à la fin de la période en cours.",
  },
  {
    q: 'Comment sont sécurisés mes paiements ?',
    a: "Les paiements sont traités par Stripe, référence mondiale de la sécurité en ligne. ExamenOPJ ne stocke aucune donnée bancaire.",
  },
] as const;

function formatEuroFromCents(unitAmount: number | null | undefined): string {
  if (unitAmount == null) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(unitAmount / 100);
}

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const id = `pricing-faq-${item.q.replace(/\s+/g, '-').slice(0, 24)}`;
  return (
    <div className='border-b border-white/[0.08]'>
      <button
        type='button'
        className='flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/40'
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        onClick={onToggle}
      >
        {item.q}
        <span className={cn('text-examen-accent transition', open && 'rotate-180')} aria-hidden>
          ▾
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role='region'
            aria-labelledby={`${id}-button`}
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className='overflow-hidden'
          >
            <p className='pb-4 text-sm leading-relaxed text-examen-inkMuted'>{item.a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FeatureLi({ children }: { children: React.ReactNode }) {
  return (
    <li className='flex gap-2 text-sm text-examen-ink'>
      <Check className='mt-0.5 h-4 w-4 shrink-0 text-examen-success' aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export function PricingPageContent({
  freePlanHref,
  isLoggedIn,
  monthlyPrice,
  yearlyPrice,
  createCheckoutAction,
}: PricingPageContentProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canCheckoutYearly = yearlyPrice != null;
  const selectedPrice: Price | null =
    billing === 'monthly' ? monthlyPrice : canCheckoutYearly ? yearlyPrice : null;

  function handlePremiumClick() {
    setCheckoutError(null);
    if (!selectedPrice) {
      setCheckoutError(
        canCheckoutYearly || billing === 'monthly'
          ? 'Ce tarif n’est pas encore disponible en ligne. Réessayez plus tard ou contactez le support.'
          : 'L’abonnement annuel arrive très bientôt. Écrivez-nous depuis la page Contact.',
      );
      return;
    }
    startTransition(async () => {
      try {
        await createCheckoutAction({ price: selectedPrice });
      } catch (err) {
        if (isRedirectError(err)) throw err;
        setCheckoutError('Impossible d’ouvrir le paiement. Réessayez ou vérifiez votre connexion.');
      }
    });
  }

  const premiumCtaLabel = isLoggedIn ? 'Passer Premium →' : 'Passer Premium — créer un compte';

  return (
    <div className='relative min-h-screen pb-20 pt-10 md:pt-14'>
      <div className='mx-auto max-w-5xl px-4'>
        <header className='mb-10 text-center'>
          <h1 className='font-display text-3xl font-black tracking-tight text-white md:text-4xl' style={{ letterSpacing: '-0.02em' }}>
            Choisissez votre accès
          </h1>
          <p className='mx-auto mt-3 max-w-xl text-base text-examen-inkMuted md:text-lg'>
            Commencez gratuitement. Passez Premium quand vous êtes prêt.
          </p>

          <div className='mx-auto mt-8 flex max-w-md justify-center'>
            <div
              className='relative inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] p-1'
              role='group'
              aria-label='Période de facturation'
            >
              <button
                type='button'
                onClick={() => setBilling('monthly')}
                className={cn(
                  'relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                  billing === 'monthly' ? 'text-white' : 'text-examen-inkMuted hover:text-examen-ink',
                )}
              >
                Mensuel
              </button>
              <button
                type='button'
                onClick={() => setBilling('annual')}
                className={cn(
                  'relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                  billing === 'annual' ? 'text-white' : 'text-examen-inkMuted hover:text-examen-ink',
                )}
              >
                Annuel
              </button>
              <motion.span
                layout
                className='absolute inset-y-1 left-1 rounded-full bg-examen-accent/25 ring-1 ring-examen-accent/40'
                initial={false}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                style={{
                  width: 'calc(50% - 4px)',
                  left: billing === 'monthly' ? 4 : 'calc(50% + 0px)',
                }}
              />
              <span className='pointer-events-none absolute -right-1 -top-7 rounded-md border border-examen-success/30 bg-examen-success/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-examen-success md:-top-8 md:text-xs'>
                −2 mois offerts
              </span>
            </div>
          </div>

          <AnimatePresence mode='wait'>
            <motion.p
              key={billing}
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className='mt-6 text-sm text-examen-inkMuted'
            >
              {billing === 'monthly'
                ? 'Facturation flexible, résiliation à tout moment.'
                : 'Engagement 12 mois — économisez par rapport au mensuel.'}
            </motion.p>
          </AnimatePresence>
        </header>

        <div className='grid gap-6 md:grid-cols-3 md:items-stretch'>
          {/* Découverte */}
          <article className='flex flex-col rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-6 shadow-ex-card md:order-1'>
            <h2 className='text-lg font-bold text-white'>Découverte</h2>
            <p className='mt-1 text-sm text-examen-inkMuted'>Gratuit</p>
            <div className='mt-6 flex items-baseline gap-1'>
              <span className='text-4xl font-black tabular-nums text-white'>0 €</span>
              <span className='text-sm text-examen-inkMuted'>/toujours</span>
            </div>
            <ul className='mt-6 flex flex-1 flex-col gap-2.5'>
              <FeatureLi>Fiches de synthèse F01 – F15</FeatureLi>
              <FeatureLi>Quiz — 10 questions / jour</FeatureLi>
              <FeatureLi>Flashcards de base (20 cartes)</FeatureLi>
              <FeatureLi>Guide de révision complet</FeatureLi>
              <FeatureLi>Compte à rebours examen</FeatureLi>
            </ul>
            <Link
              href={freePlanHref}
              className='mt-8 block w-full rounded-lg border border-white/[0.12] py-3 text-center text-sm font-semibold text-examen-ink transition hover:bg-white/[0.05] focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/40'
            >
              Commencer gratuitement
            </Link>
          </article>

          {/* Candidat Premium */}
          <article
            className={cn(
              'relative z-10 flex flex-col overflow-hidden rounded-[12px] border border-examen-accent/50 bg-gradient-to-b from-examen-accent/10 to-transparent p-6 shadow-ex-premium-glow md:-mt-2 md:scale-[1.02] md:order-2',
            )}
          >
            <span className='absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-examen-premium/40 bg-examen-premium/25 px-3 py-1 text-xs font-semibold text-violet-100'>
              ✨ Recommandé
            </span>
            <h2 className='mt-2 text-lg font-bold text-white'>Candidat</h2>
            <p className='mt-1 text-sm text-examen-inkMuted'>Premium</p>
            <AnimatePresence mode='wait'>
              <motion.div
                key={billing}
                initial={MOTION_INITIAL_FOR_SEO}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='mt-6'
              >
                {billing === 'monthly' ? (
                  <div className='flex items-baseline gap-2'>
                    <span className='text-4xl font-black tabular-nums text-white'>
                      {monthlyPrice ? formatEuroFromCents(monthlyPrice.unit_amount) : '9,90 €'}
                    </span>
                    <span className='text-sm text-examen-inkMuted'>/mois</span>
                  </div>
                ) : (
                  <div>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-4xl font-black tabular-nums text-white'>6,58 €</span>
                      <span className='text-sm text-examen-inkMuted'>/mois (facturation annuelle)</span>
                    </div>
                    <p className='mt-1 text-sm text-examen-inkMuted'>
                      soit{' '}
                      <span className='tabular-nums'>
                        {yearlyPrice ? formatEuroFromCents(yearlyPrice.unit_amount) : '79 €'} / an
                      </span>{' '}
                      {yearlyPrice ? null : <span className='text-examen-inkMuted/80'>(prix public indicatif)</span>}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <p className='mt-2 text-xs font-semibold uppercase tracking-wide text-examen-inkMuted'>Tout Découverte, plus :</p>
            <ul className='mt-3 flex flex-1 flex-col gap-2.5'>
              <FeatureLi>Quiz illimités (400+ questions)</FeatureLi>
              <FeatureLi>Flashcards complètes (55+ infractions)</FeatureLi>
              <FeatureLi>10 enquêtes thématiques complètes</FeatureLi>
              <FeatureLi>Articulation épreuve 2 — cartouche par cartouche</FeatureLi>
              <FeatureLi>Parcours candidat guidé</FeatureLi>
              <FeatureLi>Tableau récapitulatif infractions</FeatureLi>
              <FeatureLi>Mises à jour législatives incluses</FeatureLi>
              <FeatureLi>Accès prioritaire aux nouvelles fonctions</FeatureLi>
            </ul>
            {checkoutError ? (
              <p className='mt-4 text-center text-sm text-examen-danger' role='alert'>
                {checkoutError}
              </p>
            ) : null}
            <button
              type='button'
              disabled={isPending}
              onClick={handlePremiumClick}
              className={cn(
                'group relative mt-8 w-full overflow-hidden rounded-lg bg-examen-accent py-3 text-center text-sm font-semibold text-white transition',
                'hover:bg-examen-accentHover hover:shadow-ex-card-hover focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50',
                'disabled:opacity-60',
              )}
            >
              <span
                className='pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]'
                aria-hidden
              />
              <span className='relative'>{isPending ? 'Redirection…' : premiumCtaLabel}</span>
            </button>
            {!canCheckoutYearly && billing === 'annual' ? (
              <p className='mt-2 text-center text-xs text-examen-inkMuted'>
                Abonnement annuel : si le paiement en ligne n’est pas proposé,{' '}
                <Link href='/contact' className='text-examen-accent underline-offset-2 hover:underline'>
                  contactez-nous
                </Link>
                .
              </p>
            ) : null}
          </article>

          {/* Formation */}
          <article className='flex flex-col rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-6 shadow-ex-card md:order-3'>
            <h2 className='text-lg font-bold text-white'>Formation</h2>
            <p className='mt-1 text-sm text-examen-inkMuted'>Groupes &amp; organismes</p>
            <div className='mt-6'>
              <span className='text-2xl font-black text-white'>Sur devis</span>
            </div>
            <ul className='mt-6 flex flex-1 flex-col gap-2.5'>
              <FeatureLi>Tout l’accès Candidat</FeatureLi>
              <FeatureLi>Licences multi-utilisateurs</FeatureLi>
              <FeatureLi>Suivi de progression des stagiaires</FeatureLi>
              <FeatureLi>Personnalisation du parcours</FeatureLi>
              <FeatureLi>Support dédié</FeatureLi>
            </ul>
            <Link
              href='/contact'
              className='mt-8 block w-full rounded-lg border border-examen-premium/35 py-3 text-center text-sm font-semibold text-violet-200 transition hover:bg-examen-premium/10 focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-premium/40'
            >
              Nous contacter
            </Link>
          </article>
        </div>

        <section className='mt-16 grid gap-6 border-t border-white/[0.06] pt-12 md:grid-cols-3' aria-label='Garanties'>
          <div className='flex gap-3'>
            <Lock className='mt-0.5 h-5 w-5 shrink-0 text-examen-accent' aria-hidden />
            <div>
              <p className='font-semibold text-white'>Paiement sécurisé</p>
              <p className='mt-1 text-sm text-examen-inkMuted'>Stripe, données chiffrées.</p>
            </div>
          </div>
          <div className='flex gap-3'>
            <RotateCcw className='mt-0.5 h-5 w-5 shrink-0 text-examen-accent' aria-hidden />
            <div>
              <p className='font-semibold text-white'>Annulation à tout moment</p>
              <p className='mt-1 text-sm text-examen-inkMuted'>Sans engagement, en 1 clic.</p>
            </div>
          </div>
          <div className='flex gap-3'>
            <Mail className='mt-0.5 h-5 w-5 shrink-0 text-examen-accent' aria-hidden />
            <div>
              <p className='font-semibold text-white'>Support réactif</p>
              <p className='mt-1 text-sm text-examen-inkMuted'>Réponse sous 24h.</p>
            </div>
          </div>
        </section>

        <section className='mx-auto mt-14 max-w-2xl' aria-labelledby='pricing-faq-title'>
          <h2 id='pricing-faq-title' className='text-center font-display text-xl font-bold text-white'>
            Questions fréquentes
          </h2>
          <div className='mt-6'>
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.q}
                item={item}
                open={faqOpen === i}
                onToggle={() => setFaqOpen((v) => (v === i ? null : i))}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PricingPageContent;
