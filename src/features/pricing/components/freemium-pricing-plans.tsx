'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

function Li({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className='flex gap-2 text-sm text-gray-300'>
      {ok ? (
        <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400' aria-hidden />
      ) : (
        <X className='mt-0.5 h-4 w-4 shrink-0 text-rose-400/80' aria-hidden />
      )}
      <span>{children}</span>
    </li>
  );
}

export function FreemiumPricingPlans() {
  const [billing, setBilling] = useState<'monthly' | 'exam'>('monthly');

  const premiumHref =
    billing === 'monthly' ? '/signup?plan=premium&billing=monthly' : '/signup?plan=premium&billing=exam';

  return (
    <div className='relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-8 lg:pt-[100px]'>
      <h1 className='bg-gradient-to-br from-white to-neutral-200 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl'>
        Préparez-vous sans limite
      </h1>
      <p className='mx-auto mt-3 max-w-2xl text-center text-base text-gray-400 md:text-lg'>
        7 jours d&apos;accès complet offerts à l&apos;inscription. Ensuite : freemium ou Premium.
      </p>

      <div className='mx-auto mt-8 flex max-w-md justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1 text-sm'>
        <button
          type='button'
          onClick={() => setBilling('monthly')}
          className={`rounded-lg px-4 py-2 font-medium transition ${
            billing === 'monthly' ? 'bg-amber-500/25 text-amber-100' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          9,90€ / mois
        </button>
        <button
          type='button'
          onClick={() => setBilling('exam')}
          className={`rounded-lg px-4 py-2 font-medium transition ${
            billing === 'exam' ? 'bg-amber-500/25 text-amber-100' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          29,90€ jusqu&apos;à l&apos;examen
        </button>
      </div>

      <div className='mt-10 grid gap-8 md:grid-cols-2 md:items-stretch'>
        <div className='rounded-2xl border border-white/10 bg-navy-900/40 p-8'>
          <h2 className='text-xl font-bold text-white'>Plan gratuit</h2>
          <p className='mt-1 text-sm text-gray-500'>Après la semaine d&apos;essai (freemium)</p>
          <p className='mt-6 text-3xl font-bold text-white'>0€</p>
          <ul className='mt-6 space-y-3'>
            <Li ok>Accès en lecture aux fascicules</Li>
            <Li ok>5 quiz par jour (questions aléatoires)</Li>
            <Li ok>5 flashcards par jour</Li>
            <Li ok>Tableau récapitulatif en accès libre</Li>
            <Li ok={false}>
              Fondamentaux — <span className='text-amber-200/80'>Premium</span>
            </Li>
            <Li ok={false}>
              Méthodologie des 3 épreuves — <span className='text-amber-200/80'>Premium</span>
            </Li>
            <Li ok={false}>Quiz / flashcards illimités</Li>
            <Li ok={false}>Examen blanc chronométré</Li>
            <Li ok={false}>Suivi de progression</Li>
          </ul>
          <Link
            href='/signup'
            className='mt-8 block w-full rounded-xl border border-white/15 py-3 text-center text-sm font-semibold text-gray-200 transition hover:bg-white/5'
          >
            Continuer gratuitement
          </Link>
        </div>

        <div className='relative rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-navy-900/60 p-8 shadow-lg shadow-amber-900/20'>
          <span className='absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-navy-950'>
            Recommandé
          </span>
          <h2 className='text-xl font-bold text-white'>Premium</h2>
          <p className='mt-1 text-sm text-gray-400'>Sans publicité ni plafond</p>
          <div className='mt-6'>
            {billing === 'monthly' ? (
              <>
                <p className='text-3xl font-bold text-white'>9,90€</p>
                <p className='text-sm text-gray-400'>par mois, résiliable à tout moment</p>
              </>
            ) : (
              <>
                <p className='text-3xl font-bold text-white'>29,90€</p>
                <p className='text-sm text-gray-400'>paiement unique — accès jusqu&apos;au 30/06/2026</p>
                <p className='mt-2 text-xs text-amber-200/80'>Soit moins de 0,50€/jour jusqu&apos;à l&apos;examen</p>
              </>
            )}
          </div>
          <ul className='mt-6 space-y-3'>
            <Li ok>Tout le contenu gratuit débloqué sans limite</Li>
            <Li ok>Quiz illimités (tous fascicules, tous modes)</Li>
            <Li ok>Flashcards illimitées</Li>
            <Li ok>Fondamentaux complets</Li>
            <Li ok>Méthodologie détaillée des 3 épreuves</Li>
            <Li ok>Tableau récapitulatif complet et mises à jour législatives</Li>
            <Li ok>Examen blanc chronométré (dès disponibilité)</Li>
            <Li ok>Suivi de progression et statistiques</Li>
          </ul>
          <Link
            href={premiumHref}
            className='mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-95'
          >
            Commencer l&apos;essai gratuit de 7 jours
          </Link>
          <p className='mt-3 text-center text-xs text-gray-500'>
            Annulation possible à tout moment. Pas de carte bancaire requise pour l&apos;essai lorsque l&apos;offre Stripe
            le permet.
          </p>
        </div>
      </div>

      <h2 className='mt-16 text-center font-display text-xl font-bold text-white'>Questions fréquentes</h2>
      <dl className='mx-auto mt-8 max-w-3xl space-y-6 text-sm'>
        <div className='rounded-xl border border-white/10 bg-white/[0.03] p-5'>
          <dt className='font-semibold text-amber-200/90'>Que se passe-t-il après les 7 jours ?</dt>
          <dd className='mt-2 text-gray-400'>
            Votre compte passe automatiquement en accès freemium. Vous conservez les fascicules en lecture et le
            récapitulatif. Les quiz sont limités à 5 par jour, les flashcards à 5 par jour. Les fondamentaux et la
            méthodologie des épreuves sont réservés au Premium.
          </dd>
        </div>
        <div className='rounded-xl border border-white/10 bg-white/[0.03] p-5'>
          <dt className='font-semibold text-amber-200/90'>Puis-je annuler ?</dt>
          <dd className='mt-2 text-gray-400'>Oui, à tout moment. Aucun engagement.</dd>
        </div>
        <div className='rounded-xl border border-white/10 bg-white/[0.03] p-5'>
          <dt className='font-semibold text-amber-200/90'>Le contenu est-il à jour ?</dt>
          <dd className='mt-2 text-gray-400'>
            Oui : version SDCP au 01/12/2025, incluant les lois 2025 (narcotrafic, homicide routier, définition du viol).
          </dd>
        </div>
        <div className='rounded-xl border border-white/10 bg-white/[0.03] p-5'>
          <dt className='font-semibold text-amber-200/90'>Quelle est la différence avec l&apos;offre jusqu&apos;à l&apos;examen ?</dt>
          <dd className='mt-2 text-gray-400'>
            Le paiement unique à 29,90€ vous donne un accès complet jusqu&apos;au 30 juin 2026 — souvent plus économique si
            vous vous inscrivez plus de trois mois avant le concours.
          </dd>
        </div>
      </dl>
    </div>
  );
}
