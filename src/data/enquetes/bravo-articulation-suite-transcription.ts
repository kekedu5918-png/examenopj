import type { CartouchePV } from '@/data/enquetes-types';

/** Articulation de procédure incidente — Enquête « BRAVO » */
export const BRAVO_ARTICULATION_SUITE_CARTOUCHES: CartouchePV[] = [
  {
    cote: 1,
    date: '23/12/AA',
    heure: '12H50',
    qualite: 'OPJ',
    titre: 'SAISINE – SAISIE INCIDENTE au domicile de Raoul VERT',
    contenu: [
      'Pour des faits de recel C/ Raoul VERT',
      "Découverte incidente de six téléphones portables neufs dans la chambre de Raoul VERT lors d'une perquisition dans le cadre d'une affaire de violences volontaires aggravées diligentée en préliminaire (n° 20XX/2022)",
      "Présentation des téléphones portables à Raoul VERT qui déclare qu'ils ne sont pas à lui",
      'Flagrant délit',
      'Présentation des téléphones portables à Paul VERT, civilement responsable qui déclare ignorer la présence de ces téléphones dans la chambre de son fils',
      'Avis parquet',
      'Saisie scellé numéro UN: les six téléphones portables',
      'Avis hiérarchie',
    ],
  },
  {
    cote: 2,
    date: '23/12/AA',
    heure: '17H00',
    qualite: 'OPJ2',
    titre: "NOTIFICATION DES DROITS À RAOUL VERT (MINEUR) DANS LE CADRE D'UNE AUDITION POUR DES FAITS DISTINCTS",
    contenu: [
      'Faits de recel révélé le 23/12/20AA à 12h50 à Beaumont',
      'Notification des droits :',
      'Avis représentant légal et assistance avocat obligatoires',
      'Quitter les locaux à tout moment, interprète, silence, consultation procès-verbal audition / confrontation, bénéficier de conseils juridiques',
      "Droit à information / accompagnement / remplacement des titulaires de l'autorité parentale, respect de sa vie privée",
    ],
  },
  {
    cote: 3,
    date: '23/12/AA',
    heure: '17H10',
    qualite: 'OPJ',
    titre: "AVIS AVOCAT (Permanence téléphonique de l'ordre des avocats du barreau de Clermont-Ferrand",
    contenu: [
      'Information relative aux faits de recel, faits révélés le 23/12/20AA à 12h50',
      "Demande d'assistance pour Raoul VERT",
    ],
  },
  {
    cote: 4,
    date: 'JJ/MM/AA',
    heure: 'XX',
    qualite: 'APJ - OPJ 2',
    titre: '—',
    contenu: [
      'AUDITIONS (Mis en cause et autres)',
      'ENQUETE VOISINAGE',
      'RECHERCHES/ RENSEIGNEMENTS/VERIFICATIONS',
      'RÉQUISITIONS',
      'CR PARQUET etc.',
      'Tout acte matériel susceptible d\'apporter des éléments à l\'enquête en cours concernant le recel: audition du MEC (qui en fonction de ses déclarations, pourrait très bien conduire à une autre perquisition),',
    ],
  },
];
