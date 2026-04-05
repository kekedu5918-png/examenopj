import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type Variant = 'default' | 'accent' | 'warn';

const variantClass: Record<Variant, string> = {
  default: 'border-white/15 bg-white/[0.04] text-gray-200',
  accent: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-50',
  warn: 'border-amber-500/30 bg-amber-500/10 text-amber-50',
};

type Props = {
  title: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** id pour ancres / aria */
  id?: string;
};

/**
 * Encadré méthodo court réutilisable (PRQC, qualification verbatim, consignes épreuve 2).
 */
export function MethodoRappel({ title, children, variant = 'default', className, id }: Props) {
  return (
    <aside
      id={id}
      className={cn(
        'rounded-xl border px-4 py-3 text-sm leading-relaxed',
        variantClass[variant],
        className,
      )}
      aria-label={title}
    >
      <p className='font-display text-xs font-bold uppercase tracking-wide text-gray-400'>{title}</p>
      <div className='mt-2 space-y-2 [&_strong]:text-white [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1'>
        {children}
      </div>
    </aside>
  );
}
