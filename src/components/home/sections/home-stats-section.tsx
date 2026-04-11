'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Brain, Scale, ScrollText } from 'lucide-react';

import { AnimatedStat } from '@/components/home/AnimatedStat';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';

const icons = [BookOpen, Scale, ScrollText, Brain] as const;

export function HomeStatsSection() {
  const shouldReduce = useReducedMotion();
  const stats = [
    {
      finalValue: 15,
      suffix: '' as const,
      label: 'Fascicules officiels',
      sublabel: 'SDCP complets',
      Icon: icons[0],
      color: 'from-blue-500 to-cyan-400',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      finalValue: 55,
      suffix: '+' as const,
      label: 'Infractions détaillées',
      sublabel: 'éléments constitutifs',
      Icon: icons[1],
      color: 'from-violet-500 to-purple-400',
      iconBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    },
    {
      finalValue: 3,
      suffix: '' as const,
      label: 'Épreuves couvertes',
      sublabel: 'écrit · dossier · oral',
      Icon: icons[2],
      color: 'from-emerald-500 to-teal-400',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      finalValue: 200,
      suffix: '+' as const,
      label: 'Questions de quiz',
      sublabel: 'avec correction détaillée',
      Icon: icons[3],
      color: 'from-amber-500 to-orange-400',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ] as const;

  return (
    <section
      className='relative overflow-hidden border-y border-white/[0.06] py-14 md:py-16'
      aria-labelledby='home-stats-title'
    >
      {/* Fond légèrement différent pour contraste section */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0C1525] to-[#080F1E]' aria-hidden />

      <div className='relative mx-auto max-w-6xl px-4'>
        <h2 id='home-stats-title' className='sr-only'>Chiffres clés de la préparation</h2>

        <motion.div
          initial={shouldReduce ? {} : MOTION_INITIAL_FOR_SEO}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: LANDING_EASE }}
          className='grid grid-cols-2 gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:grid-cols-4 md:gap-5 md:p-6'
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: LANDING_EASE }}
              className='group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]'
            >
              {/* Bord supérieur coloré */}
              <span
                className={`pointer-events-none absolute left-3 right-3 top-0 h-[2px] rounded-full bg-gradient-to-r ${s.color} opacity-70`}
                aria-hidden
              />

              {/* Icône */}
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${s.iconBg}`}>
                <s.Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden />
              </span>

              {/* Chiffre + label */}
              <div>
                <AnimatedStat finalValue={s.finalValue} suffix={s.suffix} label={s.label} />
                <p className='mt-1 text-[11px] font-medium text-slate-600'>{s.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
