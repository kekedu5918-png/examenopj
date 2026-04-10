'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Flame,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

import { cn } from '@/utils/cn';

const EXAM = new Date(Date.UTC(2026, 5, 11, 0, 0, 0));
const TOTAL_DAYS = Math.ceil((EXAM.getTime() - new Date(Date.UTC(2026, 0, 1)).getTime()) / 86400000);

function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = null;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return <span>{display}</span>;
}

function CountdownRing({ daysLeft, totalDays }: { daysLeft: number; totalDays: number }) {
  const R = 48;
  const C = 2 * Math.PI * R;
  const pct = Math.max(0, Math.min(1, daysLeft / totalDays));
  const dash = pct * C;

  return (
    <div className='relative flex h-32 w-32 items-center justify-center'>
      <svg className='absolute inset-0 -rotate-90' width='128' height='128' viewBox='0 0 128 128'>
        <circle cx='64' cy='64' r={R} fill='none' stroke='rgba(255,255,255,0.06)' strokeWidth='8' />
        <motion.circle
          cx='64'
          cy='64'
          r={R}
          fill='none'
          stroke='url(#countGrad)'
          strokeWidth='8'
          strokeLinecap='round'
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - dash }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <defs>
          <linearGradient id='countGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#3b82f6' />
            <stop offset='100%' stopColor='#6366f1' />
          </linearGradient>
        </defs>
      </svg>
      <div className='relative flex flex-col items-center'>
        <motion.span
          className='font-mono text-2xl font-extrabold text-white'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
        >
          {daysLeft}
        </motion.span>
        <span className='text-[10px] font-semibold uppercase tracking-widest text-slate-400'>jours</span>
      </div>
    </div>
  );
}

export type AccueilRecent = { href: string; label: string; hint: string };

export type SessionDuJour = {
  title: string;
  points: string[];
  href: string;
  estimatedMinutes: number;
  reason?: string;
};

export type AccueilDashboardProps = {
  loggedIn: boolean;
  programmePct: number;
  infractionsVues: number;
  qcmReussis: number;
  sessionsCount: number;
  recent: AccueilRecent[];
  suggestedSession: SessionDuJour;
};

