'use client';

import { type ReactNode, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { completeDiagnostic, saveOnboardingStage } from '@/features/onboarding/actions/onboarding-actions';
import {
  DIAGNOSTIC_QUESTIONS,
  DIAGNOSTIC_SESSION_STORAGE_KEY,
  type DiagnosticAnswer,
  type DiagnosticResult,
  type FormationPhase,
} from '@/features/onboarding/types';
import { cn } from '@/utils/cn';

// ─────────────────────────────────────────────────────────
// Utilitaire stage label
// ─────────────────────────────────────────────────────────
const STAGES = [
  'Votre situation',
  'Forces & faiblesses',
  'Diagnostic',
  'Votre plan',
] as const;

const ONBOARDING_SHELL_INNER =
  'flex min-h-screen flex-col items-center justify-center px-4 py-10';

function OnboardingScreenShell({ children }: { children: ReactNode }) {
  return (
    <InteriorPageShell
      fullBleed
      bleedBgClassName='bg-slate-950'
      maxWidth='full'
      glow={SHELL_GLOW.auth}
      pad='none'
      innerClassName={ONBOARDING_SHELL_INNER}
    >
      {children}
    </InteriorPageShell>
  );
}

// ─────────────────────────────────────────────────────────
// Wrapper commun d'un écran
// ─────────────────────────────────────────────────────────
function OnboardingStage({
  step,
  total,
  title,
  subtitle,
  children,
}: {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <OnboardingScreenShell>
      <div className='w-full max-w-lg'>
        {/* Breadcrumb */}
        <div className='mb-2 flex items-center gap-2'>
          {STAGES.map((label, i) => (
            <div key={label} className='flex items-center gap-2'>
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                  i + 1 < step
                    ? 'bg-cyan-600 text-white'
                    : i + 1 === step
                      ? 'bg-cyan-500 text-white ring-2 ring-cyan-300'
                      : 'bg-slate-700 text-slate-400',
                )}
              >
                {i + 1 < step ? '✓' : i + 1}
              </div>
              {i < STAGES.length - 1 && (
                <div className={cn('h-0.5 w-8', i + 1 < step ? 'bg-cyan-600' : 'bg-slate-700')} />
              )}
            </div>
          ))}
        </div>

        <Progress value={(step / total) * 100} className='mb-6 h-1.5 bg-slate-800 [&>div]:bg-cyan-500' />

        <div className='rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl'>
          <h1 className='mb-1 text-2xl font-bold text-slate-50'>{title}</h1>
          {subtitle && <p className='mb-5 text-sm text-slate-400'>{subtitle}</p>}
          {children}
        </div>
      </div>
    </OnboardingScreenShell>
  );
}

// ─────────────────────────────────────────────────────────
// ÉTAPE 1 — Phase de formation
// ─────────────────────────────────────────────────────────
const PHASES: Array<{ id: FormationPhase; label: string; desc: string; icon: string }> = [
  { id: 'early', label: 'Je viens de démarrer', desc: 'Formation commencée il y a moins de 2 semaines', icon: '🌱' },
  { id: 'mid', label: 'Je suis à mi-parcours', desc: '4 à 8 semaines de formation déjà effectuées', icon: '📚' },
  { id: 'late', label: 'Je suis à J-28 de l\'examen', desc: '4 semaines ou moins avant le 11 juin 2026', icon: '🎯' },
];

