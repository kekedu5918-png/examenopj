import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';

import { AnalyticsProviders } from '@/components/analytics/AnalyticsProviders';
import { FloatingQuickFlashcards } from '@/components/layout/FloatingQuickFlashcards';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { SiteAmbientMotion } from '@/components/layout/SiteAmbientMotion';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SiteJsonLd } from '@/components/seo/site-json-ld';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME, SEO_KEYWORDS } from '@/constants/site';
import { cn } from '@/utils/cn';
import { OG_IMAGE_PATH } from '@/utils/seo-metadata';
import { getSiteUrl } from '@/utils/site-url';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0C1B33' },
  ],
  colorScheme: 'dark light',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang='fr'
      className={cn(inter.variable, dmSans.variable, instrumentSerif.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          'relative min-h-screen bg-transparent font-sans text-slate-900 antialiased dark:text-examen-ink',
        )}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AnalyticsProviders>
            <SiteBackground />
            <SiteAmbientMotion />
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
          </AnalyticsProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
