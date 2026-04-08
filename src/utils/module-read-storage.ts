const STORAGE_KEY = 'examenopj:modules-read';

function safeParse(json: string | null): string[] {
  if (!json) return [];
  try {
    const v: unknown = JSON.parse(json);
    if (!Array.isArray(v)) return [];
    return v.filter((x): x is string => typeof x === 'string');
  } catch {
    return [];
  }
}

export function getReadModuleIdsFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function isModuleMarkedRead(id: string): boolean {
  return getReadModuleIdsFromStorage().includes(id);
}

export function markModuleAsRead(id: string): void {
  if (typeof window === 'undefined') return;
  const cur = safeParse(window.localStorage.getItem(STORAGE_KEY));
  if (cur.includes(id)) return;
  const next = [...cur, id];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('examenopj:module-read', { detail: { id } }));
}
