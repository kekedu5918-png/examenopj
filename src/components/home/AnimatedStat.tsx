'use client';

import { cn } from '@/utils/cn';

type AnimatedStatProps = {
  finalValue: number;
  suffix?: string;
  label: string;
  /** Conservé pour compat API — l’animation compteur a été retirée (SSR / SEO : valeur réelle dans le HTML). */
  animateOnMount?: boolean;
  /** `light` : fond clair (section compteurs homepage). */
  variant?: 'default' | 'light';
};

/**
 * Affiche une statistique chiffrée — valeur toujours présente dans le DOM (crawlers, sans JS).
 * L’animation « compteur » a été retirée pour éviter l’affichage de « 0 » avant hydratation.
 */
export function AnimatedStat({
  finalValue,
  suffix = '',
  label,
  variant = 'default',
}: AnimatedStatProps) {
  const light = variant === 'light';

  return (
    <div
      className={cn(
        light
          ? 'text-left'
          : 'rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center',
      )}
    >
      <strong
        className={cn(
          light
            ? 'font-display text-2xl font-semibold tracking-tight text-orde-slate900'
            : 'text-lg font-bold text-white',
        )}
      >
        {finalValue}
        {suffix}
      </strong>
      <p className={cn(light ? 'mt-1 text-sm text-slate-600' : 'text-[11px] text-examen-inkMuted')}>{label}</p>
    </div>
  );
}
