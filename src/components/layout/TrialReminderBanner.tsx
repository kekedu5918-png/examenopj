'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

type TrialReminderBannerProps = {
  daysLeft: number;
  endsAtIso: string;
};

function storageKey(endsAtIso: string) {
  return `examenopj-trial-reminder-dismissed:${endsAtIso}`;
}

export function TrialReminderBanner({ daysLeft, endsAtIso }: TrialReminderBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem(storageKey(endsAtIso)) === '1') {
        setVisible(false);
      }
    } catch {
      /* ignore */
    }
  }, [endsAtIso]);

  function dismiss() {
    try {
      localStorage.setItem(storageKey(endsAtIso), '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  const jourLabel = daysLeft <= 1 ? 'environ 1 jour' : `environ ${daysLeft} jours`;

  return (
    <div className='relative z-50 border-b border-amber-500/40 bg-amber-500/15 px-4 py-2.5 text-center text-sm text-amber-50'>
      <p className='mx-auto max-w-3xl'>
        <span className='font-semibold text-amber-100'>Fin de votre essai gratuit dans {jourLabel}.</span>{' '}
        Après cette date, votre compte passera en <strong className='text-amber-50'>freemium</strong> (quotas quiz /
        flashcards). Pour garder un accès illimité,{' '}
        <Link href='/pricing#tarifs-premium' className='font-semibold underline underline-offset-2'>
          choisissez une offre Premium
        </Link>
        .
      </p>
      <button
        type='button'
        onClick={dismiss}
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-amber-200/80 hover:bg-amber-500/20 hover:text-amber-50'
        aria-label='Masquer ce rappel'
      >
        <X className='h-4 w-4' />
      </button>
    </div>
  );
}
