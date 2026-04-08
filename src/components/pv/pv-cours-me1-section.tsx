'use client';

import { useEffect, useState } from 'react';

import { PVBlancMe1Exercise } from '@/components/pv/pv-blanc-me1-exercise';
import { PVCoursPhaseAExercises } from '@/components/pv/pv-cours-phase-a-exercises';
import { PVExamModeBar } from '@/components/pv/pv-exam-mode-bar';
import { PVMe1FasciculeExtraits } from '@/components/pv/pv-me1-fascicule-extraits';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils/cn';

import { PVMe1VerbatimPlainte } from './pv-me1-verbatim-plainte';
import { PVRedactionPlainteExercise } from './pv-redaction-plainte-exercise';

const tabClass =
  'rounded-lg px-3 py-2 text-xs data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 sm:text-sm';

export function PVCoursMe1Section() {
  const [examMode, setExamMode] = useState(false);
  const [me1Tab, setMe1Tab] = useState('blanc');

  useEffect(() => {
    if (examMode) setMe1Tab('blanc');
  }, [examMode]);

  return (
    <div id='me1-pv' className='mt-14 scroll-mt-24'>
      <h2 className='font-display text-xl font-bold text-white sm:text-2xl'>
        Fascicule ME1 — procès-verbaux (épreuve 2)
      </h2>
      <p className='mt-2 max-w-3xl text-sm text-slate-400'>
        Modèle officiel « La procédure pénale policière » : <strong className='text-slate-200'>deux colonnes</strong> (marge / bloc principal),
        <strong className='text-slate-200'> N° / AFFAIRE / OBJET</strong>. Par défaut :{' '}
        <strong className='text-slate-200'>PV blanc</strong> (entête et marge type ME1, corps libre — pour tout type de rédaction). Les exemples
        verbatim et plainte Ex. 4 / 5 restent en onglets ; les squelettes GAV / voisinage sont regroupés en bloc optionnel plus bas.
      </p>

      <PVExamModeBar onActiveChange={setExamMode} />

      {examMode ? (
        <p className='mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs text-rose-100/95'>
          <strong className='text-rose-50'>Mode examen actif</strong> — les modèles « aide » sont atténués ; concentrez-vous sur le{' '}
          <strong>PV blanc</strong> (et, au besoin, le corrigé type plainte).
        </p>
      ) : null}

      <Tabs value={me1Tab} onValueChange={setMe1Tab} className='mt-6 w-full'>
        <TabsList className='mb-6 flex h-auto min-h-0 w-full flex-wrap justify-start gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1.5'>
          <TabsTrigger value='blanc' className={tabClass}>
            PV blanc (entraînement)
          </TabsTrigger>
          <TabsTrigger value='verbatim' className={tabClass} disabled={examMode}>
            Modèles verbatim ME1
          </TabsTrigger>
          <TabsTrigger value='plainte' className={tabClass}>
            Plainte Ex. 4 / 5
          </TabsTrigger>
        </TabsList>
        <TabsContent value='blanc' className='focus-visible:outline-none'>
          <PVBlancMe1Exercise />
        </TabsContent>
        <TabsContent
          value='verbatim'
          className={cn(
            'focus-visible:outline-none',
            examMode && 'pointer-events-none select-none opacity-[0.28] blur-[0.8px]',
          )}
          aria-hidden={examMode}
        >
          <PVMe1VerbatimPlainte />
        </TabsContent>
        <TabsContent
          value='plainte'
          className={cn(
            'focus-visible:outline-none',
            examMode && 'pointer-events-none select-none opacity-[0.35] blur-[0.6px]',
          )}
        >
          <PVRedactionPlainteExercise />
        </TabsContent>
      </Tabs>

      <div className={cn('transition-opacity duration-300', examMode && 'pointer-events-none opacity-30')}>
        <PVMe1FasciculeExtraits />
      </div>

      <div className={cn(examMode && '[&_details]:pointer-events-none [&_details]:opacity-40')}>
        <PVCoursPhaseAExercises />
      </div>
    </div>
  );
}
