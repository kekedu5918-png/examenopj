'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Keyboard, Layers, ListOrdered, Shuffle } from 'lucide-react';

import {
  FreemiumDailyQuotaProgress,
  FreemiumQuizDailyLimitWall,
} from '@/components/access/freemium-daily-quota';
import { LANDING_EASE } from '@/components/home/motion';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { fasciculesList } from '@/data/fascicules-list';
import { quizQuestions } from '@/data/quiz-questions';
import { type QuizQuestion } from '@/data/types';
import { addDailyQuizQuestionCount, getDailyQuizQuestionCount } from '@/features/access/daily-quota-client';
import type { ContentAccessSnapshot } from '@/features/access/get-content-access';
import { recordQuizAttempt } from '@/features/examenopj/actions/record-quiz-attempt';
import { getQuizStreak, recordQuizCompleted, recordThemePerfectScore } from '@/lib/quiz-gamification';
import { cn } from '@/utils/cn';

import { QuizInterface, type QuizMcqSessionResult } from './quiz-interface';
import { QuizInterfaceHardcore } from './quiz-interface-hardcore';
import {
  applyQuestionLimit,
  filterQuestions,
  fisherYates,
  getQuizStorageKey,
  isThemeQuizMode,
  type QuizAnswerMode,
  type QuizMode,
  readBestQuizPercent,
  recordModuleQuizBestPercent,
  recordQuizBestPercent,
  shuffleQuizQuestionOptions,
} from './quiz-utils';
import { SessionComplete } from './SessionComplete';

const ease = [...LANDING_EASE] as [number, number, number, number];

type Phase = 'setup' | 'quiz' | 'result';

type LaunchConfig = {
  mode: QuizMode;
  fascicule?: number;
  domain?: QuizQuestion['domaine'];
  limit: 10 | 20 | 30 | 'all';
  answerMode: QuizAnswerMode;
};

const headerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

type QuizPageClientProps = {
  /** Défini par la page serveur (Premium, essai 7 j, ou freemium). */
  initialAccess?: ContentAccessSnapshot;
};

