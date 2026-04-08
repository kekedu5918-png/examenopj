'use client';

import { motion } from 'framer-motion';

import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const enquiries = [
  { code: 'Alpha', name: 'Vol et atteinte aux biens', theme: 'Enquête patrimoniale de base', badge: 'Biens' },
  { code: 'Bravo', name: 'Violences volontaires, changement de cadre', theme: 'Qualifications et cadres procéduraux', badge: 'Personnes' },
  { code: 'Charlie', name: 'Agression sexuelle, commission rogatoire', theme: 'Infractions sexuelles & coopération', badge: 'Sexuel' },
  { code: 'Delta', name: "Contrôle d'identité, outrage, rébellion, faux", theme: 'Atteintes aux autorités', badge: 'Ordre public' },
  { code: 'Echo', name: 'Trafic de stupéfiants, criminalité organisée', theme: 'Enquêtes spécialisées', badge: 'Stupéfiants' },
  { code: 'Foxtrot', name: 'Découverte de cadavre, armes et munitions', theme: 'Scène et investigations techniques', badge: 'Scène' },
  { code: 'Golf', name: 'Enlèvement, séquestration, dégradations', theme: 'Atteintes graves aux personnes', badge: 'Grave' },
  { code: 'India', name: "Non-représentation d'enfant, atteintes aux mineurs", theme: "Protection de l'enfance", badge: 'Mineurs' },
  { code: 'Accident', name: 'AVP, piéton blessé, délit de fuite', theme: 'Accidentologie routière', badge: 'Route' },
  { code: 'Patrimoniale', name: 'Sensibilisation, infractions patrimoniales', theme: 'Approche transversale', badge: 'Synthèse' },
] as const;

export function TimelineSection() {
  return (
    <section className='px-6 py-24'>
      <div className='mx-auto max-w-3xl'>
        <SectionTitle
          badge='FORMATION'
          badgeClassName='bg-cyan-500/20 text-cyan-300'
          title='Programme par enquête'
          subtitle='Dix thèmes d’enquête types pour structurer la révision'
          className='mx-auto mb-16 max-w-xl text-center'
        />

        <div className='relative'>
          <div
            className='absolute bottom-0 left-[22px] top-0 w-px bg-gradient-to-b from-blue-500/50 via-gold-400/50 to-emerald-500/50 md:left-1/2 md:-translate-x-1/2'
            aria-hidden
          />

          <ul className='space-y-0'>
            {enquiries.map((item, i) => (
              <li key={item.code} className='relative grid grid-cols-1 pb-14 last:pb-0 md:grid-cols-2 md:gap-x-12'>
                <div
                  className='absolute left-[22px] top-7 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-navy-950 text-[11px] font-bold uppercase tracking-tight text-cyan-200 shadow-[0_0_20px_rgba(0,0,0,0.35)] md:left-1/2 md:top-9'
                  aria-hidden
                >
                  {item.code.slice(0, 2)}
                </div>

                {i % 2 === 0 ? (
                  <>
                    <motion.div
                      className='pl-14 md:col-span-1 md:pr-10 md:text-right'
                      initial={MOTION_INITIAL_FOR_SEO}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, ease: LANDING_EASE, delay: (i % 5) * 0.05 }}
                    >
                      <div className='rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-left md:inline-block md:max-w-md md:text-right'>
                        <p className='font-bold text-examen-ink'>
                          {item.code} — {item.name}
                        </p>
                        <p className='mt-1 text-sm text-examen-inkMuted'>{item.theme}</p>
                        <span className='mt-3 inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs text-examen-inkMuted'>
                          {item.badge}
                        </span>
                      </div>
                    </motion.div>
                    <div className='hidden md:block' aria-hidden />
                  </>
                ) : (
                  <>
                    <div className='hidden md:block' aria-hidden />
                    <motion.div
                      className={cn('pl-14 md:col-span-1 md:col-start-2 md:pl-10')}
                      initial={MOTION_INITIAL_FOR_SEO}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, ease: LANDING_EASE, delay: (i % 5) * 0.05 }}
                    >
                      <div className='rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 md:max-w-md'>
                        <p className='font-bold text-examen-ink'>
                          {item.code} — {item.name}
                        </p>
                        <p className='mt-1 text-sm text-examen-inkMuted'>{item.theme}</p>
                        <span className='mt-3 inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs text-examen-inkMuted'>
                          {item.badge}
                        </span>
                      </div>
                    </motion.div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
