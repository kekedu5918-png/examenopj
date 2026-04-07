'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import {
  buildPreparationActions,
  PREPARATION_ONBOARDING_STORAGE_KEY,
  type PreparationOnboardingState,
} from '@/features/onboarding/preparation-onboarding';
import { cn } from '@/utils/cn';

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: (state: PreparationOnboardingState) => void;
};

export function PreparationOnboardingModal({ open, onClose, onComplete }: Props) {
  const [targetMonth, setTargetMonth] = useState<PreparationOnboardingState['targetMonth']>('2026-06');
  const [hoursPerWeek, setHoursPerWeek] = useState<PreparationOnboardingState['hoursPerWeek']>('5-10');
  const [weakEpreuve, setWeakEpreuve] = useState<PreparationOnboardingState['weakEpreuve']>('2');
  const [level, setLevel] = useState<PreparationOnboardingState['level']>('intermediaire');

  if (!open) return null;

  function submit() {
    const state: PreparationOnboardingState = {
      completedAt: new Date().toISOString(),
      targetMonth,
      hoursPerWeek,
      weakEpreuve,
      level,
    };
    try {
      localStorage.setItem(PREPARATION_ONBOARDING_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota */
    }
    onComplete(state);
    onClose();
  }

  return (
    <div
      className='fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 sm:items-center'
      role='dialog'
      aria-modal='true'
      aria-labelledby='prep-onb-title'
    >
      <div className='relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/15 bg-slate-950 p-6 shadow-2xl'>
        <button
          type='button'
          onClick={onClose}
          className='absolute right-4 top-4 rounded-lg p-1 text-gray-500 hover:bg-white/10 hover:text-white'
          aria-label='Fermer'
        >
          <X className='h-5 w-5' />
        </button>
        <p className='text-xs font-semibold uppercase tracking-wide text-emerald-400/90'>Environ 60 secondes</p>
        <h2 id='prep-onb-title' className='mt-2 font-display text-xl font-bold text-white'>
          Personnaliser ma préparation
        </h2>
        <p className='mt-2 text-sm text-gray-400'>
          Répondez en quelques clics : nous générons une liste d’actions concrètes (liens du site) et des indicateurs de priorité.
        </p>

        <div className='mt-6 space-y-5'>
          <label className='block'>
            <span className='text-xs font-semibold text-gray-300'>Date cible du concours</span>
            <select
              value={targetMonth}
              onChange={(e) => setTargetMonth(e.target.value as PreparationOnboardingState['targetMonth'])}
              className='mt-1.5 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white'
            >
              <option value='2026-06'>Juin 2026</option>
              <option value='2026-11'>Novembre 2026</option>
              <option value='2027-plus'>2027 ou plus</option>
            </select>
          </label>

          <label className='block'>
            <span className='text-xs font-semibold text-gray-300'>Temps disponible par semaine</span>
            <select
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value as PreparationOnboardingState['hoursPerWeek'])}
              className='mt-1.5 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white'
            >
              <option value='lt5'>Moins de 5 h</option>
              <option value='5-10'>5 à 10 h</option>
              <option value='10plus'>Plus de 10 h</option>
            </select>
          </label>

          <fieldset>
            <legend className='text-xs font-semibold text-gray-300'>Épreuve à renforcer en priorité</legend>
            <div className='mt-2 flex flex-wrap gap-2'>
              {(
                [
                  { id: '1' as const, label: 'Épreuve 1 (écrit)' },
                  { id: '2' as const, label: 'Épreuve 2 (cas pratique)' },
                  { id: '3' as const, label: 'Épreuve 3 (oral)' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type='button'
                  onClick={() => setWeakEpreuve(opt.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-xs font-semibold transition md:text-sm',
                    weakEpreuve === opt.id
                      ? 'border-violet-500/50 bg-violet-500/15 text-violet-100'
                      : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className='block'>
            <span className='text-xs font-semibold text-gray-300'>Niveau estimé</span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as PreparationOnboardingState['level'])}
              className='mt-1.5 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white'
            >
              <option value='debutant'>Débutant</option>
              <option value='intermediaire'>Intermédiaire</option>
              <option value='confirme'>Confirmé</option>
            </select>
          </label>
        </div>

        <div className='mt-6 flex flex-wrap gap-3'>
          <button
            type='button'
            onClick={submit}
            className='rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500'
          >
            Générer mon plan
          </button>
          <button type='button' onClick={onClose} className='text-sm text-gray-400 hover:text-white'>
            Plus tard
          </button>
        </div>
        <p className='mt-4 text-[11px] text-gray-500'>
          Aperçu des actions : {buildPreparationActions({ completedAt: '', targetMonth, hoursPerWeek, weakEpreuve, level }).length}{' '}
          liens — stockés sur cet appareil (localStorage).
        </p>
      </div>
    </div>
  );
}
