'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';

export function ModelePVNotesSection({ notes }: { notes: string[] }) {
  const [open, setOpen] = useState(false);

  if (notes.length === 0) return null;

  return (
    <section className='mt-10 rounded-xl border border-amber-500/20 bg-amber-500/[0.06]'>
      <button
        type='button'
        onClick={() => setOpen((v) => !v)}
        className='flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-amber-100/95'
        aria-expanded={open}
      >
        <span className='flex items-center gap-2'>
          <span aria-hidden>💡</span> Notes pédagogiques
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition', open && 'rotate-180')} aria-hidden />
      </button>
      {open ? (
        <div className='border-t border-amber-500/15 px-4 pb-4 pt-2'>
          <ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-examen-ink'>
            {notes.map((n, idx) => (
              <li key={idx}>{n}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
