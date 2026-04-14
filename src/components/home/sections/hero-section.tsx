'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, HelpCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';

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
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question: HeroQuizQuestion = HERO_QUIZ_QUESTIONS[qIndex] ?? HERO_QUIZ_QUESTIONS[0];
  const totalQ = HERO_QUIZ_QUESTIONS.length;
  const answered = picked !== null;
  const selectedOpt = question.options.find((o) => o.id === picked);
  const isCorrect = selectedOpt?.correct === true;
  const countdownLabel = useMemo(() => formatExamCountdownBadge(), []);

  const handlePick = (id: string) => {
    if (answered) return;
    setPicked(id);
    const opt = question.options.find((o) => o.id === id);
    if (opt?.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (qIndex < totalQ - 1) {
      setQIndex((i) => i + 1);
      setPicked(null);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setQIndex(0);
    setPicked(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <section className='relative min-h-[92vh] overflow-hidden' aria-label='Présentation ExamenOPJ'>
      {/* ── Fond multicouches ── */}
      <div className='pointer-events-none absolute inset-0 bg-[#080F1E]' aria-hidden />

      {/* Orb bleu principal — top-right */}
      <div
        className='pointer-events-none absolute right-[-10%] top-[-8%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,transparent_70%)]'
        aria-hidden
      />
      {/* Orb cyan secondaire — mid-left */}
      <div
        className='pointer-events-none absolute left-[-5%] top-[40%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.09)_0%,transparent_70%)]'
        aria-hidden
      />
      {/* Orb violet subtil — bottom-center */}
      <div
        className='pointer-events-none absolute bottom-[-15%] left-[30%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.07)_0%,transparent_70%)]'
        aria-hidden
      />

      {/* Grille de points */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.035]'
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className='relative z-10 mx-auto grid max-w-6xl min-h-[92vh] grid-cols-1 items-center gap-14 px-4 py-20 lg:grid-cols-2 lg:py-28'>

        {/* ── Colonne gauche ── */}
        <div className='flex flex-col'>

          {/* Badge countdown */}
          <motion.div
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: LANDING_EASE }}
            className='mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5'
          >
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-blue-400' />
            </span>
            <span className='text-xs font-semibold tracking-wide text-blue-300' suppressHydrationWarning>
              {countdownLabel}
            </span>
            <span className='h-3 w-px bg-white/20' />
            <span className='text-xs text-slate-400'>Mis à jour : {SITE_LAST_UPDATED_LABEL}</span>
          </motion.div>

          {/* Titre principal — dégradé doux type premium (pas de cyan flashy) */}
          <div className='space-y-2'>
            <motion.h1
              className='overflow-visible font-display text-5xl font-normal leading-[1.14] tracking-tight sm:text-6xl md:text-[4rem] lg:text-[3.5rem] xl:text-[4.25rem]'
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.06 }}
            >
              <span className='block text-white'>Réussissez</span>
              <span className='mt-1 block overflow-visible pb-0.5'>
                <span
                  className='relative inline-block bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#a5b4fc] bg-clip-text pb-[0.15em] text-transparent drop-shadow-[0_2px_32px_rgba(129,140,248,0.22)]'
                >
                  l&apos;examen OPJ
                </span>
                <span className='text-white'>.</span>
              </span>
            </motion.h1>

            <motion.p
              className='font-sans text-xl font-medium text-slate-300 sm:text-2xl'
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.1 }}
            >
              Infractions · Procédure · PV · Oral
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            className='mt-6 max-w-lg text-base leading-relaxed text-slate-400'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.14 }}
          >
            Méthode structurée alignée sur les fascicules SDCP · Session 2026.
            Savoir quoi réviser, dans quel ordre, et comment le rendre le jour J.
          </motion.p>

          {/* Mini stats inline */}
          <motion.div
            className='mt-7 flex flex-wrap gap-2'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.17 }}
          >
            {[
              { value: '15', label: 'fascicules couverts' },
              { value: '200+', label: 'questions de quiz' },
              { value: '3', label: 'épreuves détaillées' },
            ].map((s) => (
              <span
                key={s.label}
                className='inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300'
              >
                <span className='font-mono font-bold text-white'>{s.value}</span>
                <span className='text-slate-500'>{s.label}</span>
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className='mt-9 flex flex-col gap-3 sm:flex-row sm:items-center'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.2 }}
          >
            <MotionLink
              href='/inscription'
              className={cn(
                'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all',
                'bg-gradient-to-r from-blue-600 to-blue-500',
                'shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:shadow-[0_0_32px_rgba(37,99,235,0.5)]',
                !shouldReduce && 'hover:scale-[1.02] active:scale-[0.98]',
              )}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              {/* Shimmer interne */}
              <span
                className='pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent'
                aria-hidden
              />
              Commencer gratuitement
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' aria-hidden />
            </MotionLink>

            <Link
              href='/entrainement'
              className='inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-400 transition hover:text-white'
            >
              Voir le guide
              <ArrowRight className='size-3.5' aria-hidden />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className='mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <span className='flex items-center gap-1.5'>
              <span className='text-emerald-400'>✓</span>
              Sans carte bancaire
            </span>
            <span className='h-3 w-px bg-white/10' />
            <span className='flex items-center gap-1.5'>
              <span className='text-emerald-400'>✓</span>
              Accès immédiat
            </span>
            <span className='h-3 w-px bg-white/10' />
            <span>
              <span className='font-medium text-slate-300'>{SITE_SOCIAL_PROOF.registeredCandidates} candidats</span> inscrits
            </span>
          </motion.div>

          {/* Signature terrain */}
          <motion.div
            className='mt-8 flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-4 py-3'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <span className='mt-0.5 text-blue-400' aria-hidden>🛡️</span>
            <p className='text-xs leading-relaxed text-slate-400'>
              Rédigé par un gardien de la paix en formation OPJ · Conforme aux fascicules SDCP · Mis à jour en temps réel
            </p>
          </motion.div>
        </div>

        {/* ── Colonne droite — Quiz interactif ── */}
        <motion.div
          className='relative mx-auto w-full max-w-md lg:mx-0'
          initial={MOTION_INITIAL_FOR_SEO}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: LANDING_EASE, delay: 0.18 }}
        >
          {/* Halo derrière la carte */}
          <div
            className='pointer-events-none absolute inset-0 -z-10 scale-110 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_65%)] blur-2xl'
            aria-hidden
          />

          {/* Card quiz */}
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0E1B2E]/90 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl',
              !shouldReduce && 'animate-ex-float',
            )}
          >
            {/* Bord supérieur lumineux */}
            <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' aria-hidden />

            {/* ── Écran de complétion ── */}
            {completed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, type: 'spring', stiffness: 300, damping: 28 }}
                className='flex flex-col items-center px-6 py-10 text-center'
              >
                <span className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/20 text-3xl ring-2 ring-blue-400/30'>
                  <Trophy className='h-8 w-8 text-amber-400' aria-hidden />
                </span>
                <h3 className='mt-4 font-sans text-xl font-extrabold text-white'>
                  {score === totalQ ? 'Parfait !' : score >= totalQ / 2 ? 'Bien joué !' : 'À retravailler'}
                </h3>
                <p className='mt-1 text-sm text-slate-400'>
                  {score} / {totalQ} bonnes réponses
                </p>

                {/* Score visuel */}
                <div className='mt-4 flex gap-1.5'>
                  {Array.from({ length: totalQ }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-2 w-8 rounded-full',
                        i < score ? 'bg-emerald-500' : 'bg-white/10',
                      )}
                    />
                  ))}
                </div>

                <p className='mt-4 text-xs text-slate-500'>
                  {score === totalQ
                    ? 'Excellent niveau sur les bases OPJ !'
                    : 'Le quiz complet vous attend pour aller plus loin.'}
                </p>

                <div className='mt-6 flex flex-col gap-2.5 w-full'>
                  <Link
                    href='/quiz'
                    className='inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'
                  >
                    Continuer le quiz complet
                    <ArrowRight className='h-3.5 w-3.5' aria-hidden />
                  </Link>
                  <button
                    type='button'
                    onClick={handleRestart}
                    className='inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-400 transition hover:border-white/20 hover:text-white'
                  >
                    <RotateCcw className='h-3.5 w-3.5' aria-hidden />
                    Recommencer le diagnostic
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Header quiz */}
                <div className='bg-gradient-to-b from-blue-600/[0.12] to-transparent px-5 pt-5 pb-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400'>
                        <HelpCircle className='h-4.5 w-4.5' aria-hidden />
                      </div>
                      <div>
                        <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>Diagnostic rapide</p>
                        <p className='text-sm font-semibold text-white'>Question {qIndex + 1} / {totalQ}</p>
                      </div>
                    </div>
                    {/* Progress dots */}
                    <div className='flex gap-1.5' role='img' aria-label={`Progression ${qIndex + 1} sur ${totalQ}`}>
                      {Array.from({ length: totalQ }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'h-1.5 rounded-full transition-all duration-300',
                            i < qIndex ? 'w-4 bg-emerald-500' : i === qIndex ? 'w-4 bg-blue-400' : 'w-1.5 bg-white/15',
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corps quiz */}
                <div className='px-5 pb-5'>
                  <p className='mt-1 text-sm leading-relaxed text-slate-200'>{question.prompt}</p>

                  <ul className='mt-4 space-y-2' aria-label='Propositions de réponse'>
                    {question.options.map((row) => {
                      const showFeedback = answered && picked === row.id;
                      return (
                        <motion.li
                          key={row.id}
                          layout
                          onClick={() => handlePick(row.id)}
                          animate={
                            shouldReduce || !showFeedback ? {} :
                              row.correct
                                ? { backgroundColor: ['rgba(34,197,94,0.0)', 'rgba(34,197,94,0.15)', 'rgba(34,197,94,0.1)'] }
                                : { x: [0, -8, 8, -5, 5, 0] }
                          }
                          transition={shouldReduce || !showFeedback ? undefined : { duration: row.correct ? 0.4 : 0.3 }}
                          className={cn(
                            'group flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-all',
                            answered && picked === row.id && row.correct
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-slate-100'
                              : answered && picked === row.id && !row.correct
                                ? 'border-red-500/35 bg-red-500/10 text-slate-200'
                                : 'border-white/[0.06] bg-white/[0.02] text-slate-300 hover:border-blue-500/30 hover:bg-blue-500/[0.05] hover:text-white',
                          )}
                        >
                          <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.06] font-mono text-[11px] font-bold text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-300'>
                            {row.id}
                          </span>
                          <span className='min-w-0 flex-1 leading-relaxed'>{row.text}</span>
                          {showFeedback ? (
                            row.correct
                              ? <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400' aria-hidden />
                              : <XCircle className='mt-0.5 h-4 w-4 shrink-0 text-red-400' aria-hidden />
                          ) : null}
                        </motion.li>
                      );
                    })}
                  </ul>

                  {/* Feedback */}
                  {answered ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        'mt-4 rounded-xl border px-4 py-3 text-sm',
                        isCorrect
                          ? 'border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-50'
                          : 'border-amber-500/25 bg-amber-500/[0.08] text-amber-50',
                      )}
                      role='status'
                    >
                      <p className='font-semibold'>{isCorrect ? '✓ Bonne réponse.' : '✗ À retenir.'}</p>
                      <p className='mt-1 text-slate-300'>{isCorrect ? question.explain : question.wrongHint}</p>
                    </motion.div>
                  ) : null}

                  {/* Actions */}
                  {answered ? (
                    <div className='mt-4 flex items-center justify-between gap-2'>
                      <button
                        type='button'
                        onClick={handleNext}
                        className='inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500'
                      >
                        {qIndex < totalQ - 1 ? 'Question suivante' : 'Voir mes résultats'}
                        <ArrowRight className='h-3.5 w-3.5' aria-hidden />
                      </button>
                      <span className='text-xs text-slate-500'>{score} ✓ sur {qIndex + 1}</span>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>

          {/* Floating badges */}
          <motion.div
            className='absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#0E1B2E] px-3 py-1.5 shadow-lg'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4, type: 'spring' }}
          >
            <span className='flex h-2 w-2 rounded-full bg-emerald-400 animate-ex-pulse-dot' />
            <span className='text-xs font-medium text-emerald-300'>
              Score moyen {SITE_SOCIAL_PROOF.avgQuizScoreLabel}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Séparateur bas */}
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent' aria-hidden />
    </section>
  );
}
