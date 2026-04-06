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

export type PVTemplateSegment =
  | { type: 'text'; value: string }
  | { type: 'field'; key: string };

/** Découpe un modèle contenant des marqueurs {{cle}} pour édition inline (une zone = un champ). */
export function parsePVTemplateSegments(template: string): PVTemplateSegment[] {
  const re = /\{\{([a-zA-Z0-9_]+)\}\}/g;
  const segments: PVTemplateSegment[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template)) !== null) {
    if (m.index > last) segments.push({ type: 'text', value: template.slice(last, m.index) });
    segments.push({ type: 'field', key: m[1] });
    last = m.index + m[0].length;
  }
  if (last < template.length) segments.push({ type: 'text', value: template.slice(last) });
  return segments;
}

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

export const PV_EXERCISE_ENQUETE_VOISINAGE: PVMe1TemplateExerciseConfig = {
  id: 'enquete-voisinage',
  storageKey: 'examenopj:pv-exercise:enquete-voisinage:v1',
  heading: 'PV d’enquête de voisinage (type fascicule ME1)',
  articles: 'Art. 53 C.P.P. et suite — prolongation de l’enquête de flagrance ; cohérence avec le PV de saisine',
  previewTemplate: `RÉPUBLIQUE FRANÇAISE
MINISTÈRE DE L’INTÉRIEUR
DIRECTION GÉNÉRALE DE LA POLICE NATIONALE
DIRECTION NATIONALE DE LA SÉCURITÉ PUBLIQUE
__________
{{adresseService}}
__________
CODE INSEE : {{codeInsee}}
P.V. : {{pvMarge}}
__________
PROCÈS-VERBAL
PV n° {{pvNum}}
L’an {{an}}, le {{jour}}, à {{heure}}
Nous, {{nomOpj}}, {{gradeOpj}}
En fonction à {{service}} de {{ville}}, OFFICIER DE POLICE JUDICIAIRE en résidence à {{villeResidence}},

AFFAIRE :
{{blocAffaire}}

OBJET :
ENQUÊTE DE VOISINAGE
1 … 2 … 3 … 4 … 5 … 6 … 7 … 8 …
--- Poursuivant l'enquête de flagrance. ------------------------------
--- {{visaArticles}}
--- Nous trouvant {{situationOpj}}.
--- {{motifEnqueteVoisinage}}
--- De l'ensemble des personnes contactées, seulement {{nbTemoins}} sont susceptibles de fournir des éléments intéressant l'enquête.
--- Il s'agit de :
--- {{listePersonnes}}
--- Ces personnes ont été invitées à se présenter au service. ------
--- Dont Procès-verbal. -----------------------------------------------
L’Officier de Police Judiciaire`,
  fields: [
    { key: 'adresseService', label: 'Adresse et coordonnées du service (bandeau)', multiline: true },
    { key: 'codeInsee', label: 'CODE INSEE' },
    { key: 'pvMarge', label: 'P.V. marge (n° …/…)', mono: true },
    { key: 'pvNum', label: 'PV n° bloc droit' },
    { key: 'an', label: 'Année' },
    { key: 'jour', label: 'Jour et mois' },
    { key: 'heure', label: 'Heure' },
    { key: 'nomOpj', label: 'OPJ rédacteur' },
    { key: 'gradeOpj', label: 'Grade' },
    { key: 'service', label: 'Service' },
    { key: 'ville', label: 'Ville' },
    { key: 'villeResidence', label: 'Résidence OPJ' },
    { key: 'blocAffaire', label: 'AFFAIRE (C/, qualification, identité)', multiline: true, mono: true },
    { key: 'visaArticles', label: 'Vu les articles (formule complète)', multiline: true },
    { key: 'situationOpj', label: 'Nous trouvant (lieu / contexte opérationnel)', multiline: true },
    { key: 'motifEnqueteVoisinage', label: 'Procédons à une enquête de voisinage (périmètre, lieu)', multiline: true },
    { key: 'nbTemoins', label: 'Nombre de personnes retenues' },
    { key: 'listePersonnes', label: 'Il s’agit de : (M., Mme, domicile, téléphone)', multiline: true },
  ],
  consignes: [
    'Numérotation 1–8 du corps : caler sur le modèle du fascicule (liste synthétique ou cases à cocher selon l’exemplaire).',
    'Relier ce PV aux invitations / auditions ultérieures (cohérence des identités et des horaires).',
  ],
};

