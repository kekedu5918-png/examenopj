'use client';

import { motion } from 'framer-motion';

import {
  CountdownWrittenExamBlock,
  EcritsBlancsCardContent,
  OralFirstSlotDayCount,
} from '@/components/home/hydration-safe-day-counts';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

function EcritsBlancsCard() {
  return (
    <motion.div
      initial={MOTION_INITIAL_FOR_SEO}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: LANDING_EASE }}
      className='rounded-2xl border border-gold-400/20 bg-white/[0.02] p-6 text-center will-change-transform'
    >
      <p className='text-sm font-semibold uppercase tracking-wider text-gold-400/90'>Écrits blancs</p>
      <p className='mt-2 text-sm text-examen-inkMuted'>13 avril & 4 mai 2026</p>
      <EcritsBlancsCardContent />
    </motion.div>
  );
}

function ExamenEcritCard() {
  return (
    <motion.div
      initial={MOTION_INITIAL_FOR_SEO}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.08 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gold-400/30 bg-white/[0.04] p-8 text-center shadow-[0_0_60px_-12px_rgba(212,168,67,0.25)] md:scale-[1.03] md:py-10 will-change-transform',
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent' aria-hidden />
      <p className='relative text-sm font-semibold uppercase tracking-wider text-gold-400'>Examen écrit</p>
      <p className='relative mt-2 text-sm text-examen-inkMuted'>11 juin 2026</p>
      <CountdownWrittenExamBlock />
    </motion.div>
  );
}

function OralCard() {
  return (
    <motion.div
      initial={MOTION_INITIAL_FOR_SEO}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.16 }}
      className='rounded-2xl border border-gold-400/20 bg-white/[0.02] p-6 text-center will-change-transform'
    >
      <p className='text-sm font-semibold uppercase tracking-wider text-gold-400/90'>Oral</p>
      <p className='mt-2 text-sm text-examen-inkMuted'>15 au 26 juin 2026</p>
      <OralFirstSlotDayCount />
    </motion.div>
  );
}

export function CountdownSection() {
  return (
    <section className='bg-gradient-to-b from-navy-900/80 to-navy-950 px-6 py-24'>
      <div className='mx-auto max-w-4xl'>
        <SectionTitle
          badge='OBJECTIF'
          badgeClassName='border border-gold-400/30 bg-gold-400/10 text-gold-400'
          title="L'examen approche"
          className='mx-auto mb-14 max-w-xl text-center'
        />

        <div className='grid items-stretch gap-6 md:grid-cols-3'>
          <EcritsBlancsCard />
          <ExamenEcritCard />
          <OralCard />
        </div>
      </div>
    </section>
  );
}
