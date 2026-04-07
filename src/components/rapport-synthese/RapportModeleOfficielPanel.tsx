'use client';

import type { ReactNode } from 'react';

import {
  RAPPORT_F16_SOURCE_FILE,
  RAPPORT_F16_SOURCE_LINES,
  RAPPORT_FORMULES_ANNOTATIONS,
  rapportF16SourceAvecPagination,
  rapportPerpignanExemple,
} from '@/data/rapport-synthese-f16-exemple-perpignan';

function DocBlock({
  children,
  highlight,
  formuleId,
}: {
  children: ReactNode;
  highlight?: 'jaune';
  formuleId?: keyof typeof RAPPORT_FORMULES_ANNOTATIONS;
}) {
  const cls =
    highlight === 'jaune'
      ? 'bg-yellow-200/90 text-gray-900 ring-1 ring-yellow-400/80'
      : 'text-gray-900';

  return (
    <div
      id={formuleId ? `formule-${formuleId}` : undefined}
      className={`whitespace-pre-wrap rounded-sm px-1 py-0.5 text-[13px] leading-snug md:text-[14px] ${cls}`}
    >
      {children}
    </div>
  );
}

/**
 * Modèle officiel — lecture seule. Texte : F16.txt (exemple PERPIGNAN).
 * Formules obligatoires surlignées en jaune ; légende à droite sur grand écran.
 */
export function RapportModeleOfficielPanel() {
  const a = rapportPerpignanExemple;

  return (
    <div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
      <div className='min-w-0 flex-1 space-y-4'>
        <p className='text-xs text-examen-inkMuted'>
          Lecture seule — source :{' '}
          <code className='rounded bg-white/10 px-1 py-0.5 font-mono text-[11px]'>{RAPPORT_F16_SOURCE_FILE}</code>{' '}
          (l. {RAPPORT_F16_SOURCE_LINES}). L’exemple du fascicule B7 affaire VERT/VILLA n’est pas dans le dépôt : voir
          note en bas de page.
        </p>

        <div className='overflow-x-auto rounded-lg border border-neutral-300 bg-white p-4 shadow-sm md:p-8'>
          <article className='mx-auto max-w-3xl font-serif text-gray-900'>
            <DocBlock>{a.entete}</DocBlock>

            <div className='mt-6 space-y-4 border-t border-neutral-200 pt-4'>
              <DocBlock>{a.objet}</DocBlock>
              <DocBlock>{a.affaire}</DocBlock>
              <DocBlock>{a.references}</DocBlock>
              <DocBlock>{a.piecesJointes}</DocBlock>
            </div>

            <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
              <DocBlock highlight='jaune' formuleId='intro'>
                {a.introduction}
              </DocBlock>
            </div>

            <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
              <DocBlock>{a.lesFaits}</DocBlock>
            </div>

            <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
              <DocBlock>{a.lenquete}</DocBlock>
            </div>

            <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
              <DocBlock highlight='jaune' formuleId='conclusion'>
                {a.conclusionTitreEtCorps}
              </DocBlock>
            </div>

            <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
              <DocBlock highlight='jaune' formuleId='etatCivil'>
                {a.etatCivil}
              </DocBlock>
            </div>

            <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
              <DocBlock>{a.vuEtTransmis}</DocBlock>
            </div>

            <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
              <DocBlock highlight='jaune' formuleId='destinataires'>
                {a.destinataires}
              </DocBlock>
            </div>
          </article>
        </div>

        <details className='rounded-lg border border-white/10 bg-examen-card p-4 text-xs text-examen-inkMuted'>
          <summary className='cursor-pointer font-medium text-examen-ink'>Pagination du fascicule (extrait)</summary>
          <p className='mt-2'>
            Entre deux parties de « L’ENQUÊTE », le fascicule insère notamment :{' '}
            <code className='font-mono text-[10px] text-amber-200/90'>{rapportF16SourceAvecPagination}</code> — omis
            ci-dessus pour la lisibilité ; le texte narratif est identique à F16.txt.
          </p>
        </details>

        <p className='text-xs text-amber-200/90'>
          TODO (B7_02_RAPP_SYNT_1024.txt / PDF) : si le modèle VERT/VILLA / Clermont est fourni dans le dépôt, ajouter un
          second onglet ou un sélecteur d’exemple — le présent écran reproduit uniquement l’exemple PERPIGNAN contenu dans{' '}
          {RAPPORT_F16_SOURCE_FILE}.
        </p>
      </div>

      <aside className='w-full shrink-0 space-y-3 rounded-xl border border-white/10 bg-examen-card p-4 lg:sticky lg:top-4 lg:max-w-sm'>
        <h3 className='font-display text-sm font-bold text-white'>Formules surlignées (jaune)</h3>
        <ul className='space-y-3 text-xs text-examen-inkMuted'>
          {(Object.keys(RAPPORT_FORMULES_ANNOTATIONS) as Array<keyof typeof RAPPORT_FORMULES_ANNOTATIONS>).map((id) => {
            const meta = RAPPORT_FORMULES_ANNOTATIONS[id];
            return (
              <li key={id}>
                <p className='font-semibold text-examen-ink'>{meta.titre}</p>
                <p className='mt-1 leading-relaxed'>{meta.pourquoi}</p>
              </li>
            );
          })}
        </ul>
        <p className='border-t border-white/10 pt-3 text-[11px] text-slate-500'>
          « VU ET TRANSMIS » et la date figurent dans le document mais ne sont pas surlignés en jaune sur ce panneau ; ils
          restent requis dans la copie d’examen selon votre correction type.
        </p>
      </aside>
    </div>
  );
}
