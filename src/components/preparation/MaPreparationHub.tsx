'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, RefreshCw, Sparkles } from 'lucide-react';

import {
  buildPreparationActions,
  estimatePillarPercents,
  parseOnboardingState,
  PREPARATION_ONBOARDING_STORAGE_KEY,
  type PreparationOnboardingState,
} from '@/features/onboarding/preparation-onboarding';
import { cn } from '@/utils/cn';

import { PreparationOnboardingModal } from './PreparationOnboardingModal';

type Props = {
  /** Variante compacte pour le tableau de bord */
  variant?: 'full' | 'compact';
  /** Ouvre l’assistant automatiquement si aucun profil (uniquement page dédiée). */
  autoOpenOnboarding?: boolean;
  className?: string;
};

function PillarBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className='flex justify-between text-[11px] text-gray-400'>
        <span>{label}</span>
        <span className='tabular-nums text-gray-500'>{value} %</span>
      </div>
      <div className='mt-1 h-2 overflow-hidden rounded-full bg-white/10'>
        <div
          className='h-full rounded-full bg-gradient-to-r from-cyan-600/90 to-violet-600/80 transition-[width]'
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function MaPreparationHub({ variant = 'full', autoOpenOnboarding = false, className }: Props) {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<PreparationOnboardingState | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(PREPARATION_ONBOARDING_STORAGE_KEY);
    setState(parseOnboardingState(raw));
  }, []);

  useEffect(() => {
    setMounted(true);
    load();
  }, [load]);

  useEffect(() => {
    if (!mounted || !autoOpenOnboarding) return undefined;
    if (!state) {
      const t = window.setTimeout(() => setModalOpen(true), 400);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [mounted, state, autoOpenOnboarding]);

  const actions = state ? buildPreparationActions(state) : [];
  const pillars = state ? estimatePillarPercents(state) : null;
  const next = actions[0];

  if (!mounted) {
    return (
      <div className={cn('animate-pulse rounded-2xl border border-white/10 bg-slate-900/50 p-6', className)}>
        <div className='h-6 w-48 rounded bg-white/10' />
        <div className='mt-4 h-24 rounded-lg bg-white/5' />
      </div>
    );
  }

  return (
    <>
      <PreparationOnboardingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onComplete={(s) => setState(s)}
      />

      <section
        className={cn(
          'rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-slate-950 via-slate-900/90 to-navy-950 p-6 shadow-lg',
          variant === 'compact' && 'p-4',
          className,
        )}
      >
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div className='flex gap-3'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/35 bg-cyan-500/15 text-cyan-200'>
              <Compass className='h-5 w-5' aria-hidden />
            </span>
            <div>
              <h2 className='font-display text-xl font-bold text-white md:text-2xl'>Ma préparation</h2>
              <p className='mt-1 max-w-2xl text-sm text-gray-400'>
                Hub personnel : prochaine action, raccourcis et priorisation selon votre profil (stocké localement).
              </p>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={() => setModalOpen(true)}
              className='inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-gray-200 hover:bg-white/10'
            >
              <RefreshCw className='h-3.5 w-3.5' aria-hidden />
              {state ? 'Modifier le profil' : 'Créer mon plan (60 s)'}
            </button>
            {state ? (
              <button
                type='button'
                onClick={() => {
                  try {
                    localStorage.removeItem(PREPARATION_ONBOARDING_STORAGE_KEY);
                  } catch {
                    /* ignore */
                  }
                  setState(null);
                  setModalOpen(true);
                }}
                className='text-xs text-gray-500 underline-offset-4 hover:text-gray-300 hover:underline'
              >
                Réinitialiser
              </button>
            ) : null}
          </div>
        </div>

        {next && state ? (
          <div className='mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4'>
            <p className='text-xs font-semibold uppercase tracking-wide text-emerald-300/90'>Prochaine action</p>
            <Link
              href={next.href}
              className='mt-2 inline-flex items-center gap-2 font-display text-lg font-bold text-white hover:text-emerald-200'
            >
              <Sparkles className='h-5 w-5 shrink-0 text-emerald-400' aria-hidden />
              {next.label}
            </Link>
            <p className='mt-1 text-sm text-gray-400'>{next.hint}</p>
          </div>
        ) : (
          <div className='mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-400'>
            Lancez l’assistant pour obtenir une liste d’actions ordonnées.
          </div>
        )}

        {pillars && state && variant === 'full' ? (
          <div className='mt-8'>
            <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Priorisation indicative</p>
            <p className='mt-1 text-xs text-gray-500'>
              Estimation à partir de votre profil — complétez avec des quiz et la progression compte pour affiner.
            </p>
            <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              <PillarBar label='Savoir (cours, fondamentaux)' value={pillars.savoir} />
              <PillarBar label='Pratique (enquêtes, articulation)' value={pillars.pratique} />
              <PillarBar label='Épreuve 1' value={pillars.e1} />
              <PillarBar label='Épreuve 2' value={pillars.e2} />
              <PillarBar label='Épreuve 3' value={pillars.e3} />
            </div>
          </div>
        ) : null}

        {pillars && state && variant === 'compact' ? (
          <div className='mt-4 grid gap-3 sm:grid-cols-3'>
            <PillarBar label='Savoir' value={pillars.savoir} />
            <PillarBar label='Pratique' value={pillars.pratique} />
            <PillarBar label={`Épr. ${state.weakEpreuve} (focus)`} value={state.weakEpreuve === '1' ? pillars.e1 : state.weakEpreuve === '2' ? pillars.e2 : pillars.e3} />
          </div>
        ) : null}

        {actions.length > 1 && variant === 'full' ? (
          <div className='mt-8'>
            <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Votre liste (ordre suggéré)</p>
            <ol className='mt-3 space-y-2'>
              {actions.map((a, i) => (
                <li key={`${a.href}-${i}`} className='flex gap-3 text-sm'>
                  <span className='font-mono text-xs text-violet-400/90'>{i + 1}.</span>
                  <div>
                    <Link href={a.href} className='font-semibold text-white hover:text-violet-200'>
                      {a.label}
                    </Link>
                    <p className='text-xs text-gray-500'>{a.hint}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {variant === 'full' ? (
          <div className='mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6'>
            <Link
              href='/cours/enquetes'
              className='rounded-lg border border-violet-500/40 bg-violet-500/15 px-3 py-2 text-xs font-semibold text-violet-100 hover:bg-violet-500/25'
            >
              Enquête débutant (Alpha)
            </Link>
            <Link
              href='/fondamentaux'
              className='rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2 text-xs text-gray-300 hover:bg-white/10'
            >
              Fondamentaux
            </Link>
            <Link href='/epreuves/epreuve-1' className='rounded-lg border border-white/15 px-3 py-2 text-xs text-gray-300 hover:bg-white/10'>
              Épreuve 1
            </Link>
            <Link href='/epreuves/epreuve-2' className='rounded-lg border border-white/15 px-3 py-2 text-xs text-gray-300 hover:bg-white/10'>
              Épreuve 2
            </Link>
            <Link href='/epreuves/epreuve-3' className='rounded-lg border border-white/15 px-3 py-2 text-xs text-gray-300 hover:bg-white/10'>
              Épreuve 3
            </Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
