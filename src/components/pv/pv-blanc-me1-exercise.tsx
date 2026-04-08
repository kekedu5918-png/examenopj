'use client';

import { useCallback, useEffect, useState } from 'react';

import { PVMe1DocumentShell } from '@/components/pv/pv-me1-document-shell';
import { useToast } from '@/components/ui/use-toast';
import { ME1_PV_BLANC_LEFT, ME1_PV_BLANC_RIGHT } from '@/data/pv-me1-plainte-exemple4';

const STORAGE_KEY = 'examenopj-pv-me1-blanc-v1';

const colClass =
  'min-h-[280px] w-full resize-y bg-transparent font-mono text-[11px] leading-relaxed text-gray-100 placeholder:text-slate-600 focus:border-0 focus:outline-none focus:ring-0 md:min-h-[520px]';

/**
 * Feuille type ME1 (marge + filet + en-têtes) : intérieur entièrement libre pour répéter tout type de PV.
 */
export function PVBlancMe1Exercise() {
  const { toast } = useToast();
  const [hydrated, setHydrated] = useState(false);
  const [leftDoc, setLeftDoc] = useState(ME1_PV_BLANC_LEFT);
  const [rightDoc, setRightDoc] = useState(ME1_PV_BLANC_RIGHT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const j = JSON.parse(raw) as { left?: string; right?: string };
        if (typeof j.left === 'string') setLeftDoc(j.left);
        if (typeof j.right === 'string') setRightDoc(j.right);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: leftDoc, right: rightDoc }));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [hydrated, leftDoc, rightDoc]);

  const fullDoc = `${leftDoc}\n\n— — —\n\n${rightDoc}`;

  const resetBlank = useCallback(() => {
    setLeftDoc(ME1_PV_BLANC_LEFT);
    setRightDoc(ME1_PV_BLANC_RIGHT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    toast({ title: 'Gabarit réinitialisé', description: 'En-tête et marge type ME1 uniquement.' });
  }, [toast]);

  const copyFull = useCallback(() => {
    void navigator.clipboard.writeText(fullDoc).then(
      () => toast({ title: 'Copié', description: 'Marge + bloc principal.' }),
      () => toast({ title: 'Échec', description: 'Copie manuelle.', variant: 'destructive' }),
    );
  }, [fullDoc, toast]);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-4 print:hidden sm:flex-row sm:flex-wrap sm:items-center'>
        <p className='max-w-2xl text-xs text-slate-300'>
          Entraînement : même structure visuelle que le ME1 (colonnes). Aucun modèle de procès-verbal imposé — rédigez le corps comme pour une GAV, une audition, une plainte, etc.
        </p>
        <div className='flex flex-wrap gap-2 sm:ml-auto'>
          <button
            type='button'
            onClick={copyFull}
            className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
          >
            Copier tout
          </button>
          <button
            type='button'
            onClick={resetBlank}
            className='rounded-lg border border-rose-500/35 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-500/20'
          >
            Réinitialiser le gabarit
          </button>
        </div>
        {!hydrated ? (
          <span className='text-[11px] text-slate-600'>Chargement du brouillon…</span>
        ) : (
          <span className='text-[11px] text-slate-600'>Brouillon sauvegardé localement.</span>
        )}
      </div>

      <div className='max-h-[min(78vh,940px)] overflow-auto print:max-h-none'>
        <PVMe1DocumentShell
          plain
          left={
            <textarea
              value={leftDoc}
              onChange={(e) => setLeftDoc(e.target.value)}
              className={colClass}
              spellCheck={false}
              autoComplete='off'
              aria-label='Marge gauche — en-tête type ME1'
            />
          }
          right={
            <textarea
              value={rightDoc}
              onChange={(e) => setRightDoc(e.target.value)}
              className={colClass}
              spellCheck={false}
              autoComplete='off'
              aria-label='Bloc principal — rédaction libre du PV'
            />
          }
        />
      </div>
    </div>
  );
}
