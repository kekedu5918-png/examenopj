import Link from 'next/link';

import type { EnqueteMeta } from '@/data/enquetes-types';
import { cn } from '@/utils/cn';

type Props = {
  enquetes: EnqueteMeta[];
  className?: string;
};

export function ModuleEnquetesLinks({ enquetes, className }: Props) {
  if (enquetes.length === 0) return null;

  return (
    <div className={cn('not-prose border-t border-white/10 pt-6', className)}>
      <p className='mb-1 text-sm font-semibold uppercase tracking-wide text-violet-200/90'>Enquêtes liées à ce module</p>
      <p className='mb-4 text-sm text-gray-500'>
        Mises en situation type concours (sujet, articulation, PV, rapport) — le fil direct avec l’épreuve 2.
      </p>
      <ul className='m-0 grid list-none gap-3 p-0 sm:grid-cols-1'>
        {enquetes.map((e) => (
          <li key={e.id}>
            <Link
              href={`/cours/enquetes/${e.id}`}
              className='block rounded-xl border border-violet-500/25 bg-violet-500/[0.08] px-4 py-3 transition hover:border-violet-400/45 hover:bg-violet-500/[0.12]'
            >
              <span className='font-medium text-white'>{e.titre}</span>
              {e.themeCourt ? <span className='mt-1 block text-xs text-gray-400'>{e.themeCourt}</span> : null}
              <span className='mt-2 inline-flex text-xs font-medium text-violet-300'>Voir l’enquête →</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className='mt-4 text-sm'>
        <Link href='/cours/enquetes' className='text-violet-400 underline-offset-2 hover:text-violet-300 hover:underline'>
          Toutes les enquêtes
        </Link>
      </p>
    </div>
  );
}
