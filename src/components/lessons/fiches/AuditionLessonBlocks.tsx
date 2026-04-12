'use client';

import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const STATUTS: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Témoin',
    description:
      'Sans soupçon sérieux : audition limitée dans le temps, serment de dire la vérité, pas d’avocat.',
    duration: '4h max / audition',
    article: 'Art. 62 CPP',
  },
  {
    number: 2,
    title: 'Audition libre',
    description:
      'Personne soupçonnée hors GAV : information qualification, droit de partir, avocat, silence.',
    article: 'Art. 61-1 CPP',
  },
  {
    number: 3,
    title: 'Gardé à vue',
    description:
      'Contrainte : avocat dès le début (sauf reports encadrés), consultation de certains PV.',
    duration: '24h (+24h)',
    article: 'Art. 63-4 CPP',
  },
];

const LIEN_TERM: Record<string, string> = {
  GAV: '/fondamentaux/garde-a-vue',
  Témoin: '/fondamentaux',
};

export function AuditionLessonBlocks() {
  const router = useRouter();

  return (
    <section aria-label='Repères visuels — auditions' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Auditions
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='4h'
          label='plafond par audition (témoin)'
          sublabel='Plusieurs auditions possibles si convocations et sorties libres entre les temps'
          color='blue'
        />
        <ConceptCard
          icon={MessageCircle}
          title='Le statut prime'
          description='Témoin, audition libre ou gardé à vue : les droits et le formalisme ne sont pas interchangeables.'
          article='Art. 61 à 63-4 CPP'
          color='blue'
        />
      </div>

      <DefinitionCard
        term='Audition libre (art. 61-1)'
        definition='Personne soupçonnée entendue sans placement en GAV : elle doit être informée des faits, de son droit de quitter les lieux, de l’assistance d’un avocat et du silence.'
        example='Le suspect peut mettre fin à l’audition et sortir : aucune contrainte physique pour rester.'
        relatedTerms={['GAV', 'Témoin']}
        onRelatedTermClick={(term) => {
          const href = LIEN_TERM[term];
          if (href) router.push(href);
        }}
      />

      <TimelineStep steps={STATUTS} />

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='allowed'
          title='Droit au silence'
          description='Toute personne entendue peut se taire ; le silence ne vaut pas aveu. Information obligatoire.'
          article='CPP (principe général)'
        />
        <RuleCard
          type='conditional'
          title='Avocat en GAV'
          description='Dès le début de la mesure, sauf reports exceptionnels prévus (PR, délais plafonnés).'
          article='Art. 63-4 CPP'
        />
      </div>
    </section>
  );
}
