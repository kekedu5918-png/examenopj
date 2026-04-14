'use client';

import { useCallback } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  ME1_MENTIONS_MARGINALES_TYPES,
  ME1_PARTIES_PROC_VERBAL,
  ME1_PV_BLOC_DROIT_EX4,
  ME1_PV_BLOC_DROIT_EX5,
  ME1_PV_ENTETE_GAUCHE_EX4,
  ME1_SOURCE_LABEL,
} from '@/data/pv-me1-plainte-exemple4';
import { cn } from '@/utils/cn';

const preClass =
  'whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-gray-200 print:text-[10px] print:text-black';

const colShell =
  'border-b border-gray-600 bg-[#0a0f16] print:border-black print:bg-white md:border-b-0 md:border-r';

function escapeForPrint(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function printTwoColumns(
  left: string,
  right: string,
  toast: (p: { title: string; description?: string; variant?: 'destructive' }) => void,
) {
  const w = typeof window !== 'undefined' ? window.open('', '_blank') : null;
  if (!w) {
    toast({ title: 'Impression', description: 'Autorisez les pop-ups ou utilisez l’impression du navigateur (Ctrl+P).', variant: 'destructive' });
    return;
  }
  w.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><title>PV ME1</title><style>
    body{margin:0;padding:14px;font:11px ui-monospace,Courier,monospace;background:#fff;color:#000}
    table{border-collapse:collapse;width:100%;table-layout:fixed}
    td{vertical-align:top;border:1px solid #000;padding:12px;box-sizing:border-box}
    .col-gauche{width:28%}
    pre{white-space:pre-wrap;margin:0;font:inherit;line-height:1.35}
  </style></head><body><table><tr><td class="col-gauche"><pre>${escapeForPrint(left)}</pre></td><td><pre>${escapeForPrint(right)}</pre></td></tr></table></body></html>`);
  w.document.close();
  w.focus();
  w.print();
  w.close();
}

function TwoColumnPV({ left, right }: { left: string; right: string }) {
  return (
    <div className='flex flex-col overflow-hidden rounded-none border border-gray-600 print:break-inside-avoid print:border-black md:flex-row'>
      <div className={cn('shrink-0 p-4 md:w-[min(100%,280px)]', colShell)}>
        <pre className={preClass}>{left}</pre>
      </div>
      <div className='min-w-0 flex-1 border-gray-600 bg-[#080c12] p-4 print:border-l print:border-black print:bg-white md:border-l-0'>
        <pre className={preClass}>{right}</pre>
      </div>
    </div>
  );
}

const tabTrig =
  'rounded-lg px-2.5 py-1.5 text-[11px] data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 sm:px-3 sm:text-xs';

export function PVMe1VerbatimPlainte() {
  const { toast } = useToast();

  const copyText = useCallback(
    (label: string, text: string) => {
      void navigator.clipboard.writeText(text).then(
        () => toast({ title: 'Copié', description: `${label} — prêt à coller.` }),
        () => toast({ title: 'Copie impossible', description: 'Autorisez le presse-papiers ou copiez manuellement.', variant: 'destructive' }),
      );
    },
    [toast],
  );

  const fullEx4 = `${ME1_PV_ENTETE_GAUCHE_EX4}\n\n-----\n\n${ME1_PV_BLOC_DROIT_EX4}`;
  const fullEx5 = `${ME1_PV_ENTETE_GAUCHE_EX4}\n\n-----\n\n${ME1_PV_BLOC_DROIT_EX5}`;

  return (
    <div className='space-y-8'>
      <p className='text-xs leading-relaxed text-slate-500'>{ME1_SOURCE_LABEL}</p>

      <div className='rounded-xl border border-white/10 bg-white/[0.03] p-4'>
        <h3 className='text-xs font-bold uppercase tracking-wide text-slate-400'>Structure du PV (rappel ME1)</h3>
        <ol className='mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300'>
          {ME1_PARTIES_PROC_VERBAL.map((p) => (
            <li key={p.titre}>
              <span className='font-semibold text-white'>{p.titre}</span> — <span className='text-slate-400'>{p.detail}</span>
            </li>
          ))}
        </ol>
      </div>

      <Tabs defaultValue='ex4' className='w-full'>
        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <TabsList className='flex h-auto min-h-0 w-full flex-wrap justify-start gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 sm:w-auto'>
            <TabsTrigger value='marges' className={tabTrig}>
              Mentions marginales
            </TabsTrigger>
            <TabsTrigger value='ex4' className={tabTrig}>
              Ex. 4 — Interprète
            </TabsTrigger>
            <TabsTrigger value='ex5' className={tabTrig}>
              Ex. 5 — Représentant
            </TabsTrigger>
          </TabsList>
          <p className='text-[11px] text-slate-500 print:hidden'>
            Astuce : boutons <strong className='text-slate-400'>Copier</strong> ou imprimer une fenêtre dédiée (mise en page sobre).
          </p>
        </div>

        <TabsContent value='marges' className='focus-visible:outline-none'>
          <div className='mb-3 flex flex-wrap gap-2 print:hidden'>
            <button
              type='button'
              onClick={() => copyText('Mentions marginales', ME1_MENTIONS_MARGINALES_TYPES)}
              className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
            >
              Copier
            </button>
          </div>
          <pre className='overflow-x-auto whitespace-pre-wrap border border-gray-600 bg-[#0a0f16] p-4 font-mono text-[11px] leading-relaxed text-gray-200 print:border-black print:bg-white print:text-black'>
            {ME1_MENTIONS_MARGINALES_TYPES}
          </pre>
        </TabsContent>

        <TabsContent value='ex4' className='focus-visible:outline-none'>
          <div className='mb-3 flex flex-wrap gap-2 print:hidden'>
            <button
              type='button'
              onClick={() => copyText('Exemple 4 (complet)', fullEx4)}
              className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
            >
              Copier tout
            </button>
            <button
              type='button'
              onClick={() => copyText('En-tête gauche Ex. 4', ME1_PV_ENTETE_GAUCHE_EX4)}
              className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
            >
            Copier colonne gauche
            </button>
            <button
              type='button'
              onClick={() => copyText('Bloc droit Ex. 4', ME1_PV_BLOC_DROIT_EX4)}
              className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
            >
              Copier colonne droite
            </button>
            <button
              type='button'
              onClick={() => printTwoColumns(ME1_PV_ENTETE_GAUCHE_EX4, ME1_PV_BLOC_DROIT_EX4, toast)}
              className='rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/25'
            >
              Imprimer
            </button>
          </div>
          <h3 className='mb-3 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>
            Exemple 4 — Plainte avec interprète (texte conforme au modèle officiel)
          </h3>
          <TwoColumnPV left={ME1_PV_ENTETE_GAUCHE_EX4} right={ME1_PV_BLOC_DROIT_EX4} />
        </TabsContent>

        <TabsContent value='ex5' className='focus-visible:outline-none'>
          <div className='mb-3 flex flex-wrap gap-2 print:hidden'>
            <button
              type='button'
              onClick={() => copyText('Exemple 5 (complet)', fullEx5)}
              className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
            >
              Copier tout
            </button>
            <button
              type='button'
              onClick={() => copyText('Bloc droit Ex. 5', ME1_PV_BLOC_DROIT_EX5)}
              className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
            >
              Copier colonne droite
            </button>
            <button
              type='button'
              onClick={() => printTwoColumns(ME1_PV_ENTETE_GAUCHE_EX4, ME1_PV_BLOC_DROIT_EX5, toast)}
              className='rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/25'
            >
              Imprimer
            </button>
          </div>
          <h3 className='mb-3 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>
            Exemple 5 — Victime ne pouvant pas déposer seule (représentant)
          </h3>
          <p className='mb-3 text-xs text-slate-500'>
            Même en-tête gauche que l’exemple 4 ; le bloc droit comporte les lignes <strong className='text-slate-400'>---</strong> puis la
            formule de dépôt au nom de la victime.
          </p>
          <TwoColumnPV left={ME1_PV_ENTETE_GAUCHE_EX4} right={ME1_PV_BLOC_DROIT_EX5} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
