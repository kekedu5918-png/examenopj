'use client';

import { cn } from '@/utils/cn';

export type FicheArticlesClesProps = {
  articles: string[];
};

export function FicheArticlesCles({ articles }: FicheArticlesClesProps) {
  return (
    <section className='mt-10' data-testid='fiche-articles-cles'>
      <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-ij-text-subtle'>
        Articles clés
      </h2>
      <ul className='flex flex-wrap gap-2'>
        {articles.map((art) => (
          <li key={art}>
            <span
              className={cn(
                'inline-flex rounded-lg border border-ij-border/50 bg-ij-surface/60',
                'px-3 py-1.5 font-ij-mono text-xs text-ij-text',
              )}
            >
              {art}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
