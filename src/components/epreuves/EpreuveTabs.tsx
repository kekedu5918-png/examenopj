'use client';

import Link from 'next/link';

import { cn } from '@/utils/cn';

const tabs = [
  { href: '/epreuves/epreuve-1', label: 'Épreuve 1', sublabel: 'DPG / DPS', key: '1' as const },
  { href: '/epreuves/epreuve-2', label: 'Épreuve 2', sublabel: 'Procédure pénale', key: '2' as const },
  { href: '/epreuves/epreuve-3', label: 'Épreuve 3', sublabel: 'Oral CR Parquet', key: '3' as const },
];

const activeTabClass: Record<'1' | '2' | '3', string> = {
  '1': 'border-blue-500/50 bg-blue-600/20 text-white',
  '2': 'border-emerald-500/50 bg-emerald-600/20 text-white',
  '3': 'border-violet-500/50 bg-violet-600/20 text-white',
};

export function EpreuveTabs({ active }: { active: '1' | '2' | '3' }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              'flex min-w-[9rem] flex-1 flex-col rounded-xl border px-4 py-3 text-sm transition-colors sm:flex-none sm:min-w-0',
              isActive
                ? activeTabClass[t.key]
                : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-gray-200'
            )}
          >
            <span className='font-semibold'>{t.label}</span>
            <span className='mt-0.5 text-xs opacity-80'>{t.sublabel}</span>
          </Link>
        );
      })}
    </div>
  );
}
