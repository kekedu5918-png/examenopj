import Link from 'next/link';

import { ExamenOpjLogo } from '@/components/layout/ExamenOpjLogo';

const colLink = 'text-sm text-examen-inkMuted transition hover:text-examen-ink';

export function Footer() {
  return (
    <footer className='relative mt-auto border-t border-white/[0.06] bg-examen-canvas'>
      <div className='mx-auto max-w-6xl px-4 py-14 md:py-16'>
        <div className='grid gap-10 md:grid-cols-3 md:gap-8'>
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-examen-inkMuted'>Contenus</p>
            <div className='mb-4'>
              <ExamenOpjLogo size='sm' className='text-white' />
            </div>
            <p className='mb-4 max-w-xs text-sm leading-relaxed text-examen-inkMuted'>
              La référence pour la préparation OPJ
            </p>
            <ul className='space-y-2'>
              <li>
                <Link href='/cours/modules' className={colLink}>
                  Cours
                </Link>
              </li>
              <li>
                <Link href='/guide-revision-opj' className={colLink}>
                  Guide
                </Link>
              </li>
              <li>
                <Link href='/infractions' className={colLink}>
                  Infractions
                </Link>
              </li>
              <li>
                <Link href='/fondamentaux' className={colLink}>
                  Fondamentaux
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-examen-inkMuted'>Entraînement</p>
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
            <p className='mt-6 text-xs text-examen-inkMuted/80' suppressHydrationWarning>
              © {new Date().getFullYear()} ExamenOPJ.fr
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
