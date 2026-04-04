import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SiteJsonLd } from '@/components/seo/site-json-ld';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME, SEO_KEYWORDS } from '@/constants/site';
import { cn } from '@/utils/cn';
import { getSiteUrl } from '@/utils/site-url';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

const calSans = localFont({
  src: './fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
  weight: '600',
  display: 'swap',
});

export const metadata: Metadata = {
  /** En prod sans env : https://examenopj.fr (voir getSiteUrl). En dev : http://localhost:3000 */
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'ExamenOPJ — Révisions OPJ 2026',
    template: '%s | ExamenOPJ',
  },
  description:
    "La plateforme de référence pour préparer l'examen d'Officier de Police Judiciaire. Fascicules SDCP, méthodologie, quiz, flashcards.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'ExamenOPJ',
    title: 'ExamenOPJ — Révisions OPJ 2026',
    description:
      "Préparez l'examen OPJ avec les fascicules officiels, quiz et outils de mémorisation.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExamenOPJ — Révisions OPJ 2026',
    description:
      "Préparez l'examen OPJ avec les fascicules officiels, quiz et outils de mémorisation.",
  },
  robots: { index: true, follow: true },
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: APP_NAME, url: getSiteUrl() }],
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
  ],
  colorScheme: 'dark',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='fr' className={cn('dark', calSans.variable)}>
      <body className={cn('min-h-screen bg-navy-950 font-sans text-white antialiased')}>
        <SiteJsonLd />
        <a
          href='#contenu-principal'
          className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-navy-950 focus:outline-none'
        >
          Aller au contenu principal
        </a>
        <div className='flex min-h-screen flex-col'>
          <Navbar />
          <main id='contenu-principal' className='relative flex-1 scroll-mt-16' tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
