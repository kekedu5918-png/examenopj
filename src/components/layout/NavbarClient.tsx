'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react';

import {
  NAV_COURS_CHILDREN,
  NAV_ENTRAINEMENT_CHILDREN,
  NAV_EPREUVES_CHILDREN,
  NAV_GUIDE_HREF,
  NAV_INFRACTIONS_HREF,
  NAV_PREMIUM_HREF,
  NAV_SUJETS_BLANCS_BADGE_DEADLINE_MS,
  type NavMegaChild,
} from '@/app/navigation';
import { AccountMenu } from '@/components/account-menu';
import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { ExamenOpjLogo } from '@/components/layout/ExamenOpjLogo';
import { TrialReminderBanner } from '@/components/layout/TrialReminderBanner';
import { UrgencyBanner } from '@/components/layout/UrgencyBanner';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { ActionResponse } from '@/types/action-response';
import { cn } from '@/utils/cn';

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ActiveDot() {
  return (
    <span
      className='absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-examen-accent ring-2 ring-examen-accent/30'
      aria-hidden
    />
  );
}

type MegaKey = 'cours' | 'epreuves' | 'entrainement';

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

export function NavbarClient({ isLoggedIn, isPremium, signOut, trialReminder, logoSize = 40 }: NavbarClientProps) {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 20;
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSujetsBlancsNouveau, setShowSujetsBlancsNouveau] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mobileMenuId = useId();

  useEffect(() => {
    setShowSujetsBlancsNouveau(Date.now() < NAV_SUJETS_BLANCS_BADGE_DEADLINE_MS);
  }, []);

  const closeMega = useCallback(() => setMega(null), []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) closeMega();
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [closeMega]);

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
    closeMega();
  }, [pathname, closeMega]);

  const coursOpen = NAV_COURS_CHILDREN.some((c) => isActivePath(pathname, c.href));
  const eprOpen = NAV_EPREUVES_CHILDREN.some((c) => isActivePath(pathname, c.href));
  const entrainOpen = NAV_ENTRAINEMENT_CHILDREN.some((c) => isActivePath(pathname, c.href));

  const headerSurface = cn(
    'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
    scrolled
      ? 'border-white/[0.06] bg-examen-canvas/80 backdrop-blur-xl'
      : 'border-transparent bg-transparent',
  );

  function megaPanel(items: readonly NavMegaChild[], panelId: string, animKey: string) {
    return (
      <motion.div
        key={animKey}
        id={panelId}
        role='menu'
        initial={MOTION_INITIAL_FOR_SEO}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className='absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,20rem)] rounded-xl border border-white/[0.08] bg-[#16161F] p-2 shadow-xl'
      >
        <ul className='space-y-0.5' role='none'>
          {items.map((item) => {
            const active = isActivePath(pathname, item.href);
            const showNouveau = item.badge === 'nouveau' && showSujetsBlancsNouveau && item.href === '/sujets-blancs';
            return (
              <li key={item.href} role='none'>
                <Link
                  role='menuitem'
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06]',
                    active && 'bg-examen-accent/10',
                  )}
                  onClick={closeMega}
                >
                  <span className='flex items-start justify-between gap-2'>
                    <span className={cn('font-medium', active ? 'text-examen-accent' : 'text-white')}>{item.name}</span>
                    {showNouveau ? (
                      <span
                        className='shrink-0 animate-pulse rounded-full bg-emerald-500/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-200 ring-1 ring-emerald-400/35'
                        aria-hidden
                      >
                        Nouveau
                      </span>
                    ) : null}
                  </span>
                  <span className='mt-0.5 block text-xs text-examen-inkMuted'>{item.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>
    );
  }

  const navLinkClass = (active: boolean) =>
    cn(
      'relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/45',
      active ? 'text-examen-accent' : 'text-examen-inkMuted hover:text-examen-ink',
    );

  return (
    <div ref={wrapRef} className='sticky top-0 z-50'>
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
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4'>
          <Link
            href='/'
            className='group flex shrink-0 items-center gap-2 focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/45'
            aria-label='ExamenOPJ — accueil'
          >
            <span
              className='inline-flex rounded-xl bg-white/[0.08] p-1 ring-1 ring-white/15 shadow-[0_0_20px_rgba(79,110,247,0.15)] transition group-hover:bg-white/[0.12]'
              aria-hidden
            >
              <ExamenOpjLogo size={logoSize} className='block' />
            </span>
            <span className='flex items-baseline gap-1.5'>
              <span className='font-display text-sm font-bold leading-none tracking-tight text-white sm:text-[0.95rem]'>
                Examen
              </span>
              <span className='font-display text-sm font-bold leading-none tracking-tight text-gray-400 transition group-hover:text-gray-300 sm:text-[0.95rem]'>
                OPJ
              </span>
            </span>
            <span className='rounded-md border border-white/[0.12] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-examen-inkMuted'>
              2026
            </span>
          </Link>

          <nav aria-label='Navigation principale' className='hidden flex-1 items-center justify-center gap-1 lg:flex'>
            <div className='relative'>
              <button
                type='button'
                className={navLinkClass(mega === 'cours' || coursOpen)}
                aria-expanded={mega === 'cours'}
                aria-haspopup='menu'
                aria-controls='nav-mega-cours'
                onClick={() => setMega((m) => (m === 'cours' ? null : 'cours'))}
              >
                Cours
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
                {coursOpen ? <ActiveDot /> : null}
              </button>
              <AnimatePresence>
                {mega === 'cours' ? megaPanel(NAV_COURS_CHILDREN, 'nav-mega-cours', 'mega-cours') : null}
              </AnimatePresence>
            </div>

            <Link href={NAV_INFRACTIONS_HREF} className={navLinkClass(isActivePath(pathname, NAV_INFRACTIONS_HREF))}>
              Infractions
              {isActivePath(pathname, NAV_INFRACTIONS_HREF) ? <ActiveDot /> : null}
            </Link>

            <div className='relative'>
              <button
                type='button'
                className={navLinkClass(mega === 'epreuves' || eprOpen)}
                aria-expanded={mega === 'epreuves'}
                aria-haspopup='menu'
                aria-controls='nav-mega-epreuves'
                onClick={() => setMega((m) => (m === 'epreuves' ? null : 'epreuves'))}
              >
                Épreuves
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
                {eprOpen ? <ActiveDot /> : null}
              </button>
              <AnimatePresence>
                {mega === 'epreuves' ? megaPanel(NAV_EPREUVES_CHILDREN, 'nav-mega-epreuves', 'mega-epreuves') : null}
              </AnimatePresence>
            </div>

            <div className='relative'>
              <button
                type='button'
                className={navLinkClass(mega === 'entrainement' || entrainOpen)}
                aria-expanded={mega === 'entrainement'}
                aria-haspopup='menu'
                aria-controls='nav-mega-entrainement'
                onClick={() => setMega((m) => (m === 'entrainement' ? null : 'entrainement'))}
              >
                Entraînement
                <ChevronDown className='h-4 w-4 opacity-70' aria-hidden />
                {entrainOpen ? <ActiveDot /> : null}
              </button>
              <AnimatePresence>
                {mega === 'entrainement'
                  ? megaPanel(NAV_ENTRAINEMENT_CHILDREN, 'nav-mega-entrainement', 'mega-entrainement')
                  : null}
              </AnimatePresence>
            </div>

            <Link href={NAV_GUIDE_HREF} className={navLinkClass(isActivePath(pathname, NAV_GUIDE_HREF))}>
              Guide
              {isActivePath(pathname, NAV_GUIDE_HREF) ? <ActiveDot /> : null}
            </Link>
          </nav>

          <div className='hidden items-center gap-2 lg:flex'>
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
                    navLinkClass(isActivePath(pathname, '/login')),
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

          <div className='flex items-center gap-2 lg:hidden'>
            {!isPremium ? (
              <Link
                href={NAV_PREMIUM_HREF}
                className='inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-examen-accent to-examen-premium px-3 py-1 text-xs font-semibold text-white'
              >
                <Sparkles className='h-3 w-3' aria-hidden />
                Premium ✨
              </Link>
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
                <p className='px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-examen-inkMuted'>Cours</p>
                {NAV_COURS_CHILDREN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='border-b border-white/[0.06] px-3 py-3 text-sm text-examen-ink hover:bg-white/[0.04]'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <p className='mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-examen-inkMuted'>
                  Infractions
                </p>
                <Link
                  href={NAV_INFRACTIONS_HREF}
                  className='border-b border-white/[0.06] px-3 py-3 text-sm text-examen-ink hover:bg-white/[0.04]'
                  onClick={() => setMobileOpen(false)}
                >
                  Référentiel infractions
                </Link>
                <p className='mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-examen-inkMuted'>
                  Épreuves
                </p>
                {NAV_EPREUVES_CHILDREN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='flex items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-3 text-sm text-examen-ink hover:bg-white/[0.04]'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                    {item.badge === 'nouveau' && showSujetsBlancsNouveau && item.href === '/sujets-blancs' ? (
                      <span className='shrink-0 rounded-full bg-emerald-500/25 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-200'>
                        Nouveau
                      </span>
                    ) : null}
                  </Link>
                ))}
                <p className='mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-examen-inkMuted'>
                  Entraînement
                </p>
                {NAV_ENTRAINEMENT_CHILDREN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='border-b border-white/[0.06] px-3 py-3 text-sm text-examen-ink hover:bg-white/[0.04]'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={NAV_GUIDE_HREF}
                  className='border-b border-white/[0.06] px-3 py-3 text-sm text-examen-ink hover:bg-white/[0.04]'
                  onClick={() => setMobileOpen(false)}
                >
                  Guide de révision
                </Link>
              </nav>

              {!isPremium ? (
                <div className='border-t border-white/[0.06] p-4'>
                  <div className='rounded-xl border border-examen-premium/25 bg-gradient-to-br from-examen-accent/15 to-examen-premium/10 p-4'>
                    <p className='text-sm font-semibold text-white'>Passer Premium</p>
                    <p className='mt-1 text-xs text-examen-inkMuted'>Quiz illimités, flashcards complètes, articulation.</p>
                    <Link
                      href={NAV_PREMIUM_HREF}
                      className='mt-3 block w-full rounded-lg bg-examen-accent py-2.5 text-center text-sm font-semibold text-white hover:bg-examen-accentHover'
                      onClick={() => setMobileOpen(false)}
                    >
                      Découvrir les offres
                    </Link>
                  </div>
                </div>
              ) : null}

              <div className='mt-auto border-t border-white/[0.06] p-4'>
                {isLoggedIn ? (
                  <div className='space-y-3'>
                    <AccountMenu signOut={signOut} />
                  </div>
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
