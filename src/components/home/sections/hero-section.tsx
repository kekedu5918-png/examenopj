'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';

import { HERO_QUIZ_QUESTIONS, type HeroQuizQuestion } from '@/components/home/hero-quiz-data';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { SITE_LAST_UPDATED_LABEL, SITE_SOCIAL_PROOF } from '@/constants/site';
import { formatExamCountdownBadge } from '@/lib/exam-countdown';
import { cn } from '@/utils/cn';

export function HeroSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const question: HeroQuizQuestion = HERO_QUIZ_QUESTIONS[qIndex] ?? HERO_QUIZ_QUESTIONS[0];
  const totalQ = HERO_QUIZ_QUESTIONS.length;
  const answered = picked !== null;
  const selectedOpt = question.options.find((o) => o.id === picked);
  const isCorrect = selectedOpt?.correct === true;

  const countdownLabel = useMemo(() => formatExamCountdownBadge(), []);

  const handlePick = (id: string) => {
    if (answered) return;
    setPicked(id);
  };

  const handleNext = () => {
    if (qIndex < totalQ - 1) {
      setQIndex((i) => i + 1);
      setPicked(null);
    }
  };

  return (
    <section className='relative min-h-[88vh] overflow-hidden border-b border-white/[0.06]'>
      {/* Fond : gradient navy + grain */}
      <div
        className='pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,#0C1B33_0%,#152238_45%,#0C1B33_100%)]'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className='relative z-10 mx-auto grid max-w-6xl min-h-[88vh] grid-cols-1 items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24'>
        <div>
          <motion.div
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE }}
            className='mb-6 inline-flex max-w-lg flex-col gap-1 rounded-2xl border border-orde-blue500/25 bg-orde-navy800/80 px-4 py-3 sm:flex-row sm:items-center sm:gap-3'
          >
            <span
              className={cn(
                'inline-flex items-center rounded-md bg-orde-blue500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-orde-blue400',
                !shouldReduce && 'animate-countdown-pulse',
              )}
              suppressHydrationWarning
            >
              {countdownLabel}
            </span>
            <span className='text-sm font-medium leading-snug text-slate-300'>
              Mis à jour : {SITE_LAST_UPDATED_LABEL}
            </span>
          </motion.div>

          <div className='space-y-3'>
            <motion.h1
              className='font-display text-4xl font-normal leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.25rem]'
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.05 }}
            >
              Réussissez l&apos;examen OPJ.
            </motion.h1>
            <motion.p
              className='font-sans text-lg font-medium text-slate-300 sm:text-xl md:text-2xl'
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.08 }}
            >
              Infractions, procédure, PV — exactement ce que le jury attend.
            </motion.p>
          </div>

          <motion.p
            className='mt-8 max-w-xl text-base leading-relaxed text-slate-400'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.12 }}
          >
            Méthode structurée, contenu aligné sur les fascicules SDCP · Session 2026. Pas de blabla : vous saurez quoi
            réviser, dans quel ordre, et comment le rendre le jour J.
          </motion.p>

          <motion.div
            className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.18 }}
          >
            <MotionLink
              href='/inscription'
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-md bg-orde-blue500 px-8 py-3.5 text-base font-semibold text-white shadow-md transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-orde-blue400/60',
                !shouldReduce && 'hover:bg-orde-blue400 active:scale-[0.98] active:bg-orde-blue600',
              )}
              whileTap={{ scale: 0.98 }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              Commencer gratuitement
              <ArrowRight className='size-4' aria-hidden />
            </MotionLink>
          </motion.div>

          <motion.p
            className='mt-5 text-sm text-slate-500'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.22 }}
          >
            <span className='text-examen-success'>✓</span> Sans carte bancaire · Accès immédiat
          </motion.p>

          <motion.p
            className='mt-6 text-sm text-slate-500'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.26 }}
          >
            <span className='font-medium text-slate-400'>{SITE_SOCIAL_PROOF.registeredCandidates} candidats inscrits</span>
            <span className='mx-2 text-slate-600'>·</span>
            Note moyenne aux quiz :{' '}
            <span className='font-medium text-slate-300'>{SITE_SOCIAL_PROOF.avgQuizScoreLabel}</span>
          </motion.p>

          <motion.p
            className='mt-8 max-w-2xl border-l-[3px] border-orde-blue500/70 pl-4 text-sm leading-relaxed text-slate-400'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            Rédigé par un gardien de la paix en formation OPJ · Conforme aux fascicules SDCP · Session 2026
          </motion.p>
        </div>

        <motion.div
          className='relative mx-auto w-full max-w-md lg:mx-0'
          initial={MOTION_INITIAL_FOR_SEO}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LANDING_EASE, delay: 0.15 }}
        >
          <div
            className='pointer-events-none absolute inset-0 -z-10 scale-105 rounded-lg bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_65%)]'
            aria-hidden
          />
          <div className={cn('rounded-lg border border-white/[0.08] bg-orde-navy800/95 p-6 shadow-lg shadow-black/20', !shouldReduce && 'animate-ex-float')}>
            <div className='mb-4 flex items-center justify-between gap-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-md bg-orde-blue500/15 text-orde-blue400'>
                  <HelpCircle className='h-5 w-5' aria-hidden />
                </div>
                <div>
                  <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>Quiz express</p>
                  <p className='text-sm font-semibold text-white'>
                    Question {qIndex + 1}/{totalQ}
                  </p>
                </div>
              </div>
            </div>
            <p className='text-sm leading-relaxed text-slate-300'>{question.prompt}</p>
            <ul className='mt-4 space-y-2' aria-label='Propositions de réponse'>
              {question.options.map((row) => {
                const showFeedback = answered && picked === row.id;
                const wrongShake = showFeedback && !row.correct;
                return (
                  <motion.li
                    key={row.id}
                    layout
                    onClick={() => handlePick(row.id)}
                    animate={
                      shouldReduce || !showFeedback
                        ? {}
                        : row.correct
                          ? { backgroundColor: ['rgba(34,197,94,0.08)', 'rgba(34,197,94,0.18)', 'rgba(34,197,94,0.1)'] }
                          : wrongShake
                            ? { x: [0, -7, 7, -5, 5, 0] }
                            : {}
                    }
                    transition={shouldReduce || !showFeedback ? undefined : { duration: row.correct ? 0.45 : 0.35 }}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors',
                      answered && picked === row.id && row.correct && 'border-emerald-500/40 bg-emerald-500/10 text-slate-100',
                      answered && picked === row.id && !row.correct && 'border-red-500/35 bg-red-500/10 text-slate-200',
                      (!answered || picked !== row.id) && 'border-white/[0.06] bg-white/[0.02] text-slate-300 hover:border-white/10',
                    )}
                  >
                    <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] font-mono text-xs font-semibold text-white'>
                      {row.id}
                    </span>
                    <span className='min-w-0 flex-1 font-sans'>{row.text}</span>
                    {showFeedback ? (
                      row.correct ? (
                        <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400' aria-hidden />
                      ) : (
                        <XCircle className='mt-0.5 h-4 w-4 shrink-0 text-red-400' aria-hidden />
                      )
                    ) : null}
                  </motion.li>
                );
              })}
            </ul>

            {answered ? (
              <div
                className={cn(
                  'mt-4 rounded-md border px-3 py-2.5 text-sm',
                  isCorrect ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-50' : 'border-red-500/20 bg-red-500/10 text-red-50',
                )}
                role='status'
              >
                <p className='font-medium'>{isCorrect ? 'Bonne réponse.' : 'À retenir.'}</p>
                <p className='mt-1 text-slate-200/95'>{isCorrect ? question.explain : question.wrongHint}</p>
              </div>
            ) : null}

            {answered ? (
              <div className='mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                {qIndex < totalQ - 1 ? (
                  <button
                    type='button'
                    onClick={handleNext}
                    className='inline-flex items-center justify-center gap-2 rounded-md bg-orde-blue500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orde-blue400'
                  >
                    Question suivante
                    <ArrowRight className='h-4 w-4' aria-hidden />
                  </button>
                ) : (
                  <Link
                    href='/quiz'
                    className='inline-flex items-center justify-center gap-2 rounded-md bg-orde-blue500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orde-blue400'
                  >
                    Voir toutes les questions
                    <ArrowRight className='h-4 w-4' aria-hidden />
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
