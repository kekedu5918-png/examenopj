'use client';

import { useSyncExternalStore } from 'react';

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Préférence utilisateur « reduced motion » — alignée sur `matchMedia` (Playwright / e2e inclus).
 * Variants Framer : passer ce booléen aux helpers motion.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReduced, getReducedSnapshot, getServerSnapshot);
}
