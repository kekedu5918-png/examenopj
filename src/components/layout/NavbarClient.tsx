'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react';

import {
  NAV_ACCUEIL_HREF,
  NAV_ENTRAINER_CHILDREN,
  NAV_PREMIUM_HREF,
  NAV_PREPARER_CHILDREN,
  NAV_REFERENCES_CHILDREN,
} from '@/app/navigation';
import { AccountMenu } from '@/components/account-menu';
import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { ExamenOpjLogo } from '@/components/layout/ExamenOpjLogo';
import { TrialReminderBanner } from '@/components/layout/TrialReminderBanner';
import { UrgencyBanner } from '@/components/layout/UrgencyBanner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { ActionResponse } from '@/types/action-response';
import { cn } from '@/utils/cn';

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isActiveGroup(
  pathname: string,
  items: readonly { href: string }[],
): boolean {
  return items.some((item) => isActivePath(pathname, item.href));
}

function ActiveDot() {
  return (
    <span
      className='absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-examen-accent ring-2 ring-examen-accent/30'
      aria-hidden
    />
  );
}

type TrialReminder = {
  daysLeft: number;
  endsAtIso: string;
};

type NavbarClientProps = {
  isLoggedIn: boolean;
  isPremium: boolean;
  signOut: () => Promise<ActionResponse>;
  trialReminder: TrialReminder | null;
  logoSize?: number;
};

const navTriggerClass = cn(
  'relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/45 xl:px-3',
);

const dropTriggerClass = cn(navTriggerClass, 'border-0 bg-transparent');

