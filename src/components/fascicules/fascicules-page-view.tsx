'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import {
  DOMAIN_LABELS,
  FASCICULES,
  TOTAL_PAGES,
  cahierMiseAJour,
  fasciculeDetailPath,
  type Domain,
} from '@/data/fascicules-list';
import { LANDING_EASE } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const ease = [...LANDING_EASE] as [number, number, number, number];

type DomainFilter = 'all' | Domain;

const domainVisual: Record<
  Domain,
  { stripe: string; badge: string; short: string; glow: string; ring: string }
> = {
  DPS: {
    stripe: 'bg-red-500',
    badge: 'bg-red-500/20 text-red-300 border-red-500/25',
    short: 'DPS',
    glow: 'group-hover:shadow-[0_0_32px_-4px_rgba(239,68,68,0.35)]',
    ring: 'group-hover:border-red-500/30',
  },
  DPG: {
    stripe: 'bg-violet-500',
    badge: 'bg-violet-500/20 text-violet-300 border-violet-500/25',
    short: 'DPG',
    glow: 'group-hover:shadow-[0_0_32px_-4px_rgba(139,92,246,0.35)]',
    ring: 'group-hover:border-violet-500/30',
  },
  PROCEDURE: {
    stripe: 'bg-emerald-500',
    badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
    short: 'PROC.',
    glow: 'group-hover:shadow-[0_0_32px_-4px_rgba(16,185,129,0.35)]',
    ring: 'group-hover:border-emerald-500/30',
  },
};

const headerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' as const },
  transition: { duration: 0.45, ease },
};

