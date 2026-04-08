'use client';

import { useState } from 'react';

import { ArticulationExercice } from '@/components/entrainement/ArticulationExercice';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

const TABS = [
  { id: 'temps' as const, label: 'Flèche du temps', hint: 'Cartouches + timeline' },
  { id: 'bravo' as const, label: 'Modèle BRAVO', hint: 'B0_ARTICUL_08242.pdf' },
  { id: 'incidente' as const, label: 'Enquête incidente', hint: 'B0_ARTICUL_INCID_0723.pdf' },
];

type Props = {
  referenceEnqueteId?: string;
  suggestedTitre?: string;
};

/** 3 modes articulation — // TODO: timeline couleurs + alertes avis parquet / mineur depuis fascicules B0 */
export function ArticulationModesShell({ referenceEnqueteId, suggestedTitre }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('temps');

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap gap-2 border-b border-white/10 pb-4'>
        {TABS.map((t) => (
          <button
            key={t.id}
            type='button'
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-lg border px-4 py-2 text-left text-sm transition',
              tab === t.id
                ? 'border-examen-accent bg-examen-accent/15 text-white'
                : 'border-transparent text-examen-inkMuted hover:bg-white/5 hover:text-white',
            )}
          >
            <span className='block font-semibold'>{t.label}</span>
            <span className='block text-[11px] opacity-80'>{t.hint}</span>
          </button>
        ))}
      </div>

      {tab === 'temps' ? (
        <ArticulationExercice referenceEnqueteId={referenceEnqueteId} suggestedTitre={suggestedTitre} />
      ) : null}

      {tab === 'bravo' ? (
        <GlassCard padding='p-6' className='text-sm text-slate-300'>
          <p className='font-display text-lg font-bold text-white'>Modèle officiel — enquête BRAVO (35 actes)</p>
          <p className='mt-3 leading-relaxed text-examen-inkMuted'>
            {/* TODO: B0_ARTICUL_08242.pdf — afficher articulation complète avec annotations ; numérotation 01, 02… format JJ/MM/AA */}
            Contenu à importer depuis le fascicule officiel — reproduction conforme des intitulés en majuscules et des
            avis parquet obligatoires.
          </p>
        </GlassCard>
      ) : null}

      {tab === 'incidente' ? (
        <GlassCard padding='p-6' className='text-sm text-slate-300'>
          <p className='font-display text-lg font-bold text-white'>Enquête incidente</p>
          <p className='mt-3 leading-relaxed text-examen-inkMuted'>
            {/* TODO: B0_ARTICUL_INCID_0723.pdf — changement de cadre, numérotation */}
            Explication du changement de cadre et de la numérotation : à rédiger depuis le PDF officiel.
          </p>
        </GlassCard>
      ) : null}
    </div>
  );
}
