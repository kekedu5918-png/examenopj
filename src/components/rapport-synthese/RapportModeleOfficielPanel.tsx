'use client';

/**
 * Structure type rapport de synthèse OPJ — // TODO: caler mot pour mot sur B7_02_RAPP_SYNT_1024.pdf (affaire VERT/VILLA)
 * lorsque le PDF officiel est intégré au dépôt sous le nom attendu.
 */
export function RapportModeleOfficielPanel() {
  return (
    <div className='space-y-8 text-sm leading-relaxed text-examen-ink'>
      <p className='text-xs text-examen-inkMuted'>
        Lecture seule — annotations pédagogiques. Les formules marquées « obligatoire » doivent être recopiées à l’identique
        le jour J.
      </p>

      <section className='rounded-xl border border-white/10 bg-examen-card p-4 font-mono text-[11px] text-slate-200 md:p-6 md:text-xs'>
        <p className='mb-4 font-sans text-xs font-bold uppercase tracking-wide text-amber-200'>PAGE 1 — En-tête (cartouche type)</p>
        <pre className='whitespace-pre-wrap break-words'>
          {`MINISTÈRE DE L'INTÉRIEUR          RÉPUBLIQUE FRANÇAISE

[Ville], le [date]
DIRECTION GÉNÉRALE DE LA POLICE NATIONALE    [Service — ex. DIPN …]
[DIPN du département]                        [Grade Prénom NOM]
                                             En fonction à [Service]
                                             …
                                             Monsieur le procureur de la République
                                             Près le tribunal judiciaire de [VILLE]
                                             S/couvert de la voie hiérarchique

OBJET : [QUALIFICATIONS EN MAJUSCULES] commis le [date] à [heure] [lieu] sur la personne de [NOM Prénom].

AFFAIRE : C/ [NOM Prénom MEC], [qualité — ex. mineur 15 ans]

RÉFÉRENCE : - Initiative du service.
            - Vos instructions téléphoniques.

P. JOINTES : Une procédure n°[XX/XXXX] comprenant [X] procès-verbaux et leurs annexes…`}
        </pre>
      </section>

      <section>
        <h3 className='font-display text-lg font-bold text-white'>Formule d’introduction (texte exact)</h3>
        <blockquote className='mt-3 border-l-4 border-emerald-500/60 bg-emerald-500/10 px-4 py-3 text-examen-ink'>
          J&apos;ai l&apos;honneur de vous rendre compte des résultats de l&apos;enquête diligentée en [cadre], conformément aux
          instructions citées en référence, assisté des [qualité des agents] du service et pour laquelle vous avez été tenu
          régulièrement informé.
        </blockquote>
      </section>

      <section>
        <h3 className='font-display text-lg font-bold text-white'>Section « Les faits »</h3>
        <p className='mt-2 text-examen-inkMuted'>
          Narration factuelle chronologique — date, heure, lieu ; victime (état civil) ; conditions de saisine.
        </p>
      </section>

      <section>
        <h3 className='font-display text-lg font-bold text-white'>Section « L’enquête »</h3>
        <p className='mt-2 text-examen-inkMuted'>
          Chronologie des investigations, témoins, GAV (dates, motifs, droits), perquisitions et scellés, confrontations,
          changement de cadre si applicable.
        </p>
      </section>

      <section>
        <h3 className='font-display text-lg font-bold text-white'>Section « Conclusion » — formule exacte</h3>
        <blockquote className='mt-3 border-l-4 border-emerald-500/60 bg-emerald-500/10 px-4 py-3 text-examen-ink'>
          Des éléments rassemblés au cours de cette enquête, il ressort que le nommé [NOM Prénom] pourrait faire l&apos;objet
          de poursuites pour [QUALIFICATIONS COMPLÈTES AVEC TOUTES CIRCONSTANCES AGGRAVANTES], faits prévus par [articles
          définissant] et réprimés par [articles réprimant] du code pénal.
        </blockquote>
      </section>

      <section>
        <h3 className='font-display text-lg font-bold text-white'>État civil du mis en cause — modèle</h3>
        <p className='mt-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-slate-300'>
          [NOM Prénom], né(e) le [date] à [ville] ([n° dépt.]), nationalité [X], fils/fille de [père] et de [mère],
          [profession], demeurant [adresse complète].
        </p>
      </section>

      <section>
        <h3 className='font-display text-lg font-bold text-white'>Vu et transmis — destinataires</h3>
        <ul className='mt-2 list-disc space-y-1 pl-5 text-examen-inkMuted'>
          <li>Deux exemplaires au parquet de [ville]</li>
          <li>Un exemplaire au DTPJ</li>
          <li>Un exemplaire aux archives du service</li>
        </ul>
      </section>

      <p className='text-xs text-amber-200/90'>
        TODO fascicule B7_02_RAPP_SYNT_1024 — intégrer le modèle complet affaire VERT/VILLA dès que le PDF est référencé dans
        le dépôt (actuellement : voir reference/fascicules/rapport-de-synthese-officiel.pdf si équivalent).
      </p>
    </div>
  );
}
