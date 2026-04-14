import {
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { ModelePV } from '@/types/pv';

export const modelePerquisitionFlagrance: ModelePV = {
  id: 'perquisition-flagrance',
  titre: "Perquisition en enquête de flagrance — au domicile d'un individu placé en GAV",
  source: 'Support officiel SDCP — La procédure pénale policière, p. 199',
  fascicule: 'F11',
  categorie: 'perquisition',
  isPremium: true,
  cartouche: {
    enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
    enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
    marginGauche: [
      'AFFAIRE :',
      'C/ (Prénom, NOM)',
      "(qualification de l'infraction)",
      'OBJET :',
      'Transport / Perquisition au',
      'domicile de :',
      '(identité succincte)',
      'Saisie – scellé',
    ],
  },
  corps: [
    {
      type: 'rubrique-numerotee',
      numero: 2,
      texte: '--- Étant au service.---------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 3,
      texte:
        "--- Poursuivant l'enquête en matière de flagrance.------------------\n--- Vu les articles 53 et suivants du code de procédure pénale.----",
    },
    {
      type: 'rubrique-numerotee',
      numero: 4,
      texte: '--- Assisté de (nom, prénom, grade, service).----------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 5,
      texte:
        '--- Procédons à l\'extraction des locaux de garde à vue du nommé (prénom, nom).-------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 6,
      texte:
        '--- Accompagné du sus-nommé, nous transportons (lieu de la perquisition, adresse).------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 7,
      texte:
        '--- Constatons qu\'il s\'agit (situation précise du lieu de perquisition).----------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 8,
      texte: '--- A (heure), ---------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 9,
      texte: '--- à l\'aide de la clé… pénétrons.-------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 10,
      texte: '--- En la présence constante et effective de (prénom, nom),-------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 11,
      texte:
        '--- Effectuons une minutieuse perquisition de son appartement de type… composé de (nombre et type des pièces).--------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 12,
      texte:
        '--- Dans la chambre, sous le lit, découvrons...(désignation de l\'objet et description).-------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 13,
      texte:
        '--- Interpellé sur l\'origine de cet objet (prénom, nom) nous déclare : \"...\".-----------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 14,
      texte:
        '--- Saisissons et plaçons sous scellé (ouvert, fermé ou découvert) n°… (l\'objet découvert).-----------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 15,
      texte:
        '--- Notre perquisition, terminée à (heure) sans incident, ne nous permet de découvrir aucun autre objet, trace ou indice utile à l\'enquête en cours.----------------------------------------------------\n--- Refermons les lieux à l\'aide des clés en notre possession.------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 16,
      texte:
        '--- Lecture faite par lui-même, M. (prénom, nom) persiste et signe le présent procès-verbal avec nous et notre assistant ainsi que la fiche de scellé constitué.--------------------------------------',
    },
    { type: 'signature', signataires: ["L'intéressé", "L'assistant", "L'O.P.J."] },
  ],
  notesPedagogiques: [
    '5 — Extraction des locaux de GAV : mention obligatoire, établit la continuité de la mesure.',
    "8 — L'heure d'arrivée sur les lieux est POSTÉRIEURE à celle de l'en-tête (temps de transport).",
    "9 — Préciser comment on a pénétré dans les lieux (clé, etc.).",
    '10 — Présence CONSTANTE et EFFECTIVE de la personne : obligation légale sous peine de nullité (art. 57 CPP).',
    '12 — Lieu exact de découverte : pièce + meuble + description précise de l\'objet.',
    '13 — Représentation systématique au mis en cause : il ne doit être interpellé que sur sa reconnaissance.',
    '14 — Le scellé est numéroté chronologiquement. Préciser la nature : ouvert, fermé ou découvert.',
    "15 — Heure de fin + résultat exhaustif : 'aucun autre objet, trace ou indice' si perquisition négative.",
    "Perquisition négative : rédiger uniquement jusqu'au n°10 puis 'Nos recherches commencées à (heure) et terminées à (heure) ne nous permettent de découvrir aucun objet ou indice susceptible d'intéresser l'enquête.'",
  ],
};
