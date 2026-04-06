'use client';

import { useCallback, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Lock, Search } from 'lucide-react';

import { modelePVCardExcerpt, modelePVSearchBlob } from '@/lib/modele-pv-plaintext';
import { PV_CATEGORIE_META,PV_CATEGORIES_ORDER } from '@/lib/pv-categories';
import type { ModelePV, PVCategorie } from '@/types/pv';
import { cn } from '@/utils/cn';

const FASCICULES = Array.from({ length: 15 }, (_, i) => `F${String(i + 1).padStart(2, '0')}`);

type Props = {
  modeles: ModelePV[];
};

function parseCats(s: string | null): Set<PVCategorie> {
  if (!s) return new Set();
  const next = new Set<PVCategorie>();
  for (const p of s.split(',').map((x) => x.trim())) {
    if (PV_CATEGORIES_ORDER.includes(p as PVCategorie)) next.add(p as PVCategorie);
  }
  return next;
}

function parseFac(s: string | null): Set<string> {
  if (!s) return new Set();
  const next = new Set<string>();
  for (const p of s.split(',').map((x) => x.trim().toUpperCase())) {
    if (FASCICULES.includes(p)) next.add(p);
  }
  return next;
}

export function ModelesPVIndexClient({ modeles }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const q = searchParams.get('q') ?? '';
  const cats = useMemo(() => parseCats(searchParams.get('cats')), [searchParams]);
  const facs = useMemo(() => parseFac(searchParams.get('fac')), [searchParams]);

  const syncUrl = useCallback(
    (next: { q?: string; cats?: Set<PVCategorie>; facs?: Set<string> }) => {
      const p = new URLSearchParams(searchParams.toString());
      const qv = next.q !== undefined ? next.q : q;
      const cv = next.cats ?? cats;
      const fv = next.facs ?? facs;

      if (qv.trim()) p.set('q', qv.trim());
      else p.delete('q');

      if (cv.size > 0) p.set('cats', [...cv].join(','));
      else p.delete('cats');

      if (fv.size > 0) p.set('fac', [...fv].join(','));
      else p.delete('fac');

      const qs = p.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [cats, facs, pathname, q, router, searchParams],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return modeles.filter((m) => {
      if (cats.size > 0 && !cats.has(m.categorie)) return false;
      if (facs.size > 0 && !facs.has(m.fascicule)) return false;
      if (!needle) return true;
      return modelePVSearchBlob(m).includes(needle);
    });
  }, [cats, facs, modeles, q]);

  function toggleCat(c: PVCategorie) {
    const next = new Set(cats);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    syncUrl({ cats: next });
  }

  function toggleFac(f: string) {
    const next = new Set(facs);
    if (next.has(f)) next.delete(f);
    else next.add(f);
    syncUrl({ facs: next });
  }

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-28 pt-6 md:flex-row md:items-start md:pt-10'>
      <aside className='w-full shrink-0 md:sticky md:top-24 md:w-72'>
        <div className='rounded-2xl border border-white/[0.08] bg-examen-card p-4 shadow-ex-card'>
          <p className='text-xs font-bold uppercase tracking-wider text-examen-inkMuted'>Recherche</p>
          <div className='relative mt-2'>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-examen-inkMuted' />
            <input
              type='search'
              value={q}
              onChange={(e) => syncUrl({ q: e.target.value })}
              placeholder='Mot-clé, infraction, article…'
              className='w-full rounded-lg border border-white/[0.1] bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-examen-ink placeholder:text-examen-inkMuted focus:border-examen-accent/40 focus:outline-none focus:ring-1 focus:ring-examen-accent/35'
              aria-label='Recherche plein texte dans les modèles'
            />
          </div>

          <p className='mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-examen-inkMuted'>Catégorie</p>
          <ul className='space-y-1.5'>
            {PV_CATEGORIES_ORDER.map((c) => (
              <li key={c}>
                <label className='flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white/[0.04]'>
                  <input
                    type='checkbox'
                    checked={cats.has(c)}
                    onChange={() => toggleCat(c)}
                    className='rounded border-white/20 bg-white/[0.06] text-examen-accent focus:ring-examen-accent/40'
                  />
                  <span className='text-examen-ink'>{PV_CATEGORIE_META[c].label}</span>
                </label>
              </li>
            ))}
          </ul>

          <p className='mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-examen-inkMuted'>Fascicule</p>
          <div className='grid max-h-48 grid-cols-3 gap-1 overflow-y-auto pr-1 text-xs'>
            {FASCICULES.map((f) => (
              <label
                key={f}
                className='flex cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent px-1 py-1 hover:bg-white/[0.04]'
              >
                <input
                  type='checkbox'
                  checked={facs.has(f)}
                  onChange={() => toggleFac(f)}
                  className='rounded border-white/20 bg-white/[0.06] text-examen-accent focus:ring-examen-accent/40'
                />
                <span className='text-examen-ink'>{f}</span>
              </label>
            ))}
          </div>

          <p className='mt-6 text-center text-sm font-semibold text-examen-accent' aria-live='polite'>
            {filtered.length} modèle{filtered.length > 1 ? 's' : ''}
          </p>
        </div>
      </aside>

      <div className='min-w-0 flex-1'>
        <div className='grid gap-4 sm:grid-cols-2'>
          {filtered.map((m) => (
            <Link
              key={m.id}
              href={`/cours/modeles-pv/${m.id}`}
              className='group flex flex-col rounded-2xl border border-white/[0.08] bg-examen-card p-5 shadow-ex-card transition duration-200 hover:-translate-y-0.5 hover:border-examen-accent/35 hover:shadow-ex-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-examen-accent/50'
            >
              <div className='flex flex-wrap items-center gap-2'>
                <span
                  className={cn(
                    'inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1',
                    PV_CATEGORIE_META[m.categorie].badgeClass,
                  )}
                >
                  {PV_CATEGORIE_META[m.categorie].shortLabel}
                </span>
                <span className='rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-examen-inkMuted'>
                  {m.fascicule}
                </span>
                {m.isPremium ? (
                  <span className='inline-flex items-center gap-0.5 rounded-md border border-examen-premium/35 bg-examen-premium/15 px-2 py-0.5 text-[10px] font-bold text-violet-200'>
                    <Lock className='h-3 w-3' aria-hidden />
                    Premium
                  </span>
                ) : null}
              </div>
              <h2 className='mt-3 font-display text-lg font-bold text-white group-hover:text-examen-accent'>{m.titre}</h2>
              <p className='mt-2 line-clamp-3 text-sm text-examen-inkMuted'>{modelePVCardExcerpt(m, 140)}</p>
              <span className='mt-4 text-sm font-semibold text-examen-accent'>
                Voir le modèle <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className='mt-10 text-center text-sm text-examen-inkMuted'>Aucun modèle ne correspond à ces filtres.</p>
        ) : null}
      </div>
    </div>
  );
}
