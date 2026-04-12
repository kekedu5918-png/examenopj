'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Compass, GraduationCap, Sparkles, Target } from 'lucide-react';

import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { cn } from '@/utils/cn';

const STEPS = [
  {
    step: 1,
    label: 'Cadre',
    hint: 'Épreuves & coefficients',
    href: '/epreuves',
    Icon: Compass,
    accent: 'from-sky-500 to-blue-600',
  },
  {
    step: 2,
    label: 'Fond',
    hint: 'Fiches & fascicules',
    href: '/fondamentaux',
    Icon: GraduationCap,
    accent: 'from-violet-500 to-indigo-600',
  },
  {
    step: 3,
    label: 'Pratique',
    hint: 'Quiz & flashcards',
    href: '/quiz',
    Icon: Target,
    accent: 'from-amber-500 to-orange-600',
  },
  {
    step: 4,
    label: 'Méthode',
    hint: 'Plan de révision',
    href: '/entrainement',
    Icon: Sparkles,
    accent: 'from-emerald-500 to-teal-600',
  },
] as const;

export function HomeJourneyStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      className='relative border-y border-white/[0.06] bg-gradient-to-b from-[color:var(--ex-canvas)] via-[color:var(--ex-deep)] to-[color:var(--ex-canvas)] py-10 md:py-12'
      aria-labelledby='journey-strip-title'
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.35]'
        style={{
          backgroundImage:
            'radial-gradient(ellipse 90% 50% at 50% -20%, rgba(59,130,246,0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(124,58,237,0.08), transparent)',
        }}
        aria-hidden
      />

      <div className='relative mx-auto max-w-6xl px-4'>
        <div className='mb-8 text-center'>
          <p id='journey-strip-title' className='font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-500'>
            Parcours type référence
          </p>
          <p className='mt-2 font-sans text-lg font-semibold text-white md:text-xl'>
            Quatre étapes, une ligne claire — du cadre officiel à la méthode de révision.
          </p>
        </div>

        {/* Desktop: horizontal path */}
        <div className='hidden md:block'>
          <div className='relative flex items-start justify-between gap-2'>
            {/* Connector line */}
            <div
              className='pointer-events-none absolute left-[10%] right-[10%] top-[28px] h-[2px] bg-gradient-to-r from-blue-500/20 via-violet-500/30 to-emerald-500/20'
              aria-hidden
            />
            {STEPS.map((s, i) => (
              <motion.div
                key={s.href}
                className='relative z-[1] flex flex-1 flex-col items-center text-center'
                initial={reduce ? {} : MOTION_INITIAL_FOR_SEO}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  href={s.href}
                  className={cn(
                    'group flex flex-col items-center rounded-2xl p-2 transition-transform duration-200',
                    !reduce && 'hover:scale-[1.03]',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-lg shadow-black/30 ring-2 ring-white/[0.06] transition-all duration-300',
                      'bg-gradient-to-br',
                      s.accent,
                      'group-hover:ring-white/20 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]',
                    )}
                  >
                    <s.Icon className='h-6 w-6 text-white drop-shadow-md' strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className='mt-3 font-sans text-sm font-bold text-white'>{s.label}</span>
                  <span className='mt-0.5 max-w-[140px] text-xs leading-snug text-slate-500'>{s.hint}</span>
                  <span className='mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400/90 opacity-0 transition-opacity group-hover:opacity-100'>
                    Ouvrir
                    <CheckCircle2 className='h-3 w-3' aria-hidden />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <ul className='grid gap-3 md:hidden'>
          {STEPS.map((s, i) => (
            <motion.li
              key={s.href}
              initial={reduce ? {} : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={s.href}
                className='flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 transition-colors active:bg-white/[0.06]'
              >
                <span
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md',
                    s.accent,
                  )}
                >
                  <s.Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden />
                </span>
                <div className='min-w-0 flex-1 text-left'>
                  <p className='font-sans text-sm font-bold text-white'>
                    <span className='mr-2 font-mono text-xs text-slate-500'>{s.step}.</span>
                    {s.label}
                  </p>
                  <p className='text-xs text-slate-500'>{s.hint}</p>
                </div>
                <span className='shrink-0 text-slate-600' aria-hidden>
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
