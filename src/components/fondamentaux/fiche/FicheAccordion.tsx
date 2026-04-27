'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

export type FicheAccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type FicheAccordionProps = {
  items: FicheAccordionItem[];
};

export function FicheAccordion({ items }: FicheAccordionProps) {
  return (
    <AccordionPrimitive.Root type='single' collapsible className='mt-10 space-y-2'>
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className='rounded-xl border border-ij-border/40 bg-ij-surface/40'
          data-testid={`fiche-accordion-item-${item.id}`}
        >
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger
              className={cn(
                'flex flex-1 items-center justify-between gap-3 px-4 py-3 text-left',
                'text-sm font-medium text-ij-text transition-colors',
                'hover:bg-ij-surface-2/50 [&[data-state=open]>svg]:rotate-180',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/45',
              )}
            >
              {item.title}
              <ChevronDown
                className='h-4 w-4 shrink-0 text-ij-text-muted motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none'
                strokeWidth={2}
                aria-hidden
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              'overflow-hidden motion-safe:data-[state=closed]:animate-accordion-up motion-safe:data-[state=open]:animate-accordion-down',
              'motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none',
            )}
          >
            <div className='border-t border-ij-border/30 px-4 pb-4 pt-2 text-sm text-ij-text-muted'>
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
