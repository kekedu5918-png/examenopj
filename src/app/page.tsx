'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';

export default function Home() {
  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 bg-hero-glow' aria-hidden />
      <div className='relative mx-auto max-w-6xl px-4 pb-24 pt-16 md:pt-24'>
        <motion.div
          className='mx-auto max-w-3xl text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className='mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold-400/90'>
            Examen Juin 2026
          </p>
          <h1 className='mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text font-display text-4xl font-bold tracking-tight text-transparent md:text-6xl'>
            La plateforme premium pour l&apos;examen OPJ
          </h1>
          <p className='mx-auto mb-10 max-w-xl text-lg text-gray-400'>
            Fascicules, méthodologie, quiz et flashcards — tout pour préparer l&apos;habilitation Officier de Police
            Judiciaire.
          </p>
          <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Link
              href='/signup'
              className='inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gray-100'
            >
              Commencer
              <ArrowRight className='h-4 w-4' />
            </Link>
            <Link
              href='/fascicules'
              className='inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.08]'
            >
              Voir les fascicules
            </Link>
          </div>
        </motion.div>

        <motion.div
          className='mx-auto mt-20 grid max-w-4xl gap-4 md:grid-cols-3'
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard hover className='text-left' padding='p-6'>
            <BookOpen className='mb-3 h-8 w-8 text-gold-400' strokeWidth={1.5} />
            <h2 className='font-display text-lg font-semibold text-white'>Fascicules structurés</h2>
            <p className='mt-2 text-sm text-gray-500'>Alignés sur la documentation SDCP et les attendus de l&apos;épreuve.</p>
          </GlassCard>
          <GlassCard hover className='text-left' padding='p-6'>
            <Layers className='mb-3 h-8 w-8 text-blue-400' strokeWidth={1.5} />
            <h2 className='font-display text-lg font-semibold text-white'>Trois épreuves</h2>
            <p className='mt-2 text-sm text-gray-500'>DPG/DPS, procédure et oral — parcours clair par compétence.</p>
          </GlassCard>
          <GlassCard hover className='text-left' padding='p-6'>
            <Sparkles className='mb-3 h-8 w-8 text-violet-400' strokeWidth={1.5} />
            <h2 className='font-display text-lg font-semibold text-white'>Quiz & flashcards</h2>
            <p className='mt-2 text-sm text-gray-500'>Mémorisation active et suivi pour consolider avant le jour J.</p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
