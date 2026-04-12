'use client';

import { Gavel } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';

export function MandatsLessonBlocks() {
  return (
    <section aria-label='Repères visuels — mandats' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Mandats de justice
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='5'
          label='mandats du juge d’instruction'
          sublabel='Recherche, comparution, amener, dépôt, arrêt — à ne pas confondre'
          color='amber'
        />
        <ConceptCard
          icon={Gavel}
          title='QI décide, OPJ exécute'
          description='Les mandats sont des actes écrits du juge d’instruction ; l’OPJ ne « délivre » pas de mandat.'
          article='Art. 122 à 136 CPP'
          color='amber'
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='allowed'
          title='Mandat de comparution'
          description='Ordonne de se présenter à une date fixée : pas de contrainte physique immédiate pour amener.'
          article='Art. 122 CPP'
        />
        <RuleCard
          type='conditional'
          title='Mandat de recherche'
          description='Rechercher la personne et la présenter / placer en GAV dès qu’elle est trouvée (art. 122 al. 2).'
          article='Art. 122 CPP'
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='conditional'
          title='Mandat d’amener'
          description='La force publique amène immédiatement la personne devant le juge d’instruction.'
          article='Art. 122 CPP'
        />
        <RuleCard
          type='forbidden'
          title='Confusion fréquente'
          description='Ne pas confondre convocation simple et mandat d’amener : le niveau de contrainte diffère.'
        />
      </div>

      <DefinitionCard
        term='Mandat de dépôt'
        definition='Ordonne l’incarcération du mis en examen en maison d’arrêt dans l’attente du procès : mesure lourde, cadre JLD.'
        example='S’oppose à une simple comparution sous contrôle : vérifiez la chaîne décisionnelle et les voies de recours.'
        relatedTerms={['Contrôle judiciaire', 'Détention provisoire']}
      />
    </section>
  );
}
