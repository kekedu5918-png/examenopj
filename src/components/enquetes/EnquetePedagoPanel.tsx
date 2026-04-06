import Link from 'next/link';

import { MethodoRappel } from '@/components/methodo/MethodoRappel';
import { GlassCard } from '@/components/ui/GlassCard';
import type { EnqueteMeta } from '@/data/enquetes-types';

type Props = { enquete: EnqueteMeta };

export function EnquetePedagoPanel({ enquete }: Props) {
  const refQ = encodeURIComponent(enquete.id);

  return (
    <div className='space-y-8'>
      <GlassCard padding='p-6' className='border-violet-500/20 bg-violet-500/[0.06]'>
        <p className='text-xs font-bold uppercase tracking-wide text-violet-300'>Fiche pédagogique</p>
        <h2 className='mt-2 font-display text-xl font-bold text-white'>Scénario — planches complètes en préparation</h2>
        <p className='mt-3 text-sm leading-relaxed text-gray-300'>{enquete.resume}</p>
        <p className='mt-4 text-sm text-gray-400'>
          <span className='font-semibold text-gray-300'>Qualification type : </span>
          {enquete.qualification}
        </p>
        <p className='mt-1 text-sm text-gray-400'>
          <span className='font-semibold text-gray-300'>Renvois : </span>
          {enquete.articles}
        </p>
      </GlassCard>

      {enquete.objectifsEpreuve2?.length ? (
        <section aria-labelledby='obj-ep2'>
          <h2 id='obj-ep2' className='font-display text-lg font-bold text-white'>
            Ce que l’épreuve 2 teste sur ce thème
          </h2>
          <ul className='mt-3 list-inside list-disc space-y-2 text-sm text-gray-300'>
            {enquete.objectifsEpreuve2.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {enquete.liensModules?.length ? (
        <section aria-labelledby='modules'>
          <h2 id='modules' className='font-display text-lg font-bold text-white'>
            Modules reliés
          </h2>
          <ul className='mt-3 flex flex-wrap gap-2'>
            {enquete.liensModules.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className='inline-flex rounded-lg border border-cyan-500/35 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/20'
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <MethodoRappel title='Préparer l’épreuve 2 ici' variant='accent' id='methodo-ep2'>
        <p>
          Lisez la page <Link href='/epreuves/epreuve-2' className='font-semibold text-emerald-200 underline'>méthode épreuve 2</Link> avant de
          refaire une articulation sur papier ou au{' '}
          <Link href={`/entrainement/articulation?ref=${refQ}`} className='font-semibold text-emerald-200 underline'>
            module interactif (modèle attendu si disponible)
          </Link>
          .
        </p>
      </MethodoRappel>

      <div className='flex flex-wrap gap-3'>
        <Link
          href='/epreuves/epreuve-2'
          className='rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700'
        >
          Épreuve 2 — attendus & cartouches
        </Link>
        <Link
          href={`/entrainement/articulation?ref=${refQ}`}
          className='rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10'
        >
          Articulation sur ce thème
        </Link>
        <Link
          href='/entrainement/recapitulatif'
          className='rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10'
        >
          Récap qualification (épr. 1)
        </Link>
      </div>
    </div>
  );
}