function Stage1Phase({ onNext }: { onNext: (phase: FormationPhase) => void }) {
  const [selected, setSelected] = useState<FormationPhase | null>(null);

  return (
    <OnboardingStage step={1} total={4} title='📍 Où en êtes-vous ?' subtitle="En 2 minutes, créons VOTRE plan d'études personnalisé.">
      <div className='space-y-3'>
        {PHASES.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={cn(
              'w-full rounded-xl border px-4 py-4 text-left transition-all',
              selected === p.id
                ? 'border-cyan-500 bg-cyan-900/30 text-slate-50 ring-1 ring-cyan-400'
                : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500',
            )}
          >
            <div className='flex items-start gap-3'>
              <span className='text-xl'>{p.icon}</span>
              <div>
                <p className='font-semibold'>{p.label}</p>
                <p className='text-xs text-slate-400'>{p.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Button
        className='mt-6 w-full bg-cyan-600 hover:bg-cyan-700'
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
      >
        Continuer →
      </Button>
    </OnboardingStage>
  );
}

// ─────────────────────────────────────────────────────────
// ÉTAPE 2 — Forces & faiblesses
// ─────────────────────────────────────────────────────────
const STRENGTHS_OPTIONS = [
  { id: 'procedure', label: 'Procédure pénale', desc: 'GAV, perquisition, cadre légal — naturel pour moi' },
  { id: 'redaction', label: 'Rédaction de PV', desc: 'Écrire un procès-verbal, c\'est acquis' },
  { id: 'infractions_culture', label: 'Culture générale infractions', desc: 'Je retiens facilement les articles' },
];

const WEAKNESSES_OPTIONS = [
  { id: 'infractions', label: 'Infractions (les 55)', desc: 'Les articles et éléments, trop à retenir' },
  { id: 'oral', label: 'Oral (stress, expression)', desc: 'Peur de m\'exprimer devant le jury' },
  { id: 'time', label: 'Gestion du temps', desc: 'Peur de ne pas finir les 3h ou 4h d\'épreuve' },
  { id: 'procedure', label: 'Procédure pénale', desc: 'GAV, nullités, délais — peu maîtrisés' },
];

function CheckItem({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'w-full rounded-xl border px-4 py-3 text-left transition-all',
        checked
          ? 'border-cyan-500 bg-cyan-900/30 text-slate-50'
          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500',
      )}
    >
      <div className='flex items-start gap-3'>
        <div
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-xs font-bold',
            checked ? 'border-cyan-400 bg-cyan-500 text-white' : 'border-slate-600',
          )}
        >
          {checked ? '✓' : ''}
        </div>
        <div>
          <p className='font-medium text-sm'>{label}</p>
          <p className='text-xs text-slate-400'>{desc}</p>
        </div>
      </div>
    </button>
  );
}

