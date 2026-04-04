'use client';

import Link from 'next/link';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { COULEURS } from './fondamentaux-theme';
import { FondamentauxFicheIcon } from './FondamentauxFicheIcon';
import { FondamentauxTableau } from './FondamentauxTableau';

interface Props {
  fiche: Fiche | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Record<Categorie, { label: string; couleur: string }>;
  /** Restaurer le focus après fermeture (ex. la card cliquée). */
  returnFocusRef: React.MutableRefObject<HTMLElement | null>;
}

export function FondamentauxDrawer({
  fiche,
  open,
  onOpenChange,
  categories,
  returnFocusRef,
}: Props) {
  if (!fiche) {
    return null;
  }

  const cat = categories[fiche.categorie];
  const c = COULEURS[cat.couleur];
  const titleId = `fondamentaux-fiche-title-${fiche.id}`;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/75 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
        <Dialog.Content
          aria-labelledby={titleId}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusRef.current?.focus();
            returnFocusRef.current = null;
          }}
          className={cn(
            'fixed z-50 flex flex-col bg-navy-950 shadow-2xl outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-300',
            /* Mobile : plein écran */
            'inset-0 h-[100dvh] w-full max-w-full overflow-hidden rounded-none border-0 p-0',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            /* Desktop : panneau droit */
            'md:inset-y-0 md:left-auto md:right-0 md:h-full md:max-h-none md:w-full md:max-w-2xl md:rounded-l-xl md:border-l md:border-white/10',
            'md:data-[state=closed]:slide-out-to-right md:data-[state=open]:slide-in-from-right'
          )}
        >
          <div className='flex h-full min-h-0 flex-col'>
            <div className='flex shrink-0 justify-end border-b border-white/10 px-4 py-3 md:px-6 md:py-4'>
              <Dialog.Close
                type='button'
                className='inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 md:border-transparent md:bg-transparent md:px-2 md:py-2 md:text-slate-400 md:hover:text-white'
                aria-label='Fermer'
              >
                <Cross2Icon className='h-5 w-5 shrink-0' />
                <span className='md:sr-only'>Fermer</span>
              </Dialog.Close>
            </div>

            <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 md:px-8 md:pb-8'>
              <header className='mb-8 flex gap-4 border-b border-white/10 pb-8'>
                <div
                  className={cn(
                    'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border',
                    c.badge
                  )}
                  aria-hidden
                >
                  <FondamentauxFicheIcon ficheId={fiche.id} className='h-7 w-7' />
                </div>
                <div className='min-w-0 flex-1'>
                  <span className={cn('inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest', c.badge)}>
                    {cat.label}
                  </span>
                  <Dialog.Title asChild>
                    <h2 id={titleId} className='mt-3 text-xl font-bold leading-tight text-white sm:text-2xl'>
                      {fiche.titre}
                    </h2>
                  </Dialog.Title>
                  <p className='mt-2 text-xs text-slate-500'>{fiche.source}</p>
                </div>
              </header>

              <blockquote
                className={cn(
                  'mb-10 border-l-4 pl-4 text-sm italic leading-relaxed text-slate-300 sm:text-base',
                  c.borderLeft
                )}
              >
                {fiche.accroche}
              </blockquote>

              <section className='mb-10' aria-label='Points clés'>
                <h3 className='mb-4 text-xs font-bold uppercase tracking-widest text-slate-500'>Règles et points clés</h3>
                <div className='space-y-4'>
                  {fiche.regles.map((regle, i) => (
                    <div
                      key={`${regle.label}-${i}`}
                      className={cn(
                        'rounded-xl border p-4 sm:p-5',
                        regle.alerte
                          ? 'border-l-4 border-amber-500/70 bg-amber-950/20'
                          : 'border-white/10 bg-white/[0.03]'
                      )}
                    >
                      <div className='flex flex-wrap items-start justify-between gap-2'>
                        <h4
                          className={cn(
                            'text-sm font-semibold leading-snug sm:text-base',
                            regle.alerte ? 'text-amber-200' : 'text-white'
                          )}
                        >
                          {regle.label}
                        </h4>
                        {regle.article ? (
                          <span className='shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400'>
                            {regle.article}
                          </span>
                        ) : null}
                      </div>
                      {regle.detail ? (
                        <p
                          className={cn(
                            'mt-3 text-sm leading-relaxed',
                            regle.alerte ? 'text-amber-100/90' : 'text-slate-400'
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
                <section className='mb-10' aria-label='Tableau comparatif'>
                  <h3 className='mb-4 text-xs font-bold uppercase tracking-widest text-slate-500'>Tableau comparatif</h3>
                  <FondamentauxTableau tableau={fiche.tableau} couleurKey={cat.couleur} />
                </section>
              ) : null}
            </div>

            <footer className='shrink-0 border-t border-white/10 bg-navy-950/95 px-4 py-4 md:px-8'>
              <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3'>
                {fiche.lienQuiz ? (
                  <Link
                    href={fiche.lienQuiz}
                    className={cn(
                      'inline-flex flex-1 items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none',
                      c.outlineBtn
                    )}
                  >
                    Quiz sur ce thème →
                  </Link>
                ) : null}
                {fiche.lienFascicule ? (
                  <Link
                    href={fiche.lienFascicule}
                    className={cn(
                      'inline-flex flex-1 items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none',
                      c.outlineBtn
                    )}
                  >
                    Voir le module de cours →
                  </Link>
                ) : null}
              </div>
            </footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
