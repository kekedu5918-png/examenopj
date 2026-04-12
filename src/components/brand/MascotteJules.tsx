'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/utils/cn';

export type MascotteJulesProps = {
  className?: string;
  /** Taille du carré de rendu (px) */
  size?: number;
  /** Animation de flottement (désactivée si prefers-reduced-motion) */
  animate?: boolean;
};

/**
 * Jules — mascotte ExamenOPJ : hibou bienveillant au képi, inspiré d’un ton Duolingo (expressif) + sobriété premium.
 */
export function MascotteJules({ className, size = 64, animate = true }: MascotteJulesProps) {
  const reduce = useReducedMotion();
  const shouldFloat = animate && !reduce;

  return (
    <motion.div
      className={cn('inline-flex shrink-0 select-none', className)}
      style={{ width: size, height: size }}
      aria-hidden
      animate={shouldFloat ? { y: [0, -5, 0], rotate: [0, 1.5, -1, 0] } : false}
      transition={
        shouldFloat
          ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    >
      <svg
        viewBox='0 0 100 100'
        width='100%'
        height='100%'
        className='overflow-visible drop-shadow-[0_8px_24px_rgba(37,99,235,0.25)]'
      >
        <defs>
          <linearGradient id='jules-body' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#1e3a5f' />
            <stop offset='100%' stopColor='#0f172a' />
          </linearGradient>
          <linearGradient id='jules-kepi' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#1d4ed8' />
            <stop offset='100%' stopColor='#172554' />
          </linearGradient>
          <radialGradient id='jules-cheek' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='#fca5a5' stopOpacity='0.35' />
            <stop offset='100%' stopColor='#fca5a5' stopOpacity='0' />
          </radialGradient>
        </defs>

        {/* Ailes / corps arrière */}
        <ellipse cx='28' cy='72' rx='14' ry='18' fill='url(#jules-body)' opacity='0.85' transform='rotate(-12 28 72)' />
        <ellipse cx='72' cy='72' rx='14' ry='18' fill='url(#jules-body)' opacity='0.85' transform='rotate(12 72 72)' />

        {/* Corps */}
        <ellipse cx='50' cy='78' rx='26' ry='22' fill='url(#jules-body)' />

        {/* Tête */}
        <circle cx='50' cy='48' r='32' fill='url(#jules-body)' />

        {/* Joues */}
        <circle cx='32' cy='54' r='10' fill='url(#jules-cheek)' />
        <circle cx='68' cy='54' r='10' fill='url(#jules-cheek)' />

        {/* Képi */}
        <path
          d='M 30 26 L 35 14 L 65 14 L 70 26 Z'
          fill='url(#jules-kepi)'
          stroke='rgba(255,255,255,0.12)'
          strokeWidth='0.5'
        />
        <rect x='33' y='22' width='34' height='4' rx='1' fill='#d4a853' opacity='0.95' />
        <ellipse cx='50' cy='28' rx='18' ry='3' fill='#0f172a' opacity='0.35' />

        {/* Yeux (style expressif) */}
        <ellipse cx='38' cy='46' rx='11' ry='12' fill='#f8fafc' />
        <ellipse cx='62' cy='46' rx='11' ry='12' fill='#f8fafc' />
        <circle cx='40' cy='46' r='6' fill='#0f172a' />
        <circle cx='64' cy='46' r='6' fill='#0f172a' />
        <circle cx='41.5' cy='44.5' r='2' fill='#f8fafc' />
        <circle cx='65.5' cy='44.5' r='2' fill='#f8fafc' />

        {/* Bec */}
        <path d='M 46 58 L 50 64 L 54 58 Z' fill='#f59e0b' />
        <path d='M 48 58 L 50 61 L 52 58' fill='#d97706' opacity='0.6' />

        {/* Plastron + insigne (lisible à toutes les tailles) */}
        <ellipse cx='50' cy='72' rx='14' ry='12' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.08)' strokeWidth='0.5' />
        <path
          d='M50 66 L53 71 L58 71.5 L54.5 75 L55.5 80 L50 77.5 L44.5 80 L45.5 75 L42 71.5 L47 71 Z'
          fill='#e2e8f0'
          opacity='0.9'
        />
      </svg>
    </motion.div>
  );
}
