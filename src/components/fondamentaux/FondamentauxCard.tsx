'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, BookMarked, Table2, Target } from 'lucide-react';

import type { Fiche } from '@/data/fondamentaux-data';
import type { FasciculeDomaineMeta } from '@/data/fondamentaux-types';
import { cn } from '@/utils/cn';

import { COULEURS } from './fondamentaux-theme';
import { FondamentauxFicheIcon } from './FondamentauxFicheIcon';

interface Props {
  fiche: Fiche;
  categorieLabel: string;
  couleurKey: string;
  index: number;
  /** Fiche derrière le gate premium : pas de lien. */
  locked?: boolean;
}

function fasciculeBadgeClass(d: FasciculeDomaineMeta | undefined) {
  if (d === 'Procédure pénale') {
    return 'border-blue-400/35 bg-blue-500/10 text-blue-200';
  }
  if (d === 'DPS') {
    return 'border-rose-400/35 bg-rose-500/10 text-rose-200';
  }
  if (d === 'DPG') {
    return 'border-violet-400/35 bg-violet-500/10 text-violet-200';
  }
  return 'border-white/15 bg-white/[0.06] text-slate-300';
}

function countRepères(fiche: Fiche): { label: string; hint?: string } {
  const r = fiche.regles.length;
  const blocs = fiche.blocsDetail?.length ?? 0;
  const itemsInBlocs =
    fiche.blocsDetail?.reduce((n, b) => n + (b.items?.length ?? 0) + (b.tableau ? 1 : 0), 0) ?? 0;
  if (r > 0) {
    return {
      label: `${r} point${r > 1 ? 's' : ''} clé${r > 1 ? 's' : ''}`,
    };
  }
  if (blocs > 0) {
    return {
      label: `${blocs} séquence${blocs > 1 ? 's' : ''} · ${itemsInBlocs} repère${itemsInBlocs > 1 ? 's' : ''}`,
      hint: 'Fiche approfondie (corpus fascicules)',
    };
  }
  return { label: 'Synthèse' };
}

const cardClass = (c: (typeof COULEURS)['emerald'], locked: boolean | undefined) =>
  cn(
    'group relative block w-full rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left shadow-lg shadow-black/20 transition-all duration-200',
    !locked && 'hover:z-[1] hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30',
    !locked &&
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/50',
    'border-l-4',
    c.borderLeft,
    !locked && c.borderHover,
  );

export function FondamentauxCard({ fiche, categorieLabel, couleurKey, index, locked = false }: Props) {
  const c = COULEURS[couleurKey] ?? COULEURS.emerald;
  const alertCount = fiche.regles.filter((r) => r.alerte).length;
  const repères = countRepères(fiche);

  const inner = (
    <>
      <div className='mb-3 flex items-start justify-between gap-2'>
        <div className='flex min-w-0 flex-wrap items-center gap-1.5'>
          <span className={cn('rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest', c.badge)}>
            {categorieLabel}
          </span>
          {fiche.fasciculeNumero != null ? (
            <span
              className={cn(
                'rounded-md border px-2 py-0.5 text-[10px] font-bold tabular-nums tracking-wide',
                fasciculeBadgeClass(fiche.fasciculeDomaine),
              )}
              title={fiche.fasciculeId ? `Module programme ${fiche.fasciculeId.toUpperCase()}` : undefined}
            >
              F{fiche.fasciculeNumero.toString().padStart(2, '0')}
            </span>
          ) : null}
          {fiche.indispensableExamen ? (
            <span className='inline-flex items-center gap-1 rounded-md border border-gold-500/40 bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-300'>
              <BookMarked className='h-3 w-3 shrink-0 opacity-90' aria-hidden />
              Oral / écrit
            </span>
          ) : null}
        </div>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-lg transition-colors group-hover:border-white/20',
            c.title,
          )}
          aria-hidden
        >
          {fiche.emojiAffiche ? fiche.emojiAffiche : <FondamentauxFicheIcon ficheId={fiche.id} className='h-5 w-5' />}
        </div>
      </div>

      <h3 className='mb-2 font-display text-base font-bold leading-snug text-white group-hover:text-white sm:text-lg'>
        {fiche.titre}
      </h3>
      <p className='line-clamp-2 text-sm leading-relaxed text-slate-400'>{fiche.accroche}</p>

      <div className='mt-4 flex flex-wrap items-center gap-2'>
        <span
          className='rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-400'
          title={repères.hint}
        >
          {repères.label}
        </span>
        {fiche.piegesExamen?.length ? (
          <span className='inline-flex items-center gap-1 rounded-md border border-rose-500/25 bg-rose-950/35 px-2 py-0.5 text-[11px] text-rose-300'>
            <Target className='h-3.5 w-3.5 shrink-0 opacity-90' aria-hidden />
            {fiche.piegesExamen.length} piège{fiche.piegesExamen.length > 1 ? 's' : ''}
          </span>
        ) : null}
        {fiche.tableau ? (
          <span className='inline-flex items-center gap-1 rounded-md border border-slate-600/40 bg-slate-800/40 px-2 py-0.5 text-[11px] text-slate-400'>
            <Table2 className='h-3.5 w-3.5' aria-hidden />
            Tableau
          </span>
        ) : null}
        {alertCount > 0 ? (
          <span className='inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-950/40 px-2 py-0.5 text-[11px] text-amber-400'>
            <AlertTriangle className='h-3.5 w-3.5 shrink-0 opacity-90' aria-hidden />
            {alertCount} point{alertCount > 1 ? 's' : ''} critique{alertCount > 1 ? 's' : ''}
          </span>
        ) : null}
      </div>
      {!locked ? (
        <span className='mt-4 inline-flex text-xs font-medium text-emerald-400/90 group-hover:text-emerald-300'>
          Lire la fiche complète →
        </span>
      ) : null}
    </>
  );

  return (
    <motion.div
      id={`fiche-${fiche.id}`}
      layout={false}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {locked ? (
        <div className={cardClass(c, true)}>{inner}</div>
      ) : (
        <Link href={`/fondamentaux/${fiche.id}`} className={cardClass(c, false)}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}
