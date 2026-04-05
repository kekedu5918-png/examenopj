/**
 * Configurations d’exercices « à trous » pour PV ME1 (hors plainte déjà couverte par PVRedactionPlainteExercise).
 * Les modèles sont pédagogiques : recouper avec le fascicule officiel et Légifrance avant examen.
 */

export type PVMe1TemplateField = {
  key: string;
  label: string;
  multiline?: boolean;
  mono?: boolean;
};

export type PVMe1TemplateExerciseConfig = {
  id: string;
  storageKey: string;
  heading: string;
  articles: string;
  /** Texte avec marqueurs {{cle}} remplacés par la saisie ou « xxx » si vide. */
  previewTemplate: string;
  fields: PVMe1TemplateField[];
  consignes: string[];
};

const BLANK = 'xxx';

export function fillPVTemplate(template: string, values: Record<string, string>): string {
  let out = template;
  for (const [k, v] of Object.entries(values)) {
    const val = v.trim().length > 0 ? v.trim() : BLANK;
    out = out.split(`{{${k}}}`).join(val);
  }
  // Marqueurs non remplis restants
  out = out.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, BLANK);
  return out;
}

export const PV_EXERCISE_NOTIFICATION_GAV: PVMe1TemplateExerciseConfig = {
  id: 'notification-gav',
  storageKey: 'examenopj:pv-exercise:notification-gav:v1',
  heading: 'PV de notification de placement en garde à vue (squelette ME1)',
  articles: 'Art. 63-1, 63-2, 63-3, 63-3-1, 62-2 C.P.P. — droits du gardé à vue',
  previewTemplate: `––– GAUCHE (marge, même bandeau que le fascicule ME1) –––
(ADRESSE ET COORDONNÉES DU SERVICE)
CODE INSEE : {{codeInsee}}
P.V. : {{pvMarge}}

––– DROIT –––
PROCÈS-VERBAL
PV n° {{pvNum}}
L’an {{an}}, le {{jour}}, à {{heure}}
Nous, {{nomOpj}}, {{gradeOpj}}
En fonction à {{service}} de {{ville}}
OFFICIER DE POLICE JUDICIAIRE en résidence à {{villeResidence}},

AFFAIRE :
{{blocAffaire}}

OBJET :
Notification des droits — placement en garde à vue

--- Les faits reprochés ou leur qualification provisoire : {{qualificationFaits}}

--- La personne est informée qu’elle est placée en garde à vue pour une durée maximale de vingt-quatre heures (ou modalités spéciales mineur / textes spéciaux le cas échéant), à compter de {{heureDebutGav}}

--- Les six motifs légaux (art. 62-2) pouvant fonder la nécessité de la mesure sont rappelés ; motif retenu ici : {{motif623}}

--- Notification des droits prévus aux articles 63-1 à 63-3-1 du CPP (infraction concernée, durée, droit de prévenir, médecin, avocat, silence, assistance interprète si besoin, nature des auditions)

--- La personne déclare avoir pris connaissance de ses droits à {{heureNotification}}

L’intéressé(e)                    L’Officier de police judiciaire`,
  fields: [
    { key: 'codeInsee', label: 'CODE INSEE' },
    { key: 'pvMarge', label: 'P.V. (marge), ex. n° …/…', mono: true },
    { key: 'pvNum', label: 'PV n° (bloc droit)' },
    { key: 'an', label: 'L’an (année)' },
    { key: 'jour', label: 'Le (jour, mois)' },
    { key: 'heure', label: 'à (heure) — cachet PV' },
    { key: 'nomOpj', label: 'Nous, (Prénom NOM)' },
    { key: 'gradeOpj', label: 'Grade' },
    { key: 'service', label: 'Service (commissariat / brigade…)' },
    { key: 'ville', label: 'Ville (service)' },
    { key: 'villeResidence', label: 'Résidence OPJ' },
    { key: 'blocAffaire', label: 'Bloc AFFAIRE (C/, identité, qualification courte)', multiline: true, mono: true },
    { key: 'qualificationFaits', label: 'Qualification provisoire / faits reprochés', multiline: true },
    { key: 'heureDebutGav', label: 'Heure de début de la GAV' },
    { key: 'motif623', label: 'Motif art. 62-2 retenu (une formulation claire)', multiline: true },
    { key: 'heureNotification', label: 'Heure de la notification complète des droits' },
  ],
  consignes: [
    'Vérifier les huit informations / droits du texte applicable (version en vigueur sur Légifrance).',
    'Ne pas confondre audition libre et GAV : l’OBJET et le corps doivent être sans ambiguïté.',
    'Mineur : régime renforcé (représentant légal, avocat, durées spécifiques — voir fiche Fondamentaux GAV).',
  ],
};

