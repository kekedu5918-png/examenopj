import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import type { EnqueteMeta } from '@/data/enquetes-types';
import { cn } from '@/utils/cn';

function CadreBadge({ cadre }: { cadre: string }) {
  const prelim = cadre.toLowerCase().includes('préliminaire') || cadre.toLowerCase().includes('preliminaire');
  const flag = cadre.toLowerCase().includes('flagrant');
  if (flag && !prelim) {
    return (
      <span className='inline-flex rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-200'>
        Flagrant délit
      </span>
    );
  }
  if (prelim && flag) {
    return (
      <span className='inline-flex rounded-full border border-blue-500/35 bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-200'>
        Flagrance → préliminaire
      </span>
    );
  }
  if (prelim) {
    return (
      <span className='inline-flex rounded-full border border-blue-500/35 bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-200'>
        Préliminaire
      </span>
    );
  }
  return (
    <span className='inline-flex rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-300'>
      {cadre}
    </span>
  );
}

export function EnqueteHub({ enquetes }: { enquetes: EnqueteMeta[] }) {
  return (
    <ul className='grid gap-6 md:grid-cols-2'>
      {enquetes.map((e) => (
        <li key={e.id}>
          <Link href={`/cours/enquetes/${e.id}`} className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50'>
            <GlassCard hover padding='p-6' className={cn('h-full transition hover:border-violet-500/20')}>
              <div className='flex flex-wrap items-center gap-2'>
                <CadreBadge cadre={e.cadre} />
                {e.premium ? (
                  <span className='inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200'>
                    Premium 🔒
                  </span>
                ) : (
                  <span className='inline-flex rounded-full border border-gray-500/30 bg-gray-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-300'>
                    Exemple gratuit
                  </span>
                )}
              </div>
              <h2 className='mt-3 font-display text-lg font-bold text-white'>{e.titre}</h2>
              <p className='mt-2 line-clamp-3 text-sm text-gray-400'>{e.resume}</p>
              <dl className='mt-4 space-y-1 text-xs text-gray-500'>
                <div>
                  <dt className='inline font-semibold text-gray-400'>OPJ : </dt>
                  <dd className='inline'>{e.personnages.opj}</dd>
                </div>
                <div>
                  <dt className='inline font-semibold text-gray-400'>Victime : </dt>
                  <dd className='inline'>{e.personnages.victime}</dd>
                </div>
                <div>
                  <dt className='inline font-semibold text-gray-400'>Mis en cause : </dt>
                  <dd className='inline'>{e.personnages.misCause}</dd>
                </div>
              </dl>
              <p className='mt-4 text-xs text-gray-500'>
                {e.documents.length} document{e.documents.length > 1 ? 's' : ''} (PDF + fac-similé)
              </p>
              <p className='mt-3 text-sm font-medium text-violet-300'>Ouvrir l&apos;enquête →</p>
            </GlassCard>
          </Link>
        </li>
      ))}
    </ul>
  );
}
