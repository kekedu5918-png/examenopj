'use client';

import Link from 'next/link';

type ContentPremiumOverlayProps = {
  title: string;
  description: string;
  /** Contenu masqué derrière l’overlay (accès restreint). */
  children: React.ReactNode;
};

/** Overlay plein écran pour contenu réservé au Premium (fondamentaux, méthodologie). */
export function ContentPremiumOverlay({ title, description, children }: ContentPremiumOverlayProps) {
  return (
    <div className='relative min-h-[50vh] overflow-hidden'>
      <div aria-hidden className='pointer-events-none max-h-[70vh] select-none overflow-hidden blur-[2px] opacity-[0.22]'>
        {children}
      </div>
      <div className='absolute inset-0 flex items-center justify-center bg-navy-950/85 px-4 py-16'>
        <div className='max-w-md rounded-2xl border border-amber-500/35 bg-navy-900/95 p-8 text-center shadow-xl shadow-amber-900/10'>
          <p className='text-xs font-semibold uppercase tracking-widest text-amber-400/90'>Premium</p>
          <h2 className='mt-2 font-display text-xl font-bold text-white'>{title}</h2>
          <p className='mt-3 text-sm leading-relaxed text-gray-400'>{description}</p>
          <Link
            href='/pricing'
            className='mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95'
          >
            Voir les offres et l&apos;essai gratuit
          </Link>
        </div>
      </div>
    </div>
  );
}
