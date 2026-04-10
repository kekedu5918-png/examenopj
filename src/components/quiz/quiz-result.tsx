'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Medal, RotateCcw, Star, Target, ThumbsUp } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';

const ease = [...LANDING_EASE] as [number, number, number, number];

type QuizResultProps = {
  correct: number;
  total: number;
  bestPercent: number | null;
  onRecommencer: () => void;
  onChangerMode: () => void;
};

/** Mini particules confetti sur score élevé */
function ConfettiDots({ show }: { show: boolean }) {
  if (!show) return null;
  const dots = [
    { x: '-40px', y: '-60px', color: '#3b82f6', delay: 0 },
    { x: '40px', y: '-70px', color: '#06b6d4', delay: 0.08 },
    { x: '-60px', y: '-20px', color: '#22c55e', delay: 0.12 },
    { x: '60px', y: '-30px', color: '#f59e0b', delay: 0.06 },
    { x: '-20px', y: '-80px', color: '#8b5cf6', delay: 0.1 },
    { x: '20px', y: '-55px', color: '#ec4899', delay: 0.04 },
  ];
  return (
    <div className='pointer-events-none absolute inset-0 flex items-center justify-center' aria-hidden>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className='absolute h-2.5 w-2.5 rounded-full'
          style={{ backgroundColor: d.color }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: 0, x: d.x, y: d.y, scale: 1.2 }}
          transition={{ duration: 0.7, delay: d.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export function QuizResult({ correct, total, bestPercent, onRecommencer, onChangerMode }: QuizResultProps) {
  const gradId = useId().replace(/:/g, '');
  const pct = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (pct >= 80) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 900); }
  }, [pct]);

  const ResultIcon = pct >= 90 ? Medal : pct >= 70 ? Target : pct >= 50 ? ThumbsUp : BookOpen;
  const msg = pct >= 90 ? 'Excellent ! 🏆' : pct >= 70 ? 'Très bien !' : pct >= 50 ? 'Pas mal, continuez !' : 'Reprenez les fiches';
  const scoreColor = pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400';
  const ringColor = pct >= 70 ? ['#22c55e', '#06b6d4'] : pct >= 50 ? ['#f59e0b', '#ef4444'] : ['#ef4444', '#f97316'];
  const wrong = total - correct;
  const r = 52;
  const circumference = 2 * Math.PI * r;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className='mx-auto max-w-lg px-4 pb-20 pt-10'
    >
      {/* Icône résultat + confettis */}
      <div className='flex flex-col items-center text-center'>
        <div className='relative'>
          <ConfettiDots show={showConfetti} />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.1 }}
            className='flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
          >
            <ResultIcon className='h-10 w-10 text-cyan-300' strokeWidth={1.5} aria-hidden />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className='mt-4 text-2xl font-extrabold tracking-tight text-white'
        >
          {msg}
        </motion.p>
        <p className='mt-1 text-sm text-slate-500'>Quiz terminé · {total} questions</p>
      </div>

      {/* Score central */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.5, ease }}
        className='mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-14'
      >
        <div className='text-center'>
          <p className={`font-sans text-6xl font-black tracking-tighter md:text-7xl ${scoreColor}`}>
            {correct}<span className='text-3xl text-slate-500'>/{total}</span>
          </p>
          <p className='mt-1 text-sm text-slate-500'>bonnes réponses</p>
        </div>

        {/* Anneau SVG animé */}
        <div className='relative h-28 w-28 shrink-0'>
          <svg className='h-full w-full -rotate-90' viewBox='0 0 120 120' aria-hidden>
            <circle cx='60' cy='60' r={r} fill='none' stroke='rgba(255,255,255,0.06)' strokeWidth='10' />
            <motion.circle
              cx='60' cy='60' r={r}
              fill='none'
              stroke={`url(#${gradId})`}
              strokeWidth='10'
              strokeLinecap='round'
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
              transition={{ duration: 1.2, ease, delay: 0.3 }}
            />
            <defs>
              <linearGradient id={gradId} x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor={ringColor[0]} />
                <stop offset='100%' stopColor={ringColor[1]} />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <span className='text-xl font-bold text-white'>{pct}%</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Tableau récap */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className='mt-10 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]'
      >
        {[
          { label: 'Bonnes réponses', value: correct, color: 'text-emerald-400' },
          { label: 'Mauvaises réponses', value: wrong, color: 'text-red-400' },
          { label: 'Taux de réussite', value: `${pct}%`, color: scoreColor },
        ].map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-5 py-3.5 text-sm ${i < 2 ? 'border-b border-white/[0.05]' : ''}`}
          >
            <span className='text-slate-500'>{row.label}</span>
            <span className={`font-semibold ${row.color}`}>{row.value}</span>
          </div>
        ))}
        {bestPercent != null && (
          <div className='flex items-center justify-between border-t border-white/[0.07] bg-white/[0.02] px-5 py-3.5 text-xs'>
            <span className='flex items-center gap-1.5 text-slate-500'>
              <Star className='h-3.5 w-3.5 text-amber-400' aria-hidden />
              Meilleur score (ce mode)
            </span>
            <span className='font-semibold text-amber-400'>{bestPercent}%</span>
          </div>
        )}
      </motion.div>

      {/* Suggestion si mauvais score */}
      {pct < 60 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='mt-5 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-4 py-3 text-sm text-slate-300'
        >
          <p className='font-semibold text-blue-300'>💡 Conseil</p>
          <p className='mt-1 text-slate-400'>
            Révisez les fiches fondamentaux correspondantes avant de relancer ce quiz.
          </p>
          <Link href='/fondamentaux' className='mt-2 inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300'>
            Aller aux fondamentaux <ArrowRight className='h-3.5 w-3.5' aria-hidden />
          </Link>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className='mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center'
      >
        <button
          type='button'
          onClick={onRecommencer}
          className='inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]'
        >
          <RotateCcw className='h-4 w-4' aria-hidden />
          Recommencer
        </button>
        <button
          type='button'
          onClick={onChangerMode}
          className='inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition hover:shadow-[0_0_28px_rgba(37,99,235,0.45)]'
        >
          Changer de mode
          <ArrowRight className='h-4 w-4' aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}
