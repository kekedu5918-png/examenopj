import type { Metadata } from 'next';
import Link from 'next/link';

import { EnquetesHubTabs } from '@/components/enquetes/EnquetesHubTabs';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { ENQUETES } from '@/data/enquetes-data';
import { openGraphForPage } from '@/utils/seo-metadata';

const title = 'Les enquêtes — Examen OPJ';
const description =
  'Toutes les enquêtes de la formation : parcours Alpha → Bravo → Charlie, catalogue filtrable, planches et mémos.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/enquetes' },
  ...openGraphForPage('/enquetes', title, description),
};

export default function EnquetesHubPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <nav className='mb-6 text-sm text-gray-500'>
        <Link href='/entrainement' className='text-blue-400 hover:text-blue-300'>
          Entraînement
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-gray-400'>Enquêtes</span>
      </nav>
      <SectionTitle
        badge='FORMATION'
        badgeClassName='bg-blue-500/15 text-blue-200'
        title='Les enquêtes'
        subtitle='Mises en situation alignées sur l’examen : sujet, enchaînement procédural, restitution écrite. Filtrez le catalogue et ouvrez chaque dossier.'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-6'
      />

      <GlassCard className='mb-10 space-y-3 p-6' padding=''>
        <p className='font-sans text-sm font-bold text-white'>Pourquoi cette rubrique</p>
        <p className='text-sm leading-relaxed text-gray-400'>
          Les enquêtes fictives condensent le présentiel : <strong className='text-gray-200'>sujet</strong>,{' '}
          <strong className='text-gray-200'>procédure</strong> et{' '}
          <strong className='text-gray-200'>rédaction</strong> sous contrainte — le même geste que le jour J.
        </p>
        <div className='flex flex-wrap gap-3 pt-1 text-sm'>
          <Link href='/epreuves' className='text-blue-300 underline-offset-4 hover:underline'>
            Détail des 3 épreuves
          </Link>
          <span className='text-gray-600'>·</span>
          <Link href='/entrainement/articulation' className='text-blue-300 underline-offset-4 hover:underline'>
            Articulation interactive
          </Link>
        </div>
      </GlassCard>

      <EnquetesHubTabs enquetes={ENQUETES} />
    </InteriorPageShell>
  );
}
