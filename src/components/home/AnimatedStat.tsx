'use client';

import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

import { useIntersectionCounter } from '@/hooks/use-intersection-counter';
import { cn } from '@/utils/cn';

type AnimatedStatProps = {
  finalValue: number;
  suffix?: string;
  label: string;
  /** Conservé pour compat API — le compteur est piloté par l’intersection (2B.2.1). */
  animateOnMount?: boolean;
  /** `light` : fond clair (section compteurs homepage). */
  variant?: 'default' | 'light';
};

/**
 * Statistique chiffrée : valeur finale dans le HTML initial ; après hydratation,
 * compteur 0 → valeur sur entrée dans le viewport (sauf `prefers-reduced-motion`).
 */
export function AnimatedStat({
  finalValue,
  suffix = '',
  label,
  variant = 'default',
}: AnimatedStatProps) {
  const light = variant === 'light';
  const reducedMotion = useReducedMotion();
  const animate = reducedMotion !== true;

  const rootRef = useRef<HTMLDivElement>(null);
  const displayed = useIntersectionCounter(rootRef, {
    finalValue,
    animate,
    durationMs: 450,
  });

  const formatted = `${displayed}${suffix}`;
  const minCh = `${String(finalValue).length + suffix.length}ch`;

  return (
    <div
      ref={rootRef}
      className={cn(
        light
          ? 'text-left'
          : 'rounded-lg border border-ij-border/60 bg-ij-surface-2/30 px-3 py-3 text-center',
      )}
    >
      <strong
        className={cn(
          'inline-block tabular-nums',
          light
            ? 'font-ij-display text-2xl font-semibold tracking-tight text-ij-text'
            : 'text-lg font-bold text-ij-text',
        )}
        style={{ minWidth: minCh }}
        suppressHydrationWarning
      >
        {formatted}
      </strong>
      <p className={cn(light ? 'mt-1 text-sm text-ij-text-subtle' : 'text-[11px] text-ij-text-muted')}>{label}</p>
    </div>
  );
}
