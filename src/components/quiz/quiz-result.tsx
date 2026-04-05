'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

import { LANDING_EASE } from '@/components/home/motion';
import { Button } from '@/components/ui/button';

const ease = [...LANDING_EASE] as [number, number, number, number];

type QuizResultProps = {
  correct: number;
  total: number;
  bestPercent: number | null;
  onRecommencer: () => void;
  onChangerMode: () => void;
};

export function QuizResult({ correct, total, bestPercent, onRecommencer, onChangerMode }: QuizResultProps) {
  const gradId = useId().replace(/:/g, '');
  const pct = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎯' : pct >= 50 ? '👍' : '📖';
  const msg =
    pct >= 90 ? 'Excellent !' : pct >= 70 ? 'Très bien !' : pct >= 50 ? 'Pas mal, continuez !' : 'Reprenez les fiches du programme';

  const scoreColor = pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400';
  const wrong = total - correct;

  const r = 52;
  const circumference = 2 * Math.PI * r;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease }}
      className='mx-auto max-w-lg px-4 pb-20 pt-8 text-center'
    >
      <div className='text-5xl' aria-hidden>
        {emoji}
      </div>
      <p className='mt-3 text-xl font-semibold text-white'>{msg}</p>

      <div className='mt-10 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-14'>
        <p className={`font-display text-6xl font-bold md:text-7xl ${scoreColor}`}>
          {correct} / {total}
        </p>

        <div className='relative h-[7.5rem] w-[7.5rem] shrink-0'>
          <svg className='h-full w-full -rotate-90' viewBox='0 0 120 120' aria-hidden>
            <circle cx='60' cy='60' r={r} fill='none' stroke='rgba(255,255,255,0.08)' strokeWidth='10' />
            <motion.circle
              cx='60'
              cy='60'
              r={r}
              fill='none'
              stroke={`url(#${gradId})`}
              strokeWidth='10'
              strokeLinecap='round'
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
              transition={{ duration: 1.15, ease }}
            />
            <defs>
              <linearGradient id={gradId} x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#06b6d4' />
                <stop offset='100%' stopColor='#3b82f6' />
              </linearGradient>
            </defs>
          </svg>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-lg font-bold text-white'>{pct}%</span>
          </div>
        </div>
      </div>

      <ul className='mx-auto mt-10 max-w-sm space-y-2 text-left text-sm'>
        <li className='flex justify-between gap-4 border-b border-white/5 py-2'>
          <span className='text-gray-500'>Bonnes réponses</span>
          <span className='font-medium text-emerald-400'>{correct}</span>
        </li>
        <li className='flex justify-between gap-4 border-b border-white/5 py-2'>
          <span className='text-gray-500'>Mauvaises réponses</span>
          <span className='font-medium text-red-400'>{wrong}</span>
        </li>
        <li className='flex justify-between gap-4 py-2'>
          <span className='text-gray-500'>Taux de réussite</span>
          <span className='font-medium text-gray-200'>{pct}%</span>
        </li>
        {bestPercent != null ? (
          <li className='flex justify-between gap-4 border-t border-cyan-500/20 pt-3 text-xs'>
            <span className='text-gray-500'>Meilleur score enregistré (ce mode)</span>
            <span className='font-semibold text-cyan-400'>{bestPercent}%</span>
          </li>
        ) : null}
      </ul>

      <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center'>
        <Button
          type='button'
          variant='outline'
          className='w-full border-white/20 bg-white/5 text-gray-200 hover:bg-white/10 sm:w-auto sm:min-w-[160px]'
          onClick={onRecommencer}
        >
          Recommencer
        </Button>
        <Button
          type='button'
          className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-95 sm:w-auto sm:min-w-[200px]'
          onClick={onChangerMode}
        >
          Changer de mode
        </Button>
      </div>
    </motion.div>
  );
}
