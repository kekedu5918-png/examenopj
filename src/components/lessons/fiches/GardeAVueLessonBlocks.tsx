'use client';

import { Scale } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const PHASES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Décision & placement',
    description:
      'Conditions cumulatives de l’art. 62-2 : soupçon sérieux + GAV comme seul moyen d’atteindre un des six objectifs légaux.',
    duration: 'Immédiat',
    article: 'Art. 62-2 CPP',
  },
  {
    number: 2,
    title: 'Déroulé & droits',
    description:
      'Notification des droits sans délai, examen médical, assistance d’un avocat (sauf dérogations strictes), registre.',
    duration: '24h → +24h si conditions',
    article: 'Art. 63-1 à 63-4',
  },
  {
    number: 3,
    title: 'Contrôle & fin',
    description:
      'Avis au parquet, prolongation motivée si applicable, présentations et suites (levée, défèrement…).',
    article: 'Art. 63 al. 2, 64',
  },
];

/**
 * Bloc pédagogique — fiche « La garde à vue » uniquement.
 * Les autres fiches seront branchées une par une.
 */
export function GardeAVueLessonBlocks() {
  return (
    <section aria-label='Repères visuels — garde à vue' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Fiche GAV
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='24h'
          label='durée initiale (droit commun, majeur)'
          sublabel='+24h possibles si crime ou délit ≥ 1 an et conditions de l’art. 63-II'
          color='amber'
        />
        <ConceptCard
          icon={Scale}
          title='Mesure exceptionnelle'
          description='Placement par l’OPJ uniquement, sous contrôle judiciaire : ni gadget ni prolongation « automatique ».'
          article='Art. 62-2 à 63 CPP'
          color='blue'
        />
      </div>

      <TimelineStep steps={PHASES} />

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='allowed'
          title='Qui décide du placement ?'
          description='La décision de placement en GAV relève de l’officier de police judiciaire (habilitation).'
          article='Art. 63 al. 1 CPP'
        />
        <RuleCard
          type='forbidden'
          title='L’APJ ne place pas en GAV'
          description='L’agent de police judiciaire ne peut pas décider du placement en garde à vue ; il peut seconder l’OPJ.'
          article='Art. 63 al. 1 CPP'
        />
      </div>
    </section>
  );
}
