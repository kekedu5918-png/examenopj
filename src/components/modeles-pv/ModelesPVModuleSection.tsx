import Link from 'next/link';
import { Lock } from 'lucide-react';

import { getModelesByFasciculeCode } from '@/data/modeles-pv';
import { PV_CATEGORIE_META } from '@/lib/pv-categories';
import { cn } from '@/utils/cn';

type Props = {
  fasciculeNumero: number;
};

export function ModelesPVModuleSection({ fasciculeNumero }: Props) {
  const code = `F${String(fasciculeNumero).padStart(2, '0')}`;
  const lies = getModelesByFasciculeCode(code);

  if (lies.length === 0) return null;

  return (
    <section className='not-prose mt-10 border-t border-white/10 pt-8'>
      <p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500'>Modèles de PV</p>
      <p className='mb-4 text-sm text-gray-500'>
        Modèles officiels alignés sur la formation — ouverture dans l’atelier rédaction PV.
      </p>
      <ul className='m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3'>
        {lies.map((m) => (
          <li key={m.id}>
            <Link
              href={`/entrainement/redaction-pv?modele=${encodeURIComponent(m.id)}`}
              className={cn(
                'flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-examen-accent/30 hover:shadow-ex-card-hover',
              )}
            >
              <span
                className={cn(
                  'self-start rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ring-1',
                  PV_CATEGORIE_META[m.categorie].badgeClass,
                )}
              >
                {PV_CATEGORIE_META[m.categorie].shortLabel}
              </span>
              <span className='mt-2 font-medium text-cyan-100/95'>{m.titre}</span>
              {m.isPremium ? (
                <span className='mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-violet-300'>
                  <Lock className='h-3 w-3' aria-hidden />
                  Premium
                </span>
              ) : null}
              <span className='mt-auto pt-3 text-xs font-semibold text-examen-accent'>Voir le modèle →</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className='mt-4 text-sm'>
        <Link
          href='/entrainement/redaction-pv'
          className='text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline'
        >
          Voir tous les modèles de PV
        </Link>
      </p>
    </section>
  );
}
