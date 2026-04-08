'use client';

import type { CartoucheCheckItem } from '@/components/entrainement/articulation-check';

type Props = {
  items: CartoucheCheckItem[];
  ordreRespecte: boolean;
  titreModele: string;
};

export function ArticulationChecklist({ items, ordreRespecte, titreModele }: Props) {
  const manquantes = items.filter((i) => !i.trouvee).length;

  return (
    <div className='rounded-xl border border-violet-500/25 bg-violet-500/10 p-5 print:hidden'>
      <h3 className='font-display text-sm font-bold uppercase tracking-wide text-violet-200'>
        Corrigé-type — {titreModele}
      </h3>
      <p className='mt-2 text-xs text-gray-400'>
        Comparaison automatique sur les <strong className='text-gray-200'>titres de cartouches</strong> (tolérance sur la casse et les accents).
        Ce n’est pas une notation officielle : grille d’entraînement pour repérer oublis et désordre.
      </p>
      <p className='mt-2 text-sm text-gray-200'>
        {manquantes === 0 ? (
          <span className='text-emerald-300'>Aucun titre de référence manifestement absent.</span>
        ) : (
          <span>
            <strong>{manquantes}</strong> titre{manquantes > 1 ? 's' : ''} de référence non détecté
            {manquantes > 1 ? 's' : ''}.
          </span>
        )}
        {ordreRespecte ? (
          <span className='ml-2 text-emerald-300'>— Ordre global cohérent.</span>
        ) : (
          <span className='ml-2 text-amber-300'>— Vérifiez l’ordre chronologique des cartouches.</span>
        )}
      </p>
      <ul className='mt-4 max-h-64 space-y-1.5 overflow-y-auto text-sm md:max-h-80'>
        {items.map((it) => (
          <li
            key={it.ordreRef}
            className={`flex gap-2 rounded-lg border px-2 py-1.5 ${
              it.trouvee ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100' : 'border-white/10 bg-white/[0.04] text-gray-300'
            }`}
          >
            <span className='shrink-0 font-mono text-xs opacity-70'>{it.ordreRef}.</span>
            <span className='min-w-0 flex-1 leading-snug'>{it.titreReference}</span>
            <span className='shrink-0 text-xs font-bold'>{it.trouvee ? 'OK' : '…'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
