'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

import {
  getCalendarDaysUntilParisDate,
  getDaysUntilNextParisSession,
  type ParisYmd,
} from '@/constants/exam-dates';

/** Jours calendaires restants avant l’écrit du 11 juin 2026 (comportement attendu côté affichage marketing). */
export function getWrittenExamDaysRemainingSimple(): number {
  return Math.max(0, Math.ceil((new Date('2026-06-11').getTime() - Date.now()) / 86_400_000));
}

const ECRITS_BLANCS_2026: readonly ParisYmd[] = [
  { y: 2026, m: 4, d: 13 },
  { y: 2026, m: 5, d: 4 },
];

const ORAL_FIRST_2026: ParisYmd = { y: 2026, m: 6, d: 15 };

/** Compteur jours avant écrit 11 juin — rendu immédiat côté client + rafraîchissement léger. */
export function WrittenExamDaysCount({ className }: { className?: string }) {
  const [v, setV] = useState(() => getWrittenExamDaysRemainingSimple());
  useEffect(() => {
    setV(getWrittenExamDaysRemainingSimple());
    const id = window.setInterval(() => setV(getWrittenExamDaysRemainingSimple()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className={className}>{v}</span>;
}

/** Contenu dynamique carte « Écrits blancs » (hydratation sûre). */
export function EcritsBlancsCardContent() {
  const [state, setState] = useState<'pending' | { done: true } | { days: number }>('pending');
  useEffect(() => {
    const n = getDaysUntilNextParisSession(ECRITS_BLANCS_2026);
    if (n === null) setState({ done: true });
    else setState({ days: n });
  }, []);

  if (state === 'pending') {
    return (
      <p className='mt-6 font-display text-2xl font-bold tabular-nums text-examen-ink'>
        <span className='text-examen-inkMuted'>—</span>
      </p>
    );
  }
  if ('days' in state) {
    return (
      <p className='mt-6 font-display text-2xl font-bold tabular-nums text-examen-ink'>
        {state.days}{' '}
        <span className='text-base font-normal text-examen-inkMuted'>jour{state.days > 1 ? 's' : ''}</span>
      </p>
    );
  }
  return (
    <p className='mt-6 inline-flex items-center justify-center gap-2 text-lg font-semibold text-emerald-400'>
      <Check className='size-5' strokeWidth={2.5} aria-hidden />
      Terminé
    </p>
  );
}

/** Jours restants avant écrit (carte countdown) — aligné sur 11 juin 2026, Paris. */
export function CountdownWrittenExamBlock() {
  const [v, setV] = useState(() => getWrittenExamDaysRemainingSimple());
  useEffect(() => {
    setV(getWrittenExamDaysRemainingSimple());
    const id = window.setInterval(() => setV(getWrittenExamDaysRemainingSimple()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (v <= 0) {
    return <p className='relative mt-6 text-lg font-semibold text-emerald-400'>Jour J</p>;
  }
  return (
    <p className='relative mt-6 font-display text-4xl font-bold tabular-nums'>
      <span className='inline-block animate-countdown-pulse text-gold-400 will-change-transform'>
        {v} jours restants
      </span>
    </p>
  );
}

/** Jours avant premier créneau oral (15 juin 2026). */
export function OralFirstSlotDayCount() {
  const [v, setV] = useState<number | null>(null);
  useEffect(() => {
    setV(getCalendarDaysUntilParisDate(ORAL_FIRST_2026.y, ORAL_FIRST_2026.m, ORAL_FIRST_2026.d));
  }, []);
  if (v === null) {
    return (
      <p className='mt-6 font-display text-2xl font-bold tabular-nums text-examen-ink'>
        <span className='text-examen-inkMuted'>—</span>
      </p>
    );
  }
  if (v <= 0) {
    return <p className='mt-6 text-lg font-semibold text-examen-ink'>Période en cours ou passée</p>;
  }
  return (
    <p className='mt-6 font-display text-2xl font-bold tabular-nums text-examen-ink'>
      {v}{' '}
      <span className='text-base font-normal text-examen-inkMuted'>
        jour{v > 1 ? 's' : ''} avant le premier créneau
      </span>
    </p>
  );
}
