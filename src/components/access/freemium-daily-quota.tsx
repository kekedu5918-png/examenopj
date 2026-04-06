import Link from 'next/link';

import { cn } from '@/utils/cn';

/** Pastilles pleines / vides + libellé « X / max … aujourd’hui » (quiz ou flashcards). */
export function FreemiumDailyQuotaProgress({
  used,
  max,
  unit,
}: {
  used: number;
  max: number;
  unit: 'quiz' | 'flashcards';
}) {
  const label =
    unit === 'quiz'
      ? `${used} / ${max} questions utilisées aujourd'hui`
      : `${used} / ${max} flashcards vues aujourd'hui`;

  return (
    <div
      className='mb-6 flex flex-col items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-4'
      role='status'
      aria-live='polite'
    >
      <div className='flex items-center justify-center gap-2' aria-hidden>
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={cn(
              'h-2.5 w-2.5 shrink-0 rounded-full',
              i < used ? 'bg-amber-400' : 'border border-amber-500/50 bg-amber-950/40',
            )}
          />
        ))}
      </div>
      <p className='text-center text-sm text-amber-100/95'>{label}</p>
      <p className='text-center text-xs text-amber-200/70'>
        <Link href='/pricing' className='font-medium text-amber-300 underline-offset-2 hover:underline'>
          Accès complet
        </Link>{' '}
        : illimité.
      </p>
    </div>
  );
}

/** Écran plein quand la limite quiz journalière est atteinte (remplace le formulaire de lancement). */
export function FreemiumQuizDailyLimitWall() {
  return (
    <div className='mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-amber-500/25 bg-amber-500/[0.08] px-6 py-10 text-center'>
      <h2 className='font-display text-xl font-bold text-white md:text-2xl'>C&apos;est tout pour aujourd&apos;hui !</h2>
      <p className='mt-4 text-sm leading-relaxed text-amber-50/95'>
        Vous avez utilisé vos 5 questions du jour. Revenez demain pour continuer, ou passez à l&apos;accès complet pour
        réviser sans limite jusqu&apos;au 11 juin.
      </p>
      <p className='mt-3 text-xs text-slate-500'>Remise à zéro automatique à minuit</p>
      <Link
        href='/pricing'
        className='mt-8 inline-flex rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:opacity-95'
      >
        Accès complet →
      </Link>
      <p className='mt-6 text-sm text-slate-500'>Revenir demain</p>
    </div>
  );
}

/** Écran quand la limite flashcards est atteinte (remplace le formulaire de sélection). */
export function FreemiumFlashcardsDailyLimitWall() {
  return (
    <div className='mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-amber-500/25 bg-amber-500/[0.08] px-6 py-10 text-center'>
      <h2 className='font-display text-xl font-bold text-white md:text-2xl'>C&apos;est tout pour aujourd&apos;hui !</h2>
      <p className='mt-4 text-sm leading-relaxed text-amber-50/95'>
        Vous avez vu vos 5 flashcards du jour. Revenez demain ou passez à l&apos;accès complet.
      </p>
      <p className='mt-3 text-xs text-slate-500'>Remise à zéro automatique à minuit</p>
      <Link
        href='/pricing'
        className='mt-8 inline-flex rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:opacity-95'
      >
        Accès complet →
      </Link>
      <p className='mt-6 text-sm text-slate-500'>Revenir demain</p>
    </div>
  );
}
