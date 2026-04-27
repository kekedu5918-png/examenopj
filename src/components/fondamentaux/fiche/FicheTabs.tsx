'use client';

import Link from 'next/link';

import { cn } from '@/utils/cn';

export type FicheTabsProps = {
  slug: string;
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

export function FicheTabs({ slug, sectionIds, quizHref }: FicheTabsProps) {
  const ids = { ...defaultIds, ...sectionIds };
  const base = `/fondamentaux/${slug}`;

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
        'sticky top-0 z-10 mt-8 border-b border-ij-border/40 bg-ij-bg/90 py-3 backdrop-blur-md',
      )}
      data-testid='fiche-tabs'
    >
      <ul className='flex flex-wrap gap-1 sm:gap-2'>
        {tabs.map((t) => (
          <li key={t.id}>
            {t.external ? (
              <a
                href={t.href}
                className={cn(
                  'block rounded-lg px-3 py-2 text-sm font-medium text-ij-text-muted',
                  'transition-colors hover:bg-ij-surface hover:text-ij-text',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50',
                )}
              >
                {t.label}
              </a>
            ) : (
              <Link
                href={t.href}
                className={cn(
                  'block rounded-lg px-3 py-2 text-sm font-medium text-ij-text-muted',
                  'transition-colors hover:bg-ij-surface hover:text-ij-text',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50',
                )}
              >
                {t.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
