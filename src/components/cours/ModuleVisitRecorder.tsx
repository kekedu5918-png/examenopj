'use client';

import { useEffect } from 'react';

import { markModuleAsRead } from '@/utils/module-read-storage';

type Props = { moduleId: string };

export function ModuleVisitRecorder({ moduleId }: Props) {
  useEffect(() => {
    markModuleAsRead(moduleId);
  }, [moduleId]);
  return null;
}
