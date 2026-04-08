'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { cn } from '@/utils/cn';

export function FinalCtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className='relative overflow-hidden px-6 py-32'>
      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 h-[70%] will-change-transform'
        aria-hidden
      >
        <div className='absolute bottom-[-40%] left-1/2 h-[min(80vh,800px)] w-[min(120vw,1000px)] -translate-x-1/2 rounded-full bg-[#2563eb]/[0.06] blur-3xl animate-hero-pulse-gold' />
        <div className='absolute bottom-[-30%] right-[-15%] h-[50vh] w-[70vw] rounded-full bg-[#d4a843]/[0.04] blur-3xl animate-hero-pulse-blue' />
      </div>

      <motion.div
        className='relative z-10 mx-auto max-w-3xl text-center'
        initial={MOTION_INITIAL_FOR_SEO}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: LANDING_EASE }}
      >
        <h2 className='bg-gradient-to-br from-examen-ink via-examen-ink to-examen-inkMuted bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent md:text-5xl'>
          Prêt à décrocher votre habilitation OPJ ?
        </h2>
        <p className='mt-4 text-lg text-examen-inkMuted'>Méthode structurée, contenus à jour et entraînements ciblés.</p>

        <div className='mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
          <Link
            href='/inscription'
            className={cn(
              'group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-examen-accent to-examen-premium px-10 py-4 text-base font-semibold text-white shadow-lg shadow-examen-accent/25 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-examen-accent/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-examen-accent/80 active:scale-[0.98]',
              !reduceMotion && 'hover:-translate-y-0.5',
            )}
          >
            Commencer gratuitement
            <ArrowRight className='size-4 shrink-0 transition-transform group-hover:translate-x-0.5' aria-hidden />
          </Link>
          <Link
            href='/guide-revision-opj'
            className='inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-examen-ink transition hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-examen-accent/60'
          >
            Consulter le guide de révision
          </Link>
        </div>
        <p className='mt-6 text-sm text-examen-inkMuted'>Accès gratuit pour commencer — sans carte bancaire.</p>
      </motion.div>
    </section>
  );
}
