'use client';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

import { CAT_ORDER, COULEURS } from './fondamentaux-theme';

export type FiltreCategorie = Categorie | 'all';

interface Props {
  fiches: Fiche[];
  categories: Record<Categorie, { label: string; couleur: string }>;
  value: FiltreCategorie;
  onChange: (c: FiltreCategorie) => void;
}

export function FondamentauxFilters({ fiches, categories, value, onChange }: Props) {
  return (
    <div className='sticky top-16 z-30 border-b border-white/10 bg-navy-950/95 px-4 py-3 backdrop-blur-md sm:px-8'>
      <div className='mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <TabButton
          active={value === 'all'}
          onClick={() => onChange('all')}
          dotClassName='bg-slate-400'
          className={
            value === 'all' ? 'bg-white/10 text-white after:bg-slate-400 after:opacity-100' : ''
          }
        >
          Tout ({fiches.length})
        </TabButton>
        {CAT_ORDER.map((key) => {
          const meta = categories[key];
          const count = fiches.filter((f) => f.categorie === key).length;
          const c = COULEURS[meta.couleur];
          const active = value === key;
          return (
            <TabButton
              key={key}
              active={active}
              onClick={() => onChange(key)}
              dotClassName={c.dot}
              className={cn(active ? c.tabActive : '', active && cn('relative after:opacity-100', c.tabUnderline))}
            >
              <span className='whitespace-nowrap'>
                {meta.label} ({count})
              </span>
            </TabButton>
          );
        })}
      </div>
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
  dotClassName,
  className,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  dotClassName: string;
  className?: string;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors',
        'text-slate-400 hover:bg-white/5 hover:text-slate-200',
        'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:opacity-0 after:transition-opacity',
        active ? 'font-medium' : '',
        className
      )}
    >
      <span className={cn('h-2 w-2 shrink-0 rounded-full', dotClassName)} aria-hidden />
      {children}
    </button>
  );
}
