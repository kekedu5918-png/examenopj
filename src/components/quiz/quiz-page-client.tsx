'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { fasciculesList } from '@/data/fascicules-list';
import { quizQuestions } from '@/data/quiz-questions';
import { type QuizQuestion } from '@/data/types';
import { addDailyQuizQuestionCount, getDailyQuizQuestionCount } from '@/features/access/daily-quota-client';
import type { ContentAccessSnapshot } from '@/features/access/get-content-access';
import { recordQuizAttempt } from '@/features/examenopj/actions/record-quiz-attempt';
import { getQuizStreak, recordQuizCompleted, recordThemePerfectScore } from '@/lib/quiz-gamification';

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
import { QuizSetupView } from './quiz-setup-view';
import { SessionComplete } from './SessionComplete';

type Phase = 'setup' | 'quiz' | 'result';

type LaunchConfig = {
  mode: QuizMode;
  fascicule?: number;
  domain?: QuizQuestion['domaine'];
  limit: 10 | 20 | 30 | 'all';
  answerMode: QuizAnswerMode;
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

  if (phase === 'setup') {
    return (
      <QuizSetupView
        maxDailyQuiz={maxDailyQuiz}
        quizUsedToday={quizUsedToday}
        quizRemainingToday={quizRemainingToday}
        streakDays={streakDays}
        localBest={localBest}
        mode={mode}
        setMode={setMode}
        fascicule={fascicule}
        setFascicule={setFascicule}
        domain={domain}
        setDomain={setDomain}
        fasciculeOptions={fasciculeOptions}
        limit={limit}
        setLimit={setLimit}
        answerMode={answerMode}
        setAnswerMode={setAnswerMode}
        poolPreviewLength={poolPreview.length}
        onLaunch={handleLaunch}
        quotaBlocked={maxDailyQuiz != null && quizUsedToday >= maxDailyQuiz}
      />
    );
  }

  return null;
}