export const PV_EXERCISE_AUDITION_TEMOIN: PVMe1TemplateExerciseConfig = {
  id: 'audition-temoin',
  storageKey: 'examenopj:pv-exercise:audition-temoin:v1',
  heading: 'PV d’audition de témoin (articulation type ME1)',
  articles: 'Art. 62, 63 C.P.P. (flagrance) ; art. 78 et suivants (enquête préliminaire) — droits, durées, relecture',
  previewTemplate: `PROCÈS-VERBAL
PV n° {{pvNum}} — L’an {{an}}, le {{jour}}, à {{heure}}
Nous, {{nomOpj}}, {{gradeOpj}}, OFFICIER DE POLICE JUDICIAIRE en résidence à {{ville}},

AFFAIRE :
{{blocAffaire}}

OBJET :
AUDITION DE TÉMOIN

1. Lieu de rédaction du P.V. : {{lieuRedaction}}
2. Cadre juridique et visa des articles : {{cadreJuridique}}
3. Assistants éventuels : {{assistants}}
4. Mode de comparution du témoin : {{comparution}}
5. Petite identité (état civil, domicile, téléphones…) : {{identiteTemoin}}
6. Rubrique des faits (chronologie / Q–R) : {{recitFaits}}
7. Droits du témoin selon le cadre (62 / 78 / 153) : {{droitsTemoin}}
8. Relecture et signature : {{relecture}}
9. Mention durée si retenue ≤ 4 h (art. 62 al. 2) : {{mentionDuree}}
10. Clôture et annexes éventuelles : {{cloture}}

L’Officier de police judiciaire              Le témoin`,
  fields: [
    { key: 'pvNum', label: 'PV n°' },
    { key: 'an', label: 'Année' },
    { key: 'jour', label: 'Date' },
    { key: 'heure', label: 'Heure' },
    { key: 'nomOpj', label: 'OPJ' },
    { key: 'gradeOpj', label: 'Grade' },
    { key: 'ville', label: 'Résidence OPJ' },
    { key: 'blocAffaire', label: 'AFFAIRE', multiline: true, mono: true },
    { key: 'lieuRedaction', label: '1. Lieu de rédaction' },
    { key: 'cadreJuridique', label: '2. Cadre + articles', multiline: true },
    { key: 'assistants', label: '3. Assistants', multiline: true },
    { key: 'comparution', label: '4. Comparution (spontané / convocation / autre)', multiline: true },
    { key: 'identiteTemoin', label: '5. Identité témoin', multiline: true },
    { key: 'recitFaits', label: '6. Faits (résumé ou structure Q/R)', multiline: true },
    { key: 'droitsTemoin', label: '7. Droits notifiés', multiline: true },
    { key: 'relecture', label: '8. Relecture / refus signé', multiline: true },
    { key: 'mentionDuree', label: '9. Durée (si applicable)', multiline: true },
    { key: 'cloture', label: '10. Clôture / PJ / scellés', multiline: true },
  ],
  consignes: [
    'Adapter la rubrique « droits » au régime réel (préliminaire vs flagrance vs enquête sous 153 si le témoin est aussi partie).',
    'Vérifier Légifrance pour les durées et la mention d’assistance juridique selon le cas.',
  ],
};

export const PV_EXERCISE_INTERPELLATION: PVMe1TemplateExerciseConfig = {
  id: 'interpellation',
  storageKey: 'examenopj:pv-exercise:interpellation:v1',
  heading: 'PV d’interpellation (12 points type ME1)',
  articles: 'Art. 78-2 C.P.P. (contrôle d’identité) ; art. 73 C.P.P. (garde) ; GAV — arts. 62-4, 63, 63-1 C.P.P.',
  previewTemplate: `PROCÈS-VERBAL — INTERPELLATION
PV n° {{pvNum}} — L’an {{an}}, le {{jour}}, à {{heure}}
Nous, {{nomOpj}}, {{gradeOpj}}

AFFAIRE :
{{blocAffaire}}

OBJET :
INTERPELLATION

--- 1. Mission exacte et lieu : {{point1}}
--- 2. Assistants : {{point2}}
--- 3. Constatations préalables : {{point3}}
--- 4. Contrôle d’identité (base juridique) : {{point4}}
--- 5. Palpation de sécurité (si réalisée) : {{point5}}
--- 6. Cadre juridique (flagrance / délit apparent) : {{point6}}
--- 7. Interpellation et heure : {{point7}}
--- 8. Identification : {{point8}}
--- 9. Notification GAV et droits (ou mention audition libre si hors GAV) : {{point9}}
--- 10. Représentation au service / saisies-scellés : {{point10}}
--- 11. Clôture sur place ou au service : {{point11}}
--- 12. Recherches administratives complémentaires : {{point12}}

L’Officier de police judiciaire`,
  fields: [
    { key: 'pvNum', label: 'PV n°' },
    { key: 'an', label: 'Année' },
    { key: 'jour', label: 'Date' },
    { key: 'heure', label: 'Heure (ouverture)' },
    { key: 'nomOpj', label: 'OPJ' },
    { key: 'gradeOpj', label: 'Grade' },
    { key: 'blocAffaire', label: 'AFFAIRE', multiline: true, mono: true },
    { key: 'point1', label: '1. Mission / lieu', multiline: true },
    { key: 'point2', label: '2. Assistants', multiline: true },
    { key: 'point3', label: '3. Constatations', multiline: true },
    { key: 'point4', label: '4. Contrôle identité', multiline: true },
    { key: 'point5', label: '5. Palpation', multiline: true },
    { key: 'point6', label: '6. Cadre juridique', multiline: true },
    { key: 'point7', label: '7. Heure interpellation', multiline: true },
    { key: 'point8', label: '8. Identification', multiline: true },
    { key: 'point9', label: '9. GAV / droits ou libre', multiline: true },
    { key: 'point10', label: '10. Transport / scellés', multiline: true },
    { key: 'point11', label: '11. Clôture', multiline: true },
    { key: 'point12', label: '12. Fichiers / TAJ si applicable', multiline: true },
  ],
  consignes: [
    'Si deux temporalités (terrain puis bureau), distinguer clairement ou renvoyer par n° de PV annexe comme dans l’exemple ME1.',
    'Ne pas confondre notification verbale et PV séparé une fois au service.',
  ],
};

