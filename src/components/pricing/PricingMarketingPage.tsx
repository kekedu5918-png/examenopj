'use client';

import { useState, useTransition } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Sparkles, X } from 'lucide-react';

import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import type { Price } from '@/features/pricing/types';
import { cn } from '@/utils/cn';

// TODO: Ajuster les montants affichés quand les prix Stripe réels sont figés (Stripe = référence contractuelle).
const DISPLAY_MONTHLY_EUR = 9;
const DISPLAY_YEARLY_EUR = 79;

type CreateCheckoutFn = (args: { price: Price }) => Promise<void>;

export type PricingMarketingPageProps = {
  isLoggedIn: boolean;
  monthlyPrice: Price | null;
  yearlyPrice: Price | null;
  createCheckoutAction: CreateCheckoutFn;
};

const FAQ = [
  {
    q: 'Ai-je accès immédiatement après le paiement ?',
    a: "Oui : votre compte est mis à niveau dès la confirmation Stripe. Les contenus Premium s’ouvrent sans délai sur examenopj.fr.",
  },
  {
    q: 'Puis-je annuler à tout moment ?',
    a: 'Un abonnement récurrent peut être arrêté depuis votre espace ; l’accès reste actif jusqu’à la fin de la période payée. Pour un paiement unique, il n’y a pas de renouvellement automatique.',
  },
  {
    q: 'Y a-t-il un remboursement ?',
    a: "Les conditions sont celles des CGV et du droit de rétractation applicable. En cas de doute, écrivez-nous via la page Contact avant toute décision.",
  },
  {
    q: 'Proposez-vous des tarifs groupe / centre de formation ?',
    a: "Pas en ligne pour l’instant. /* TODO: cocher offre réelle */ Contactez-nous pour une étude selon le nombre de comptes.",
  },
  {
    q: "Que devient mon accès après l'examen ?",
    a: "L’accès reste disponible selon la formule souscrite (abonnement ou période couverte). /* TODO: préciser politique réelle post-session */",
  },
] as const;

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof FAQ)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const id = `tarifs-faq-${item.q.slice(0, 28).replace(/\s+/g, '-')}`;
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

function Row({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className='flex gap-2 text-sm text-examen-ink'>
      {ok ? (
        <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400' aria-hidden />
      ) : (
        <X className='mt-0.5 h-4 w-4 shrink-0 text-rose-400/90' aria-hidden />
      )}
      <span>{children}</span>
    </li>
  );
}

