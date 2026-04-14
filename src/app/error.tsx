'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center bg-ds-bg-primary px-4 py-16 text-center'>
      <p className='text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400'>Erreur</p>
      <h1 className='mt-3 font-display text-2xl font-bold text-ds-text-primary md:text-3xl'>
        Une erreur s&apos;est produite
      </h1>
      <p className='mt-3 max-w-md text-sm text-ds-text-muted'>
        Vous pouvez réessayer ou retourner à l&apos;accueil. Si le problème persiste, contactez-nous via la page Contact.
      </p>
      <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
        <button
          type='button'
          onClick={() => reset()}
          className='rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 dark:hover:bg-cyan-500'
        >
          Réessayer
        </button>
        <Link
          href='/'
          className='rounded-xl border border-ds-border bg-ds-bg-secondary px-5 py-2.5 text-sm font-semibold text-ds-text-primary transition hover:bg-ds-bg-elevated dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10'
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
