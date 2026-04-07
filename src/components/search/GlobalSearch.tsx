'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

import { getSearchIndex, type SearchIndexItem } from '@/data/search-index';
import { cn } from '@/utils/cn';

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

function matches(query: string, item: SearchIndexItem): boolean {
  if (!query.trim()) return true;
  const n = normalize(query);
  const hay = normalize([item.label, item.group, item.keywords ?? '', item.href].join(' '));
  return hay.includes(n);
}

/**
 * Recherche globale légère (Cmd+K / Ctrl+K) — index des routes et titres principaux.
 */
export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const index = useMemo(() => getSearchIndex(), []);

  const results = useMemo(() => index.filter((item) => matches(q, item)).slice(0, 24), [index, q]);

  const onKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setOpen((v) => !v);
    }
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  useEffect(() => {
    if (!open) setQ('');
  }, [open]);

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-examen-inkMuted transition hover:border-white/15 hover:bg-white/[0.07] lg:inline-flex'
        aria-label='Ouvrir la recherche'
      >
        <Search className='h-3.5 w-3.5 opacity-80' aria-hidden />
        <span>Recherche</span>
        <kbd className='hidden rounded border border-white/15 bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-gray-500 xl:inline'>
          ⌘K
        </kbd>
      </button>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='inline-flex rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-examen-inkMuted transition hover:bg-white/[0.07] lg:hidden'
        aria-label='Ouvrir la recherche'
      >
        <Search className='h-5 w-5' aria-hidden />
      </button>

      {open ? (
        <div
          className='fixed inset-0 z-[200] flex items-start justify-center bg-black/70 p-4 pt-[12vh]'
          role='dialog'
          aria-modal='true'
          aria-labelledby='global-search-title'
        >
          <button type='button' className='absolute inset-0 cursor-default' aria-label='Fermer' onClick={() => setOpen(false)} />
          <div className='relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#12121a] shadow-2xl'>
            <div className='flex items-center gap-2 border-b border-white/10 px-4 py-3'>
              <Search className='h-5 w-5 shrink-0 text-gray-500' aria-hidden />
              <input
                id='global-search-title'
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder='Rechercher une page…'
                className='min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 focus:outline-none'
              />
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='rounded-lg p-1 text-gray-500 hover:bg-white/10 hover:text-white'
                aria-label='Fermer'
              >
                <X className='h-5 w-5' />
              </button>
            </div>
            <ul className='max-h-[min(50vh,420px)] overflow-y-auto py-2'>
              {results.length === 0 ? (
                <li className='px-4 py-6 text-center text-sm text-gray-500'>Aucun résultat.</li>
              ) : (
                results.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition hover:bg-white/[0.06]',
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <span className='font-medium text-white'>{item.label}</span>
                      <span className='text-xs text-gray-500'>
                        {item.group} · {item.href}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