export const PV_EXERCISE_FIN_GAV: PVMe1TemplateExerciseConfig = {
  id: 'fin-gav',
  storageKey: 'examenopj:pv-exercise:fin-gav:v1',
  heading: 'PV de fin de garde à vue (squelette ME1)',
  articles: 'Art. 64 C.P.P. et suite — levée, défèrement, prolongation éventuelle',
  previewTemplate: `––– GAUCHE –––
(ADRESSE ET COORDONNÉES DU SERVICE)
CODE INSEE : {{codeInsee}}
P.V. : {{pvMarge}}

––– DROIT –––
PROCÈS-VERBAL
PV n° {{pvNum}}
L’an {{an}}, le {{jour}}, à {{heure}}

Nous, {{nomOpj}}, {{gradeOpj}}
OFFICIER DE POLICE JUDICIAIRE en résidence à {{ville}},

AFFAIRE :
{{blocAffaire}}

OBJET :
Fin de garde à vue / situation à l’issue de la mesure

--- La garde à vue a débuté le {{dateDebutGav}} à {{heureDebutGav}} et prend fin le {{dateFin}} à {{heureFin}}

--- Auditions et temps de repos : {{syntheseAuditions}}

--- Soins / restauration / droits rappelés pendant la mesure (mentions utiles au dossier) : {{mentionsDroits}}

--- Destination de la personne : {{destination}} (mise en liberté / défèrement / autre décision motivée)

--- Le présent procès-verbal est clos à {{heureCloture}}

L’intéressé(e) (ou mentions)          L’Officier de police judiciaire`,
  fields: [
    { key: 'codeInsee', label: 'CODE INSEE' },
    { key: 'pvMarge', label: 'P.V. marge', mono: true },
    { key: 'pvNum', label: 'PV n°' },
    { key: 'an', label: 'Année' },
    { key: 'jour', label: 'Jour de clôture du PV' },
    { key: 'heure', label: 'Heure d’ouverture / entête' },
    { key: 'nomOpj', label: 'OPJ rédacteur' },
    { key: 'gradeOpj', label: 'Grade' },
    { key: 'ville', label: 'Résidence OPJ' },
    { key: 'blocAffaire', label: 'AFFAIRE', multiline: true, mono: true },
    { key: 'dateDebutGav', label: 'Date début GAV' },
    { key: 'heureDebutGav', label: 'Heure début' },
    { key: 'dateFin', label: 'Date fin' },
    { key: 'heureFin', label: 'Heure fin' },
    { key: 'syntheseAuditions', label: 'Synthèse auditions / repos (chronologie)', multiline: true },
    { key: 'mentionsDroits', label: 'Mentions droits / soins (si utile)', multiline: true },
    { key: 'destination', label: 'Destination (liberté, parquet, autre)', multiline: true },
    { key: 'heureCloture', label: 'Heure de clôture du PV' },
  ],
  consignes: [
    'Cohérence des horaires avec le registre de GAV et les PV d’audition.',
    'Si prolongation : citer la décision et sa motivation ; présentation au PR selon les cas.',
    'Adapter les mentions si mineur ou texte spécial (terrorisme, etc.)',
  ],
};

export const PV_ME1_PHASE_A_EXERCISES: PVMe1TemplateExerciseConfig[] = [
  PV_EXERCISE_NOTIFICATION_GAV,
  PV_EXERCISE_FIN_GAV,
];
