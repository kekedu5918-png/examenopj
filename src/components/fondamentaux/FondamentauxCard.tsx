'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Table2 } from 'lucide-react';

import type { Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

import { COULEURS } from './fondamentaux-theme';
import { FondamentauxFicheIcon } from './FondamentauxFicheIcon';

interface Props {
  fiche: Fiche;
  categorieLabel: string;
  couleurKey: string;
  index: number;
  onOpen?: (target: HTMLElement) => void;
  /** Fiche derrière le gate premium : pas d’interaction clavier sur le bouton. */
  locked?: boolean;
}

const cardClass = (c: (typeof COULEURS)['emerald'], locked: boolean | undefined) =>
  cn(
    'group relative w-full rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left shadow-lg shadow-black/20 transition-all duration-200',
    !locked && 'hover:z-[1] hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30',
    !locked && 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/50',
    'border-l-4',
    c.borderLeft,
    !locked && c.borderHover
  );

export const FondamentauxCard = forwardRef<HTMLButtonElement, Props>(function FondamentauxCard(
  { fiche, categorieLabel, couleurKey, index, onOpen, locked = false },
  ref
) {
  const c = COULEURS[couleurKey] ?? COULEURS.emerald;
  const alertCount = fiche.regles.filter((r) => r.alerte).length;
  const rulesCount = fiche.regles.length;

  const inner = (
    <>
      <div className='mb-3 flex items-start justify-between gap-2'>
        <span className={cn('rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest', c.badge)}>
          {categorieLabel}
        </span>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-colors group-hover:border-white/20',
            c.title
          )}
          aria-hidden
        >
          <FondamentauxFicheIcon ficheId={fiche.id} className='h-5 w-5' />
        </div>
      </div>

      <h3 className='mb-2 font-display text-base font-bold leading-snug text-white group-hover:text-white sm:text-lg'>{fiche.titre}</h3>
      <p className='line-clamp-2 text-sm leading-relaxed text-slate-400'>{fiche.accroche}</p>

      <div className='mt-4 flex flex-wrap items-center gap-2'>
        <span className='rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-400'>
          {rulesCount} point{rulesCount > 1 ? 's' : ''} clé{rulesCount > 1 ? 's' : ''}
        </span>
        {fiche.tableau ? (
          <span className='inline-flex items-center gap-1 rounded-md border border-slate-600/40 bg-slate-800/40 px-2 py-0.5 text-[11px] text-slate-400'>
            <Table2 className='h-3.5 w-3.5' aria-hidden />
            Tableau
          </span>
        ) : null}
        {alertCount > 0 ? (
          <span className='inline-flex items-center gap-0.5 rounded-md border border-amber-500/30 bg-amber-950/40 px-2 py-0.5 text-[11px] text-amber-400'>
            <span aria-hidden>⚠️</span>
            {alertCount} point{alertCount > 1 ? 's' : ''} critique{alertCount > 1 ? 's' : ''}
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <motion.div
      layout={false}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {locked ? (
        <div className={cardClass(c, true)}>{inner}</div>
      ) : (
        <button
          ref={ref}
          type='button'
          onClick={(e) => onOpen?.(e.currentTarget)}
          className={cardClass(c, false)}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
});
