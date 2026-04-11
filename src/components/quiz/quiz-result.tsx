'use client';

import { useEffect, useId, useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, ChevronRight, Medal, Target, ThumbsUp } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { Button } from '@/components/ui/button';

const ease = [...LANDING_EASE] as [number, number, number, number];

// ─── Confetti ────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#06b6d4', '#3b82f6', '#a855f7', '#f59e0b', '#10b981', '#f43f5e'];
const PARTICLE_COUNT = 60;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  angle: number;
  spin: number;
  life: number;
};

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 60,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!,
      size: 5 + Math.random() * 6,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2,
      life: 1,
    }));

    let raf: number;
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.angle += p.spin;
        p.life -= 0.008;
        if (p.y < canvas.height && p.life > 0) alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none absolute inset-0 h-full w-full'
      aria-hidden
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type QuizResultProps = {
  correct: number;
  total: number;
  bestPercent: number | null;
  attemptId?: string | null;
  onRecommencer: () => void;
  onChangerMode: () => void;
};

export function QuizResult({ correct, total, bestPercent, attemptId, onRecommencer, onChangerMode }: QuizResultProps) {
  const gradId = useId().replace(/:/g, '');
  const prefersReduced = useReducedMotion();
  const pct = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;
  const isVictory = pct >= 90;
  const ResultIcon =
    pct >= 90 ? Medal : pct >= 70 ? Target : pct >= 50 ? ThumbsUp : BookOpen;
  const msg =
    pct >= 90 ? 'Excellent !' : pct >= 70 ? 'Très bien !' : pct >= 50 ? 'Pas mal, continuez !' : 'Reprenez les fiches du programme';

  const scoreColor = pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400';
  const wrong = total - correct;

  const r = 52;
  const circumference = 2 * Math.PI * r;

  return (
    <div className='relative overflow-hidden'>
      {isVictory && !prefersReduced && <ConfettiCanvas />}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease }}
        className='mx-auto max-w-lg px-4 pb-20 pt-8 text-center'
      >
        <motion.div
          className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-300'
          animate={isVictory && !prefersReduced ? { scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease }}
          aria-hidden
        >
          <ResultIcon className='h-9 w-9' strokeWidth={1.5} />
        </motion.div>
        <p className='mt-3 text-xl font-semibold text-white'>{msg}</p>

        <div className='mt-10 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-14'>
          <motion.p
            className={`font-display text-6xl font-bold md:text-7xl ${scoreColor}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease }}
          >
            {correct} / {total}
          </motion.p>

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

        {attemptId && (
          <div className='mt-4 flex justify-center'>
            <Button
              asChild
              variant='ghost'
              size='sm'
              className='gap-1.5 text-slate-400 hover:text-slate-200'
            >
              <Link href={`/dashboard/session/${attemptId}`}>
                Voir le rapport détaillé
                <ChevronRight className='h-3.5 w-3.5' />
              </Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
