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
      <h2 className='mt-3 font-ij-sans text-xl font-bold text-ij-text'>Impossible de charger cette fiche</h2>
      <p className='mt-2 max-w-sm font-ij-sans text-sm text-ij-text-muted'>Vérifiez votre connexion et réessayez.</p>
      <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
        <button
          type='button'
          onClick={() => reset()}
          className='rounded-xl bg-ij-accent px-5 py-2.5 font-ij-sans text-sm font-semibold text-ij-bg transition hover:opacity-90'
        >
          Réessayer
        </button>
        <Link
          href='/fondamentaux'
          className='rounded-xl border border-ij-border bg-ij-surface-2 px-5 py-2.5 font-ij-sans text-sm font-semibold text-ij-text transition hover:bg-ij-surface'
        >
          Retour aux fondamentaux
        </Link>
      </div>
    </ErrorFallbackLayout>
  );
}
