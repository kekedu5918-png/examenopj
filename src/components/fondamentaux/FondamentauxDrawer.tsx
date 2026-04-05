'use client';

import Link from 'next/link';

import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { COULEURS, DRAWER_MODULE_BTN } from './fondamentaux-theme';
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
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/65 backdrop-blur-[2px]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />
        <Dialog.Content
          aria-labelledby={titleId}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusRef.current?.focus();
            returnFocusRef.current = null;
          }}
          className={cn(
            'fixed z-50 flex flex-col overflow-hidden bg-[#0b1118] shadow-[-12px_0_48px_rgba(0,0,0,0.45)] outline-none',
            'ring-1 ring-white/[0.06]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-300',
            'inset-0 h-[100dvh] w-full max-w-full rounded-none border-0 p-0',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            /* Panneau droit type maquette ~40 % écran, plafonné */
            'md:inset-y-0 md:left-auto md:right-0 md:h-full md:max-h-none md:w-[min(40vw,32rem)] md:min-w-[340px] md:max-w-xl',
            'md:rounded-l-2xl md:border-l md:border-white/10',
            'md:data-[state=closed]:slide-out-to-right md:data-[state=open]:slide-in-from-right'
          )}
        >
          <div className='flex h-full min-h-0 flex-col'>
            {/* En-tête : fermeture en haut à droite + icône & titres (comme la maquette) */}
            <header className='relative shrink-0 border-b border-white/10 px-5 pb-6 pt-5 md:px-7 md:pt-6'>
              <Dialog.Close
                type='button'
                className={cn(
                  'absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl',
                  'text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/50'
                )}
                aria-label='Fermer'
              >
                <Cross2Icon className='h-5 w-5' />
              </Dialog.Close>

              <div className='flex gap-4 pr-11'>
                <div
                  className={cn(
                    'flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-xl border shadow-inner shadow-black/20',
                    c.badge
                  )}
                  aria-hidden
                >
                  <FondamentauxFicheIcon ficheId={fiche.id} className='h-7 w-7 text-current opacity-90' />
                </div>
                <div className='min-w-0 flex-1 pt-0.5'>
                  <span
                    className={cn(
                      'inline-block text-[10px] font-bold uppercase tracking-[0.2em]',
                      c.title
                    )}
                  >
                    {cat.label}
                  </span>
                  <Dialog.Title asChild>
                    <h2
                      id={titleId}
                      className='mt-2.5 text-xl font-bold leading-snug tracking-tight text-white sm:text-[1.35rem]'
                    >
                      {fiche.titre}
                    </h2>
                  </Dialog.Title>
                  <p className='mt-2 font-mono text-[11px] leading-relaxed text-slate-500 sm:text-xs'>
                    {fiche.source}
                  </p>
                </div>
              </div>
            </header>

            <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 md:px-7 md:pb-8'>
              {/* Accroche : bandeau vertical épais + fond teinté */}
              <blockquote
                className={cn(
                  'mb-9 rounded-r-lg py-4 pl-5 pr-4 text-sm italic leading-relaxed text-slate-200/95 sm:text-[15px] sm:leading-relaxed',
                  c.drawerIntro
                )}
              >
                {fiche.accroche}
              </blockquote>

              <section className='mb-10' aria-label='Points clés'>
                <h3 className='mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500'>
                  Règles et points clés
                </h3>
                <div className='space-y-3.5'>
                  {fiche.regles.map((regle, i) => (
                    <div
                      key={`${regle.label}-${i}`}
                      className={cn(
                        'rounded-xl p-4 sm:p-5',
                        regle.alerte
                          ? cn(
                              'border border-amber-500/45 bg-amber-950/[0.22] shadow-[inset_0_1px_0_0_rgba(251,191,36,0.08)]'
                            )
                          : cn(
                              'border border-white/[0.08] bg-[#0c1219] shadow-sm shadow-black/20',
                              'hover:border-white/[0.11] transition-[border-color,box-shadow] duration-200'
                            )
                      )}
                    >
                      <div className='flex flex-wrap items-start justify-between gap-2 gap-y-1'>
                        <h4
                          className={cn(
                            'pr-2 text-[15px] font-semibold leading-snug sm:text-base',
                            regle.alerte ? 'text-amber-100' : 'text-white'
                          )}
                        >
                          {regle.label}
                        </h4>
                        {regle.article ? (
                          <span className='shrink-0 rounded-lg border border-white/10 bg-black/25 px-2 py-1 font-mono text-[10px] leading-none text-slate-400'>
                            {regle.article}
                          </span>
                        ) : null}
                      </div>
                      {regle.detail ? (
                        <p
                          className={cn(
                            'mt-3 text-sm leading-[1.65]',
                            regle.alerte ? 'text-amber-50/90' : 'text-slate-400'
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
                <section className='mb-6' aria-label='Tableau comparatif'>
                  <h3 className='mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500'>
                    Tableau comparatif
                  </h3>
                  <FondamentauxTableau tableau={fiche.tableau} couleurKey={cat.couleur} />
                </section>
              ) : null}
            </div>

            {/* Pied fixe : quiz accent catégorie, module neutre */}
            <footer
              className={cn(
                'shrink-0 border-t border-white/10 px-5 py-4 md:px-7',
                'bg-[#0b1118]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0b1118]/85'
              )}
            >
              <div className='flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3'>
                {fiche.lienQuiz ? (
                  <Link
                    href={fiche.lienQuiz}
                    className={cn(
                      'inline-flex flex-1 items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-colors',
                      c.outlineBtn
                    )}
                  >
                    Quiz sur ce thème →
                  </Link>
                ) : null}
                {fiche.lienModule ? (
                  <Link
                    href={fiche.lienModule}
                    className={cn(
                      'inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                      DRAWER_MODULE_BTN
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