function Stage2StrengthsWeaknesses({
  onNext,
  onBack,
}: {
  onNext: (strengths: string[], weaknesses: string[]) => void;
  onBack: () => void;
}) {
  const [strengths, setStrengths] = useState<Set<string>>(new Set());
  const [weaknesses, setWeaknesses] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, setFn: (s: Set<string>) => void, id: string) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setFn(next);
  };

  return (
    <OnboardingStage step={2} total={4} title='🎯 Vos forces et faiblesses' subtitle='Cochez tout ce qui vous correspond (plusieurs choix possibles).'>
      <div className='space-y-4'>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400'>✅ Mes forces</p>
          <div className='space-y-2'>
            {STRENGTHS_OPTIONS.map((o) => (
              <CheckItem
                key={o.id}
                label={o.label}
                desc={o.desc}
                checked={strengths.has(o.id)}
                onChange={() => toggle(strengths, setStrengths, o.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-rose-400'>⚠️ Mes points faibles</p>
          <div className='space-y-2'>
            {WEAKNESSES_OPTIONS.map((o) => (
              <CheckItem
                key={o.id}
                label={o.label}
                desc={o.desc}
                checked={weaknesses.has(o.id)}
                onChange={() => toggle(weaknesses, setWeaknesses, o.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mt-6 flex gap-3'>
        <Button variant='outline' className='border-slate-700 text-slate-300' onClick={onBack}>
          ← Retour
        </Button>
        <Button
          className='flex-1 bg-cyan-600 hover:bg-cyan-700'
          onClick={() => onNext([...strengths], [...weaknesses])}
        >
          Lancer le diagnostic →
        </Button>
      </div>
    </OnboardingStage>
  );
}

// ─────────────────────────────────────────────────────────
// ÉTAPE 3 — Quiz diagnostic (5 questions)
// ─────────────────────────────────────────────────────────
function Stage3Diagnostic({
  onComplete,
  onBack,
  isSubmitting,
  submitError,
}: {
  onComplete: (answers: DiagnosticAnswer[]) => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DIAGNOSTIC_SESSION_STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as { currentQ?: number; answers?: DiagnosticAnswer[] };
      if (parsed && typeof parsed.currentQ === 'number' && Array.isArray(parsed.answers)) {
        const q = parsed.currentQ;
        const ans = parsed.answers;
        if (q >= 0 && q < DIAGNOSTIC_QUESTIONS.length && ans.length === q) {
          setCurrentQ(q);
          setAnswers(ans);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persistProgress = (q: number, nextAnswers: DiagnosticAnswer[]) => {
    try {
      sessionStorage.setItem(
        DIAGNOSTIC_SESSION_STORAGE_KEY,
        JSON.stringify({ currentQ: q, answers: nextAnswers }),
      );
    } catch {
      /* ignore */
    }
  };

  const question = DIAGNOSTIC_QUESTIONS[currentQ];
  const isCorrect = selectedAnswer === question.correct;
  const isLast = currentQ === DIAGNOSTIC_QUESTIONS.length - 1;

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(optionId);
    setShowFeedback(true);
  };

  const handleNext = () => {
    const newAnswers = [
      ...answers,
      {
        question_id: question.id,
        answer: selectedAnswer ?? 'd',
        correct: selectedAnswer === question.correct,
      },
    ];
    setAnswers(newAnswers);

    if (isLast) {
      onComplete(newAnswers);
    } else {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      setSelectedAnswer(null);
      setShowFeedback(false);
      persistProgress(nextQ, newAnswers);
    }
  };

  if (!hydrated) {
    return (
      <OnboardingStage
        step={3}
        total={4}
        title='⚡ Diagnostic éclair'
        subtitle='Chargement…'
      >
        <div className='h-32 animate-pulse rounded-xl bg-slate-800/60' />
      </OnboardingStage>
    );
  }

  return (
    <OnboardingStage
      step={3}
      total={4}
      title={`⚡ Diagnostic éclair — Q${currentQ + 1}/5`}
      subtitle="Pas de panique ! C'est juste pour adapter votre plan."
    >
      <div className='relative min-h-[min(70vh,28rem)]'>
        {isSubmitting ? (
          <div
            className='absolute inset-0 z-30 flex flex-col items-center justify-center rounded-xl bg-slate-950/88 backdrop-blur-[2px]'
            role='status'
            aria-live='polite'
            aria-busy='true'
          >
            <div className='mb-4 text-4xl'>⚙️</div>
            <p className='text-lg font-bold text-slate-50'>Génération de votre plan…</p>
            <p className='mt-2 text-sm text-slate-400'>Analyse de vos réponses</p>
          </div>
        ) : null}

        {submitError ? (
          <div className='mb-4 rounded-lg border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-sm text-rose-100'>
            {submitError}
          </div>
        ) : null}

      <div className='mb-5'>
        <div className='mb-4 flex gap-1'>
          {DIAGNOSTIC_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                i < currentQ ? 'bg-cyan-500' : i === currentQ ? 'bg-cyan-300' : 'bg-slate-700',
              )}
            />
          ))}
        </div>

        <p className='text-base font-medium text-slate-100'>{question.text}</p>
      </div>

      <div className='space-y-2'>
        {question.options.map((opt) => {
          const isSelected = selectedAnswer === opt.id;
          const isRight = showFeedback && opt.id === question.correct;
          const isWrong = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-left text-sm transition-all',
                !showFeedback && 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500',
                isRight && 'border-emerald-500 bg-emerald-900/30 text-emerald-100',
                isWrong && 'border-rose-500 bg-rose-900/30 text-rose-100',
                showFeedback && !isRight && !isWrong && 'border-slate-800 bg-slate-800/30 text-slate-500',
              )}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className={cn(
            'mt-4 rounded-lg p-3 text-sm',
            isCorrect ? 'bg-emerald-900/40 text-emerald-200' : 'bg-amber-900/40 text-amber-200',
          )}
        >
          {isCorrect ? '✅ Bonne réponse ! ' : '❌ Pas tout à fait. '}
          <span className='text-slate-300'>{question.explanation}</span>
        </div>
      )}

      <div className='mt-5 flex gap-3'>
        {currentQ === 0 && !showFeedback && (
          <Button variant='outline' className='border-slate-700 text-slate-300' onClick={onBack}>
            ← Retour
          </Button>
        )}
        {showFeedback && (
          <Button className='flex-1 bg-cyan-600 hover:bg-cyan-700' onClick={handleNext} disabled={isSubmitting}>
            {isLast ? 'Voir mon plan →' : 'Question suivante →'}
          </Button>
        )}
      </div>
      </div>
    </OnboardingStage>
  );
}

// ─────────────────────────────────────────────────────────
// ÉTAPE 4 — Résultats + Plan personnalisé
// ─────────────────────────────────────────────────────────
const LEVEL_META: Record<string, { color: string; emoji: string; message: string }> = {
  Expert: {
    color: 'text-emerald-400',
    emoji: '🏆',
    message: 'Excellent ! Vous avez déjà de solides bases. Focalisez-vous sur les cas pratiques avancés.',
  },
  Intermédiaire: {
    color: 'text-cyan-400',
    emoji: '📈',
    message: 'Très bien ! Vous avez les fondamentaux. Consolidez et entraînez-vous sur les enquêtes.',
  },
  Débutant: {
    color: 'text-amber-400',
    emoji: '📖',
    message: 'Pas de panique ! Le programme va vous guider pas à pas vers la réussite.',
  },
  Novice: {
    color: 'text-rose-400',
    emoji: '🌱',
    message: 'C\'est un bon début ! On commence par les bases, brique par brique.',
  },
};

function Stage4Results({
  result,
  saveWarning,
  onRetrySave,
  isRetrying,
}: {
  result: DiagnosticResult;
  saveWarning?: string | null;
  onRetrySave?: () => void;
  isRetrying?: boolean;
}) {
  const router = useRouter();
  const meta = LEVEL_META[result.level] ?? LEVEL_META['Débutant'];

  return (
    <OnboardingScreenShell>
      <div className='w-full max-w-lg space-y-5'>
        {saveWarning ? (
          <div className='rounded-xl border border-amber-500/40 bg-amber-950/35 px-4 py-3 text-sm text-amber-100'>
            <p className='font-medium text-amber-50'>Enregistrement à finaliser</p>
            <p className='mt-1 text-amber-100/90'>{saveWarning}</p>
            {onRetrySave ? (
              <Button
                type='button'
                className='mt-3 w-full bg-amber-600 text-amber-50 hover:bg-amber-500'
                disabled={isRetrying}
                onClick={onRetrySave}
              >
                {isRetrying ? 'Enregistrement…' : 'Réessayer l’enregistrement'}
              </Button>
            ) : null}
          </div>
        ) : null}

        {/* Résultat */}
        <div className='rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl'>
          <div className='mb-1 text-4xl'>{meta.emoji}</div>
          <h1 className='text-2xl font-bold text-slate-50'>
            Diagnostic complété !
          </h1>
          <p className='mt-1 text-sm text-slate-400'>Voici votre profil et votre plan d&apos;études personnalisé.</p>

          <div className='mt-4 flex items-center gap-4'>
            <div>
              <p className='text-xs text-slate-400'>Votre niveau</p>
              <p className={`text-xl font-bold ${meta.color}`}>{result.level}</p>
            </div>
            <div className='h-10 w-px bg-slate-700' />
            <div>
              <p className='text-xs text-slate-400'>Score diagnostic</p>
              <p className='text-xl font-bold text-slate-100'>{result.score}/5 ({result.score_percent}%)</p>
            </div>
          </div>

          <p className='mt-3 rounded-lg bg-slate-800/60 px-3 py-2 text-sm text-slate-300'>{meta.message}</p>

          {result.strengths.length > 0 && (
            <div className='mt-4'>
              <p className='mb-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400'>Points forts</p>
              <ul className='space-y-1'>
                {result.strengths.map((s, i) => (
                  <li key={i} className='text-sm text-emerald-200'>✓ {s}</li>
                ))}
              </ul>
            </div>
          )}

          {result.weaknesses_feedback.length > 0 && (
            <div className='mt-3'>
              <p className='mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400'>À améliorer</p>
              <ul className='space-y-1'>
                {result.weaknesses_feedback.map((w, i) => (
                  <li key={i} className='text-sm text-amber-200'>⚠️ {w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Plan */}
        <div className='rounded-2xl border border-blue-500/30 bg-slate-900 p-6 shadow-xl'>
          <h2 className='mb-1 text-lg font-bold text-slate-50'>📋 Votre plan personnalisé</h2>
          <p className='mb-4 text-sm text-slate-400'>
            {result.plan.total_weeks} semaines jusqu&apos;au {new Date(result.plan.exam_date).toLocaleDateString('fr-FR')}
          </p>

          <div className='space-y-3'>
            {result.plan.phases.map((phase) => (
              <div key={phase.phase_number} className='rounded-xl border border-slate-700 bg-slate-800/50 p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <span className='flex h-6 w-6 items-center justify-center rounded-full bg-cyan-800 text-xs font-bold text-cyan-200'>
                    {phase.phase_number}
                  </span>
                  <p className='font-semibold text-slate-100'>{phase.name}</p>
                  <span className='ml-auto text-xs text-slate-400'>
                    {phase.duration_weeks > 0 ? `${phase.duration_weeks} sem.` : 'Adapté'}
                  </span>
                </div>
                <ul className='space-y-1'>
                  {phase.topics.map((t) => (
                    <li key={t.id} className='flex items-start gap-2 text-xs text-slate-300'>
                      <span className='mt-0.5 text-cyan-500'>•</span>
                      <span>
                        {t.name}
                        {t.items_per_week ? ` (${t.items_per_week}/semaine)` : ''}
                        {t.frequency ? ` — ${t.frequency}` : ''}
                        {t.count ? ` (${t.count})` : ''}
                        {t.sessions ? ` — ${t.sessions}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className='mt-2 text-xs text-slate-500'>⏱ {phase.daily_time_minutes} min / jour</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='rounded-2xl border border-slate-700 bg-slate-900 p-5'>
          <p className='mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400'>Accès inclus</p>
          <ul className='mb-4 space-y-1 text-sm text-slate-300'>
            <li>✓ Toutes les fiches fondamentales</li>
            <li>✓ Quiz quotidiens illimités</li>
            <li>✓ Flashcards + révisions espacées</li>
          </ul>

          <Button
            className='w-full bg-cyan-600 hover:bg-cyan-700 text-base font-semibold'
            onClick={() => router.push('/accueil')}
          >
            🚀 Commencer mon plan →
          </Button>
          <Button
            variant='outline'
            className='mt-2 w-full border-slate-700 text-slate-300'
            onClick={() => router.push('/dashboard/progression')}
          >
            Voir ma progression
          </Button>
        </div>
      </div>
    </OnboardingScreenShell>
  );
}

// ─────────────────────────────────────────────────────────
// ÉCRAN 0 — Bienvenue
// ─────────────────────────────────────────────────────────
function Stage0Welcome({ onStart }: { onStart: () => void }) {
  return (
    <OnboardingScreenShell>
      <div className='w-full max-w-lg text-center'>
        <div className='mb-6 text-6xl'>🎓</div>
        <h1 className='mb-3 text-3xl font-bold text-slate-50'>
          Bienvenue sur ExamenOPJ
        </h1>
        <p className='mb-2 text-lg text-slate-300'>
          Excellente décision ! Vous êtes au bon endroit pour préparer votre examen OPJ.
        </p>
        <p className='mb-8 text-sm text-slate-400'>
          En 2 minutes, créons <span className='font-semibold text-cyan-400'>VOTRE</span> plan d&apos;études personnalisé.
        </p>

        <div className='mx-auto mb-8 max-w-xs space-y-3'>
          <div className='flex items-center gap-3 rounded-lg bg-slate-800/60 px-4 py-3 text-left'>
            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-800 text-xs font-bold text-cyan-200'>1</span>
            <p className='text-sm text-slate-300'>Votre situation actuelle</p>
          </div>
          <div className='flex items-center gap-3 rounded-lg bg-slate-800/60 px-4 py-3 text-left'>
            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-800 text-xs font-bold text-cyan-200'>2</span>
            <p className='text-sm text-slate-300'>Vos forces et faiblesses</p>
          </div>
          <div className='flex items-center gap-3 rounded-lg bg-slate-800/60 px-4 py-3 text-left'>
            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-800 text-xs font-bold text-cyan-200'>3</span>
            <p className='text-sm text-slate-300'>5 questions diagnostic</p>
          </div>
        </div>

        <Button
          className='w-full max-w-xs bg-cyan-600 text-base font-semibold hover:bg-cyan-700'
          onClick={onStart}
        >
          C&apos;est parti ! →
        </Button>
        <p className='mt-3 text-xs text-slate-500'>⏱ Durée estimée : 2 minutes</p>
      </div>
    </OnboardingScreenShell>
  );
}

// ─────────────────────────────────────────────────────────
// Composant racine
// ─────────────────────────────────────────────────────────
export function OnboardingFlow() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [formationPhase, setFormationPhase] = useState<FormationPhase>('mid');
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [diagnosticError, setDiagnosticError] = useState<string | null>(null);
  const [saveWarning, setSaveWarning] = useState<string | null>(null);
  const [retryPayload, setRetryPayload] = useState<{
    formationPhase: FormationPhase;
    weaknesses: string[];
    answers: DiagnosticAnswer[];
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStage1 = (phase: FormationPhase) => {
    setFormationPhase(phase);
    startTransition(async () => {
      await saveOnboardingStage(1, { formation_phase: phase });
    });
    setStage(2);
  };

  const handleStage2 = (strengths: string[], w: string[]) => {
    setWeaknesses(w);
    try {
      sessionStorage.removeItem(DIAGNOSTIC_SESSION_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    startTransition(async () => {
      await saveOnboardingStage(2, { strengths, weaknesses: w });
    });
    setStage(3);
  };

  const handleDiagnosticComplete = (answers: DiagnosticAnswer[]) => {
    setDiagnosticError(null);
    setSaveWarning(null);
    startTransition(async () => {
      try {
        const res = await completeDiagnostic(formationPhase, weaknesses, answers);
        try {
          sessionStorage.removeItem(DIAGNOSTIC_SESSION_STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setResult(res.result);
        setRetryPayload({ formationPhase, weaknesses, answers });
        setSaveWarning(res.saved ? null : res.saveError ?? null);
        setStage(4);
      } catch {
        setDiagnosticError(
          'Impossible de finaliser pour le moment. Vérifiez votre connexion et touchez « Voir mon plan » à nouveau.',
        );
      }
    });
  };

  const handleRetrySave = () => {
    if (!retryPayload) return;
    setSaveWarning(null);
    startTransition(async () => {
      try {
        const res = await completeDiagnostic(
          retryPayload.formationPhase,
          retryPayload.weaknesses,
          retryPayload.answers,
        );
        setResult(res.result);
        setSaveWarning(res.saved ? null : res.saveError ?? null);
      } catch {
        setSaveWarning('Nouvel échec. Réessayez dans quelques minutes ou après vous être reconnecté.');
      }
    });
  };

  if (stage === 4 && result) {
    return (
      <Stage4Results
        result={result}
        saveWarning={saveWarning}
        onRetrySave={retryPayload ? handleRetrySave : undefined}
        isRetrying={isPending}
      />
    );
  }

  return (
    <>
      {stage === 0 && <Stage0Welcome onStart={() => setStage(1)} />}
      {stage === 1 && <Stage1Phase onNext={handleStage1} />}
      {stage === 2 && (
        <Stage2StrengthsWeaknesses onNext={handleStage2} onBack={() => setStage(1)} />
      )}
      {stage === 3 && (
        <Stage3Diagnostic
          onComplete={handleDiagnosticComplete}
          onBack={() => {
            try {
              sessionStorage.removeItem(DIAGNOSTIC_SESSION_STORAGE_KEY);
            } catch {
              /* ignore */
            }
            setStage(2);
          }}
          isSubmitting={isPending}
          submitError={diagnosticError}
        />
      )}
    </>
  );
}
