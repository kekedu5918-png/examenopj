/**
 * Données structurées — cartouches Épreuve 2 (réf. document officiel ADP/SDREF/DCE).
 * Rendu via PVCartoucheFromDef (pv-card.tsx).
 */

export type CartoucheBlock =
  | { kind: 'line'; m: string; i?: string; indent?: 0 | 1 | 2; noDash?: boolean }
  | { kind: 'italicLine'; text: string; indent?: 0 | 1 | 2 }
  | { kind: 'divider' }
  | {
      kind: 'droits';
      title?: string;
      bullets: { m?: string; i?: string; sub?: boolean }[];
    }
  | { kind: 'recueil' }
  | { kind: 'annexes'; detail: string }
  | { kind: 'space' };

export type AuditionExtraCartouche = {
  id: string;
  accordionTitle: string;
  titre: string;
  sousTitre?: string;
  blocks: CartoucheBlock[];
};

/** Tab Auditions — cartouches pages 14-15 (A à F) */
export const AUDITION_EXTRA_CARTOUCHES: AuditionExtraCartouche[] = [
  {
    id: 'pv-aud-a',
    accordionTitle:
      "Notification des droits — audition libre Prénom NOM (Mineur, crime/délit emprisonnement)",
    titre:
      "Notification des droits dans le cadre d'une audition libre de Prénom NOM (Mineur)",
    sousTitre: "(Crime ou délit puni d'une peine d'emprisonnement)",
    blocks: [
      { kind: 'line', m: 'Infraction', i: 'Q1 (selon le thème)' },
      { kind: 'line', m: 'Date et lieu présumés de l’infraction', i: 'JJ/MM/AA à Lieu' },
      { kind: 'line', m: 'Absence de contrainte par la force publique' },
      {
        kind: 'droits',
        bullets: [
          { m: 'Quitter les locaux à tout moment' },
          { m: 'Silence' },
          { m: 'Interprète' },
          { m: 'Avis responsable légal — Obligatoire' },
          { m: 'Avocat — Obligatoire' },
          { m: 'Consultation procès-verbaux auditions et confrontations' },
          { m: 'Bénéficier de conseils juridiques' },
          {
            m: "Droit à l'accompagnement / information / remplacement des titulaires de l'autorité parentale",
          },
          { m: 'Droit au respect de la vie privée' },
        ],
      },
      { kind: 'recueil' },
    ],
  },
  {
    id: 'pv-aud-b',
    accordionTitle: 'Audition libre — Majeur (contravention / délit sans peine d’emprisonnement)',
    titre: 'Audition libre de Prénom NOM, avec notification des droits (Majeur)',
    sousTitre: "(Contravention ou délit non puni d'une peine d'emprisonnement / Majeur)",
    blocks: [
      { kind: 'line', m: 'Infraction', i: 'Q1 (selon le thème)' },
      { kind: 'line', m: 'Date et lieu présumés de l’infraction', i: 'JJ/MM/AA à Lieu' },
      { kind: 'line', m: 'Absence de contrainte par la force publique' },
      {
        kind: 'droits',
        bullets: [
          { m: 'Quitter les locaux à tout moment' },
          { m: 'Silence' },
          { m: 'Interprète' },
          { m: 'Bénéficier de conseils juridiques' },
        ],
      },
      { kind: 'space' },
      { kind: 'line', m: 'Éléments d’enquête :', indent: 1 },
      {
        kind: 'italicLine',
        text: 'Ex : reconnaît ou non les faits, dénonce des complices, accepte restitution, présentation des scellés, etc.',
        indent: 2,
      },
    ],
  },
  {
    id: 'pv-aud-c',
    accordionTitle: "Notification des droits — audition libre Majeur (crime/délit emprisonnement)",
    titre:
      "Notification des droits dans le cadre d'une audition libre de Prénom NOM (Majeur)",
    sousTitre: "(Crime ou délit puni d'une peine d'emprisonnement)",
    blocks: [
      { kind: 'line', m: 'Infraction', i: 'Q1 (selon le thème)' },
      { kind: 'line', m: 'Date et lieu présumés de l’infraction', i: 'JJ/MM/AA à Lieu' },
      { kind: 'line', m: 'Absence de contrainte par la force publique' },
      {
        kind: 'droits',
        bullets: [
          { m: 'Quitter les locaux à tout moment' },
          { m: 'Silence' },
          { m: 'Interprète' },
          { m: 'Avocat' },
          { m: 'Consultation procès-verbaux auditions et confrontations' },
          { m: 'Bénéficier de conseils juridiques' },
        ],
      },
      { kind: 'space' },
      {
        kind: 'line',
        m: 'Si majeur protégé :',
        indent: 1,
      },
      {
        kind: 'line',
        m: 'Avis à tuteur / curateur / mandataire spécial obligatoire',
        indent: 2,
      },
      { kind: 'recueil' },
    ],
  },
  {
    id: 'pv-aud-d',
    accordionTitle: 'Avis Tuteur / Curateur / Mandataire spécial (audition libre)',
    titre: 'Avis Tuteur / Curateur / Mandataire spécial',
    sousTitre: "(Audition libre crime ou délit puni d'une peine d'emprisonnement)",
    blocks: [
      {
        kind: 'droits',
        title: 'Informations :',
        bullets: [
          { m: 'Audition libre de Prénom NOM' },
          {
            m: "S'il n'a pas été exercé",
            i: "avisé qu'il peut demander l'assistance d'un avocat",
          },
        ],
      },
      { kind: 'recueil' },
    ],
  },
  {
    id: 'pv-aud-e',
    accordionTitle: 'Avis représentant légal (audition libre mineur)',
    titre: 'Avis représentant légal',
    sousTitre: '(Audition libre mineur)',
    blocks: [
      { kind: 'line', m: 'Informé', i: "de l'audition libre de Prénom NOM" },
      {
        kind: 'line',
        m: 'Reçoit les mêmes informations',
        i: 'que celles communiquées au mineur',
      },
      {
        kind: 'line',
        m: 'Si crime ou délit puni d’une peine d’emprisonnement :',
        indent: 1,
      },
      {
        kind: 'line',
        m: "Si le mineur n'a pas sollicité l'assistance d'un avocat, le représentant légal est avisé de son droit d'en faire la demande",
        indent: 2,
      },
      { kind: 'recueil' },
    ],
  },
  {
    id: 'pv-aud-f',
    accordionTitle: 'Audition — Prénom NOM gardé à vue',
    titre: 'Audition de Prénom NOM, gardé à vue',
    blocks: [
      {
        kind: 'line',
        m: 'Particularités à préciser selon le thème',
        i: '(enregistrement audio-visuel, assistance de l’avocat, accompagnement)',
      },
      { kind: 'line', m: 'Éléments d’enquête :', indent: 1 },
      {
        kind: 'italicLine',
        text: 'Ex : reconnaît ou non les faits, accepte la restitution, présentation des scellés, etc.',
        indent: 2,
      },
      { kind: 'line', m: 'Remise d’observations écrites de l’avocat' },
      {
        kind: 'line',
        m: 'Avis de prochaine audition',
        i: 'si réalisée en présence de l’avocat',
      },
    ],
  },
];
