import Link from 'next/link';

import { BrandWordmark } from '@/components/layout/BrandWordmark';
import { SITE_LAST_UPDATED_LABEL } from '@/constants/site';

const colLink =
  'text-sm text-ij-text-muted transition-colors duration-150 hover:text-ij-text hover:translate-x-0.5 inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ij-bg';

export function Footer() {
  return (
    <footer data-site-footer className='relative mt-auto overflow-hidden border-t border-ij-border'>
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ij-accent/35 to-transparent'
        aria-hidden
      />
      {/* Background */}
      <div className='absolute inset-0 bg-ij-surface/90 dark:bg-gradient-to-b dark:from-transparent dark:via-ij-surface/90 dark:to-ij-bg' />
      <div
        className='pointer-events-none absolute bottom-0 left-1/2 h-56 w-[min(600px,90vw)] -translate-x-1/2 bg-ij-primary/18 opacity-70 blur-[90px] dark:bg-ij-primary/25 dark:opacity-50'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute bottom-8 right-[15%] h-40 w-40 rounded-full bg-ij-accent/14 opacity-60 blur-[70px] dark:bg-ij-accent/20'
        aria-hidden
      />

      <div className='relative mx-auto max-w-6xl px-4 py-14 md:py-16'>
        {/* Top section */}
        <div className='mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end'>
          <div>
            <div className='mb-3'>
              <BrandWordmark href='/' size='footer' />
            </div>
            <p className='max-w-xs text-sm leading-relaxed text-ij-text-muted'>
              Préparation complète à l&apos;examen OPJ session 2026.
              <br />
              Site indépendant · Non affilié à l&apos;administration.
            </p>
          </div>

          {/* Live status */}
          <div className='flex items-center gap-2 rounded-full border border-ij-success/25 bg-ij-success/10 px-4 py-2 text-xs font-semibold text-ij-success'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-ij-success opacity-60' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-ij-success' />
            </span>
            Contenu mis à jour — Juin 2026
          </div>
        </div>

        {/* Links grid */}
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-ij-text'>Apprendre</p>
            <ul className='space-y-2.5'>
              {[
                { href: '/fondamentaux', label: 'Fondamentaux' },
                { href: '/infractions', label: 'Infractions' },
                { href: '/enquetes', label: 'Enquêtes' },
                { href: '/epreuves', label: 'Épreuves' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-ij-text'>
              S&apos;entraîner
            </p>
            <ul className='space-y-2.5'>
              {[
                { href: '/entrainement/quiz', label: 'Quiz' },
                { href: '/entrainement/flashcards', label: 'Flashcards' },
                { href: '/entrainement/articulation', label: 'Articulation' },
                { href: '/entrainement/redaction-pv', label: 'Rédaction PV' },
                { href: '/entrainement', label: 'Hub entraînement' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-ij-text'>Premium</p>
            <ul className='space-y-2.5'>
              {[
                { href: '/pricing', label: 'Tarifs & abonnements' },
                { href: '/inscription', label: "Créer un compte" },
                { href: '/login', label: 'Se connecter' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='mb-4 text-xs font-bold uppercase tracking-widest text-ij-text'>Informations</p>
            <ul className='space-y-2.5'>
              {[
                { href: '/a-propos', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/cgv', label: 'CGV' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-12 flex flex-col items-center justify-between gap-3 border-t border-ij-border pt-8 md:flex-row'>
          <p className='text-xs text-ij-text-muted' suppressHydrationWarning>
            © {new Date().getFullYear()} ExamenOPJ.fr · Tous droits réservés
          </p>
          <p className='text-xs text-ij-text-muted'>
            Dernière mise à jour : {SITE_LAST_UPDATED_LABEL}
          </p>
        </div>
      </div>
    </footer>
  );
}
