'use client';

import { Ban } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { RuleCard } from '@/components/lessons/RuleCard';

export function NullitesLessonBlocks() {
  return (
    <section aria-label='Repères visuels — nullités' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-rose-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Nullités
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-start'>
        <ConceptCard
          icon={Ban}
          title='Sanction de l’irrégularité'
          description='La nullité anéantit l’acte et peut entraîner l’annulation des actes subséquents (effet domino).'
          article='Art. 802 & 174 CPP'
          color='red'
        />
        <DefinitionCard
          term='Nullité « textuelle »'
          definition='Formalité que la loi prescrit expressément « à peine de nullité » (ex. art. 59, réquisitions, rétention d’identité…).'
          example='Vérifier le texte exact : une omission peut ouvrir une nullité si grief.'
          relatedTerms={['Nullité substantielle', 'Grief']}
        />
      </div>

      <DefinitionCard
        term='Nullité substantielle'
        definition='Atteinte aux droits de la défense ou à une formalité essentielle : il faut un grief causé par la violation.'
        example='Une erreur qui n’a pas affecté les droits de la personne ne sera pas retenue.'
      />

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='conditional'
          title='Condition du grief'
          description='Textuelle ou substantielle : pas de nullité sans grief pour la personne qui la soulève (art. 802).'
          article='Art. 802 CPP'
        />
        <RuleCard
          type='conditional'
          title='Effet cascade (art. 174)'
          description='Annulation de l’acte irrégulier et des actes subséquents ; pièces retirées du dossier.'
          article='Art. 174 CPP'
        />
      </div>
    </section>
  );
}
