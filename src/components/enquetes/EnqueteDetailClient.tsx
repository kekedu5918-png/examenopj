'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { EnqueteArticulation } from '@/components/enquetes/EnqueteArticulation';
import { EnquetePV } from '@/components/enquetes/EnquetePV';
import { EnqueteRapport } from '@/components/enquetes/EnqueteRapport';
import { EnqueteSujet } from '@/components/enquetes/EnqueteSujet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getEnqueteDocRender } from '@/data/enquete-content';
import type { EnqueteDocument, EnqueteMeta } from '@/data/enquetes-types';
import { cn } from '@/utils/cn';

type Props = {
  enquete: EnqueteMeta;
};

function CadrePill({ cadre }: { cadre: string }) {
  const mixed = cadre.includes('→') || cadre.toLowerCase().includes('changement');
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
        mixed
          ? 'border-blue-500/35 bg-blue-500/15 text-blue-200'
          : 'border-emerald-500/35 bg-emerald-500/15 text-emerald-200',
      )}
    >
      {mixed ? 'Évolution du cadre' : 'Flagrant délit'}
    </span>
  );
}

function renderDoc(enquete: EnqueteMeta, doc: EnqueteDocument) {
  const data = getEnqueteDocRender(enquete.id, doc.id);
  if (!data) {
    return (
      <p className='rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100'>
        Contenu indisponible pour ce document. Lancez <code className='rounded bg-black/30 px-1'>npm run raster:enquetes</code>{' '}
        après avoir copié les PDF dans <code className='rounded bg-black/30 px-1'>public/enquetes/</code>.
      </p>
    );
  }

  switch (doc.type) {
    case 'sujet':
      return <EnqueteSujet code={enquete.code} render={data} />;
    case 'articulation':
    case 'articulation-suite':
      return <EnqueteArticulation code={enquete.code} render={data} />;
    case 'pv':
      return <EnquetePV code={enquete.code} render={data} />;
    case 'rapport':
      return <EnqueteRapport code={enquete.code} render={data} />;
    default:
      return null;
  }
}

export function EnqueteDetailClient({ enquete }: Props) {
  const [tab, setTab] = useState(enquete.documents[0]?.id ?? '');

  const tabs = useMemo(() => enquete.documents.map((d) => ({ id: d.id, label: d.label })), [enquete.documents]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 pb-24 pt-10 md:pt-14'>
      <div className='mx-auto max-w-5xl px-4 md:px-6'>
        <nav className='mb-8 text-sm text-gray-500'>
          <Link href='/cours' className='text-violet-400 hover:text-violet-300'>
            Cours
          </Link>
          <span className='mx-2'>/</span>
          <Link href='/cours/enquetes' className='text-violet-400 hover:text-violet-300'>
            Enquêtes
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-400'>{enquete.code}</span>
        </nav>

        <header className='mb-8 border-b border-white/10 pb-8'>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-violet-300'>Planches — Entraînement</p>
          <h1 className='mt-2 font-display text-3xl font-bold text-white md:text-4xl'>
            Enquête {enquete.code}
          </h1>
          <p className='mt-2 text-lg text-gray-300'>
            {enquete.qualification}
            <span className='text-gray-500'> — </span>
            <span className='text-gray-400'>{enquete.cadre}</span>
          </p>
          <div className='mt-4 flex flex-wrap items-center gap-2'>
            <CadrePill cadre={enquete.cadre} />
            {enquete.premium ? (
              <span className='inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200'>
                Premium 🔒
              </span>
            ) : null}
          </div>
          <dl className='mt-6 grid gap-3 text-sm text-gray-400 sm:grid-cols-2'>
            <div>
              <dt className='text-xs uppercase tracking-wide text-gray-500'>OPJ</dt>
              <dd className='text-gray-300'>{enquete.personnages.opj}</dd>
            </div>
            <div>
              <dt className='text-xs uppercase tracking-wide text-gray-500'>Procédure</dt>
              <dd className='text-gray-300'>{enquete.procedure}</dd>
            </div>
            <div>
              <dt className='text-xs uppercase tracking-wide text-gray-500'>Date</dt>
              <dd className='text-gray-300'>{enquete.date}</dd>
            </div>
            <div>
              <dt className='text-xs uppercase tracking-wide text-gray-500'>Lieu</dt>
              <dd className='text-gray-300'>{enquete.lieu}</dd>
            </div>
          </dl>
        </header>

        <Tabs value={tab} onValueChange={setTab} className='w-full'>
          <TabsList className='mb-6 hidden h-auto w-full min-w-0 flex-wrap justify-start gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 md:flex'>
            {tabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className='rounded-lg px-3 py-2 text-xs font-semibold data-[state=active]:bg-violet-600/40 data-[state=active]:text-white md:text-sm'
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className='mb-4 md:hidden'>
            <label htmlFor='enquete-doc-select' className='sr-only'>
              Document
            </label>
            <select
              id='enquete-doc-select'
              value={tab}
              onChange={(e) => setTab(e.target.value)}
              className='w-full rounded-xl border border-white/15 bg-navy-900 px-3 py-2.5 text-sm text-white'
            >
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {enquete.documents.map((doc) => (
            <TabsContent key={doc.id} value={doc.id} className='mt-0 outline-none'>
              {renderDoc(enquete, doc)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
