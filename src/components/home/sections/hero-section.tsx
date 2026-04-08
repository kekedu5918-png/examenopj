'use client';

import { useState } from 'react';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';

import { AnimatedStat } from '@/components/home/AnimatedStat';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { cn } from '@/utils/cn';

export function HeroSection() {
  const shouldReduce = useReducedMotion();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shakeOption, setShakeOption] = useState<string | null>(null);
  const MotionLink = motion(Link);

  return (
    <section className='relative min-h-[92vh] overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:44px_44px] opacity-40'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute right-0 top-1/4 h-[min(70vh,560px)] w-[min(90vw,520px)] translate-x-1/4 bg-examen-accent/20 blur-3xl'
        aria-hidden
      />

      <div className='relative z-10 mx-auto grid max-w-6xl min-h-[92vh] grid-cols-1 items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24'>
        <div>
          <motion.div
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE }}
            className='mb-6 inline-flex max-w-md flex-col gap-1 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:gap-3'
          >
            <span className='h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.25)] animate-ex-pulse-dot' aria-hidden />
            <span className='text-sm font-semibold leading-snug text-emerald-100'>
              Formation en cours · Mis à jour en temps réel
            </span>
          </motion.div>

          <div className='space-y-2'>
            <motion.h1
              className='bg-gradient-to-b from-white to-[#8888A0] bg-clip-text font-display text-4xl font-black leading-[1.1] tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl'
              style={{ letterSpacing: '-0.02em' }}
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: LANDING_EASE, delay: 0.05 }}
            >
              Préparez l&apos;examen OPJ
              <br />
              <span className='text-white'>avec la formation réelle.</span>
            </motion.h1>
          </div>

          <motion.p
            className='mt-8 max-w-xl text-base leading-relaxed text-examen-inkMuted md:text-lg'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.12 }}
          >
            Ce site retranscrit la formation OPJ en présentiel au fil des cours. Enquêtes types, PV conformes aux
            fascicules, articulation, infractions — exactement ce que l&apos;examen demande, par quelqu&apos;un qui le
            prépare.
          </motion.p>

          <motion.div
            className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.2 }}
          >
            <MotionLink
              href='/signup'
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg bg-examen-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-examen-accent/25 transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50',
                !shouldReduce && 'hover:-translate-y-0.5 hover:bg-examen-accentHover hover:shadow-ex-card-hover',
              )}
              whileTap={{ scale: 0.96 }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Commencer gratuitement
              <ArrowRight className='size-4' aria-hidden />
            </MotionLink>
          </motion.div>

          <motion.p
            className='mt-6 text-sm text-examen-inkMuted'
            initial={MOTION_INITIAL_FOR_SEO}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.28 }}
          >
            <span className='text-examen-success'>✓</span> Sans carte bancaire{' '}
            <span className='mx-2 text-white/20'>·</span>{' '}
            <span className='text-examen-success'>✓</span> Accès immédiat{' '}
            <span className='mx-2 text-white/20'>·</span>{' '}
            <span className='text-examen-success'>✓</span> Session 2026
          </motion.p>
        </div>

        <motion.div
          className='relative mx-auto hidden w-full max-w-md lg:block'
          initial={MOTION_INITIAL_FOR_SEO}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LANDING_EASE, delay: 0.2 }}
        >
          <div
            className='pointer-events-none absolute inset-0 -z-10 scale-110 bg-[radial-gradient(circle_at_center,rgba(79,110,247,0.22),transparent_65%)]'
            aria-hidden
          />
          <div className={cn('will-change-transform', !shouldReduce && 'animate-ex-float')}>
            <div className='mb-4 rounded-[12px] border border-white/[0.06] bg-white/[0.03] px-4 py-4 backdrop-blur-sm'>
              <div className='grid grid-cols-2 gap-4'>
                <AnimatedStat finalValue={15} suffix='' label='Fascicules officiels' />
                <AnimatedStat finalValue={150} suffix='+' label='Infractions détaillées' />
                <AnimatedStat finalValue={3} suffix='' label='Épreuves couvertes' />
                <AnimatedStat finalValue={400} suffix='+' label='Questions de quiz' />
              </div>
            </div>
            <div className='rounded-[12px] border border-white/[0.08] bg-[#16161F]/90 p-6 shadow-ex-card backdrop-blur-sm'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-examen-accent/15 text-examen-accent'>
                  <HelpCircle className='h-5 w-5' aria-hidden />
                </div>
                <div>
                  <p className='text-xs font-mono-label font-medium uppercase tracking-wide text-examen-inkMuted'>
                    Quiz express
                  </p>
                  <p className='text-sm font-semibold text-white'>Qualification — vol simple</p>
                </div>
              </div>
              <p className='text-sm leading-relaxed text-examen-inkMuted'>
                Les conditions d&apos;une soustraction frauduleuse sont réunies lorsque…
              </p>
              <ul className='mt-4 space-y-2' aria-label='Propositions de réponse'>
                {(
                  [
                    { l: 'A', t: 'Le bien a une valeur inférieure à 300 €', ok: false },
                    { l: 'B', t: 'Le prévenu agit sans violence et sans contrainte', ok: true },
                    { l: 'C', t: 'Le vol est commis avec effraction', ok: false },
                    { l: 'D', t: 'La victime est nécessairement un ascendant', ok: false },
                  ] as const
                ).map((row) => (
                  <motion.li
                    key={row.l}
                    onClick={() => {
                      setSelectedOption(row.l);
                      if (!row.ok) {
                        setShakeOption(row.l);
                        window.setTimeout(() => setShakeOption(null), 380);
                      }
                    }}
                    animate={
                      shouldReduce || selectedOption !== row.l
                        ? {}
                        : row.ok
                          ? { backgroundColor: ['#ffffff', '#D1FAE5', '#F0FDF4'], scale: [1, 1.015, 1] }
                          : shakeOption === row.l
                            ? { x: [0, -7, 7, -5, 5, -3, 3, 0] }
                            : {}
                    }
                    transition={
                      shouldReduce || selectedOption !== row.l
                        ? undefined
                        : row.ok
                          ? { duration: 0.45 }
                          : { duration: 0.38 }
                    }
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition',
                      row.ok
                        ? 'border-examen-success/40 bg-examen-success/15 text-examen-ink'
                        : 'border-white/[0.06] bg-white/[0.02] text-examen-inkMuted',
                    )}
                  >
                    <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] font-mono-label text-xs font-semibold text-white'>
                      {row.l}
                    </span>
                    <span>{row.t}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
