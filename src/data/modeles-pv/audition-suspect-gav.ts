import {
  SDCP_ENTETE_DROIT_PLAINTE,
  SDCP_ENTETE_GAUCHE_PLAINTE,
} from '@/data/modeles-pv/plainte-sdcp-shared';
import type { ModelePV } from '@/types/pv';

export const modeleAuditionSuspectGav: ModelePV = {
  id: 'audition-suspect-gav',
  titre: "Audition d'une personne placée en garde à vue — assistée d'un avocat",
  source: 'Fascicule SDCP — La procédure pénale policière, p. 177–179',
  fascicule: 'F11',
  categorie: 'audition-suspect-gav',
  isPremium: true,
  cartouche: {
    enteteGauche: SDCP_ENTETE_GAUCHE_PLAINTE,
    enteteDroit: SDCP_ENTETE_DROIT_PLAINTE,
    marginGauche: [
      'AFFAIRE :',
      'C/ (Prénom, NOM)',
      "(qualification de l'infraction)",
      'OBJET :',
      '1ère audition de :',
      'prénom, nom, âge,',
      'profession et adresse',
    ],
  },
  corps: [
    {
      type: 'rubrique-numerotee',
      numero: 1,
      texte: '--- À (heure), ---------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 2,
      texte: '--- Étant au service.---------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 3,
      texte:
        "--- Poursuivant l'enquête de flagrance.------------------------------\n--- Vu les articles 53 et suivants du code de procédure pénale.----",
    },
    {
      type: 'rubrique-numerotee',
      numero: 4,
      texte:
        '--- Vu les articles 63-4-2 et 63-4-3 du code de procédure pénale.-',
    },
    {
      type: 'rubrique-numerotee',
      numero: 5,
      texte:
        '--- Assisté du brigadier de police (prénom, nom), du service.- - - - -',
    },
    {
      type: 'rubrique-numerotee',
      numero: 6,
      texte:
        '--- En la présence de Maître (prénom, nom), avocat au barreau de (VILLE).-------------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 7,
      texte:
        '--- Faisons comparaître devant nous Monsieur (prénom, nom) préalablement extrait de nos locaux de garde à vue.---------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 8,
      texte:
        "--- L'informons que, conformément à sa demande, il va être assisté par Maître (NOM) qu'il a préalablement désigné (ou commis d'office).------------------------------------------------------",
    },
    {
      type: 'rubrique-numerotee',
      numero: 9,
      texte:
        "--- Rappelons à Maître (NOM) qu'il ne pourra poser des questions à la personne gardée à vue qu'à l'issue de l'audition. Ses observations écrites éventuelles seront jointes au présent.--------",
    },
    {
      type: 'rubrique-numerotee',
      numero: 10,
      texte:
        '--- Entendons Monsieur (prénom, nom), qui nous déclare :--------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 11,
      texte:
        '--- SUR SON IDENTITÉ :--------------------------------------------\n--- « Je me nomme (prénom, nom). Je suis né le (...) à (...), de (...) et (...). Je n\'ai pas de surnom. »--------------------------------\n--- « Je suis marié à (nom jeune fille, épouse) depuis (durée), nous n\'avons pas d\'enfant. »-----------------------------------------\n--- « Je suis domicilié (...) rue (...) à (...), téléphone numéro (...). »------------------------------------------------------------------\n--- « Je suis de nationalité Française. »------------------------------\n--- « J\'exerce la profession de (...), mon entreprise se nomme (...) et est située au (n°...), de (rue...) à (VILLE). »----------------\n--- « Le montant de mes revenus est d\'environ (...) euros par mois. Mes charges qui s\'élèvent à (…) euros par mois sont les suivantes (...). Je possède un compte courant n° (…) auprès de (…). »------------------------------------------------------------------\n--- « Je suis immatriculé à la sécurité sociale sous le numéro (...). »------------------------------------------------------------------\n--- « Je suis exempté du service national. »-------------------------\n--- « J\'ai été scolarisé jusqu\'en (...) au Lycée (...) à (ville). »------\n--- « Je suis titulaire du (diplôme). »\"-------------------------------\n--- « Je suis titulaire du permis de conduire catégorie B, délivré par la Préfecture de (...). »-------------------------------------------\n--- « Je ne détiens aucune arme à feu et ne possède pas de permis de chasser. »--------------------------------------------------\n--- « Je ne suis pas connu des services de police et je n\'ai jamais été condamné. »------------------------------------------------------',
    },
    {
      type: 'rubrique-numerotee',
      numero: 12,
      texte:
        '--- SUR LES FAITS :-------------------------------------------------\n--- « (Recueil éventuel des déclarations spontanées de la personne). »-----------------------------------------------------------\n--- Question : (Énoncé de la question posée à la personne) ?------\n--- Réponse : « (Contenu de la réponse formulée par la personne). »-----------------------------------------------------------\n[répéter autant de Q/R que nécessaire]',
    },
    {
      type: 'rubrique-numerotee',
      numero: 13,
      texte:
        '--- Notre audition terminée, demandons à Maître (NOM) s\'il souhaite poser des questions à Monsieur (NOM).-------------------\n--- Question de Maître (NOM) : (Énoncé de la question posée à la personne) ?------------------------------------------------------------\n--- Réponse : « (Contenu de la réponse formulée par la personne). »-----------------------------------------------------------\n--- Constatons que Maître (NOM) n\'a plus de question à poser à Monsieur (NOM) et qu\'il nous remet ses observations écrites.-----',
    },
    {
      type: 'rubrique-numerotee',
      numero: 14,
      texte:
        '--- Après lecture faîte par lui-même (et par Maître (NOM) en cas de relecture par l\'avocat), Monsieur (prénom, nom) persiste et signe avec nous et notre assistant le présent à (heure).-----------',
    },
    { type: 'signature', signataires: ["L'intéressé", "L'assistant", "L'O.P.J."] },
    {
      type: 'annexe',
      texte:
        '--- Annexons au présent les observations écrites présentées par Maître (NOM).---------------------------------------------------------',
    },
  ],
  notesPedagogiques: [
    "4 — Art. 63-4-2 et 63-4-3 CPP : droit à l'assistance de l'avocat dès le début de la GAV.",
    "9 — L'avocat ne peut poser des questions QU'À L'ISSUE de l'audition, pas pendant.",
    '11 — L\'identité complète du mis en cause est un passage obligé : état civil, situation familiale, profession, revenus, casier judiciaire.',
    '12 — Style direct obligatoire pour les déclarations (guillemets). Questions en style direct, réponses en style direct.',
    "13 — L'OPJ peut s'opposer aux questions de l'avocat si elles nuisent au bon déroulement de l'enquête — mention obligatoire au PV.",
    "14 — Heure de fin d'audition INDISPENSABLE. Ne jamais oublier.",
    "15 — Les observations écrites de l'avocat sont ANNEXÉES au PV, elles ne font pas partie du corps.",
  ],
};
