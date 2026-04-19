'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Award,
  BookMarked,
  BookOpen,
  Files,
  LayoutGrid,
  LineChart,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/utils/cn';

type Item = {
  href: string;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  /** Lien vers une rubrique publique (hors `/dashboard/*`) — affiché avec une distinction visuelle. */
  external?: boolean;
};

const PRIVATE_ITEMS: readonly Item[] = [
  {
    href: '/dashboard',
    label: "Vue d'ensemble",
    description: "Plan d'attaque, prochaine action",
    Icon: LayoutGrid,
  },
  {
    href: '/dashboard/parcours',
    label: 'Parcours',
    description: 'Modules guidés pas à pas',
    Icon: BookMarked,
  },
  {
    href: '/dashboard/progression',
    label: 'Progression',
    description: 'Streak, XP, statistiques',
    Icon: LineChart,
  },
  {
    href: '/dashboard/badges',
    label: 'Badges',
    description: 'Récompenses débloquées et à venir',
    Icon: Award,
  },
  {
    href: '/dashboard/recherche',
    label: 'Recherche',
    description: 'Cours, infractions, QCM',
    Icon: Search,
  },
  {
    href: '/dashboard/fiches',
    label: 'Fiches',
    description: 'Synthèses prêtes pour la révision',
    Icon: Files,
  },
  {
    href: '/dashboard/infractions',
    label: 'Mes infractions',
    description: 'Cartes étudiées & taux de maîtrise',
    Icon: ShieldAlert,
  },
];

const PUBLIC_ITEMS: readonly Item[] = [
  {
    href: '/fondamentaux',
    label: 'Fondamentaux',
    description: 'Fiches procédure & garde à vue',
    Icon: BookOpen,
    external: true,
  },
  {
    href: '/entrainement/quiz',
    label: 'Quiz',
    description: 'QCM par thème ou aléatoire',
    Icon: Sparkles,
    external: true,
  },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname === href || pathname.startsWith(href + '/');
}

function NavLink({ item, pathname }: { item: Item; pathname: string }) {
  const active = isActivePath(pathname, item.href);
  const Icon = item.Icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
        active
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
          : 'text-ds-text-muted hover:bg-ds-bg-elevated hover:text-ds-text-primary',
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          active ? 'text-blue-600 dark:text-blue-400' : 'text-ds-text-muted group-hover:text-ds-text-primary',
        )}
      />
      <div className='min-w-0 flex-1'>
        <p className='font-medium leading-tight'>{item.label}</p>
        <p className='mt-0.5 text-[11px] leading-tight text-ds-text-muted/80'>{item.description}</p>
      </div>
      {item.external ? (
        <span className='mt-1 text-[10px] uppercase tracking-wider text-ds-text-muted/70'>↗</span>
      ) : null}
    </Link>
  );
}

/**
 * Sidebar de l'espace membre — visible en desktop (≥ lg).
 * Sur mobile, la navigation est assurée par `AccountBottomNav` (5 raccourcis).
 */
export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'sticky top-20 hidden h-fit w-60 shrink-0 lg:block',
        className,
      )}
      aria-label='Navigation espace membre'
    >
      <nav className='space-y-1'>
        <p className='px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ds-text-muted'>
          Mon espace
        </p>
        {PRIVATE_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
        <p className='px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-ds-text-muted'>
          Accès rapide
        </p>
        {PUBLIC_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}
