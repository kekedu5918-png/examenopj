'use client';

import Link from 'next/link';
import { ClipboardCopy, PenLine, Printer } from 'lucide-react';

import { modelePVToPlainText } from '@/lib/modele-pv-plaintext';
import type { ModelePV } from '@/types/pv';
import { cn } from '@/utils/cn';

type Props = {
  modele: ModelePV;
  canCopyFull: boolean;
};

export function ModelePVStickyActions({ modele, canCopyFull }: Props) {
  async function copy() {
    if (!canCopyFull) return;
    const text = modelePVToPlainText(modele);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  }

  function printPv() {
    window.print();
  }

  const trainHref = `/entrainement/redaction-pv?modele=${encodeURIComponent(modele.id)}`;

  return (
    <div
      className={cn(
        'flex flex-col gap-2 border-t border-white/[0.08] bg-examen-canvas/95 px-4 py-3 backdrop-blur-md md:flex-row md:flex-wrap md:justify-center md:rounded-xl md:border md:border-white/[0.08] md:py-3 print:hidden',
        'fixed inset-x-0 bottom-0 z-40 md:static md:mt-8',
      )}
    >
      <button
        type='button'
        onClick={() => void copy()}
        disabled={!canCopyFull}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition',
          canCopyFull
            ? 'bg-examen-accent text-white hover:bg-examen-accentHover'
            : 'cursor-not-allowed bg-white/[0.06] text-examen-inkMuted',
        )}
      >
        <ClipboardCopy className='h-4 w-4' aria-hidden />
        Copier le modèle
      </button>
      <button
        type='button'
        onClick={printPv}
        className='inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-examen-ink transition hover:bg-white/[0.07]'
      >
        <Printer className='h-4 w-4' aria-hidden />
        Imprimer
      </button>
      <Link
        href={trainHref}
        className='inline-flex items-center justify-center gap-2 rounded-lg border border-examen-premium/35 bg-examen-premium/15 px-4 py-3 text-sm font-semibold text-violet-100 transition hover:bg-examen-premium/25'
      >
        <PenLine className='h-4 w-4' aria-hidden />
        S&apos;entraîner avec ce PV
      </Link>
    </div>
  );
}
