'use client';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

import { CAT_ORDER, COULEURS } from './fondamentaux-theme';

export type FiltreCategorie = Categorie | 'all';

export type VueOrganisationFondamentaux = 'programme' | 'theme';

interface Props {
  fiches: Fiche[];
  categories: Record<Categorie, { label: string; couleur: string }>;
  value: FiltreCategorie;
  onChange: (c: FiltreCategorie) => void;
  /** Regroupement : ordre officiel F01–F15 ou par grande catégorie du site. */
  vueOrganisation: VueOrganisationFondamentaux;
  onVueOrganisationChange: (v: VueOrganisationFondamentaux) => void;
  /** N’afficher que les fiches `indispensableExamen` (combiné avec la catégorie). */
  prioriteExamenOnly: boolean;
  onPrioriteExamenOnlyChange: (v: boolean) => void;
}

export function FondamentauxFilters({
  fiches,
  categories,
  value,
  onChange,
  vueOrganisation,
  onVueOrganisationChange,
  prioriteExamenOnly,
  onPrioriteExamenOnlyChange,
}: Props) {
  const indispensableCount = fiches.filter((f) => f.indispensableExamen).length;

  return (
    <div className='sticky top-16 z-30 border-b border-white/10 bg-navy-950/95 px-4 py-3 backdrop-blur-md sm:px-8'>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-3 flex flex-wrap gap-2 border-b border-white/[0.06] pb-3'>
          <span className='mr-1 self-center text-[10px] font-bold uppercase tracking-wider text-slate-600'>Affichage</span>
          <button
            type='button'
            onClick={() => onVueOrganisationChange('programme')}
            className={cn(
              'rounded-xl border px-3 py-2 text-xs font-semibold transition',
              vueOrganisation === 'programme'
                ? 'border-violet-500/45 bg-violet-500/15 text-violet-100'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/15 hover:text-slate-200',
            )}
          >
            Programme F01–F15
          </button>
          <button
            type='button'
            onClick={() => onVueOrganisationChange('theme')}
            className={cn(
              'rounded-xl border px-3 py-2 text-xs font-semibold transition',
              vueOrganisation === 'theme'
                ? 'border-violet-500/45 bg-violet-500/15 text-violet-100'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/15 hover:text-slate-200',
            )}
          >
            Par thème (site)
          </button>
        </div>
        <div className='flex max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
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
        <div className='mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3'>
          <button
            type='button'
            role='switch'
            aria-checked={prioriteExamenOnly}
            aria-label='Filtrer les fiches marquées priorité concours'
            onClick={() => onPrioriteExamenOnlyChange(!prioriteExamenOnly)}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors',
              prioriteExamenOnly
                ? 'border-gold-500/40 bg-gold-500/15 text-gold-100'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/15 hover:text-slate-200',
            )}
          >
            <span
              className={cn(
                'relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors',
                prioriteExamenOnly ? 'bg-gold-500/90' : 'bg-slate-600/80',
              )}
              aria-hidden
            >
              <span
                className={cn(
                  'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
                  prioriteExamenOnly ? 'left-[18px]' : 'left-0.5',
                )}
              />
            </span>
            <span className='font-medium'>
              Indispensable examen{' '}
              <span className='tabular-nums text-slate-500'>({indispensableCount})</span>
            </span>
          </button>
          {prioriteExamenOnly ? (
            <span className='text-xs text-slate-500'>Combiné avec l’onglet catégorie ci-dessus.</span>
          ) : null}
        </div>
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
