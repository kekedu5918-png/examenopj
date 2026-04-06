'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { ArticulationTableExample } from '@/components/epreuves/epreuve-2/articulation-table-example';
import { PVCartouchesSection, type PVTabValue } from '@/components/epreuves/epreuve-2/pv-cartouches-section';
import { RapportSyntheseSchema } from '@/components/epreuves/epreuve-2/rapport-synthese-blocks';
import { LANDING_EASE } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import type { SectionAccordionItem } from '@/components/ui/section-accordion';
import { SectionAccordion } from '@/components/ui/section-accordion';

const ease = [...LANDING_EASE] as [number, number, number, number];

const sectionMotion = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.55, ease },
};

const cartoucheSections: { id: string; trigger: string; badge: string; lock: PVTabValue }[] = [
  { id: 'cart-saisines', trigger: 'Cartouches — Saisines et plaintes', badge: '3 PV', lock: 'saisines' },
  { id: 'cart-gav', trigger: 'Cartouches — Garde à vue', badge: '5 PV', lock: 'gav' },
  {
    id: 'cart-prolongation',
    trigger: 'Cartouches — Prolongation et fin de GAV',
    badge: '4 PV',
    lock: 'prolongation',
  },
  { id: 'cart-avis', trigger: 'Cartouches — Avis obligatoires', badge: '6 PV', lock: 'avis' },
  { id: 'cart-interpellations', trigger: 'Cartouches — Interpellations', badge: '4 PV', lock: 'interpellations' },
  {
    id: 'cart-constatations',
    trigger: 'Cartouches — Constatations et transport',
    badge: '5 PV',
    lock: 'constatations',
  },
  { id: 'cart-fouilles', trigger: 'Cartouches — Fouilles et perquisitions', badge: '6 PV', lock: 'fouilles' },
  { id: 'cart-auditions', trigger: 'Cartouches — Auditions et confrontations', badge: '8 PV', lock: 'auditions' },
  {
    id: 'cart-techniques',
    trigger: 'Cartouches — PV techniques et réquisitions',
    badge: '5 PV',
    lock: 'techniques',
  },
  { id: 'cart-divers', trigger: 'Cartouches — Divers et clôture', badge: '4 PV', lock: 'divers' },
];

