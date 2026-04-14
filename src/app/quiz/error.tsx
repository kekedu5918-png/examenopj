'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { ErrorFallbackLayout } from '@/components/ui/error-fallback-layout';

export default function QuizError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[quiz] error:', error);
  }, [error]);

  return (
    <ErrorFallbackLayout>
      <p className='text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400'>Erreur</p>
      <h2 className='mt-3 font-sans text-xl font-bold text-ds-text-primary'>Le quiz n&apos;a pas pu démarrer</h2>
      <p className='mt-2 max-w-sm text-sm text-ds-text-muted'>
        Une erreur s&apos;est produite lors du chargement du quiz. Ta progression précédente est sauvegardée.
      </p>
      <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
        <button
          type='button'
          onClick={() => reset()}
          className='rounded-xl bg-examen-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'
        >
          Réessayer
        </button>
        <Link
          href='/entrainement'
          className='rounded-xl border border-ds-border bg-ds-bg-secondary px-5 py-2.5 text-sm font-semibold text-ds-text-primary transition hover:bg-ds-bg-elevated dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10'
        >
          Retour à l&apos;entraînement
        </Link>
      </div>
    </ErrorFallbackLayout>
  );
}
