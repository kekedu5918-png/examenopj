'use client';

import { useState, useTransition } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

import type { Price } from '@/features/pricing/types';

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

type CreateCheckoutFn = (args: { price: Price }) => Promise<void>;

type FreemiumPricingPlansProps = {
  freePlanHref: string;
  isLoggedIn: boolean;
  monthlyPrice: Price | null;
  examPrice: Price | null;
  createCheckoutAction: CreateCheckoutFn;
};

export function FreemiumPricingPlans({
  freePlanHref,
  isLoggedIn,
  monthlyPrice,
  examPrice,
  createCheckoutAction,
}: FreemiumPricingPlansProps) {
  const [billing, setBilling] = useState<'monthly' | 'exam'>('monthly');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedPrice = billing === 'monthly' ? monthlyPrice : examPrice;

  function handlePremiumClick() {
    setCheckoutError(null);
    if (!selectedPrice) {
      setCheckoutError('Ce tarif n’est pas encore disponible en ligne. Réessayez plus tard ou contactez le support.');
      return;
    }
    startTransition(async () => {
      try {
        await createCheckoutAction({ price: selectedPrice });
      } catch (err) {
        if (isRedirectError(err)) {
          throw err;
        }
        setCheckoutError('Impossible d’ouvrir le paiement. Réessayez ou vérifiez votre connexion.');
      }
    });
  }

  const premiumCtaLabel = isLoggedIn ? 'Payer et activer le Premium' : 'Créer un compte — 7 jours offerts';

  return (
    <div id='tarifs-premium' className='relative z-10 mx-auto max-w-5xl scroll-mt-24 px-4 pb-16 pt-8 lg:pt-[100px]'>
      <h1 className='bg-gradient-to-br from-white to-neutral-200 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl'>
        Préparez-vous sans limite
      </h1>
      <p className='mx-auto mt-3 max-w-2xl text-center text-base text-gray-400 md:text-lg'>
        7 jours d&apos;accès complet offerts à l&apos;inscription (sans carte). Ensuite : freemium ou Premium payant
        ci-dessous.
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
            <Li ok>Accès aux fiches de cours (modules thématiques)</Li>
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
            href={freePlanHref}
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
            <Li ok>Quiz illimités (tous thèmes, tous modes)</Li>
            <Li ok>Flashcards illimitées</Li>
            <Li ok>Fondamentaux complets</Li>
            <Li ok>Méthodologie détaillée des 3 épreuves</Li>
            <Li ok>Tableau récapitulatif complet et mises à jour législatives</Li>
            <Li ok>Examen blanc chronométré (dès disponibilité)</Li>
            <Li ok>Suivi de progression et statistiques</Li>
          </ul>

          {checkoutError ? (
            <p className='mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-center text-xs text-red-200'>
              {checkoutError}
            </p>
          ) : null}

          {isLoggedIn ? (
            <button
              type='button'
              onClick={handlePremiumClick}
              disabled={isPending || !selectedPrice}
              className='mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isPending ? 'Redirection vers Stripe…' : premiumCtaLabel}
            </button>
          ) : (
            <Link
              href='/signup'
              className='mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-95'
            >
              {premiumCtaLabel}
            </Link>
          )}

          <p className='mt-3 text-center text-xs text-gray-500'>
            {isLoggedIn
              ? 'Paiement sécurisé par carte (Stripe). Après paiement, retour sur votre compte.'
              : 'Les 7 jours gratuits sont activés à la création du compte. Le Premium est un abonnement ou un paiement unique selon l’offre choisie.'}
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
            Le site est mis à jour pour refléter les évolutions majeures du droit ; vérifiez toujours les textes sur Légifrance.
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
