'use client';

import { type ReactNode, useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Flame, Menu, X } from 'lucide-react';

import { AccountMenu } from '@/components/account-menu';
import { ExamenOpjLogo } from '@/components/layout/ExamenOpjLogo';
import { TrialReminderBanner } from '@/components/layout/TrialReminderBanner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getQuizStreak } from '@/lib/quiz-gamification';
import { ActionResponse } from '@/types/action-response';
import { cn } from '@/utils/cn';

type TrialReminder = { daysLeft: number; endsAtIso: string };

type SiteHeaderClientProps = {
  isLoggedIn: boolean;
  isPremium: boolean;
  signOut: () => Promise<ActionResponse>;
  trialReminder: TrialReminder | null;
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
const navInactive = 'text-examen-inkMuted hover:text-examen-ink';
const navActive = 'text-examen-accent after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-examen-accent';
const dropTriggerClass = cn(navBtn, 'border-0 bg-transparent');

const coursLinks = [
  { href: '/fondamentaux', label: 'Fondamentaux' },
  { href: '/infractions', label: 'Infractions' },
  { href: '/cours/modules', label: 'Modules F01–F15' },
  { href: '/programme', label: 'Programme officiel' },
] as const;

const epreuvesLinks = [
  { href: '/epreuves', label: "Vue d'ensemble" },
  { href: '/epreuves/epreuve-1', label: 'Épreuve 1' },
  { href: '/epreuves/epreuve-2', label: 'Épreuve 2' },
  { href: '/epreuves/epreuve-3', label: 'Épreuve 3' },
] as const;

const entrainerLinks = [
  { href: '/quiz', label: 'Quiz' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/entrainement/articulation', label: 'Articulation' },
  { href: '/sujets-blancs', label: 'Sujets blancs' },
] as const;

export function SiteHeaderClient({
  isLoggedIn,
  isPremium,
  signOut,
  trialReminder,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quizStreak, setQuizStreak] = useState(0);
  const mobileMenuId = useId();

  useEffect(() => {
    const syncStreak = () => setQuizStreak(getQuizStreak());
    syncStreak();
    window.addEventListener('examenopj:quiz-gamification', syncStreak);
    window.addEventListener('storage', syncStreak);
    return () => {
      window.removeEventListener('examenopj:quiz-gamification', syncStreak);
      window.removeEventListener('storage', syncStreak);
    };
  }, []);

  useEffect(() => {
    setQuizStreak(getQuizStreak());
  }, [pathname]);

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

  const coursActive = isActiveGroup(pathname, ['/fondamentaux', '/infractions', '/cours/modules', '/programme', '/cours']);
  const epreuvesActive = isActiveGroup(pathname, ['/epreuves']);
  const entrainerActive = isActiveGroup(pathname, ['/quiz', '/flashcards', '/entrainement', '/sujets-blancs']);
  const guideActive = isActivePath(pathname, '/guide-revision-opj');
  const enquetesActive = isActivePath(pathname, '/cours/enquetes');

  const headerStyle = {
    background: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0)',
    borderBottomColor: scrolled ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
    transition: 'background 0.3s ease, border-color 0.3s ease',
  } as const;

  return (
    <div className='sticky top-0 z-[1000]'>
      {trialReminder ? (
        <TrialReminderBanner daysLeft={trialReminder.daysLeft} endsAtIso={trialReminder.endsAtIso} />
      ) : null}
      <motion.header
        className='border-b backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]'
        style={headerStyle}
        aria-label='Navigation principale'
      >
        <div className='mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 md:px-8'>
          <Link
            href='/'
            className='flex min-w-0 shrink items-center gap-2 font-display text-sm font-black tracking-[0.12em] text-[#111827] no-underline'
            aria-label='ExamenOPJ — accueil'
          >
            <span className='inline-flex shrink-0 rounded-lg bg-white/[0.08] p-1 ring-1 ring-black/10'>
              <ExamenOpjLogo size={32} className='block' />
            </span>
            <span className='hidden min-w-0 sm:inline'>EXAMENOPJ</span>
          </Link>

          <nav className='hidden flex-1 items-center justify-center gap-1 lg:flex' aria-label='Menu'>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(navBtn, dropTriggerClass, coursActive ? navActive : navInactive)}
                aria-expanded={undefined}
              >
                Cours
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='min-w-[220px] border-white/10 bg-examen-raised text-examen-ink'>
                {coursLinks.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-white/10'>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href='/cours/enquetes'
              className={cn(navBtn, enquetesActive ? navActive : navInactive)}
            >
              Enquêtes
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(navBtn, dropTriggerClass, epreuvesActive ? navActive : navInactive)}
              >
                Épreuves
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='min-w-[220px] border-white/10 bg-examen-raised text-examen-ink'>
                {epreuvesLinks.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-white/10'>
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
              <DropdownMenuContent align='start' className='min-w-[220px] border-white/10 bg-examen-raised text-examen-ink'>
                {entrainerLinks.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className='focus:bg-white/10'>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href='/guide-revision-opj'
              className={cn(navBtn, guideActive ? navActive : navInactive)}
            >
              Guide
            </Link>
          </nav>

          <div className='hidden shrink-0 items-center gap-3 lg:flex'>
            {quizStreak > 0 ? (
              <span
                className='inline-flex items-center gap-1 rounded-md border border-amber-200/90 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-950'
                title={`Série de ${quizStreak} jour${quizStreak > 1 ? 's' : ''} avec au moins un quiz complété`}
                aria-label={`Série de quiz : ${quizStreak} jour${quizStreak > 1 ? 's' : ''} consécutifs`}
              >
                <Flame className='h-3.5 w-3.5 text-amber-600' aria-hidden />
                {quizStreak}j
              </span>
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
                  href='/parcours-candidat'
                  className={cn(
                    navBtn,
                    isActivePath(pathname, '/parcours-candidat') ? navActive : navInactive,
                    'px-2',
                  )}
                >
                  Mon parcours
                </Link>
                <AccountMenu signOut={signOut} />
              </>
            ) : (
              <>
                <Link href='/connexion' className='text-sm font-medium text-[#4B5563] no-underline hover:text-[#111827]'>
                  Connexion
                </Link>
                <Link
                  href='/inscription'
                  className='rounded-lg bg-[#111827] px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-[#374151]'
                >
                  Commencer gratuitement →
                </Link>
              </>
            )}
          </div>

          <div className='flex items-center gap-2 lg:hidden'>
            {quizStreak > 0 ? (
              <span
                className='inline-flex items-center gap-0.5 rounded-md border border-amber-200/90 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-950'
                aria-label={`Série de quiz : ${quizStreak} jour${quizStreak > 1 ? 's' : ''} consécutifs`}
              >
                <Flame className='h-3 w-3 text-amber-600' aria-hidden />
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
              className='rounded-lg bg-[#111827] px-2.5 py-1.5 text-[11px] font-semibold text-white no-underline'
            >
              Commencer →
            </Link>
            <button
              type='button'
              className='inline-flex rounded-lg p-2 text-[#111827] focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50'
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
                <MobileAccordion title='Cours' defaultOpen>
                  {coursLinks.map((item) => (
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
                <Link
                  href='/cours/enquetes'
                  className='block border-b border-white/[0.06] py-3 text-sm font-medium text-examen-ink'
                  onClick={() => setMobileOpen(false)}
                >
                  Enquêtes
                </Link>
                <MobileAccordion title='Épreuves'>
                  {epreuvesLinks.map((item) => (
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
                  {entrainerLinks.map((item) => (
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
                <Link
                  href='/guide-revision-opj'
                  className='block border-b border-white/[0.06] py-3 text-sm font-medium text-examen-ink'
                  onClick={() => setMobileOpen(false)}
                >
                  Guide
                </Link>
              </nav>
              <div className='border-t border-white/[0.06] p-4'>
                {isLoggedIn ? (
                  <div className='flex flex-col gap-2'>
                    <Link
                      href='/parcours-candidat'
                      className='rounded-lg border border-white/10 py-2.5 text-center text-sm text-white'
                      onClick={() => setMobileOpen(false)}
                    >
                      Mon parcours
                    </Link>
                    <AccountMenu signOut={signOut} />
                  </div>
                ) : (
                  <div className='flex flex-col gap-2'>
                    <Link
                      href='/connexion'
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
