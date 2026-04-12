'use client';

import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';

export interface DefinitionCardProps {
  term: string;
  definition: string;
  example: string;
  relatedTerms?: string[];
  onRelatedTermClick?: (term: string) => void;
  className?: string;
}

export function DefinitionCard({
  term,
  definition,
  example,
  relatedTerms,
  onRelatedTermClick,
  className,
}: DefinitionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.32 }}
      className={cn(
        'rounded-xl border border-ds-border bg-ds-bg-secondary/90 p-5 shadow-sm',
        className,
      )}
    >
      <h3 className='text-lg font-bold tracking-tight text-ds-text-primary sm:text-xl'>{term}</h3>
      <p className='mt-2 text-sm leading-relaxed text-ds-text-muted'>{definition}</p>

      <div className='mt-4 rounded-lg border border-ds-border/80 bg-ds-bg-primary/50 px-3 py-2.5 dark:bg-ds-bg-primary/20'>
        <p className='text-[10px] font-semibold uppercase tracking-wide text-ds-text-muted'>
          Exemple
        </p>
        <p className='mt-1 text-sm italic leading-relaxed text-ds-text-primary'>{example}</p>
      </div>

      {relatedTerms && relatedTerms.length > 0 ? (
        <div className='mt-4'>
          <p className='text-[10px] font-semibold uppercase tracking-wide text-ds-text-muted'>
            Voir aussi
          </p>
          <ul className='mt-2 flex flex-wrap gap-2'>
            {relatedTerms.map((t) => (
              <li key={t}>
                <button
                  type='button'
                  onClick={() => onRelatedTermClick?.(t)}
                  className={cn(
                    'rounded-full border border-ds-border bg-ds-bg-elevated px-3 py-1 text-xs font-medium text-ds-accent transition-colors',
                    onRelatedTermClick
                      ? 'cursor-pointer hover:border-ds-accent hover:bg-ds-bg-primary'
                      : 'cursor-default',
                  )}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.article>
  );
}

export function ExampleUsage() {
  return (
    <DefinitionCard
      term='Flagrance'
      definition='Situation dans laquelle la personne est surprise au moment de la perpétration ou à la suite immédiate d’une infraction punie d’une peine d’emprisonnement.'
      example='Un suspect interpellé dans la minute qui suit un vol avec violence peut être placé en garde à vue selon les conditions légales.'
      relatedTerms={['GAV', 'Perquisition', 'Audition']}
      onRelatedTermClick={() => {}}
    />
  );
}
