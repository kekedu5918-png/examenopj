'use client';

import { motion } from 'framer-motion';

import { LANDING_EASE } from '@/components/home/motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function daysBetween(from: Date, to: Date) {
  const a = startOfDay(from).getTime();
  const b = startOfDay(to).getTime();
  return Math.ceil((b - a) / (86_400_000));
}

function EcritsBlancsCard() {
  const d1 = new Date(2025, 3, 13);
  const d2 = new Date(2025, 4, 4);
  const now = new Date();

  let content: { done: true } | { done: false; days: number };
  if (startOfDay(now) > startOfDay(d2)) {
    content = { done: true };
  } else {
    const next = startOfDay(now) <= startOfDay(d1) ? d1 : d2;
    content = { done: false, days: Math.max(0, daysBetween(now, next)) };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: LANDING_EASE }}
      className='rounded-2xl border border-gold-400/20 bg-white/[0.02] p-6 text-center will-change-transform'
    >
      <p className='text-sm font-semibold uppercase tracking-wider text-gold-400/90'>Écrits blancs</p>
      <p className='mt-2 text-sm text-gray-400'>13 avril & 4 mai 2025</p>
      {content.done ? (
        <p className='mt-6 text-lg font-semibold text-emerald-400'>✅ Terminé</p>
      ) : (
        <p className='mt-6 font-display text-2xl font-bold tabular-nums text-gray-100'>
          {content.days} <span className='text-base font-normal text-gray-400'>jour{content.days > 1 ? 's' : ''}</span>
        </p>
      )}
    </motion.div>
  );
}

function ExamenEcritCard() {
  const target = new Date(2026, 5, 11);
  const now = new Date();
  const days = daysBetween(now, target);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.08 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gold-400/30 bg-white/[0.04] p-8 text-center shadow-[0_0_60px_-12px_rgba(212,168,67,0.25)] md:scale-[1.03] md:py-10 will-change-transform'
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent' aria-hidden />
      <p className='relative text-sm font-semibold uppercase tracking-wider text-gold-400'>Examen écrit</p>
      <p className='relative mt-2 text-sm text-gray-400'>11 juin 2026</p>
      {days <= 0 ? (
        <p className='relative mt-6 text-lg font-semibold text-emerald-400'>Jour J</p>
      ) : (
        <p className='relative mt-6 font-display text-4xl font-bold tabular-nums'>
          <span className='inline-block animate-countdown-pulse text-gold-400 will-change-transform'>
            {days} jours restants
          </span>
        </p>
      )}
    </motion.div>
  );
}

function OralCard() {
  const start = new Date(2026, 5, 15);
  const now = new Date();
  const days = daysBetween(now, start);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.16 }}
      className='rounded-2xl border border-gold-400/20 bg-white/[0.02] p-6 text-center will-change-transform'
    >
      <p className='text-sm font-semibold uppercase tracking-wider text-gold-400/90'>Oral</p>
      <p className='mt-2 text-sm text-gray-400'>15 au 26 juin 2026</p>
      {days <= 0 ? (
        <p className='mt-6 text-lg font-semibold text-gray-200'>Période en cours ou passée</p>
      ) : (
        <p className='mt-6 font-display text-2xl font-bold tabular-nums text-gray-100'>
          {days}{' '}
          <span className='text-base font-normal text-gray-400'>jour{days > 1 ? 's' : ''} avant le premier créneau</span>
        </p>
      )}
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
