'use client';

import { Printer } from 'lucide-react';

import type { CartoucheData } from '@/components/entrainement/articulation-types';
import { CartoucheValidee } from '@/components/entrainement/CartoucheValidee';

type Props = {
  titreArticulation: string;
  cartouches: CartoucheData[];
  onRecommencer: () => void;
};

export function ArticulationRecap({ titreArticulation, cartouches, onRecommencer }: Props) {
  const valides = cartouches.filter((c) => c.valide);
  const dateStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
  }).format(new Date());

  return (
    <div className='space-y-8'>
      <div
        id='articulation-print-area'
        className='space-y-6 rounded-xl border border-slate-300 bg-white p-6 font-serif text-black shadow-lg print:border-0 print:shadow-none'
      >
        <header className='border-b-2 border-black pb-4 text-center'>
          <h2 className='text-lg font-bold uppercase underline'>Articulation de procédure</h2>
          {titreArticulation.trim() ? (
            <p className='mt-3 text-sm font-semibold'>{titreArticulation.trim()}</p>
          ) : null}
        </header>
        <div className='space-y-0'>
          {valides.map((c) => (
            <CartoucheValidee key={c.id} data={c} hideEdit />
          ))}
        </div>
        <p className='text-center text-sm text-slate-600'>
          {valides.length} côte{valides.length > 1 ? 's' : ''} PV — Articulé le {dateStr}
        </p>
      </div>
      <div className='flex flex-wrap gap-3 print:hidden'>
        <button
          type='button'
          onClick={onRecommencer}
          className='rounded-lg bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700'
        >
          Recommencer
        </button>
        <button
          type='button'
          onClick={() => window.print()}
          className='inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50'
        >
          <Printer className='size-4' aria-hidden />
          Imprimer / PDF
        </button>
      </div>
    </div>
  );
}
