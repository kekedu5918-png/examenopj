'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Timer } from 'lucide-react';

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

export function Epreuve1Header() {
  return (
    <motion.header
      className='mx-auto max-w-5xl px-6 py-16'
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <motion.nav variants={item} className='mb-8 text-sm text-gray-500' aria-label='Fil d&apos;Ariane'>
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
          Épreuve 1
        </span>
      </motion.nav>

      <motion.span
        variants={item}
        className='mb-4 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-red-400'
      >
        ÉPREUVE 1
      </motion.span>

      <motion.h1 variants={item} className='font-display text-5xl font-bold text-white md:text-6xl'>
        DPG / DPS
      </motion.h1>

      <motion.p variants={item} className='mt-3 text-xl text-gray-400'>
        Droit Pénal Général & Droit Pénal Spécial
      </motion.p>

      <motion.div variants={item} className='mt-8'>
        <EpreuveTabs active='1' />
      </motion.div>

      <motion.div variants={item} className='mt-8 flex flex-wrap gap-3'>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <Timer className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          3 heures
        </span>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <BarChart3 className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          Coefficient 2
        </span>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <FileText className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          Note sur 20
        </span>
      </motion.div>
    </motion.header>
  );
}
