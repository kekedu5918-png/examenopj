'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Keyboard, Layers, ListOrdered, Shuffle } from 'lucide-react';

import {
  FreemiumDailyQuotaProgress,
  FreemiumQuizDailyLimitWall,
} from '@/components/access/freemium-daily-quota';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { type QuizQuestion } from '@/data/types';
import { cn } from '@/utils/cn';

import { type QuizAnswerMode, type QuizMode } from './quiz-utils';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const headerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export type QuizSetupViewProps = {
  maxDailyQuiz: number | null;
  quizUsedToday: number;
  quizRemainingToday: number | null;
  streakDays: number;
  localBest: number | null;
  mode: QuizMode;
  setMode: (m: QuizMode) => void;
  fascicule: number;
  setFascicule: (n: number) => void;
  domain: QuizQuestion['domaine'];
  setDomain: (d: QuizQuestion['domaine']) => void;
  fasciculeOptions: { numero: number; titre: string }[];
  limit: 10 | 20 | 30 | 'all';
  setLimit: (l: 10 | 20 | 30 | 'all') => void;
  answerMode: QuizAnswerMode;
  setAnswerMode: (a: QuizAnswerMode) => void;
  poolPreviewLength: number;
  onLaunch: () => void;
  /** Mur quota atteint : affiche uniquement le bandeau freemium. */
  quotaBlocked: boolean;
};

