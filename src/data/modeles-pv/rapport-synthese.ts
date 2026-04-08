import type { ModelePV } from '@/types/pv';

/** Structure type rapport de synthèse parquet — fascicule SDCP (schéma pédagogique p. 67 et s.). */
export const modeleRapportSynthese: ModelePV = {
  id: 'rapport-synthese',
  titre: 'Rapport de synthèse — structure officielle',
  source: 'Fascicule SDCP — La procédure pénale policière, p. 67+',
  fascicule: 'F11',
  categorie: 'rapport-synthese',
  isPremium: true,
  cartouche: {
    enteteGauche: [
      'RÉPUBLIQUE FRANÇAISE',
      "MINISTÈRE DE L'INTÉRIEUR",
      'DIRECTION GÉNÉRALE DE',
      'LA POLICE NATIONALE',
      '__________',
      '(SERVICE)',
      '__________',
      'N/Réf. : …/…',
    ],
    enteteDroit: [
      'Monsieur le Procureur de la République',
      'près le tribunal judiciaire de (VILLE)',
      '',
      'L’an (année),',
      'Le (jour mois), à (heures, minutes)',
      '',
      'Nous soussigné(e), (Grade, Prénom, NOM),',
      'Officier de police judiciaire en résidence à (VILLE),',
    ],
    marginGauche: [
      'AFFAIRE :',
      '',
      'C/ (Prénom, NOM)',
      '',
      "(qualification de l'infraction)",
      '',
      'OBJET :',
      '',
      'Rapport de synthèse',
    ],
  },
  corps: [
    {
      type: 'paragraphe',
      texte:
        '--- IL EST RAPPELÉ QUE LE PRÉSENT RAPPORT DE SYNTHÈSE EST ADRESSÉ À M. LE PROCUREUR DE LA RÉPUBLIQUE AUX FINS QUE DE DROIT.---------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 1,
      texte:
        '--- OBJET : ----------------------------------------------------------------\n--- (Intitulé court : référence procédure, infraction(s) principale(s)).-------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 2,
      texte:
        '--- EXPOSÉ DES FAITS : ---------------------------------------------------\n--- (Chronologie factuelle, actes d’enquête principaux, identités et qualification provisoire.)-------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 3,
      texte:
        '--- ÉLÉMENTS À CHARGE : --------------------------------------------------\n--- (Synthèse des indices et déclarations favorables à une poursuite.)----------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 4,
      texte:
        '--- ÉLÉMENTS À DÉCHARGE / RÉSERVE : --------------------------------------\n--- (Contredit(s), incertitudes, diligences restant à accomplir.)--------------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 5,
      texte:
        '--- QUALIFICATION PÉNALE (PROVISOIRE) : ------------------------------------\n--- (Articles de loi envisagés ; renvoi aux textes en vigueur sur Légifrance.)------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 6,
      texte:
        '--- MESURES DÉJÀ PRISES : -------------------------------------------------\n--- (Garde à vue, auditions, perquisitions, scellés, réquisitions, etc.)--------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 7,
      texte:
        '--- SITUATION ACTUELLE DES PERSONNES : ------------------------------------\n--- (Garde à vue, contrôle judiciaire, liberté, soins, etc.)----------------------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 8,
      texte:
        '--- PROPOSITIONS : --------------------------------------------------------\n--- (Demandes de prolongation, réquisitions, classement, renvoi, autre — sans empiéter sur les pouvoirs du parquet.)------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 9,
      texte:
        '--- Fait à (lieu), le (date), pour servir et valoir ce que de droit.------\n--- Le présent rapport comporte (nombre) pages et (nombre) annexes énumérées comme suit : (…).------------------------------------------',
    },
    { type: 'signature', signataires: ["L'Officier de Police Judiciaire"] },
  ],
};
