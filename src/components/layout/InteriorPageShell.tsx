import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

const MAX_WIDTH = {
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;

/** Halos alignés sur le hero / parcours / pricing (cohérence globale). */
const GLOW: Record<
  'blue' | 'violet' | 'cyan' | 'amber' | 'emerald' | 'rose' | 'none',
  string | undefined
> = {
  blue: 'radial-gradient(ellipse 90% 62% at 50% -12%, rgba(59,130,246,0.32), transparent 55%)',
  violet: 'radial-gradient(ellipse 90% 62% at 50% -12%, rgba(124,58,237,0.28), transparent 55%)',
  cyan: 'radial-gradient(ellipse 90% 62% at 50% -12%, rgba(6,182,212,0.26), transparent 55%)',
  amber: 'radial-gradient(ellipse 90% 62% at 50% -12%, rgba(245,158,11,0.22), transparent 55%)',
  emerald: 'radial-gradient(ellipse 90% 62% at 50% -12%, rgba(16,185,129,0.22), transparent 55%)',
  rose: 'radial-gradient(ellipse 90% 62% at 50% -12%, rgba(244,63,94,0.22), transparent 55%)',
  none: undefined,
};

const PAD = {
  default: 'pt-10 pb-20 md:pt-14 md:pb-24',
  compact: 'pt-8 pb-16 md:pt-12 md:pb-20',
  tight: 'pt-6 pb-12 md:pt-10 md:pb-16',
  none: '',
} as const;

export type InteriorPageShellProps = PropsWithChildren<{
  /** id sur le wrapper (ex. ancrage print) */
  id?: string;
  /** Largeur max du contenu (centré) */
  maxWidth?: keyof typeof MAX_WIDTH;
  /** Halo en tête de page */
  glow?: keyof typeof GLOW;
  /** Padding vertical */
  pad?: keyof typeof PAD;
  className?: string;
  /** Classe sur le conteneur interne (max-width + px) */
  innerClassName?: string;
  /** Fond plein page (quiz / résultat plein écran) */
  fullBleed?: boolean;
  /** Couleur de fond plein écran si fullBleed */
  bleedBgClassName?: string;
}>;

/**
 * Enveloppe commune pour les pages intérieures : halo, largeur max, padding.
 * À utiliser à la place de `container` + combinaisons ad hoc pour une cohérence 100 %.
 */
export function InteriorPageShell({
  children,
  id,
  maxWidth = '6xl',
  glow = 'blue',
  pad = 'default',
  className,
  innerClassName,
  fullBleed = false,
  bleedBgClassName = 'bg-[#050a14]',
}: InteriorPageShellProps) {
  const glowStyle = GLOW[glow];

  if (fullBleed) {
    return (
      <div id={id} className={cn('relative min-h-screen', bleedBgClassName, className)}>
        {glow !== 'none' && glowStyle ? (
          <div
            className='pointer-events-none absolute left-1/2 top-0 h-[min(520px,58vh)] w-[min(100%,1000px)] -translate-x-1/2 opacity-100'
            style={{ background: glowStyle }}
            aria-hidden
          />
        ) : null}
        <div className={cn('relative mx-auto w-full px-4 md:px-6', MAX_WIDTH[maxWidth], PAD[pad], innerClassName)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div id={id} className={cn('relative', className)}>
      {glow !== 'none' && glowStyle ? (
        <div
          className='pointer-events-none absolute left-1/2 top-0 h-[min(460px,52vh)] w-[min(100%,1000px)] -translate-x-1/2 opacity-100'
          style={{ background: glowStyle }}
          aria-hidden
        />
      ) : null}
      {/* Trait lumineux haut de page — cohérence visuelle globale */}
      {glow !== 'none' && glowStyle ? (
        <div
          className='pointer-events-none absolute left-1/2 top-0 h-px w-[min(92%,920px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-80'
          aria-hidden
        />
      ) : null}
      <div
        className={cn(
          'relative mx-auto w-full px-4',
          MAX_WIDTH[maxWidth],
          PAD[pad],
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
