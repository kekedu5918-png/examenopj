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
          : 'rounded-lg border border-ij-border/60 bg-ij-surface-2/30 px-3 py-3 text-center',
      )}
    >
      <strong
        className={cn(
          light
            ? 'font-ij-display text-2xl font-semibold tracking-tight text-ij-text'
            : 'text-lg font-bold text-ij-text',
        )}
      >
        {finalValue}
        {suffix}
      </strong>
      <p className={cn(light ? 'mt-1 text-sm text-ij-text-subtle' : 'text-[11px] text-ij-text-muted')}>{label}</p>
    </div>
  );
}
