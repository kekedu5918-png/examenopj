'use client';

import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

/** Barre de navigation globale sticky. */
export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      className='navbar-main'
      aria-label='Navigation principale'
      style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0)',
        borderBottomColor: scrolled ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Link href='/' className='navbar-logo'>
        ExamenOPJ
      </Link>
      <div className='navbar-links'>
        <Link href='/epreuves'>Épreuves</Link>
        <Link href='/enquetes'>Enquêtes</Link>
        <Link href='/cours'>Modules</Link>
        <Link href='/quiz'>Quiz</Link>
      </div>
      <div className='navbar-actions'>
        <Link href='/connexion' className='navbar-login'>
          Connexion
        </Link>
        <Link href='/inscription' className='navbar-cta'>
          Commencer →
        </Link>
      </div>
    </motion.nav>
  );
}
