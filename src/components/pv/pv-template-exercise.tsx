'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import {
  fillPVTemplate,
  type PVMe1TemplateExerciseConfig,
} from '@/data/pv-me1-exercise-types';
import { cn } from '@/utils/cn';

type Props = {
  config: PVMe1TemplateExerciseConfig;
};

function FieldRow({
  id,
  label,
  value,
  onChange,
  multiline,
  mono,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  mono?: boolean;
}) {
  const C =
    'w-full rounded-lg border border-white/15 bg-navy-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';
  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='block text-xs font-medium text-slate-400'>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cn(C, mono && 'font-mono text-[12px]')}
          placeholder='…'
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(C, mono && 'font-mono text-[12px]')}
          placeholder='…'
        />
      )}
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

  const preview = useMemo(() => fillPVTemplate(config.previewTemplate, values), [config.previewTemplate, values]);

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

  const copyPreview = useCallback(() => {
    void navigator.clipboard.writeText(preview).then(
      () => toast({ title: 'Copié', description: 'Texte assemblé dans le presse-papiers.' }),
      () => toast({ title: 'Échec', description: 'Copie manuelle depuis l’aperçu.', variant: 'destructive' }),
    );
  }, [preview, toast]);

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3'>
        <p className='text-[11px] text-slate-500'>
          {config.articles}
          {!hydrated ? ' — Chargement…' : ' — Brouillon local.'}
        </p>
        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={copyPreview}
            className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
          >
            Copier l’aperçu
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

      <div className='rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-sm text-amber-100/95'>
        <p className='font-semibold text-amber-200'>Consignes</p>
        <ul className='mt-2 list-inside list-disc space-y-1'>
          {config.consignes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        {config.fields.map((f) => (
          <FieldRow
            key={f.key}
            id={`${uid}-${f.key}`}
            label={f.label}
            value={values[f.key] ?? ''}
            onChange={(v) => setField(f.key, v)}
            multiline={f.multiline}
            mono={f.mono}
          />
        ))}
      </div>

      <div>
        <h4 className='mb-2 text-xs font-bold uppercase tracking-wide text-slate-500'>Aperçu assemblé</h4>
        <pre className='max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-[#080c12] p-4 font-mono text-[11px] leading-relaxed text-gray-300'>
          {preview}
        </pre>
      </div>
    </div>
  );
}
