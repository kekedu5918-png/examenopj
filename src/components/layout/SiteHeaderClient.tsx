'use client';

import { type ReactNode, useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Flame, Menu, X } from 'lucide-react';

import { SITE_HEADER_ENTRAINER_LINKS, SITE_HEADER_EPREUVES_LINKS } from '@/app/navigation';
import { AccountMenu } from '@/components/account-menu';
import { BrandWordmark } from '@/components/layout/BrandWordmark';
import { TrialReminderBanner } from '@/components/layout/TrialReminderBanner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { getQuizStreak, isStreakAtRisk } from '@/lib/quiz-gamification';
import { ActionResponse } from '@/types/action-response';
import { cn } from '@/utils/cn';

type TrialReminder = { daysLeft: number; endsAtIso: string };

type SiteHeaderClientProps = {
  /** Accueil marketing (/) ou espace connecté (/account) */
  homeHref: string;
  isLoggedIn: boolean;
  isPremium: boolean;
  signOut: () => Promise<ActionResponse>;
  trialReminder: TrialReminder | null;
  /** Streak chargé côté serveur (table `user_streaks`). Le client peut le surcharger après une session locale. */
  initialStreak?: number;
};

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isActiveGroup(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => isActivePath(pathname, p));
}

const navBtn =
  'relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/45 xl:px-3';
const navInactive =
  'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white';
const navActive =
  'text-slate-900 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-blue-600 dark:text-white dark:after:bg-blue-400';
const dropSurface =
  'min-w-[220px] border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-examen-raised dark:text-examen-ink';
const dropTriggerClass = cn(navBtn, 'border-0 bg-transparent');