export function QuizSetupView({
  maxDailyQuiz,
  quizUsedToday,
  quizRemainingToday,
  streakDays,
  localBest,
  mode,
  setMode,
  fascicule,
  setFascicule,
  domain,
  setDomain,
  fasciculeOptions,
  limit,
  setLimit,
  answerMode,
  setAnswerMode,
  poolPreviewLength,
  onLaunch,
  quotaBlocked,
}: QuizSetupViewProps) {
  if (quotaBlocked) {
    return (
      <InteriorPageShell fullBleed maxWidth='5xl' glow={SHELL_GLOW.quiz} pad='default'>
        <motion.header variants={headerContainer} initial='hidden' animate='visible' className='mb-10'>
          <motion.div variants={headerItem}>
            <SectionTitle
              badge='ENTRAÎNEMENT'
              badgeClassName='text-cyan-300'
              title='Quiz OPJ'
              titleGradient
              size='display'
              subtitle='QCM ou mode hardcore : réponses libres, comme à l’oral ou au papier'
            />
          </motion.div>
        </motion.header>
        <FreemiumQuizDailyLimitWall />
      </InteriorPageShell>
    );
  }

  return (
    <InteriorPageShell fullBleed maxWidth='5xl' glow={SHELL_GLOW.quiz} pad='default'>
      <motion.header variants={headerContainer} initial='hidden' animate='visible' className='mb-12'>
        <motion.div variants={headerItem}>
          <SectionTitle
            badge='ENTRAÎNEMENT'
            badgeClassName='text-blue-300'
            title='Quiz OPJ'
            titleGradient
            size='display'
            subtitle='QCM ou mode hardcore : réponses libres, comme à l’oral ou au papier'
          />
        </motion.div>
      </motion.header>

      <div className='mb-8 flex flex-col items-center gap-2 text-center text-sm text-slate-400'>
        {streakDays > 0 ? (
          <p
            className='inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 text-amber-200'
            aria-live='polite'
          >
            <Flame className='h-4 w-4 shrink-0 text-amber-400' aria-hidden />
            <span>
              Série : <strong className='font-semibold text-white'>{streakDays}</strong> jour
              {streakDays > 1 ? 's' : ''} consécutif{streakDays > 1 ? 's' : ''} avec au moins un quiz
            </span>
          </p>
        ) : null}
        <p>
          {localBest != null ? (
            <>
              Record sur ce mode : <span className='font-semibold text-cyan-400'>{localBest}%</span>
            </>
          ) : (
            'Choisissez un mode et lancez une série.'
          )}
        </p>
      </div>

      {maxDailyQuiz != null && quizUsedToday < maxDailyQuiz ? (
        <FreemiumDailyQuotaProgress used={quizUsedToday} max={maxDailyQuiz} unit='quiz' />
      ) : null}

      <div className='mx-auto mb-10 max-w-3xl rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.07] px-5 py-4 text-center text-sm text-cyan-50'>
        <p className='font-semibold text-cyan-100'>Parcours conseillé</p>
        <p className='mt-2 text-cyan-50/95'>
          <strong>L’examen n’est pas en QCM.</strong> Le QCM sert à accélérer la reconnaissance des points ; le mode{' '}
          <strong>hardcore</strong> (saisie libre) rapproche l’entraînement de l’écrit et de l’oral à l’examen OPJ. Enchaînez :
          quelques séries QCM pour la couverture, puis les mêmes thèmes en hardcore.
        </p>
      </div>

      <div className='mx-auto max-w-3xl'>
        <p className='mb-3 text-center text-sm font-medium text-slate-300'>Portée du quiz</p>
        <div
          role='tablist'
          aria-label='Choisir la portée du quiz'
          className='flex flex-col gap-2 rounded-2xl border border-ds-border bg-ds-bg-secondary/95 p-1.5 dark:border-white/[0.08] dark:bg-navy-950/80 sm:flex-row sm:items-stretch'
        >
          {(
            [
              { id: 'module' as const, label: 'Module thématique', hint: 'Un thème du programme (01–18)', Icon: BookOpen },
              { id: 'domain' as const, label: 'Par domaine', hint: 'DPS · DPG · Procédure', Icon: Layers },
              { id: 'global' as const, label: 'Quiz global', hint: 'Tout mélangé', Icon: Shuffle },
            ] as const
          ).map(({ id, label, hint, Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type='button'
                role='tab'
                aria-selected={active}
                onClick={() => setMode(id)}
                className={cn(
                  'flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors sm:min-h-[4.25rem]',
                  active
                    ? 'bg-cyan-500/15 text-white ring-1 ring-cyan-500/40'
                    : 'text-slate-300 hover:bg-white/[0.04] hover:text-slate-100',
                )}
              >
                <span
                  className={cn(
                    'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border',
                    active ? 'border-cyan-400/35 bg-cyan-500/10 text-cyan-300' : 'border-white/10 bg-white/[0.03]',
                  )}
                >
                  <Icon className='h-5 w-5' strokeWidth={1.5} aria-hidden />
                </span>
                <span className='min-w-0'>
                  <span className='block text-sm font-semibold leading-tight'>{label}</span>
                  <span className='mt-0.5 block text-xs text-slate-400'>{hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className='mt-6'
        >
          <GlassCard hover={false} padding='p-6' className='border border-white/[0.07]'>
            {mode === 'module' ? (
              <div>
                <h3 className='text-sm font-semibold text-white'>Thème du programme</h3>
                <p className='mt-1 text-sm text-slate-400'>
                  Sélectionnez le thème (les questions sont filtrées sur ce bloc pédagogique).
                </p>
                <label className='mt-4 block'>
                  <span className='sr-only'>Thème du programme</span>
                  <select
                    value={fascicule}
                    onChange={(e) => setFascicule(Number(e.target.value))}
                    className='mt-2 w-full rounded-xl border border-ds-border bg-ds-bg-primary px-3 py-3 text-sm text-ds-text-primary focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:border-white/15 dark:bg-navy-900/90'
                  >
                    {fasciculeOptions.map((f) => (
                      <option
                        key={f.numero}
                        value={f.numero}
                        className='bg-ds-bg-primary text-ds-text-primary dark:bg-navy-900'
                      >
                        Thème {String(f.numero).padStart(2, '0')} — {f.titre}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : null}

            {mode === 'domain' ? (
              <div>
                <h3 className='text-sm font-semibold text-white'>Domaine</h3>
                <p className='mt-1 text-sm text-slate-400'>Regroupe les questions par grande famille (étiquettes du jeu de données).</p>
                <fieldset className='mt-4 space-y-2'>
                  <legend className='sr-only'>Domaine</legend>
                  {(
                    [
                      { v: 'DPS' as const, label: 'DPS', cls: 'border-red-500/30 text-red-300' },
                      { v: 'DPG' as const, label: 'DPG', cls: 'border-violet-500/30 text-violet-300' },
                      {
                        v: 'Procédure pénale' as const,
                        label: 'Procédure pénale',
                        cls: 'border-blue-500/30 text-blue-300',
                      },
                    ] as const
                  ).map(({ v, label, cls }) => (
                    <label
                      key={v}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-colors',
                        domain === v ? cls + ' bg-white/[0.06]' : 'border-white/10 text-slate-300 hover:border-white/15',
                      )}
                    >
                      <input
                        type='radio'
                        name='quiz-domain'
                        checked={domain === v}
                        onChange={() => setDomain(v)}
                        className='accent-cyan-500'
                      />
                      {label}
                    </label>
                  ))}
                </fieldset>
              </div>
            ) : null}

            {mode === 'global' ? (
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-sm font-semibold text-white'>Mélange complet</h3>
                  <p className='mt-1 max-w-xl text-sm text-slate-400'>
                    Toutes les questions disponibles sont mélangées (hors filtres exclus par le jeu de données).
                  </p>
                </div>
                <Shuffle className='h-12 w-12 shrink-0 text-cyan-500/40' strokeWidth={1} aria-hidden />
              </div>
            ) : null}
          </GlassCard>
        </motion.div>
      </div>

      <div className='mx-auto mt-10 max-w-xl'>
        <p className='mb-3 text-center text-sm font-medium text-slate-300'>Format des réponses</p>
        <div className='mb-8 flex flex-wrap justify-center gap-2'>
          <button
            type='button'
            onClick={() => setAnswerMode('mcq')}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              answerMode === 'mcq'
                ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-500/45'
                : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]',
            )}
          >
            <ListOrdered className='h-4 w-4 opacity-80' aria-hidden />
            QCM (4 choix)
          </button>
          <button
            type='button'
            onClick={() => setAnswerMode('hardcore')}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              answerMode === 'hardcore'
                ? 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/45'
                : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]',
            )}
          >
            <Keyboard className='h-4 w-4 opacity-80' aria-hidden />
            Hardcore (saisie libre)
          </button>
        </div>
        <p className='mb-3 text-center text-sm font-medium text-slate-300'>Nombre de questions</p>
        <div className='flex flex-wrap justify-center gap-2'>
          {([10, 20, 30, 'all'] as const).map((n) => {
            const want = n === 'all' ? 999 : n;
            const disabledFreemium =
              quizRemainingToday != null && (want > quizRemainingToday || quizRemainingToday === 0);
            return (
              <button
                key={String(n)}
                type='button'
                disabled={disabledFreemium}
                onClick={() => setLimit(n)}
                className={cn(
                  'rounded-xl px-5 py-2.5 text-sm font-medium transition-colors',
                  limit === n
                    ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-500/40'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]',
                  disabledFreemium && 'cursor-not-allowed opacity-35',
                )}
              >
                {n === 'all' ? 'Toutes' : n}
              </button>
            );
          })}
        </div>
      </div>

      <div className='mt-12 flex flex-col items-center gap-6'>
        {poolPreviewLength === 0 ? (
          <p className='max-w-lg text-center text-sm leading-relaxed text-rose-200/95'>
            Aucune question valide pour cette sélection (entrées filtrées : énoncé trop court, options manquantes ou
            correction hors plage). Choisissez un autre module, le quiz global ou le domaine « Procédure » — les jeux
            mélangés contiennent en général plus de volume.
          </p>
        ) : (
          <p className='text-center text-sm text-slate-300'>
            <span className='font-semibold tabular-nums text-cyan-300/90'>{poolPreviewLength}</span> question
            {poolPreviewLength > 1 ? 's' : ''} prête{poolPreviewLength > 1 ? 's' : ''} pour une série avec les réglages
            actuels (après mélange et plafond éventuel).
          </p>
        )}
        <button
          type='button'
          onClick={onLaunch}
          disabled={poolPreviewLength === 0}
          className='rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40'
        >
          Lancer le quiz →
        </button>
        <Link href='/' className='text-sm text-slate-400 hover:text-slate-200'>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </InteriorPageShell>
  );
}
