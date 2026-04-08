import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-zinc-200 text-zinc-900',
        secondary: 'border-transparent bg-zinc-800 text-zinc-200',
        destructive: 'border-transparent bg-red-600 text-white',
        outline: 'border-zinc-700 text-zinc-200',
        examen: 'border-white/[0.08] bg-white/[0.06] text-examen-ink',
        examenSuccess: 'border-examen-success/30 bg-examen-success/20 text-examen-success',
        examenPremium: 'border-examen-premium/40 bg-examen-premium/20 text-violet-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
