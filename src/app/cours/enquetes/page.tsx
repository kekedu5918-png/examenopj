import type { Metadata } from 'next';
import Link from 'next/link';

import { EnquetesHubTabs } from '@/components/enquetes/EnquetesHubTabs';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { ENQUETES } from '@/data/enquetes-data';

export const metadata: Metadata = {
  title: 'Enquêtes (entraînement) — Examen OPJ',
  description:
    'Hub enquêtes : parcours Alpha → Bravo → Charlie, catalogue filtrable, mémos Épreuve 1 & 2. Planches, articulation, PV et rapport.',
};

export default function EnquetesHubPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <nav className='mb-6 text-sm text-gray-500'>
        <Link href='/cours' className='text-violet-400 hover:text-violet-300'>
          Cours
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-gray-400'>Enquêtes</span>
      </nav>
      <SectionTitle
        badge='ÉPREUVE 2'
        badgeClassName='bg-fuchsia-500/20 text-fuchsia-200'
        title='Enquêtes — mises en situation'
        subtitle='Parcours formation (Alpha → Bravo → Charlie), catalogue complet avec filtres, et mémos pour ne rien oublier le jour J.'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-6'
      />

      <GlassCard className='mb-10 space-y-3 p-6' padding=''>
        <p className='font-sans text-sm font-bold text-white'>Pourquoi c’est le socle n°1</p>
        <p className='text-sm leading-relaxed text-gray-400'>
          Les enquêtes fictives condensent le présentiel : <strong className='text-gray-200'>sujet</strong>,{' '}
          <strong className='text-gray-200'>enchaînement procédural</strong> et{' '}
          <strong className='text-gray-200'>restitution écrite</strong>. Tu répètes ici le même geste que sous limite de
          temps — avant la copie blanche.
        </p>
        <div className='flex flex-wrap gap-3 pt-1 text-sm'>
          <Link href='/epreuves' className='text-violet-300 underline-offset-4 hover:underline'>
            Vue d’ensemble des 3 épreuves
          </Link>
          <span className='text-gray-600'>·</span>
          <Link href='/entrainement/articulation' className='text-violet-300 underline-offset-4 hover:underline'>
            Articulation interactive
          </Link>
        </div>
      </GlassCard>

      <EnquetesHubTabs enquetes={ENQUETES} />
    </InteriorPageShell>
  );
}
