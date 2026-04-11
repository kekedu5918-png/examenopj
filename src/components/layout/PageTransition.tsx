'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence mode='wait'>
      <motion.main
        key={pathname}
        id='contenu-principal'
        className='relative flex-1 scroll-mt-28'
        tabIndex={-1}
        initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduce ? {} : { opacity: 0, y: -12 }}
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
