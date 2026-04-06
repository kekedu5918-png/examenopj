/**
 * Extrait du fascicule ME1 « La procédure pénale policière » (session type juin 2026, SDCP).
 * Modèle : Exemple 4 — plainte avec interprète (pages plainte / exemples).
 * À consolider avec votre support officiel ; ne se substitue pas au PDF diffuseur.
 */

/** Partie supérieure fixe de l’en-tête gauche (jusqu’au premier filet). */
export const ME1_PV_ENTETE_GAUCHE_HAUT = `RÉPUBLIQUE FRANÇAISE
MINISTÈRE DE L’INTÉRIEUR
DIRECTION GÉNÉRALE DE
LA POLICE NATIONALE
DIRECTION NATIONALE DE
LA SÉCURITÉ PUBLIQUE
__________`;

/**
 * Gabarit « feuille blanche » : mêmes bandes qu’au ME1 (en-tête institutionnel + marge), sans corps ni modèle d’infraction.
 * Le candidat rédige librement sous AFFAIRE / OBJET et dans la colonne droite.
 */
export const ME1_PV_BLANC_LEFT = `RÉPUBLIQUE FRANÇAISE
MINISTÈRE DE L’INTÉRIEUR
DIRECTION GÉNÉRALE DE
LA POLICE NATIONALE
DIRECTION NATIONALE DE
LA SÉCURITÉ PUBLIQUE
__________

__________

__________
CODE INSEE :

P.V. : n°
__________`;

export const ME1_PV_BLANC_RIGHT = `PROCÈS-VERBAL
PV n° 
L’an ,
Le , à 
Nous, 

En fonction à 
OFFICIER DE POLICE JUDICIAIRE en résidence à ,
AFFAIRE :

OBJET :

`;

/** Bloc encadré gauche (en-tête service + marge), tel que dans le fascicule. */
export const ME1_PV_ENTETE_GAUCHE_EX4 = `RÉPUBLIQUE FRANÇAISE
MINISTÈRE DE L’INTÉRIEUR
DIRECTION GÉNÉRALE DE
LA POLICE NATIONALE
DIRECTION NATIONALE DE
LA SÉCURITÉ PUBLIQUE
__________
(ADRESSE ET COORDONNÉES)
(DU SERVICE)
CODE INSEE :
P.V. : n°…/…
__________`;

/** Bloc principal droit : titre, incipit et corps-type jusqu’aux signatures (exemple interprète). */
export const ME1_PV_BLOC_DROIT_EX4 = `PROCÈS-VERBAL
PV n° …/…/…
L’an (année),
Le (jour, mois), à (heures, minutes)
Nous, (Prénom, NOM)
(Grade du rédacteur)
En fonction à (service) de (VILLE)
OFFICIER DE POLICE JUDICIAIRE en résidence à (VILLE),
AFFAIRE :
C/ (Prénom, NOM)
(qualification de l’infraction)
OBJET :
Plainte de ...
1
2
--- OFFICIER DE POLICE JUDICIAIRE en résidence à (VILLE),- - - - -
--- Étant au service.---------------------------------------------------
--- Constatons que se présente M. ou Mme (prénom, nom),
accompagné de M. ou Mme (prénom, nom, adresse), lui servant
d’interprète en langue (…) qui nous informe que (prénom, nom) a
été victime de (infraction, date, lieu).--------------------------------
--- Agissant en…(flagrant délit ou enquête préliminaire).-----------
--- Vu les articles.-----------------------------------------------------
--- Par le truchement de l’interprète.--------------------------------
--- Informons M. (prénom, nom) des droits mentionnés à l’article
10-2 du code de procédure pénale et l’entendons comme suit :- - -
--- Après lecture et traduction faites par M. (prénom, nom)
interprète, M. (prénom, nom) persiste et signe le présent avec
nous.-------------------------------------------------------------------
L’intéressé(e) L'interprète L’O.P.J.`;

