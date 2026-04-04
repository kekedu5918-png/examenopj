import type { Metadata } from 'next';
import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Entraînement — Examen OPJ',
  description:
    'Hub Quiz, flashcards, tableau récapitulatif et examen blanc : choisissez votre mode de révision pour le concours OPJ.',
};

const cards = [
  {
    href: '/entrainement/quiz',
    icon: '🎯',
    title: 'Quiz',
    desc: 'Testez vos connaissances avec des QCM par fascicule, domaine ou en mode global.',
    badge: '400+ questions',
    disabled: false,
  },
  {
    href: '/entrainement/flashcards',
    icon: '🃏',
    title: 'Flashcards',
    desc: 'Révisez les éléments constitutifs en retournant les cartes — filtre par fascicule et catégorie.',
    badge: '55+ infractions',
    disabled: false,
  },
  {
    href: '/entrainement/recapitulatif',
    icon: '📊',
    title: 'Tableau récapitulatif',
    desc: 'Vue synthétique des éléments légal, matériel et moral de chaque infraction.',
    badge: null,
    disabled: false,
  },
  {
    href: '#',
    icon: '⏱️',
    title: 'Examen blanc',
    desc: 'Simulez l’examen en conditions contraintes — 3 h chronométrées.',
    badge: 'Bientôt disponible',
    disabled: true,
  },
] as const;

export default function EntrainementHubPage() {
  return (
    <div className='container pb-20 pt-10 md:pt-14'>
      <SectionTitle
        badge='RÉVISION'
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title='Entraînement'
        subtitle='Choisissez votre mode de révision'
        className='mb-10'
      />

      <div className='grid gap-6 md:grid-cols-2'>
        {cards.map((c) => {
          const inner = (
            <GlassCard
              padding='p-6'
              className={`h-full transition ${c.disabled ? 'opacity-55' : 'hover:border-cyan-500/25'}`}
            >
              <div className='flex items-start justify-between gap-3'>
                <span className='text-3xl' aria-hidden>
                  {c.icon}
                </span>
                {c.badge ? (
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      c.disabled ? 'bg-white/10 text-gray-500' : 'bg-amber-500/20 text-amber-200'
                    }`}
                  >
                    {c.badge}
                  </span>
                ) : null}
              </div>
              <h2 className='mt-4 font-display text-xl font-bold text-white'>{c.title}</h2>
              <p className='mt-2 text-sm leading-relaxed text-gray-400'>{c.desc}</p>
              {!c.disabled ? (
                <p className='mt-4 text-sm font-medium text-cyan-400'>Ouvrir →</p>
              ) : (
                <p className='mt-4 text-sm text-gray-600'>Indisponible pour le moment</p>
              )}
            </GlassCard>
          );

          if (c.disabled) {
            return (
              <div key={c.title} className='cursor-not-allowed'>
                {inner}
              </div>
            );
          }

          return (
            <Link key={c.href} href={c.href} className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50'>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
