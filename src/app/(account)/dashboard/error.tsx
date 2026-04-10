'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-[40vh] flex-col items-center justify-center space-y-4 rounded-xl bg-slate-950 p-8 text-center'>
      <p className='text-sm font-semibold uppercase tracking-wide text-red-400'>Erreur</p>
      <h2 className='text-xl font-bold text-white'>Une erreur s&apos;est produite dans le tableau de bord</h2>
      <p className='max-w-md text-sm text-slate-400'>
        Vous pouvez réessayer ou retourner à l&apos;accueil.
      </p>
      <div className='flex flex-wrap justify-center gap-3'>
        <button
          type='button'
          onClick={() => reset()}
          className='rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500'
        >
          Réessayer
        </button>
        <Link
          href='/'
          className='rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10'
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
