'use client';

import { useMemo } from 'react';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';

import { CAT_ORDER } from './fondamentaux-theme';

interface Props {
  fiches: Fiche[];
  categories: Record<Categorie, { label: string; couleur: string }>;
  viewedCount: number;
}

export function FondamentauxHero({ fiches, categories, viewedCount }: Props) {
  const counts = useMemo(() => {
    const m: Record<Categorie, number> = {
      procedure: 0,
      'droit-penal': 0,
      acteurs: 0,
      juridictions: 0,
    };
    for (const f of fiches) {
      m[f.categorie] += 1;
    }
    return m;
  }, [fiches]);

  const total = fiches.length;
  const pct = total > 0 ? Math.min(100, Math.round((viewedCount / total) * 100)) : 0;

  const miniLine = CAT_ORDER.map((key) => {
    const cfg = categories[key];
    const n = counts[key];
    const short =
      key === 'procedure'
        ? 'Procédure'
        : key === 'droit-penal'
          ? 'Droit pénal'
          : key === 'acteurs'
            ? 'Acteurs'
            : 'Juridictions';
    return `${n} fiche${n > 1 ? 's' : ''} ${short}`;
  }).join(' · ');

  return (
    <section className='relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-900 via-navy-950 to-slate-950 px-4 py-10 sm:px-8'>
      <div
        className='pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute right-1/4 top-1/2 h-32 w-32 rotate-12 rounded-2xl border border-white/5 bg-white/[0.02]'
        aria-hidden
      />

      <div className='relative mx-auto max-w-5xl'>
        <h1 className='font-display text-3xl font-bold tracking-tight text-white sm:text-4xl'>Les Fondamentaux</h1>
        <p className='mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base'>
          Les {total} notions clés à maîtriser pour l&apos;examen OPJ — synthèse proposée par ExamenOPJ
        </p>
        <p className='mt-4 text-xs text-slate-500 sm:text-sm'>{miniLine}</p>

        <div className='mt-8'>
          <div className='mb-2 flex items-center justify-between text-xs text-slate-500'>
            <span>Progression de reprise</span>
            <span className='tabular-nums text-slate-400'>
              {viewedCount}/{total} fiches ouvertes ({pct}%)
            </span>
          </div>
          <div
            className='h-2 overflow-hidden rounded-full bg-white/10'
            role='progressbar'
            aria-valuenow={viewedCount}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label='Fiches consultées au moins une fois'
          >
            <div
              className='h-full rounded-full bg-gradient-to-r from-gold-500 to-amber-400 transition-[width] duration-500 ease-out'
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
