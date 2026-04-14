'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardList, FileStack, FileText, Timer } from 'lucide-react';

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
        className='mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200'
      >
        La plus technique · La plus décisive
      </motion.span>

      <motion.h1 variants={item} className='font-display text-4xl font-bold text-white md:text-5xl'>
        Épreuve 2 — Procédure pénale (4 heures)
      </motion.h1>

      <motion.p variants={item} className='mt-3 text-xl text-gray-400'>
        Rédaction de PV · Articulation de procédure · Rapport de synthèse
      </motion.p>

      <motion.div variants={item} className='mt-8'>
        <EpreuveTabs active='2' />
      </motion.div>

      <motion.div variants={item} className='mt-6 flex flex-wrap gap-3'>
        <Link
          href='/enquetes'
          className='inline-flex items-center gap-2 rounded-xl border border-examen-accent/35 bg-examen-accent/10 px-4 py-2.5 text-sm font-semibold text-examen-accent transition hover:border-examen-accent/50 hover:bg-examen-accent/15'
        >
          Enquêtes types (mise en situation) →
        </Link>
        <Link
          href='/entrainement/redaction-pv'
          className='inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/15'
        >
          Modèles de PV complets →
        </Link>
      </motion.div>

      <motion.div variants={item} className='mt-8 flex flex-wrap gap-3'>
        <span className='inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-200'>
          <Timer className='h-4 w-4 shrink-0 text-blue-300/80' strokeWidth={1.75} aria-hidden />
          4 heures
        </span>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <ClipboardList className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          Articulation /10
        </span>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <FileText className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          Rédaction PV
        </span>
        <span className='inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300'>
          <FileStack className='h-4 w-4 shrink-0 text-gray-400' strokeWidth={1.75} aria-hidden />
          Rapport de synthèse
        </span>
      </motion.div>
    </motion.header>
  );
}