export function NavbarClient({ isLoggedIn, isPremium, signOut, trialReminder, logoSize = 40 }: NavbarClientProps) {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 20;
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const headerSurface = cn(
    'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
    scrolled
      ? 'border-white/[0.06] bg-examen-canvas/80 backdrop-blur-xl'
      : 'border-transparent bg-transparent',
  );

  const accueilActive = pathname === NAV_ACCUEIL_HREF || pathname === '/dashboard';
  const prepActive = isActiveGroup(pathname, NAV_PREPARER_CHILDREN);
  const refActive = isActiveGroup(pathname, NAV_REFERENCES_CHILDREN);
  const trainActive = isActiveGroup(pathname, NAV_ENTRAINER_CHILDREN);

  const navLinkInactive = 'text-examen-inkMuted hover:text-examen-ink';
  const navLinkActive = 'text-examen-accent';

  return (
    <div className='sticky top-0 z-50'>
      {trialReminder ? (
        <TrialReminderBanner daysLeft={trialReminder.daysLeft} endsAtIso={trialReminder.endsAtIso} />
      ) : null}
      <UrgencyBanner />
      <motion.header
        className={headerSurface}
        initial={MOTION_INITIAL_FOR_SEO}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-4'>
          <Link
            href='/'
            className='group flex min-w-0 shrink items-center gap-2 focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/45'
            aria-label='ExamenOPJ — accueil site'
          >
            <span
              className='inline-flex shrink-0 rounded-xl bg-white/[0.08] p-1 ring-1 ring-white/15 shadow-[0_0_20px_rgba(79,110,247,0.15)] transition group-hover:bg-white/[0.12]'
              aria-hidden
            >
              <ExamenOpjLogo size={logoSize} className='block' />
            </span>
            <span className='hidden min-w-0 sm:block'>
              <span className='font-display text-[0.7rem] font-black leading-none tracking-[0.12em] text-white sm:text-xs'>
                EXAMEN OPJ
              </span>
              <span className='ml-2 inline-block rounded-md border border-white/[0.12] bg-white/[0.04] px-1.5 py-0.5 align-middle text-[9px] font-bold uppercase tracking-wide text-examen-inkMuted'>
                2026
              </span>
            </span>
          </Link>

          <nav aria-label='Navigation principale' className='hidden flex-1 items-center justify-center gap-0.5 overflow-x-auto lg:flex xl:gap-1'>
            <Link
              href={NAV_ACCUEIL_HREF}
              className={cn(navTriggerClass, 'relative', accueilActive ? navLinkActive : navLinkInactive)}
            >
              Accueil
              {accueilActive ? <ActiveDot /> : null}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(dropTriggerClass, prepActive ? navLinkActive : navLinkInactive)}
                aria-expanded={undefined}
              >
                Préparer
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
                {prepActive ? <ActiveDot /> : null}
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='min-w-[200px] border-white/10 bg-examen-raised text-examen-ink'>
                {NAV_PREPARER_CHILDREN.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-white/10'>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild className='focus:bg-white/10'>
                  <Link href='/cours/enquetes' className='text-examen-inkMuted'>
                    Enquêtes (épreuve 2)
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(dropTriggerClass, refActive ? navLinkActive : navLinkInactive)}>
                Références
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
                {refActive ? <ActiveDot /> : null}
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='min-w-[200px] border-white/10 bg-examen-raised text-examen-ink'>
                {NAV_REFERENCES_CHILDREN.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-white/10'>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(dropTriggerClass, trainActive ? navLinkActive : navLinkInactive)}>
                S&apos;entraîner
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
                {trainActive ? <ActiveDot /> : null}
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='min-w-[200px] border-white/10 bg-examen-raised text-examen-ink'>
                {NAV_ENTRAINER_CHILDREN.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-white/10'>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild className='focus:bg-white/10'>
                  <Link href='/entrainement' className='text-examen-inkMuted'>
                    Hub entraînement
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className='hidden shrink-0 items-center gap-2 lg:flex'>
            {!isPremium ? (
              <Link
                href={NAV_PREMIUM_HREF}
                className='group relative inline-flex items-center gap-1 overflow-hidden rounded-full bg-gradient-to-r from-examen-accent to-examen-premium px-4 py-1.5 text-sm font-semibold text-white brightness-100 transition hover:brightness-110 focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50'
              >
                <span
                  className='pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100'
                  aria-hidden
                />
                <Sparkles className='relative z-10 h-3.5 w-3.5' aria-hidden />
                <span className='relative z-10'>Premium ✨</span>
              </Link>
            ) : null}

            {isLoggedIn ? (
              <div className='flex items-center pl-2'>
                <AccountMenu signOut={signOut} />
              </div>
            ) : (
              <>
                <Link
                  href='/login'
                  className={cn(
                    navTriggerClass,
                    isActivePath(pathname, '/login') ? navLinkActive : navLinkInactive,
                    'px-3 py-1.5',
                  )}
                >
                  Connexion
                  {isActivePath(pathname, '/login') ? <ActiveDot /> : null}
                </Link>
                <Link
                  href='/signup'
                  className='rounded-lg bg-white px-4 py-1.5 text-sm font-semibold text-examen-canvas transition hover:bg-white/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/60'
                >
                  S&apos;inscrire
                </Link>
              </>
            )}
          </div>

          <div className='flex items-center gap-1.5 lg:hidden'>
            {!isPremium ? (
              <Link
                href={NAV_PREMIUM_HREF}
                className='inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-examen-accent to-examen-premium px-2.5 py-1 text-[11px] font-semibold text-white'
              >
                <Sparkles className='h-3 w-3' aria-hidden />
                Premium
              </Link>
            ) : null}
            {isLoggedIn ? (
              <div className='flex items-center'>
                <AccountMenu signOut={signOut} />
              </div>
            ) : null}
            <button
              type='button'
              className='inline-flex rounded-lg p-2 text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50'
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              onClick={() => setMobileOpen(true)}
              aria-label='Ouvrir le menu'
            >
              <Menu className='h-6 w-6' />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type='button'
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-[60] bg-black/60 lg:hidden'
              aria-label='Fermer le menu'
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              id={mobileMenuId}
              role='dialog'
              aria-modal='true'
              aria-label='Menu de navigation'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className='fixed right-0 top-0 z-[70] flex h-full w-[min(80vw,320px)] flex-col border-l border-white/[0.06] bg-examen-raised lg:hidden'
            >
              <div className='flex items-center justify-between border-b border-white/[0.06] px-4 py-3'>
                <span className='text-sm font-bold text-white'>Menu</span>
                <button
                  type='button'
                  onClick={() => setMobileOpen(false)}
                  className='rounded-lg p-2 text-examen-inkMuted hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/45'
                  aria-label='Fermer'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              <nav className='flex flex-1 flex-col overflow-y-auto px-2 py-4' aria-label='Navigation mobile'>
                <Link
                  href={NAV_ACCUEIL_HREF}
                  className='border-b border-white/[0.06] px-3 py-3 text-sm font-medium text-examen-ink hover:bg-white/[0.04]'
                  onClick={() => setMobileOpen(false)}
                >
                  Accueil
                </Link>
                <p className='px-3 pt-3 text-[10px] font-bold uppercase tracking-widest text-examen-inkMuted'>Préparer</p>
                {NAV_PREPARER_CHILDREN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='border-b border-white/[0.06] px-3 py-2.5 pl-5 text-sm text-examen-ink hover:bg-white/[0.04]'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href='/cours/enquetes'
                  className='border-b border-white/[0.06] px-3 py-2.5 pl-5 text-sm text-examen-inkMuted hover:bg-white/[0.04]'
                  onClick={() => setMobileOpen(false)}
                >
                  Enquêtes (épreuve 2)
                </Link>
                <p className='px-3 pt-3 text-[10px] font-bold uppercase tracking-widest text-examen-inkMuted'>Références</p>
                {NAV_REFERENCES_CHILDREN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='border-b border-white/[0.06] px-3 py-2.5 pl-5 text-sm text-examen-ink hover:bg-white/[0.04]'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <p className='px-3 pt-3 text-[10px] font-bold uppercase tracking-widest text-examen-inkMuted'>S&apos;entraîner</p>
                {NAV_ENTRAINER_CHILDREN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='border-b border-white/[0.06] px-3 py-2.5 pl-5 text-sm text-examen-ink hover:bg-white/[0.04]'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href='/entrainement'
                  className='border-b border-white/[0.06] px-3 py-2.5 pl-5 text-sm text-examen-inkMuted hover:bg-white/[0.04]'
                  onClick={() => setMobileOpen(false)}
                >
                  Hub entraînement
                </Link>
              </nav>

              {!isPremium ? (
                <div className='border-t border-white/[0.06] p-4'>
                  <Link
                    href={NAV_PREMIUM_HREF}
                    className='block w-full rounded-lg bg-examen-accent py-2.5 text-center text-sm font-semibold text-white hover:bg-examen-accentHover'
                    onClick={() => setMobileOpen(false)}
                  >
                    Voir Premium
                  </Link>
                </div>
              ) : null}

              <div className='mt-auto border-t border-white/[0.06] p-4'>
                {isLoggedIn ? (
                  <AccountMenu signOut={signOut} />
                ) : (
                  <div className='flex flex-col gap-2'>
                    <Link
                      href='/login'
                      className='rounded-lg border border-white/[0.1] py-2.5 text-center text-sm font-medium text-white'
                      onClick={() => setMobileOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link
                      href='/signup'
                      className='rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-examen-canvas'
                      onClick={() => setMobileOpen(false)}
                    >
                      S&apos;inscrire
                    </Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