/** Mentions marginales types (deux schémas), fascicule p. 18-19 — référence. */
export const ME1_MENTIONS_MARGINALES_TYPES = `Premier procès-verbal de la procédure
N° 2020/101/1
AFFAIRE :
C/ Émile LATOUR
16 ans,
MINEUR
Vol avec effraction
OBJET :
Constatations
---

Deuxième procès-verbal de la procédure
N° 2020/101/2
AFFAIRE :
C/ Émile LATOUR
Vol avec effraction
OBJET :
Plainte de Michel DUPONT,
55 ans, Plombier, domicilié
2 bd des Iles à VANNES
(Morbihan)
---`;

/** Exemple 5 — plainte par représentant (cadre de la victime), bloc droit jusqu’aux signatures. */
export const ME1_PV_BLOC_DROIT_EX5 = `PROCÈS-VERBAL
PV n° …/…/…
L’an (année),
Le (jour, mois), à (heures, minutes)
Nous, (Prénom, NOM)
(Grade du rédacteur)
En fonction à (service) de (VILLE)
OFFICIER DE POLICE JUDICIAIRE en résidence à (VILLE),
AFFAIRE :
C/ (Prénom, NOM)
(qualification de l’infraction)
OBJET :
Plainte de…
---
---
---
--- Je dépose plainte contre […] pour (… faits) au nom de
(… victime) en qualité de […].----------------------------------------
--- Après lecture faite personnellement, M. (prénom, nom)
persiste et signe le présent avec Nous.------------------------------
L’intéressé L’Officier de Police Judiciaire`;

/** Squelette du corps (Ex. 4) à injecter dans la zone de rédaction. */
export const ME1_PV_CORPS_SQUELETTE_EX4 = `--- OFFICIER DE POLICE JUDICIAIRE en résidence à (VILLE),- - - - -
--- Étant au service.---------------------------------------------------
--- Constatons que se présente M. ou Mme (prénom, nom),
accompagné de M. ou Mme (prénom, nom, adresse), lui servant
d’interprète en langue (…) qui nous informe que (prénom, nom) a
été victime de (infraction, date, lieu).--------------------------------
--- Agissant en…(flagrant délit ou enquête préliminaire).-----------
--- Vu les articles.-----------------------------------------------------
--- Par le truchement de l’interprète.--------------------------------
--- Informons M. (prénom, nom) des droits mentionnés à l’article
10-2 du code de procédure pénale et l’entendons comme suit :- - -
--- Après lecture et traduction faites par M. (prénom, nom)
interprète, M. (prénom, nom) persiste et signe le présent avec
nous.-------------------------------------------------------------------
L’intéressé(e) L'interprète L’O.P.J.`;

/** Squelette du corps (Ex. 5) : à placer sous la rubrique OBJET (trois lignes --- puis acte). */
export const ME1_PV_CORPS_SQUELETTE_EX5 = `---
---
---
--- Je dépose plainte contre […] pour (… faits) au nom de
(… victime) en qualité de […].----------------------------------------
--- Après lecture faite personnellement, M. (prénom, nom)
persiste et signe le présent avec Nous.------------------------------
L’intéressé L’Officier de Police Judiciaire`;

/** Les six parties du PV rappelées par le fascicule (structure / techniques). */
export const ME1_PARTIES_PROC_VERBAL = [
  { titre: 'Titre', detail: '« PROCÈS-VERBAL »' },
  { titre: 'Incipit', detail: 'Date et heure en toutes lettres, identité du rédacteur, lieu, cadre juridique, personnes présentes.' },
  { titre: 'Corps', detail: 'Constatations, auditions, Q/R au présent, mentions légales de l’acte.' },
  { titre: 'Énonciation terminale', detail: 'Clôture, signatures (déclarant, interprète, OPJ selon le cas).' },
  { titre: 'Pagination', detail: 'Recto, suite de PV sans nouvel incipit, rappel N° / objet / feuillet.' },
  { titre: 'Marge', detail: 'N° procédure / cote PV, rubriques AFFAIRE et OBJET.' },
] as const;

export const ME1_SOURCE_LABEL =
  'Fascicule ME1 — La procédure pénale policière (SDCP / examen type juin 2026). Texte d’appui pédagogique.';

/** Clé localStorage pour le brouillon d’exercice PV ME1. */
export const PV_ME1_EXERCISE_STORAGE_KEY = 'examenopj-pv-me1-exercise-v1';
