'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { ErrorFallbackLayout } from '@/components/ui/error-fallback-layout';

export default function FondamentauxError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[fondamentaux] error:', error);
  }, [error]);

  return (
    <ErrorFallbackLayout>
      <p className='text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400'>
        Erreur de chargement
      </p>
      <h2 className='mt-3 font-sans text-xl font-bold text-ds-text-primary'>Impossible de charger cette fiche</h2>
      <p className='mt-2 max-w-sm text-sm text-ds-text-muted'>Vérifiez votre connexion et réessayez.</p>
      <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
        <button
          type='button'
          onClick={() => reset()}
          className='rounded-xl bg-examen-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'
        >
          Réessayer
        </button>
        <Link
          href='/fondamentaux'
          className='rounded-xl border border-ds-border bg-ds-bg-secondary px-5 py-2.5 text-sm font-semibold text-ds-text-primary transition hover:bg-ds-bg-elevated dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10'
        >
          Retour aux fondamentaux
        </Link>
      </div>
    </ErrorFallbackLayout>
  );
}
