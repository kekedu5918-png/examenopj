'use client';

import Link from 'next/link';

import { cn } from '@/utils/cn';

export type FicheHeroProps = {
  title: string;
  description: string;
  chapitre: number;
  partie: number;
  loi2025: boolean;
  breadcrumbItems: { href: string; label: string }[];
  /** Durée indicative optionnelle (méta hero). */
  dureeIndicative?: string;
};

export function FicheHero({
  title,
  description,
  chapitre,
  partie,
  loi2025,
  breadcrumbItems,
  dureeIndicative,
}: FicheHeroProps) {
  const titleId = 'fiche-hero-title';

  return (
    <header
      className={cn(
        'relative overflow-hidden rounded-2xl border border-ij-glass-border/15',
        'bg-ij-glass-bg/5 px-6 py-10 backdrop-blur-md sm:px-10',
      )}
      data-testid='fiche-hero'
    >
      <nav aria-label='Fil d’Ariane' className='mb-6 text-sm text-ij-text-muted'>
        <ol className='flex flex-wrap items-center gap-2'>
          {breadcrumbItems.map((item, i) => (
            <li key={item.href} className='flex items-center gap-2'>
              {i > 0 ? <span aria-hidden className='text-ij-text-subtle'>/</span> : null}
              <Link
                href={item.href}
                className='text-ij-accent transition-colors hover:text-ij-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className='mb-4 flex flex-wrap items-center gap-2'>
        <span className='rounded-full border border-ij-border/50 bg-ij-surface/80 px-3 py-1 text-xs font-medium text-ij-text'>
          Chapitre {chapitre}
        </span>
        <span className='rounded-full border border-ij-border/50 bg-ij-surface/80 px-3 py-1 text-xs font-medium text-ij-text-muted'>
          Partie {partie}
        </span>
        {loi2025 ? (
          <span className='rounded-full border border-ij-info/40 bg-ij-info/15 px-3 py-1 text-xs font-medium text-ij-info'>
            2025
          </span>
        ) : null}
      </div>

      <h1
        id={titleId}
        className={cn(
          'font-ij-display text-3xl font-semibold tracking-tight sm:text-4xl',
          'bg-gradient-to-r from-ij-accent via-ij-memo to-ij-text bg-clip-text text-transparent',
        )}
      >
        {title}
      </h1>
      <p className='mt-4 max-w-3xl text-base text-ij-text-muted'>{description}</p>
      {dureeIndicative ? (
        <p className='mt-2 text-sm text-ij-text-subtle'>Durée indicative : {dureeIndicative}</p>
      ) : null}
    </header>
  );
}
