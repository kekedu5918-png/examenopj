'use client';

import { useEffect, useState } from 'react';

import { getModuleQuizProgressStorageKey, readModuleQuizProgress } from '@/components/quiz/quiz-utils';
import { Progress } from '@/components/ui/progress';

type Props = { moduleId: string };

export function ModuleQuizProgressBar({ moduleId }: Props) {
  const [pct, setPct] = useState<number | null>(null);

  useEffect(() => {
    function refresh() {
      setPct(readModuleQuizProgress(moduleId)?.percent ?? null);
    }
    refresh();
    function onFocus() {
      refresh();
    }
    function onStorage(e: StorageEvent) {
      if (e.key === null || e.key === getModuleQuizProgressStorageKey(moduleId)) refresh();
    }
    function onLocalProgress(e: Event) {
      const d = (e as CustomEvent<{ moduleId?: string }>).detail;
      if (d?.moduleId === moduleId) refresh();
    }
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onStorage);
    window.addEventListener('examenopj:module-quiz-progress', onLocalProgress as EventListener);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('examenopj:module-quiz-progress', onLocalProgress as EventListener);
    };
  }, [moduleId]);

  if (pct == null) {
    return (
      <div className='mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4'>
        <p className='text-sm text-gray-400'>
          Progrès quiz (ce thème) : pas encore de session enregistrée dans ce navigateur. Lancez un{' '}
          <span className='text-cyan-300'>quiz thématique</span> depuis cette fiche.
        </p>
      </div>
    );
  }

  return (
    <div className='mb-6 rounded-xl border border-cyan-500/25 bg-cyan-500/[0.06] p-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <p className='text-sm font-medium text-cyan-100'>Meilleur score quiz sur ce module (local)</p>
        <span className='tabular-nums text-sm font-bold text-cyan-200'>{pct.toFixed(1)} %</span>
      </div>
      <Progress value={Math.min(100, pct)} className='mt-3 h-2 bg-white/10' />
      <p className='mt-2 text-xs text-gray-500'>
        Basé sur vos parties terminées en mode QCM ou hardcore (meilleur pourcentage enregistré sur cet appareil).
      </p>
    </div>
  );
}
