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
        'group inline-flex max-w-full min-w-0 items-center gap-2 rounded-lg no-underline outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-blue-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ex-canvas)] dark:focus-visible:ring-offset-[color:var(--ex-canvas)]',
        className,
      )}
      aria-label='Examen OPJ — accueil'
    >
      <span
        className={cn(
          'font-sans font-bold tracking-[0.14em] text-white',
          compact ? 'text-xs' : 'text-[13px] sm:text-sm',
        )}
      >
        EXAMEN{' '}
        <span className={cn('font-semibold text-slate-200', compact ? 'tracking-[0.1em]' : 'tracking-[0.12em]')}>
          OPJ
        </span>
      </span>
      <span
        className={cn(
          'inline-flex shrink-0 items-center rounded-md border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-violet-500/12 to-indigo-600/15 font-bold tabular-nums text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10',
          compact ? 'px-1.5 py-px text-[9px] tracking-wide' : 'px-2 py-0.5 text-[10px] tracking-[0.08em]',
        )}
      >
        2026
      </span>
    </Link>
  );
}
