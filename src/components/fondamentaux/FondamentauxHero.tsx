'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, GraduationCap, Layers } from 'lucide-react';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';

import { CAT_ORDER } from './fondamentaux-theme';

interface Props {
  fiches: Fiche[];
  categories: Record<Categorie, { label: string; couleur: string }>;
  viewedCount: number;
}

export function FondamentauxHero({ fiches, viewedCount }: Props) {
  const counts = useMemo(() => {
    const m: Record<Categorie, number> = {
      procedure: 0,
      'droit-penal': 0,
      acteurs: 0,
      juridictions: 0,
      special: 0,
    };
    for (const f of fiches) {
      m[f.categorie] += 1;
    }
    return m;
  }, [fiches]);

  const total = fiches.length;
  const indispensableCount = useMemo(() => fiches.filter((f) => f.indispensableExamen).length, [fiches]);
  const pct = total > 0 ? Math.min(100, Math.round((viewedCount / total) * 100)) : 0;

  return (
    <section className='relative overflow-hidden border-b border-white/[0.06] px-4 pb-10 pt-10 sm:px-8'>
      {/* Background */}
      <div
        className='pointer-events-none absolute left-0 top-0 h-64 w-full opacity-[0.12]'
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% -10%, #10b981, transparent)' }}
        aria-hidden
      />
      <div
        className='pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full opacity-15 blur-3xl'
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
        aria-hidden
      />

      <div className='relative mx-auto max-w-5xl'>
        {/* Badge */}
        <motion.div
          className='mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400'
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GraduationCap className='h-3.5 w-3.5' />
          Programme F01 – F15 officiel
        </motion.div>

        <motion.h1
          className='font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Les Fondamentaux
        </motion.h1>
        <motion.p
          className='mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Les <strong className='font-semibold text-slate-200'>{total} fiches</strong> raccord avec le programme en 15 fascicules (F01–F15) : synthèses courtes, fiches longues alignées corpus, pièges d&apos;examen et modules de cours.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className='mt-6 flex flex-wrap gap-3'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className='flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-sm'>
            <Layers className='h-4 w-4 text-emerald-400' />
            <span className='font-bold tabular-nums text-white'>{total}</span>
            <span className='text-slate-500'>fiches</span>
          </div>
          <div className='flex items-center gap-2 rounded-xl border border-gold-500/20 bg-gold-500/[0.06] px-3 py-2 text-sm'>
            <BookMarked className='h-4 w-4 text-gold-400' />
            <span className='font-bold tabular-nums text-gold-300'>{indispensableCount}</span>
            <span className='text-slate-500'>indispensables oral/écrit</span>
          </div>
          <div className='flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-3 py-2 text-sm'>
            <span className='font-bold tabular-nums text-blue-300'>{viewedCount}</span>
            <span className='text-slate-500'>fiches consultées</span>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          className='mt-6 max-w-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className='mb-2 flex items-center justify-between text-xs text-slate-500'>
            <span>Progression de reprise</span>
            <span className='tabular-nums text-slate-400'>{pct}%</span>
          </div>
          <div
            className='h-2 overflow-hidden rounded-full bg-white/[0.07]'
            role='progressbar'
            aria-valuenow={viewedCount}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label='Fiches consultées au moins une fois'
          >
            <motion.div
              className='h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400'
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
