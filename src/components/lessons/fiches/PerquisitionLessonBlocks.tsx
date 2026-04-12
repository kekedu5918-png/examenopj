'use client';

import { Search } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { ScenarioCard } from '@/components/lessons/ScenarioCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const ETAPES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Cadre procédural',
    description:
      'Flagrance (art. 56) : pouvoirs élargis selon les hypothèses. Enquête préliminaire (art. 76) : assentiment écrit ou autorisation motivée du JLD selon les cas.',
    article: 'Art. 56 & 76 CPP',
  },
  {
    number: 2,
    title: 'Exécution',
    description:
      'Personne concernée ou représentant présent ; sinon deux témoins indépendants. PV détaillé.',
    duration: '6h → 21h (principe)',
    article: 'Art. 57 & 59',
  },
  {
    number: 3,
    title: 'Suite',
    description: 'Saisies, scellés, inventaire remis à la personne — traces horaires et loyauté de l’acte.',
    article: 'Art. 56',
  },
];

export function PerquisitionLessonBlocks() {
  return (
    <section aria-label='Repères visuels — perquisition' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-rose-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Perquisition
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='6h'
          label='début de la fenêtre légale (principe)'
          sublabel='Jusqu’à 21h au domicile — poursuite possible si l’acte a commencé avant 21h'
          color='red'
        />
        <ConceptCard
          icon={Search}
          title='Acte d’enquête ciblé'
          description='Pénétration d’un lieu pour rechercher preuves ou personnes : proportionnalité et formalisme.'
          article='Art. 56 à 59 CPP'
          color='red'
        />
      </div>

      <TimelineStep steps={ETAPES} />

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='allowed'
          title='Fenêtre habituelle'
          description='En flagrance, perquisition au domicile entre 6h et 21h selon le cadre de l’art. 56 et présence / représentation.'
          article='Art. 56 & 59 CPP'
        />
        <RuleCard
          type='forbidden'
          title='Nuit au domicile'
          description='Perquisition « de nuit » interdite sans autorisation du juge des libertés (exceptions légales strictes).'
          article='Art. 59 CPP'
        />
      </div>

      <RuleCard
        type='conditional'
        title='Enquête préliminaire sans assentiment'
        description='Crime, délit ≥ 3 ans ou recherche de biens passibles de confiscation : décision écrite et motivée du JLD.'
        condition='À défaut de motivation ou d’habilitation : risque de nullité (art. 59 al. 2).'
        article='Art. 76 al. 4 CPP'
      />

      <ScenarioCard
        situation='22h30 : vous interpellez un suspect à son domicile en flagrance. Les lieux sont clos.'
        question='Pouvez-vous lancer la perquisition immédiatement sans JLD ?'
        answer='Non en principe au domicile entre 21h et 6h sans autorisation du JLD. Vérifiez les exceptions prévues par la loi et la jurisprudence pour votre hypothèse.'
        difficulty={3}
      />
    </section>
  );
}
