'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, UserRound } from 'lucide-react';

import { cn } from '@/utils/cn';

const links = [
  { href: '/dashboard/parcours', label: 'Parcours', Icon: LayoutDashboard },
  { href: '/dashboard/courses', label: 'Cours', Icon: BookOpen },
  { href: '/account', label: 'Compte', Icon: UserRound },
] as const;

/**
 * Navigation bas d’écran (mobile) — activable avec `NEXT_PUBLIC_ACCOUNT_BOTTOM_NAV=1`.
 */
export function AccountBottomNav() {
  if (process.env.NEXT_PUBLIC_ACCOUNT_BOTTOM_NAV !== '1') {
    return null;
  }

  const pathname = usePathname();

  return (
    <nav
      className='fixed inset-x-0 bottom-0 z-40 border-t border-ds-border bg-ds-bg-primary/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden'
      aria-label='Navigation rapide compte'
    >
      <ul className='mx-auto flex max-w-lg items-stretch justify-around gap-1 px-2 py-2'>
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className='flex min-w-0 flex-1'>
              <Link
                href={href}
                className={cn(
                  'flex w-full flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors',
                  active ? 'text-cyan-600 dark:text-cyan-400' : 'text-ds-text-muted hover:text-ds-text-primary',
                )}
              >
                <Icon className='h-5 w-5 shrink-0' aria-hidden />
                <span className='truncate'>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
