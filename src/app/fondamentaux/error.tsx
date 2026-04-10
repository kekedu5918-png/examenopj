'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function FondamentauxError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[fondamentaux] error:', error);
  }, [error]);

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center'>
      <p className='text-sm font-semibold uppercase tracking-wide text-amber-400'>Erreur</p>
      <h2 className='mt-3 font-sans text-xl font-bold text-white'>
        Fiche introuvable ou erreur de chargement
      </h2>
      <p className='mt-2 max-w-sm text-sm text-gray-400'>
        La fiche demandée n&apos;a pas pu être chargée. Elle existe peut-être sous un autre identifiant.
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
          href='/fondamentaux'
          className='rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10'
        >
          Tous les fondamentaux
        </Link>
      </div>
    </div>
  );
}
