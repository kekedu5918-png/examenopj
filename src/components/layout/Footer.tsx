import Link from 'next/link';

import { MascotteJules } from '@/components/brand';
import { BrandWordmark } from '@/components/layout/BrandWordmark';
import { SITE_LAST_UPDATED_LABEL } from '@/constants/site';

const colLink =
  'text-sm text-slate-600 transition-colors duration-150 hover:text-slate-900 hover:translate-x-0.5 dark:text-slate-500 dark:hover:text-slate-300 inline-block';

export function Footer() {
  return (
    <footer className='relative mt-auto overflow-hidden border-t border-slate-200 dark:border-white/[0.06]'>
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent'
        aria-hidden
      />
      {/* Background */}
      <div className='absolute inset-0 bg-slate-50/90 dark:bg-gradient-to-b dark:from-transparent dark:via-[color:var(--ex-canvas)]/85 dark:to-[#030508]' />
      <div
        className='pointer-events-none absolute bottom-0 left-1/2 h-56 w-[min(600px,90vw)] -translate-x-1/2 opacity-[0.14] blur-[90px]'
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.9) 0%, rgba(124,58,237,0.35) 45%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className='pointer-events-none absolute bottom-8 right-[15%] h-40 w-40 rounded-full opacity-[0.12] blur-[70px]'
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className='relative mx-auto max-w-6xl px-4 py-14 md:py-16'>
        {/* Top section */}
        <div className='mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end'>
          <div>
            <div className='mb-3 flex items-center gap-3'>
              <MascotteJules size={44} animate={false} />
              <BrandWordmark href='/' size='footer' />
            </div>
            <p className='max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-500'>
              Préparation complète à l&apos;examen OPJ session 2026.
              <br />
              Site indépendant · Non affilié à l&apos;administration.
            </p>
          </div>

          {/* Live status */}
          <div className='flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-2 text-xs font-semibold text-emerald-400'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
            </span>
            Contenu mis à jour — Juin 2026
          </div>
        </div>

        {/* Links grid */}
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-slate-600'>Cours</p>
            <ul className='space-y-2.5'>
              {[
                { href: '/cours', label: 'Cours' },
                { href: '/entrainement/enquetes', label: 'Enquêtes' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-slate-600'>Infractions</p>
            <ul className='space-y-2.5'>
              {[{ href: '/infractions', label: 'Référentiel' }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-slate-600'>
              S&apos;entraîner
            </p>
            <ul className='space-y-2.5'>
              {[
                { href: '/entrainement/quiz', label: 'Quiz QCM' },
                { href: '/entrainement/flashcards', label: 'Flashcards' },
                { href: '/entrainement', label: 'Hub entraînement' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-slate-600'>Informations</p>
            <ul className='space-y-2.5'>
              {[
                { href: '/a-propos', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/cgv', label: 'CGV' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-8 md:flex-row'>
          <p className='text-xs text-slate-600' suppressHydrationWarning>
            © {new Date().getFullYear()} ExamenOPJ.fr · Tous droits réservés
          </p>
          <p className='text-xs text-slate-600'>
            Dernière mise à jour : {SITE_LAST_UPDATED_LABEL}
          </p>
        </div>
      </div>
    </footer>
  );
}
