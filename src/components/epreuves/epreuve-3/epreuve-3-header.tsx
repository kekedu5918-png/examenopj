'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardList, MessageCircleQuestion, Mic } from 'lucide-react';

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

export function Epreuve3Header() {
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
          Épreuve 3
        </span>
      </motion.nav>

      <motion.span
        variants={item}
        className='mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400'
      >
        ÉPREUVE 3
      </motion.span>

      <motion.h1 variants={item} className='font-display text-5xl font-bold text-white md:text-6xl'>
        ORAL
      </motion.h1>

      <motion.p variants={item} className='mt-3 text-xl text-gray-400'>
        40 min de préparation sur un sujet tiré au sort — oral devant magistrat et commissaire
      </motion.p>

      <motion.div variants={item} className='mt-8'>
        <EpreuveTabs active='3' />
      </motion.div>

      <motion.div variants={item} className='mt-8 flex flex-wrap gap-3'>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <Mic className='h-4 w-4 shrink-0 text-emerald-400/90' strokeWidth={1.75} aria-hidden />
          Oral
        </span>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <ClipboardList className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          Sujet tiré au sort
        </span>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <MessageCircleQuestion className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          Suivi de questions
        </span>
      </motion.div>
    </motion.header>
  );
}
