'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { LANDING_EASE } from '@/components/home/motion';

export function FinalCtaSection() {
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
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: LANDING_EASE }}
      >
        <h2 className='font-display text-3xl font-bold tracking-tight text-gray-100 md:text-5xl'>
          Prêt à décrocher votre habilitation OPJ ?
        </h2>
        <p className='mt-4 text-lg text-gray-400'>Rejoignez la plateforme de référence</p>

        <div className='mt-10'>
          <Link
            href='/signup'
            className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] will-change-transform'
          >
            Commencer gratuitement →
          </Link>
        </div>
        <p className='mt-6 text-sm text-gray-500'>Accès gratuit • Pas de carte bancaire</p>
      </motion.div>
    </section>
  );
}
