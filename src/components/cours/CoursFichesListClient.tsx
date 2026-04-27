'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { CourseSummary } from '@/lib/content/courses';
import { cn } from '@/utils/cn';

type Props = {
  items: CourseSummary[];
  /** Base URL des fiches (ex. `/fondamentaux`) */
  basePath?: string;
};

const PARTIE_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Toutes les parties' },
  { value: '1', label: 'Partie I' },
  { value: '2', label: 'Partie II' },
  { value: '3', label: 'Partie III' },
  { value: '4', label: 'Partie IV' },
  { value: '5', label: 'Partie V' },
  { value: '6', label: 'Partie VI' },
];

export function CoursFichesListClient({ items, basePath = '/fondamentaux' }: Props) {
  const [q, setQ] = useState('');
  const [partieFilter, setPartieFilter] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    let list = items;
    const s = q.trim().toLowerCase();
    if (s) {
      list = list.filter((it) => {
        const hay = `${it.title} ${it.description ?? ''} ${it.tags.join(' ')}`.toLowerCase();
        return hay.includes(s);
      });
    }
    if (partieFilter) {
      const n = Number(partieFilter);
      if (n >= 1 && n <= 6) {
        list = list.filter((it) => it.partieIndex === n);
      }
    }
    return list;
  }, [items, q, partieFilter]);

  useEffect(() => {
    if (shouldReduceMotion) {
      const next: Record<string, boolean> = {};
      for (const it of filtered) next[it.slug] = true;
      setRevealed(next);
      return;
    }

    setRevealed({});
    const root = listRef.current;
    if (!root || filtered.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const n = { ...prev };
          for (const e of entries) {
            const id = (e.target as HTMLElement).dataset.ficheSlug;
            if (id && e.isIntersecting) n[id] = true;
          }
          return n;
        });
      },
      { root: null, rootMargin: '32px 0px 24px 0px', threshold: 0.06 },
    );

    const nodes = root.querySelectorAll<HTMLElement>('[data-fiche-slug]');
    nodes.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered, shouldReduceMotion]);

  const rm = shouldReduceMotion ? 'true' : 'false';

  return (
    <div className='space-y-6'>
      <p className='font-ij-sans text-sm text-ij-text-muted' data-testid='fondamentaux-count-total'>
        <span className='font-medium text-ij-text'>{items.length} fiches</span> — ordre des chapitres (contenu
        pédagogique)
      </p>
      <div className='rounded-2xl border border-ij-border bg-ij-surface p-5'>
        <div className='mb-4 flex flex-col gap-4 sm:flex-row sm:items-end'>
          <div className='min-w-0 flex-1'>
            <label htmlFor='fondamentaux-filter' className='mb-2 block font-ij-sans text-sm font-medium text-ij-text'>
              Filtrer les fiches
            </label>
            <input
              id='fondamentaux-filter'
              data-testid='fondamentaux-search'
              type='search'
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Titre, thème, tag…'
              className='w-full rounded-xl border border-ij-border bg-ij-surface-2/80 px-4 py-3 font-ij-sans text-ij-text outline-none placeholder:text-ij-text-subtle focus:border-ij-accent/40 focus:ring-2 focus:ring-ij-accent/20'
            />
          </div>
          <div className='w-full sm:w-56'>
            <label htmlFor='fondamentaux-partie' className='mb-2 block font-ij-sans text-sm font-medium text-ij-text'>
              Partie (programme)
            </label>
            <select
              id='fondamentaux-partie'
              data-testid='fondamentaux-filter-partie'
              value={partieFilter}
              onChange={(e) => setPartieFilter(e.target.value)}
              className='w-full rounded-xl border border-ij-border bg-ij-surface-2/80 px-3 py-3 font-ij-sans text-ij-text outline-none focus:border-ij-accent/40 focus:ring-2 focus:ring-ij-accent/20'
            >
              {PARTIE_OPTIONS.map((o) => (
                <option key={o.value || 'all'} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className='font-ij-sans text-xs text-ij-text-muted'>
          Fiches éditoriales (sources internes vérifiées) — présentation synthétique pour le candidat. Les fiches sans
          numéro de partie dans le source ne s’affichent que lorsque « Toutes les parties » est sélectionné.
        </p>
      </div>

      <ul
        ref={listRef}
        data-testid='fondamentaux-grid'
        data-reduced-motion={rm}
        className='grid gap-3 sm:grid-cols-2'
      >
        {filtered.map((it) => {
          const show = revealed[it.slug] ?? false;
          return (
            <li
              key={it.slug}
              data-fiche-slug={it.slug}
              data-chapitre={it.chapitre != null ? String(it.chapitre) : ''}
              data-partie-index={it.partieIndex != null ? String(it.partieIndex) : ''}
              data-testid='fondamentaux-card'
              data-reduced-motion={rm}
              className={cn(
                'transition-[opacity,transform] duration-500 ease-out',
                show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                shouldReduceMotion && 'duration-0',
              )}
            >
              <Link
                href={`${basePath}/${it.slug}`}
                className={cn(
                  'block rounded-2xl border border-ij-border bg-ij-text/[0.03] p-4 transition',
                  'hover:border-ij-accent/35 hover:bg-ij-text/[0.06]',
                )}
              >
                <div className='flex items-start justify-between gap-2'>
                  <span className='min-w-0 font-ij-sans font-semibold text-ij-text'>{it.title}</span>
                  {it.chapitre != null ? (
                    <span
                      className='shrink-0 rounded-md border border-ij-border/90 bg-ij-surface-2/90 px-2 py-0.5 font-ij-sans text-xs font-semibold text-ij-text'
                      aria-label={`Chapitre ${it.chapitre}`}
                    >
                      Ch. {it.chapitre}
                    </span>
                  ) : null}
                </div>
                {it.description ? (
                  <p className='mt-2 line-clamp-2 font-ij-sans text-sm leading-snug text-ij-text-muted'>
                    {it.description}
                  </p>
                ) : null}
                {it.loi2025 ? (
                  <span
                    className='mt-2 inline-flex w-fit items-center rounded-md border border-ij-accent/35 bg-ij-accent/10 px-2 py-0.5 font-ij-sans text-[10px] font-semibold text-ij-accent'
                    data-testid='fondamentaux-badge-2025'
                  >
                    Mise à jour 2025
                  </span>
                ) : null}
                {it.tags.length > 0 ? (
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {it.tags
                      .filter(
                        (t) =>
                          t !== 'fondamentaux' &&
                          t !== 'synthèse-46' &&
                          t !== '2F.1.b' &&
                          !/^Partie [IVX]+$/i.test(t),
                      )
                      .slice(0, 5)
                      .map((t) => (
                        <span
                          key={t}
                          className='rounded-md border border-ij-border bg-ij-surface-2 px-2 py-0.5 font-ij-sans text-[11px] font-medium text-ij-text'
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className='py-8 text-center font-ij-sans text-sm text-ij-text-muted'>Aucune fiche ne correspond au filtre.</p>
      ) : null}
    </div>
  );
}
