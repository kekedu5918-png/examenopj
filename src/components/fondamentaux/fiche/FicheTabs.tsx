'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { cn } from '@/utils/cn';

export type FicheTabsProps = {
  slug: string;
  /** Base des ancres (ex. `/design-system/fiche-v3` pour la preview DS). Défaut : `/fondamentaux/<slug>`. */
  basePath?: string;
  sectionIds?: Partial<{
    cours: string;
    comparer: string;
    pieges: string;
    quiz: string;
    memo: string;
  }>;
  quizHref?: string;
};

const defaultIds = {
  cours: 'fiche-cours',
  comparer: 'fiche-comparer',
  pieges: 'fiche-pieges',
  memo: 'fiche-memo',
};

function useHashFragment() {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return hash;
}

export function FicheTabs({ slug, basePath, sectionIds, quizHref }: FicheTabsProps) {
  const ids = { ...defaultIds, ...sectionIds };
  const base = basePath ?? `/fondamentaux/${slug}`;
  const hash = useHashFragment();

  const tabs: Array<{ id: string; label: string; href: string; external?: boolean }> = [
    { id: ids.cours, label: 'Cours', href: `${base}#${ids.cours}` },
    { id: ids.comparer, label: 'Comparer', href: `${base}#${ids.comparer}` },
    { id: ids.pieges, label: 'Pièges', href: `${base}#${ids.pieges}` },
    {
      id: 'quiz',
      label: 'Quiz',
      href: quizHref ?? `${base}#quiz`,
      external: Boolean(quizHref && quizHref.startsWith('http')),
    },
    { id: ids.memo, label: 'Mémo', href: `${base}#${ids.memo}` },
  ];

  return (
    <nav
      aria-label='Sections de la fiche'
      className={cn(
        'sticky top-0 z-10 mt-8 border-b border-ij-border/40 bg-ij-surface-2/95 py-3',
      )}
      data-testid='fiche-tabs'
    >
      <ul className='flex flex-wrap gap-1 sm:gap-2'>
        {tabs.map((t, index) => {
          const active = hash === '' ? index === 0 : hash === `#${t.id}`;
          const tabClass = cn(
            'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50',
            active
              ? 'bg-ij-surface text-ij-text ring-2 ring-ij-accent/35'
              : 'text-ij-text-muted hover:bg-ij-surface hover:text-ij-text',
          );
          return (
            <li key={t.id}>
              {t.external ? (
                <a href={t.href} className={tabClass} aria-current={active ? 'true' : undefined}>
                  {t.label}
                </a>
              ) : (
                <Link href={t.href} className={tabClass} aria-current={active ? 'true' : undefined}>
                  {t.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
