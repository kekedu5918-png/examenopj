'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Layers,
  Mic,
  Scale,
  ScrollText,
  Sparkles,
  Wand2,
} from 'lucide-react';

import {
  FORMATION_ENQUETES_CHRONO,
  REVISION_THEMES,
  type RevisionEtapeCle,
  type RevisionThemeVisualKey,
} from '@/data/revision-themes';
import { cn } from '@/utils/cn';

const STEP_ICONS: Record<RevisionEtapeCle, typeof BookOpen> = {
  conditions: Layers,
  cours: GraduationCap,
  rubriques: ClipboardList,
  exercices: Sparkles,
  epreuve1: Scale,
  epreuve2: ScrollText,
  epreuve3: Mic,
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Styles par thème : blobs, onglets, cartes, liens */
const PALETTES: Record<
  RevisionThemeVisualKey,
  {
    blobA: string;
    blobB: string;
    blobC: string;
    titleFrom: string;
    titleVia: string;
    titleTo: string;
    badge: string;
    tabActive: string;
    tabGlow: string;
    panelFrom: string;
    panelVia: string;
    panelTo: string;
    panelBorder: string;
    tagRing: string;
    tagBg: string;
    stepIcon: string;
    stepIconGlow: string;
    linkIdle: string;
    linkHover: string;
    connector: string;
  }
> = {
  violet: {
    blobA: 'bg-violet-600/35',
    blobB: 'bg-fuchsia-500/25',
    blobC: 'bg-indigo-500/20',
    titleFrom: 'from-violet-200',
    titleVia: 'via-fuchsia-200',
    titleTo: 'to-cyan-200',
    badge: 'border-violet-400/40 bg-violet-500/15 text-violet-100 shadow-[0_0_24px_-4px_rgba(139,92,246,0.5)]',
    tabActive: 'border-violet-400/50 shadow-[0_0_32px_-6px_rgba(139,92,246,0.55)]',
    tabGlow: 'from-violet-500/50 via-fuchsia-500/35 to-indigo-500/40',
    panelFrom: 'from-violet-500/[0.12]',
    panelVia: 'via-fuchsia-500/[0.08]',
    panelTo: 'to-slate-950/80',
    panelBorder: 'border-violet-500/25',
    tagRing: 'ring-violet-400/25 hover:ring-violet-400/45',
    tagBg: 'bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5',
    stepIcon: 'from-violet-400 via-fuchsia-500 to-indigo-500',
    stepIconGlow: 'shadow-[0_0_20px_-4px_rgba(167,139,250,0.7)]',
    linkIdle: 'border-violet-500/20 bg-violet-500/[0.07] text-violet-100',
    linkHover: 'hover:border-violet-400/50 hover:bg-violet-500/20 hover:shadow-[0_0_20px_-6px_rgba(139,92,246,0.45)]',
    connector: 'from-violet-500/50 via-fuchsia-500/30 to-transparent',
  },
  rose: {
    blobA: 'bg-rose-600/35',
    blobB: 'bg-pink-500/25',
    blobC: 'bg-orange-500/15',
    titleFrom: 'from-rose-200',
    titleVia: 'via-pink-200',
    titleTo: 'to-amber-100',
    badge: 'border-rose-400/40 bg-rose-500/15 text-rose-50 shadow-[0_0_24px_-4px_rgba(244,63,94,0.45)]',
    tabActive: 'border-rose-400/50 shadow-[0_0_32px_-6px_rgba(244,63,94,0.5)]',
    tabGlow: 'from-rose-500/50 via-pink-500/35 to-orange-500/30',
    panelFrom: 'from-rose-500/[0.12]',
    panelVia: 'via-pink-500/[0.07]',
    panelTo: 'to-slate-950/80',
    panelBorder: 'border-rose-500/25',
    tagRing: 'ring-rose-400/25 hover:ring-rose-400/45',
    tagBg: 'bg-gradient-to-br from-rose-500/10 to-pink-500/5',
    stepIcon: 'from-rose-400 via-pink-500 to-orange-400',
    stepIconGlow: 'shadow-[0_0_20px_-4px_rgba(251,113,133,0.65)]',
    linkIdle: 'border-rose-500/20 bg-rose-500/[0.07] text-rose-50',
    linkHover: 'hover:border-rose-400/50 hover:bg-rose-500/20 hover:shadow-[0_0_20px_-6px_rgba(244,63,94,0.4)]',
    connector: 'from-rose-500/50 via-pink-500/30 to-transparent',
  },
  amber: {
    blobA: 'bg-amber-500/35',
    blobB: 'bg-yellow-400/20',
    blobC: 'bg-orange-600/20',
    titleFrom: 'from-amber-200',
    titleVia: 'via-yellow-200',
    titleTo: 'to-lime-100',
    badge: 'border-amber-400/40 bg-amber-500/15 text-amber-50 shadow-[0_0_24px_-4px_rgba(245,158,11,0.45)]',
    tabActive: 'border-amber-400/50 shadow-[0_0_32px_-6px_rgba(245,158,11,0.5)]',
    tabGlow: 'from-amber-500/50 via-yellow-400/35 to-orange-500/35',
    panelFrom: 'from-amber-500/[0.12]',
    panelVia: 'via-yellow-500/[0.06]',
    panelTo: 'to-slate-950/80',
    panelBorder: 'border-amber-500/25',
    tagRing: 'ring-amber-400/25 hover:ring-amber-400/45',
    tagBg: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/5',
    stepIcon: 'from-amber-400 via-yellow-500 to-orange-500',
    stepIconGlow: 'shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)]',
    linkIdle: 'border-amber-500/20 bg-amber-500/[0.08] text-amber-50',
    linkHover: 'hover:border-amber-400/50 hover:bg-amber-500/20 hover:shadow-[0_0_20px_-6px_rgba(245,158,11,0.4)]',
    connector: 'from-amber-500/50 via-yellow-500/30 to-transparent',
  },
  cyan: {
    blobA: 'bg-cyan-500/35',
    blobB: 'bg-sky-500/25',
    blobC: 'bg-blue-600/20',
    titleFrom: 'from-cyan-200',
    titleVia: 'via-sky-200',
    titleTo: 'to-indigo-100',
    badge: 'border-cyan-400/40 bg-cyan-500/15 text-cyan-50 shadow-[0_0_24px_-4px_rgba(34,211,238,0.45)]',
    tabActive: 'border-cyan-400/50 shadow-[0_0_32px_-6px_rgba(34,211,238,0.5)]',
    tabGlow: 'from-cyan-500/50 via-sky-500/35 to-blue-600/35',
    panelFrom: 'from-cyan-500/[0.12]',
    panelVia: 'via-sky-500/[0.08]',
    panelTo: 'to-slate-950/80',
    panelBorder: 'border-cyan-500/25',
    tagRing: 'ring-cyan-400/25 hover:ring-cyan-400/45',
    tagBg: 'bg-gradient-to-br from-cyan-500/10 to-sky-500/5',
    stepIcon: 'from-cyan-400 via-sky-500 to-blue-600',
    stepIconGlow: 'shadow-[0_0_20px_-4px_rgba(34,211,238,0.65)]',
    linkIdle: 'border-cyan-500/20 bg-cyan-500/[0.07] text-cyan-50',
    linkHover: 'hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_-6px_rgba(34,211,238,0.4)]',
    connector: 'from-cyan-500/50 via-sky-500/30 to-transparent',
  },
  emerald: {
    blobA: 'bg-emerald-600/35',
    blobB: 'bg-teal-500/25',
    blobC: 'bg-lime-500/15',
    titleFrom: 'from-emerald-200',
    titleVia: 'via-teal-200',
    titleTo: 'to-green-100',
    badge: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-50 shadow-[0_0_24px_-4px_rgba(16,185,129,0.45)]',
    tabActive: 'border-emerald-400/50 shadow-[0_0_32px_-6px_rgba(16,185,129,0.5)]',
    tabGlow: 'from-emerald-500/50 via-teal-500/35 to-lime-500/25',
    panelFrom: 'from-emerald-500/[0.12]',
    panelVia: 'via-teal-500/[0.07]',
    panelTo: 'to-slate-950/80',
    panelBorder: 'border-emerald-500/25',
    tagRing: 'ring-emerald-400/25 hover:ring-emerald-400/45',
    tagBg: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/5',
    stepIcon: 'from-emerald-400 via-teal-500 to-lime-500',
    stepIconGlow: 'shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]',
    linkIdle: 'border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-50',
    linkHover: 'hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_-6px_rgba(16,185,129,0.4)]',
    connector: 'from-emerald-500/50 via-teal-500/30 to-transparent',
  },
  sky: {
    blobA: 'bg-sky-500/35',
    blobB: 'bg-blue-500/25',
    blobC: 'bg-violet-500/15',
    titleFrom: 'from-sky-200',
    titleVia: 'via-blue-200',
    titleTo: 'to-violet-100',
    badge: 'border-sky-400/40 bg-sky-500/15 text-sky-50 shadow-[0_0_24px_-4px_rgba(56,189,248,0.45)]',
    tabActive: 'border-sky-400/50 shadow-[0_0_32px_-6px_rgba(56,189,248,0.5)]',
    tabGlow: 'from-sky-500/50 via-blue-500/35 to-violet-500/30',
    panelFrom: 'from-sky-500/[0.12]',
    panelVia: 'via-blue-500/[0.07]',
    panelTo: 'to-slate-950/80',
    panelBorder: 'border-sky-500/25',
    tagRing: 'ring-sky-400/25 hover:ring-sky-400/45',
    tagBg: 'bg-gradient-to-br from-sky-500/10 to-blue-500/5',
    stepIcon: 'from-sky-400 via-blue-500 to-indigo-600',
    stepIconGlow: 'shadow-[0_0_20px_-4px_rgba(56,189,248,0.65)]',
    linkIdle: 'border-sky-500/20 bg-sky-500/[0.07] text-sky-50',
    linkHover: 'hover:border-sky-400/50 hover:bg-sky-500/20 hover:shadow-[0_0_20px_-6px_rgba(56,189,248,0.4)]',
    connector: 'from-sky-500/50 via-blue-500/30 to-transparent',
  },
};

const blobTransition = { duration: 10, repeat: Infinity, ease: 'easeInOut' as const };

export function RevisionThemesJourney() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(REVISION_THEMES[0]?.id ?? 'socle-procedure');
  const theme = useMemo(
    () => REVISION_THEMES.find((t) => t.id === activeId) ?? REVISION_THEMES[0],
    [activeId],
  );

  const p = theme ? PALETTES[theme.visualKey] : PALETTES.violet;
  const stagger = reduceMotion ? 0 : 0.05;
  const springTab = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 380, damping: 28 };

  if (!theme) return null;

  return (
    <section
      className='relative mb-16 overflow-hidden rounded-[2rem] border border-white/[0.1] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/[0.06]'
      aria-labelledby='revision-par-theme-title'
    >
      {/* Fond : grille + blobs animés */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.08),_transparent_50%)]' />
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.35]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 L60 0 M-15 15 L15 -15 M45 75 L75 45' stroke='rgba(255,255,255,0.06)' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />
      {!reduceMotion && (
        <>
          <motion.div
            className={cn('pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full blur-3xl', p.blobA)}
            animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
            transition={blobTransition}
          />
          <motion.div
            className={cn('pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full blur-3xl', p.blobB)}
            animate={{ x: [0, -25, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
            transition={{ ...blobTransition, duration: 12 }}
          />
          <motion.div
            className={cn('pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-3xl', p.blobC)}
            animate={{ opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className='relative p-6 md:p-8'>
        <div className='mb-8 flex flex-wrap items-start justify-between gap-4'>
          <div className='max-w-2xl'>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em]',
                p.badge,
              )}
            >
              <Wand2 className='h-3.5 w-3.5' aria-hidden />
              Révision guidée
            </motion.p>
            <motion.h2
              id='revision-par-theme-title'
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease }}
              className={cn(
                'mt-3 bg-gradient-to-r bg-clip-text font-sans text-3xl font-black tracking-tight text-transparent md:text-4xl',
                p.titleFrom,
                p.titleVia,
                p.titleTo,
              )}
            >
              Un thème = tout le fil
            </motion.h2>
            <p className='mt-3 text-sm leading-relaxed text-slate-400 md:text-base'>
              Comme en formation :{' '}
              <span className='font-semibold text-slate-300'>conditions → cours → rubriques → exercices</span>, puis{' '}
              <span
                className={cn(
                  'bg-gradient-to-r bg-clip-text font-bold text-transparent',
                  p.titleFrom,
                  p.titleVia,
                  p.titleTo,
                )}
              >
                Épreuve 1 → 2 → 3
              </span>{' '}
              sur le même thème. Tes cours papier viennent en complément : garde la chronologie du document pour les
              planches. Choisis une bulle colorée pour le détail par thème.
            </p>
          </div>
        </div>

        {/* Séquence officielle présentiel — ne pas mélanger avec les planches complémentaires du hub */}
        <div
          className={cn(
            'mb-8 rounded-2xl border border-white/[0.09] bg-black/30 p-4 shadow-inner shadow-black/30 md:p-5',
            p.panelBorder,
          )}
        >
          <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500'>Séquence formation (document centre)</p>
          <p className='mt-1 text-xs text-slate-500'>
            Ordre à respecter : Alpha, puis Bravo, puis Charlie — avant d’explorer les autres fiches du site.
          </p>
          <div className='mt-4 flex flex-wrap gap-2'>
            {FORMATION_ENQUETES_CHRONO.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className={cn(
                  'inline-flex items-center justify-center rounded-xl border px-3 py-2 text-center text-[11px] font-bold transition md:min-w-[7rem]',
                  p.linkIdle,
                  p.linkHover,
                )}
              >
                {lien.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Onglets thèmes — bulles avec indicateur animé */}
        <div
          className='mb-8 flex gap-3 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          role='tablist'
          aria-label='Choisir un thème de révision'
        >
          {REVISION_THEMES.map((t) => {
            const selected = t.id === activeId;
            const tp = PALETTES[t.visualKey];
            return (
              <motion.button
                key={t.id}
                type='button'
                role='tab'
                aria-selected={selected}
                onClick={() => setActiveId(t.id)}
                whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={springTab}
                className={cn(
                  'relative flex min-w-[10.5rem] shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors',
                  selected
                    ? cn('text-white', tp.tabActive)
                    : 'border-white/[0.08] bg-black/20 text-slate-500 hover:border-white/15 hover:bg-white/[0.06] hover:text-slate-200',
                )}
              >
                {selected && (
                  <motion.span
                    layoutId='revision-theme-tab-glow'
                    className={cn(
                      'absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br opacity-90',
                      tp.tabGlow,
                    )}
                    transition={springTab}
                  />
                )}
                <motion.span
                  className='text-2xl drop-shadow-md'
                  aria-hidden
                  animate={selected && !reduceMotion ? { rotate: [0, -6, 6, 0] } : {}}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {t.emoji}
                </motion.span>
                <span className='min-w-0'>
                  <span className='block text-sm font-bold leading-tight'>{t.titre}</span>
                  <span className='mt-0.5 block truncate text-[11px] font-medium text-slate-500' title={t.sousTitre}>
                    {t.sousTitre}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={theme.id}
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.4, ease }}
            className={cn(
              'relative overflow-hidden rounded-[1.35rem] border bg-gradient-to-br p-5 shadow-2xl md:p-7',
              p.panelFrom,
              p.panelVia,
              p.panelTo,
              p.panelBorder,
            )}
          >
            {/* Ligne brillante haut de carte */}
            <div
              className={cn(
                'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-80',
                p.connector,
              )}
            />

            {/* Rubriques */}
            <div className='mb-8'>
              <p className='mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500'>
                <BookOpen className='h-4 w-4 text-slate-400' aria-hidden />
                Rubriques essentielles
              </p>
              <ul className='flex flex-wrap gap-2.5'>
                {theme.rubriquesEssentielles.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * stagger, duration: 0.35, ease }}
                  >
                    <span
                      className={cn(
                        'inline-block rounded-2xl border border-white/10 px-3.5 py-2 text-xs font-medium leading-snug text-slate-100 ring-1 ring-inset transition hover:-translate-y-0.5',
                        p.tagRing,
                        p.tagBg,
                      )}
                    >
                      {r}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className='mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500'>
              <span
                className={cn('h-2 w-2 animate-pulse rounded-full bg-gradient-to-br shadow-lg', p.stepIcon)}
                style={{ boxShadow: '0 0 12px currentColor' }}
              />
              Parcours en 7 étapes
            </p>

            {/* Mobile : défilement horizontal snap */}
            <div className='-mx-1 md:mx-0'>
              <ol className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-7 md:gap-0 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden'>
                {theme.etapes.map((etape, i) => {
                  const Icon = STEP_ICONS[etape.cle];
                  return (
                    <motion.li
                      key={etape.cle}
                      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * stagger, duration: 0.4, ease }}
                      className={cn(
                        'relative flex min-w-[11.5rem] snap-center flex-col rounded-2xl border border-white/[0.07] bg-black/25 p-3 shadow-lg backdrop-blur-sm md:min-w-0 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0',
                        'md:items-center md:border-l md:border-white/10 md:px-1.5',
                        i === 0 && 'md:border-l-0 md:pl-0',
                      )}
                    >
                      <div className='relative mx-auto md:mx-0'>
                        <motion.div
                          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                          className={cn(
                            'relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg ring-2 ring-white/10',
                            p.stepIcon,
                            p.stepIconGlow,
                          )}
                        >
                          <Icon className='relative z-[1] h-6 w-6 text-white drop-shadow-md' strokeWidth={1.75} aria-hidden />
                        </motion.div>
                      </div>
                      <p className='mt-2.5 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white md:text-[11px]'>
                        {etape.titre}
                      </p>
                      <p className='mt-1 text-center text-[10px] leading-snug text-slate-500 md:min-h-[2.75rem]'>
                        {etape.hint}
                      </p>
                      <div className='mt-2.5 flex w-full flex-col gap-1.5 md:items-stretch'>
                        {etape.liens.map((l, j) => (
                          <motion.div
                            key={l.href + l.label}
                            initial={reduceMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 + i * stagger + j * 0.03 }}
                          >
                            <Link
                              href={l.href}
                              className={cn(
                                'flex w-full items-center justify-center rounded-xl border px-2 py-2 text-center text-[11px] font-bold transition',
                                p.linkIdle,
                                p.linkHover,
                              )}
                            >
                              {l.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