export function FasciculesPageView() {
  const [filter, setFilter] = useState<DomainFilter>('all');

  const counts = useMemo(() => {
    const dps = FASCICULES.filter((f) => f.domain === 'DPS').length;
    const dpg = FASCICULES.filter((f) => f.domain === 'DPG').length;
    const proc = FASCICULES.filter((f) => f.domain === 'PROCEDURE').length;
    return { dps, dpg, proc };
  }, []);

  const filterTabs: { id: DomainFilter; label: string; count?: number; badgeClass: string }[] = useMemo(
    () => [
      { id: 'all', label: 'Tous', badgeClass: 'bg-white/10 text-gray-300 border-white/15' },
      {
        id: 'DPS',
        label: DOMAIN_LABELS.DPS,
        count: counts.dps,
        badgeClass: 'bg-red-500/15 text-red-300 border-red-500/25',
      },
      {
        id: 'DPG',
        label: DOMAIN_LABELS.DPG,
        count: counts.dpg,
        badgeClass: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
      },
      {
        id: 'PROCEDURE',
        label: DOMAIN_LABELS.PROCEDURE,
        count: counts.proc,
        badgeClass: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
      },
    ],
    [counts],
  );

  const filtered = useMemo(
    () => (filter === 'all' ? FASCICULES : FASCICULES.filter((f) => f.domain === filter)),
    [filter],
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 px-4 pb-24 pt-12 md:px-6 md:pt-16'>
      <div className='mx-auto max-w-6xl'>
        <motion.header
          className='mb-10 md:mb-14'
          variants={headerContainer}
          initial='hidden'
          animate='visible'
        >
          <motion.div variants={headerItem}>
            <SectionTitle
              badge='PROGRAMME'
              badgeClassName='bg-violet-500/20 text-violet-300'
              title='Les fascicules officiels'
              subtitle="Le programme complet de l'Académie de Police — Version au 01/12/2025"
              className='[&_h2]:font-display [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:text-white md:[&_h2]:text-5xl'
            />
          </motion.div>
          <motion.p variants={headerItem} className='mt-4 text-sm text-gray-500'>
            {FASCICULES.length} fascicules · {TOTAL_PAGES} pages · 3 domaines
          </motion.p>
        </motion.header>

        <motion.div
          variants={headerItem}
          initial='hidden'
          animate='visible'
          className='mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          role='tablist'
          aria-label='Filtrer par domaine'
        >
          {filterTabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type='button'
                role='tab'
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all duration-200',
                  active
                    ? 'border-white/25 bg-white/[0.08] text-white shadow-lg'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/15 hover:bg-white/[0.05] hover:text-gray-200',
                )}
              >
                {tab.count != null ? (
                  <span
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-[10px] font-semibold tabular-nums',
                      tab.badgeClass,
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((f, index) => {
            const v = domainVisual[f.domain];
            const chapterCount = f.chapters.length;
            const detailHref = fasciculeDetailPath(f.id);
            return (
              <motion.div
                key={f.id}
                {...cardMotion}
                transition={{ ...cardMotion.transition, delay: (index % 6) * 0.05 }}
              >
                <GlassCard
                  hover={false}
                  padding='p-0'
                  className={cn(
                    'relative h-full overflow-hidden transition-all duration-300',
                    v.glow,
                    v.ring,
                  )}
                >
                  <div className={cn('absolute left-0 right-0 top-0 h-[3px]', v.stripe)} />
                  <div className='relative p-5 pt-6'>
                    <div className='flex flex-wrap items-start justify-between gap-2'>
                      <span
                        className={cn(
                          'inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                          v.badge,
                        )}
                      >
                        {v.short}
                      </span>
                      {f.note ? (
                        <span className='rounded-full border border-amber-500/35 bg-amber-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-200'>
                          Partie 2/2
                        </span>
                      ) : null}
                    </div>
                    <span
                      className='pointer-events-none absolute right-4 top-4 font-display text-5xl font-bold text-white/[0.04]'
                      aria-hidden
                    >
                      {f.num}
                    </span>
                    <Link
                      href={detailHref}
                      className='group mt-3 block outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950'
                    >
                      <h3 className='line-clamp-3 text-base font-semibold leading-tight text-white group-hover:text-cyan-100'>
                        {f.title}
                      </h3>
                      <p className='mt-2 line-clamp-2 text-sm text-gray-400'>{f.subtitle}</p>
                      <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4'>
                        <span className='text-xs text-gray-500'>{f.pages} pages</span>
                        {chapterCount > 0 ? (
                          <span className='rounded-full bg-white/5 px-2 py-0.5 text-xs text-gray-400'>
                            {chapterCount} chapitre{chapterCount > 1 ? 's' : ''}
                          </span>
                        ) : null}
                        {f.infractions && f.infractions.length > 0 ? (
                          <span className='rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400'>
                            {f.infractions.length} infractions
                          </span>
                        ) : null}
                        <ChevronRight
                          className='ml-auto h-4 w-4 text-gray-600 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-gray-400'
                          strokeWidth={2}
                          aria-hidden
                        />
                      </div>
                    </Link>
                    <div className='mt-3 flex flex-wrap gap-2 border-t border-white/[0.06] px-5 pb-5 pt-3'>
                      <Link
                        href={`/quiz?mode=fascicule&f=${f.id}`}
                        className='rounded-lg bg-cyan-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500'
                        onClick={(e) => e.stopPropagation()}
                      >
                        Quiz
                      </Link>
                      <Link
                        href={`/flashcards?f=${f.id}`}
                        className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-white/10'
                      >
                        Flashcards
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <motion.section
          className='mt-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
        >
          <GlassCard
            padding='p-6 md:p-8'
            className='border-gold-400/30 bg-gradient-to-br from-gold-400/[0.04] to-transparent'
          >
            <span className='inline-block rounded-full bg-gold-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400'>
              MAJ
            </span>
            <h2 className='mt-3 font-display text-xl font-bold text-gray-100 md:text-2xl'>
              {cahierMiseAJour.titre} — {cahierMiseAJour.periode}
            </h2>
            <ul className='mt-5 space-y-2.5 text-sm text-gray-400'>
              {cahierMiseAJour.textes.map((t) => (
                <li key={t} className='flex gap-2 leading-snug'>
                  <span className='mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400/70' aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.section>
      </div>
    </div>
  );
}
