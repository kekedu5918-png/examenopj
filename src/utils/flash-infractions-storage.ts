/** Persistance résultats mode flash révision infractions. */

import type { InfractionCatalogItem } from '@/data/recapitulatif-data';

export type FlashMark = 'su' | 'arevoir';

export type FlashResultEntry = { status: FlashMark; date: string };

const KEY = 'flash-results-infractions';

function safeParse(raw: string | null): Record<string, FlashResultEntry> {
  if (!raw) return {};
  try {
    const j = JSON.parse(raw) as unknown;
    if (j == null || typeof j !== 'object' || Array.isArray(j)) return {};
    const out: Record<string, FlashResultEntry> = {};
    for (const [k, v] of Object.entries(j)) {
      if (v && typeof v === 'object' && 'status' in v && (v.status === 'su' || v.status === 'arevoir')) {
        const date = typeof (v as FlashResultEntry).date === 'string' ? (v as FlashResultEntry).date : '';
        out[k] = { status: v.status as FlashMark, date: date || new Date().toISOString() };
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function loadFlashResults(): Record<string, FlashResultEntry> {
  if (typeof window === 'undefined') return {};
  return safeParse(window.localStorage.getItem(KEY));
}

export function saveFlashMark(id: string, status: FlashMark): void {
  try {
    const cur = loadFlashResults();
    cur[id] = { status, date: new Date().toISOString() };
    window.localStorage.setItem(KEY, JSON.stringify(cur));
  } catch {
    /* ignore */
  }
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = t;
  }
  return arr;
}

export function buildFlashDeck(
  base: InfractionCatalogItem[],
  opts: {
    fasc: 'all' | 'F01' | 'F02';
    onlyArevoir: boolean;
    shuffle: boolean;
  },
): InfractionCatalogItem[] {
  let list = [...base];
  if (opts.fasc === 'F01') list = list.filter((i) => i.fascicule === 'F01');
  if (opts.fasc === 'F02') list = list.filter((i) => i.fascicule === 'F02');
  const results = loadFlashResults();
  const arevoir = list.filter((i) => results[i.id]?.status === 'arevoir');
  const rest = list.filter((i) => results[i.id]?.status !== 'arevoir');
  if (opts.onlyArevoir) {
    const deck = [...arevoir];
    if (opts.shuffle) shuffleInPlace(deck);
    return deck;
  }
  const deck = [...arevoir, ...rest];
  if (opts.shuffle) shuffleInPlace(deck);
  return deck;
}

export function flashSessionSummary(deck: InfractionCatalogItem[]): { su: number; arevoir: number } {
  const r = loadFlashResults();
  let su = 0;
  let ar = 0;
  for (const item of deck) {
    const e = r[item.id]?.status;
    if (e === 'su') su++;
    else if (e === 'arevoir') ar++;
  }
  return { su, arevoir: ar };
}
