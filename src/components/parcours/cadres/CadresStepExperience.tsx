'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, PartyPopper, Zap } from 'lucide-react';

import { MarkdownArticle } from '@/components/content/MarkdownArticle';
import {
  CADRES_QUIZ_PASS_PCT,
  CADRES_QUIZZES,
  type CadresStepMeta,
  type CadresStepSlug,
} from '@/data/parcours-cadres-enquetes';
import { isCadresStepUnlocked } from '@/data/parcours-cadres-unlock';
import { cadresMarkLessonCompleteAction, cadresSubmitQuizAction } from '@/features/parcours/cadres-enquetes-actions';
import type { CadresProgressRow } from '@/features/parcours/cadres-progress';
import { cn } from '@/utils/cn';

type Props = {
  step: CadresStepMeta;
  markdown: string;
  progress: Partial<Record<CadresStepSlug, CadresProgressRow>>;
};

export function CadresStepExperience({ step, markdown, progress }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const unlocked = isCadresStepUnlocked(step.slug, progress);

  const [phase, setPhase] = useState<'lesson' | 'quiz' | 'done'>(() => {
    if (step.kind === 'intro') {
      return progress.intro?.lesson_completed ? 'done' : 'lesson';
    }
    if (step.kind === 'synthese') {
      return progress.synthese?.lesson_completed ? 'done' : 'lesson';
    }
    const p = progress[step.slug];
    if (p?.quiz_passed) return 'done';
    if (p?.lesson_completed) return 'quiz';
    return 'lesson';
  });

  const quiz = useMemo(() => {
    if (step.kind !== 'lesson') return null;
    return CADRES_QUIZZES[step.slug as keyof typeof CADRES_QUIZZES] ?? null;
  }, [step]);

  const [answers, setAnswers] = useState<number[]>(() => (quiz ? quiz.map(() => 0) : []));
  const [result, setResult] = useState<{ scorePct: number; passed: boolean } | null>(null);

  if (!unlocked) {
    return (
      <div className='rounded-2xl border border-rose-500/30 bg-rose-950/30 p-8 text-center'>
        <p className='text-lg font-semibold text-white'>Étape encore verrouillée</p>
        <p className='mt-2 text-sm text-slate-400'>Termine l&apos;étape précédente pour continuer.</p>
        <Link
          href='/entrainement/parcours/cadres-enquetes'
          className='mt-6 inline-flex rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15'
        >
          Retour au parcours
        </Link>
      </div>
    );
  }

  async function onCompleteLesson() {
    startTransition(async () => {
      const r = await cadresMarkLessonCompleteAction(step.slug);
      if (r.ok) {
        if (step.kind === 'intro' || step.kind === 'synthese') {
          setPhase('done');
        } else {
          setPhase('quiz');
        }
        router.refresh();
      }
    });
  }

  async function onSubmitQuiz() {
    if (!quiz || step.kind !== 'lesson') return;
    startTransition(async () => {
      const r = await cadresSubmitQuizAction(step.slug as CadresStepSlug, answers);
      if (r.ok) {
        setResult({ scorePct: r.scorePct, passed: r.passed });
        if (r.passed) setPhase('done');
        router.refresh();
      }
    });
  }

  return (
    <div className='relative'>
      <Link
        href='/entrainement/parcours/cadres-enquetes'
        className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white'
      >
        <ArrowLeft className='h-4 w-4' />
        Carte du parcours
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative overflow-hidden rounded-3xl border p-6 md:p-8',
          'border-white/10 bg-gradient-to-br shadow-xl ring-1 ring-white/5',
          step.gradient,
        )}
      >
        <div className='relative flex flex-wrap items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-white/70'>{step.shortTitle}</p>
            <h1 className='font-display mt-2 text-2xl font-bold text-white md:text-3xl'>{step.title}</h1>
            <p className='mt-2 max-w-2xl text-sm text-slate-200/85'>{step.subtitle}</p>
          </div>
          <span className='rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90'>
            Sauvegardé sur ton compte
          </span>
        </div>
      </motion.header>

      <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_380px]'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className='rounded-2xl border border-white/10 bg-[#0a0c10]/85 p-6 shadow-inner shadow-black/40 backdrop-blur-sm md:p-8'
        >
          <MarkdownArticle
            markdown={markdown}
            className='prose prose-invert max-w-none prose-headings:font-display prose-h2:text-xl prose-h2:text-cyan-100 prose-p:text-slate-300 prose-strong:text-white prose-li:marker:text-cyan-400'
          />
        </motion.div>

        <aside className='lg:sticky lg:top-24 lg:self-start'>
          <AnimatePresence mode='wait'>
            {phase === 'lesson' && (
              <motion.div
                key='lesson'
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className='rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-cyan-950/40 to-[#07080c] p-5 shadow-lg shadow-cyan-500/10'
              >
                <div className='flex items-center gap-2 text-cyan-200'>
                  <Zap className='h-5 w-5' />
                  <span className='text-sm font-bold'>Action</span>
                </div>
                <p className='mt-3 text-xs leading-relaxed text-slate-400'>
                  {step.kind === 'intro' && 'Valide cette introduction pour débloquer la leçon sur la flagrance.'}
                  {step.kind === 'synthese' && 'Enregistre ta lecture pour garder la synthèse dans ta progression.'}
                  {step.kind === 'lesson' && 'Indique que tu as parcouru la leçon avant le mini-QCM.'}
                </p>
                <button
                  type='button'
                  disabled={pending}
                  onClick={() => onCompleteLesson()}
                  className='mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:opacity-95 disabled:opacity-50'
                >
                  {pending ? 'Enregistrement…' : step.kind === 'lesson' ? 'J’ai lu — passer au QCM' : 'Valider et continuer'}
                </button>
              </motion.div>
            )}

            {phase === 'quiz' && quiz && (
              <motion.div
                key='quiz'
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className='space-y-4 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-violet-950/50 to-[#07080c] p-5 shadow-lg shadow-violet-500/15'
              >
                <p className='text-sm font-bold text-violet-100'>Mini-QCM ({CADRES_QUIZ_PASS_PCT}% pour valider)</p>
                {quiz.map((q, qi) => (
                  <div key={q.id} className='rounded-xl border border-white/10 bg-black/30 p-3'>
                    <p className='text-xs font-medium leading-snug text-white'>{q.prompt}</p>
                    <div className='mt-2 space-y-1.5'>
                      {q.options.map((opt, oi) => (
                        <label
                          key={oi}
                          className={cn(
                            'flex cursor-pointer items-start gap-2 rounded-lg border px-2 py-1.5 text-[11px] transition',
                            answers[qi] === oi
                              ? 'border-violet-400/50 bg-violet-500/15 text-white'
                              : 'border-transparent hover:bg-white/5',
                          )}
                        >
                          <input
                            type='radio'
                            className='mt-0.5'
                            checked={answers[qi] === oi}
                            onChange={() => {
                              setAnswers((prev) => {
                                const n = [...prev];
                                n[qi] = oi;
                                return n;
                              });
                            }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type='button'
                  disabled={pending}
                  onClick={() => onSubmitQuiz()}
                  className='w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25'
                >
                  {pending ? 'Correction…' : 'Valider mes réponses'}
                </button>
                {result && !result.passed && (
                  <p className='text-center text-xs text-amber-200'>
                    Score {result.scorePct}% — réessaie pour atteindre {CADRES_QUIZ_PASS_PCT}%.
                  </p>
                )}
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div
                key='done'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='overflow-hidden rounded-2xl border border-emerald-500/35 bg-gradient-to-b from-emerald-950/50 to-[#07080c] p-6 text-center shadow-lg shadow-emerald-500/15'
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200'
                >
                  {step.kind === 'synthese' ? <PartyPopper className='h-8 w-8' /> : <CheckCircle2 className='h-8 w-8' />}
                </motion.div>
                <p className='mt-4 font-display text-lg font-bold text-white'>
                  {step.kind === 'synthese' ? 'Parcours terminé' : 'Étape validée'}
                </p>
                <p className='mt-1 text-xs text-slate-400'>
                  {step.kind === 'synthese'
                    ? 'Tu peux revenir à tout moment sur cette synthèse.'
                    : 'Ta progression est enregistrée sur ton compte.'}
                </p>
                <Link
                  href='/entrainement/parcours/cadres-enquetes'
                  className='mt-6 inline-flex w-full justify-center rounded-xl bg-white/10 py-3 text-sm font-semibold text-white hover:bg-white/15'
                >
                  Retour à la carte
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}
