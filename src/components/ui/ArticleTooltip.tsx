'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

import { cn } from '@/utils/cn';

export type ArticleRef = {
  /** Ex: "art. 63 CPP" */
  label: string;
  /** Ex: "L'officier de police judiciaire peut placer en garde à vue…" */
  text: string;
  /** Ex: "CPP" | "CP" */
  code: 'CPP' | 'CP' | 'autre';
  /** URL Légifrance directe */
  legifranceUrl?: string;
};

const CODE_BADGE: Record<ArticleRef['code'], string> = {
  CPP: 'border-blue-500/40 bg-blue-500/15 text-blue-200',
  CP: 'border-violet-500/40 bg-violet-500/15 text-violet-200',
  autre: 'border-white/20 bg-white/[0.08] text-gray-300',
};

type Props = {
  article: ArticleRef;
  children: React.ReactNode;
  className?: string;
};

export function ArticleTooltip({ article, children, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  // Fermeture au clic extérieur
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Fermeture à la touche Échap
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      {/* Trigger */}
      <button
        type='button'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => !open && setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex cursor-help items-center gap-1 rounded border px-1.5 py-0.5 text-xs font-semibold transition-all',
          CODE_BADGE[article.code],
          'hover:opacity-80',
        )}
        aria-expanded={open}
        aria-label={`Voir la référence ${article.label}`}
      >
        {children ?? article.label}
      </button>

      {/* Bulle */}
      {open && (
        <div
          className={cn(
            'absolute bottom-full left-0 z-50 mb-2 w-72 max-w-[90vw] rounded-xl border border-white/15 bg-navy-900 p-4 shadow-2xl shadow-black/40',
            prefersReduced ? '' : 'animate-in fade-in-0 zoom-in-95 duration-150',
          )}
          role='tooltip'
        >
          {/* Header */}
          <div className='mb-2 flex items-start justify-between gap-2'>
            <span
              className={cn(
                'rounded border px-2 py-0.5 text-xs font-bold',
                CODE_BADGE[article.code],
              )}
            >
              {article.label}
            </span>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='text-gray-500 transition hover:text-gray-200'
              aria-label='Fermer'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          </div>

          {/* Texte */}
          <p className='text-sm leading-relaxed text-gray-300'>{article.text}</p>

          {/* Lien Légifrance */}
          {article.legifranceUrl && (
            <a
              href={article.legifranceUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-3 inline-flex items-center gap-1 text-xs font-medium text-cyan-400 underline-offset-2 hover:underline'
            >
              Consulter sur Légifrance
              <ExternalLink className='h-3 w-3' />
            </a>
          )}
        </div>
      )}
    </span>
  );
}