export function SiteHeaderClient({
  homeHref,
  isLoggedIn,
  isPremium,
  signOut,
  trialReminder,
  initialStreak = 0,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  /**
   * Streak affiché : on prend la valeur la plus haute entre serveur (initialStreak)
   * et localStorage (utile après une session quiz qui n'a pas encore été synchronisée).
   * Évite l'affichage de deux séries différentes selon l'écran.
   */
  const [quizStreak, setQuizStreak] = useState(initialStreak);
  /** `true` si la série existe mais qu'aucun quiz n'a été fait aujourd'hui — déclenche le badge « en danger ». */
  const [streakAtRisk, setStreakAtRisk] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    const syncStreak = () => {
      setQuizStreak(Math.max(initialStreak, getQuizStreak()));
      setStreakAtRisk(isStreakAtRisk());
    };
    syncStreak();
    window.addEventListener('examenopj:quiz-gamification', syncStreak);
    window.addEventListener('storage', syncStreak);
    return () => {
      window.removeEventListener('examenopj:quiz-gamification', syncStreak);
      window.removeEventListener('storage', syncStreak);
    };
  }, [initialStreak]);

  useEffect(() => {
    setQuizStreak(Math.max(initialStreak, getQuizStreak()));
    setStreakAtRisk(isStreakAtRisk());
  }, [pathname, initialStreak]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const fondamentauxActive = isActivePath(pathname, '/fondamentaux');
  const infractionsActive = isActivePath(pathname, '/infractions');
  const enquetesActive = isActivePath(pathname, '/enquetes');
  const epreuvesActive = isActiveGroup(pathname, ['/epreuves']);
  const entrainerActive = isActiveGroup(pathname, ['/entrainement', '/quiz', '/flashcards']);

  return (
    <div className='sticky top-0 z-[1000]'>
      {trialReminder ? (
        <TrialReminderBanner daysLeft={trialReminder.daysLeft} endsAtIso={trialReminder.endsAtIso} />
      ) : null}
      <motion.header
        data-site-header
        className={cn(
          'relative border-b backdrop-blur-xl transition-[background,box-shadow,border-color] duration-300 [-webkit-backdrop-filter:blur(20px)]',
          scrolled
            ? 'border-slate-200/90 bg-white/90 shadow-md dark:border-white/[0.08] dark:bg-[rgba(6,11,22,0.88)] dark:shadow-[0_4px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]'
            : 'border-transparent bg-transparent',
        )}
        aria-label='Navigation principale'
      >
        {scrolled ? (
          <div
            className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent dark:via-cyan-400/40'
            aria-hidden
          />
        ) : null}
        <div className='mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 md:px-8'>
          <BrandWordmark href={homeHref} className='min-w-0 shrink' />

          <nav className='hidden flex-1 items-center justify-center gap-0.5 xl:gap-1 lg:flex' aria-label='Menu'>
            <Link href='/fondamentaux' className={cn(navBtn, fondamentauxActive ? navActive : navInactive)}>
              Fondamentaux
            </Link>

            <Link href='/infractions' className={cn(navBtn, infractionsActive ? navActive : navInactive)}>
              Infractions
            </Link>

            <Link href='/enquetes' className={cn(navBtn, enquetesActive ? navActive : navInactive)}>
              Enquêtes
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(navBtn, dropTriggerClass, epreuvesActive ? navActive : navInactive)}
              >
                Épreuves
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className={dropSurface}>
                {SITE_HEADER_EPREUVES_LINKS.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-slate-100 dark:focus:bg-white/10'>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(navBtn, dropTriggerClass, entrainerActive ? navActive : navInactive)}
              >
                S&apos;entraîner
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className={dropSurface}>
                {SITE_HEADER_ENTRAINER_LINKS.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-slate-100 dark:focus:bg-white/10'>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </nav>

          <div className='hidden shrink-0 items-center gap-3 lg:flex'>
            <ThemeToggle />
            {quizStreak > 0 ? (
              <Link
                href='/dashboard/badges'
                className={cn(
                  'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold transition-colors',
                  streakAtRisk
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/15 animate-pulse'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/15',
                )}
                title={
                  streakAtRisk
                    ? `Série de ${quizStreak} jour${quizStreak > 1 ? 's' : ''} en danger — faites au moins 1 quiz aujourd'hui pour la conserver !`
                    : `Série de ${quizStreak} jour${quizStreak > 1 ? 's' : ''} avec au moins un quiz complété`
                }
                aria-label={
                  streakAtRisk
                    ? `Série de quiz en danger : ${quizStreak} jour${quizStreak > 1 ? 's' : ''} — faites un quiz aujourd'hui`
                    : `Série de quiz : ${quizStreak} jour${quizStreak > 1 ? 's' : ''} consécutifs`
                }
              >
                <Flame
                  className={cn('h-3.5 w-3.5', streakAtRisk ? 'text-rose-400' : 'text-amber-400')}
                  aria-hidden
                />
                {quizStreak}j{streakAtRisk ? ' ⚠' : ''}
              </Link>
            ) : null}
            {!isPremium ? (
              <Link
                href='/pricing'
                className='inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-examen-accent to-examen-premium px-3 py-1 text-[11px] font-semibold text-white'
              >
                Premium ✨
              </Link>
            ) : null}
            {isLoggedIn ? (
              <>
                <Link
                  href='/account'
                  className={cn(
                    navBtn,
                    isActivePath(pathname, '/account') ? navActive : navInactive,
                    'px-2',
                  )}
                >
                  Compte
                </Link>
                <AccountMenu signOut={signOut} />
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  className='text-sm font-medium text-slate-600 no-underline transition-colors hover:text-slate-900 dark:text-examen-inkMuted dark:hover:text-white'
                >
                  Connexion
                </Link>
                <Link
                  href='/inscription'
                  className='rounded-lg bg-gradient-to-r from-examen-accent to-blue-600 px-4 py-2 text-sm font-semibold text-white no-underline transition hover:opacity-90'
                >
                  Commencer gratuitement →
                </Link>
              </>
            )}
          </div>

          <div className='flex items-center gap-1 lg:hidden'>
            <ThemeToggle />
            {quizStreak > 0 ? (
              <span
                className='inline-flex items-center gap-0.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300'
                aria-label={`Série de quiz : ${quizStreak} jour${quizStreak > 1 ? 's' : ''} consécutifs`}
              >
                <Flame className='h-3 w-3 text-amber-400' aria-hidden />
                {quizStreak}j
              </span>
            ) : null}
            {!isPremium ? (
              <Link
                href='/pricing'
                className='inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-examen-accent to-examen-premium px-2 py-1 text-[10px] font-semibold text-white'
              >
                Premium
              </Link>
            ) : null}
            <Link
              href='/inscription'
              className='rounded-lg bg-gradient-to-r from-examen-accent to-blue-600 px-2.5 py-1.5 text-[11px] font-semibold text-white no-underline'
            >
              Commencer →
            </Link>
            <button
              type='button'
              className='inline-flex rounded-lg p-2 text-slate-600 hover:text-slate-900 focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50 dark:text-examen-inkMuted dark:hover:text-white'
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-[1001] bg-black/60 lg:hidden'
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
              transition={{ type: 'tween', duration: 0.28 }}
              className='fixed right-0 top-0 z-[1002] flex h-full w-[min(88vw,320px)] flex-col border-l border-white/[0.06] bg-examen-raised lg:hidden'
            >
              <div className='flex items-center justify-between border-b border-white/[0.06] px-4 py-3'>
                <span className='text-sm font-bold text-white'>Menu</span>
                <button
                  type='button'
                  onClick={() => setMobileOpen(false)}
                  className='rounded-lg p-2 text-examen-inkMuted hover:bg-white/[0.06] hover:text-white'
                  aria-label='Fermer'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              <nav className='flex-1 overflow-y-auto px-3 py-4' aria-label='Navigation mobile'>
                <Link
                  href='/fondamentaux'
                  className='block border-b border-white/[0.06] py-3 text-sm font-medium text-examen-ink'
                  onClick={() => setMobileOpen(false)}
                >
                  Fondamentaux
                </Link>
                <Link
                  href='/infractions'
                  className='block border-b border-white/[0.06] py-3 text-sm font-medium text-examen-ink'
                  onClick={() => setMobileOpen(false)}
                >
                  Infractions
                </Link>
                <Link
                  href='/enquetes'
                  className='block border-b border-white/[0.06] py-3 text-sm font-medium text-examen-ink'
                  onClick={() => setMobileOpen(false)}
                >
                  Enquêtes
                </Link>
                <MobileAccordion title='Épreuves'>
                  {SITE_HEADER_EPREUVES_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='block border-b border-white/[0.06] py-2.5 pl-2 text-sm text-examen-ink hover:bg-white/[0.04]'
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </MobileAccordion>
                <MobileAccordion title="S'entraîner">
                  {SITE_HEADER_ENTRAINER_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='block border-b border-white/[0.06] py-2.5 pl-2 text-sm text-examen-ink hover:bg-white/[0.04]'
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </MobileAccordion>
              </nav>
              <div className='border-t border-white/[0.06] p-4'>
                {isLoggedIn ? (
                  <div className='flex flex-col gap-2'>
                    <Link
                      href='/account'
                      className='rounded-lg border border-white/10 py-2.5 text-center text-sm text-white'
                      onClick={() => setMobileOpen(false)}
                    >
                      Compte
                    </Link>
                    <AccountMenu signOut={signOut} />
                  </div>
                ) : (
                  <div className='flex flex-col gap-2'>
                    <Link
                      href='/login'
                      className='rounded-lg border border-white/[0.1] py-2.5 text-center text-sm text-white'
                      onClick={() => setMobileOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link
                      href='/inscription'
                      className='rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-examen-canvas'
                      onClick={() => setMobileOpen(false)}
                    >
                      Commencer gratuitement →
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

function MobileAccordion({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className='border-b border-white/[0.06]'>
      <button
        type='button'
        className='flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-white'
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 transition', open && 'rotate-180')} aria-hidden />
      </button>
      {open ? <div className='pb-2'>{children}</div> : null}
    </div>
  );
}
