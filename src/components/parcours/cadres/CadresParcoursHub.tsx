'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';

import type { CadresStepSlug } from '@/data/parcours-cadres-enquetes';
import { CADRES_STEPS } from '@/data/parcours-cadres-enquetes';
import { isCadresStepUnlocked } from '@/data/parcours-cadres-unlock';
import type { CadresProgressRow } from '@/features/parcours/cadres-progress';
import { cn } from '@/utils/cn';

type Props = {
  progress: Partial<Record<CadresStepSlug, CadresProgressRow>>;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 26 } },
};

export function CadresParcoursHub({ progress }: Props) {
  const completedCount = CADRES_STEPS.filter((s) => {
    if (s.kind === 'intro') return progress.intro?.lesson_completed;
    if (s.kind === 'synthese') return progress.synthese?.lesson_completed;
    return progress[s.slug]?.quiz_passed;
  }).length;

  const pct = Math.round((completedCount / CADRES_STEPS.length) * 100);

  return (
    <div className='relative'>
      <div
        className='pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/12 blur-[90px]'
        aria-hidden
      />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101525] via-[#0c1018] to-[#06080c] p-8 shadow-2xl ring-1 ring-cyan-500/10'>
          <div
            className='pointer-events-none absolute inset-0 opacity-[0.35]'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className='relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90'>Parcours immersif</p>
              <h1 className='font-display mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl'>
                Cadres d&apos;enquête
              </h1>
              <p className='mt-3 max-w-xl text-sm leading-relaxed text-slate-400'>
                Cinq étapes, trois QCM, une synthèse dorée à débloquer. Progression sauvegardée sur ton compte.
              </p>
            </div>
            <div className='flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 md:items-end'>
              <span className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>Progression</span>
              <div className='flex items-center gap-3'>
                <div className='h-2 w-40 overflow-hidden rounded-full bg-white/10'>
                  <motion.div
                    className='h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400'
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className='text-sm font-bold tabular-nums text-white'>{pct}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.ol
        variants={container}
        initial='hidden'
        animate='show'
        className='relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3'
      >
        {CADRES_STEPS.map((step, i) => {
          const unlocked = isCadresStepUnlocked(step.slug, progress);
          const done =
            step.kind === 'intro'
              ? progress.intro?.lesson_completed
              : step.kind === 'synthese'
                ? progress.synthese?.lesson_completed
                : progress[step.slug]?.quiz_passed;
          const Icon = step.Icon;

          return (
            <motion.li key={step.slug} variants={item} className='relative'>
              <div
                className={cn(
                  'absolute -left-1 top-8 hidden h-px w-4 bg-gradient-to-r from-transparent to-white/20 xl:block',
                  i === 0 && 'hidden',
                )}
              />
              <Link
                href={unlocked ? `/entrainement/parcours/cadres-enquetes/${step.slug}` : '#'}
                scroll={false}
                className={cn(
                  'group relative block overflow-hidden rounded-2xl border p-5 transition',
                  unlocked
                    ? 'border-white/10 bg-gradient-to-br hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10'
                    : 'cursor-not-allowed border-white/5 bg-white/[0.02] opacity-60',
                  `bg-gradient-to-br ${step.gradient}`,
                )}
                onClick={(e) => {
                  if (!unlocked) e.preventDefault();
                }}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl',
                    unlocked ? 'bg-cyan-400/10' : 'bg-white/5',
                  )}
                />
                <div className='relative flex items-start justify-between gap-3'>
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white shadow-inner',
                      step.glow,
                    )}
                  >
                    <Icon className='h-6 w-6' aria-hidden />
                  </span>
                  {!unlocked ? (
                    <Lock className='h-4 w-4 text-slate-500' aria-label='Verrouillé' />
                  ) : done ? (
                    <span className='rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-200'>
                      OK
                    </span>
                  ) : (
                    <span className='rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-white/80'>
                      À faire
                    </span>
                  )}
                </div>
                <h2 className='relative mt-4 font-display text-lg font-bold text-white'>{step.shortTitle}</h2>
                <p className='relative mt-1 text-sm text-slate-300/90'>{step.subtitle}</p>
                {step.kind === 'synthese' && (
                  <p className='relative mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200/90'>
                    <Sparkles className='h-3.5 w-3.5' />
                    Récompense finale
                  </p>
                )}
                {unlocked && (
                  <motion.span
                    className='relative mt-4 inline-flex text-xs font-semibold text-cyan-300'
                    whileHover={{ x: 4 }}
                  >
                    Entrer dans l&apos;étape →
                  </motion.span>
                )}
              </Link>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
