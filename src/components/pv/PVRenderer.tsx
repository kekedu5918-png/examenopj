'use client';

import { type ReactNode,useCallback, useId, useState } from 'react';
import Link from 'next/link';
import { ClipboardCopy, Moon, Printer, Sun } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { modelePVToPlainText } from '@/lib/modele-pv-plaintext';
import type { ModelePV, PVBloc } from '@/types/pv';
import { cn } from '@/utils/cn';

type Theme = 'light' | 'dark';

function renderCorpsBloc(b: PVBloc, i: number, theme: Theme): ReactNode {
  const mono = 'font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace]';
  const textMain =
    theme === 'light' ? 'text-gray-900' : 'text-[#F0F0F5]';
  const muted = theme === 'light' ? 'text-gray-600' : 'text-examen-inkMuted';

  switch (b.type) {
    case 'rubrique-numerotee':
      return (
        <div key={i} className={cn('mt-4 flex gap-3 text-sm leading-[1.8]', mono, textMain)}>
          <span className='mt-0.5 shrink-0 font-bold tabular-nums text-examen-accent'>{b.numero}.</span>
          <p className='min-w-0 flex-1 whitespace-pre-wrap'>{b.texte}</p>
        </div>
      );
    case 'paragraphe':
    case 'suite':
      return (
        <p key={i} className={cn('mt-4 whitespace-pre-wrap pl-8 text-sm leading-[1.8]', mono, textMain)}>
          {b.texte}
        </p>
      );
    case 'signature':
      return (
        <div
          key={i}
          className={cn('mt-10 flex flex-wrap justify-between gap-8 text-sm italic', theme === 'light' ? 'font-serif text-gray-800' : 'font-serif text-[#F0F0F5]/95')}
        >
          {b.signataires.map((s) => (
            <div key={s} className='flex min-w-[140px] flex-1 flex-col items-center text-center'>
              <span className='w-full border-b border-dotted border-current pb-8'>………………………………</span>
              <span className='mt-2'>{s}</span>
            </div>
          ))}
        </div>
      );
    case 'annexe':
      return (
        <div key={i} className='relative mt-6 pl-6'>
          <span className='absolute left-0 top-0 rounded-md bg-examen-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-examen-accent'>
            Annexe
          </span>
          <p className={cn('whitespace-pre-wrap pl-2 text-sm leading-[1.8]', mono, textMain)}>{b.texte}</p>
        </div>
      );
    case 'mention':
      return (
        <div key={i} className='relative mt-6 pl-16'>
          <span className={cn('absolute left-6 top-1 text-xs font-semibold', muted)} aria-hidden>
            ·
          </span>
          <p className={cn('whitespace-pre-wrap text-sm leading-[1.8]', mono, textMain)}>{b.texte}</p>
        </div>
      );
    default:
      return null;
  }
}

type Props = {
  modele: ModelePV;
  variant?: 'page' | 'embed';
  /** Si false (ex. aperçu Premium verrouillé), masque la barre d’actions fixe. */
  canCopyFull?: boolean;
  className?: string;
};

