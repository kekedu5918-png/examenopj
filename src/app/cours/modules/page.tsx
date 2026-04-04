import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { DOMAIN_LABELS, fasciculesList } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: 'Modules de cours — Programme OPJ',
  description:
    'Les thèmes du programme de préparation OPJ sous forme de fiches synthétiques : repères pédagogiques sans reproduction de supports officiels tiers.',
};

const DOMAIN_STYLES: Record<Domain, string> = {
  DPS: 'border-red-500/25 bg-red-500/5',
  DPG: 'border-violet-500/25 bg-violet-500/5',
  PROCEDURE: 'border-blue-500/25 bg-blue-500/5',
};

export default function CoursModulesPage() {
  const byDomain = (d: Domain) => fasciculesList.filter((m) => DOMAIN_LABELS[d] === m.domaineLabel);

  return (
    <div className='container pb-20 pt-10 md:pt-14'>
      <nav className='mb-6 text-sm text-gray-500'>
        <Link href='/cours' className='text-cyan-400 hover:underline'>
          Cours
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-gray-400'>Modules</span>
      </nav>

      <SectionTitle
        badge='COURS'
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title='Modules thématiques'
        subtitle='Titres de référence du programme de préparation. Chaque fiche est une synthèse rédactionnelle à compléter : croisez avec le Code pénal, le CPP et votre formation institutionnelle.'
        className='mb-8'
      />

      <div className='mb-12 flex flex-wrap gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4'>
        <span className='w-full text-xs font-semibold uppercase tracking-wide text-gray-500 sm:w-auto sm:self-center'>
          Raccourcis
        </span>
        <Link
          href='/entrainement/quiz'
          className='rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20'
        >
          Quiz
        </Link>
        <Link
          href='/entrainement/flashcards'
          className='rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20'
        >
          Flashcards
        </Link>
        <Link
          href='/entrainement/articulation'
          className='rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20'
        >
          Articulation (épr. 2)
        </Link>
        <Link
          href='/guide-revision-opj'
          className='rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10'
        >
          Guide de révision
        </Link>
      </div>

      {(['DPS', 'DPG', 'PROCEDURE'] as const).map((domain) => (
        <section key={domain} className='mb-14'>
          <h2 className='mb-6 font-display text-xl font-bold text-white'>{DOMAIN_LABELS[domain]}</h2>
          <ul className='grid gap-4 sm:grid-cols-2'>
            {byDomain(domain).map((m) => (
              <li key={m.id}>
                <Link
                  href={`/cours/modules/${m.id}`}
                  className={cn(
                    'block rounded-xl border p-5 transition hover:border-cyan-500/30 hover:bg-white/[0.03]',
                    DOMAIN_STYLES[domain],
                  )}
                >
                  <p className='text-xs font-semibold text-gray-500'>
                    F{String(m.numero).padStart(2, '0')}
                  </p>
                  <p className='mt-1 font-display text-lg font-semibold text-white'>{m.titre}</p>
                  <p className='mt-2 text-sm leading-relaxed text-gray-400'>{m.accroche}</p>
                  <p className='mt-3 text-sm font-medium text-cyan-400'>Ouvrir la fiche →</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
