'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Brain, Scale, ScrollText } from 'lucide-react';

import { AnimatedStat } from '@/components/home/AnimatedStat';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';

const icons = [BookOpen, Scale, ScrollText, Brain] as const;

export function HomeStatsSection() {
  const shouldReduce = useReducedMotion();
  const stats = [
    { finalValue: 15, suffix: '' as const, label: 'Fascicules officiels', Icon: icons[0] },
    { finalValue: 55, suffix: '+' as const, label: 'Infractions détaillées', Icon: icons[1] },
    { finalValue: 3, suffix: '' as const, label: 'Épreuves couvertes', Icon: icons[2] },
    { finalValue: 200, suffix: '+' as const, label: 'Questions de quiz', Icon: icons[3] },
  ] as const;

  return (
    <section
      className='border-y border-white/[0.06] bg-white/[0.02] py-14 md:py-16'
      aria-labelledby='home-stats-title'
    >
      <div className='mx-auto max-w-6xl px-4'>
        <h2 id='home-stats-title' className='sr-only'>
          Chiffres clés de la préparation
        </h2>
        <motion.div
          initial={shouldReduce ? {} : MOTION_INITIAL_FOR_SEO}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: LANDING_EASE }}
          className='grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8'
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className='flex flex-col items-center text-center md:flex-row md:items-start md:text-left'
            >
              <span className='mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-blue-400 md:mb-0 md:mr-4'>
                <s.Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden />
              </span>
              <div className='min-w-0'>
                <AnimatedStat
                  finalValue={s.finalValue}
                  suffix={s.suffix}
                  label={s.label}
                  animateOnMount
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
