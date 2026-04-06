import { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

type GlassCardProps = PropsWithChildren<{
  className?: string;
  hover?: boolean;
  padding?: string;
}>;

export function GlassCard({ children, className, hover = false, padding = 'p-6' }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md',
        hover && 'transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]',
        padding,
        className
      )}
    >
      {children}
    </div>
  );
}
