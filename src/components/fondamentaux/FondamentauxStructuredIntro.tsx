'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';

/** // TODO: compléter tableaux comparatifs avec sources fascicules / CPP à jour. */
export function FondamentauxStructuredIntro() {
  return (
    <section className='border-b border-white/10 bg-navy-950 px-4 py-12 md:px-8' aria-labelledby='fond-structure-title'>
      <div className='mx-auto max-w-4xl'>
        <h2 id='fond-structure-title' className='font-display text-2xl font-bold text-white md:text-3xl'>
          Les fondamentaux de l’OPJ
        </h2>
        <p className='mt-3 text-slate-400'>
          Le socle procédural à maîtriser en profondeur. Ces notions reviennent dans toutes les épreuves.
        </p>

        <Accordion type='single' collapsible className='mt-10 w-full space-y-3'>
          <AccordionItem value='cadres' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              1. Les cadres d’enquête
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <p>Tableau comparatif : flagrance, préliminaire, commission rogatoire, instruction, mort suspecte, disparition inquiétante.</p>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2'> </th>
                      <th className='py-2 pr-2'>Flagrance</th>
                      <th className='py-2 pr-2'>Préliminaire</th>
                      <th className='py-2 pr-2'>C. rogatoire</th>
                      <th className='py-2 pr-2'>Instruction</th>
                      <th className='py-2 pr-2'>Mort suspecte</th>
                      <th className='py-2'>Disparition</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Déclenchement</td>
                      <td colSpan={6} className='py-2 italic text-slate-500'>
                        {/* TODO: compléter depuis fascicules officiels */}
                        À compléter (fascicules officiels).
                      </td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Durée / limites</td>
                      <td colSpan={6} className='py-2 italic text-slate-500'>
                        À compléter depuis vos fascicules officiels.
                      </td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Pouvoirs OPJ</td>
                      <td colSpan={6} className='py-2 italic text-slate-500'>
                        …
                      </td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-slate-300'>GAV possible ?</td>
                      <td colSpan={6} className='py-2 italic text-slate-500'>
                        …
                      </td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='ci' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              2. Le contrôle d’identité (art. 78-1 à 78-6 CPP)
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>Conditions par régime (judiciaire, administratif, frontalier), suites possibles, durées max, pièges d’examen.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='gav' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              3. La garde à vue
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>Placement, notification des droits (liste complète), durées, prolongations, régimes spéciaux, droits du gardé.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='al' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              4. L’audition libre (art. 61-1 CPP)
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>Définition, conditions, tableau comparatif GAV vs audition libre.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='null' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              5. Les nullités de procédure
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>Causes textuelles / substantielles, qui invoque, délais, effets, purge, pièges fréquents.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='perq' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              6. Perquisitions, saisies, réquisitions
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>Conditions par cadre, présences obligatoires, horaires légaux, formalisme.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
