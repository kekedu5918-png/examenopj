'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileCheck, FileEdit, Mic } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const cards = [
  {
    href: '/epreuves/epreuve-1',
    stripe: 'from-red-500 to-orange-500',
    icon: FileEdit,
    iconClass: 'text-red-400',
    iconBg: 'bg-red-500/10',
    num: '01',
    title: 'DPG / DPS',
    description:
      'Droit Pénal Général & Spécial — Identifier les infractions, démontrer les éléments constitutifs, qualifier et classer',
    tags: ['3h', 'Coef. 2', '/20'],
    tagClass: 'bg-red-500/10 text-red-400',
    hoverBorder: 'hover:border-red-500/30',
    hoverShadow: 'hover:shadow-[0_0_40px_rgba(239,68,68,0.08)]',
  },
  {
    href: '/epreuves/epreuve-2',
    stripe: 'from-blue-500 to-cyan-500',
    icon: FileCheck,
    iconClass: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    num: '02',
    title: 'PROCÉDURE PÉNALE',
    description:
      'Articulation de procédure, rédaction de PV avec cartouches obligatoires, rapport de synthèse',
    tags: ['Écrit', 'PV', 'Synthèse'],
    tagClass: 'bg-blue-500/10 text-blue-400',
    hoverBorder: 'hover:border-blue-500/30',
    hoverShadow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]',
  },
  {
    href: '/epreuves/epreuve-3',
    stripe: 'from-emerald-500 to-green-500',
    icon: Mic,
    iconClass: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    num: '03',
    title: 'ORAL — CR PARQUET',
    description:
      'Compte rendu téléphonique au parquet — Chapeau introductif, déroulé circonstancié, suites judiciaires',
    tags: ['Oral', 'Parquet', 'Questions'],
    tagClass: 'bg-emerald-500/10 text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/30',
    hoverShadow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]',
  },
] as const;

export function EpreuvesSection() {
  return (
    <section className='px-6 py-24'>
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          badge='EXAMENS'
          badgeClassName='bg-red-500/20 text-red-300'
          title={"Les 3 épreuves de l'examen"}
          subtitle='Maîtrisez la méthodologie de chaque épreuve'
          className='mx-auto mb-14 max-w-2xl text-center'
        />

        <div className='grid gap-6 md:grid-cols-3'>
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: LANDING_EASE, delay: i * 0.1 }}
              className='will-change-transform'
            >
              <Link
                href={card.href}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300',
                  card.hoverBorder,
                  card.hoverShadow
                )}
              >
                <div className={cn('absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r', card.stripe)} />
                <span
                  className='pointer-events-none absolute right-4 top-4 font-display text-6xl font-bold text-white/[0.05]'
                  aria-hidden
                >
                  {card.num}
                </span>
                <div className={cn('mb-4 mt-2 inline-flex rounded-xl p-3', card.iconBg)}>
                  <card.icon className={cn('h-10 w-10', card.iconClass)} strokeWidth={1.5} />
                </div>
                <h3 className='text-xl font-bold text-gray-100'>{card.title}</h3>
                <p className='mt-3 flex-1 text-sm leading-relaxed text-gray-400'>{card.description}</p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {card.tags.map((t) => (
                    <span key={t} className={cn('rounded-md px-2 py-0.5 text-xs font-medium', card.tagClass)}>
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowRight className='absolute bottom-6 right-6 h-5 w-5 text-gray-500 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-gray-300' />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
