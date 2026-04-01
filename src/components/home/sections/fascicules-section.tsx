'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { LANDING_EASE } from '@/components/home/motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const dps = [
  { code: 'F03', title: 'Atteintes aux personnes', pages: 186 },
  { code: 'F04', title: 'Violences & atteintes sexuelles', pages: 142 },
  { code: 'F05', title: 'Atteintes aux biens', pages: 164 },
  { code: 'F06', title: 'Stupéfiants & armes', pages: 128 },
  { code: 'F07', title: 'Infractions économiques & diverses', pages: 156 },
];

const dpg = [
  { code: 'F09', title: 'Principes du droit pénal général', pages: 98 },
  { code: 'F10', title: 'Peines & application', pages: 112 },
];

const proc = [
  { code: 'F12', title: 'Enquête préliminaire & flagrance', pages: 204 },
  { code: 'F13', title: 'Garde à vue & auditions', pages: 176 },
  { code: 'F14', title: 'Synthèse & rédaction', pages: 88 },
  { code: 'F15', title: 'Procédures spécialisées', pages: 134 },
];

function Column({
  heading,
  headingBadgeClass,
  items,
  circleClass,
  delayBase,
}: {
  heading: string;
  headingBadgeClass: string;
  items: { code: string; title: string; pages: number }[];
  circleClass: string;
  delayBase: number;
}) {
  return (
    <div>
      <span
        className={cn(
          'mb-6 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
          headingBadgeClass
        )}
      >
        {heading}
      </span>
      <ul className='space-y-3'>
        {items.map((item, i) => (
          <motion.li
            key={item.code}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, ease: LANDING_EASE, delay: delayBase + i * 0.05 }}
            className='group will-change-transform'
          >
            <div className='flex cursor-default items-start gap-3 rounded-xl py-2 transition-transform duration-300 group-hover:translate-x-1'>
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
                  circleClass
                )}
              >
                {item.code.replace('F', '')}
              </span>
              <div className='min-w-0 flex-1'>
                <p className='font-medium text-gray-100'>
                  <span className='text-gray-500'>{item.code}</span> — {item.title}
                </p>
                <p className='text-sm text-gray-500'>{item.pages} p.</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function FasciculesSection() {
  return (
    <section className='px-6 py-24'>
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          badge='PROGRAMME'
          badgeClassName='bg-violet-500/20 text-violet-300'
          title='11 fascicules officiels'
          subtitle="Le programme complet de l'Académie de Police — Version 01/12/2025"
          className='mx-auto mb-16 max-w-2xl text-center'
        />

        <div className='grid gap-12 md:grid-cols-3'>
          <Column
            heading='Droit pénal spécial'
            headingBadgeClass='bg-red-500/15 text-red-300'
            items={dps}
            circleClass='bg-red-500/80'
            delayBase={0}
          />
          <Column
            heading='Droit pénal général'
            headingBadgeClass='bg-violet-500/15 text-violet-300'
            items={dpg}
            circleClass='bg-violet-600/80'
            delayBase={0.1}
          />
          <Column
            heading='Procédure pénale'
            headingBadgeClass='bg-blue-500/15 text-blue-300'
            items={proc}
            circleClass='bg-blue-600/80'
            delayBase={0.2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: LANDING_EASE }}
          className='mx-auto mt-14 max-w-2xl rounded-2xl border border-gold-400/25 bg-gradient-to-br from-gold-400/5 to-transparent p-6 text-center'
        >
          <span className='mb-2 inline-block rounded-full border border-gold-400/40 bg-gold-400/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-gold-400'>
            MAJ
          </span>
          <p className='font-display text-lg font-semibold text-gray-100'>Cahier de mise à jour</p>
          <p className='mt-1 text-sm text-gray-400'>Juillet → Décembre 2025</p>
        </motion.div>

        <motion.div
          className='mt-12 flex justify-center'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.1 }}
        >
          <Link
            href='/fascicules'
            className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-gray-100 transition-all hover:border-white/20 hover:bg-white/10'
          >
            Explorer tous les fascicules →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
