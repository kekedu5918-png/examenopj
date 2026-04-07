'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Keyboard, Layers, ListOrdered, Shuffle } from 'lucide-react';

import {
  FreemiumDailyQuotaProgress,
  FreemiumQuizDailyLimitWall,
} from '@/components/access/freemium-daily-quota';
import { LANDING_EASE } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fasciculesList } from '@/data/fascicules-list';
import { quizQuestions } from '@/data/quiz-questions';
import { type QuizQuestion } from '@/data/types';
import { addDailyQuizQuestionCount, getDailyQuizQuestionCount } from '@/features/access/daily-quota-client';
import type { ContentAccessSnapshot } from '@/features/access/get-content-access';
import { recordQuizAttempt } from '@/features/examenopj/actions/record-quiz-attempt';
import { cn } from '@/utils/cn';

import { QuizInterface } from './quiz-interface';
import { QuizInterfaceHardcore } from './quiz-interface-hardcore';
import { QuizResult } from './quiz-result';
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
  const [result, setResult] = useState({ correct: 0, total: 0 });
  const [bestAfterQuiz, setBestAfterQuiz] = useState<number | null>(null);
  const [quotaTick, setQuotaTick] = useState(0);

  useEffect(() => {
    if (phase === 'setup') setQuotaTick((t) => t + 1);
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

  function handleQuizComplete(correct: number, total: number) {
    const pct = total > 0 ? (correct / total) * 100 : 0;
    const key = launchConfig
      ? getQuizStorageKey(
          launchConfig.mode,
          isThemeQuizMode(launchConfig.mode) ? launchConfig.fascicule : undefined,
          launchConfig.mode === 'domain' ? launchConfig.domain : undefined,
          launchConfig.answerMode
        )
      : storageKey;
    const best = recordQuizBestPercent(key, pct);
    setBestAfterQuiz(best);
    setResult({ correct, total });
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
  }

  function handleRecommencer() {
    if (!launchConfig) return;
    const cap =
      access.maxQuizQuestionsPerDay == null ? null : Math.max(0, access.maxQuizQuestionsPerDay - getDailyQuizQuestionCount());
    const pool = buildPool(launchConfig, cap);
    if (pool.length === 0) return;
    setSessionQuestions(pool);
    setPhase('quiz');
  }

  function handleChangerMode() {
    setPhase('setup');
    setSessionQuestions([]);
    setLaunchConfig(null);
    setBestAfterQuiz(null);
  }

  const modeCardClass = (active: boolean, glow: string) =>
    cn(
      'cursor-pointer text-left transition-all duration-300',
      active && `ring-2 ring-cyan-400/50 ${glow}`
    );

  if (phase === 'quiz') {
    return (
      <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 pt-8'>
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
          <QuizInterfaceHardcore questions={sessionQuestions} onComplete={handleQuizComplete} />
        ) : (
          <QuizInterface questions={sessionQuestions} onComplete={handleQuizComplete} />
        )}
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>
        <QuizResult
          correct={result.correct}
          total={result.total}
          bestPercent={bestAfterQuiz}
          onRecommencer={handleRecommencer}
          onChangerMode={handleChangerMode}
        />
      </div>
    );
  }

  if (phase === 'setup' && maxDailyQuiz != null && quizUsedToday >= maxDailyQuiz) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 px-4 pb-24 pt-12 md:px-6 md:pt-16'>
        <div className='mx-auto max-w-5xl'>
          <motion.header variants={headerContainer} initial='hidden' animate='visible' className='mb-10'>
            <motion.div variants={headerItem}>
              <SectionTitle
                badge='ENTRAÎNEMENT'
                badgeClassName='bg-cyan-500/20 text-cyan-300'
                title='Quiz OPJ'
                subtitle='QCM ou mode hardcore : réponses libres, comme à l’oral ou au papier'
                className='[&_h2]:font-display [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:text-white md:[&_h2]:text-5xl'
              />
            </motion.div>
          </motion.header>
          <FreemiumQuizDailyLimitWall />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 px-4 pb-24 pt-12 md:px-6 md:pt-16'>
      <div className='mx-auto max-w-5xl'>
        <motion.header variants={headerContainer} initial='hidden' animate='visible' className='mb-12'>
          <motion.div variants={headerItem}>
            <SectionTitle
              badge='ENTRAÎNEMENT'
              badgeClassName='bg-cyan-500/20 text-cyan-300'
              title='Quiz OPJ'
              subtitle='QCM ou mode hardcore : réponses libres, comme à l’oral ou au papier'
              className='[&_h2]:font-display [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:text-white md:[&_h2]:text-5xl'
            />
          </motion.div>
        </motion.header>

        <p className='mb-8 text-center text-sm text-gray-500'>
          {localBest != null ? (
            <>
              Record sur ce mode : <span className='font-semibold text-cyan-400'>{localBest}%</span>
            </>
          ) : (
            'Choisissez un mode et lancez une série.'
          )}
        </p>

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

        <div className='grid gap-6 md:grid-cols-3'>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
            <div
              role='button'
              tabIndex={0}
              className={modeCardClass(mode === 'module', 'shadow-[0_0_40px_-8px_rgba(6,182,212,0.35)]')}
              onClick={() => setMode('module')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setMode('module');
                }
              }}
            >
              <GlassCard hover padding='p-6' className='h-full'>
              <BookOpen className='h-10 w-10 text-cyan-400' strokeWidth={1.25} />
              <h3 className='mt-4 font-semibold text-white'>Par module thématique</h3>
              <p className='mt-2 text-sm text-gray-500'>Choisissez un thème du programme</p>
              {mode === 'module' ? (
                <label className='mt-4 block text-left'>
                  <span className='sr-only'>Module thématique</span>
                  <select
                    value={fascicule}
                    onChange={(e) => setFascicule(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className='mt-2 w-full rounded-xl border border-white/15 bg-navy-900/90 px-3 py-2.5 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30'
                  >
                    {fasciculeOptions.map((f) => (
                      <option key={f.numero} value={f.numero} className='bg-navy-900'>
                        F{String(f.numero).padStart(2, '0')} — {f.titre}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              </GlassCard>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05, ease }}>
            <div
              role='button'
              tabIndex={0}
              className={modeCardClass(mode === 'domain', 'shadow-[0_0_40px_-8px_rgba(6,182,212,0.35)]')}
              onClick={() => setMode('domain')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setMode('domain');
                }
              }}
            >
              <GlassCard hover padding='p-6' className='h-full'>
              <Layers className='h-10 w-10 text-cyan-400' strokeWidth={1.25} />
              <h3 className='mt-4 font-semibold text-white'>Par domaine</h3>
              <p className='mt-2 text-sm text-gray-500'>DPS, DPG ou Procédure</p>
              {mode === 'domain' ? (
                <fieldset className='mt-4 space-y-2 text-left' onClick={(e) => e.stopPropagation()}>
                  <legend className='sr-only'>Domaine</legend>
                  {(
                    [
                      { v: 'DPS' as const, label: 'DPS', cls: 'border-red-500/30 text-red-300' },
                      { v: 'DPG' as const, label: 'DPG', cls: 'border-violet-500/30 text-violet-300' },
                      {
                        v: 'Procédure pénale' as const,
                        label: 'Procédure',
                        cls: 'border-blue-500/30 text-blue-300',
                      },
                    ] as const
                  ).map(({ v, label, cls }) => (
                    <label
                      key={v}
                      className={cn(
                        'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm',
                        domain === v ? cls + ' bg-white/[0.06]' : 'border-white/10 text-gray-400'
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
              ) : null}
              </GlassCard>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1, ease }}>
            <div
              role='button'
              tabIndex={0}
              className={modeCardClass(mode === 'global', 'shadow-[0_0_40px_-8px_rgba(6,182,212,0.35)]')}
              onClick={() => setMode('global')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setMode('global');
                }
              }}
            >
              <GlassCard hover padding='p-6' className='h-full'>
                <Shuffle className='h-10 w-10 text-cyan-400' strokeWidth={1.25} />
                <h3 className='mt-4 font-semibold text-white'>Quiz global</h3>
                <p className='mt-2 text-sm text-gray-500'>Toutes les questions mélangées</p>
              </GlassCard>
            </div>
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
          <Link href='/' className='text-sm text-gray-500 hover:text-gray-300'>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
