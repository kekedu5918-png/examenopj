'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';

import {
  PVMe1DocumentShell,
  PVMe1DocumentSingle,
  splitMe1TemplateTwoColumns,
} from '@/components/pv/pv-me1-document-shell';
import { useToast } from '@/components/ui/use-toast';
import {
  fillPVTemplate,
  parsePVTemplateSegments,
  type PVMe1TemplateExerciseConfig,
  type PVTemplateSegment,
} from '@/data/pv-me1-exercise-types';
import { cn } from '@/utils/cn';

type Props = {
  config: PVMe1TemplateExerciseConfig;
};

const ZONE_BASE =
  'rounded-sm border-b-2 border-dashed border-amber-400/55 bg-amber-500/[0.08] text-amber-50 caret-emerald-300 placeholder:text-amber-200/35 focus:border-emerald-400/80 focus:bg-emerald-500/10 focus:outline-none';

function SegmentEditor({
  segments,
  fieldMeta,
  values,
  setField,
  uid,
  keyPrefix,
}: {
  segments: PVTemplateSegment[];
  fieldMeta: Map<string, PVMe1TemplateExerciseConfig['fields'][number]>;
  values: Record<string, string>;
  setField: (key: string, v: string) => void;
  uid: string;
  keyPrefix: string;
}) {
  return (
    <div className='font-mono text-[11px] leading-relaxed text-gray-200 print:text-[10px] print:text-black'>
      {segments.map((seg, i) => {
        if (seg.type === 'text') {
          return (
            <span key={`${keyPrefix}-t-${i}`} className='whitespace-pre-wrap'>
              {seg.value}
            </span>
          );
        }
        const meta = fieldMeta.get(seg.key);
        const multiline = meta?.multiline ?? false;
        const id = `${uid}-${keyPrefix}-${seg.key}-${i}`;
        const val = values[seg.key] ?? '';
        if (multiline) {
          return (
            <textarea
              key={`${keyPrefix}-f-${seg.key}-${i}`}
              id={id}
              name={seg.key}
              rows={Math.max(3, val.split('\n').length)}
              value={val}
              placeholder='…'
              onChange={(e) => setField(seg.key, e.target.value)}
              className={cn('my-1.5 block w-full resize-y px-1 py-1', ZONE_BASE, meta?.mono && 'text-[11px]')}
              aria-label={meta?.label ?? seg.key}
            />
          );
        }
        return (
          <input
            key={`${keyPrefix}-f-${seg.key}-${i}`}
            id={id}
            name={seg.key}
            type='text'
            value={val}
            placeholder='…'
            onChange={(e) => setField(seg.key, e.target.value)}
            className={cn(
              'mx-0.5 inline min-h-[1.35em] min-w-[12ch] max-w-[min(100%,520px)] align-baseline px-1 py-0',
              ZONE_BASE,
              meta?.mono && 'text-[11px]',
            )}
            aria-label={meta?.label ?? seg.key}
          />
        );
      })}
    </div>
  );
}

