import Link from 'next/link';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { getReperesSommaireForModuleId, quizHrefForFasciculeId } from '@/data/fondamentaux-fascicule-reperes';
import { cn } from '@/utils/cn';

import { COULEURS, DRAWER_MODULE_BTN } from './fondamentaux-theme';
import { FondamentauxFicheIcon } from './FondamentauxFicheIcon';
import { FondamentauxTableau } from './FondamentauxTableau';

function RichInline({ text, className }: { text: string; className?: string }) {
  const hasMarkup = /<[^>]+>/.test(text);
  if (hasMarkup) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return <span className={className}>{text}</span>;
}

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
  const reperesSommaire = getReperesSommaireForModuleId(fiche.fasciculeId);
  const quizHref = fiche.lienQuiz ?? (fiche.fasciculeId ? quizHrefForFasciculeId(fiche.fasciculeId) : null);

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
            {fiche.emojiAffiche ? (
              <span className='text-3xl leading-none sm:text-4xl'>{fiche.emojiAffiche}</span>
            ) : (
              <FondamentauxFicheIcon ficheId={fiche.id} className='h-8 w-8 text-current opacity-90 sm:h-9 sm:w-9' />
            )}
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

      {fiche.indispensableExamen ? (
        <div className='mb-10 rounded-2xl border border-gold-500/35 bg-gradient-to-br from-gold-500/[0.12] to-amber-600/[0.06] px-5 py-4 sm:px-6'>
          <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400'>Priorité concours</p>
          <p className='mt-2 text-sm leading-relaxed text-slate-100'>
            Thème très opéré à l&apos;écrit et à l&apos;oral : enchaînez{' '}
            <strong className='text-white'>Synthèse détaillée</strong> →{' '}
            <strong className='text-white'>Pièges d&apos;examen</strong> →{' '}
            <strong className='text-white'>À retenir</strong>, puis recoupez sur Légifrance.
          </p>
        </div>
      ) : null}

      {fiche.fasciculeNumero != null && fiche.lienModule ? (
        <div className='mb-10 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 sm:px-5'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-slate-400'>
              <span className='font-semibold text-slate-200'>Traçabilité programme</span> — fascicule officiel{' '}
              <span className='tabular-nums font-mono text-gold-400/90'>
                F{fiche.fasciculeNumero.toString().padStart(2, '0')}
              </span>
              {fiche.fasciculeDomaine ? (
                <span className='text-slate-500'> · {fiche.fasciculeDomaine}</span>
              ) : null}
            </p>
            <div className='flex flex-wrap gap-2'>
              {quizHref ? (
                <Link
                  href={quizHref}
                  className={cn(
                    'inline-flex shrink-0 items-center justify-center rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/15',
                  )}
                >
                  Quiz thème →
                </Link>
              ) : null}
              <Link
                href={fiche.lienModule}
                className={cn(
                  'inline-flex shrink-0 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                  c.outlineBtn,
                )}
              >
                Module de cours →
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {reperesSommaire?.parties.length ? (
        <section className='mb-12' aria-label='Parties du sommaire officiel (repère)'>
          <p className='mb-4 text-xs leading-relaxed text-slate-500'>
            Liste de repère issue du <strong className='font-medium text-slate-400'>sommaire type</strong> du fascicule (titres de
            chapitres, pas le corps du texte). À recouper avec votre support officiel et Légifrance.
          </p>
          <h2 className='mb-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-500'>
            Recoupement avec le fascicule (sommaire)
          </h2>
          {reperesSommaire.intro ? (
            <p className='mb-4 text-[15px] leading-relaxed text-slate-400'>{reperesSommaire.intro}</p>
          ) : null}
          <ul className='space-y-2 rounded-xl border border-white/[0.07] bg-[#0c1219]/90 p-5'>
            {reperesSommaire.parties.map((line, i) => (
              <li key={`reperes-${i}`} className='flex gap-2.5 text-[15px] leading-snug text-slate-300'>
                <span className='shrink-0 font-mono text-[11px] text-slate-600' aria-hidden>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span className='min-w-0'>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {fiche.blocsDetail?.length ? (
        <section className='mb-12' aria-label='Synthèse détaillée'>
          <h2 className='mb-6 text-xs font-bold uppercase tracking-[0.22em] text-slate-500'>
            Synthèse détaillée
          </h2>
          <div className='space-y-10'>
            {fiche.blocsDetail.map((bloc, bi) => (
              <div key={`${bloc.titre}-${bi}`} className='space-y-4'>
                <h3 className='border-b border-white/10 pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gold-400/90'>
                  {bloc.titre}
                </h3>
                {bloc.items?.length ? (
                  <ul className='space-y-3 border-l-2 border-white/[0.08] pl-4'>
                    {bloc.items.map((line, li) => (
                      <li
                        key={`${bloc.titre}-${bi}-${li}`}
                        className='text-[15px] leading-[1.7] text-slate-300 [&_b]:font-semibold [&_b]:text-white'
                      >
                        <RichInline text={line.trimStart()} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {bloc.tableau ? (
                  <div className='overflow-x-auto rounded-xl border border-white/10'>
                    <FondamentauxTableau tableau={bloc.tableau} couleurKey={cat.couleur} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {fiche.piegesExamen?.length ? (
        <section className='mb-12' aria-label="Pièges d'examen">
          <h2 className='mb-5 text-xs font-bold uppercase tracking-[0.22em] text-rose-400/90'>
            Pièges d&apos;examen
          </h2>
          <div className='space-y-3'>
            {fiche.piegesExamen.map((p, i) => (
              <div
                key={`piege-${i}`}
                className='rounded-xl border border-rose-500/25 bg-rose-950/20 px-5 py-4 text-[15px] leading-relaxed text-rose-50/90'
              >
                {p}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {fiche.cles?.length ? (
        <section className='mb-12' aria-label='À retenir'>
          <h2 className='mb-5 text-xs font-bold uppercase tracking-[0.22em] text-gold-400/90'>
            À retenir
          </h2>
          <ul className='space-y-2 rounded-xl border border-gold-500/20 bg-gold-500/[0.06] p-5'>
            {fiche.cles.map((k, i) => (
              <li key={`cle-${i}`} className='flex gap-2.5 text-[15px] leading-snug text-slate-200'>
                <span className='shrink-0 text-gold-400' aria-hidden>
                  ⚡
                </span>
                <span className='min-w-0'>{k}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {fiche.regles.length > 0 ? (
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
      ) : null}

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
          {quizHref ? (
            <Link
              href={quizHref}
              className={cn(
                'inline-flex flex-1 items-center justify-center rounded-xl border px-5 py-3.5 text-sm font-semibold transition-colors sm:min-w-[200px]',
                c.outlineBtn,
              )}
            >
              Quiz sur ce thème →
            </Link>
          ) : null}
          {fiche.lienModule && fiche.fasciculeNumero == null ? (
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
