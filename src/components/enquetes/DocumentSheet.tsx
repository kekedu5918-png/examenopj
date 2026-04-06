'use client';

import { useCallback, useRef } from 'react';
import { Expand, FileDown } from 'lucide-react';

import { cn } from '@/utils/cn';

type DocumentSheetProps = {
  pdfHref: string;
  children: React.ReactNode;
  /** 'paper' : feuille blanche (PV, rapport). 'cream' : sujet. 'dark' : articulation tableau. */
  variant?: 'paper' | 'cream' | 'dark';
  className?: string;
};

export function DocumentSheet({ pdfHref, children, variant = 'paper', className }: DocumentSheetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const enterFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    void el.requestFullscreen?.().catch(() => undefined);
  }, []);

  const shell =
    variant === 'paper'
      ? 'border border-black/10 bg-white text-black shadow-2xl shadow-black/40'
      : variant === 'cream'
        ? 'border border-amber-900/15 bg-[#fffef8] text-black shadow-xl shadow-black/25'
        : 'border border-white/15 bg-navy-900/80 text-gray-100 shadow-xl';

  return (
    <div ref={wrapRef} className={cn('overflow-hidden rounded-xl', shell, className)}>
      <div className='flex flex-wrap items-center justify-end gap-2 border-b border-black/5 bg-black/[0.03] px-3 py-2 dark:border-white/10 dark:bg-white/5'>
        <button
          type='button'
          onClick={enterFs}
          className='inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-2.5 py-1.5 text-xs font-medium text-black transition hover:bg-black/[0.03] dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15'
        >
          <Expand className='size-3.5' aria-hidden />
          Plein écran
        </button>
        <a
          href={pdfHref}
          download
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-500/20 dark:text-amber-100'
        >
          <FileDown className='size-3.5' aria-hidden />
          Télécharger le PDF
        </a>
      </div>
      <div className='p-4 md:p-8'>{children}</div>
    </div>
  );
}
