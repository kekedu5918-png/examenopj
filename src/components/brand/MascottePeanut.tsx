'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/utils/cn';

export type MascottePeanutProps = {
  className?: string;
  /** Taille du carré de rendu (px) */
  size?: number;
  /** Animation de flottement + queue (désactivée si prefers-reduced-motion) */
  animate?: boolean;
  /** Si true, masqué pour les lecteurs d’écran (déco uniquement) */
  decorative?: boolean;
};

/**
 * PEANUT — mascotte ExamenOPJ : shiba inu au képi police, style expressif (Duolingo) + rendu premium (dégradés, filtres, détails).
 */
export function MascottePeanut({
  className,
  size = 64,
  animate = true,
  decorative = true,
}: MascottePeanutProps) {
  const reduce = useReducedMotion();
  const shouldFloat = animate && !reduce;
  const rid = useId().replace(/:/g, '');
  const I = (name: string) => `peanut-${name}-${rid}`;
  const u = (name: string) => `url(#${I(name)})`;

  return (
    <motion.div
      className={cn('inline-flex shrink-0 select-none', className)}
      style={{ width: size, height: size }}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : 'PEANUT, mascotte ExamenOPJ, shiba inu en uniforme de police'}
      animate={shouldFloat ? { y: [0, -6, 0], rotate: [0, 1.2, -0.8, 0] } : false}
      transition={shouldFloat ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <svg
        viewBox='0 0 100 100'
        width='100%'
        height='100%'
        className='overflow-visible drop-shadow-[0_12px_32px_rgba(37,99,235,0.3)]'
      >
        <defs>
          <linearGradient id={I('fur')} x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#fbbf24' />
            <stop offset='35%' stopColor='#f59e0b' />
            <stop offset='100%' stopColor='#d97706' />
          </linearGradient>
          <linearGradient id={I('fur-deep')} x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#ea580c' />
            <stop offset='100%' stopColor='#b45309' />
          </linearGradient>
          <linearGradient id={I('cream')} x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#fffbeb' />
            <stop offset='100%' stopColor='#fef3c7' />
          </linearGradient>
          <linearGradient id={I('kepi')} x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#3b82f6' />
            <stop offset='45%' stopColor='#1d4ed8' />
            <stop offset='100%' stopColor='#172554' />
          </linearGradient>
          <linearGradient id={I('uniform')} x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#1e3a5f' />
            <stop offset='100%' stopColor='#0f172a' />
          </linearGradient>
          <radialGradient id={I('blush')} cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='#fb7185' stopOpacity='0.42' />
            <stop offset='100%' stopColor='#fb7185' stopOpacity='0' />
          </radialGradient>
          <radialGradient id={I('muzzle')} cx='50%' cy='35%' r='65%'>
            <stop offset='0%' stopColor='#fff7ed' />
            <stop offset='100%' stopColor='#fde68a' />
          </radialGradient>
          <filter id={I('soft')} x='-25%' y='-25%' width='150%' height='150%'>
            <feDropShadow dx='0' dy='2' stdDeviation='1.8' floodOpacity='0.28' />
          </filter>
        </defs>

        {/* Queue — groupe animé (léger balancement) */}
        <motion.g
          style={{ transformOrigin: '82px 56px' }}
          animate={shouldFloat ? { rotate: [0, 10, -6, 0] } : false}
          transition={shouldFloat ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          <path
            d='M 82 58 Q 94 48 92 38 Q 90 30 84 36 Q 80 44 82 52 Q 84 58 82 58'
            fill={u('fur')}
            opacity='0.96'
          />
          <path
            d='M 86 42 Q 90 40 88 36'
            fill='none'
            stroke='#b45309'
            strokeWidth='0.6'
            opacity='0.35'
          />
        </motion.g>

        {/* Oreilles */}
        <path d='M 18 46 L 26 12 L 42 40 Z' fill={u('fur-deep')} filter={u('soft')} />
        <path d='M 24 38 L 28 22 L 36 38 Z' fill={u('cream')} />
        <path d='M 82 46 L 74 12 L 58 40 Z' fill={u('fur-deep')} filter={u('soft')} />
        <path d='M 76 38 L 72 22 L 64 38 Z' fill={u('cream')} />

        {/* Tête */}
        <ellipse cx='50' cy='50' rx='31' ry='29' fill={u('fur')} />
        <ellipse cx='50' cy='54' rx='20' ry='16' fill={u('muzzle')} opacity='0.95' />

        <ellipse cx='32' cy='52' rx='10' ry='8' fill='#fffbeb' opacity='0.85' />
        <ellipse cx='68' cy='52' rx='10' ry='8' fill='#fffbeb' opacity='0.85' />

        <ellipse cx='30' cy='54' rx='7' ry='5' fill={u('blush')} />
        <ellipse cx='70' cy='54' rx='7' ry='5' fill={u('blush')} />

        {/* Képi */}
        <ellipse cx='50' cy='24' rx='28' ry='5' fill='#172554' opacity='0.95' />
        <path
          d='M 26 24 L 32 6 L 68 6 L 74 24 Z'
          fill={u('kepi')}
          stroke='rgba(255,255,255,0.14)'
          strokeWidth='0.6'
        />
        <rect x='30' y='17' width='40' height='5' rx='1.2' fill='#d4a853' />
        <ellipse cx='50' cy='25' rx='22' ry='2.5' fill='#0f172a' opacity='0.4' />

        <circle cx='50' cy='11' r='4.2' fill={u('cream')} stroke='#b45309' strokeWidth='0.35' />
        <path
          d='M 50 8.2 L 51.2 10.2 L 53.4 10.5 L 51.8 12 L 52.2 14.2 L 50 13.1 L 47.8 14.2 L 48.2 12 L 46.6 10.5 L 48.8 10.2 Z'
          fill='#fbbf24'
        />

        {/* Yeux */}
        <ellipse cx='38' cy='46' rx='10' ry='11' fill='#fefce8' />
        <ellipse cx='62' cy='46' rx='10' ry='11' fill='#fefce8' />
        <ellipse cx='39' cy='47' rx='5.5' ry='6.5' fill='#451a03' />
        <ellipse cx='63' cy='47' rx='5.5' ry='6.5' fill='#451a03' />
        <ellipse cx='40' cy='46' rx='2.8' ry='3.2' fill='#0c0a09' />
        <ellipse cx='64' cy='46' rx='2.8' ry='3.2' fill='#0c0a09' />
        <circle cx='41.2' cy='44.8' r='1.6' fill='#fff' />
        <circle cx='65.2' cy='44.8' r='1.6' fill='#fff' />
        <circle cx='39.5' cy='47.5' r='0.9' fill='#fff' opacity='0.5' />

        {/* Moustaches */}
        <g stroke='#78716c' strokeWidth='0.45' strokeLinecap='round' opacity='0.55'>
          <path d='M 22 54 L 12 52' />
          <path d='M 22 57 L 11 58' />
          <path d='M 22 60 L 13 64' />
          <path d='M 78 54 L 88 52' />
          <path d='M 78 57 L 89 58' />
          <path d='M 78 60 L 87 64' />
        </g>

        {/* Truffe */}
        <ellipse cx='50' cy='56' rx='4.5' ry='3.2' fill='#1c1917' />
        <ellipse cx='48.8' cy='55.2' rx='1.2' ry='0.9' fill='#fff' opacity='0.35' />

        {/* Sourire */}
        <path
          d='M 42 60 Q 50 66 58 60'
          fill='none'
          stroke='#9a3412'
          strokeWidth='1.15'
          strokeLinecap='round'
        />
        <path
          d='M 48 59 L 50 61 L 52 59'
          fill='none'
          stroke='#b45309'
          strokeWidth='0.6'
          strokeLinecap='round'
          opacity='0.7'
        />

        {/* Corps */}
        <path
          d='M 26 74 Q 24 88 50 93 Q 76 88 74 74 Q 72 68 50 70 Q 28 68 26 74'
          fill={u('uniform')}
        />
        <path
          d='M 30 74 L 30 88 Q 50 92 70 88 L 70 74'
          fill='none'
          stroke='rgba(255,255,255,0.06)'
          strokeWidth='0.5'
        />

        <path d='M 38 72 L 50 78 L 62 72' fill='none' stroke='#d4a853' strokeWidth='2.2' strokeLinecap='round' />
        <path d='M 50 78 L 50 86' stroke='#1e40af' strokeWidth='3' strokeLinecap='round' />

        {/* Épaulettes / détails uniforme */}
        <ellipse cx='30' cy='76' rx='4' ry='2.5' fill='#d4a853' opacity='0.85' />
        <ellipse cx='70' cy='76' rx='4' ry='2.5' fill='#d4a853' opacity='0.85' />

        <rect
          x='43'
          y='78'
          width='14'
          height='10'
          rx='2'
          fill='rgba(255,255,255,0.12)'
          stroke='rgba(255,255,255,0.2)'
          strokeWidth='0.5'
        />
        <path d='M 50 80 L 52 83 L 50 86 L 48 83 Z' fill='#fbbf24' opacity='0.95' />

        <ellipse cx='34' cy='91' rx='9' ry='5.5' fill={u('cream')} stroke='#fdba74' strokeWidth='0.4' />
        <ellipse cx='66' cy='91' rx='9' ry='5.5' fill={u('cream')} stroke='#fdba74' strokeWidth='0.4' />

        <ellipse cx='42' cy='38' rx='8' ry='5' fill='#fff' opacity='0.12' />
      </svg>
    </motion.div>
  );
}
