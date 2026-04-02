'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { ArticulationTableExample } from '@/components/epreuves/epreuve-2/articulation-table-example';
import { PVCartouchesSection } from '@/components/epreuves/epreuve-2/pv-cartouches-section';
import { RapportSyntheseSchema } from '@/components/epreuves/epreuve-2/rapport-synthese-blocks';
import { LANDING_EASE } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

const ease = [...LANDING_EASE] as [number, number, number, number];

const sectionMotion = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.55, ease },
};

export function Epreuve2Sections() {
  return (
    <div className='mx-auto max-w-4xl space-y-24 px-6 pb-24'>
      <motion.section id='articulation' className='scroll-mt-28 space-y-10' {...sectionMotion}>
        <SectionTitle
          badge='PARTIE I'
          badgeClassName='bg-blue-500/20 text-blue-300'
          title="L'articulation de procédure"
          className='mb-2'
        />

        <div className='space-y-6'>
          <div>
            <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400'>Définition</h3>
            <GlassCard padding='p-6' className='space-y-4'>
              <p className='leading-relaxed text-gray-300'>
                L&apos;articulation de procédure correspond à une liste chronologique des divers procès-verbaux
                pouvant être établis lors du déroulement d&apos;une enquête. Elle permet de visualiser tous les actes
                d&apos;investigation devant être réalisés à partir d&apos;un thème donné.
              </p>
              <p className='leading-relaxed text-gray-300'>
                Par cet exercice, le candidat doit montrer qu&apos;il a compris le cheminement d&apos;une procédure.
                Il doit également présenter une logique d&apos;enquête en lien avec le thème en identifiant les
                éléments importants.
              </p>
            </GlassCard>
          </div>

          <div>
            <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400'>Forme</h3>
            <GlassCard padding='p-6' className='space-y-4'>
              <p className='leading-relaxed text-gray-300'>
                Elle se présente sous la forme d&apos;un tableau à deux colonnes. Un procès-verbal correspond aux
                éléments contenus dans les deux colonnes. Il est séparé du prochain PV par un trait horizontal.
              </p>
              <p className='leading-relaxed text-gray-300'>
                L&apos;articulation de procédure débute au premier procès-verbal et se termine au dernier.
              </p>
              <div className='rounded-xl border border-amber-500/20 bg-amber-500/5 p-4'>
                <p className='text-sm font-semibold text-amber-200'>
                  Tous les procès-verbaux importants doivent être répertoriés.
                </p>
              </div>
            </GlassCard>
          </div>

          <div>
            <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400'>
              Exemple visuel
            </h3>
            <ArticulationTableExample />
          </div>

          <div>
            <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400'>Organisation</h3>
            <div className='grid gap-4 md:grid-cols-3'>
              <GlassCard padding='p-5'>
                <p className='mb-2 text-xs font-bold uppercase tracking-wide text-white'>En gras</p>
                <p className='text-sm text-gray-400'>
                  Les mentions devant apparaître en l&apos;état dans les cartouches.
                </p>
              </GlassCard>
              <GlassCard padding='p-5'>
                <p className='mb-2 text-xs font-bold uppercase italic text-blue-400'>En italique</p>
                <p className='text-sm text-gray-400'>
                  Les éléments devant apparaître en lien avec le thème.
                </p>
              </GlassCard>
              <GlassCard padding='p-5'>
                <p className='mb-2 text-xs font-bold uppercase tracking-wide text-white'>Mode télégraphique</p>
                <p className='text-sm text-gray-400'>Le mode télégraphique est accepté.</p>
              </GlassCard>
            </div>
            <div className='mt-6 space-y-3'>
              <GlassCard className='border-amber-500/20 bg-amber-500/5' padding='p-4'>
                <p className='text-sm text-gray-300'>
                  Lorsque la rédaction du PV est demandée, la mention « PV rédigé intégralement » sera inscrite.
                </p>
              </GlassCard>
              <GlassCard className='border-amber-500/20 bg-amber-500/5' padding='p-4'>
                <p className='text-sm text-gray-300'>
                  Dans le cas d&apos;une extension de compétence, le numéro de l&apos;article de référence devra
                  être visé pour tous les actes (ex. : art. 18 alinéa 3).
                </p>
              </GlassCard>
              <GlassCard className='border-amber-500/20 bg-amber-500/5' padding='p-4'>
                <p className='text-sm text-gray-300'>
                  Si un changement de cadre juridique intervient dans le thème, le faire apparaître au moment le plus
                  approprié.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id='cartouches' className='scroll-mt-28 space-y-8' {...sectionMotion}>
        <SectionTitle
          badge='PARTIE II'
          badgeClassName='bg-blue-500/20 text-blue-300'
          title='Les cartouches de procès-verbaux'
          subtitle='Tous les types de PV — Cliquez sur une catégorie puis sur un PV pour voir le cartouche'
          className='mb-2'
        />
        <PVCartouchesSection />
      </motion.section>

      <motion.section id='synthese' className='scroll-mt-28 space-y-6' {...sectionMotion}>
        <SectionTitle
          badge='PARTIE III'
          badgeClassName='bg-blue-500/20 text-blue-300'
          title='Le rapport de synthèse'
          className='mb-2'
        />
        <GlassCard padding='p-6' className='mb-6'>
          <p className='leading-relaxed text-gray-300'>
            Le rapport de synthèse est un document récapitulatif de l&apos;ensemble de la procédure, destiné au
            magistrat. Il doit être clair, structuré et synthétique.
          </p>
        </GlassCard>
        <RapportSyntheseSchema />
      </motion.section>

      <motion.section id='navigation' className='scroll-mt-28 space-y-6' {...sectionMotion}>
        <SectionTitle
          badge='SUITE'
          badgeClassName='bg-blue-500/20 text-blue-300'
          title='Continuer la préparation'
          subtitle='Autres épreuves du concours'
          className='mb-2'
        />
        <div className='grid gap-4 sm:grid-cols-2'>
          <Link
            href='/epreuves/epreuve-1'
            className='group rounded-2xl border-2 border-red-500/35 bg-white/[0.02] p-6 transition-colors hover:border-red-500/55 hover:bg-red-500/[0.06]'
          >
            <p className='font-display text-lg font-semibold text-red-300 group-hover:text-red-200'>
              Épreuve 1 — DPG / DPS
            </p>
            <p className='mt-2 text-sm text-gray-500 group-hover:text-gray-400'>Droit pénal général et spécial</p>
          </Link>
          <Link
            href='/epreuves/epreuve-3'
            className='group rounded-2xl border-2 border-emerald-500/35 bg-white/[0.02] p-6 transition-colors hover:border-emerald-500/55 hover:bg-emerald-500/[0.06]'
          >
            <p className='font-display text-lg font-semibold text-emerald-300 group-hover:text-emerald-200'>
              Épreuve 3 — Oral (CR Parquet)
            </p>
            <p className='mt-2 text-sm text-gray-500 group-hover:text-gray-400'>Compte rendu téléphonique</p>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
