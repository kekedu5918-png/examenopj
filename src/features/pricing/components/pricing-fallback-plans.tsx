import Link from 'next/link';
import { Check } from 'lucide-react';

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
            'flex w-full flex-1 flex-col rounded-xl border p-6 lg:p-8',
            plan.highlight
              ? 'border-gold-500/40 bg-gradient-to-b from-gold-500/10 to-transparent'
              : 'border-white/10 bg-white/[0.03]'
          )}
        >
          {plan.highlight ? (
            <span className='mb-2 inline-block w-fit rounded-full border border-gold-500/40 bg-gold-500/15 px-2 py-0.5 text-xs font-semibold text-gold-300'>
              Recommandé
            </span>
          ) : null}
          <h3 className='font-display text-xl font-bold text-white'>{plan.name}</h3>
          <p className='mt-1 text-sm text-gray-400'>{plan.description}</p>
          <p className='mt-4 flex items-baseline gap-1'>
            <span className='text-3xl font-bold text-white'>{plan.price}</span>
            <span className='text-gray-500'>{plan.period}</span>
          </p>
          <ul className='mt-6 flex flex-1 flex-col gap-2.5'>
            {plan.features.map((f) => (
              <li key={f} className='flex gap-2 text-sm text-gray-300'>
                <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500/90' />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={plan.href}
            className={cn(
              'mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors',
              plan.highlight
                ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
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