export function PricingMarketingPage({
  isLoggedIn,
  monthlyPrice,
  yearlyPrice,
  createCheckoutAction,
}: PricingMarketingPageProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const selectedPrice: Price | null =
    billing === 'monthly' ? monthlyPrice : billing === 'annual' ? yearlyPrice : null;

  const canPayMonthly = monthlyPrice != null;
  const canPayYearly = yearlyPrice != null;

  function payPremium() {
    setError(null);
    if (!selectedPrice) {
      setError(
        billing === 'annual'
          ? "Paiement annuel : configuration Stripe en cours. Utilisez « S'inscrire » ou revenez plus tard."
          : "Paiement mensuel : configuration Stripe en cours. Utilisez « S'inscrire » ou revenez plus tard.",
      );
      return;
    }
    startTransition(async () => {
      try {
        await createCheckoutAction({ price: selectedPrice });
      } catch (e) {
        if (isRedirectError(e)) throw e;
        setError(e instanceof Error ? e.message : 'Paiement indisponible pour le moment.');
      }
    });
  }

  const displayPrice = billing === 'monthly' ? DISPLAY_MONTHLY_EUR : DISPLAY_YEARLY_EUR;
  const periodLabel = billing === 'monthly' ? '/mois' : '/an';

  return (
    <div className='mx-auto max-w-5xl px-4 py-14 md:py-20'>
      <header className='mb-12 text-center'>
        <p className='text-xs font-semibold uppercase tracking-widest text-examen-inkMuted'>Tarifs</p>
        <h1 className='mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl'>Un plan pour chaque rythme</h1>
        <p className='mx-auto mt-4 max-w-2xl text-examen-inkMuted'>
          Commencez gratuitement, puis passez à l’accès complet quand vous voulez aller plus vite.{' '}
          {/* TODO: synchroniser les montants avec Stripe si différents des prix affichés. */}
        </p>

        <div
          className='mx-auto mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1'
          role='group'
          aria-label='Facturation'
        >
          <button
            type='button'
            onClick={() => setBilling('monthly')}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition',
              billing === 'monthly' ? 'bg-examen-accent text-white' : 'text-examen-inkMuted hover:text-white',
            )}
          >
            Mensuel
          </button>
          <button
            type='button'
            onClick={() => setBilling('annual')}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition',
              billing === 'annual' ? 'bg-examen-accent text-white' : 'text-examen-inkMuted hover:text-white',
            )}
          >
            Annuel
            <span className='ml-2 rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-200'>
              −20 %
            </span>
          </button>
        </div>
      </header>

      {error ? (
        <p className='mb-6 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100' role='alert'>
          {error}
        </p>
      ) : null}

      <div className='grid gap-6 md:grid-cols-2'>
        <section className='rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8'>
          <h2 className='font-display text-xl font-bold text-white'>Gratuit</h2>
          <p className='mt-1 text-sm text-examen-inkMuted'>Pour découvrir la méthode et structurer les premières révisions.</p>
          <p className='mt-6 font-display text-3xl font-bold text-white'>
            0 €<span className='text-base font-medium text-examen-inkMuted'> / toujours</span>
          </p>
          <ul className='mt-6 space-y-3'>
            <Row ok>Guide de révision</Row>
            <Row ok>Modules synthèse (lecture)</Row>
            <Row ok>10 questions de quiz par jour</Row>
            <Row ok={false}>Quiz illimités</Row>
            <Row ok={false}>Flashcards complètes</Row>
            <Row ok={false}>Parcours candidat détaillé & sujets blancs Premium</Row>
          </ul>
          <Link
            href='/signup'
            className='mt-8 flex w-full items-center justify-center rounded-xl border border-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
          >
            S&apos;inscrire
          </Link>
        </section>

        <section className='relative overflow-hidden rounded-2xl border border-examen-accent/35 bg-gradient-to-br from-examen-accent/15 via-examen-premium/10 to-transparent p-6 md:p-8'>
          <div className='absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
            <Sparkles className='h-3 w-3' aria-hidden />
            Accès complet
          </div>
          <h2 className='font-display text-xl font-bold text-white'>Accès complet</h2>
          <p className='mt-1 text-sm text-examen-inkMuted'>
            Tout débloquer pour une préparation intensive jusqu&apos;à l&apos;examen OPJ.
          </p>
          <p className='mt-6 font-display text-3xl font-bold text-white'>
            {displayPrice} €<span className='text-base font-medium text-examen-inkMuted'>{periodLabel}</span>
          </p>
          {billing === 'annual' ? (
            <p className='mt-2 text-xs text-emerald-200/90'>
              Facture annuelle : environ <strong>−20 %</strong> par rapport à 12 mois au tarif mensuel indicatif (
              {DISPLAY_MONTHLY_EUR} € × 12).
            </p>
          ) : null}
          <ul className='mt-6 space-y-3'>
            <Row ok>Tout le plan Gratuit</Row>
            <Row ok>Quiz illimités</Row>
            <Row ok>Flashcards & révisions actives</Row>
            <Row ok>Parcours candidat & outils avancés</Row>
            <Row ok>Épreuves blanches et contenus Premium</Row>
            <Row ok>Mises à jour du programme</Row>
          </ul>

          <div className='mt-8 flex flex-col gap-2'>
            {isLoggedIn ? (
              <>
                <button
                  type='button'
                  disabled={
                    pending || (billing === 'monthly' && !canPayMonthly) || (billing === 'annual' && !canPayYearly)
                  }
                  onClick={payPremium}
                  className={cn(
                    'flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold text-white transition',
                    'bg-examen-accent hover:bg-examen-accentHover disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                >
                  {pending ? 'Redirection…' : 'Payer avec Stripe'}
                </button>
                <p className='text-center text-xs text-examen-inkMuted'>
                  Paiement sécurisé ; les prix catalogue peuvent différer légèrement des montants indicatifs ci-dessus.
                </p>
              </>
            ) : (
              <Link
                href='/signup'
                className='flex w-full items-center justify-center rounded-xl bg-examen-accent py-3 text-sm font-semibold text-white hover:bg-examen-accentHover'
              >
                S&apos;inscrire
              </Link>
            )}
          </div>
        </section>
      </div>

      <section className='mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10'>
        <h2 className='font-display text-xl font-bold text-white'>FAQ</h2>
        <div className='mt-2'>
          {FAQ.map((item, i) => (
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
  );
}
