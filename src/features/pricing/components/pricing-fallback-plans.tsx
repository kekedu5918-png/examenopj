import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

import { cn } from '@/utils/cn';

const PLANS_FALLBACK = [
  {
    name: 'Gratuit',
    price: '0 €',
    period: '',
    description: 'Pour commencer et évaluer la plateforme',
    features: [
      'Accès à toutes les fiches des 15 thèmes du programme',
      'Référentiel infractions F01 et F02',
      'Quiz : 10 questions par session',
      'Flashcards : accès limité',
      'Méthode des 3 épreuves',
    ],
    cta: 'Commencer gratuitement',
    href: '/inscription',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '19 €',
    period: '/ mois',
    description: 'Pour une préparation complète et sans limites',
    features: [
      'Tout le plan Gratuit',
      'Quiz illimité — par thème, domaine, global',
      'Toutes les flashcards (150+ infractions)',
      'Récapitulatif complet F01–F15',
      'Infractions F03 à F15 dans le référentiel',
      'Accès aux fondamentaux avancés',
      'Mises à jour législatives prioritaires',
    ],
    cta: "S'abonner",
    href: '/inscription?plan=premium',
    highlight: true,
  },
] as const;

export function PricingFallbackPlans() {
  return (
    <div className='flex w-full flex-col items-stretch justify-center gap-6 lg:flex-row lg:gap-8'>
      {PLANS_FALLBACK.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            'flex w-full flex-1 flex-col rounded-3xl border p-6 shadow-xl shadow-black/20 ring-1 ring-white/[0.04] lg:p-8',
            plan.highlight
              ? 'border-amber-500/45 bg-gradient-to-b from-amber-500/15 via-white/[0.04] to-transparent ring-amber-500/20'
              : 'border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-white/[0.02]'
          )}
        >
          {plan.highlight ? (
            <span className='mb-2 inline-block w-fit rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-200'>
              Recommandé
            </span>
          ) : null}
          <h3 className='font-sans text-xl font-extrabold text-white'>{plan.name}</h3>
          <p className='mt-1 text-sm text-gray-400'>{plan.description}</p>
          <p className='mt-4 flex items-baseline gap-1'>
            <span className='text-3xl font-bold text-white'>{plan.price}</span>
            <span className='text-gray-500'>{plan.period}</span>
          </p>
          <ul className='mt-6 flex flex-1 flex-col gap-2.5'>
            {plan.features.map((f) => (
              <li key={f} className='flex gap-2 text-sm text-gray-300'>
                <IoCheckmark className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500/90' />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={plan.href}
            className={cn(
              'mt-8 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-center text-sm font-bold transition-colors',
              plan.highlight
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-navy-950 shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400'
                : 'border border-white/15 bg-white/10 text-white hover:bg-white/15'
            )}
          >
            {plan.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
