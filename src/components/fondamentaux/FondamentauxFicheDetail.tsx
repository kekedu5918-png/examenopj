import Link from 'next/link';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

import { COULEURS, DRAWER_MODULE_BTN } from './fondamentaux-theme';
import { FondamentauxFicheIcon } from './FondamentauxFicheIcon';
import { FondamentauxTableau } from './FondamentauxTableau';

type Props = {
  fiche: Fiche;
  categories: Record<Categorie, { label: string; couleur: string }>;
  /** Mise en page plus aérée sur la page dédiée (max-width géré par le parent). */
  variant?: 'page' | 'compact';
};

export function FondamentauxFicheDetail({ fiche, categories, variant = 'page' }: Props) {
  const cat = categories[fiche.categorie];
  const c = COULEURS[cat.couleur];
  const titleId = `fondamentaux-fiche-title-${fiche.id}`;
  const isPage = variant === 'page';

  return (
    <article aria-labelledby={titleId} className={cn(isPage && 'pb-12')}>
      <header
        className={cn(
          'border-b border-white/10 pb-8',
          isPage ? 'mb-10' : 'mb-6',
        )}
      >
        <div className='flex flex-col gap-5 sm:flex-row sm:items-start'>
          <div
            className={cn(
              'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border shadow-inner shadow-black/20 sm:h-16 sm:w-16',
              c.badge,
            )}
            aria-hidden
          >
            <FondamentauxFicheIcon ficheId={fiche.id} className='h-8 w-8 text-current opacity-90 sm:h-9 sm:w-9' />
          </div>
          <div className='min-w-0 flex-1'>
            <span className={cn('inline-block text-[10px] font-bold uppercase tracking-[0.2em]', c.title)}>
              {cat.label}
            </span>
            <h1
              id={titleId}
              className='mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[1.75rem]'
            >
              {fiche.titre}
            </h1>
            <p className='mt-3 font-mono text-sm text-slate-500'>{fiche.source}</p>
          </div>
        </div>
      </header>

      <blockquote
        className={cn(
          'mb-10 rounded-r-lg py-4 pl-5 pr-4 text-base italic leading-relaxed text-slate-200/95 sm:text-[17px] sm:leading-relaxed',
          c.drawerIntro,
        )}
      >
        {fiche.accroche}
      </blockquote>

      <section className='mb-12' aria-label='Points clés'>
        <h2 className='mb-6 text-xs font-bold uppercase tracking-[0.22em] text-slate-500'>
          Règles et points clés
        </h2>
        <div className='space-y-4'>
          {fiche.regles.map((regle, i) => (
            <div
              key={`${regle.label}-${i}`}
              className={cn(
                'rounded-xl p-5 sm:p-6',
                regle.alerte
                  ? 'border border-amber-500/45 bg-amber-950/[0.22] shadow-[inset_0_1px_0_0_rgba(251,191,36,0.08)]'
                  : 'border border-white/[0.08] bg-[#0c1219] shadow-sm shadow-black/20 transition-[border-color,box-shadow] duration-200 hover:border-white/[0.12]',
              )}
            >
              <div className='flex flex-wrap items-start justify-between gap-2 gap-y-1'>
                <h3
                  className={cn(
                    'pr-2 text-base font-semibold leading-snug sm:text-lg',
                    regle.alerte ? 'text-amber-100' : 'text-white',
                  )}
                >
                  {regle.label}
                </h3>
                {regle.article ? (
                  <span className='shrink-0 rounded-lg border border-white/10 bg-black/25 px-2.5 py-1 font-mono text-[11px] leading-none text-slate-400'>
                    {regle.article}
                  </span>
                ) : null}
              </div>
              {regle.detail ? (
                <p
                  className={cn(
                    'mt-3 text-[15px] leading-[1.7]',
                    regle.alerte ? 'text-amber-50/90' : 'text-slate-400',
                  )}
                >
                  {regle.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {fiche.tableau ? (
        <section className='mb-12' aria-label='Tableau comparatif'>
          <h2 className='mb-5 text-xs font-bold uppercase tracking-[0.22em] text-slate-500'>
            Tableau comparatif
          </h2>
          <div className='overflow-x-auto rounded-xl border border-white/10'>
            <FondamentauxTableau tableau={fiche.tableau} couleurKey={cat.couleur} />
          </div>
        </section>
      ) : null}

      <footer
        className={cn(
          'border-t border-white/10 pt-8',
          'rounded-xl border border-white/[0.06] bg-[#0b1118]/80 p-6 backdrop-blur-sm',
        )}
      >
        <p className='mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500'>
          Aller plus loin
        </p>
        <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
          {fiche.lienQuiz ? (
            <Link
              href={fiche.lienQuiz}
              className={cn(
                'inline-flex flex-1 items-center justify-center rounded-xl border px-5 py-3.5 text-sm font-semibold transition-colors sm:min-w-[200px]',
                c.outlineBtn,
              )}
            >
              Quiz sur ce thème →
            </Link>
          ) : null}
          {fiche.lienModule ? (
            <Link
              href={fiche.lienModule}
              className={cn(
                'inline-flex flex-1 items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors sm:min-w-[200px]',
                DRAWER_MODULE_BTN,
              )}
            >
              Voir le module de cours →
            </Link>
          ) : null}
          <Link
            href='/fondamentaux'
            className='inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 px-5 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] sm:min-w-[200px]'
          >
            ← Retour aux fondamentaux
          </Link>
        </div>
      </footer>
    </article>
  );
}
