import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type Variant = 'default' | 'accent' | 'warn';

const variantClass: Record<Variant, string> = {
  default: 'border-white/15 bg-white/[0.04] text-gray-200',
  /** Fond plus dense que emerald/10 pour que le texte passe le ratio AA sur le canvas marine. */
  accent: 'border-emerald-400/35 bg-[#0f1d15] text-slate-100',
  warn: 'border-amber-400/35 bg-[#1f160a] text-slate-100',
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
      <p
        className={cn(
          'font-display text-xs font-bold uppercase tracking-wide',
          variant === 'accent' && 'text-emerald-200',
          variant === 'warn' && 'text-amber-200',
          variant === 'default' && 'text-slate-300',
        )}
      >
        {title}
      </p>
      <div className='mt-2 space-y-2 [&_strong]:text-white [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1'>
        {children}
      </div>
    </aside>
  );
}
