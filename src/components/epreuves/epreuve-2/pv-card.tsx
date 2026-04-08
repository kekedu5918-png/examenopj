'use client';

import type { ReactNode } from 'react';

import type { CartoucheBlock } from '@/data/cartouches-data';

type PVCardProps = {
  titre: string;
  sousTitre?: string;
  children: ReactNode;
};

/** Cartouche type formulaire officiel — bordures nettes, 2 colonnes, sans glassmorphism. */
export function PVCard({ titre, sousTitre, children }: PVCardProps) {
  return (
    <div className='mb-4 overflow-hidden rounded-none border border-gray-600'>
      <div className='border-b border-gray-600 bg-white/[0.08] px-4 py-2.5'>
        <h3 className='text-sm font-bold leading-tight text-white'>{titre}</h3>
        {sousTitre ? <p className='mt-0.5 text-xs italic text-blue-400'>{sousTitre}</p> : null}
      </div>

      <div className='flex flex-col sm:flex-row'>
        <div className='flex w-full shrink-0 flex-col justify-start gap-2 border-gray-600 p-3 text-xs text-gray-400 sm:w-[100px] sm:border-r md:w-[130px] lg:w-[150px] sm:border-b-0 border-b'>
          <div className='font-bold text-gray-300'>P.V. N°</div>
          <div>JJ/MM/AA à **h**</div>
          <div>OPJ</div>
        </div>

        <div className='flex-1 p-3 text-sm leading-relaxed text-gray-300'>{children}</div>
      </div>
    </div>
  );
}

const indentClass = (level: 0 | 1 | 2 = 0) =>
  level === 0 ? '' : level === 1 ? 'pl-4' : 'pl-8';

type PVLineProps = {
  m: string;
  i?: string;
  /** Indentation pour sous-listes (tiret —) */
  indent?: 0 | 1 | 2;
  /** Sans tiret en tête de ligne */
  noDash?: boolean;
};

export function PVLine({ m, i, indent = 0, noDash = false }: PVLineProps) {
  return (
    <div className={`text-sm leading-relaxed text-gray-300 ${indentClass(indent)}`}>
      {!noDash ? <span className='text-gray-500'>— </span> : null}
      <span className='font-bold text-white'>{m}</span>
      {i ? <span className='italic text-blue-400'> {i}</span> : null}
    </div>
  );
}

/** Ligne entièrement en italique bleu (mentions entre parenthèses, etc.) */
export function PVItalicBullet({ text, indent = 2 }: { text: string; indent?: 0 | 1 | 2 }) {
  return (
    <div className={`text-sm italic leading-relaxed text-blue-400 ${indentClass(indent)}`}>
      <span className='text-gray-500'>— </span>
      {text}
    </div>
  );
}

export function PVDroitsGroup({
  title = 'Notification des droits',
  bullets,
}: {
  title?: string;
  bullets: { m?: string; i?: string; sub?: boolean }[];
}) {
  const titleWithColon = title.trim().endsWith(':') ? title : `${title} :`;
  return (
    <div className='space-y-1'>
      <div className={`text-sm ${indentClass(1)}`}>
        <span className='font-bold text-white'>{titleWithColon}</span>
      </div>
      <ul className='list-none space-y-1'>
        {bullets.map((b, idx) => (
          <li
            key={idx}
            className={`text-sm leading-relaxed text-gray-300 ${b.sub ? 'pl-8' : 'pl-4'}`}
          >
            <span className='text-gray-500'>— </span>
            {b.m ? (
              <>
                <span className='font-bold text-white'>{b.m}</span>
                {b.i ? <span className='italic text-blue-400'> {b.i}</span> : null}
              </>
            ) : (
              b.i ? <span className='italic text-blue-400'>{b.i}</span> : null
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PVDivider() {
  return <div className='my-2 border-t border-gray-700/50' />;
}

/** Recueil des demandes — formalisme fixe */
export function PVRecueilDemandes() {
  return (
    <div className='pl-4 text-sm leading-relaxed'>
      <span className='font-bold text-white'>Recueil des demandes</span>
      <span className='italic text-blue-400'> : En lien avec le thème</span>
    </div>
  );
}

/** Annexes — gras + détail italique bleu */
export function PVAnnexes({ detail }: { detail: string }) {
  return (
    <div className='pl-4 text-sm leading-relaxed'>
      <span className='font-bold text-white'>Annexes</span>
      <span className='italic text-blue-400'> : {detail}</span>
    </div>
  );
}

/** Note pédagogique sous-cartouche (bordure sobre) */
export function PVNote({ children }: { children: ReactNode }) {
  return (
    <div className='mt-2 border border-gray-600 bg-white/[0.04] px-3 py-2 text-sm leading-relaxed text-gray-300'>
      <span className='font-bold text-amber-200'>Note : </span>
      {children}
    </div>
  );
}

function renderBlock(b: CartoucheBlock, idx: number) {
  switch (b.kind) {
    case 'line':
      return (
        <PVLine key={idx} m={b.m} i={b.i} indent={b.indent ?? 0} noDash={b.noDash} />
      );
    case 'italicLine':
      return <PVItalicBullet key={idx} text={b.text} indent={b.indent ?? 1} />;
    case 'divider':
      return <PVDivider key={idx} />;
    case 'droits':
      return <PVDroitsGroup key={idx} title={b.title} bullets={b.bullets} />;
    case 'recueil':
      return <PVRecueilDemandes key={idx} />;
    case 'annexes':
      return <PVAnnexes key={idx} detail={b.detail} />;
    case 'space':
      return <div key={idx} className='h-1' />;
    default:
      return null;
  }
}

export function PVCartoucheFromDef({
  titre,
  sousTitre,
  blocks,
}: {
  titre: string;
  sousTitre?: string;
  blocks: CartoucheBlock[];
}) {
  return (
    <PVCard titre={titre} sousTitre={sousTitre}>
      <div className='space-y-2'>{blocks.map((block, i) => renderBlock(block, i))}</div>
    </PVCard>
  );
}
