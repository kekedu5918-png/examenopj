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
        initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduce ? {} : { opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
