'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

interface Props {
  fiches: Fiche[];
  categories: Record<Categorie, { label: string; couleur: string }>;
}

const COULEURS: Record<string, { badge: string; border: string; title: string }> = {
  emerald: {
    badge: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    border: 'border-l-emerald-500',
    title: 'text-emerald-400',
  },
  red: {
    badge: 'border-red-500/20 bg-red-500/10 text-red-400',
    border: 'border-l-red-500',
    title: 'text-red-400',
  },
  blue: {
    badge: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
    border: 'border-l-blue-500',
    title: 'text-blue-400',
  },
  violet: {
    badge: 'border-violet-500/20 bg-violet-500/10 text-violet-400',
    border: 'border-l-violet-500',
    title: 'text-violet-400',
  },
};

function CategoryChip({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-lg px-3 py-2 text-sm transition-colors',
        active ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300',
        className
      )}
    >
      {children}
    </button>
  );
}

export function FondamentauxPage({ fiches, categories }: Props) {
  const [categorieActive, setCategorieActive] = useState<Categorie | 'all'>('all');
  const [recherche, setRecherche] = useState('');
  const [ficheOuverte, setFicheOuverte] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const fichesFiltrees = useMemo(() => {
    return fiches.filter((f) => {
      const matchCat = categorieActive === 'all' || f.categorie === categorieActive;
      const q = recherche.toLowerCase();
      const matchSearch =
        !q ||
        f.titre.toLowerCase().includes(q) ||
        f.accroche.toLowerCase().includes(q) ||
        f.regles.some((r) => r.label.toLowerCase().includes(q) || (r.detail ?? '').toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [fiches, categorieActive, recherche]);

  const fiche = fiches.find((ff) => ff.id === ficheOuverte) ?? null;

  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col bg-navy-950 lg:flex-row'>
      {/* Mobile : filtres horizontaux */}
      <div className='sticky top-16 z-20 flex gap-2 overflow-x-auto border-b border-white/10 bg-navy-950/95 px-4 py-3 backdrop-blur lg:hidden'>
        <CategoryChip active={categorieActive === 'all'} onClick={() => { setCategorieActive('all'); setFicheOuverte(null); }}>
          Toutes ({fiches.length})
        </CategoryChip>
        {(Object.entries(categories) as [Categorie, { label: string; couleur: string }][]).map(([key, val]) => {
          const count = fiches.filter((fi) => fi.categorie === key).length;
          const c = COULEURS[val.couleur];
          return (
            <CategoryChip
              key={key}
              active={categorieActive === key}
              onClick={() => { setCategorieActive(key); setFicheOuverte(null); }}
              className={categorieActive === key ? c.title : undefined}
            >
              {val.label} ({count})
            </CategoryChip>
          );
        })}
      </div>

      {/* Desktop sidebar */}
      <aside className='hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col gap-1 overflow-y-auto border-r border-white/10 bg-navy-950 py-6 pl-4 pr-3 lg:sticky lg:top-16'>
        <p className='mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-600'>Catégories</p>

        <button
          type='button'
          onClick={() => { setCategorieActive('all'); setFicheOuverte(null); }}
          className={cn(
            'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors',
            categorieActive === 'all' ? 'bg-white/10 text-gray-100' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
          )}
        >
          <span>Toutes les fiches</span>
          <span className='text-xs text-gray-600'>{fiches.length}</span>
        </button>

        {(Object.entries(categories) as [Categorie, { label: string; couleur: string }][]).map(([key, val]) => {
          const count = fiches.filter((fi) => fi.categorie === key).length;
          const c = COULEURS[val.couleur];
          return (
            <button
              type='button'
              key={key}
              onClick={() => { setCategorieActive(key); setFicheOuverte(null); }}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors',
                categorieActive === key ? cn('bg-white/10', c.title) : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              )}
            >
              <span>{val.label}</span>
              <span className='text-xs text-gray-600'>{count}</span>
            </button>
          );
        })}

        <div className='mt-6 border-t border-white/10 pt-6'>
          <p className='mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-600'>Aller aux épreuves</p>
          {[
            { href: '/epreuves/epreuve-1', label: 'Épreuve 1 — DPG/DPS' },
            { href: '/epreuves/epreuve-2', label: 'Épreuve 2 — Procédure' },
            { href: '/epreuves/epreuve-3', label: 'Épreuve 3 — Oral' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className='block rounded-lg px-3 py-2 text-xs text-gray-600 transition-colors hover:bg-white/5 hover:text-gray-400'
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p className='mt-4 px-2 text-[11px] text-gray-600'>
          <Link href='/guide-revision-opj' className='text-cyan-400/90 underline-offset-2 hover:underline'>
            Guide de révision complet
          </Link>
        </p>
      </aside>

      <main ref={mainRef} className='min-h-0 flex-1 overflow-y-auto'>
        <div className='sticky top-16 z-10 flex items-center gap-4 border-b border-white/10 bg-navy-950/95 px-4 py-4 backdrop-blur sm:px-8'>
          <div className='min-w-0 flex-1'>
            <h1 className='text-lg font-semibold text-gray-100'>{fiche ? fiche.titre : 'Fondamentaux OPJ'}</h1>
            {!fiche ? (
              <p className='mt-0.5 text-xs text-gray-500'>
                {fichesFiltrees.length} fiche{fichesFiltrees.length > 1 ? 's' : ''} · Notions essentielles pour l&apos;examen
                Juin 2026
              </p>
            ) : null}
          </div>
          {fiche ? (
            <button
              type='button'
              onClick={() => setFicheOuverte(null)}
              className='shrink-0 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-gray-500 transition-colors hover:text-gray-300'
            >
              ← Retour aux fiches
            </button>
          ) : (
            <div className='relative shrink-0'>
              <input
                type='search'
                placeholder='Rechercher…'
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className='w-full min-w-[10rem] rounded-lg border border-white/15 bg-white/5 pl-8 pr-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-gold-500/40 focus:outline-none sm:w-56'
              />
              <span className='pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-600'>⌕</span>
            </div>
          )}
        </div>

        <div className='p-4 sm:p-8'>
          {!fiche ? (
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2'>
              {fichesFiltrees.map((fi) => {
                const cat = categories[fi.categorie];
                const c = COULEURS[cat.couleur];
                const alertCount = fi.regles.filter((r) => r.alerte).length;
                return (
                  <button
                    type='button'
                    key={fi.id}
                    onClick={() => { setFicheOuverte(fi.id); mainRef.current?.scrollTo(0, 0); }}
                    className={cn(
                      'group rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all hover:border-white/20 hover:bg-white/[0.05]',
                      'border-l-2',
                      c.border
                    )}
                  >
                    <div className='mb-2 flex items-start justify-between gap-3'>
                      <span
                        className={cn('rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest', c.badge)}
                      >
                        {cat.label}
                      </span>
                      {alertCount > 0 ? (
                        <span className='rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400'>
                          ⚠ {alertCount} point{alertCount > 1 ? 's' : ''} clé{alertCount > 1 ? 's' : ''}
                        </span>
                      ) : null}
                    </div>
                    <h3 className='mb-1.5 text-sm font-semibold leading-snug text-gray-100 group-hover:text-white'>{fi.titre}</h3>
                    <p className='line-clamp-2 text-xs leading-relaxed text-gray-500'>{fi.accroche}</p>
                    <p className='mt-3 font-mono text-[10px] text-gray-700'>{fi.source}</p>
                  </button>
                );
              })}
              {fichesFiltrees.length === 0 ? (
                <div className='col-span-2 py-16 text-center text-gray-500'>Aucune fiche pour « {recherche} »</div>
              ) : null}
            </div>
          ) : null}

          {fiche ? (
            <div className='mx-auto max-w-3xl'>
              {(() => {
                const cat = categories[fiche.categorie];
                const c = COULEURS[cat.couleur];
                return (
                  <>
                    <div className={`mb-8 flex items-start gap-4 border-b border-white/10 pb-8`}>
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-sm',
                          c.badge
                        )}
                      >
                        F
                      </div>
                      <div>
                        <span className={cn('text-[10px] font-bold uppercase tracking-widest', c.title)}>
                          {cat.label} · {fiche.source}
                        </span>
                        <h2 className='mt-1 text-2xl font-bold leading-tight text-gray-100'>{fiche.titre}</h2>
                        <p className='mt-2 text-sm leading-relaxed text-gray-400'>{fiche.accroche}</p>
                      </div>
                    </div>

                    <div className='mb-8 flex flex-wrap gap-2'>
                      {fiche.lienFascicule ? (
                        <Link
                          href={fiche.lienFascicule}
                          className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-white/25 hover:text-gray-100'
                        >
                          Fascicule complet
                        </Link>
                      ) : null}
                      {fiche.lienQuiz ? (
                        <Link
                          href={fiche.lienQuiz}
                          className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-white/25 hover:text-gray-100'
                        >
                          Quiz associé
                        </Link>
                      ) : null}
                    </div>

                    <div className='mb-8 space-y-3'>
                      <h3 className='text-xs font-bold uppercase tracking-widest text-gray-500'>Points clés</h3>
                      {fiche.regles.map((regle, i) => (
                        <div
                          key={`${regle.label}-${i}`}
                          className={cn(
                            'rounded-xl border p-4',
                            regle.alerte ? 'border-amber-500/25 bg-amber-500/5' : 'border-white/10 bg-white/[0.03]'
                          )}
                        >
                          <div className='flex items-start gap-3'>
                            <span
                              className={cn(
                                'text-sm font-semibold leading-snug',
                                regle.alerte ? 'text-amber-300' : 'text-gray-100'
                              )}
                            >
                              {regle.label}
                            </span>
                            {regle.article ? (
                              <span className='ml-auto shrink-0 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-gray-600'>
                                {regle.article}
                              </span>
                            ) : null}
                          </div>
                          {regle.detail ? (
                            <p
                              className={cn(
                                'mt-2 text-sm leading-relaxed',
                                regle.alerte ? 'text-amber-200/80' : 'text-gray-400'
                              )}
                            >
                              {regle.detail}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    {fiche.tableau ? (
                      <div className='mb-8'>
                        <h3 className='mb-3 text-xs font-bold uppercase tracking-widest text-gray-500'>Tableau récapitulatif</h3>
                        <div className='overflow-x-auto rounded-xl border border-white/10'>
                          <table className='w-full text-sm'>
                            <thead>
                              <tr className='border-b border-white/10'>
                                {fiche.tableau.colonnes.map((col, i) => (
                                  <th
                                    key={i}
                                    className='bg-white/[0.05] px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500'
                                  >
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {fiche.tableau.lignes.map((ligne, i) => (
                                <tr key={i} className={cn('border-b border-white/5', i % 2 === 0 ? 'bg-white/[0.02]' : '')}>
                                  {ligne.map((cell, j) => (
                                    <td
                                      key={j}
                                      className={cn(
                                        'px-4 py-3 text-xs',
                                        j === 0 ? 'font-medium text-gray-200' : 'text-gray-400'
                                      )}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}

                    <div className='flex justify-between border-t border-white/10 pt-8'>
                      {(() => {
                        const idx = fichesFiltrees.findIndex((x) => x.id === fiche.id);
                        const prev = fichesFiltrees[idx - 1];
                        const next = fichesFiltrees[idx + 1];
                        return (
                          <>
                            {prev ? (
                              <button
                                type='button'
                                onClick={() => setFicheOuverte(prev.id)}
                                className='max-w-[45%] text-left text-xs text-gray-500 transition-colors hover:text-gray-300'
                              >
                                ← {prev.titre}
                              </button>
                            ) : (
                              <span />
                            )}
                            {next ? (
                              <button
                                type='button'
                                onClick={() => setFicheOuverte(next.id)}
                                className='max-w-[45%] text-right text-xs text-gray-500 transition-colors hover:text-gray-300'
                              >
                                {next.titre} →
                              </button>
                            ) : (
                              <span />
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
