import type { PropsWithChildren, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type AccountSectionCardProps = PropsWithChildren<{
  id?: string;
  title: string;
  /** Sous-titre optionnel sous le titre */
  description?: string;
  footer?: ReactNode;
  className?: string;
}>;

/** Carte compte : relief, coins arrondis, cohérence dashboard / marketing. */
export function AccountSectionCard({ id, title, description, footer, children, className }: AccountSectionCardProps) {
  return (
    <section
      id={id}
      className={cn(
        'm-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-ds-border/90 bg-gradient-to-b from-ds-bg-elevated to-ds-bg-secondary/80 shadow-sm ring-1 ring-black/[0.04] dark:from-zinc-900/95 dark:to-zinc-950/90 dark:ring-white/[0.08]',
        className,
      )}
    >
      <div className='p-5 sm:p-6'>
        <h2 className='text-lg font-semibold tracking-tight text-ds-text-primary sm:text-xl'>{title}</h2>
        {description ? <p className='mt-1.5 text-sm text-ds-text-muted'>{description}</p> : null}
        <div className={cn(description ? 'mt-5' : 'mt-4')}>{children}</div>
      </div>
      {footer != null ? (
        <div className='flex justify-end border-t border-ds-border/80 bg-ds-bg-primary/30 px-5 py-4 dark:border-zinc-800 dark:bg-black/20'>
          {footer}
        </div>
      ) : null}
    </section>
  );
}