export function Epreuve2Sections() {
  const articulationDef: SectionAccordionItem = {
    id: 'articulation-def',
    trigger: "L'articulation de procédure — Définition et forme",
    badge: '/10',
    badgeColor: 'blue',
    defaultOpen: true,
    content: (
      <div className='space-y-6'>
        <div>
          <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400'>Définition</h3>
          <GlassCard padding='p-6' className='space-y-4'>
            <p className='leading-relaxed text-gray-300'>
              L&apos;articulation de procédure correspond à une liste chronologique des divers procès-verbaux pouvant
              être établis lors du déroulement d&apos;une enquête. Elle permet de visualiser tous les actes
              d&apos;investigation devant être réalisés à partir d&apos;un thème donné.
            </p>
            <p className='leading-relaxed text-gray-300'>
              Par cet exercice, le candidat doit montrer qu&apos;il a compris le cheminement d&apos;une procédure. Il
              doit également présenter une logique d&apos;enquête en lien avec le thème en identifiant les éléments
              importants.
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
          <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400'>Exemple visuel</h3>
          <ArticulationTableExample />
        </div>

        <div>
          <h3 className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400'>Organisation</h3>
          <div className='grid gap-4 md:grid-cols-3'>
            <GlassCard padding='p-5'>
              <p className='mb-2 text-xs font-bold uppercase tracking-wide text-white'>En gras</p>
              <p className='text-sm text-gray-400'>Les mentions devant apparaître en l&apos;état dans les cartouches.</p>
            </GlassCard>
            <GlassCard padding='p-5'>
              <p className='mb-2 text-xs font-bold uppercase italic text-blue-400'>En italique</p>
              <p className='text-sm text-gray-400'>Les éléments devant apparaître en lien avec le thème.</p>
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
                Dans le cas d&apos;une extension de compétence, le numéro de l&apos;article de référence devra être
                visé pour tous les actes (ex. : art. 18 alinéa 3).
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
    ),
  };

  const articulationExemple: SectionAccordionItem = {
    id: 'articulation-exemple',
    trigger: "Exemple d'articulation — Tableau PV commenté",
    badge: 'Exemple',
    badgeColor: 'green',
    defaultOpen: true,
    content: (
      <div className='space-y-4'>
        <p className='text-sm text-gray-400'>
          Chaque bloc correspond à un procès-verbal : colonne de gauche (côte, numéro, date, OPJ) et contenu du PV à
          droite. Les cinq premières lignes illustrent un enchaînement type (saisine, GAV, audition, perquisition…) ;
          la dernière ligne laisse place à la suite de la procédure.
        </p>
        <ArticulationTableExample />
        <div className='grid gap-4 md:grid-cols-2'>
          <GlassCard padding='p-5'>
            <p className='mb-2 text-xs font-bold uppercase tracking-wide text-white'>Gras</p>
            <p className='text-sm text-gray-400'>
              Dans le PV rédigé, les mentions fixes du cartouche apparaissent en gras, telles que dans le modèle
              officiel.
            </p>
          </GlassCard>
          <GlassCard padding='p-5'>
            <p className='mb-2 text-xs font-bold uppercase italic text-blue-400'>Italique</p>
            <p className='text-sm text-gray-400'>
              Les éléments propres au thème (noms, qualifications, faits précis…) sont indiqués en italique dans la consigne
              : ils varient selon l’énoncé.
            </p>
          </GlassCard>
        </div>
      </div>
    ),
  };

  const cartItems: SectionAccordionItem[] = cartoucheSections.map((c) => ({
    id: c.id,
    trigger: c.trigger,
    badge: c.badge,
    badgeColor: 'gray' as const,
    content: <PVCartouchesSection lockCategory={c.lock} />,
  }));

  const rapportItem: SectionAccordionItem = {
    id: 'rapport-synthese',
    trigger: 'Le rapport de synthèse — Structure complète',
    badge: 'Synthèse',
    badgeColor: 'blue',
    content: (
      <div className='space-y-6'>
        <GlassCard padding='p-6' className='mb-2'>
          <p className='leading-relaxed text-gray-300'>
            Le rapport de synthèse est un document récapitulatif de l&apos;ensemble de la procédure, destiné au
            magistrat. Il doit être clair, structuré et synthétique.
          </p>
        </GlassCard>
        <RapportSyntheseSchema />
      </div>
    ),
  };

  const items: SectionAccordionItem[] = [articulationDef, articulationExemple, ...cartItems, rapportItem];

  return (
    <div className='mx-auto max-w-4xl space-y-16 px-6 pb-24'>
      <GlassCard padding='p-5' className='border-violet-500/25 bg-violet-500/[0.06]'>
        <p className='text-sm font-semibold text-white'>Enquêtes planches (entraînement)</p>
        <p className='mt-2 text-sm text-gray-400'>
          Sujet complet, articulation commentée, PV rédigé et rapport de synthèse pour les thèmes Alpha et Bravo — avec
          fac-similés des documents officiels.
        </p>
        <div className='mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm'>
          <Link href='/cours/enquetes' className='font-medium text-violet-300 transition hover:text-violet-200'>
            Rubrique Enquêtes →
          </Link>
          <Link href='/epreuves' className='font-medium text-gray-400 transition hover:text-gray-300'>
            Vue 3 épreuves
          </Link>
          <Link href='/entrainement/articulation' className='font-medium text-gray-400 transition hover:text-gray-300'>
            Articulation interactive
          </Link>
        </div>
      </GlassCard>

      <div className='grid gap-6 md:grid-cols-2'>
        <GlassCard padding='p-5' className='border-red-500/30 bg-red-500/[0.06]'>
          <p className='text-xs font-bold uppercase tracking-wide text-red-300'>Erreurs qui peuvent coûter très cher</p>
          <ul className='mt-3 list-inside list-disc space-y-2 text-sm text-gray-300'>
            <li>Cartouche sans titre opérationnel clair ou sans qualité OPJ/APJ.</li>
            <li>Mélange des cadres (flagrant / préliminaire) sans acte de changement.</li>
            <li>PV en « roman » : le jury attend du télégraphique et des renvois maîtrisés.</li>
            <li>Rapport de synthèse hors consigne de forme (gras, italique, structure imposée).</li>
          </ul>
        </GlassCard>
        <GlassCard padding='p-5' className='border-emerald-500/30 bg-emerald-500/[0.06]'>
          <p className='text-xs font-bold uppercase tracking-wide text-emerald-300'>Check-list veille de concours</p>
          <ul className='mt-3 list-inside list-disc space-y-2 text-sm text-gray-300'>
            <li>Relire une articulation complète (Alpha ou Bravo) en 20 minutes chrono.</li>
            <li>Refaire une grille de rapport sur papier sans supports.</li>
            <li>Vérifier les mentions obligatoires GAV / avis sur un sujet tiré au hasard.</li>
            <li>Dormir : le jour J, la méthode doit être du réflexe, pas de la lecture.</li>
          </ul>
        </GlassCard>
      </div>

      <SectionAccordion allowMultiple items={items} />

      <motion.section id='navigation' className='scroll-mt-28 space-y-6' {...sectionMotion}>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-blue-400'>Suite</p>
          <h2 className='font-display text-2xl font-bold text-white'>Continuer la préparation</h2>
          <p className='mt-2 text-sm text-gray-500'>Autres épreuves du concours</p>
        </div>
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
