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
      <div className='grid grid-cols-1 border-b border-slate-300 md:grid-cols-[130px_1fr] md:border-b-0 print:!grid-cols-1 print:border-b print:border-black'>
        <div className='flex flex-row flex-wrap items-center justify-center gap-3 border-slate-300 bg-slate-100 px-3 py-4 md:flex-col md:justify-center md:border-r md:border-b-0 md:py-6 print:flex-row print:flex-wrap print:items-baseline print:justify-start print:gap-6 print:border-b print:border-r-0 print:border-black print:bg-white print:px-2 print:py-2'>
          <span className='text-xl font-bold tabular-nums'>{coteLabel(data.id)}</span>
          <div className='text-center text-sm print:text-left'>
            <p className='print:inline'>
              <span className='print:mr-2 print:font-semibold'>Date :</span>
              {data.date}
            </p>
            <p className='mt-1 print:mt-0 print:inline print:ml-4'>
              <span className='print:mr-2 print:font-semibold'>Heure :</span>
              {data.heure}
            </p>
            <p className='mt-2 whitespace-pre-line text-xs leading-tight print:mt-0 print:ml-4 print:inline print:text-sm'>
              <span className='print:mr-2 print:font-semibold'>Qualité :</span>
              {data.qualite}
            </p>
          </div>
        </div>
        <div className={cn('px-4 py-4 md:py-5 print:px-2 print:py-3', onEdit && !hideEdit && 'pr-10')}>
          <h3 className='text-base font-bold uppercase underline decoration-2 underline-offset-2'>{data.titre.trim()}</h3>
          <ul className='mt-4 space-y-1.5 text-sm leading-relaxed print:mt-2 print:space-y-1'>
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
