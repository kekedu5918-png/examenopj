'use client';

import { FileSignature } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { ScenarioCard } from '@/components/lessons/ScenarioCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const DELEGATION: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Objet limité',
    description:
      'La commission rogatoire transporte des actes précis dans le temps et l’objet : pas de « blanc-seing ».',
    article: 'Art. 81 CPP',
  },
  {
    number: 2,
    title: 'Actes délégués',
    description:
      'Auditions hors mis en examen, constats, missions techniques expressément prévues.',
    article: 'Art. 151 à 155 CPP',
  },
  {
    number: 3,
    title: 'Rendu au juge',
    description:
      'Transmission fidèle des écritures pour validation ou rectification par le juge d’instruction.',
    article: 'Art. 154 CPP',
  },
];

export function CommissionRogatoireLessonBlocks() {
  return (
    <section aria-label='Repères visuels — commission rogatoire' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Commission rogatoire
        </span>
      </div>

      <ConceptCard
        icon={FileSignature}
        title='Délégation, pas duplication'
        description='Le juge d’instruction reste maître de l’information : l’OPJ exécute dans le périmètre fixé.'
        article='Art. 81 CPP'
        color='green'
      />

      <TimelineStep steps={DELEGATION} />

      <RuleCard
        type='forbidden'
        title='Interdictions nettes'
        description='Pas d’interrogatoire de mis en examen ni d’actes réservés au juge hors délégation expresse.'
        article='Art. 99-1 CPP'
      />

      <ScenarioCard
        situation='Sur commission rogatoire, vous auditionnez une personne en position de mis en examen sans habilitation spéciale.'
        question='Risque principal ?'
        answer='Excès de pouvoir et nullité : la CR ne remplace pas l’interrogatoire de mis en examen par le juge d’instruction.'
        difficulty={2}
      />
    </section>
  );
}
