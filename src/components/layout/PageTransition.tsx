'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence mode='wait'>
      {/*
        Pas d’opacity sur l’entrée/sortie : pendant le spring, axe/playwright peut
        mesurer un texte semi-transparent et signaler de faux échecs de contraste.
      */}
      <motion.main
        key={pathname}
        id='contenu-principal'
        className='relative flex-1 scroll-mt-28'
        tabIndex={-1}
        initial={shouldReduce ? {} : { y: 16 }}
        animate={{ y: 0 }}
        exit={shouldReduce ? {} : { y: -12 }}
        transition={
          shouldReduce
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 380, damping: 32, mass: 0.85 }
        }
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
