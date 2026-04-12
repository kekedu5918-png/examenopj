'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/utils/cn';

export type InfractionsViewMode = 'tableau' | 'liste';

const LS_KEY = 'infractions-view-mode';

export function parseInfractionsVue(v: string | null): InfractionsViewMode | null {
  if (v === 'tableau' || v === 'liste') return v;
  return null;
}

type Props = {
  className?: string;
};

export function ViewToggle({ className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const vueFromUrl = useMemo(() => parseInfractionsVue(searchParams.get('vue')), [searchParams]);

  useEffect(() => {
    if (!mounted || vueFromUrl != null) return;
    const ls = parseInfractionsVue(window.localStorage.getItem(LS_KEY));
    if (ls && ls !== 'liste') {
      const p = new URLSearchParams(searchParams.toString());
      p.set('vue', ls);
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    }
  }, [mounted, pathname, router, searchParams, vueFromUrl]);

  const mode: InfractionsViewMode = vueFromUrl ?? 'liste';

  const setMode = useCallback(
    (next: InfractionsViewMode) => {
      try {
        window.localStorage.setItem(LS_KEY, next);
      } catch {
        /* ignore */
      }
      const p = new URLSearchParams(searchParams.toString());
      if (next === 'liste') p.delete('vue');
      else p.set('vue', next);
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  /** Ancienne URL ?vue=flashcard : normaliser vers liste */
  useEffect(() => {
    const raw = searchParams.get('vue');
    if (raw === 'flashcard') {
      const p = new URLSearchParams(searchParams.toString());
      p.delete('vue');
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  const items: { id: InfractionsViewMode; label: string; icon: string }[] = [
    { id: 'tableau', label: 'Tableau', icon: '⊞' },
    { id: 'liste', label: 'Liste', icon: '☰' },
  ];

  return (
    <div
      className={cn(
        'inline-flex rounded-full border border-white/[0.08] bg-white/[0.05] p-1',
        className,
      )}
      role='tablist'
      aria-label='Mode d’affichage des infractions'
    >
      {items.map(({ id, label, icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type='button'
            role='tab'
            aria-selected={active}
            onClick={() => setMode(id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150',
              active ? 'bg-[#4F6EF7] text-white' : 'text-[#8888A0] hover:text-white',
            )}
          >
            <span aria-hidden className='mr-1.5'>
              {icon}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
