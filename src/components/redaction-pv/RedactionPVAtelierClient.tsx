'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { ModelePVOfficielLayout } from '@/components/modeles-pv/ModelePVOfficielLayout';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { getModelePVBySlug } from '@/data/modeles-pv';
import type { SujetRedactionPV } from '@/data/sujets-redaction-pv';
import { SUJETS_REDACTION_PV } from '@/data/sujets-redaction-pv';
import { cn } from '@/utils/cn';

type CorrectionPVResult = {
  note: number;
  elements: { intitule: string; statut: 'present' | 'absent' | 'incomplet'; commentaire: string }[];
  pointsForts: string[];
  pointsAmeliorer: string[];
  commentaireGeneral: string;
};

type CorrectionPVHistoryEntry = {
  sujetId: string;
  date: string;
  note: number;
  redaction: string;
  resultat: CorrectionPVResult;
};

const LS_CORRECTIONS = 'corrections-pv';

const DIFF_LABEL: Record<SujetRedactionPV['difficulte'], string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};

const DIFF_BADGE: Record<SujetRedactionPV['difficulte'], string> = {
  debutant: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200',
  intermediaire: 'border-amber-400/40 bg-amber-500/15 text-amber-200',
  avance: 'border-rose-400/40 bg-rose-500/15 text-rose-200',
};

