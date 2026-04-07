import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import type { EnqueteMeta } from '@/data/enquetes-types';

type Props = {
  enquetes: EnqueteMeta[];
};

/**
 * Bandeau d’entrée : met en avant l’enquête gratuite et l’ordre pédagogique suggéré.
 */
export function EnquetesParOuCommencer({ enquetes }: Props) {
  const alpha = enquetes.find((e) => e.id === 'alpha');
  const ordre = [...enquetes]
    .filter((e) => typeof e.ordrePedagogique === 'number')
    .sort((a, b) => (a.ordrePedagogique ?? 0) - (b.ordrePedagogique ?? 0));

  return (
    <GlassCard className='mb-10 overflow-hidden p-0' padding=''>
      <div className='border-b border-white/10 bg-gradient-to-r from-emerald-950/80 via-navy-950/50 to-violet-950/40 p-6 md:p-8'>
        <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
          <div className='flex gap-3'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-200'>
              <Compass className='h-5 w-5' aria-hidden />
            </span>
            <div>
              <h2 className='font-display text-xl font-bold text-white md:text-2xl'>Par où commencer ?</h2>
              <p className='mt-2 max-w-2xl text-sm text-gray-400'>
                Commencez par l’enquête <strong className='text-gray-200'>Alpha</strong> : exemple complet gratuit (PDF, articulation, PV,
                rapport). Ensuite, suivez l’ordre ci-dessous — chaque fiche indique ses prérequis sur la carte.
              </p>
            </div>
          </div>
          {alpha ? (
            <Link
              href={`/cours/enquetes/${alpha.id}`}
              className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-500/45 bg-emerald-500/20 px-5 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-500/30'
            >
              Ouvrir Alpha (gratuit)
              <ArrowRight className='h-4 w-4' aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
      <div className='p-6 md:p-8'>
        <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Ordre suggéré (parcours)</p>
        <ol className='mt-4 space-y-3'>
          {ordre.map((e) => (
            <li key={e.id} className='flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm'>
              <span className='inline-flex min-w-[1.75rem] font-mono text-xs font-bold text-violet-300/90'>
                {e.ordrePedagogique ?? '—'}.
              </span>
              <Link
                href={`/cours/enquetes/${e.id}`}
                className='font-semibold text-white underline-offset-4 hover:text-violet-200 hover:underline'
              >
                {e.code} — {e.titre.replace(/^Enquête \w+ — /, '')}
              </Link>
              {e.niveau ? (
                <span className='text-xs text-gray-500'>
                  (
                  {e.niveau === 'debutant'
                    ? 'débutant'
                    : e.niveau === 'intermediaire'
                      ? 'intermédiaire'
                      : 'avancé'}
                  )
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </GlassCard>
  );
}
