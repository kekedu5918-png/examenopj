'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { cn } from '@/utils/cn';

type TileProps = {
  icon: ReactNode;
  title: string;
  delay: number;
};

function Tile({ icon, title, delay }: TileProps) {
  return (
    <motion.article
      initial={MOTION_INITIAL_FOR_SEO}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: LANDING_EASE, delay }}
      className={cn(
        'rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm',
        'shadow-ex-card transition duration-200 hover:border-white/[0.1] hover:shadow-ex-card-hover',
      )}
    >
      <div
        className='mb-4 text-3xl leading-none'
        aria-hidden
      >
        {icon}
      </div>
      <h3 className='font-display text-lg font-bold tracking-tight text-white' style={{ letterSpacing: '-0.02em' }}>
        {title}
      </h3>
      <p className='mt-3 text-sm leading-relaxed text-examen-inkMuted'>
        Source primaire — tous les contenus sont alignés sur les textes en vigueur.
      </p>
    </motion.article>
  );
}

export function CredibilityOfficialSourcesSection() {
  return (
    <section className='px-4 py-16 md:py-20' aria-labelledby='cred-title'>
      <div className='mx-auto max-w-6xl'>
        <h2 id='cred-title' className='sr-only'>
          Références juridiques officielles
        </h2>
        <p className='mx-auto mb-10 max-w-2xl text-center text-sm font-semibold uppercase tracking-widest text-examen-inkMuted'>
          Construit sur les références officielles
        </p>
        <div className='grid gap-6 md:grid-cols-3'>
          <Tile delay={0} title='Code pénal' icon={<span aria-hidden>📘</span>} />
          <Tile delay={0.08} title='Code de procédure pénale' icon={<span aria-hidden>📗</span>} />
          <Tile delay={0.16} title='Légifrance' icon={<span aria-hidden>⚖️</span>} />
        </div>
      </div>
    </section>
  );
}
