'use client';

import { motion, useReducedMotion } from 'framer-motion';

import type { FicheStatEntry } from '@/lib/fondamentaux/fiche-frontmatter-v3';
import { cn } from '@/utils/cn';

import { hoverLiftVariants, shouldDisableFicheMotion } from './fiche-motion';

export type FicheStatsGlassProps = {
  stats: FicheStatEntry[];
};

export function FicheStatsGlass({ stats }: FicheStatsGlassProps) {
  const reducedMotion = useReducedMotion();
  const reduced = shouldDisableFicheMotion(Boolean(reducedMotion));

  return (
    <section
      aria-label='Statistiques clés'
      className='mt-8'
      data-testid='fiche-stats'
    >
      <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((s) => (
          <motion.li
            key={`${s.label}-${s.num}`}
            className={cn(
              'rounded-xl border border-ij-glass-border/12 bg-ij-surface-2/95 p-4',
              'motion-safe:transition-shadow motion-safe:hover:shadow-ij-card',
            )}
            variants={hoverLiftVariants}
            initial='rest'
            whileHover={reduced ? undefined : 'hover'}
            data-reduced-motion={reduced ? 'true' : 'false'}
          >
            <p className='font-ij-display text-2xl font-semibold text-ij-accent'>{s.num}</p>
            <p className='mt-1 text-sm text-ij-text-muted'>{s.label}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
