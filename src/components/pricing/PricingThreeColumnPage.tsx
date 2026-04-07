'use client';

import { useState, useTransition } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';
import Link from 'next/link';
import { Check } from 'lucide-react';

import type { Price } from '@/features/pricing/types';
import { cn } from '@/utils/cn';

type CreateCheckoutFn = (args: { price: Price }) => Promise<void>;

export type PricingThreeColumnPageProps = {
  isLoggedIn: boolean;
  monthlyPrice: Price | null;
  examPrice: Price | null;
  createCheckoutAction: CreateCheckoutFn;
};

function Row({ children }: { children: React.ReactNode }) {
  return (
    <li className='flex gap-2 text-sm text-examen-ink'>
      <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400' aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export function PricingThreeColumnPage({
  isLoggedIn,
  monthlyPrice,
  examPrice,
  createCheckoutAction,
}: PricingThreeColumnPageProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function checkout(price: Price | null) {
    setError(null);
    if (!price) {
      setError('Paiement : configuration Stripe en cours. Réessayez plus tard ou contactez-nous.');
      return;
    }
    if (!isLoggedIn) {
      window.location.href = '/signup';
      return;
    }
    startTransition(async () => {
      try {
        await createCheckoutAction({ price });
      } catch (e) {
        if (isRedirectError(e)) throw e;
        setError(e instanceof Error ? e.message : 'Paiement indisponible.');
      }
    });
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-14 md:py-20'>
      <header className='mb-12 text-center'>
        <h1 className='font-display text-3xl font-bold tracking-tight text-white md:text-4xl'>
          Un accès simple. Un prix honnête.
        </h1>
        <p className='mx-auto mt-4 max-w-2xl text-lg text-examen-inkMuted'>
          Tout le contenu de la formation OPJ, mis à jour en temps réel.
        </p>
      </header>

      {error ? (
        <p className='mb-8 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100' role='alert'>
          {error}
        </p>
      ) : null}

      <div className='grid gap-6 lg:grid-cols-3'>
        <section className='flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8'>
          <h2 className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Essentiel · Gratuit</h2>
          <p className='mt-4 font-display text-4xl font-bold text-white'>
            0 €
          </p>
          <ul className='mt-6 flex-1 space-y-2.5'>
            <Row>6 fiches de cours accessibles</Row>
            <Row>5 questions de quiz par jour</Row>
            <Row>Parcours candidat en 7 étapes</Row>
            <Row>Compte à rebours examen</Row>
            <Row>Accès au guide de révision</Row>
          </ul>
          <Link
            href='/signup'
            className='mt-8 flex w-full items-center justify-center rounded-xl border border-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
          >
            Commencer gratuitement
          </Link>
          <p className='mt-3 text-center text-xs text-examen-inkMuted'>Sans carte bancaire</p>
        </section>

        <section className='relative flex flex-col rounded-2xl border-2 border-examen-accent/40 bg-gradient-to-b from-examen-accent/15 to-transparent p-6 md:p-8'>
          <span className='absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
            Flexible
          </span>
          <h2 className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Premium</h2>
          <p className='mt-4 font-display text-4xl font-bold text-white'>
            9,90 €<span className='text-lg font-medium text-examen-inkMuted'> / mois</span>
          </p>
          <ul className='mt-6 flex-1 space-y-2.5'>
            <Row>107 fiches structurées complètes</Row>
            <Row>Quiz illimités (normal + Hardcore)</Row>
            <Row>Les 10 enquêtes complètes avec exercices</Row>
            <Row>Modèles de PV conformes aux fascicules (par thème)</Row>
            <Row>Exercices d’articulation de procédure</Row>
            <Row>Rapports de synthèse types</Row>
            <Row>Fondamentaux complets (cadres, GAV, nullités…)</Row>
            <Row>Épreuves blanches</Row>
            <Row>Mises à jour en temps réel — formation en cours</Row>
          </ul>
          <button
            type='button'
            disabled={pending}
            onClick={() => checkout(monthlyPrice)}
            className={cn(
              'mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold text-white transition',
              'bg-examen-accent hover:bg-examen-accentHover disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            {pending ? 'Redirection…' : 'Passer Premium'}
          </button>
          <p className='mt-3 text-center text-xs text-examen-inkMuted'>Résiliable à tout moment</p>
        </section>

        <section className='relative flex flex-col overflow-hidden rounded-2xl border-2 border-amber-500/45 bg-gradient-to-br from-amber-500/15 via-examen-premium/10 to-transparent p-6 shadow-lg shadow-amber-500/10 md:p-8'>
          <span className='absolute right-4 top-4 rounded-full bg-amber-500/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-100'>
            Meilleur choix
          </span>
          <h2 className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Jusqu’à l’examen</h2>
          <p className='mt-4 font-display text-4xl font-bold text-white'>49 €</p>
          <p className='text-sm text-examen-inkMuted'>paiement unique · accès complet jusqu’au 11 juin 2026</p>
          <ul className='mt-6 flex-1 space-y-2.5'>
            <Row>Tout le contenu Premium</Row>
            <Row>Aucune interruption jusqu’au jour J</Row>
            <Row>Toutes les mises à jour incluses</Row>
            <Row>Toutes les épreuves blanches futures</Row>
            <Row>Accès jusqu’au 11 juin 2026 inclus</Row>
          </ul>
          <button
            type='button'
            disabled={pending}
            onClick={() => checkout(examPrice)}
            className={cn(
              'mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold text-examen-canvas transition',
              'bg-amber-400 text-navy-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            {pending ? 'Redirection…' : 'Accès jusqu’à l’examen'}
          </button>
          <p className='mt-3 text-center text-xs text-examen-inkMuted'>Paiement unique · Pas d’abonnement</p>
        </section>
      </div>

      <div className='mx-auto mt-14 max-w-3xl space-y-4 text-center text-sm text-examen-inkMuted'>
        <p>Satisfait ou remboursé sous 14 jours — aucune question posée.</p>
        <p>
          Site indépendant · Rédigé par un gardien de la paix en formation · Paris 2026 · Non affilié à
          l’administration
        </p>
      </div>
    </div>
  );
}
