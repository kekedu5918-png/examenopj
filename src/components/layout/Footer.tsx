import Link from 'next/link';

import { ExamenOpjLogo } from '@/components/layout/ExamenOpjLogo';
import { SITE_LAST_UPDATED_LABEL } from '@/constants/site';

const colLink = 'text-sm text-examen-inkMuted transition hover:text-examen-ink';

export function Footer() {
  return (
    <footer className='relative mt-auto border-t border-white/[0.06] bg-examen-canvas'>
      <div className='mx-auto max-w-6xl px-4 py-14 md:py-16'>
        <div className='mb-10'>
          <div className='mb-3 flex items-center gap-2'>
            <ExamenOpjLogo size={28} />
            <span className='font-display text-sm font-black tracking-[0.12em] text-white'>EXAMENOPJ</span>
          </div>
          <p className='max-w-md text-sm leading-relaxed text-examen-inkMuted'>
            Préparation OPJ session 2026
            <br />
            Site indépendant · Non affilié à l&apos;administration
          </p>
        </div>

        <div className='grid gap-10 md:grid-cols-3 md:gap-8'>
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-examen-inkMuted'>Apprendre</p>
            <ul className='space-y-2'>
              <li>
                <Link href='/fondamentaux' className={colLink}>
                  Fondamentaux
                </Link>
              </li>
              <li>
                <Link href='/infractions' className={colLink}>
                  Infractions
                </Link>
              </li>
              <li>
                <Link href='/cours/modules' className={colLink}>
                  Modules F01–F15
                </Link>
              </li>
              <li>
                <Link href='/cours/enquetes' className={colLink}>
                  Enquêtes
                </Link>
              </li>
              <li>
                <Link href='/guide-revision-opj' className={colLink}>
                  Guide de révision
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-examen-inkMuted'>
              S&apos;entraîner
            </p>
            <ul className='space-y-2'>
              <li>
                <Link href='/quiz' className={colLink}>
                  Quiz
                </Link>
              </li>
              <li>
                <Link href='/flashcards' className={colLink}>
                  Flashcards
                </Link>
              </li>
              <li>
                <Link href='/parcours-candidat' className={colLink}>
                  Parcours candidat
                </Link>
              </li>
              <li>
                <Link href='/sujets-blancs' className={colLink}>
                  Sujets blancs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-examen-inkMuted'>Informations</p>
            <ul className='space-y-2'>
              <li>
                <Link href='/a-propos' className={colLink}>
                  À propos
                </Link>
              </li>
              <li>
                <Link href='/contact' className={colLink}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='/mentions-legales' className={colLink}>
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href='/cgv' className={colLink}>
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-white/[0.06] pt-8'>
          <p className='text-center text-xs text-examen-inkMuted/90' suppressHydrationWarning>
            © {new Date().getFullYear()} ExamenOPJ.fr · Dernière mise à jour : {SITE_LAST_UPDATED_LABEL}
          </p>
        </div>
      </div>
    </footer>
  );
}
