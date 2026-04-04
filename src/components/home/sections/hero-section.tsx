'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { LANDING_EASE } from '@/components/home/motion';

export function HeroSection() {
  return (
    <section className='relative min-h-[90vh] overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:40px_40px]'
        aria-hidden
      />

      <div
        className='pointer-events-none absolute left-1/2 top-[-15%] h-[min(88vh,920px)] w-[min(130vw,1400px)] -translate-x-1/2'
        aria-hidden
      >
        <div className='h-full w-full rounded-full bg-[#2563eb]/[0.08] blur-3xl will-change-transform animate-hero-pulse-blue' />
      </div>

      <div
        className='pointer-events-none absolute bottom-[-25%] right-[-25%] h-[min(65vh,640px)] w-[min(85vw,900px)] md:right-[-8%]'
        aria-hidden
      >
        <div className='h-full w-full rounded-full bg-[#d4a843]/[0.05] blur-3xl will-change-transform animate-hero-pulse-gold' />
      </div>

      <div
        className='pointer-events-none absolute left-1/2 top-[42%] z-[1] h-px w-[60%] max-w-3xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent'
        aria-hidden
      />

      <div className='relative z-10 mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 pb-16 pt-24 text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0 }}
          className='mb-8 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-sm font-medium text-gold-400'
        >
          <motion.span
            className='inline-block text-gold-300 will-change-transform'
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          >
            ✦
          </motion.span>
          Préparation examen OPJ
        </motion.div>

        <div className='space-y-2 md:space-y-3'>
          <motion.p
            className='text-lg font-light uppercase tracking-[0.3em] text-gray-400 md:text-xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.1 }}
          >
            PRÉPAREZ VOTRE
          </motion.p>
          <motion.h1
            className='bg-gradient-to-r from-white via-white to-gold-400 bg-clip-text font-display text-6xl font-bold tracking-tight text-transparent md:text-8xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.2 }}
          >
            EXAMEN OPJ
          </motion.h1>
          <motion.p
            className='font-display text-2xl tracking-[0.2em] text-gold-400 md:text-3xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.3 }}
          >
            JUIN 2026
          </motion.p>
        </div>

        <motion.p
          className='mx-auto mt-8 max-w-2xl text-lg text-gray-400'
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.4 }}
        >
          Fiches de cours, méthodologie et entraînement pour l&apos;examen d&apos;Officier de Police Judiciaire — contenus
          pédagogiques à compléter avec les codes en vigueur.
        </motion.p>

        <motion.div
          className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap'
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.5 }}
        >
          <Link
            href='/signup'
            className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] will-change-transform'
          >
            Commencer les révisions →
          </Link>
          <Link
            href='/guide-revision-opj'
            className='inline-flex items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/10 px-8 py-4 text-base font-semibold text-gold-100 transition-all hover:bg-gold-500/15'
          >
            Guide de révision complet
          </Link>
          <Link
            href='/cours/modules'
            className='inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-gray-100 transition-all hover:bg-white/10'
          >
            Modules de cours F01–F15
          </Link>
        </motion.div>

        <motion.div
          className='mt-16 flex flex-col items-center gap-3 text-gray-500'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.8 }}
        >
          <Link
            href='/#programme-cours'
            className='text-sm font-medium text-gray-400 underline-offset-4 transition hover:text-cyan-300/90 hover:underline'
          >
            Voir le programme F01–F15
          </Link>
          <span className='inline-block animate-scroll-bounce text-2xl will-change-transform' aria-hidden>
            ↓
          </span>
          <span className='sr-only'>Faire défiler vers le bas</span>
        </motion.div>
      </div>
    </section>
  );
}