export function QuizPageClient({ initialAccess }: QuizPageClientProps) {
  const searchParams = useSearchParams();

  const access: ContentAccessSnapshot = initialAccess ?? {
    tier: 'full',
    maxQuizQuestionsPerDay: null,
    maxFlashcardsPerDay: null,
  };

  const fasciculeNums = useMemo(
    () => [...new Set(quizQuestions.map((q) => q.fascicule))].sort((a, b) => a - b),
    []
  );

  const fasciculeOptions = useMemo(() => {
    return fasciculeNums
      .map((n) => {
        const meta = fasciculesList.find((f) => f.numero === n);
        return { numero: n, titre: meta?.titre ?? `Thème F${String(n).padStart(2, '0')}` };
      })
      .filter(Boolean);
  }, [fasciculeNums]);

  const [phase, setPhase] = useState<Phase>('setup');
  const [mode, setMode] = useState<QuizMode>('global');
  const [fascicule, setFascicule] = useState<number>(fasciculeNums[0] ?? 3);
  const [domain, setDomain] = useState<QuizQuestion['domaine']>('DPS');
  const [limit, setLimit] = useState<10 | 20 | 30 | 'all'>(10);
  const [answerMode, setAnswerMode] = useState<QuizAnswerMode>('mcq');
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [launchConfig, setLaunchConfig] = useState<LaunchConfig | null>(null);
  const [sessionResult, setSessionResult] = useState<QuizMcqSessionResult | null>(null);
  const [lastQuizPersonalBest, setLastQuizPersonalBest] = useState(false);
  const [quotaTick, setQuotaTick] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    if (phase === 'setup') setQuotaTick((t) => t + 1);
  }, [phase]);

  useEffect(() => {
    setStreakDays(getQuizStreak());
  }, [phase]);

  const maxDailyQuiz = access.maxQuizQuestionsPerDay;
  const quizUsedToday = useMemo(() => {
    if (maxDailyQuiz == null) return 0;
    void quotaTick;
    return getDailyQuizQuestionCount();
  }, [maxDailyQuiz, quotaTick]);

  const quizRemainingToday = useMemo(() => {
    if (maxDailyQuiz == null) return null;
    return Math.max(0, maxDailyQuiz - quizUsedToday);
  }, [maxDailyQuiz, quizUsedToday]);

  const storageKey = useMemo(
    () =>
      getQuizStorageKey(
        mode,
        isThemeQuizMode(mode) ? fascicule : undefined,
        mode === 'domain' ? domain : undefined,
        answerMode
      ),
    [mode, fascicule, domain, answerMode]
  );

  const [localBest, setLocalBest] = useState<number | null>(null);
  useEffect(() => {
    if (phase !== 'setup') return;
    setLocalBest(readBestQuizPercent(storageKey));
  }, [storageKey, phase]);

  /** `?hardcore=1` : mode réponse libre au chargement (une fois, évite d’écraser le choix utilisateur). */
  useEffect(() => {
    const p = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('hardcore') : null;
    if (p === '1' || p === 'true') {
      setAnswerMode('hardcore');
    }
  }, []);

  /** Liens profonds : `/quiz?f=f03`, `/quiz?mode=module&f=3` (ou `mode=fascicule`), domain, global… */
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    const domainParam = searchParams.get('domain');
    const fParam = searchParams.get('f');

    const resolveThemeNum = (raw: string | null): number | null => {
      if (!raw) return null;
      const n = Number.parseInt(raw, 10);
      if (!Number.isNaN(n) && fasciculeNums.includes(n)) return n;
      const meta = fasciculesList.find((f) => f.id === raw);
      if (meta && fasciculeNums.includes(meta.numero)) return meta.numero;
      return null;
    };

    if (modeParam === 'global') {
      setMode('global');
      return;
    }

    const resolvedF = resolveThemeNum(fParam);

    if ((modeParam === 'fascicule' || modeParam === 'module') && resolvedF != null) {
      setMode('module');
      setFascicule(resolvedF);
      return;
    }

    if (!modeParam && resolvedF != null) {
      setMode('module');
      setFascicule(resolvedF);
      return;
    }

    if (modeParam === 'domain' && domainParam) {
      const map: Record<string, QuizQuestion['domaine']> = {
        DPS: 'DPS',
        DPG: 'DPG',
        procedure: 'Procédure pénale',
        'procedure-penale': 'Procédure pénale',
      };
      const d = map[domainParam];
      if (d) {
        setMode('domain');
        setDomain(d);
      }
    }
  }, [searchParams, fasciculeNums]);

  function buildPool(cfg: LaunchConfig, dailyCap?: number | null): QuizQuestion[] {
    let pool = filterQuestions(
      quizQuestions,
      cfg.mode,
      isThemeQuizMode(cfg.mode) ? cfg.fascicule : undefined,
      cfg.mode === 'domain' ? cfg.domain : undefined
    );
    pool = fisherYates(pool).map(shuffleQuizQuestionOptions);
    pool = applyQuestionLimit(pool, cfg.limit);
    if (dailyCap != null && Number.isFinite(dailyCap)) {
      pool = pool.slice(0, Math.max(0, dailyCap));
    }
    return pool;
  }

  const poolPreview = useMemo(() => {
    return buildPool(
      {
        mode,
        limit,
        answerMode,
        ...(isThemeQuizMode(mode) ? { fascicule } : {}),
        ...(mode === 'domain' ? { domain } : {}),
      },
      quizRemainingToday
    );
  }, [mode, fascicule, domain, limit, answerMode, quizRemainingToday]);

  function handleLaunch() {
    const cfg: LaunchConfig = {
      mode,
      limit,
      answerMode,
      ...(isThemeQuizMode(mode) ? { fascicule } : {}),
      ...(mode === 'domain' ? { domain } : {}),
    };
    const cap =
      access.maxQuizQuestionsPerDay == null ? null : Math.max(0, access.maxQuizQuestionsPerDay - getDailyQuizQuestionCount());
    const pool = buildPool(cfg, cap);
    if (pool.length === 0) return;
    setLaunchConfig(cfg);
    setSessionQuestions(pool);
    setPhase('quiz');
  }

  function finalizeQuizSession(result: QuizMcqSessionResult) {
    const pct = result.score;
    const correct = result.correctAnswers;
    const total = result.totalQuestions;
    const key = launchConfig
      ? getQuizStorageKey(
          launchConfig.mode,
          isThemeQuizMode(launchConfig.mode) ? launchConfig.fascicule : undefined,
          launchConfig.mode === 'domain' ? launchConfig.domain : undefined,
          launchConfig.answerMode
        )
      : storageKey;
    const prevBest = readBestQuizPercent(key);
    const roundedPct = Math.round(pct * 10) / 10;
    const isPB = prevBest == null || roundedPct > prevBest;
    recordQuizBestPercent(key, pct);
    setLastQuizPersonalBest(isPB);
    setSessionResult(result);
    setPhase('result');

    if (launchConfig && isThemeQuizMode(launchConfig.mode) && launchConfig.fascicule != null) {
      const meta = fasciculesList.find((f) => f.numero === launchConfig.fascicule);
      if (meta) recordModuleQuizBestPercent(meta.id, pct);
    }

    if (access.maxQuizQuestionsPerDay != null) {
      addDailyQuizQuestionCount(total);
    }

    if (launchConfig) {
      void recordQuizAttempt({
        mode: launchConfig.mode,
        fasciculeNum: isThemeQuizMode(launchConfig.mode) ? (launchConfig.fascicule ?? null) : null,
        domainKey: launchConfig.mode === 'domain' ? (launchConfig.domain ?? null) : null,
        score: correct,
        total,
        percent: pct,
      });
    }

    const gamification = recordQuizCompleted();
    setStreakDays(gamification.streak);
    if (
      pct === 100 &&
      launchConfig &&
      isThemeQuizMode(launchConfig.mode) &&
      launchConfig.fascicule != null
    ) {
      recordThemePerfectScore(launchConfig.fascicule);
    }
  }

  function handleMcqComplete(result: QuizMcqSessionResult) {
    finalizeQuizSession(result);
  }

  function handleHardcoreComplete(correct: number, total: number) {
    const pct = total > 0 ? (correct / total) * 100 : 0;
    finalizeQuizSession({
      score: pct,
      correctAnswers: correct,
      totalQuestions: total,
      xpGained: correct * 10,
      mistakeTopics: [],
    });
  }

  function handleChangerMode() {
    setPhase('setup');
    setSessionQuestions([]);
    setLaunchConfig(null);
    setSessionResult(null);
    setLastQuizPersonalBest(false);
  }

  if (phase === 'quiz') {
    return (
      <InteriorPageShell fullBleed maxWidth='full' glow={SHELL_GLOW.quiz} pad='none' innerClassName='pt-8'>
        <div className='mx-auto mb-4 max-w-2xl px-4 text-center'>
          <button
            type='button'
            onClick={handleChangerMode}
            className='text-sm text-cyan-400/80 underline-offset-2 hover:text-cyan-300 hover:underline'
          >
            ← Quitter le quiz
          </button>
        </div>
        {(launchConfig?.answerMode ?? answerMode) === 'hardcore' ? (
          <QuizInterfaceHardcore questions={sessionQuestions} onComplete={handleHardcoreComplete} />
        ) : (
          <QuizInterface
            questions={sessionQuestions}
            onComplete={handleMcqComplete}
            onQuit={handleChangerMode}
            streak={streakDays}
          />
        )}
      </InteriorPageShell>
    );
  }

  if (phase === 'result') {
    if (!sessionResult) {
      return null;
    }
    return (
      <InteriorPageShell fullBleed maxWidth='6xl' glow={SHELL_GLOW.quiz} pad='default'>
        <SessionComplete
          score={sessionResult.score}
          totalQuestions={sessionResult.totalQuestions}
          correctAnswers={sessionResult.correctAnswers}
          xpGained={sessionResult.xpGained}
          streakAfter={streakDays}
          isPersonalBest={lastQuizPersonalBest}
          mistakeTopics={sessionResult.mistakeTopics}
          onContinue={handleChangerMode}
          onReviewMistakes={() => {
            const topics = sessionResult.mistakeTopics;
            const reviewQuestions = sessionQuestions.filter((q) => topics.includes(q.domaine));
            if (reviewQuestions.length === 0) return;
            setSessionQuestions(reviewQuestions);
            setSessionResult(null);
            setLastQuizPersonalBest(false);
            setPhase('quiz');
          }}
        />
      </InteriorPageShell>
    );
  }

  if (phase === 'setup' && maxDailyQuiz != null && quizUsedToday >= maxDailyQuiz) {
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

        <div className='mb-8 flex flex-col items-center gap-2 text-center text-sm text-gray-500'>
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
            <strong>hardcore</strong> (saisie libre) rapproche l’entraînement de l’écrit et de l’oral à l’examen OPJ.
            Enchaînez : quelques séries QCM pour la couverture, puis les mêmes thèmes en hardcore.
          </p>
        </div>

        <div className='mx-auto max-w-3xl'>
          <p className='mb-3 text-center text-sm font-medium text-gray-400'>Portée du quiz</p>
          <div
            role='tablist'
            aria-label='Choisir la portée du quiz'
            className='flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-navy-950/80 p-1.5 sm:flex-row sm:items-stretch'
          >
            {(
              [
                { id: 'module' as const, label: 'Module thématique', hint: 'Un fascicule F01–F18', Icon: BookOpen },
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
                      : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200',
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
                    <span className='mt-0.5 block text-xs text-gray-500'>{hint}</span>
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
                  <h3 className='text-sm font-semibold text-white'>Fascicule</h3>
                  <p className='mt-1 text-sm text-gray-500'>Sélectionnez le thème du programme (questions filtrées sur ce fascicule).</p>
                  <label className='mt-4 block'>
                    <span className='sr-only'>Fascicule thématique</span>
                    <select
                      value={fascicule}
                      onChange={(e) => setFascicule(Number(e.target.value))}
                      className='mt-2 w-full rounded-xl border border-white/15 bg-navy-900/90 px-3 py-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30'
                    >
                      {fasciculeOptions.map((f) => (
                        <option key={f.numero} value={f.numero} className='bg-navy-900'>
                          F{String(f.numero).padStart(2, '0')} — {f.titre}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : null}

              {mode === 'domain' ? (
                <div>
                  <h3 className='text-sm font-semibold text-white'>Domaine</h3>
                  <p className='mt-1 text-sm text-gray-500'>Regroupe les questions par grande famille (étiquettes du jeu de données).</p>
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
                          domain === v ? cls + ' bg-white/[0.06]' : 'border-white/10 text-gray-400 hover:border-white/15',
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
                    <p className='mt-1 max-w-xl text-sm text-gray-500'>
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
          <p className='mb-3 text-center text-sm font-medium text-gray-400'>Format des réponses</p>
          <div className='mb-8 flex flex-wrap justify-center gap-2'>
            <button
              type='button'
              onClick={() => setAnswerMode('mcq')}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                answerMode === 'mcq'
                  ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-500/45'
                  : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]'
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
                  : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]'
              )}
            >
              <Keyboard className='h-4 w-4 opacity-80' aria-hidden />
              Hardcore (saisie libre)
            </button>
          </div>
          <p className='mb-3 text-center text-sm font-medium text-gray-400'>Nombre de questions</p>
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
                      : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]',
                    disabledFreemium && 'cursor-not-allowed opacity-35'
                  )}
                >
                  {n === 'all' ? 'Toutes' : n}
                </button>
              );
            })}
          </div>
        </div>

        <div className='mt-12 flex flex-col items-center gap-6'>
          {poolPreview.length === 0 ? (
            <p className='max-w-lg text-center text-sm leading-relaxed text-rose-200/95'>
              Aucune question valide pour cette sélection (entrées filtrées : énoncé trop court, options manquantes ou
              correction hors plage). Choisissez un autre module, le quiz global ou le domaine « Procédure » — les jeux
              mélangés contiennent en général plus de volume.
            </p>
          ) : (
            <p className='text-center text-sm text-gray-400'>
              <span className='font-semibold tabular-nums text-cyan-300/90'>{poolPreview.length}</span> question
              {poolPreview.length > 1 ? 's' : ''} prête{poolPreview.length > 1 ? 's' : ''} pour une série avec les réglages
              actuels (après mélange et plafond éventuel).
            </p>
          )}
          <button
            type='button'
            onClick={handleLaunch}
            disabled={poolPreview.length === 0}
            className='rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40'
          >
            Lancer le quiz →
          </button>
          <Link href='/' className='text-sm text-slate-500 hover:text-slate-300'>
            ← Retour à l&apos;accueil
          </Link>
        </div>
    </InteriorPageShell>
  );
}
