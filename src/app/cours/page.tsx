import type { Metadata } from 'next';
import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Cours — Examen OPJ',
  description:
    'Parcours pédagogique : modules de cours synthétiques, fondamentaux, guide de révision et modèles de procès-verbaux pour le concours OPJ.',
};

const links = [
  {
    href: '/cours/modules',
    title: 'Modules de cours (F01–F15)',
    desc: 'Titres de référence du programme et fiches rédactionnelles à compléter — sans reproduction de supports tiers.',
  },
  { href: '/fondamentaux', title: 'Fondamentaux', desc: 'Notions clés : GAV, contrôle d’identité, juridictions, OPJ/APJ…' },
  { href: '/guide-revision-opj', title: 'Guide de révision', desc: 'Méthode globale et planning de travail jusqu’à l’examen.' },
  { href: '/cours/pv', title: 'Modèles de procès-verbaux', desc: 'Cartouches, mentions légales et exemples de PV rédigés.' },
  {
    href: '/cours/enquetes',
    title: 'Enquêtes (entraînement)',
    desc: 'Planches d’entraînement type concours : sujet, articulation, PV, rapport.',
  },
] as const;

export default function CoursHubPage() {
  return (
    <div className='container pb-20 pt-10'>
      <SectionTitle
        badge='PARCOURS'
        badgeClassName='bg-violet-500/20 text-violet-200'
        title='Cours'
        subtitle='Fiches synthétiques, fondamentaux, guide et outils de rédaction'
        className='mb-10'
      />

      <ul className='grid gap-6 md:grid-cols-2'>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50'>
              <GlassCard hover padding='p-6' className='h-full transition hover:border-violet-500/20'>
                <h2 className='font-display text-lg font-bold text-white'>{l.title}</h2>
                <p className='mt-2 text-sm text-gray-400'>{l.desc}</p>
                <p className='mt-4 text-sm font-medium text-violet-300'>Ouvrir →</p>
              </GlassCard>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
