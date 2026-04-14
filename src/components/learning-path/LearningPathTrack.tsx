'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { useFormState, useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { completeLessonAction, type CompleteLessonActionState } from '@/features/learning-path/actions/complete-lesson';
import { AnalyticsEvents, track } from '@/lib/analytics/events';
import type { LessonProgressItem, ModuleFullProgress } from '@/lib/learningPath';
import { cn } from '@/utils/cn';

function lessonObjectiveLine(le: LessonProgressItem): string | null {
  switch (le.type) {
    case 'discover':
      return 'Objectif : repérer les notions clés.';
    case 'practice':
      return 'Objectif : valider la compréhension (type QCM / exercice).';
    case 'consolidate':
      return 'Objectif : ancrer la mémorisation.';
    case 'case':
      return 'Objectif : appliquer sur un cas pratique.';
    case 'exam':
      return 'Objectif : simulation type examen.';
    default:
      return null;
  }
}

function NodeStatusDot({ status }: { status: LessonProgressItem['status'] }) {
  const cls =
    status === 'locked'
      ? 'bg-slate-500/40 border-slate-500'
      : status === 'completed'
        ? 'bg-emerald-500 border-emerald-400'
        : status === 'needs_review'
          ? 'bg-amber-500 border-amber-400'
          : 'bg-blue-500 border-blue-400';
  return <span className={cn('inline-block h-3 w-3 shrink-0 rounded-full border-2', cls)} aria-hidden />;
}

function SubmitScoreButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' size='sm' disabled={pending} className='shrink-0'>
      {pending ? '…' : 'Valider'}
    </Button>
  );
}

function LessonCard({
  le,
  moduleSlug,
  isLastInModule,
}: {
  le: LessonProgressItem;
  moduleSlug: string;
  isLastInModule: boolean;
}) {
  const initial: CompleteLessonActionState = { ok: false };
  const [state, formAction] = useFormState(completeLessonAction, initial);
  const locked = le.status === 'locked';
  const canValidate = !locked && le.status !== 'completed';
  const objective = lessonObjectiveLine(le);

  useEffect(() => {
    if (!state.ok) return;
    track(AnalyticsEvents.learningPathStepCompleted, {
      module_slug: moduleSlug,
      lesson_client_key: le.clientKey,
      lesson_slug: le.slug,
      lesson_type: le.type,
    });
    if (isLastInModule) {
      track(AnalyticsEvents.learningPathModuleCompleted, {
        module_slug: moduleSlug,
        lesson_client_key: le.clientKey,
      });
    }
  }, [state.ok, moduleSlug, le.clientKey, le.slug, le.type, isLastInModule]);

  return (
    <div className='flex flex-wrap items-center gap-2 rounded-lg border border-ds-border bg-ds-bg-primary/80 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/60'>
        <NodeStatusDot status={le.status} />
        <div className='min-w-0 flex-1'>
          <p className='font-medium text-ds-text-primary dark:text-slate-100'>{le.title}</p>
          {objective ? (
            <p className='mt-0.5 text-xs text-ds-text-muted/90 dark:text-slate-500'>{objective}</p>
          ) : null}
          <p className='text-xs text-ds-text-muted dark:text-slate-400'>
            {le.type} · {le.estimatedMinutes} min · +{le.xpReward} XP max
          </p>
          {state.error ? <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{state.error}</p> : null}
          {state.ok ? <p className='mt-1 text-xs text-emerald-600 dark:text-emerald-400'>Enregistré.</p> : null}
        </div>
        {le.href && !locked ? (
          <Button asChild variant='secondary' size='sm' className='shrink-0'>
            <Link href={le.href}>Ouvrir</Link>
          </Button>
        ) : null}
        {canValidate ? (
          <form action={formAction} className='flex flex-wrap items-center gap-2'>
            <input type='hidden' name='lessonId' value={le.lessonId} />
            <label className='sr-only' htmlFor={`score-${le.lessonId}`}>
              Score %
            </label>
            <input
              id={`score-${le.lessonId}`}
              name='score'
              type='number'
              min={0}
              max={100}
              defaultValue={85}
              className='w-16 rounded-md border border-ds-border bg-ds-bg-secondary px-2 py-1 text-xs text-ds-text-primary dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100'
            />
            <SubmitScoreButton />
          </form>
        ) : null}
      </div>
  );
}

function ModuleSection({ mod }: { mod: ModuleFullProgress }) {
  const reduceMotion = useReducedMotion();
  const lastLessonId = mod.lessons[mod.lessons.length - 1]?.lessonId;

  return (
    <section className='rounded-2xl border border-ds-border bg-ds-bg-secondary/90 p-4 dark:border-slate-700 dark:bg-slate-900/40'>
      <header className='mb-4 flex flex-wrap items-center gap-3'>
        <span className='text-2xl' aria-hidden>
          {mod.icon}
        </span>
        <div>
          <h2 className='text-lg font-semibold text-ds-text-primary dark:text-white'>{mod.title}</h2>
          {mod.description ? (
            <p className='text-sm text-ds-text-muted dark:text-slate-400'>{mod.description}</p>
          ) : null}
          <p className='mt-1 text-xs text-ds-text-muted dark:text-slate-500'>Complétion : {mod.completionPercent} %</p>
        </div>
      </header>
      {/* Mobile : piste horizontale avec repères ; desktop : liste verticale */}
      <div
        className={cn(
          '-mx-1 flex gap-0 overflow-x-auto px-1 pb-1 md:mx-0 md:block md:overflow-visible md:px-0 md:pb-0',
          !reduceMotion && 'scroll-smooth snap-x snap-mandatory md:snap-none',
        )}
        style={{ scrollbarGutter: 'stable' }}
      >
        <ol className='flex flex-row gap-2 md:flex-col md:gap-2'>
          {mod.lessons.map((le, idx) => (
            <li
              key={le.lessonId}
              className='flex min-w-[min(92vw,320px)] shrink-0 snap-start flex-row items-stretch gap-2 md:min-w-0 md:snap-none'
            >
              {idx > 0 ? (
                <div
                  className='w-3 shrink-0 self-center border-t-2 border-dashed border-ds-border md:hidden'
                  aria-hidden
                />
              ) : null}
              <LessonCard
                le={le}
                moduleSlug={mod.slug}
                isLastInModule={lastLessonId != null && le.lessonId === lastLessonId}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LearningPathTrack({ modules }: { modules: ModuleFullProgress[] }) {
  return (
    <div className='space-y-8'>
      {modules.map((mod) => (
        <ModuleSection key={mod.moduleId} mod={mod} />
      ))}
    </div>
  );
}
