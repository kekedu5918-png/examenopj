'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PVMe1VerbatimPlainte } from './pv-me1-verbatim-plainte';
import { PVRedactionPlainteExercise } from './pv-redaction-plainte-exercise';

const tabClass =
  'rounded-lg px-3 py-2 text-xs data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 sm:text-sm';

export function PVCoursMe1Section() {
  return (
    <div className='mt-14'>
      <h2 className='font-display text-xl font-bold text-white sm:text-2xl'>
        Fascicule ME1 — procès-verbaux (épreuve 2)
      </h2>
      <p className='mt-2 max-w-3xl text-sm text-slate-400'>
        Modèle officiel « La procédure pénale policière » : reproduction du formalisme en deux colonnes (en-tête service à
        gauche, corps du PV à droite), mentions marginales types, puis exercice à trous ({' '}
        <span className='font-mono text-slate-300'>xxx</span>) et zone de rédaction pour le corps (
        <span className='font-mono text-slate-300'>---</span>).
      </p>

      <Tabs defaultValue='verbatim' className='mt-6 w-full'>
        <TabsList className='mb-6 flex h-auto min-h-0 w-full flex-wrap justify-start gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1.5'>
          <TabsTrigger value='verbatim' className={tabClass}>
            Modèle verbatim (Ex. 4)
          </TabsTrigger>
          <TabsTrigger value='exercice' className={tabClass}>
            Exercice de rédaction
          </TabsTrigger>
        </TabsList>
        <TabsContent value='verbatim' className='focus-visible:outline-none'>
          <PVMe1VerbatimPlainte />
        </TabsContent>
        <TabsContent value='exercice' className='focus-visible:outline-none'>
          <PVRedactionPlainteExercise />
        </TabsContent>
      </Tabs>
    </div>
  );
}