function formatElapsed(totalSec: number): string {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

function loadHistory(): CorrectionPVHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LS_CORRECTIONS);
    if (!raw) return [];
    const arr = JSON.parse(raw) as CorrectionPVHistoryEntry[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: CorrectionPVHistoryEntry[]) {
  try {
    localStorage.setItem(LS_CORRECTIONS, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

function pushHistory(entry: CorrectionPVHistoryEntry) {
  const next = [...loadHistory(), entry];
  while (next.length > 20) next.shift();
  saveHistory(next);
}

function draftKey(sujetId: string) {
  return `examenopj:redaction-pv:draft:${sujetId}`;
}

function NoteCircle({ note }: { note: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = Math.min(20, Math.max(0, note)) / 20;
  const dash = c * pct;
  const color = note >= 15 ? '#34d399' : note >= 10 ? '#fb923c' : '#f87171';
  return (
    <div className='relative mx-auto h-36 w-36'>
      <svg className='-rotate-90 transform' viewBox='0 0 120 120' aria-hidden>
        <circle cx='60' cy='60' r={r} fill='none' stroke='rgba(255,255,255,0.08)' strokeWidth='10' />
        <circle
          cx='60'
          cy='60'
          r={r}
          fill='none'
          stroke={color}
          strokeWidth='10'
          strokeLinecap='round'
          strokeDasharray={`${dash} ${c}`}
          className='transition-[stroke-dasharray] duration-1000 ease-out'
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <span className='font-display text-4xl font-bold tabular-nums text-white'>{note}</span>
        <span className='text-xs text-examen-inkMuted'>/ 20</span>
      </div>
    </div>
  );
}

function StatutIcon({ statut }: { statut: CorrectionPVResult['elements'][0]['statut'] }) {
  if (statut === 'present') return <span aria-hidden>✅</span>;
  if (statut === 'absent') return <span aria-hidden>❌</span>;
  return <span aria-hidden>⚠️</span>;
}

type Props = { initialSujetId?: string };

const MSG_CORRECTION_INDISPONIBLE = 'La correction est temporairement indisponible. Réessayez.';

export function RedactionPVAtelierClient({ initialSujetId }: Props) {
  const { toast } = useToast();
  const fascicules = useMemo(
    () => [...new Set(SUJETS_REDACTION_PV.map((s) => s.fascicule))].sort(),
    [],
  );

  const validInitial =
    initialSujetId && SUJETS_REDACTION_PV.some((s) => s.id === initialSujetId)
      ? initialSujetId
      : SUJETS_REDACTION_PV[0]!.id;

  const [sidebarTab, setSidebarTab] = useState<'sujets' | 'historique'>('sujets');
  const [filterDiff, setFilterDiff] = useState<'all' | SujetRedactionPV['difficulte']>('all');
  const [filterFasc, setFilterFasc] = useState<string>('all');
  const [sujetId, setSujetId] = useState(validInitial);

  const sujet = useMemo(
    () => SUJETS_REDACTION_PV.find((s) => s.id === sujetId) ?? SUJETS_REDACTION_PV[0]!,
    [sujetId],
  );

  const filteredSujets = useMemo(() => {
    return SUJETS_REDACTION_PV.filter((s) => {
      if (filterDiff !== 'all' && s.difficulte !== filterDiff) return false;
      if (filterFasc !== 'all' && s.fascicule !== filterFasc) return false;
      return true;
    });
  }, [filterDiff, filterFasc]);

  const [texte, setTexte] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [chronoOn, setChronoOn] = useState(false);
  const [chronoSec, setChronoSec] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectionPVResult | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'result'>('edit');
  const [history, setHistory] = useState<CorrectionPVHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (!chronoOn) return;
    const t = window.setInterval(() => setChronoSec((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [chronoOn]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey(sujet.id));
      setTexte(raw ?? '');
    } catch {
      setTexte('');
    }
    setChronoOn(false);
    setChronoSec(0);
    setResult(null);
    setViewMode('edit');
    setHydrated(true);
  }, [sujet.id]);

  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(draftKey(sujet.id), texte);
      } catch {
        /* ignore */
      }
    }, 300);
    return () => window.clearTimeout(id);
  }, [hydrated, sujet.id, texte]);

  const mots = countWords(texte);
  const modeleRef = sujet.modeleReference ? getModelePVBySlug(sujet.modeleReference) : undefined;

  const saveDraftNow = useCallback(() => {
    try {
      localStorage.setItem(draftKey(sujet.id), texte);
      toast({ title: 'Brouillon enregistré', description: 'Sauvegarde locale (navigateur).' });
    } catch {
      toast({ title: 'Sauvegarde impossible', variant: 'destructive' });
    }
  }, [sujet.id, texte, toast]);

  const submitCorrection = useCallback(async () => {
    if (mots < 50) return;
    setLoading(true);
    setResult(null);
    setViewMode('result');
    try {
      const r = await fetch('/api/correction-pv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sujetId: sujet.id, redaction: texte }),
      });
      const j = (await r.json()) as { result?: CorrectionPVResult; error?: string };
      if (!r.ok) {
        toast({ title: 'Correction', description: j.error ?? MSG_CORRECTION_INDISPONIBLE, variant: 'destructive' });
        setViewMode('edit');
        return;
      }
      if (!j.result) {
        toast({ title: 'Correction', description: MSG_CORRECTION_INDISPONIBLE, variant: 'destructive' });
        setViewMode('edit');
        return;
      }
      setResult(j.result);
      const entry: CorrectionPVHistoryEntry = {
        sujetId: sujet.id,
        date: new Date().toISOString(),
        note: j.result.note,
        redaction: texte,
        resultat: j.result,
      };
      pushHistory(entry);
      setHistory(loadHistory());
    } catch {
      toast({ title: 'Réseau', description: MSG_CORRECTION_INDISPONIBLE, variant: 'destructive' });
      setViewMode('edit');
    } finally {
      setLoading(false);
    }
  }, [mots, sujet.id, texte, toast]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        saveDraftNow();
      }
      if (e.key === 'Enter' && mots >= 50 && !loading) {
        e.preventDefault();
        void submitCorrection();
      }
    }
  };

  const restoreFromHistory = (h: CorrectionPVHistoryEntry) => {
    setSujetId(h.sujetId);
    setTexte(h.redaction);
    setResult(h.resultat);
    setViewMode('result');
    setSidebarTab('sujets');
    toast({ title: 'Correction chargée', description: 'Reprise depuis l’historique.' });
  };

  const downloadCorrection = () => {
    if (!result) return;
    const lines = [
      `Note : ${result.note} / 20`,
      '',
      'Éléments vérifiés :',
      ...result.elements.map((el) => `- [${el.statut}] ${el.intitule} — ${el.commentaire}`),
      '',
      'Points forts :',
      ...result.pointsForts.map((p) => `- ${p}`),
      '',
      'Points à améliorer :',
      ...result.pointsAmeliorer.map((p) => `- ${p}`),
      '',
      'Commentaire général :',
      result.commentaireGeneral,
      '',
      '--- Copie du candidat ---',
      texte,
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `correction-pv-${sujet.id}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr] xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]'>
      <aside className='space-y-4 rounded-2xl border border-white/[0.08] bg-examen-card p-4 lg:sticky lg:top-24 lg:self-start'>
        <div className='flex gap-1 rounded-lg bg-white/[0.04] p-1'>
          <button
            type='button'
            onClick={() => setSidebarTab('sujets')}
            className={cn(
              'flex-1 rounded-md px-2 py-1.5 text-xs font-semibold',
              sidebarTab === 'sujets' ? 'bg-examen-accent/25 text-white' : 'text-examen-inkMuted hover:text-examen-ink',
            )}
          >
            Sujets
          </button>
          <button
            type='button'
            onClick={() => setSidebarTab('historique')}
            className={cn(
              'flex-1 rounded-md px-2 py-1.5 text-xs font-semibold',
              sidebarTab === 'historique'
                ? 'bg-examen-accent/25 text-white'
                : 'text-examen-inkMuted hover:text-examen-ink',
            )}
          >
            Mes corrections
          </button>
        </div>

        {sidebarTab === 'sujets' ? (
          <>
            <div className='grid gap-2'>
              <label className='text-[10px] font-bold uppercase tracking-wider text-examen-inkMuted'>
                Difficulté
              </label>
              <select
                value={filterDiff}
                onChange={(e) => setFilterDiff(e.target.value as typeof filterDiff)}
                className='rounded-lg border border-white/[0.1] bg-white/[0.04] px-2 py-1.5 text-xs text-examen-ink'
              >
                <option value='all'>Toutes</option>
                <option value='debutant'>{DIFF_LABEL.debutant}</option>
                <option value='intermediaire'>{DIFF_LABEL.intermediaire}</option>
                <option value='avance'>{DIFF_LABEL.avance}</option>
              </select>
            </div>
            <div className='grid gap-2'>
              <label className='text-[10px] font-bold uppercase tracking-wider text-examen-inkMuted'>
                Fascicule
              </label>
              <select
                value={filterFasc}
                onChange={(e) => setFilterFasc(e.target.value)}
                className='rounded-lg border border-white/[0.1] bg-white/[0.04] px-2 py-1.5 text-xs text-examen-ink'
              >
                <option value='all'>Tous</option>
                {fascicules.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div className='max-h-[min(52vh,520px)] space-y-2 overflow-y-auto pr-1'>
              {filteredSujets.map((s) => (
                <button
                  key={s.id}
                  type='button'
                  onClick={() => setSujetId(s.id)}
                  className={cn(
                    'w-full rounded-xl border p-3 text-left transition-colors',
                    s.id === sujet.id
                      ? 'border-examen-accent bg-examen-accent/10 ring-1 ring-examen-accent/25'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14]',
                  )}
                >
                  <p className='text-[11px] font-semibold leading-snug text-white'>{s.titre}</p>
                  <p className='mt-1 text-[10px] text-examen-inkMuted'>
                    {s.fascicule} · {DIFF_LABEL[s.difficulte]} · {s.dureeConseillee} min
                  </p>
                </button>
              ))}
              {filteredSujets.length === 0 ? (
                <p className='text-xs text-examen-inkMuted'>Aucun sujet pour ces filtres.</p>
              ) : null}
            </div>
          </>
        ) : (
          <div className='max-h-[min(60vh,600px)] space-y-2 overflow-y-auto pr-1'>
            {history.length === 0 ? (
              <p className='text-xs text-examen-inkMuted'>Aucune correction enregistrée pour l’instant.</p>
            ) : (
              [...history].reverse().map((h, i) => {
                const titre = SUJETS_REDACTION_PV.find((s) => s.id === h.sujetId)?.titre ?? h.sujetId;
                const d = new Date(h.date);
                return (
                  <button
                    key={`${h.date}-${i}`}
                    type='button'
                    onClick={() => restoreFromHistory(h)}
                    className='w-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-left hover:border-white/[0.14]'
                  >
                    <p className='text-xs font-medium text-white'>{titre}</p>
                    <p className='mt-1 text-[10px] text-examen-inkMuted'>
                      {d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })} — {h.note}/20
                    </p>
                  </button>
                );
              })
            )}
          </div>
        )}
      </aside>

      <div className='min-w-0 space-y-6'>
        <header className='flex flex-col gap-3 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='font-display text-lg font-bold text-white md:text-xl'>{sujet.titre}</h2>
            <div className='mt-2 flex flex-wrap items-center gap-2'>
              <span
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                  DIFF_BADGE[sujet.difficulte],
                )}
              >
                {DIFF_LABEL[sujet.difficulte]}
              </span>
              <span className='text-xs text-examen-inkMuted'>
                {sujet.fascicule} · {sujet.dureeConseillee} min conseillées
              </span>
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {!chronoOn ? (
              <Button type='button' size='sm' onClick={() => setChronoOn(true)} className='font-semibold'>
                Commencer
              </Button>
            ) : (
              <div className='rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 font-mono-label text-sm tabular-nums text-examen-accent'>
                {formatElapsed(chronoSec)}
              </div>
            )}
            {result ? (
              <div className='flex rounded-lg border border-white/[0.1] p-0.5'>
                <button
                  type='button'
                  onClick={() => setViewMode('edit')}
                  className={cn(
                    'rounded-md px-3 py-1 text-xs font-semibold',
                    viewMode === 'edit' ? 'bg-examen-accent/30 text-white' : 'text-examen-inkMuted',
                  )}
                >
                  Ma rédaction
                </button>
                <button
                  type='button'
                  onClick={() => setViewMode('result')}
                  className={cn(
                    'rounded-md px-3 py-1 text-xs font-semibold',
                    viewMode === 'result' ? 'bg-examen-accent/30 text-white' : 'text-examen-inkMuted',
                  )}
                >
                  Correction
                </button>
              </div>
            ) : null}
          </div>
        </header>

        <div
          className={cn(
            'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4',
            viewMode === 'result' && result && !loading ? 'hidden' : '',
          )}
        >
          <p className='flex items-center gap-2 text-sm font-semibold text-white'>
            <span aria-hidden>📋</span> Mise en situation
          </p>
          <p className='mt-3 whitespace-pre-wrap text-sm leading-relaxed text-examen-ink'>{sujet.miseEnSituation}</p>
          {modeleRef ? (
            <Button type='button' variant='outline' size='sm' className='mt-4' onClick={() => setSheetOpen(true)}>
              Voir le modèle de référence
            </Button>
          ) : null}
        </div>

        {!loading && (viewMode === 'edit' || !result) ? (
          <div className='relative'>
            <textarea
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
              placeholder={
                'Rédigez votre procès-verbal ici...\nCommencez par la formule d\'ouverture officielle.'
              }
              className='box-border min-h-[600px] w-full resize-y rounded-xl border border-white/[0.12] p-4 pb-10 text-sm leading-relaxed text-[#F0F0F5] placeholder:text-white/35 focus:border-examen-accent/50 focus:outline-none focus:ring-1 focus:ring-examen-accent/30'
              style={{
                backgroundColor: '#0D0D14',
                fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              }}
            />
            <span className='pointer-events-none absolute bottom-3 right-4 text-[11px] text-white/45'>
              {mots} {mots <= 1 ? 'mot' : 'mots'}
            </span>
          </div>
        ) : null}

        {loading ? (
          <div className='space-y-4 rounded-xl border border-white/[0.08] bg-examen-card p-8'>
            <div className='flex flex-col items-center gap-4'>
              <div className='h-24 w-full max-w-md animate-pulse rounded-lg bg-white/[0.08]' />
              <div className='h-4 w-48 animate-pulse rounded bg-white/[0.08]' />
              <p className='text-sm text-examen-inkMuted'>
                Analyse en cours par l’IA
                <span className='inline-flex gap-0.5'>
                  <span className='animate-pulse'>.</span>
                  <span className='animate-pulse [animation-delay:150ms]'>.</span>
                  <span className='animate-pulse [animation-delay:300ms]'>.</span>
                </span>
              </p>
            </div>
          </div>
        ) : null}

        {viewMode === 'result' && result && !loading ? (
          <div className='space-y-6 rounded-xl border border-white/[0.08] bg-examen-card p-6'>
            <div className='text-center'>
              <p className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Note globale</p>
              <div className='mt-4'>
                <NoteCircle note={result.note} />
              </div>
            </div>

            <div>
              <p className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Éléments vérifiés</p>
              <ul className='mt-3 space-y-3'>
                {result.elements.map((el, i) => (
                  <li
                    key={`${el.intitule}-${i}`}
                    className='flex gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-sm'
                  >
                    <span className='shrink-0 pt-0.5'>
                      <StatutIcon statut={el.statut} />
                    </span>
                    <div>
                      <p className='font-medium text-white'>{el.intitule}</p>
                      <p className='mt-1 text-xs text-examen-inkMuted'>{el.commentaire}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='rounded-lg bg-emerald-500/10 p-4'>
                <p className='text-xs font-bold uppercase tracking-wide text-emerald-200/90'>Points forts</p>
                <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-examen-ink'>
                  {result.pointsForts.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className='rounded-lg bg-amber-500/10 p-4'>
                <p className='text-xs font-bold uppercase tracking-wide text-amber-200/90'>Points à améliorer</p>
                <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-examen-ink'>
                  {result.pointsAmeliorer.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='rounded-lg border border-white/[0.06] bg-white/[0.02] p-4'>
              <p className='text-xs font-bold uppercase tracking-wide text-examen-inkMuted'>Commentaire général</p>
              <p className='mt-2 text-sm leading-relaxed text-examen-ink'>{result.commentaireGeneral}</p>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  setViewMode('edit');
                  setResult(null);
                }}
              >
                📝 Corriger ma copie
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  const others = SUJETS_REDACTION_PV.filter((s) => s.id !== sujet.id);
                  const pick = others[Math.floor(Math.random() * others.length)] ?? SUJETS_REDACTION_PV[0]!;
                  setSujetId(pick.id);
                }}
              >
                🔄 Nouveau sujet
              </Button>
              <Button type='button' onClick={downloadCorrection}>
                📥 Télécharger la correction
              </Button>
            </div>
          </div>
        ) : null}

        {!loading && (viewMode === 'edit' || !result) ? (
          <div className='flex flex-wrap items-center gap-3'>
            <Button type='button' disabled={mots < 50 || loading} onClick={() => void submitCorrection()}>
              Soumettre pour correction
            </Button>
            <p className='text-xs text-examen-inkMuted'>
              Raccourcis : Ctrl+S enregistre le brouillon · Ctrl+Entrée envoie (≥ 50 mots)
            </p>
          </div>
        ) : null}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side='right' className='w-full overflow-y-auto border-white/[0.08] bg-examen-card sm:max-w-xl md:max-w-2xl'>
          <SheetHeader>
            <SheetTitle className='text-white'>{modeleRef?.titre ?? 'Modèle de référence'}</SheetTitle>
          </SheetHeader>
          {modeleRef ? (
            <div className='mt-6 pb-8'>
              <ModelePVOfficielLayout modele={modeleRef} />
              <Link
                href={`/cours/modeles-pv/${modeleRef.id}`}
                className='mt-6 inline-flex text-sm font-semibold text-examen-accent hover:underline'
              >
                Fiche modèle complète →
              </Link>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
