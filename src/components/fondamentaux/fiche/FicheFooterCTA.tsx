'use client';

import Link from 'next/link';

import { cn } from '@/utils/cn';

export type FicheFooterCTAProps = {
  progress?: number;
  ctas: Array<{ href: string; label: string }>;
};

export function FicheFooterCTA({ progress, ctas }: FicheFooterCTAProps) {
  const pct = progress != null ? Math.min(100, Math.max(0, progress)) : null;

  return (
    <footer
      className={cn(
        'mt-12 border-t border-ij-border/40 pt-8',
      )}
      data-testid='fiche-footer-cta'
    >
      {pct != null ? (
        <div className='mb-6'>
          <div className='mb-1 flex justify-between text-xs text-ij-text-muted'>
            <span>Progression de lecture</span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div
            className='h-1.5 overflow-hidden rounded-full bg-ij-surface-2'
            role='progressbar'
            aria-label={`Progression de lecture : ${Math.round(pct)} pour cent`}
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className='h-full rounded-full bg-ij-accent transition-all duration-300'
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className='grid gap-4 sm:grid-cols-2'>
        {ctas.map((cta) => (
          <Link
            key={cta.href}
            href={cta.href}
            className={cn(
              'rounded-xl border border-ij-glass-border/15 bg-ij-glass-bg/8 px-5 py-4 backdrop-blur-md',
              'text-center text-sm font-medium text-ij-text transition-transform hover:-translate-y-0.5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50',
            )}
          >
            {cta.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
