'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { EpreuveTabs } from '@/components/epreuves/EpreuveTabs';
import { LANDING_EASE } from '@/components/home/motion';

const ease = [...LANDING_EASE] as [number, number, number, number];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Epreuve2Header() {
  return (
    <motion.header
      className='mx-auto max-w-5xl px-6 py-16'
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <motion.nav variants={item} className='mb-8 text-sm text-gray-500' aria-label="Fil d'Ariane">
        <Link href='/' className='transition-colors hover:text-gray-300'>
          Accueil
        </Link>
        <span className='mx-2 text-gray-600' aria-hidden>
          &gt;
        </span>
        <Link href='/epreuves' className='transition-colors hover:text-gray-300'>
          Épreuves
        </Link>
        <span className='mx-2 text-gray-600' aria-hidden>
          &gt;
        </span>
        <span className='text-gray-400' aria-current='page'>
          Épreuve 2
        </span>
      </motion.nav>

      <motion.span
        variants={item}
        className='mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400'
      >
        ÉPREUVE 2
      </motion.span>

      <motion.h1
        variants={item}
        className='font-display text-5xl font-bold text-white md:text-6xl'
      >
        PROCÉDURE PÉNALE
      </motion.h1>

      <motion.p variants={item} className='mt-3 text-xl text-gray-400'>
        Articulation de procédure, PV & Rapport de synthèse
      </motion.p>

      <motion.div variants={item} className='mt-8'>
        <EpreuveTabs active='2' />
      </motion.div>

      <motion.div variants={item} className='mt-6'>
        <Link
          href='/cours/pv'
          className='inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/15'
        >
          Voir les modèles de PV complets →
        </Link>
      </motion.div>

      <motion.div variants={item} className='mt-8 flex flex-wrap gap-3'>
        <span className='rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          📋 Articulation /10
        </span>
        <span className='rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          📝 Rédaction PV
        </span>
        <span className='rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          📄 Rapport de synthèse
        </span>
      </motion.div>
    </motion.header>
  );
}
