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
        <GlassCard padding='p-6' className='space-y-5 text-sm text-slate-300'>
          <div>
            <p className='font-sans text-lg font-bold text-white'>Modèle officiel — enquête BRAVO (35 actes)</p>
            <p className='mt-1 text-xs text-gray-500'>Structure type d&apos;articulation en flagrance — formation OPJ</p>
          </div>
          <div className='rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 font-mono text-[11px] text-slate-300'>
            <p className='mb-3 font-sans text-[10px] font-bold uppercase tracking-wide text-amber-300'>Règles de forme</p>
            <ul className='space-y-1.5 text-slate-400'>
              <li>• Numérotation continue : <strong className='text-white'>01, 02, 03…</strong> (jamais de saut)</li>
              <li>• Dates en format <strong className='text-white'>JJ/MM/AA</strong> — heures en <strong className='text-white'>HHhMM</strong></li>
              <li>• Intitulés en <strong className='text-white'>MAJUSCULES</strong> (ex. PROCÈS-VERBAL DE FLAGRANCE)</li>
              <li>• Avis parquet obligatoire après chaque prolongation de GAV</li>
              <li>• CR téléphonique : à positionner <em>avant</em> l&apos;acte qui suit l&apos;information du parquet</li>
            </ul>
          </div>
          <div>
            <p className='mb-2 font-sans text-xs font-bold uppercase tracking-wide text-gray-500'>Structure type (35 actes)</p>
            <ol className='space-y-1 text-slate-400'>
              {[
                '01 — PV de flagrance (ouverture de procédure)',
                '02 — CR téléphonique parquet (saisine)',
                '03 — PV de transport sur les lieux',
                '04 — PV de constatations',
                '05 — PV d\'audition victime',
                '06 — PV de placement en GAV (MEC)',
                '07 — Notification des droits GAV',
                '08 — Avis famille / consulat',
                '09 — CR téléphonique parquet (GAV)',
                '10 — PV d\'audition MEC (1ère)',
                '… — (actes de perquisition, saisies, confrontations…)',
                'N-2 — PV de fin de GAV / déferrement ou remise en liberté',
                'N-1 — CR téléphonique parquet (fin de GAV)',
                'N — PV de clôture de procédure',
              ].map((item) => (
                <li key={item} className='font-mono text-[11px]'>{item}</li>
              ))}
            </ol>
          </div>
          <p className='text-xs text-gray-600'>
            Calé sur le fascicule B0_ARTICUL_08242 — vérifier les intitulés exacts sur le fascicule officiel de votre centre de formation.
          </p>
        </GlassCard>
      ) : null}

      {tab === 'incidente' ? (
        <GlassCard padding='p-6' className='space-y-5 text-sm text-slate-300'>
          <div>
            <p className='font-sans text-lg font-bold text-white'>Enquête incidente</p>
            <p className='mt-1 text-xs text-gray-500'>Changement de cadre en cours d&apos;enquête</p>
          </div>
          <div className='rounded-lg border border-cyan-500/20 bg-cyan-500/[0.05] p-4 text-sm text-gray-300'>
            <p className='font-semibold text-white'>Principe</p>
            <p className='mt-2'>
              Une enquête incidente survient lorsqu&apos;au cours d&apos;une enquête principale (ex. flagrance),
              les policiers découvrent une <strong className='text-white'>infraction distincte</strong> qui nécessite
              un cadre d&apos;enquête différent ou une nouvelle procédure.
            </p>
          </div>
          <div>
            <p className='mb-2 font-sans text-xs font-bold uppercase tracking-wide text-gray-500'>Règles de numérotation</p>
            <ul className='space-y-2 text-slate-400'>
              <li className='flex gap-2'><span className='text-cyan-400'>→</span>La numérotation repart de <strong className='text-white'>01</strong> dans la nouvelle procédure incidente</li>
              <li className='flex gap-2'><span className='text-cyan-400'>→</span>Chaque procédure dispose de son propre <strong className='text-white'>numéro de procédure</strong></li>
              <li className='flex gap-2'><span className='text-cyan-400'>→</span>Un <strong className='text-white'>CR téléphonique parquet</strong> est obligatoire pour informer de l&apos;ouverture de la procédure incidente</li>
              <li className='flex gap-2'><span className='text-cyan-400'>→</span>Les deux procédures sont ensuite <strong className='text-white'>jointes</strong> dans le même bordereau de transmission</li>
            </ul>
          </div>
          <div className='rounded-lg border border-white/[0.08] bg-white/[0.02] p-4'>
            <p className='mb-2 font-sans text-xs font-bold uppercase tracking-wide text-gray-500'>Cas fréquents à l&apos;examen</p>
            <ul className='space-y-1.5 text-slate-400'>
              <li>• Découverte de stupéfiants lors d&apos;une perquisition vol</li>
              <li>• Violence sur fonctionnaire lors d&apos;une interpellation</li>
              <li>• Infraction routière révélée lors d&apos;un contrôle d&apos;identité</li>
              <li>• Port d&apos;arme découvert lors d&apos;une fouille de sécurité</li>
            </ul>
          </div>
          <p className='text-xs text-gray-600'>
            Référence : B0_ARTICUL_INCID — vérifier la structure exacte sur le fascicule de votre centre de formation.
          </p>
        </GlassCard>
      ) : null}
    </div>
  );
}
