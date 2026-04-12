'use client';

import { Package } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { ScenarioCard } from '@/components/lessons/ScenarioCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const CHAINE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Objet & proportionnalité',
    description:
      'Saisir uniquement ce qui est utile à la manifestation de la vérité, dans le respect du cadre d’enquête.',
    article: 'Art. 56 CPP',
  },
  {
    number: 2,
    title: 'Scellés & inventaire',
    description:
      'Mention lisible (affaire, date, lieu, agent), liste remise ou copie : éviter les mélanges de qualifications.',
    article: 'D. 15-5-1-1 CPP',
  },
  {
    number: 3,
    title: 'Données numériques',
    description:
      'Image, hash, horodatage ; pas d’exploration hors périmètre du PV ou de la réquisition.',
    article: 'Art. 706-159 CPP',
  },
];

export function SaisiesScellesLessonBlocks() {
  return (
    <section aria-label='Repères visuels — saisies et scellés' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-teal-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Saisies · scellés
        </span>
      </div>

      <ConceptCard
        icon={Package}
        title='Chaîne de possession'
        description='Chaque mouvement doit être traçable jusqu’au débat contradictoire : la description défautaire peut faire tomber la pièce.'
        article='Art. 56 & D. 15-5-1-1 CPP'
        color='green'
      />

      <TimelineStep steps={CHAINE} />

      <RuleCard
        type='conditional'
        title='Piège fréquent'
        description='Mélanger objets relevant de qualifications différentes sans arborescence claire : risque d’exclusion ou de nullité pour défaut de description.'
      />

      <ScenarioCard
        situation='Lors d’une perquisition, vous saisissez téléphones et clés USB sur une même liste sans distinguer les infractions visées.'
        question='Quel risque principal au stade du débat ?'
        answer='Une chaîne probatoire floue fragilise l’attribution des pièces à chaque qualification et peut conduire à l’exclusion ou à une nullité pour défaut de description contradictoire.'
        difficulty={2}
      />
    </section>
  );
}