export function PVRenderer({ modele, variant = 'page', canCopyFull = true, className }: Props) {
  const notesId = useId();
  const [theme, setTheme] = useState<Theme>('dark');

  const paper =
    theme === 'light'
      ? 'border-gray-200 bg-white text-gray-900 shadow-sm'
      : 'border-white/[0.12] bg-[#0D0D14] text-[#F0F0F5]';

  const copyText = useCallback(async () => {
    if (!canCopyFull) return;
    try {
      await navigator.clipboard.writeText(modelePVToPlainText(modele));
    } catch {
      /* ignore */
    }
  }, [canCopyFull, modele]);

  const printPv = useCallback(() => {
    window.print();
  }, []);

  const trainHref = `/entrainement/redaction-pv?modele=${encodeURIComponent(modele.id)}`;

  return (
    <div className={cn('relative', className)}>
      <div className='mb-4 flex justify-end gap-2 print:hidden'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          className='border-white/[0.12] bg-white/[0.04] text-examen-ink'
          aria-label={theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
        >
          {theme === 'light' ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
        </Button>
      </div>

      <div
        className={cn(
          'overflow-hidden rounded-2xl border',
          paper,
        )}
      >
        <div className='relative'>
          {/* Colonne marge gauche (sticky desktop) */}
          <div
            className={cn(
              'pointer-events-none absolute left-0 top-0 z-[1] hidden w-[120px] pl-3 pt-4 text-xs leading-snug text-[#4F6EF7] lg:pointer-events-auto lg:block lg:sticky lg:top-24 lg:self-start lg:pt-6',
            )}
            aria-hidden={false}
          >
            <div className='font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace]'>
              {modele.cartouche.marginGauche.map((line, li) => (
                <p key={`${line}-${li}`} className={line === '' ? 'h-2' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className='min-w-0 pl-0 lg:pl-[128px]'>
            {/* Cartouche bicolone */}
            <div className='grid grid-cols-1 border-b border-white/10 md:grid-cols-[35%_1fr]'>
              <div
                className={cn(
                  'space-y-0 border-b px-4 py-5 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs uppercase leading-relaxed tracking-wide md:border-b-0 md:border-r',
                  theme === 'light' ? 'bg-slate-100/90 text-gray-700 md:border-gray-200' : 'bg-white/[0.06] text-examen-inkMuted md:border-white/20',
                )}
              >
                {modele.cartouche.enteteGauche.map((line, li) => (
                  <p key={`eg-${li}`}>{line}</p>
                ))}
              </div>
              <div
                className={cn(
                  'space-y-2 px-4 py-5 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs leading-relaxed md:text-sm md:leading-relaxed',
                  theme === 'light' ? 'text-gray-900' : 'text-[#F0F0F5]',
                )}
              >
                <p className='text-center text-sm font-bold uppercase tracking-wide'>
                  {modele.cartouche.enteteDroit[0]}
                </p>
                {modele.cartouche.enteteDroit.slice(1).map((line, li) => (
                  <p key={`ed-${li}`} className={line === '' ? 'h-2' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Marge mobile (au-dessus du corps) */}
            <div className='border-b border-white/10 px-4 py-4 text-xs leading-snug text-[#4F6EF7] lg:hidden'>
              <div className='font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace]'>
                {modele.cartouche.marginGauche.map((line, li) => (
                  <p key={`m-${li}`} className={line === '' ? 'h-2' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className='px-4 py-6 md:px-8 md:py-10'>
              {modele.corps.map((b, i) => renderCorpsBloc(b, i, theme))}

              <p
                className={cn(
                  'mt-8 border-t border-white/10 pt-4 text-[11px] leading-relaxed',
                  theme === 'light' ? 'text-gray-500' : 'text-examen-inkMuted',
                )}
              >
                Source : {modele.source}
              </p>
            </div>
          </div>
        </div>
      </div>

      {modele.notesPedagogiques?.length ? (
        <div
          id={notesId}
          className='mt-8 rounded-xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/5 p-4 print:hidden'
        >
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='notes' className='border-0'>
              <AccordionTrigger className='py-2 text-left font-semibold text-white hover:no-underline'>
                💡 Notes pédagogiques
              </AccordionTrigger>
              <AccordionContent>
                <ol className='mt-2 list-decimal space-y-2 pl-5 text-sm text-examen-ink'>
                  {modele.notesPedagogiques.map((n, i) => (
                    <li key={i} className='leading-relaxed'>
                      {n}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : null}

      {variant === 'page' && canCopyFull ? (
        <div
          className={cn(
            'fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 border-t border-white/[0.06] bg-[#111118]/90 px-4 py-3 backdrop-blur-md print:hidden md:flex-row md:flex-wrap md:justify-center',
          )}
        >
          <Button
            type='button'
            onClick={() => void copyText()}
            disabled={!canCopyFull}
            className={cn(!canCopyFull && 'cursor-not-allowed opacity-50')}
          >
            <ClipboardCopy className='mr-2 h-4 w-4' aria-hidden />
            📋 Copier le texte brut
          </Button>
          <Button type='button' variant='secondary' onClick={printPv}>
            <Printer className='mr-2 h-4 w-4' aria-hidden />
            🖨️ Imprimer
          </Button>
          <Button type='button' variant='outline' asChild className='border-examen-premium/35 bg-examen-premium/10'>
            <Link href={trainHref}>✏️ S&apos;entraîner avec ce modèle →</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
