'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import type { FasciculeHomeGroup } from '@/components/home/home-fascicule-types';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import type { Domain } from '@/data/fascicules-types';
import { useReadModuleIds } from '@/hooks/use-read-module-ids';
import { cn } from '@/utils/cn';
import { getModuleNumGradient } from '@/utils/module-gradients';

const DOMAIN_COLUMN_STYLES: Record<Domain, { headingBadgeClass: string }> = {
  DPS: { headingBadgeClass: 'bg-red-500/15 text-red-300' },
  DPG: { headingBadgeClass: 'bg-violet-500/15 text-violet-300' },
  PROCEDURE: { headingBadgeClass: 'bg-blue-500/15 text-blue-300' },
};

function Column({
  group,
  delayBase,
  readIds,
}: {
  group: FasciculeHomeGroup;
  delayBase: number;
  readIds: ReadonlySet<string>;
}) {
  const styles = DOMAIN_COLUMN_STYLES[group.domain];
  return (
    <div>
      <span
        className={cn(
          'mb-6 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
          styles.headingBadgeClass,
        )}
      >
        {group.label}
      </span>
      <ul className='space-y-3'>
        {group.items.map((item, i) => (
          <motion.li
            key={item.id}
            initial={MOTION_INITIAL_FOR_SEO}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, ease: LANDING_EASE, delay: delayBase + i * 0.05 }}
            className='group will-change-transform'
          >
            <Link
              href={`/cours/modules/${item.id}`}
              className='group flex items-start gap-3 rounded-xl py-2 transition duration-200 hover:-translate-y-0.5 hover:shadow-ex-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-examen-accent/50'
            >
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-black text-white shadow-md',
                  getModuleNumGradient(item.num),
                )}
                aria-hidden
              >
                {String(item.num).padStart(2, '0')}
              </span>
              <div className='min-w-0 flex-1 text-left'>
                <p className='font-medium text-examen-ink'>
                  <span className='text-examen-inkMuted'>F{String(item.num).padStart(2, '0')}</span> — {item.title}
                </p>
                <p
                  className={cn(
                    'text-sm',
                    readIds.has(item.id) ? 'font-medium text-examen-success' : 'text-examen-inkMuted',
                  )}
                >
                  {readIds.has(item.id) ? '✓ Lu' : 'Fiche synthèse'}
                </p>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

type FasciculesSectionProps = {
  groups: FasciculeHomeGroup[];
  cahier: { titre: string; periode: string };
  fasciculeCount: number;
};

export function FasciculesSection({ groups, cahier, fasciculeCount }: FasciculesSectionProps) {
  const readIds = useReadModuleIds();
  return (
    <section id='programme-cours' className='scroll-mt-28 px-6 py-24'>
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          badge='PROGRAMME'
          badgeClassName='bg-violet-500/20 text-violet-300'
          title={`${fasciculeCount} modules thématiques`}
          subtitle='Programme de préparation : titres de référence et fiches de cours rédactionnelles (à compléter avec les codes et votre formation).'
          className='mx-auto mb-16 max-w-2xl text-center'
        />

        <div className='grid gap-12 md:grid-cols-3'>
          {groups.map((group, idx) => (
            <Column key={group.domain} group={group} delayBase={idx * 0.1} readIds={readIds} />
          ))}
        </div>

        <motion.div
          initial={MOTION_INITIAL_FOR_SEO}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: LANDING_EASE }}
          className='mx-auto mt-14 max-w-2xl rounded-2xl border border-gold-400/25 bg-gradient-to-br from-gold-400/5 to-transparent p-6 text-center'
        >
          <span className='mb-2 inline-block rounded-full border border-gold-400/40 bg-gold-400/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-gold-400'>
            MAJ
          </span>
          <p className='font-display text-lg font-semibold text-examen-ink'>{cahier.titre}</p>
          <p className='mt-1 text-sm text-examen-inkMuted'>{cahier.periode}</p>
        </motion.div>

        <motion.div
          className='mt-12 flex justify-center'
          initial={MOTION_INITIAL_FOR_SEO}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: LANDING_EASE, delay: 0.1 }}
        >
          <Link
            href='/cours/modules'
            className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-examen-ink transition-all hover:border-white/20 hover:bg-white/10'
          >
            Voir tous les modules de cours →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
