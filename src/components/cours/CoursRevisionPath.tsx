'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { COURS_REVISION_FIL } from '@/data/cours-revision-fil';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
};

/**
 * Fil vertical de révision par « leçons » (ordre pédagogique, pas par numéro de fascicule).
 */
export function CoursRevisionPath({ className }: Props) {
  return (
    <section
      id='revision-fil'
      className={cn(
        'scroll-mt-24 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-950 p-6 shadow-lg shadow-cyan-950/20 md:p-8',
        className,
      )}
      aria-labelledby='cours-fil-revision-title'
    >
      <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400/90'>Parcours candidat</p>
          <h2 id='cours-fil-revision-title' className='font-display text-xl font-bold text-white md:text-2xl'>
            Fil de révision — 7 leçons
          </h2>
          <p className='mt-2 max-w-2xl text-sm leading-relaxed text-slate-400'>
            Chaque étape indique quoi lancer sur le site (fondamentaux, récap F01/F02, quiz, PV). C’est votre colonne vertébrale
            après les blocs « méthode » et « priorités P0 » au-dessus ; le sommaire officiel F01–F15 reste sur la page{' '}
            <Link href='/programme' className='text-cyan-300 underline-offset-2 hover:underline'>
              Programme
            </Link>
            .
          </p>
        </div>
      </div>

      <ol className='mt-8 space-y-0'>
        {COURS_REVISION_FIL.map((etape, idx) => {
          const isLast = idx === COURS_REVISION_FIL.length - 1;
          return (
            <li key={etape.id} className='relative flex gap-4 md:gap-6'>
              <div className='flex flex-col items-center'>
                <div
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 text-sm font-bold',
                    'border-cyan-500/45 bg-cyan-500/15 text-cyan-100',
                  )}
                  aria-hidden
                >
                  {etape.ordre}
                </div>
                {!isLast ? (
                  <span className='mt-1 min-h-[24px] w-px flex-1 bg-gradient-to-b from-cyan-500/35 to-transparent' />
                ) : null}
              </div>
              <div className={cn('min-w-0 flex-1 pb-10', isLast && 'pb-0')}>
                <div className='rounded-xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-500/25 hover:bg-white/[0.06]'>
                  <div className='flex flex-wrap items-start justify-between gap-2'>
                    <h3 className='font-display text-base font-semibold text-white md:text-lg'>{etape.titre}</h3>
                    <span className='shrink-0 rounded-full border border-slate-500/40 bg-slate-800/50 px-2.5 py-0.5 text-[11px] text-slate-300'>
                      {etape.dureeIndicative}
                    </span>
                  </div>
                  <p className='mt-2 text-sm leading-relaxed text-slate-400'>{etape.accroche}</p>
                  <ul className='mt-3 list-inside list-disc space-y-1 text-xs text-slate-500'>
                    {etape.objectifs.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {etape.liens.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className='inline-flex items-center rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/30'
                      >
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className='mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6 text-xs text-slate-500'>
        <CheckCircle2 className='h-4 w-4 text-emerald-500/70' aria-hidden />
        Pour cocher les étapes au fil des semaines :{' '}
        <Link href='/parcours-candidat' className='font-medium text-cyan-400 hover:underline'>
          parcours candidat
        </Link>{' '}
        (suivi dans ce navigateur).
      </p>
    </section>
  );
}
