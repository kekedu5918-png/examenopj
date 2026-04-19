import Link from 'next/link';

import { cn } from '@/utils/cn';

type BrandWordmarkProps = {
  href: string;
  className?: string;
  /** Header (défaut) ou version plus compacte pour le pied de page */
  size?: 'header' | 'footer';
};

/**
 * Marque texte sobre (type Apple / Duolingo) : « EXAMEN OPJ » + badge session 2026.
 */
export function BrandWordmark({ href, className, size = 'header' }: BrandWordmarkProps) {
  const compact = size === 'footer';
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex max-w-full min-w-0 items-center gap-2 rounded-lg no-underline outline-none transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ij-bg',
        className,
      )}
      aria-label='Examen OPJ — accueil'
    >
      <span
        className={cn(
          'font-ij-display font-bold tracking-[0.14em] text-ij-text',
          compact ? 'text-xs' : 'text-[13px] sm:text-sm',
        )}
      >
        EXAMEN{' '}
        <span className={cn('font-semibold text-ij-text-muted', compact ? 'tracking-[0.1em]' : 'tracking-[0.12em]')}>
          OPJ
        </span>
      </span>
      <span
        className={cn(
          'inline-flex shrink-0 items-center rounded-md border border-ij-border bg-ij-surface-2 font-ij-sans font-bold tabular-nums text-ij-text shadow-ij-soft ring-1 ring-ij-border/60',
          compact ? 'px-1.5 py-px text-[9px] tracking-wide' : 'px-2 py-0.5 text-[10px] tracking-[0.08em]',
        )}
      >
        2026
      </span>
    </Link>
  );
}