export const PV_EXERCISE_PRESENTATION_GROUPE: PVMe1TemplateExerciseConfig = {
  id: 'presentation-groupe',
  storageKey: 'examenopj:pv-exercise:presentation-groupe:v1',
  heading: 'PV de constitution de groupe / présentation à témoin (type ME1)',
  articles: 'Respect des auditions et confrontations — visa rubrique ME1 / CPP selon le cas',
  previewTemplate: `PROCÈS-VERBAL
PV n° {{pvNum}} — L’an {{an}}, le {{jour}}, à {{heure}}
Nous, {{nomOpj}}, {{gradeOpj}}, OFFICIER DE POLICE JUDICIAIRE en résidence à {{ville}},

AFFAIRE :
{{blocAffaire}}

OBJET :
{{objetPrecis}}

--- Sur la demande du {{autoriteOuMotif}}, comparution de {{identiteTemoin}}. ---------
--- Le(s) mis en cause / personne(s) présentée(s) : {{identitePresentes}} -------------
--- Conditions matérielles (lieu, éclairage, distance, nombre) : {{conditions}} ----------
--- Rappel du secret de l’enquête / consignes au témoin : {{rappelSecret}} --------------
--- Déroulement : {{deroulement}} --------------------------------------------------------
--- Réactions du témoin (reconnaissance, hésitation, refus de s’exprimer…) : {{reactions}} 
--- Clôture : {{cloture}} ---------------------------------------------------------------
--- Dont procès-verbal. ----------------------------------------------------------------

L’Officier de police judiciaire              Signature ou mention du témoin`,
  fields: [
    { key: 'pvNum', label: 'PV n°' },
    { key: 'an', label: 'Année' },
    { key: 'jour', label: 'Date' },
    { key: 'heure', label: 'Heure' },
    { key: 'nomOpj', label: 'OPJ' },
    { key: 'gradeOpj', label: 'Grade' },
    { key: 'ville', label: 'Résidence' },
    { key: 'blocAffaire', label: 'AFFAIRE', multiline: true, mono: true },
    { key: 'objetPrecis', label: 'OBJET (constitution de groupe / présentation à témoin)' },
    { key: 'autoriteOuMotif', label: 'Sur demande de / cadre', multiline: true },
    { key: 'identiteTemoin', label: 'Identité du témoin', multiline: true },
    { key: 'identitePresentes', label: 'Personne(s) présentée(s)', multiline: true },
    { key: 'conditions', label: 'Conditions matérielles', multiline: true },
    { key: 'rappelSecret', label: 'Secret / consignes', multiline: true },
    { key: 'deroulement', label: 'Déroulement (neutre, factuel)', multiline: true },
    { key: 'reactions', label: 'Réactions', multiline: true },
    { key: 'cloture', label: 'Clôture / suites', multiline: true },
  ],
  consignes: [
    'Rester factuel : pas d’interprétation des silences ; mentionner les refus de répondre.',
    'Cohérence avec les photographies / scellés et les autres PV du même temps.',
  ],
};

export const PV_ME1_PHASE_A_EXERCISES: PVMe1TemplateExerciseConfig[] = [
  PV_EXERCISE_NOTIFICATION_GAV,
  PV_EXERCISE_FIN_GAV,
];

/** Liste complète affichée sous la section ME1 (Phase A + extraits programme). */
export const PV_ME1_TEMPLATE_EXERCISES_ALL: PVMe1TemplateExerciseConfig[] = [
  ...PV_ME1_PHASE_A_EXERCISES,
  PV_EXERCISE_ENQUETE_VOISINAGE,
  PV_EXERCISE_AUDITION_TEMOIN,
  PV_EXERCISE_INTERPELLATION,
  PV_EXERCISE_PRESENTATION_GROUPE,
];
