import type { PropsWithChildren, ReactNode } from 'react';

import { cn } from '@/utils/cn';

/** Encadré « À retenir » — remplace les pavés de texte sur les pages pédagogiques. */
export function RetenirCard({
  title = 'À retenir',
  children,
  className,
}: PropsWithChildren<{ title?: string; className?: string }>) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-amber-500/25 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-50',
        className,
      )}
    >
      <p className='mb-2 text-xs font-bold uppercase tracking-wider text-amber-200/90'>{title}</p>
      <div className='space-y-2 leading-relaxed text-amber-50/95'>{children}</div>
    </aside>
  );
}

/** Liste checklist avec cases (affichage uniquement). */
export function ChecklistSynthèse({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('space-y-2 text-sm text-slate-300', className)}>
      {items.map((t) => (
        <li key={t} className='flex gap-2'>
          <span className='mt-0.5 text-emerald-400' aria-hidden>
            ✓
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Tableau comparatif simple (2 colonnes max). */
export function SynthèseTable({
  headers,
  rows,
  className,
}: {
  headers: [string, string];
  rows: [ReactNode, ReactNode][];
  className?: string;
}) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-white/10', className)}>
      <table className='w-full border-collapse text-left text-sm'>
        <thead>
          <tr className='border-b border-white/10 bg-white/[0.04]'>
            <th className='px-3 py-2 font-semibold text-white'>{headers[0]}</th>
            <th className='px-3 py-2 font-semibold text-white'>{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className='border-b border-white/[0.06] last:border-0'>
              <td className='px-3 py-2 align-top text-slate-300'>{row[0]}</td>
              <td className='px-3 py-2 align-top text-slate-400'>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
