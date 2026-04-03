'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookMarked, FolderGit2, Network, Scale, Sparkles } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  coursePillars,
  courseStepMeta,
  type CourseAccent,
  type CoursePillar,
} from '@/data/courses-hub-data';
import { cn } from '@/utils/cn';

const ease = [...LANDING_EASE] as [number, number, number, number];

const accentGlow: Record<CourseAccent, string> = {
  rose: 'shadow-[0_0_40px_-14px_rgba(244,63,94,0.35)]',
  violet: 'shadow-[0_0_40px_-14px_rgba(139,92,246,0.32)]',
  blue: 'shadow-[0_0_40px_-14px_rgba(59,130,246,0.3)]',
  emerald: 'shadow-[0_0_40px_-14px_rgba(16,185,129,0.28)]',
  amber: 'shadow-[0_0_40px_-14px_rgba(245,158,11,0.26)]',
};

const accentIconBg: Record<CourseAccent, string> = {
  rose: 'bg-rose-500/15 text-rose-300',
  violet: 'bg-violet-500/15 text-violet-300',
  blue: 'bg-blue-500/15 text-blue-300',
  emerald: 'bg-emerald-500/15 text-emerald-300',
  amber: 'bg-amber-500/15 text-amber-200',
};

const accentLeft: Record<CourseAccent, string> = {
  rose: 'border-l-rose-500',
  violet: 'border-l-violet-500',
  blue: 'border-l-blue-500',
  emerald: 'border-l-emerald-500',
  amber: 'border-l-amber-500',
};

const icons = {
  Scale,
  BookMarked,
  FolderGit2,
  Network,
  Sparkles,
} as const;

function PillarCard({ pillar, index }: { pillar: CoursePillar; index: number }) {
  const Icon = icons[pillar.iconName];
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.1] bg-navy-950/50',
        accentGlow[pillar.accent],
      )}
    >
      <GlassCard className='relative h-full border-white/[0.06] bg-navy-950/90 p-6' padding=''>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex min-w-0 flex-1 gap-4'>
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10',
                accentIconBg[pillar.accent],
              )}
            >
              <Icon className='h-6 w-6' strokeWidth={1.5} aria-hidden />
            </div>
            <div className='min-w-0 space-y-2'>
              <h3 className='font-display text-xl font-bold tracking-tight text-white md:text-2xl'>{pillar.title}</h3>
              <p className='text-sm font-medium text-gold-400/95'>{pillar.hook}</p>
              <p className='text-sm leading-relaxed text-gray-400'>{pillar.description}</p>
              <p className='text-xs text-gray-500'>{pillar.rhythm}</p>
            </div>
          </div>
        </div>

        <ul className='mt-6 flex flex-col gap-2.5'>
          {pillar.steps.map((step) => {
            const meta = courseStepMeta[step.kind];
            return (
              <li key={`${pillar.id}-${step.href}-${step.label}`}>
                <Link
                  href={step.href}
                  className={cn(
                    'group flex items-center justify-between gap-3 rounded-xl border border-white/10 border-l-[3px] bg-white/[0.03] px-4 py-3 text-sm transition',
                    'hover:border-white/20 hover:bg-white/[0.06]',
                    accentLeft[pillar.accent],
                  )}
                >
                  <span className='flex min-w-0 items-center gap-2'>
                    <span className='shrink-0 text-base' aria-hidden>
                      {meta.emoji}
                    </span>
                    <span className='min-w-0'>
                      <span className='block text-xs font-semibold uppercase tracking-wide text-gray-500 group-hover:text-gray-400'>
                        {meta.label}
                      </span>
                      <span className='font-medium text-gray-100'>{step.label}</span>
                      {step.hint ? (
                        <span className='mt-0.5 block text-xs text-gray-500'>{step.hint}</span>
                      ) : null}
                    </span>
                  </span>
                  <span className='shrink-0 text-gray-500 transition group-hover:translate-x-0.5 group-hover:text-white'>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </GlassCard>
    </motion.article>
  );
}

export function CoursPageClient() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1018] to-navy-950'>
      <div className='container pb-24 pt-12 md:pt-16'>
        <header className='mx-auto max-w-3xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <span className='inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-200'>
              Base métier
            </span>
            <h1 className='mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-5xl'>
              Cours & fondamentaux
            </h1>
            <p className='mt-4 text-lg text-gray-400'>
              Ce que tu mobilises déjà en tant que policier : droit spécial, droit général, procédure. Ici, pas de
              « copie d’examen » : tu ranges, tu consolides, tu t’entraînes de façon{' '}
              <span className='text-gray-200'>ciblée et ludique</span>.
            </p>
          </motion.div>
        </header>

        <motion.div
          className='mx-auto mt-12 max-w-2xl'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.08 }}
        >
          <GlassCard className='border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.07] to-transparent p-6'>
            <p className='text-sm font-medium text-indigo-200'>Comment lire cette page</p>
            <ul className='mt-3 space-y-2 text-sm text-gray-400'>
              <li className='flex gap-2'>
                <span className='text-indigo-400'>1.</span>
                Choisis un pilier selon ton besoin du moment (DPS après une inter, procédure après une GAV, etc.).
              </li>
              <li className='flex gap-2'>
                <span className='text-indigo-400'>2.</span>
                Enchaîne les pastilles : lire le programme → quiz → flashcards ou référentiel.
              </li>
              <li className='flex gap-2'>
                <span className='text-indigo-400'>3.</span>
                Les épreuves écrites et orales restent dans le menu « Épreuves » quand tu voudras les lier au concours.
              </li>
            </ul>
          </GlassCard>
        </motion.div>

        <div className='mx-auto mt-16 max-w-4xl'>
          <SectionTitle
            badge='PARCOURS'
            badgeClassName='bg-teal-500/20 text-teal-200'
            title='Cinq piliers pour tout ranger'
            subtitle='Chaque bloc regroupe les bons outils du site, dans un ordre qui fait sens pour la mémoire.'
            className='mb-10 text-center [&_h2]:mx-auto [&_p]:mx-auto [&_p]:max-w-2xl'
          />

          <div className='flex flex-col gap-8'>
            {coursePillars.map((pillar, i) => (
              <PillarCard key={pillar.id} pillar={pillar} index={i} />
            ))}
          </div>
        </div>

        <motion.footer
          className='mx-auto mt-16 max-w-xl text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
        >
          <p className='text-sm text-gray-500'>
            Astuce : garde un onglet ouvert sur le{' '}
            <Link href='/quiz' className='text-cyan-400/90 underline-offset-2 hover:underline'>
              quiz
            </Link>{' '}
            et un sur les{' '}
            <Link href='/flashcards' className='text-amber-400/90 underline-offset-2 hover:underline'>
              flashcards
            </Link>
            — alterner lecture courte et test rapide, c’est ce qui fixe le mieux.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
