'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import type { CreateCheckoutResult } from '@/features/pricing/actions/create-checkout-action';
import type { Price } from '@/features/pricing/types';
import { AnalyticsEvents, track } from '@/lib/analytics/events';
import { cn } from '@/utils/cn';

type CreateCheckoutFn = (args: { price: Price }) => Promise<CreateCheckoutResult>;

function formatEurFromUnitAmount(unitAmount: number | null | undefined): string | null {
  if (unitAmount == null) return null;
  try {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unitAmount / 100);
  } catch {
    return null;
  }
}

export type PricingThreeColumnPageProps = {
  isLoggedIn: boolean;
  monthlyPrice: Price | null;
  examPrice: Price | null;
  createCheckoutAction: CreateCheckoutFn;
};

const EXAM_DATE = new Date('2026-06-11T12:00:00+02:00');

function RowOk({ children }: { children: React.ReactNode }) {
  return (
    <li className='flex gap-2 text-sm text-examen-ink'>
      <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400' aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function RowNo({ children }: { children: React.ReactNode }) {
  return (
    <li className='flex gap-2 text-sm text-examen-inkMuted'>
      <X className='mt-0.5 h-4 w-4 shrink-0 text-white/25' aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function ExamCountdown() {
  const [label, setLabel] = useState<string>('—');

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const end = EXAM_DATE.getTime();
      const diff = Math.max(0, end - now);
      const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
      setLabel(`⏰ J-${days} avant l’examen du 11 juin 2026`);
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className='text-center text-sm font-medium text-examen-inkMuted'>{label}</p>
  );
}

export function PricingThreeColumnPage({
  isLoggedIn,
  monthlyPrice,
  examPrice,
  createCheckoutAction,
}: PricingThreeColumnPageProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'session'>('session');
  const groupId = useId();

  const monthlyLabel = formatEurFromUnitAmount(monthlyPrice?.unit_amount) ?? '9,90 €';
  const examLabel = formatEurFromUnitAmount(examPrice?.unit_amount) ?? '49 €';

  async function checkout(price: Price | null) {
    setError(null);
    if (!price) {
      setError('Paiement : configuration Stripe en cours. Réessayez plus tard ou contactez-nous.');
      return;
    }
    if (!isLoggedIn) {
      window.location.href = '/inscription';
      return;
    }
    setPending(true);
    try {
      const result = await createCheckoutAction({ price });
      if (!result.ok) {
        window.location.href = result.redirectTo;
        return;
      }
      // Évite React #310 : PostHog/track peut mettre à jour le contexte pendant une transition ;
      // on reporte tracking + navigation au prochain tour (hors cycle de rendu React).
      const url = result.url;
      const payload = {
        price_id: price.id,
        billing: price.type === 'recurring' ? ('monthly' as const) : ('one_time' as const),
      };
      window.setTimeout(() => {
        track(AnalyticsEvents.checkoutStart, payload);
        window.location.href = url;
      }, 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Paiement indisponible.');
      setPending(false);
    }
  }

  return (
    <InteriorPageShell maxWidth='5xl' glow={SHELL_GLOW.pricing} pad='default' innerClassName='py-14 md:py-20'>
      <header className='relative mb-12 text-center'>
        <SectionTitle
          badge='TARIFS'
          badgeClassName='text-violet-200'
          title='Choisissez votre accès'
          titleAs='h1'
          titleGradient
          size='display'
          subtitle='Gratuit pour démarrer. Premium pour tout débloquer jusqu&apos;au jour J.'
          className='mx-auto max-w-2xl items-center text-center'
        />
        <div className='mx-auto mt-8 max-w-xl'>
          <ExamCountdown />
        </div>
      </header>

      {error ? (
        <p className='mb-8 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100' role='alert'>
          {error}
        </p>
      ) : null}

      <div
        className='mx-auto mb-10 flex flex-wrap items-center justify-center gap-1 rounded-3xl border border-white/[0.1] bg-white/[0.04] p-1.5 shadow-inner shadow-black/20 sm:inline-flex'
        role='group'
        aria-labelledby={`${groupId}-label`}
      >
        <span id={`${groupId}-label`} className='sr-only'>
          Mode de facturation Premium
        </span>
        <button
          type='button'
          onClick={() => setBilling('monthly')}
          className={cn(
            'rounded-2xl px-5 py-2.5 text-sm font-semibold transition',
            billing === 'monthly'
              ? 'bg-examen-accent text-white shadow-lg shadow-examen-accent/30'
              : 'text-examen-inkMuted hover:text-white',
          )}
        >
          Mensuel · {monthlyLabel}/mois
        </button>
        <button
          type='button'
          onClick={() => setBilling('session')}
          className={cn(
            'rounded-2xl px-5 py-2.5 text-sm font-semibold transition',
            billing === 'session'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-navy-950 shadow-lg shadow-amber-500/25'
              : 'text-examen-inkMuted hover:text-white',
          )}
        >
          Pass session · {examLabel} jusqu’au 11 juin 2026
        </button>
      </div>

      <div className='relative grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10'>
        <section className='flex flex-col rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-xl shadow-black/25 ring-1 ring-white/[0.04] md:p-8'>
          <p className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Plan gratuit</p>
          <p className='mt-2 font-display text-3xl font-bold text-white'>
            GRATUIT · <span className='text-white'>0 €</span>
          </p>
          <p className='mt-1 text-sm text-examen-inkMuted'>Pour découvrir</p>
          <ul className='mt-6 flex-1 space-y-2.5'>
            <RowOk>6 fiches fondamentaux complètes</RowOk>
            <RowOk>5 quiz par jour</RowOk>
            <RowOk>Référentiel infractions (consultation)</RowOk>
            <RowOk>Parcours en 7 leçons</RowOk>
            <RowNo>Enquêtes complètes</RowNo>
            <RowNo>Fiches premium (101 fiches)</RowNo>
            <RowNo>Quiz illimité</RowNo>
            <RowNo>Flashcards filtrées</RowNo>
            <RowNo>Modèles de PV</RowNo>
            <RowNo>Articulation interactive</RowNo>
          </ul>
          <Link
            href='/inscription'
            className='mt-8 flex w-full items-center justify-center rounded-2xl border border-white/[0.14] bg-white/[0.03] py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.08]'
          >
            Créer mon compte gratuit
          </Link>
        </section>

        <section
          className={cn(
            'relative flex flex-col overflow-hidden rounded-3xl border-2 border-examen-accent/55 bg-gradient-to-b from-examen-accent/18 via-white/[0.04] to-transparent p-6 shadow-2xl shadow-examen-accent/20 ring-1 ring-examen-accent/25 md:p-8',
            'lg:scale-[1.02] lg:z-10',
          )}
        >
          <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' aria-hidden />
          <div className='mb-3 flex flex-wrap gap-2'>
            <span className='rounded-full bg-examen-accent/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
              Recommandé
            </span>
            <span className='rounded-full bg-amber-500/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-100'>
              🔥 Économisez 30 € avec le pass session
            </span>
          </div>
          <p className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Plan Premium</p>
          {billing === 'monthly' ? (
            <p className='mt-2 font-display text-3xl font-bold text-white md:text-4xl'>
              PREMIUM · {monthlyLabel}
              <span className='text-lg font-medium text-examen-inkMuted'> / mois</span>
            </p>
          ) : (
            <p className='mt-2 font-display text-3xl font-bold text-white md:text-4xl'>
              PREMIUM · {examLabel}{' '}
              <span className='text-base font-normal text-examen-inkMuted'>jusqu’au 11 juin 2026</span>
            </p>
          )}
          <ul className='mt-6 flex-1 space-y-2.5'>
            <RowOk>TOUT le contenu gratuit</RowOk>
            <RowOk>107 fiches fondamentaux complètes</RowOk>
            <RowOk>10 enquêtes complètes (Alpha → Accident)</RowOk>
            <RowOk>Quiz illimité + stats de progression</RowOk>
            <RowOk>Flashcards avec répétition espacée</RowOk>
            <RowOk>Modèles de PV alignés sur le programme officiel</RowOk>
            <RowOk>Articulation interactive</RowOk>
            <RowOk>Sujets blancs corrigés</RowOk>
            <RowOk>Rapport de synthèse type examen</RowOk>
            <RowOk>Mises à jour en temps réel</RowOk>
          </ul>
          <button
            type='button'
            disabled={pending}
            onClick={() => checkout(billing === 'monthly' ? monthlyPrice : examPrice)}
            className={cn(
              'mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg shadow-examen-accent/35 transition',
              'bg-gradient-to-r from-examen-accent to-blue-600 hover:from-examen-accentHover hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            {pending ? 'Redirection…' : 'Passer Premium'}
            {!pending ? <ArrowRight className='h-4 w-4' aria-hidden /> : null}
          </button>
          <p className='mt-3 text-center text-xs text-examen-inkMuted'>
            {billing === 'monthly' ? 'Sans engagement · Résiliable à tout moment' : 'Paiement unique · Accès jusqu’au 11 juin 2026'}
          </p>
        </section>
      </div>

      <div className='relative mx-auto mt-14 max-w-3xl rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-6 text-center text-sm text-examen-inkMuted shadow-lg shadow-black/20 ring-1 ring-white/[0.04]'>
        <p className='font-medium text-examen-ink'>Satisfait ou remboursé 14 jours · Sans engagement sur le mensuel</p>
        <p className='mt-2 text-xs'>
          Site indépendant · Non affilié à l’administration
        </p>
      </div>
    </InteriorPageShell>
  );
}
