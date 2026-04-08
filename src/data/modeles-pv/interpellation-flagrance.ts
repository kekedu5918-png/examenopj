import {
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { ModelePV } from '@/types/pv';

export const modeleInterpellationFlagrance: ModelePV = {
  id: 'interpellation-flagrance',
  titre: "Interpellation en flagrant délit — Contrôle d'identité",
  source: 'Fascicule SDCP — La procédure pénale policière, p. 133',
  fascicule: 'F11',
  categorie: 'interpellation',
  isPremium: false,
  cartouche: {
    enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
    enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
    marginGauche: [
      'AFFAIRE :',
      'C/ (Prénom, NOM)',
      "(qualification de l'infraction)",
      'OBJET :',
      'Interpellation de',
      'Nom-Prénom-âge',
      'Profession – domicile',
    ],
  },
  corps: [
    {
      type: 'rubrique-numerotee',
      numero: 1,
      texte:
        '--- Étant de surveillance dans l\'enceinte du Métropolitain à la Station (…).------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 2,
      texte: '--- Assisté de (...) et de (…).-----------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 3,
      texte:
        '--- Remarquons (signalement sommaire du ou des individus) le manège suspect. ex. à notre vue fait un brusque demi-tour et s\'enfuit en direction de (…).------------------------------------------\n--- Son attitude laissant à penser que (citer l\'un des 5 cas visés aux alinéas 2 à 6 de l\'article 78-2 du C.P.P.).------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 4,
      texte:
        "--- Vu l'article 78-2 alinéa 1 du C.P.P.--------------------------------\n--- Décidons de procéder au contrôle d'identité de cette personne,",
    },
    {
      type: 'rubrique-numerotee',
      numero: 5,
      texte:
        '--- Palpé, préalablement, par mesure de sécurité l\'intéressé est trouvé porteur...-------------------------------------------------------\n--- Vu ce qui précède,-------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 6,
      texte:
        '--- Agissons dès lors en flagrant délit,-------------------------------\n--- Vu les articles 53 et suivants du C.P.P.---------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 7,
      texte: '--- À dix heures, procédons à l\'interpellation de cette personne.- -',
    },
    {
      type: 'rubrique-numerotee',
      numero: 8,
      texte:
        "--- Invitons l'intéressé à décliner son identité, il nous déclare se nommer : (petite identité).-------------------------------------------",
    },
    {
      type: 'rubrique-numerotee',
      numero: 9,
      texte:
        "--- L'informons qu'il est placé en garde à vue à partir de dix heures, heure de son interpellation, dans le cadre d'une affaire de port d'arme prohibé.--------------------------------------------------\n--- L'informons immédiatement de ses droits conformément aux articles 63-1 à 63-4-3 du C.P.P.--------------------------------------\n--- L'avisons que cette mesure lui sera notifiée ainsi que ses droits par procès-verbal séparé dès notre retour au service.-------",
    },
    {
      type: 'rubrique-numerotee',
      numero: 10,
      texte:
        '--- Interpellé sur l\'arme découverte sur lui, (Nom – prénom) nous déclare : \" … \".\n--- Saisissons et plaçons sous scellé N°UN (description de l\'arme).',
    },
    {
      type: 'rubrique-numerotee',
      numero: 11,
      texte:
        '--- Après lecture faite par lui-même, le nommé (prénom, nom) persiste et signe avec nous et nos assistants le présent procès-verbal ainsi que la fiche de scellé constitué à (heure).--------------',
    },
    { type: 'signature', signataires: ["L'intéressé", 'Les assistants', "L'O.P.J."] },
    {
      type: 'rubrique-numerotee',
      numero: 12,
      texte:
        "--- Mentionnons que (prénom, nom) ne fait l'objet d'aucune inscription au fichier des personnes recherchées.-------------------\n--- Dont mention------------------------------------------------------",
    },
    { type: 'signature', signataires: ["L'Officier de Police Judiciaire"] },
  ],
  notesPedagogiques: [
    "1 — Mission exacte et lieu : permet d'établir la compétence territoriale.",
    "2 — Assistants : 'assistés de' si subordonnés, 'en compagnie de' si même grade, 'sous la direction de' si supérieur hiérarchique.",
    "3 — Constatations : relater les faits en faisant ressortir l'attitude pré-délictueuse ou délictueuse.",
    "4 — Base juridique du contrôle d'identité : citer le cas de l'art. 78-2 applicable.",
    '5 — Palpation de sécurité : indiquer son résultat et décrire les objets découverts.',
    "7 — L'heure d'interpellation = début de la garde à vue éventuelle.",
    '9 — Notification GAV : le délai doit être le plus court possible.',
    "11 — La clôture doit faire figurer la signature de la personne interpellée dès qu'il y a saisie-scellé.",
    '12 — Consultation FPR.2 obligatoire : mentionner systématiquement le résultat.',
  ],
};
