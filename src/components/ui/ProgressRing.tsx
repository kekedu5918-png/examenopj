'use client';

import { cn } from '@/utils/cn';

type Props = {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  /** Classe Tailwind pour la couleur de l'arc (stroke) */
  colorClass?: string;
  /** Classe Tailwind pour la piste de fond (stroke) */
  trackClass?: string;
  children?: React.ReactNode;
  className?: string;
};

export function ProgressRing({
  value,
  max,
  size = 80,
  strokeWidth = 8,
  colorClass = 'stroke-cyan-400',
  trackClass = 'stroke-white/10',
  children,
  className,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  const offset = circumference * (1 - pct);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role='progressbar'
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`${value} sur ${max}`}
    >
      <svg width={size} height={size} className='-rotate-90' aria-hidden>
        {/* Piste */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          strokeWidth={strokeWidth}
          className={trackClass}
        />
        {/* Arc de progression */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          className={cn('transition-[stroke-dashoffset] duration-700 ease-out', colorClass)}
        />
      </svg>
      {/* Contenu central */}
      {children && (
        <span className='absolute inset-0 flex items-center justify-center'>{children}</span>
      )}
    </div>
  );
}
