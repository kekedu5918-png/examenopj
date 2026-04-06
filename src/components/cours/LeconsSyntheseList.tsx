'use client';

import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  FileSearch,
  Globe2,
  Lock,
  Network,
  Package,
  Scale,
  Siren,
  Users,
} from 'lucide-react';

import type { CoursLeconChapitre, LeconAccent, LeconIconKey } from '@/data/cours-lecons-synthese';
import { COURS_LECONS_SYNTHESE } from '@/data/cours-lecons-synthese';
import { useReadModuleIds } from '@/hooks/use-read-module-ids';
import { cn } from '@/utils/cn';

const ICON_MAP: Record<LeconIconKey, typeof Scale> = {
  Scale,
  Siren,
  Lock,
  FileSearch,
  BookOpen,
  Users,
  Package,
  Network,
  Globe2,
};

const ACCENT_BAR: Record<LeconAccent, string> = {
  blue: 'bg-sky-500',
  red: 'bg-rose-500',
  amber: 'bg-amber-400',
  violet: 'bg-violet-500',
  teal: 'bg-teal-400',
  cyan: 'bg-cyan-400',
  emerald: 'bg-emerald-400',
  rose: 'bg-rose-400',
  indigo: 'bg-indigo-500',
};

const ICON_SURFACE: Record<LeconAccent, string> = {
  blue: 'from-sky-500/35 to-blue-600/25 text-sky-100',
  red: 'from-rose-500/35 to-red-700/25 text-rose-100',
  amber: 'from-amber-400/35 to-orange-600/25 text-amber-100',
  violet: 'from-violet-500/35 to-purple-700/25 text-violet-100',
  teal: 'from-teal-400/35 to-emerald-800/25 text-teal-100',
  cyan: 'from-cyan-400/35 to-sky-700/25 text-cyan-100',
  emerald: 'from-emerald-400/35 to-teal-800/25 text-emerald-100',
  rose: 'from-rose-400/35 to-pink-800/25 text-rose-100',
  indigo: 'from-indigo-500/35 to-violet-900/25 text-indigo-100',
};

function progressForChapter(readIds: ReadonlySet<string>, ch: CoursLeconChapitre): { done: number; total: number } {
  const total = ch.moduleIdsPourProgression.length;
  if (total === 0) return { done: 0, total: 0 };
  const done = ch.moduleIdsPourProgression.filter((id) => readIds.has(id)).length;
  return { done, total };
}

function LeconCard({ ch, readIds }: { ch: CoursLeconChapitre; readIds: ReadonlySet<string> }) {
  const Icon = ICON_MAP[ch.icon];
  const { done, total } = progressForChapter(readIds, ch);
  const chLabel = `Chapitre ${String(ch.ordre).padStart(2, '0')}`;

  return (
    <li>
      <Link
        href={ch.href}
        className={cn(
          'group relative flex min-h-[5.5rem] items-stretch overflow-hidden rounded-2xl border border-white/[0.08]',
          'bg-examen-card shadow-lg shadow-black/20 transition duration-200',
          'hover:-translate-y-0.5 hover:border-examen-accent/35 hover:shadow-ex-card-hover',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-examen-accent/50',
        )}
      >
        <span
          className={cn('w-1 shrink-0 self-stretch sm:w-1.5', ACCENT_BAR[ch.accent])}
          aria-hidden
        />
        <div className='flex min-w-0 flex-1 items-center gap-3 p-3 pr-2 sm:gap-4 sm:p-4'>
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br sm:h-14 sm:w-14',
              ICON_SURFACE[ch.accent],
            )}
            aria-hidden
          >
            <Icon className='h-6 w-6 sm:h-7 sm:w-7' strokeWidth={1.75} />
          </div>
          <div className='min-w-0 flex-1 py-0.5'>
            <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-examen-inkMuted sm:text-[11px]'>{chLabel}</p>
            <p className='mt-1 font-display text-base font-bold leading-snug text-white sm:text-lg'>{ch.titre}</p>
            <p className='mt-1 truncate text-xs text-cyan-300/90 sm:text-sm'>
              {ch.motsCles.join(' · ')}
            </p>
          </div>
          <div className='flex shrink-0 flex-col items-end justify-center gap-1 pl-1'>
            {total > 0 ? (
              <span className='text-[11px] font-semibold tabular-nums text-examen-inkMuted'>
                {done}/{total}
              </span>
            ) : (
              <span className='text-[11px] text-examen-inkMuted'>—</span>
            )}
            <ChevronRight
              className='h-5 w-5 text-examen-inkMuted transition group-hover:translate-x-0.5 group-hover:text-examen-accent'
              aria-hidden
            />
          </div>
        </div>
      </Link>
    </li>
  );
}

type Props = {
  chapitres?: CoursLeconChapitre[];
  className?: string;
};

export function LeconsSyntheseList({ chapitres = COURS_LECONS_SYNTHESE, className }: Props) {
  const readIds = useReadModuleIds();

  return (
    <ul id='lecons-synthese' className={cn('mx-auto max-w-xl space-y-3 md:max-w-2xl lg:max-w-3xl', className)}>
      {chapitres.map((ch) => (
        <LeconCard key={ch.id} ch={ch} readIds={readIds} />
      ))}
    </ul>
  );
}
