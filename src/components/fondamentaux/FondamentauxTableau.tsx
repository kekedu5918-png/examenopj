'use client';

import { Fragment } from 'react';
import { Check, X } from 'lucide-react';

import type { Tableau } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

import { COULEURS } from './fondamentaux-theme';

function renderCellContent(text: string) {
  const parts = text.split(/(✅|❌|\bOui\b|\bNon\b)/g);
  return parts.map((part, i) => {
    if (part === '✅') {
      return (
        <span key={i} className='inline-flex text-emerald-400' title='Oui'>
          <Check className='h-3.5 w-3.5 shrink-0' strokeWidth={2.5} aria-hidden />
        </span>
      );
    }
    if (part === 'Oui') {
      return (
        <span key={i} className='inline-flex items-center gap-1 font-medium text-emerald-400'>
          <Check className='h-3.5 w-3.5 shrink-0' strokeWidth={2.5} aria-hidden />
          Oui
        </span>
      );
    }
    if (part === '❌') {
      return (
        <span key={i} className='inline-flex text-red-400/90' title='Non'>
          <X className='h-3.5 w-3.5 shrink-0' strokeWidth={2.5} aria-hidden />
        </span>
      );
    }
    if (part === 'Non') {
      return (
        <span key={i} className='inline-flex items-center gap-1 font-medium text-red-400/90'>
          <X className='h-3.5 w-3.5 shrink-0' strokeWidth={2.5} aria-hidden />
          Non
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

interface Props {
  tableau: Tableau;
  couleurKey: string;
}

export function FondamentauxTableau({ tableau, couleurKey }: Props) {
  const c = COULEURS[couleurKey] ?? COULEURS.emerald;

  return (
    <div className='overflow-x-auto rounded-xl border border-white/10'>
      <table className='w-full min-w-[20rem] border-collapse text-sm'>
        <thead className={cn('sticky top-0 z-[1]', c.tableHeader)}>
          <tr>
            {tableau.colonnes.map((col, i) => (
              <th
                key={i}
                scope='col'
                className='border-b border-white/10 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide'
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableau.lignes.map((ligne, ri) => (
            <tr
              key={ri}
              className={cn(
                'border-b border-white/5 transition-colors',
                ri % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
              )}
            >
              {ligne.map((cell, ci) => (
                <td
                  key={ci}
                  className={cn(
                    'px-4 py-3 text-xs leading-relaxed text-slate-300',
                    ci === 0 ? 'font-medium text-slate-200' : ''
                  )}
                >
                  {renderCellContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
