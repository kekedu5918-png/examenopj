import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ExamenOPJ — Révisions OPJ 2026',
  description:
    "La plateforme de référence pour préparer l'examen d'Officier de Police Judiciaire. Fascicules, méthodologie, quiz, flashcards.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='fr' className='dark'>
      <body
        className={cn(
          inter.className,
          inter.variable,
          'min-h-screen bg-navy-950 font-body text-white antialiased'
        )}
      >
        <div className='flex min-h-screen flex-col'>
          <Navbar />
          <main className='relative flex-1'>{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
