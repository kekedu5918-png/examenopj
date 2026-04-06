/**
 * Retranscriptions pédagogiques (phase A) — à rapprocher ligne à ligne du fascicule ME1 officiel.
 * Ne remplace pas le support diffuseur ; contrôle Légifrance pour les mentions d’articles.
 */

export {
  PV_ME1_ARTICULATION_AUDITION_TEMOIN,
  PV_ME1_ARTICULATION_INTERPELLATION,
  PV_ME1_VERBATIM_ENQUETE_VOISINAGE,
} from '@/data/pv-me1-fascicule-extracts';

/** Exemple de notification : texte d’étude, champs fictifs. */
export const PV_NOTIFICATION_GAV_VERBATIM_MODELE = `PROCÈS-VERBAL DE NOTIFICATION DES DROITS — PLACEMENT EN GARDE À VUE
(Cadre pédagogique — caler ligne à ligne sur le fascicule ME1 officiel)

Marge gauche : bandeau République / service, adresse, CODE INSEE, n° PV marginal.
Bloc droit : PV n°, date et heure, identité OPJ, grade, service, résidence, AFFAIRE (C/ identité, qualification), OBJET (notification des droits — placement en GAV).

Corps (lignes ---) : qualification provisoire ou infraction soupçonnée ; durée maximale de la mesure ; heure de début ; rappel des six finalités de l’art. 62-2 avec motivation de celle retenue ; notification des droits des arts. 63-1 à 63-3-1 (infraction concernée, assistance, médecin, avocat, silence, auditions, interprète selon le cas) ; prise d’acte de la personne ; signatures OPJ / intéressé.

Les huit informations devant être portées à la connaissance de la personne suivent le modèle officiel : ne pas les résumer à l’examen — reproduire la liste du fascicule ou du support valide.`;

/** Exemple de fin de GAV : texte d’étude. */
export const PV_FIN_GAV_VERBATIM_MODELE = `PROCÈS-VERBAL DE FIN DE GARDE À VUE
(Cadre pédagogique — caler sur ME1 + registre de GAV)

Marge gauche : identité du service, code affaire, n° PV.

Bloc droit : AFFAIRE inchangée ou actualisée ; OBJET : fin de garde à vue / cessation de la mesure.

Corps : chronologie exacte (début — fin) ; auditions et interruptions (repos, soins) ; décisions de prolongation le cas échéant (autorité, date) ; respect des notifications famille / parquet / avocat selon le régime ; état de santé ou refus d’examen s’il y a lieu ; destination finale (mise en liberté, présentation au parquet, autre) avec l’heure ; clôture du PV ; signatures.

Vérifier la cohérence avec chaque PV d’audition et le registre : incohérence horaire = grief fréquent en correction.`;
