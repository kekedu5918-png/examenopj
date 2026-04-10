import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

import { FloatingQuickFlashcards } from '@/components/layout/FloatingQuickFlashcards';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { SiteJsonLd } from '@/components/seo/site-json-ld';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME, SEO_KEYWORDS } from '@/constants/site';
import { cn } from '@/utils/cn';
import { OG_IMAGE_PATH } from '@/utils/seo-metadata';
import { getSiteUrl } from '@/utils/site-url';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  weight: '400',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600'],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ExamenOPJ — Préparation OPJ 2026',
    template: '%s | ExamenOPJ — Préparation OPJ 2026',
  },
  description:
    "Préparez l'examen OPJ juin 2026 : 15 fascicules, 200+ questions de quiz, flashcards et procédure pénale.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: APP_NAME,
    url: siteUrl,
    title: 'ExamenOPJ — Préparation OPJ 2026',
    description:
      "Préparez l'examen OPJ juin 2026 : 15 fascicules, 200+ questions de quiz, flashcards et procédure pénale.",
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: 'ExamenOPJ — Préparation OPJ 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExamenOPJ — Préparation OPJ 2026',
    description:
      "Préparez l'examen OPJ juin 2026 : fascicules, quiz, flashcards et procédure pénale.",
    images: [`${siteUrl}${OG_IMAGE_PATH}`],
  },
  robots: { index: true, follow: true },
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: APP_NAME, url: siteUrl }],
  category: 'education',
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0C1B33' }],
  colorScheme: 'dark',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang='fr'
      className={cn('dark', dmSans.variable, instrumentSerif.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn('relative min-h-screen bg-examen-canvas font-sans text-examen-ink antialiased')}
        suppressHydrationWarning
      >
        <div
          className='pointer-events-none fixed inset-0 -z-10 bg-examen-canvas'
          aria-hidden
        >
          {/* Top center blue glow */}
          <div
            className='absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 opacity-[0.15]'
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #3b82f6, transparent)' }}
          />
          {/* Top-right violet glow */}
          <div
            className='absolute right-0 top-0 h-[400px] w-[500px] opacity-[0.08]'
            style={{ background: 'radial-gradient(ellipse 70% 60% at 100% 0%, #7c3aed, transparent)' }}
          />
          {/* Bottom-left accent */}
          <div
            className='absolute bottom-0 left-0 h-[300px] w-[400px] opacity-[0.06]'
            style={{ background: 'radial-gradient(ellipse 60% 60% at 0% 100%, #0ea5e9, transparent)' }}
          />
          {/* Subtle grid overlay */}
          <div
            className='absolute inset-0 opacity-[0.018]'
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <SiteJsonLd />
        <a
          href='#contenu-principal'
          className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-examen-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none'
        >
          Aller au contenu principal
        </a>
        <div className='flex min-h-screen flex-col'>
          <Header />
          <PageTransition>{children}</PageTransition>
          <FloatingQuickFlashcards />
          <Footer />
        </div>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
