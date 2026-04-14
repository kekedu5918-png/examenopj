import { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

type GlassCardProps = PropsWithChildren<{
  className?: string;
  hover?: boolean;
  padding?: string;
  /** Affiche un bord supérieur lumineux (accent top-highlight) */
  topGlow?: boolean;
  /** Rayon des coins — 3xl = style plus « produit » */
  radius?: '2xl' | '3xl';
}>;

export function GlassCard({
  children,
  className,
  hover = false,
  padding = 'p-6',
  topGlow = false,
  radius = '2xl',
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border border-white/[0.1] bg-white/[0.03]',
        radius === '3xl' ? 'rounded-3xl' : 'rounded-2xl',
        'shadow-[0_8px_40px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]',
        'backdrop-blur-xl',
        hover && [
          'transition-[border-color,background-color,box-shadow] duration-300 motion-reduce:transition-none',
          'hover:border-white/[0.14] hover:bg-white/[0.045]',
          'hover:shadow-[0_8px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.09)]',
        ],
        padding,
        className,
      )}
    >
      {/* Top glow accent */}
      {topGlow ? (
        <span
          className='pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-95'
          aria-hidden
        />
      ) : null}
      {children}
    </div>
  );
}
