'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HOME_PAGE_FAQ_ITEMS } from '@/data/home-faq';

export function HomeFaqSection() {
  return (
    <section
      className='border-t border-ij-border/60 bg-ij-bg px-4 py-16 md:py-22'
      aria-labelledby='home-faq-heading'
    >
      <div className='mx-auto max-w-3xl'>
        <h2 id='home-faq-heading' className='font-ij-sans text-2xl font-extrabold tracking-tight text-ij-text md:text-3xl'>
          Questions fréquentes
        </h2>
        <p className='mt-2 text-sm text-ij-text-muted'>
          Réponses générales sur l&apos;examen et la plateforme — pour le détail tarifaire, voir la page Tarifs.
        </p>
        <Accordion type='single' collapsible className='mt-8 w-full space-y-2'>
          {HOME_PAGE_FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              className='rounded-xl border border-ij-border/70 bg-ij-surface-2/25 px-4'
            >
              <AccordionTrigger className='py-4 text-left font-ij-sans text-base font-semibold text-ij-text hover:no-underline'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-4 text-sm leading-relaxed text-ij-text-muted'>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
