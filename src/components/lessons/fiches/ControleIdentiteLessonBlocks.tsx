'use client';

import { Fingerprint } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const CAS: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Police judiciaire (al. 1)',
    description:
      'Soupçon plausible d’infraction, ou renseignements utiles à l’enquête — fondement juridique explicite.',
    article: 'Art. 78-2 al. 1',
  },
  {
    number: 2,
    title: 'Préventif (al. 2)',
    description:
      'Sur réquisitions écrites du PR : lieux et durée fixés pour rechercher certains auteurs d’infractions.',
    article: 'Art. 78-2 al. 2',
  },
  {
    number: 3,
    title: 'Zone frontière / points d’entrée',
    description:
      'Bande des 20 km + ports, aéroports et gares internationaux — cadre spécifique.',
    article: 'Art. 78-2 al. 4',
  },
];

export function ControleIdentiteLessonBlocks() {
  return (
    <section aria-label='Repères visuels — contrôle d’identité' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Contrôle d’identité
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='4h'
          label='rétention max (art. 78-3)'
          sublabel='Si identité non établie : présentation à l’OPJ, PV, avis au parquet'
          color='amber'
        />
        <ConceptCard
          icon={Fingerprint}
          title='Invitation à justifier'
          description='Acte encadré : ni fouille générique ni perquisition déguisée.'
          article='Art. 78-2 CPP'
          color='amber'
        />
      </div>

      <TimelineStep steps={CAS} />

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='forbidden'
          title='Interdictions formelles'
          description='Pas de prétexte à perquisition ; pas de fondement sur l’apparence, la couleur de peau ou l’origine.'
          article='Art. 78-2 & jurisprudence'
        />
        <RuleCard
          type='allowed'
          title='Vérification d’identité'
          description='Formalités strictes si la personne ne peut ou ne veut justifier : PV, avis au PR, durée plafonnée.'
          article='Art. 78-3 CPP'
        />
      </div>
    </section>
  );
}
