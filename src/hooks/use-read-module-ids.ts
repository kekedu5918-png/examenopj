'use client';

import { useCallback, useEffect, useState } from 'react';

import { getReadModuleIdsFromStorage } from '@/utils/module-read-storage';

export function useReadModuleIds(): ReadonlySet<string> {
  const [ids, setIds] = useState<ReadonlySet<string>>(() => new Set(getReadModuleIdsFromStorage()));

  const sync = useCallback(() => {
    setIds(new Set(getReadModuleIdsFromStorage()));
  }, []);

  useEffect(() => {
    sync();
    function onStorage(e: StorageEvent) {
      if (e.key === 'examenopj:modules-read') sync();
    }
    function onCustom() {
      sync();
    }
    window.addEventListener('storage', onStorage);
    window.addEventListener('examenopj:module-read', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('examenopj:module-read', onCustom);
    };
  }, [sync]);

  return ids;
}
