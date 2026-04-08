'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

const cards = [
  {
    emoji: '📋',
    title: '107 fiches structurées',
    text: "Accroche, repères, pièges d'examen et à retenir — 6 fiches accessibles sans compte.",
  },
  {
    emoji: '⚡',
    title: 'Quiz QCM + mode Hardcore',
    text: "5 questions par jour en accès gratuit. Le mode Hardcore simule l'écrit et l'oral.",
  },
  {
    emoji: '🗓️',
    title: 'Parcours en 7 étapes',
    text: "Une checklist guidée de maintenant jusqu'au 11 juin, sauvegardée dans votre navigateur.",
  },
] as const;

export function FreeValueSection() {
  return (
    <section
      className='relative border-t border-white/[0.06] bg-examen-canvas py-20 md:py-24'
      aria-labelledby='valeur-gratuite-titre'
    >
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle
          titleId='valeur-gratuite-titre'
          badge='GRATUIT'
          badgeClassName='bg-emerald-500/20 text-emerald-200'
          title='Commencez gratuitement, sans carte bancaire'
          className='mx-auto mb-12 max-w-2xl text-center'
        />

        <div className='grid gap-5 md:grid-cols-3'>
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={MOTION_INITIAL_FOR_SEO}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: LANDING_EASE, delay: i * 0.06 }}
            >
              <GlassCard hover padding='p-6' className='h-full border-white/10'>
                <span className='text-2xl' aria-hidden>
                  {c.emoji}
                </span>
                <h3 className='mt-4 font-display text-lg font-bold text-white'>{c.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-examen-inkMuted'>{c.text}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          className='mx-auto mt-12 max-w-2xl text-center text-sm text-examen-inkMuted'
          initial={MOTION_INITIAL_FOR_SEO}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: LANDING_EASE, delay: 0.15 }}
        >
          Accès complet : quiz illimités, 107 fiches, épreuves blanches →{' '}
          <Link href='/pricing' className='font-semibold text-examen-accent underline-offset-2 hover:underline'>
            Voir les offres
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
