'use client';

import { cn } from '@/utils/cn';

export type DomainFilter = 'ALL' | 'DPS' | 'DPG' | 'PROCEDURE';

type Tab = {
  value: DomainFilter;
  label: string;
  color: string;
  activeColor: string;
};

const TABS: Tab[] = [
  {
    value: 'ALL',
    label: 'Tous',
    color: 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200',
    activeColor: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-100',
  },
  {
    value: 'DPS',
    label: 'Droit pénal spécial',
    color: 'border-white/10 text-gray-400 hover:border-red-500/20 hover:text-red-200',
    activeColor: 'border-red-500/50 bg-red-500/10 text-red-100',
  },
  {
    value: 'DPG',
    label: 'Droit pénal général',
    color: 'border-white/10 text-gray-400 hover:border-violet-500/20 hover:text-violet-200',
    activeColor: 'border-violet-500/50 bg-violet-500/10 text-violet-100',
  },
  {
    value: 'PROCEDURE',
    label: 'Procédure pénale',
    color: 'border-white/10 text-gray-400 hover:border-blue-500/20 hover:text-blue-200',
    activeColor: 'border-blue-500/50 bg-blue-500/10 text-blue-100',
  },
];

type Props = {
  value: DomainFilter;
  onChange: (v: DomainFilter) => void;
  counts?: Partial<Record<DomainFilter, number>>;
  className?: string;
};

export function DomainTabs({ value, onChange, counts, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2',
        className,
      )}
      role='tablist'
      aria-label='Filtrer par domaine'
    >
      {TABS.map((tab) => {
        const active = value === tab.value;
        const count = counts?.[tab.value];
        return (
          <button
            key={tab.value}
            type='button'
            role='tab'
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-150',
              active ? tab.activeColor : tab.color,
            )}
          >
            {tab.label}
            {count != null && (
              <span
                className={cn(
                  'ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                  active ? 'bg-white/20 text-inherit' : 'bg-white/[0.06] text-gray-500',
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
