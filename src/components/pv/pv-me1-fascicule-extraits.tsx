'use client';

import { useCallback } from 'react';

import { useToast } from '@/components/ui/use-toast';
import {
  PV_ME1_ARTICULATION_AUDITION_TEMOIN,
  PV_ME1_ARTICULATION_INTERPELLATION,
  PV_ME1_VERBATIM_ENQUETE_VOISINAGE,
} from '@/data/pv-me1-fascicule-extracts';

const preClass =
  'whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-gray-200 print:text-[10px] print:text-black';

export function PVMe1FasciculeExtraits() {
  const { toast } = useToast();

  const copyText = useCallback(
    (label: string, text: string) => {
      void navigator.clipboard.writeText(text).then(
        () => toast({ title: 'Copié', description: `${label} — prêt à coller.` }),
        () =>
          toast({
            title: 'Copie impossible',
            description: 'Autorisez le presse-papiers ou copiez manuellement.',
            variant: 'destructive',
          }),
      );
    },
    [toast],
  );

  return (
    <div
      id='me1-pv-extraits'
      className='mt-10 scroll-mt-24 space-y-10 rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6'
    >
      <div>
        <h3 className='text-xs font-bold uppercase tracking-wide text-amber-400/90'>Extraits verbatim (ME1 — support officiel)</h3>
        <p className='mt-2 text-xs leading-relaxed text-slate-500'>
          Textes structurants issus du support « La procédure pénale policière » (session examen juin 2026, version référencée au
          01/12/2025 dans le document diffuseur). Usage pédagogique : ne substitue pas au PDF complet ni à Légifrance.
        </p>
      </div>

      <div>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-2'>
          <h4 className='text-xs font-semibold text-slate-300'>Enquête de voisinage — corps type</h4>
          <button
            type='button'
            onClick={() => copyText('Enquête voisinage', PV_ME1_VERBATIM_ENQUETE_VOISINAGE)}
            className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 print:hidden'
          >
            Copier
          </button>
        </div>
        <pre className={`overflow-x-auto border border-gray-600 bg-[#0a0f16] p-4 ${preClass} print:border-black print:bg-white`}>
          {PV_ME1_VERBATIM_ENQUETE_VOISINAGE}
        </pre>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border border-white/10 bg-white/[0.03] p-4'>
          <h4 className='text-xs font-semibold text-slate-300'>Articulation — audition de témoin</h4>
          <ol className='mt-3 list-decimal space-y-1.5 pl-5 text-xs text-slate-400'>
            {PV_ME1_ARTICULATION_AUDITION_TEMOIN.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </div>
        <div className='rounded-lg border border-white/10 bg-white/[0.03] p-4'>
          <h4 className='text-xs font-semibold text-slate-300'>Articulation — interpellation (12 points)</h4>
          <ol className='mt-3 list-decimal space-y-1.5 pl-5 text-xs text-slate-400'>
            {PV_ME1_ARTICULATION_INTERPELLATION.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