export function PVTemplateExercise({ config }: Props) {
  const uid = useId();
  const { toast } = useToast();
  const [hydrated, setHydrated] = useState(false);
  const initial: Record<string, string> = useMemo(
    () => Object.fromEntries(config.fields.map((f) => [f.key, ''])),
    [config.fields],
  );
  const [values, setValues] = useState<Record<string, string>>(initial);

  const fieldMeta = useMemo(() => new Map(config.fields.map((f) => [f.key, f])), [config.fields]);
  const columnSplit = useMemo(() => splitMe1TemplateTwoColumns(config.previewTemplate), [config.previewTemplate]);
  const leftSegments = useMemo(
    () => (columnSplit ? parsePVTemplateSegments(columnSplit.left) : null),
    [columnSplit],
  );
  const rightSegments = useMemo(
    () => (columnSplit ? parsePVTemplateSegments(columnSplit.right) : null),
    [columnSplit],
  );
  const singleSegments = useMemo(
    () => (columnSplit ? null : parsePVTemplateSegments(config.previewTemplate)),
    [columnSplit, config.previewTemplate],
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(config.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const next: Record<string, string> = { ...initial };
        for (const k of Object.keys(next)) {
          if (typeof parsed[k] === 'string') next[k] = parsed[k];
        }
        setValues(next);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [config.storageKey, initial]);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(config.storageKey, JSON.stringify(values));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [hydrated, config.storageKey, values]);

  const assembled = useMemo(() => fillPVTemplate(config.previewTemplate, values), [config.previewTemplate, values]);

  const setField = useCallback((key: string, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  }, []);

  const reset = useCallback(() => {
    setValues(initial);
    try {
      localStorage.removeItem(config.storageKey);
    } catch {
      /* ignore */
    }
    toast({ title: 'Réinitialisé', description: 'Brouillon effacé.' });
  }, [config.storageKey, initial, toast]);

  const copyAssembled = useCallback(() => {
    void navigator.clipboard.writeText(assembled).then(
      () => toast({ title: 'Copié', description: 'PV assemblé (texte continu) prêt à coller.' }),
      () => toast({ title: 'Échec', description: 'Copie manuelle depuis le document.', variant: 'destructive' }),
    );
  }, [assembled, toast]);

  const editorProps = {
    fieldMeta,
    values,
    setField,
    uid,
  };

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3'>
        <p className='text-[11px] leading-snug text-slate-500'>
          <span className='text-slate-400'>Mise en page type ME1</span> — deux colonnes (marge / PV) lorsque le modèle le
          prévoit ; saisie dans les zones en pointillés. {config.articles}
          {!hydrated ? ' — Chargement…' : ' — Brouillon local.'}
        </p>
        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={copyAssembled}
            className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
          >
            Copier le PV final
          </button>
          <button
            type='button'
            onClick={reset}
            className='rounded-lg border border-rose-500/35 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-500/20'
          >
            Tout effacer
          </button>
        </div>
      </div>

      <details className='group rounded-xl border border-amber-500/20 bg-amber-500/[0.06] open:bg-amber-500/[0.08]'>
        <summary className='cursor-pointer list-none px-4 py-3 text-sm font-semibold text-amber-100 [&::-webkit-details-marker]:hidden'>
          Consignes{' '}
          <span className='text-xs font-normal text-amber-200/70'>(cliquer pour afficher)</span>
        </summary>
        <ul className='border-t border-amber-500/15 px-4 pb-4 pt-2 text-sm text-amber-100/90'>
          {config.consignes.map((c) => (
            <li key={c} className='list-inside list-disc'>
              {c}
            </li>
          ))}
        </ul>
      </details>

      <div>
        <h4 className='mb-2 text-[11px] font-bold uppercase tracking-wide text-emerald-400/90'>
          Feuille de procès-verbal (rendu proche du PDF ME1)
        </h4>
        <p className='mb-3 text-[11px] text-slate-500'>
          Colonne étroite à gauche (coordonnées, code INSEE, n° marginal), corps à droite. À l’examen, recopier un texte
          continu sans zones colorées.
        </p>
        <div
          className='max-h-[min(75vh,920px)] overflow-auto print:max-h-none'
          aria-label='Zone de rédaction du procès-verbal'
        >
          {columnSplit && leftSegments && rightSegments ? (
            <PVMe1DocumentShell
              plain
              left={<SegmentEditor {...editorProps} segments={leftSegments} keyPrefix='L' />}
              right={<SegmentEditor {...editorProps} segments={rightSegments} keyPrefix='R' />}
            />
          ) : singleSegments ? (
            <PVMe1DocumentSingle>
              <SegmentEditor {...editorProps} segments={singleSegments} keyPrefix='S' />
            </PVMe1DocumentSingle>
          ) : null}
        </div>
      </div>

      <details className='rounded-xl border border-white/10 bg-white/[0.02]'>
        <summary className='cursor-pointer px-4 py-3 text-xs font-semibold text-slate-400'>
          Vue lecture seule (contrôle)
        </summary>
        <pre className='max-h-[280px] overflow-auto whitespace-pre-wrap border-t border-white/10 p-4 font-mono text-[10px] text-slate-500'>
          {assembled}
        </pre>
      </details>
    </div>
  );
}
