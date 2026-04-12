'use client';

import { cn } from '@/utils/cn';

export interface PathConnectorProps {
  from: 'left' | 'right';
  to: 'left' | 'right';
  /** Segment coloré en accent si le module d’origine est complété à 100 %. */
  completed: boolean;
  className?: string;
}

/**
 * Lien visuel en S entre deux lignes du parcours (zigzag).
 * Coordonnées en pourcentage du viewBox 0–100 × 0–100.
 */
export function PathConnector({ from, to, completed, className }: PathConnectorProps) {
  const d =
    from === 'left' && to === 'right'
      ? 'M 18 2 C 18 42 82 58 82 98'
      : 'M 82 2 C 82 42 18 58 18 98';

  return (
    <div className={cn('relative h-14 w-full max-w-md px-6', className)} aria-hidden>
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={d}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="7 6"
          className={cn(completed ? 'stroke-[var(--ds-accent)]' : 'stroke-[var(--ds-border)]')}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
