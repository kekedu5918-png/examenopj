'use client';

import { Building2 } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const JURIS: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Tribunal de police',
    description: 'Contraventions (5 classes), juge unique, art. 521 à 549 CPP.',
    article: 'Art. 521 CPP',
  },
  {
    number: 2,
    title: 'Tribunal correctionnel',
    description: 'Délais : collégial (3 juges) sauf exceptions ; délits.',
    article: 'Art. 381 CPP',
  },
  {
    number: 3,
    title: 'Cour d’assises / CCD',
    description:
      'Crimes : assises (jurés) ou cour criminelle départementale (certains crimes 15–20 ans, 5 magistrats) selon le texte.',
    article: 'Art. 231 & 380-16 CPP',
  },
];

export function JuridictionsJugementLessonBlocks() {
  return (
    <section aria-label='Repères visuels — juridictions de jugement' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Juridictions
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='3'
          label='niveaux classiques (crime / délit / contravention)'
          sublabel='La qualification détermine juridiction, procédure et peines accessibles'
          color='blue'
        />
        <ConceptCard
          icon={Building2}
          title='Compétence matérielle'
          description='La nature de l’infraction fixe le tribunal : erreur de juridiction = vice de procédure.'
          article='Art. 231, 381, 521 CPP'
          color='blue'
        />
      </div>

      <TimelineStep steps={JURIS} />

      <RuleCard
        type='conditional'
        title='CCD vs cour d’assises'
        description='Certains crimes punis de 15 à 20 ans peuvent relever de la CCD (5 magistrats, sans jurés) : vérifiez le texte à jour.'
        article='Art. 380-16 à 380-22 CPP'
      />
    </section>
  );
}
