'use client';

import { cn } from '@/utils/cn';

export type FicheCallout30sProps = {
  text: string;
};

export function FicheCallout30s({ text }: FicheCallout30sProps) {
  return (
    <aside
      role='note'
      className={cn(
        'mt-10 rounded-xl border border-ij-info/35',
        'bg-gradient-to-br from-ij-info/15 via-ij-info/8 to-ij-surface/40',
        'px-5 py-4 text-sm text-ij-text',
      )}
      data-testid='fiche-callout-30s'
    >
      <p className='font-medium text-ij-info'>En 30 secondes</p>
      <p className='mt-2 leading-relaxed text-ij-text-muted'>{text}</p>
    </aside>
  );
}
