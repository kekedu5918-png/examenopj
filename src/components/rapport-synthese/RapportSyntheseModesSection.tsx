'use client';

import { useState } from 'react';
import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

const MODES = [
  { id: 'modele' as const, label: 'Modèle officiel' },
  { id: 'entrainement' as const, label: 'Entraînement' },
  { id: 'correction' as const, label: 'Correction' },
];

/** 3 modes — B7_02_RAPP_SYNT_1024.pdf ; // TODO: annotations affaire VERT/VILLA page par page depuis fascicule ME */
export function RapportSyntheseModesSection() {
  const [mode, setMode] = useState<(typeof MODES)[number]['id']>('modele');

  return (
    <section className='mb-12 space-y-6' aria-labelledby='rapport-modes-title'>
      <div>
        <h2 id='rapport-modes-title' className='font-display text-xl font-bold text-white md:text-2xl'>
          Méthode — rapport de synthèse
        </h2>
        <p className='mt-2 text-sm text-examen-inkMuted'>
          Structure conforme au fascicule officiel (modèle B7). PDF :{' '}
          <Link href='/docs/rapport-synthese-officiel.pdf' className='text-cyan-400 hover:underline' target='_blank' rel='noopener noreferrer'>
            rapport-synthese-officiel.pdf
          </Link>
          . {/* TODO: vérifier nom fichier B7_02_RAPP_SYNT_1024.pdf si remplacement */}
        </p>
      </div>

      <div className='flex flex-wrap gap-2'>
        {MODES.map((m) => (
          <button
            key={m.id}
            type='button'
            onClick={() => setMode(m.id)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              mode === m.id
                ? 'border-examen-accent bg-examen-accent/20 text-white'
                : 'border-white/15 text-examen-inkMuted hover:border-white/25 hover:text-white',
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'modele' ? (
        <div className='space-y-4'>
          <div className='aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 md:aspect-[16/10] md:min-h-[480px]'>
            <iframe
              title='Modèle officiel — rapport de synthèse'
              src='/docs/rapport-synthese-officiel.pdf'
              className='h-full min-h-[360px] w-full'
            />
          </div>
          <GlassCard padding='p-6' className='text-sm text-slate-300'>
            <p className='font-semibold text-white'>Annotations pédagogiques (aperçu)</p>
            <p className='mt-3 leading-relaxed'>
              {/* TODO: B7_02 — reprendre mot pour mot les sections PAGE 1 cartouche MINISTÈRE / objet / affaire / références / pièces jointes */}
              L&apos;en-tête reprend le cartouche institutionnel, l&apos;objet en qualifications en majuscules, l&apos;affaire
              (mis en cause), les références et les pièces jointes. La formule d&apos;introduction et la conclusion sont
              imposées — voir PDF et fascicule ME2.
            </p>
            <p className='mt-3 text-xs text-amber-200/90'>
              Formule d&apos;introduction (à recaler sur le fascicule) : « J&apos;ai l&apos;honneur de vous rendre compte
              des résultats de l&apos;enquête diligentée en [cadre], conformément aux instructions citées en référence,
              assisté des [qualité des agents] du service et pour laquelle vous avez été tenu régulièrement informé. »
            </p>
            <p className='mt-3 text-xs text-amber-200/90'>
              Formule de conclusion (schéma) : « Des éléments rassemblés au cours de cette enquête, il ressort que le nommé
              [NOM Prénom] pourrait faire l&apos;objet de poursuites pour [qualifications complètes avec circonstances
              aggravantes], faits prévus par [articles définissant] et réprimés par [articles réprimant] du code pénal. »
            </p>
          </GlassCard>
        </div>
      ) : null}

      {mode === 'entrainement' ? (
        <GlassCard padding='p-6' className='text-sm text-slate-300'>
          <p className='font-semibold text-white'>Formulaire d&apos;entraînement</p>
          <p className='mt-2 text-examen-inkMuted'>
            {/* TODO: champs validés — en-tête 8 champs, sections FAITS / ENQUÊTE / conclusion / état civil MEC / destinataires */}
            Version interactive complète : à brancher sur les champs obligatoires du modèle B7. En attendant, utilisez
            l&apos;atelier Premium ci-dessous pour la rédaction chronométrée.
          </p>
        </GlassCard>
      ) : null}

      {mode === 'correction' ? (
        <GlassCard padding='p-6' className='text-sm text-slate-300'>
          <p className='font-semibold text-white'>Exemple corrigé — affaire VERT / VILLA</p>
          <p className='mt-2 text-examen-inkMuted'>
            {/* TODO: intégrer copie annotée depuis B7_02_RAPP_SYNT_1024.pdf */}
            Contenu corrigé annoté : à intégrer depuis le fascicule officiel — ne pas inventer d&apos;exemple.
          </p>
        </GlassCard>
      ) : null}
    </section>
  );
}
