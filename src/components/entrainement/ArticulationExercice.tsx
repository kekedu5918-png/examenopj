'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { CartoucheData } from '@/components/entrainement/articulation-types';
import { ArticulationRecap } from '@/components/entrainement/ArticulationRecap';
import { CartoucheEditable } from '@/components/entrainement/CartoucheEditable';
import { CartoucheValidee } from '@/components/entrainement/CartoucheValidee';

const STORAGE_KEY = 'examenopj:articulation-brouillon';

type Stored = {
  version: 1;
  cartouches: CartoucheData[];
  titreArticulation: string;
  termine: boolean;
};

function makeEmpty(id: number): CartoucheData {
  return { id, date: '', heure: '', qualite: '', titre: '', contenu: '', valide: false };
}

const initialCartouches: CartoucheData[] = [makeEmpty(1)];

export function ArticulationExercice() {
  const [cartouches, setCartouches] = useState<CartoucheData[]>(initialCartouches);
  const [titreArticulation, setTitreArticulation] = useState('');
  const [termine, setTermine] = useState(false);
  const [flashingId, setFlashingId] = useState<number | null>(null);
  const [draftPrompt, setDraftPrompt] = useState<Stored | null>(null);
  const [allowPersist, setAllowPersist] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Stored;
        if (parsed?.version === 1 && Array.isArray(parsed.cartouches) && parsed.cartouches.length) {
          setDraftPrompt(parsed);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setAllowPersist(true);
  }, []);

  useEffect(() => {
    if (!allowPersist) return;
    const payload: Stored = {
      version: 1,
      cartouches,
      titreArticulation,
      termine,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota */
    }
  }, [allowPersist, cartouches, titreArticulation, termine]);

  const handleValidate = useCallback((data: CartoucheData) => {
    setCartouches((prev) => {
      const idx = prev.findIndex((c) => c.id === data.id);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = data;
      const wasLast = idx === next.length - 1;
      if (wasLast) {
        const nextId = Math.max(...next.map((c) => c.id), 0) + 1;
        next.push(makeEmpty(nextId));
      }
      return next;
    });
    setFlashingId(data.id);
    window.setTimeout(() => setFlashingId(null), 450);
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleEdit = useCallback((id: number) => {
    setCartouches((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      return prev.slice(0, idx + 1).map((c) => (c.id === id ? { ...c, valide: false } : c));
    });
    requestAnimationFrame(() => {
      document.getElementById(`art-scroll-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, []);

  const handleTerminer = useCallback(() => {
    setCartouches((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;
      if (last.valide) return prev;
      const full = Boolean(
        last.date?.trim() &&
          last.heure?.trim() &&
          last.qualite?.trim() &&
          last.titre?.trim() &&
          last.contenu?.trim(),
      );
      if (full) {
        return [...prev.slice(0, -1), { ...last, valide: true }];
      }
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
    setTermine(true);
  }, []);

  const handleRecommencer = useCallback(() => {
    setCartouches(initialCartouches);
    setTitreArticulation('');
    setTermine(false);
    setFlashingId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const reprendreBrouillon = useCallback(() => {
    if (!draftPrompt) return;
    setCartouches(draftPrompt.cartouches);
    setTitreArticulation(draftPrompt.titreArticulation ?? '');
    setTermine(draftPrompt.termine ?? false);
    setDraftPrompt(null);
    setAllowPersist(true);
  }, [draftPrompt]);

  const ignorerBrouillon = useCallback(() => {
    setDraftPrompt(null);
    setAllowPersist(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const validesCount = cartouches.filter((c) => c.valide).length;
  const showTerminer = cartouches.length >= 2 || validesCount >= 1;
  const lastCartouche = cartouches[cartouches.length - 1];

  if (termine) {
    return (
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <ArticulationRecap
          titreArticulation={titreArticulation}
          cartouches={cartouches}
          onRecommencer={handleRecommencer}
        />
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl px-4 py-8'>
      {draftPrompt ? (
        <div
          role='dialog'
          aria-modal
          aria-labelledby='draft-title'
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
        >
          <div className='max-w-md rounded-2xl border border-white/15 bg-navy-900 p-6 shadow-xl'>
            <h2 id='draft-title' className='font-display text-lg font-bold text-white'>
              Reprendre votre brouillon ?
            </h2>
            <p className='mt-2 text-sm text-gray-400'>
              Une articulation en cours a été enregistrée dans ce navigateur.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <button
                type='button'
                onClick={reprendreBrouillon}
                className='rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700'
              >
                Oui, reprendre
              </button>
              <button
                type='button'
                onClick={ignorerBrouillon}
                className='rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10'
              >
                Non, tout effacer
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header className='mb-8 rounded-xl border border-white/10 bg-white/[0.04] p-6 text-gray-200'>
        <p className='text-2xl' aria-hidden>
          📝
        </p>
        <h1 className='mt-2 font-display text-2xl font-bold text-white'>Exercice : Articulation de procédure</h1>
        <p className='mt-3 text-sm leading-relaxed text-gray-400'>
          Construisez votre articulation cartouche par cartouche. Remplissez le titre, le contenu, la date, l&apos;heure
          et la qualité de chaque côte PV. Le numéro s&apos;incrémente automatiquement.
        </p>
        <div className='mt-4'>
          <label htmlFor='titre-art' className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
            Titre de votre articulation (optionnel)
          </label>
          <input
            id='titre-art'
            value={titreArticulation}
            onChange={(e) => setTitreArticulation(e.target.value)}
            placeholder='ARTICULATION DE PROCÉDURE — ENQUÊTE « … » n° …'
            className='mt-1 w-full rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-500/50'
          />
        </div>
        <p className='mt-4 text-sm text-amber-200/90'>
          💡 Conseil : commencez par la saisine (plainte ou constatation), puis suivez l&apos;ordre chronologique de vos
          actes d&apos;enquête.
        </p>
      </header>

      <div className='space-y-4'>
        {cartouches.map((c) => {
          if (c.valide) {
            return (
              <div key={c.id}>
                <CartoucheValidee data={c} onEdit={() => handleEdit(c.id)} flash={flashingId === c.id} />
              </div>
            );
          }
          const isLastEditable = c.id === lastCartouche?.id;
          return (
            <div
              key={c.id}
              id={`art-scroll-${c.id}`}
              ref={isLastEditable ? bottomRef : undefined}
              className='motion-safe:animate-[articFade_0.35s_ease-out]'
            >
              <CartoucheEditable
                numero={c.id}
                initialData={c}
                onValidate={handleValidate}
                onTerminer={handleTerminer}
                showTerminer={showTerminer}
              />
            </div>
          );
        })}
      </div>
      <style jsx global>{`
        @keyframes articFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
