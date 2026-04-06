'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface SectionAccordionItem {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'amber' | 'red' | 'gray';
  defaultOpen?: boolean;
}

interface SectionAccordionProps {
  items: SectionAccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

const BADGE_COLORS = {
  blue: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
  green: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
  amber: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
  red: 'border-red-500/20 bg-red-500/10 text-red-400',
  gray: 'border-zinc-700 bg-zinc-800 text-zinc-400',
} as const;

/** Accordéon listing (épreuves, guide) — distinct du Radix `accordion.tsx` (cartouches PV). */
export function SectionAccordion({ items, allowMultiple = false, className = '' }: SectionAccordionProps) {
  const defaults = items.filter((i) => i.defaultOpen).map((i) => i.id);
  const [open, setOpen] = useState<string[]>(defaults);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    } else {
      setOpen((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-xl border transition-colors',
              isOpen ? 'border-zinc-600 bg-zinc-900/80' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
            )}
          >
            <button
              type='button'
              onClick={() => toggle(item.id)}
              className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left'
            >
              <div className='flex min-w-0 flex-1 items-center gap-3'>
                {item.badge ? (
                  <span
                    className={cn(
                      'shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold',
                      BADGE_COLORS[item.badgeColor ?? 'gray']
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}
                <span className={cn('text-sm font-semibold', isOpen ? 'text-zinc-100' : 'text-zinc-300')}>
                  {item.trigger}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            {isOpen ? (
              <div className='border-t border-zinc-800 px-5 pb-5 pt-1 text-left'>{item.content}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
