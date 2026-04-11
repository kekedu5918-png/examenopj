import type { Metadata } from 'next';
import Link from 'next/link';

import { EnqueteHub } from '@/components/enquetes/EnqueteHub';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { MethodoRappel } from '@/components/methodo/MethodoRappel';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ENQUETES } from '@/data/enquetes-data';

export const metadata: Metadata = {
  title: 'Enquêtes (entraînement) — Examen OPJ',
  description:
    'Parcours par enquêtes : planches Alpha / Bravo (PDF) et fiches thématiques alignées sur la frise de formation. Articulation, PV, rapport — préparation épreuve 2.',
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
          badge='CONCOURS'
          badgeClassName='bg-violet-500/20 text-violet-200'
          title='Enquêtes — cœur du parcours'
          subtitle='Chaque fiche relie le scénario à l’épreuve 2 (articulation, PV, rapport). Filtrez par cadre procédural ; Alpha reste l’exemple complet gratuit.'
          size='display'
          titleGradient
          titleAs='h1'
          className='mb-6'
        />

        <GlassCard className='mb-10 space-y-4 p-6' padding=''>
          <p className='font-sans text-sm font-bold text-white'>Pourquoi c’est le socle « n°1 »</p>
          <p className='text-sm text-gray-400'>
            Les enquêtes fictives condensent ce que le présentiel fait sur plusieurs journées : <strong className='text-gray-200'>sujet</strong>,{' '}
            <strong className='text-gray-200'>enchaînement procédural</strong> et <strong className='text-gray-200'>restitution écrite</strong>. Vous
            répétez ici le même geste que sous contrainte de temps — avant de le refaire sur une copie blanche.
          </p>
          <div className='grid gap-4 md:grid-cols-2'>
            <MethodoRappel title='Épreuve 2' variant='accent'>
              <p>
                Une cartouche = <strong>qui</strong> agit, <strong>quand</strong>, <strong>sous quel titre</strong>, pour{' '}
                <strong>quoi</strong> (faits télégraphiques).
              </p>
              <p>
                Méthode détaillée :{' '}
                <Link href='/epreuves/epreuve-2' className='font-semibold text-emerald-200 underline'>
                  page épreuve 2
                </Link>
                .
              </p>
            </MethodoRappel>
            <MethodoRappel title='Qualification (épreuve 1)' id='methodo-ep1'>
              <p>
                Gardez la <strong>PRQC</strong> et citez les éléments <strong>mot pour mot</strong> depuis votre référentiel — pas depuis votre
                cahier de brouillon.
              </p>
              <p>
                <Link href='/entrainement/recapitulatif' className='font-semibold text-gray-200 underline'>
                  Tableau récap
                </Link>{' '}
                pour l’entraînement flash.
              </p>
            </MethodoRappel>
          </div>
          <div className='flex flex-wrap gap-3 pt-2 text-sm'>
            <Link href='/epreuves' className='text-violet-300 underline-offset-4 hover:underline'>
              Vue d’ensemble des 3 épreuves
            </Link>
            <span className='text-gray-600'>·</span>
            <Link href='/entrainement/articulation' className='text-violet-300 underline-offset-4 hover:underline'>
              Articulation interactive
            </Link>
          </div>
        </GlassCard>

        <EnqueteHub enquetes={ENQUETES} />
    </InteriorPageShell>
  );
}
