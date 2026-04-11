import type { Metadata } from 'next';
import Link from 'next/link';

import { CoursHubRefonte } from '@/components/cours/CoursHubRefonte';
import { CoursHubLogiqueCandidat } from '@/components/cours/CoursHubLogiqueCandidat';
import { CoursMethodeRevision } from '@/components/cours/CoursMethodeRevision';
import { CoursRevisionPath } from '@/components/cours/CoursRevisionPath';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getInfractionsCatalog } from '@/data/recapitulatif-data';
import { openGraphForPage } from '@/utils/seo-metadata';

const coursTitle = 'Cours — Examen OPJ';
const coursDescription =
  'Hub cours : rubrique infractions (Épreuve 1), fiches modules, enquêtes, PV, méthode de révision et fil en 7 leçons.';

export const metadata: Metadata = {
  title: coursTitle,
  description: coursDescription,
  alternates: { canonical: '/cours' },
  ...openGraphForPage('/cours', coursTitle, coursDescription),
};

export default function CoursHubPage() {
  const infractionCount = getInfractionsCatalog().length;

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <CoursHubRefonte infractionCount={infractionCount} />

      <CoursMethodeRevision />

      <CoursHubLogiqueCandidat />

      <section className='mt-10' aria-labelledby='cours-poursuivre'>
        <h2 id='cours-poursuivre' className='sr-only'>
          Poursuivre
        </h2>
        <div className='flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:flex-row md:flex-wrap md:items-center md:justify-between'>
          <p className='max-w-xl text-sm text-gray-400'>
            Ensuite : un parcours en <strong className='font-medium text-gray-200'>7 leçons</strong> déjà enchaînées sur
            le site, ou le <strong className='font-medium text-gray-200'>parcours candidat</strong> si vous maîtrisez
            déjà le programme.
          </p>
          <div className='flex flex-wrap gap-2'>
            <Link
              href='#revision-fil'
              className='inline-flex rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25'
            >
              Fil en 7 leçons
            </Link>
            <Link
              href='/parcours-candidat'
              className='inline-flex rounded-xl border border-gold-500/35 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-gold-100 transition hover:bg-gold-500/20'
            >
              Parcours candidat
            </Link>
            <Link
              href='/entrainement'
              className='inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/5'
            >
              Entraînement
            </Link>
          </div>
        </div>
      </section>

      <div className='mt-14'>
        <CoursRevisionPath />
      </div>
    </InteriorPageShell>
  );
}
