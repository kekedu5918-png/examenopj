'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { DossierPiecesAccordion } from '@/components/dossier/DossierPiecesAccordion';
import { PVMe1DocumentShell } from '@/components/pv/pv-me1-document-shell';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { SUJETS_RAPPORT_SYNTHESE } from '@/data/sujets-rapport-synthese';

const colClass =
  'min-h-[260px] w-full resize-y bg-transparent font-mono text-[11px] leading-relaxed text-gray-100 placeholder:text-slate-600 focus:border-0 focus:outline-none focus:ring-0 md:min-h-[480px]';

function formatElapsed(totalSec: number): string {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export function RapportSyntheseAtelierClient() {
  const { toast } = useToast();
  const [sujetId, setSujetId] = useState(SUJETS_RAPPORT_SYNTHESE[0]!.id);
  const sujet = useMemo(
    () => SUJETS_RAPPORT_SYNTHESE.find((s) => s.id === sujetId) ?? SUJETS_RAPPORT_SYNTHESE[0]!,
    [sujetId],
  );

  const [chrono, setChrono] = useState(0);
  const [leftDoc, setLeftDoc] = useState('');
  const [rightDoc, setRightDoc] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState('dossier');
  const [correction, setCorrection] = useState<string | null>(null);
  const [corrLoading, setCorrLoading] = useState(false);

  const storageKey = `examenopj:rapport-synthese:v1:${sujet.id}`;

  useEffect(() => {
    const t = window.setInterval(() => setChrono((c) => c + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const j = JSON.parse(raw) as { left?: string; right?: string };
        if (typeof j.left === 'string') setLeftDoc(j.left);
        if (typeof j.right === 'string') setRightDoc(j.right);
      } else {
        setLeftDoc(
          `RAPPORT DE SYNTHÈSE\n` +
            `Service …\n` +
            `N° de dossier …\n` +
            `À l’attention de M. le Procureur de la République de …\n`,
        );
        setRightDoc(
          `OBJET : …\n\nI. EXPOSÉ DES FAITS\n\n(chronologie factuelle à partir des pièces)\n\n` +
            `II. ÉLÉMENTS À CHARGE / À DÉCHARGE\n\n` +
            `III. QUALIFICATION(S) ET BASE LÉGALE\n\n` +
            `IV. MESURES DÉJÀ POSÉES\n\n` +
            `V. SITUATION ACTUELLE DU MIS EN CAUSE\n\n` +
            `VI. PROPOSITIONS DE SUITES\n\n` +
            `Je soussigné(e) …\n`,
        );
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ left: leftDoc, right: rightDoc }));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(id);
  }, [hydrated, leftDoc, rightDoc, storageKey]);

  const fullRapport = useMemo(() => `${leftDoc}\n\n----------\n\n${rightDoc}`, [leftDoc, rightDoc]);

  const runCorrection = useCallback(async () => {
    setCorrLoading(true);
    setCorrection(null);
    try {
      const r = await fetch('/api/correction-rapport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'rapport-synthese',
          texte: fullRapport,
          contexte: `${sujet.titre}\n\n${sujet.contexte}\n\nStructure attendue :\n${sujet.structureAttendue.join('\n')}`,
        }),
      });
      const j = (await r.json()) as { correction?: string; error?: string };
      if (!r.ok) {
        toast({ title: 'Correction impossible', description: j.error ?? 'Erreur serveur', variant: 'destructive' });
        return;
      }
      setCorrection(j.correction ?? '');
      setTab('correction');
    } catch {
      toast({ title: 'Réseau', description: 'Réessayez plus tard.', variant: 'destructive' });
    } finally {
      setCorrLoading(false);
    }
  }, [fullRapport, sujet.contexte, sujet.structureAttendue, sujet.titre, toast]);

  return (
    <div className='grid gap-6 xl:grid-cols-[280px_1fr]'>
      <aside className='space-y-4 rounded-2xl border border-white/[0.08] bg-examen-card p-4 xl:sticky xl:top-24 xl:self-start'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-wider text-examen-inkMuted'>Chrono continu</p>
          <p className='mt-1 font-mono-label text-2xl font-bold tabular-nums text-examen-accent'>{formatElapsed(chrono)}</p>
        </div>
        <div>
          <label htmlFor='rs-sujet' className='text-[10px] font-bold uppercase tracking-wider text-examen-inkMuted'>
            Sujet
          </label>
          <select
            id='rs-sujet'
            value={sujetId}
            onChange={(e) => {
              setSujetId(e.target.value);
              setCorrection(null);
            }}
            className='mt-2 w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-sm text-examen-ink'
          >
            {SUJETS_RAPPORT_SYNTHESE.map((s) => (
              <option key={s.id} value={s.id}>
                {s.titre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-wider text-examen-inkMuted'>Durée conseillée</p>
          <p className='mt-1 text-sm text-examen-ink'>{sujet.dureeConseillee} min — {sujet.difficulte}</p>
        </div>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-wider text-examen-inkMuted'>Contexte</p>
          <p className='mt-2 max-h-48 overflow-y-auto text-xs leading-relaxed text-examen-inkMuted'>{sujet.contexte}</p>
        </div>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-wider text-examen-inkMuted'>Structure attendue</p>
          <ol className='mt-2 list-decimal space-y-1 pl-4 text-[11px] text-examen-inkMuted'>
            {sujet.structureAttendue.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </div>
      </aside>

      <div className='min-w-0'>
        <Tabs value={tab} onValueChange={setTab} className='w-full'>
          <TabsList className='mb-4 grid h-auto w-full grid-cols-3 gap-1 bg-white/[0.04] p-1'>
            <TabsTrigger value='dossier'>Dossier</TabsTrigger>
            <TabsTrigger value='rediger'>Rédiger</TabsTrigger>
            <TabsTrigger value='correction'>Correction</TabsTrigger>
          </TabsList>
          <TabsContent value='dossier' className='mt-0'>
            <DossierPiecesAccordion pieces={sujet.pieces} />
          </TabsContent>
          <TabsContent value='rediger' className='mt-0'>
            <div className='mb-3 flex flex-wrap gap-2 print:hidden'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='border-white/15'
                onClick={() =>
                  void navigator.clipboard.writeText(fullRapport).then(
                    () => toast({ title: 'Rapport copié' }),
                    () => toast({ title: 'Copie échouée', variant: 'destructive' }),
                  )
                }
              >
                Copier le rapport
              </Button>
              <Button
                type='button'
                size='sm'
                className='bg-examen-accent text-white hover:bg-examen-accentHover'
                disabled={corrLoading || fullRapport.length < 40}
                onClick={() => void runCorrection()}
              >
                {corrLoading ? 'Correction…' : 'Lancer la correction IA'}
              </Button>
            </div>
            <div className='max-h-[min(78vh,920px)] overflow-auto print:max-h-none'>
              <PVMe1DocumentShell
                plain
                left={
                  <textarea
                    value={leftDoc}
                    onChange={(e) => setLeftDoc(e.target.value)}
                    className={colClass}
                    spellCheck={false}
                    aria-label='En-tête rapport — colonne marge'
                  />
                }
                right={
                  <textarea
                    value={rightDoc}
                    onChange={(e) => setRightDoc(e.target.value)}
                    className={colClass}
                    spellCheck={false}
                    aria-label='Corps du rapport — colonne principale'
                  />
                }
              />
            </div>
            {!hydrated ? <p className='mt-2 text-xs text-examen-inkMuted'>Chargement du brouillon…</p> : null}
          </TabsContent>
          <TabsContent value='correction' className='mt-0'>
            <div className='rounded-xl border border-white/[0.08] bg-examen-card p-4'>
              {!correction ? (
                <p className='text-sm text-examen-inkMuted'>
                  Lancez une correction depuis l’onglet « Rédiger » ou recliquez ci-dessous.
                </p>
              ) : (
                <div className='whitespace-pre-wrap text-sm leading-relaxed text-examen-ink'>{correction}</div>
              )}
              <Button
                type='button'
                className='mt-4 bg-examen-accent text-white hover:bg-examen-accentHover'
                disabled={corrLoading || fullRapport.length < 40}
                onClick={() => void runCorrection()}
              >
                {corrLoading ? 'Analyse en cours…' : 'Relancer la correction IA'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
