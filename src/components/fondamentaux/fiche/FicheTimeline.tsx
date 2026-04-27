'use client';

import type { FicheTimelineEntry } from '@/lib/fondamentaux/fiche-frontmatter-v3';
import { cn } from '@/utils/cn';

export type FicheTimelineProps = {
  items: FicheTimelineEntry[];
};

export function FicheTimeline({ items }: FicheTimelineProps) {
  if (!items.length) return null;

  return (
    <section className='mt-10' aria-label='Chronologie'>
      <h2 className='mb-4 font-ij-display text-lg font-semibold text-ij-text'>Timeline</h2>
      <ol className='relative ms-3 border-s border-ij-border/50'>
        {items.map((item, i) => (
          <li key={`${item.temps}-${i}`} className='relative mb-8 ms-6'>
            <span
              className={cn(
                'absolute -start-[1.29rem] top-1.5 flex h-3 w-3 rounded-full border border-ij-accent bg-ij-accent',
              )}
              aria-hidden
            />
            <time className='text-xs font-medium text-ij-accent'>{item.temps}</time>
            <p className='font-medium text-ij-text'>{item.event}</p>
            <p className='text-sm text-ij-text-muted'>{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
