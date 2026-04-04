'use client';

import { Pencil } from 'lucide-react';

import { type CartoucheData, coteLabel, formatContenuLignes } from '@/components/entrainement/articulation-types';
import { cn } from '@/utils/cn';

type Props = {
  data: CartoucheData;
  onEdit?: () => void;
  flash?: boolean;
  hideEdit?: boolean;
};

export function CartoucheValidee({ data, onEdit, flash, hideEdit }: Props) {
  const lignes = formatContenuLignes(data.contenu);

  return (
    <article
      className={`relative overflow-hidden rounded-sm border border-slate-300 bg-white font-serif text-black shadow-sm transition-[box-shadow] duration-300 ${
        flash ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
      } border-l-2 border-l-emerald-500`}
    >
      {onEdit ? (
        <button
          type='button'
          onClick={onEdit}
          className='absolute right-2 top-2 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800'
          title='Modifier cette côte'
          aria-label='Modifier cette côte'
        >
          <Pencil className='size-4' />
        </button>
      ) : null}
      <div className='grid grid-cols-1 border-b border-slate-300 md:grid-cols-[130px_1fr] md:border-b-0'>
        <div className='flex flex-row flex-wrap items-center justify-center gap-3 border-slate-300 bg-slate-100 px-3 py-4 md:flex-col md:justify-center md:border-r md:border-b-0 md:py-6'>
          <span className='text-xl font-bold tabular-nums'>{coteLabel(data.id)}</span>
          <div className='text-center text-sm'>
            <p>{data.date}</p>
            <p className='mt-1'>{data.heure}</p>
            <p className='mt-2 whitespace-pre-line text-xs leading-tight'>{data.qualite}</p>
          </div>
        </div>
        <div className={cn('px-4 py-4 md:py-5', onEdit && !hideEdit && 'pr-10')}>
          <h3 className='text-base font-bold uppercase underline decoration-2 underline-offset-2'>{data.titre.trim()}</h3>
          <ul className='mt-4 space-y-1.5 text-sm leading-relaxed'>
            {lignes.map((line, i) => (
              <li key={i} className='pl-1'>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