const quickActions = [
  { label: 'Quiz rapide', href: '/quiz', icon: Brain, color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 hover:border-blue-400/40', iconColor: 'text-blue-400' },
  { label: 'Flashcards', href: '/flashcards', icon: Layers, color: 'from-violet-500/20 to-violet-600/5 border-violet-500/20 hover:border-violet-400/40', iconColor: 'text-violet-400' },
  { label: 'Fondamentaux', href: '/fondamentaux', icon: BookOpen, color: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-400/40', iconColor: 'text-cyan-400' },
  { label: 'Infractions', href: '/infractions', icon: Target, color: 'from-rose-500/20 to-rose-600/5 border-rose-500/20 hover:border-rose-400/40', iconColor: 'text-rose-400' },
];

export function AccueilDashboard({
  loggedIn,
  programmePct,
  infractionsVues,
  qcmReussis,
  sessionsCount,
  recent,
  suggestedSession,
}: AccueilDashboardProps) {
  const now = new Date();
  const ms = EXAM.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(ms / 86400000));
  const pctSafe = Math.min(100, Math.round(programmePct));

  return (
    <div className='relative mx-auto max-w-5xl px-4 pb-24 pt-8 md:pt-14'>
      {/* Background glow */}
      <div
        className='pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[80px]'
        style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Header */}
      <motion.header
        className='mb-10'
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className='inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300'>
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-blue-400' />
          </span>
          Session active
        </div>
        <h1 className='mt-3 font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl'>
          Ton espace de révision
        </h1>
        <p className='mt-2 text-sm text-slate-400'>
          Chaque session compte — avance méthodiquement.
        </p>
      </motion.header>

      {/* Main grid */}
      <div className='grid gap-5 lg:grid-cols-[1fr_minmax(0,300px)]'>
        {/* Session du jour — left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Session card */}
          <div className='relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f1d3a] to-[#0a0f1e] shadow-2xl shadow-black/40'>
            {/* Top gradient bar */}
            <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent' />
            {/* Decorative orb */}
            <div
              className='pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl'
              style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
              aria-hidden
            />

            <div className='relative p-6 md:p-8'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20'>
                    <Zap className='h-4 w-4 text-blue-400' />
                  </div>
                  <p className='text-xs font-bold uppercase tracking-widest text-blue-400'>
                    Session du jour
                  </p>
                </div>
                {suggestedSession.reason ? (
                  <span className='rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-500'>
                    {suggestedSession.reason}
                  </span>
                ) : null}
              </div>

              <h2 className='mt-4 font-sans text-2xl font-extrabold leading-tight text-white md:text-3xl'>
                {suggestedSession.title}
              </h2>

              <p className='mt-2 inline-flex items-center gap-1.5 text-sm text-slate-400'>
                <Clock className='h-4 w-4' aria-hidden />
                ~{suggestedSession.estimatedMinutes} min estimées
              </p>

              <ul className='mt-5 space-y-2'>
                {suggestedSession.points.map((point, i) => (
                  <motion.li
                    key={point}
                    className='flex items-start gap-2.5 text-sm text-slate-300'
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
                  >
                    <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-blue-400/70' aria-hidden />
                    {point}
                  </motion.li>
                ))}
              </ul>

              <div className='mt-8'>
                <Link
                  href={suggestedSession.href}
                  className='group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-400/30'
                >
                  <Sparkles className='h-4 w-4' aria-hidden />
                  Commencer la session
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {quickActions.map((action, i) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.35 }}
              >
                <Link
                  href={action.href}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border bg-gradient-to-b p-4 text-center transition-all duration-200 hover:scale-[1.03] hover:shadow-lg',
                    action.color,
                  )}
                >
                  <action.icon className={cn('h-5 w-5', action.iconColor)} />
                  <span className='text-xs font-semibold text-slate-300'>{action.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className='flex flex-col gap-4'>
          {/* Countdown */}
          <motion.div
            className='relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f1d3a] to-[#0a0f1e] p-6 shadow-xl shadow-black/30'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-slate-400'>
              Compte à rebours
            </p>
            <div className='flex items-center justify-between gap-4'>
              <CountdownRing daysLeft={daysLeft} totalDays={TOTAL_DAYS} />
              <div className='flex-1'>
                <p className='font-sans text-sm font-semibold text-white'>Écrit OPJ 2026</p>
                <p className='mt-0.5 text-xs text-slate-500'>11 juin 2026</p>
                <div className='mt-3 flex items-center gap-1.5'>
                  {daysLeft <= 30 ? (
                    <span className='inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-400'>
                      <Flame className='h-3 w-3' />
                      Sprint final
                    </span>
                  ) : daysLeft <= 60 ? (
                    <span className='inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400'>
                      <TrendingUp className='h-3 w-3' />
                      Accélère !
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400'>
                      <CheckCircle2 className='h-3 w-3' />
                      En bonne voie
                    </span>
                  )}
                </div>
                <Link href='/dashboard/progression' className='mt-3 block text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline'>
                  Mes stats →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Progression */}
          <motion.div
            className='relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f1d3a] to-[#0a0f1e] p-6 shadow-xl shadow-black/30'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent' />
            <div className='mb-4 flex items-center justify-between'>
              <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Progression</p>
              <span className='font-mono text-lg font-extrabold text-white'>{pctSafe}%</span>
            </div>

            {/* Progress bar */}
            <div className='h-2.5 overflow-hidden rounded-full bg-white/[0.06]'>
              <motion.div
                className='h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500'
                initial={{ width: 0 }}
                animate={{ width: `${pctSafe}%` }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
              />
            </div>

            {/* Stats grid */}
            <div className='mt-4 grid grid-cols-3 gap-2'>
              {[
                { value: infractionsVues, label: 'Maîtrisés', color: 'text-emerald-400' },
                { value: qcmReussis, label: 'QCM réussis', color: 'text-blue-400' },
                { value: sessionsCount, label: 'Sessions', color: 'text-violet-400' },
              ].map(({ value, label, color }) => (
                <div key={label} className='rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center'>
                  <p className={cn('font-mono text-xl font-extrabold', color)}>
                    <AnimatedNumber value={value} />
                  </p>
                  <p className='mt-0.5 text-[10px] text-slate-500'>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reprendre */}
      <motion.section
        className='mt-8'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className='mb-4 flex items-center gap-2'>
          <h2 className='font-sans text-lg font-bold text-white'>Reprendre où tu en étais</h2>
          <div className='h-px flex-1 bg-gradient-to-r from-white/10 to-transparent' />
        </div>

        <div className='grid gap-3 md:grid-cols-3'>
          {(loggedIn ? recent : []).map((r, i) => (
            <motion.div
              key={r.href + r.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <Link
                href={r.href}
                className='group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-blue-500/30 hover:bg-blue-500/[0.04] hover:shadow-lg hover:shadow-blue-500/10'
              >
                <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
                <p className='text-[11px] font-medium uppercase tracking-widest text-slate-500'>{r.hint}</p>
                <p className='mt-1.5 font-sans text-sm font-semibold text-slate-200 group-hover:text-white'>{r.label}</p>
                <div className='mt-3 flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300'>
                  Reprendre
                  <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
                </div>
              </Link>
            </motion.div>
          ))}
          {!loggedIn || recent.length === 0 ? (
            <div className='relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-5 md:col-span-3'>
              <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
              <p className='text-sm text-slate-400'>
                {loggedIn
                  ? 'Aucune activité récente. Lance un quiz ou une série de flashcards.'
                  : 'Connecte-toi pour retrouver tes dernières sessions ici.'}
              </p>
              {!loggedIn ? (
                <Link href='/login?next=%2Faccueil' className='mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300'>
                  Se connecter <ArrowRight className='h-4 w-4' />
                </Link>
              ) : (
                <Link href='/quiz' className='mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300'>
                  Lancer un QCM <ArrowRight className='h-4 w-4' />
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </motion.section>
    </div>
  );
}
