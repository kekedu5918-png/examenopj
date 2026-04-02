'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { type FasciculeMetadata, cahierMiseAJour, fasciculesList } from '@/data/fascicules-list';
import { LANDING_EASE } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const ease = [...LANDING_EASE] as [number, number, number, number];

export function fasciculePath(numero: number) {
  return `/fascicules/f${String(numero).padStart(2, '0')}`;
}

type DomainFilter = 'all' | FasciculeMetadata['domaine'];

const domainVisual = {
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
  'Procédure pénale': {
    stripe: 'bg-blue-500',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/25',
    short: 'PROCÉDURE',
    glow: 'group-hover:shadow-[0_0_32px_-4px_rgba(59,130,246,0.35)]',
    ring: 'group-hover:border-blue-500/30',
  },
} as const;

const filterTabs: { id: DomainFilter; label: string; count?: number; badgeClass: string }[] = [
  { id: 'all', label: 'Tous', badgeClass: 'bg-white/10 text-gray-300 border-white/15' },
  { id: 'DPS', label: 'Droit pénal spécial', count: 5, badgeClass: 'bg-red-500/15 text-red-300 border-red-500/25' },
  { id: 'DPG', label: 'Droit pénal général', count: 2, badgeClass: 'bg-violet-500/15 text-violet-300 border-violet-500/25' },
  {
    id: 'Procédure pénale',
    label: 'Procédure pénale',
    count: 4,
    badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  },
] as const;

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

  const filtered =
    filter === 'all' ? fasciculesList : fasciculesList.filter((f) => f.domaine === filter);

  const totalPages = fasciculesList.reduce((acc, f) => acc + f.pages, 0);

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
          <motion.p
            variants={headerItem}
            className='mt-4 text-sm text-gray-500'
          >{`${fasciculesList.length} fascicules • ${totalPages} pages • 3 domaines`}</motion.p>
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
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/15 hover:bg-white/[0.05] hover:text-gray-200'
                )}
              >
                {tab.count != null ? (
                  <span
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-[10px] font-semibold tabular-nums',
                      tab.badgeClass
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
            const v = domainVisual[f.domaine];
            return (
              <motion.div
                key={f.numero}
                {...cardMotion}
                transition={{ ...cardMotion.transition, delay: (index % 6) * 0.05 }}
              >
                <Link href={fasciculePath(f.numero)} className='group block h-full outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950'>
                  <GlassCard
                    hover={false}
                    padding='p-0'
                    className={cn(
                      'relative h-full overflow-hidden transition-all duration-300 group-hover:scale-[1.02]',
                      v.glow,
                      v.ring
                    )}
                  >
                    <div className={cn('absolute left-0 right-0 top-0 h-[3px]', v.stripe)} />
                    <div className='relative p-5 pt-6'>
                      <span
                        className={cn(
                          'inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                          v.badge
                        )}
                      >
                        {v.short}
                      </span>
                      <span
                        className='pointer-events-none absolute right-4 top-4 font-display text-5xl font-bold text-white/[0.04] transition-colors group-hover:text-white/[0.07]'
                        aria-hidden
                      >
                        {f.numero}
                      </span>
                      <h3 className='mt-3 line-clamp-3 text-base font-semibold leading-tight text-white'>
                        {f.titre}
                      </h3>
                      <p className='mt-2 line-clamp-2 text-sm text-gray-400'>{f.description}</p>
                      <div className='mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-4'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='text-xs text-gray-500'>{f.pages} pages</span>
                          {f.nbInfractions > 0 ? (
                            <span className='rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400'>
                              {f.nbInfractions} infractions
                            </span>
                          ) : null}
                        </div>
                        <ChevronRight
                          className='h-4 w-4 text-gray-600 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-gray-400'
                          strokeWidth={2}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
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
