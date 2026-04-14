import Link from 'next/link';
import { ArrowUpRight, BookOpen, LayoutDashboard, Route } from 'lucide-react';

import { cn } from '@/utils/cn';

const items = [
  {
    href: '/dashboard',
    label: 'Tableau de bord',
    hint: 'Vue d’ensemble, prochaine action, streak',
    Icon: LayoutDashboard,
  },
  {
    href: '/dashboard/parcours',
    label: 'Parcours OPJ',
    hint: 'Modules et étapes débloquées comme un parcours guidé',
    Icon: Route,
  },
  {
    href: '/dashboard/progression',
    label: 'Progression & XP',
    hint: 'Historique, XP et régularité',
    Icon: BookOpen,
  },
] as const;

/** Accès rapides — cartes cliquables, focus visible, responsive. */
export function AccountLearningShortcuts() {
  return (
    <ul className='grid gap-3 sm:grid-cols-1 md:grid-cols-3'>
      {items.map(({ href, label, hint, Icon }) => (
        <li key={href}>
          <Link
            href={href}
            className={cn(
              'group flex h-full flex-col rounded-xl border border-ds-border bg-ds-bg-primary/70 p-4 transition-all',
              'hover:border-cyan-500/35 hover:shadow-md hover:shadow-cyan-500/5',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500/60',
              'dark:bg-slate-900/50 dark:hover:border-cyan-400/30',
            )}
          >
            <span className='flex items-start justify-between gap-2'>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ds-border/80 bg-ds-bg-secondary text-ds-text-primary dark:border-white/10 dark:bg-slate-800/80'>
                <Icon className='h-[18px] w-[18px]' aria-hidden />
              </span>
              <ArrowUpRight
                className='h-4 w-4 shrink-0 text-ds-text-muted opacity-0 transition group-hover:opacity-100'
                aria-hidden
              />
            </span>
            <span className='mt-3 block text-sm font-semibold text-ds-text-primary'>{label}</span>
            <span className='mt-1 block text-xs leading-snug text-ds-text-muted'>{hint}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
