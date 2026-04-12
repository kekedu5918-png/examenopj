'use client';

import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { LessonSection } from '@/components/lessons/LessonSection';
import { RuleCard } from '@/components/lessons/RuleCard';
import { ScenarioCard } from '@/components/lessons/ScenarioCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const GAV_TIMELINE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Décision de placement',
    description:
      'Mesure exceptionnelle : motivation, information des droits, début du décompte légal.',
    duration: 'Dès l’arrivée au local',
    article: 'Art. 62-2 CPP',
  },
  {
    number: 2,
    title: 'Déroulé & prolongations',
    description: 'Auditions, expertises, demandes de prolongation selon la procédure et le parquet.',
    duration: '24h → 48h max',
    article: 'Art. 63 & 63-4',
  },
  {
    number: 3,
    title: 'Fin de mesure',
    description: 'Levée, mise en examen, présentation au parquet ou autre suite cohérente.',
    article: 'Art. 63-5',
  },
];

const RELATED_FICHE: Record<string, string> = {
  GAV: '/fondamentaux/garde-a-vue',
  Perquisition: '/fondamentaux/perquisition',
  Audition: '/fondamentaux/audition',
};

/**
 * Aperçu « anti-pavé » sur la page Parcours : illustre la méthode de lecture
 * (cartes, chiffres clés, règles, cas, timeline) avant les nœuds Duolingo.
 */
export function ParcoursOpjPedagogyBlock() {
  const router = useRouter();

  return (
    <LessonSection
      title='Lecture efficace : l’essentiel en repères visuels'
      subtitle='Même esprit que les fiches Fondamentaux : zéro pavé, tout est scannable. Voici les formats pédagogiques utilisés dans le parcours.'
      sectionNumber={1}
      totalSections={7}
    >
      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='24h'
          label='durée initiale de la GAV (majeur)'
          sublabel='Renouvellement possible → 48h max en procédure ordinaire'
          color='amber'
        />
        <ConceptCard
          icon={BookOpen}
          title='Garde à vue : le socle'
          description='Mesure d’investigation encadrée : durées, droits, contrôle du juge.'
          article='Art. 62-2 à 63-5 CPP'
          color='blue'
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='allowed'
          title='Perquisition de jour'
          description='Entre 6h et 21h, selon les habilitations et le cadre procédural, sans autorisation spéciale du juge dans les hypothèses légales.'
          article='Art. 59 CPP'
        />
        <RuleCard
          type='forbidden'
          title='Perquisition de nuit'
          description='Interdite en principe entre 21h et 6h au domicile — sauf décision du juge des libertés ou exceptions strictement prévues.'
          article='Art. 59 CPP'
        />
      </div>

      <RuleCard
        type='conditional'
        title='Audition sans avocat'
        description='Règle : présence de l’avocat sauf cas dérogatoires encadrés par le législateur.'
        condition='Urgence réelle, risque pour l’enquête ou la personne : conditions cumulatives interprétées strictement.'
        article='Art. 63-4 CPP'
      />

      <ScenarioCard
        situation="Il est 22h30 : vous venez d'interpeller un suspect en flagrance à son domicile."
        question='Pouvez-vous perquisitionner les lieux immédiatement, sans JLD ?'
        answer='Non en principe : la perquisition « de nuit » au domicile est interdite sans autorisation du juge des libertés (sauf hypothèses exceptionnelles prévues par la loi).'
        difficulty={2}
      />

      <div className='grid gap-6 lg:grid-cols-2 lg:items-start'>
        <TimelineStep steps={GAV_TIMELINE} />
        <DefinitionCard
          term='Flagrance'
          definition='La personne est surprise en train de commettre l’infraction ou la poursuite est immédiate : le cadre autorise des actes d’enquête renforcés, sous conditions.'
          example='Interpellation sur le fait même ou dans le temps très court qui suit la commission de l’infraction.'
          relatedTerms={['GAV', 'Perquisition', 'Audition']}
          onRelatedTermClick={(term) => {
            const href = RELATED_FICHE[term];
            if (href) router.push(href);
          }}
        />
      </div>
    </LessonSection>
  );
}
