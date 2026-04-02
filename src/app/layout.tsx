import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

const calSans = localFont({
  src: './fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
  weight: '600',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ExamenOPJ — Révisions OPJ 2026',
  description:
    "La plateforme de référence pour préparer l'examen d'Officier de Police Judiciaire. Fascicules, méthodologie, quiz, flashcards.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='fr' className={cn('dark', calSans.variable)}>
      <body className={cn('min-h-screen bg-navy-950 font-sans text-white antialiased')}>
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
