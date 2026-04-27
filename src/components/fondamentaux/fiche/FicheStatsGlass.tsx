'use client';

import type { FicheStatEntry } from '@/lib/fondamentaux/fiche-frontmatter-v3';
import { cn } from '@/utils/cn';

export type FicheStatsGlassProps = {
  stats: FicheStatEntry[];
};

export function FicheStatsGlass({ stats }: FicheStatsGlassProps) {
  return (
    <section
      aria-label='Statistiques clés'
      className='mt-8'
      data-testid='fiche-stats'
    >
      <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((s) => (
          <li
            key={`${s.label}-${s.num}`}
            className={cn(
              'rounded-xl border border-ij-glass-border/12 bg-ij-glass-bg/8 p-4 backdrop-blur-md',
              'transition-shadow hover:shadow-ij-card',
            )}
          >
            <p className='font-ij-display text-2xl font-semibold text-ij-accent'>{s.num}</p>
            <p className='mt-1 text-sm text-ij-text-muted'>{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
