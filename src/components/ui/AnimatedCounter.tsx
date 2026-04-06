'use client';

import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  icon: ReactNode;
  className?: string;
};

/**
 * Chiffres éditoriaux : rendu identique SSR et client (pas d’animation bloquée à 0).
 */
export function AnimatedCounter({ value, suffix = '', label, icon, className }: AnimatedCounterProps) {
  return (
    <div
      className={cn('flex flex-col items-center text-center', className)}
      aria-label={`${value}${suffix} ${label}`}
    >
      <div className='mb-3 text-examen-accent [&_svg]:h-5 [&_svg]:w-5' aria-hidden>
        {icon}
      </div>
      <p className='text-5xl font-black tabular-nums tracking-tight text-white'>
        {value}
        {suffix ? <span className='inline-block'>{suffix}</span> : null}
      </p>
      <p className='mt-1 text-sm font-medium uppercase tracking-widest text-examen-inkMuted'>{label}</p>
    </div>
  );
}
