import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  className?: string;
  /** `relaxed` : espacement vertical plus large (pages denses). */
  spacing?: 'normal' | 'relaxed';
}>;

/**
 * Shell visuel unifié pour l’espace compte / dashboard : tokens `--ds-*` + variantes dark
 * pour cohérence clair / sombre (évite `bg-slate-950` figé).
 */
export function AccountDashboardSection({ children, className, spacing = 'normal' }: Props) {
  return (
    <section
      className={cn(
        spacing === 'relaxed' ? 'space-y-6' : 'space-y-4',
        'rounded-xl border border-ds-border bg-ds-bg-secondary p-6 text-ds-text-primary shadow-sm',
        'dark:border-white/[0.08] dark:bg-navy-950/95 dark:text-slate-50',
        className,
      )}
    >
      {children}
    </section>
  );
}
