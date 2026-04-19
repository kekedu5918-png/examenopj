/** F01 — Partie 1 : atteintes aux personnes (synthèse : vie, violences, agressions sexuelles, menaces, atteintes routières, images de violence). */
export const recapSectionF01P1 = {
  id: 'f01-p1',
  fascicule: 'F01',
  fasciculePart: 'Partie 1',
  groupTitle: 'F01 — Atteintes aux personnes (partie 1)',
  headerClass: 'bg-rose-950/80 text-rose-100',
  rows: [
    {
      infraction: '**Le meurtre**',
      legal: 'Art. 221-1 C.P.',
      materiel:
        '**UN ACTE POSITIF DE VIOLENCE** / **SUR LA PERSONNE D\'AUTRUI** / **UN LIEN DE CAUSALITÉ ENTRE L\'ACTE ET LE DÉCÈS DE LA VICTIME**',
      moral: '**UNE INTENTION HOMICIDE**',
      priorite: 'core',
      noteExamen: 'Socle programme — citez la définition au mot près.',
    },
    {
      infraction:
        '**Le meurtre avec préméditation (qualification usuelle « assassinat », art. 221-3 C.P.)**',
      legal:
        'Art. 221-3 C.P. — qualification du meurtre aggravé par la préméditation (art. 132-72 C.P.), distinct du meurtre simple',
      materiel: '**MÊMES ÉLÉMENTS QUE LE MEURTRE** / **PRÉMÉDITATION**',
      moral: '**INTENTION HOMICIDE** / **PROJET RÉFLÉCHI — INTERVALLE ENTRE RÉSOLUTION ET EXÉCUTION**',
      priorite: 'core',
      noteExamen: 'Qualification aggravée du meurtre : citez la préméditation et le lien avec le meurtre simple.',
    },
    {
      infraction: '**L\'empoisonnement**',
      legal: 'Art. 221-5 C.P.',
      materiel:
        '**UN ACTE D\'EMPLOI OU D\'ADMINISTRATION** / **SUR LA PERSONNE D\'AUTRUI** / **SUBSTANCES DE NATURE À ENTRAÎNER LA MORT**',
      moral:
        '**CONNAISSANCE DE LA NATURE MORTELLE DE LA SUBSTANCE EMPLOYÉE** / **INTENTION DE DONNER LA MORT**',
      priorite: 'secours',
    },
    {
      infraction: '**L\'homicide involontaire**',
      legal: 'Art. 221-6 C.P.',
      materiel:
        '**UN ACTE INVOLONTAIRE : LA FAUTE** / **UN LIEN DE CAUSALITÉ** / **SUR LA PERSONNE D\'AUTRUI** / **UN DOMMAGE**',
      moral: '**ABSENCE D\'INTENTION DE DONNER LA MORT**',
    },
    {
      infraction: '**Les violences ayant entraîné la mort sans intention de la donner**',
      legal: 'Art. 222-7 C.P.',
      materiel:
        '**UN ACTE POSITIF** / **SUR LA PERSONNE D\'AUTRUI** / **UN RÉSULTAT DOMMAGEABLE : LE DÉCÈS** / **LIEN DE CAUSALITÉ**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI** / **ABSENCE D\'INTENTION DE DONNER LA MORT**',
      priorite: 'freq',
    },
    {
      infraction: '**Les violences ayant entraîné une mutilation ou infirmité permanente**',
      legal: 'Art. 222-9 C.P.',
      materiel:
        '**UN ACTE POSITIF** / **SUR LA PERSONNE D\'AUTRUI** / **UN RÉSULTAT DOMMAGEABLE : MUTILATION OU INFIRMITÉ PERMANENTE**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI**',
      priorite: 'freq',
    },
    {
      infraction: '**Les violences ayant entraîné une ITT supérieure à 8 jours**',
      legal: 'Art. 222-11 C.P.',
      materiel:
        '**UN ACTE POSITIF** / **SUR LA PERSONNE D\'AUTRUI** / **UN RÉSULTAT DOMMAGEABLE : ITT > 8 JOURS**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI**',
      priorite: 'core',
      noteExamen: 'Très fréquent — maîtrisez le seuil ITT et le quantum.',
    },
    {
      infraction: '**Les violences ayant entraîné une ITT ≤ 8 jours ou sans ITT**',
      legal: 'Art. 222-13 C.P. / Art. R.625-1 C.P.',
      materiel:
        '**UN ACTE POSITIF** / **SUR LA PERSONNE D\'AUTRUI** / **UN RÉSULTAT DOMMAGEABLE : ITT ≤ 8 JOURS OU SANS ITT**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI**',
      priorite: 'freq',
    },
    {
      infraction: '**Les violences habituelles sur conjoint ou concubin**',
      legal: 'Art. 222-14-3 C.P.',
      materiel:
        '**UN ACTE POSITIF** / **DES VIOLENCES HABITUELLES** / **UN LIEN PARTICULIER ENTRE LA VICTIME ET L\'AUTEUR** / **UN RÉSULTAT DOMMAGEABLE**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI**',
      priorite: 'freq',
      noteExamen: 'Rupture conventionnelle ou PACS : attention aux qualifications voisines.',
    },
    {
      infraction: '**L\'administration de substances nuisibles**',
      legal: 'Art. 222-15 C.P.',
      materiel: '**ADMINISTRATION DE SUBSTANCES** / **UNE ATTEINTE À LA PERSONNE**',
      moral:
        '**LA CONNAISSANCE DU CARACTÈRE NUISIBLE DE LA SUBSTANCE** / **L\'INTENTION DE NUIRE À LA SANTÉ PHYSIQUE OU PSYCHIQUE DE LA PERSONNE**',
      priorite: 'secours',
    },
    {
      infraction: '**Le viol**',
      legal: 'Art. 222-23 C.P. (définition) — Art. 222-23-1 C.P. (répression : 15 ans)',
      materiel:
        '**UN ACTE DE PÉNÉTRATION SEXUELLE OU UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **COMMIS SUR LA PERSONNE DE LA VICTIME OU SUR LA PERSONNE DE L\'AUTEUR** / **UNE VICTIME** / **UNE ABSENCE DE CONSENTEMENT**',
      moral:
        '**CONNAISSANCE DE L\'AUTEUR DE L\'ABSENCE DE CONSENTEMENT** / **VOLONTÉ DE L\'AUTEUR D\'IMPOSER UN ACTE DE NATURE SEXUELLE**',
      priorite: 'core',
      noteExamen: 'Définition intégrale + absent consentement ; articulation mineurs : 222-23-1, 227-25, 227-27.',
    },
    {
      infraction: '**L\'agression sexuelle (autre que le viol)**',
      legal: 'Art. 222-22 C.P. — Art. 222-27 C.P.',
      materiel:
        '**UN ACTE DE NATURE SEXUELLE AUTRE QU\'UNE PÉNÉTRATION OU QU\'UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **COMMIS SUR LA PERSONNE DE LA VICTIME OU SUR LA PERSONNE DE L\'AUTEUR** / **UNE VICTIME** / **UNE ABSENCE DE CONSENTEMENT**',
      moral:
        '**CONNAISSANCE DE L\'AUTEUR DE L\'ABSENCE DE CONSENTEMENT** / **VOLONTÉ DE L\'AUTEUR D\'IMPOSER UN ACTE IMMORAL OU OBSCÈNE**',
      priorite: 'core',
      noteExamen: 'Pas de pénétration : VCMS ; attention aux incriminations spécialisées mineurs / vulnérabilité.',
    },
    {
      infraction:
        '**Les agressions sexuelles imposées à un mineur de 15 ans par violence, contrainte, menace ou surprise**',
      legal: 'Art. 222-27 C.P.',
      materiel:
        '**UN ACTE DE NATURE SEXUELLE AUTRE QU\'UNE PÉNÉTRATION OU QU\'UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **UNE VICTIME MINEURE DE MOINS DE 15 ANS** / **L\'ABSENCE DE CONSENTEMENT**',
      moral:
        '**CONSCIENCE DE L\'AUTEUR DE COMMETTRE UN ACTE IMMORAL OU OBSCÈNE CONTRE LE GRÉ DE LA VICTIME** / **LA CONNAISSANCE DE L\'ÂGE INFÉRIEUR À QUINZE ANS DE LA VICTIME**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'exhibition sexuelle**',
      legal: 'Art. 222-32 C.P.',
      materiel: '**UN ACTE MATÉRIEL IMPUDIQUE** / **LA PUBLICITÉ DE L\'ACTE**',
      moral: '**CONSCIENCE DE L\'IMPUDICITÉ DE L\'ACTE**',
      priorite: 'freq',
    },
    {
      infraction: '**Le harcèlement sexuel**',
      legal: 'Art. 222-33 C.P.',
      materiel:
        '**HARCÈLEMENT SEXUEL EXIGEANT DES ACTES RÉPÉTÉS** / **OU HARCÈLEMENT SEXUEL RÉSULTANT DE LA COMMISSION D\'UN ACTE UNIQUE**',
      moral:
        '**CONSCIENCE DE L\'AUTEUR DE SE LIVRER À UN ACTE DE HARCÈLEMENT** / **VOLONTÉ POUR L\'AUTEUR D\'OBTENIR UN ACTE DE NATURE SEXUELLE**',
      priorite: 'freq',
    },
    {
      infraction: '**Les menaces de commettre un crime ou un délit contre les personnes — sans condition**',
      legal: 'Art. 222-17 al. 1 C.P.',
      materiel:
        '**MENACE D\'UN CRIME OU DÉLIT DONT LA TENTATIVE EST PUNISSABLE** / **DIRIGÉE CONTRE UNE PERSONNE** / **UN MOYEN DÉTERMINÉ**',
      moral: '**CONSCIENCE D\'EXERCER UNE PRESSION SUR LA VICTIME**',
      priorite: 'freq',
    },
    {
      infraction: '**Les menaces de mort — sans condition**',
      legal: 'Art. 222-17 al. 2 C.P.',
      materiel: '**MENACE DE MORT** / **MATÉRIALISÉE**',
      moral: '**CONSCIENCE D\'EXERCER UNE PRESSION SUR LA VICTIME**',
      priorite: 'freq',
    },
    {
      infraction: '**Les menaces de crime ou délit contre les personnes — avec condition**',
      legal: 'Art. 222-18 al. 1 C.P.',
      materiel:
        '**MENACE DE TOUT CRIME OU DÉLIT CONTRE LES PERSONNES** / **DIRIGÉE CONTRE UNE PERSONNE** / **UN MOYEN INDÉTERMINÉ** / **ORDRE DE REMPLIR UNE CONDITION**',
      moral:
        '**CONSCIENCE D\'EXERCER UNE PRESSION SUR LA VICTIME EN VUE DE LA CONTRAINDRE À FAIRE OU NE PAS FAIRE UN ACTE DÉTERMINÉ**',
      priorite: 'secours',
    },
    {
      infraction: '**Les menaces de mort — avec condition**',
      legal: 'Art. 222-18 al. 2 C.P.',
      materiel: '**MENACE DE MORT** / **ACCOMPAGNÉE D\'UNE CONDITION**',
      moral:
        '**CONSCIENCE D\'EXERCER UNE PRESSION SUR LA VICTIME EN VUE DE LA CONTRAINDRE À FAIRE OU NE PAS FAIRE UN ACTE DÉTERMINÉ**',
      priorite: 'secours',
    },
    {
      infraction: '**Les blessures involontaires — ITT > 3 mois**',
      legal: 'Art. 222-19 C.P.',
      materiel:
        '**UN ACTE INVOLONTAIRE : LA FAUTE** / **UN LIEN DE CAUSALITÉ** / **SUR LA PERSONNE D\'AUTRUI** / **UN DOMMAGE : ITT > 3 MOIS**',
      moral: '**ABSENCE D\'INTENTION DE PORTER ATTEINTE À L\'INTÉGRITÉ**',
      priorite: 'freq',
    },
    {
      infraction: '**Les blessures involontaires — ITT ≤ 3 mois (contraventions)**',
      legal: 'Art. R.625-2 C.P.',
      materiel:
        '**UN ACTE INVOLONTAIRE : LA FAUTE** / **UN LIEN DE CAUSALITÉ** / **SUR LA PERSONNE D\'AUTRUI** / **UN DOMMAGE : ITT ≤ 3 MOIS**',
      moral: '**ABSENCE D\'INTENTION DE PORTER ATTEINTE À L\'INTÉGRITÉ**',
      priorite: 'freq',
    },
    {
      infraction: '**Les atteintes involontaires par violation manifestement délibérée d\'une obligation de sécurité ou de prudence — ITT ≤ 3 mois**',
      legal: 'Art. 222-20 C.P.',
      materiel:
        '**EXISTENCE D\'UNE OBLIGATION PARTICULIÈRE DE PRUDENCE OU DE SÉCURITÉ** / **CONNAISSANCE DE CETTE OBLIGATION PAR LA PERSONNE** / **UNE VOLONTÉ DE NE PAS RESPECTER L\'OBLIGATION** / **UN DOMMAGE**',
      moral: '**VIOLATION MANIFESTEMENT DÉLIBÉRÉE**',
      priorite: 'freq',
      noteExamen: 'Distinguer la faute simple (R.625-2) de la violation manifestement délibérée (222-20) : le seuil ITT est identique mais la qualification monte en délit.',
    },
    {
      infraction: '**Les tortures et actes de barbarie**',
      legal: 'Art. 222-1 C.P.',
      materiel: '**DES ACTES DE TORTURE ET DE BARBARIE** / **SUR LA PERSONNE D\'AUTRUI**',
      moral:
        '**INTENTION COUPABLE** / **VOLONTÉ DE CAUSER UNE SOUFFRANCE**',
      priorite: 'core',
    },
    {
      infraction: '**Les violences habituelles sur mineur de 15 ans ou personne vulnérable**',
      legal: 'Art. 222-14 C.P.',
      materiel:
        '**UN ACTE POSITIF** / **DES VIOLENCES HABITUELLES** / **UNE VICTIME PARTICULIÈRE** / **UN RÉSULTAT DOMMAGEABLE**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI**',
      priorite: 'core',
    },
    {
      infraction:
        '**Les violences avec arme sur dépositaire d\'autorité publique, sapeur-pompier ou agent de transport public**',
      legal: 'Art. 222-14-4 C.P.',
      materiel:
        '**UNE COMMISSION EN BANDE ORGANISÉE OU AVEC GUET-APENS** / **DES VIOLENCES COMMISES AVEC USAGE OU MENACE D\'UNE ARME** / **UNE VICTIME PARTICULIÈRE** / **UN CONTEXTE** / **UN RÉSULTAT DOMMAGEABLE**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI** / **VOLONTÉ DE COMMETTRE DES VIOLENCES SUR UNE PERSONNE DONT LA QUALITÉ EST DÉTERMINÉE**',
      priorite: 'core',
    },
    {
      infraction: '**La participation à un groupement violent**',
      legal: 'Art. 222-14-2 C.P.',
      materiel:
        '**LE FAIT DE PARTICIPER À UN GROUPEMENT, MÊME FORMÉ DE FAÇON TEMPORAIRE** / **EN VUE DE LA PRÉPARATION CARACTÉRISÉE PAR UN OU PLUSIEURS FAITS MATÉRIELS** / **DE VIOLENCES VOLONTAIRES CONTRE LES PERSONNES OU DE DESTRUCTIONS OU DÉGRADATIONS DE BIENS**',
      moral:
        '**L\'AUTEUR PARTICIPE SCIEMMENT AU GROUPEMENT** / **L\'AUTEUR A CONNAISSANCE DES FAITS DE PRÉPARATION DE VIOLENCES OU DE DESTRUCTIONS**',
      priorite: 'freq',
    },
    {
      infraction:
        '**Les violences sur forces de sécurité intérieure ou élus locaux (ITT ≤ 8 j ou sans ITT)**',
      legal: 'Art. 222-14-5 C.P.',
      materiel:
        '**UN ACTE POSITIF** / **UNE VICTIME PARTICULIÈRE** / **UN CONTEXTE** / **UN RÉSULTAT DOMMAGEABLE**',
      moral:
        '**CONSCIENCE DE COMMETTRE UN ACTE QUI VA AFFECTER L\'INTÉGRITÉ PHYSIQUE ET/OU PSYCHIQUE D\'AUTRUI** / **VOLONTÉ DE COMMETTRE DES VIOLENCES SUR UNE PERSONNE DONT LA QUALITÉ EST DÉTERMINÉE**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'embuscade**',
      legal: 'Art. 222-15-1 C.P.',
      materiel: '**UNE INFRACTION PRÉPARÉE** / **UNE VICTIME PARTICULIÈRE**',
      moral: '**UNE MATÉRIALISATION DE LA VOLONTÉ D\'AGIR**',
      priorite: 'secours',
    },
    {
      infraction: '**Les appels et messages malveillants / agressions sonores (trouble de la tranquillité)**',
      legal: 'Art. 222-16 C.P.',
      materiel:
        '**DES APPELS TÉLÉPHONIQUES, DES ENVOIS DE MESSAGES ÉMIS PAR LA VOIE DES COMMUNICATIONS ÉLECTRONIQUES** / **UN CARACTÈRE MALVEILLANT** / **UNE RÉITÉRATION** / **AGRESSIONS SONORES**',
      moral:
        '**LA MALVEILLANCE** / **VOLONTÉ DE TROUBLER LA TRANQUILLITÉ D\'AUTRUI**',
    },
    {
      infraction: '**L\'homicide routier**',
      legal: 'Art. 221-18 C.P. (loi n° 2025-622 du 09/07/2025)',
      materiel:
        '**CONDUCTEUR DE VTM** / **FAUTE + AU MOINS UN COMPORTEMENT DANGEREUX PRÉVU PAR LA LOI (éthanol, stupéfiants, excès vitesse ≥30 km/h, défaut de permis, fuite, téléphone tenu, refus d\'obtempérer, écran, etc.)** / **MORT** / **CAUSALITÉ** / **PAS D\'INTENTION DE DONNER LA MORT**',
      moral: '**ABSENCE D\'INTENTION HOMICIDE** / **COMMISSION D\'UNE FAUTE QUALIFIÉE AVEC COMPORTEMENT DANGEREUX**',
      priorite: 'core',
    },
    {
      infraction: '**Les blessures routières — ITT > 3 mois**',
      legal: 'Art. 221-19 C.P. (loi n° 2025-622)',
      materiel:
        '**CONDUCTEUR VTM** / **ITT > 3 MOIS** / **MÊMES COMPORTEMENTS DANGEREUX QUE L\'HOMICIDE ROUTIER** / **CAUSALITÉ**',
      moral: '**ABSENCE D\'INTENTION DE BLESSER** / **FAUTE QUALIFIÉE + CIRCONSTANCE AGGRAVANTE ROUTIÈRE**',
      priorite: 'freq',
    },
    {
      infraction: '**Les blessures routières — ITT ≤ 3 mois**',
      legal: 'Art. 221-20 C.P. (loi n° 2025-622)',
      materiel:
        '**UN ACTE INVOLONTAIRE : LA FAUTE** / **UN LIEN DE CAUSALITÉ** / **SUR LA PERSONNE D\'AUTRUI** / **UN DOMMAGE** / **CONDUCTEUR DE VTM (ITT ≤ 3 MOIS)**',
      moral: '**ABSENCE D\'INTENTION DE PORTER ATTEINTE À L\'INTÉGRITÉ**',
    },
    {
      infraction:
        '**Les atteintes involontaires à l\'intégrité par conducteur de VTM — ITT ≤ 3 mois (sans violence routière)**',
      legal: 'Art. 222-19-1 C.P.',
      materiel:
        '**UN ACTE INVOLONTAIRE : LA FAUTE** / **UN LIEN DE CAUSALITÉ** / **SUR LA PERSONNE D\'AUTRUI** / **UN DOMMAGE**',
      moral: '**ABSENCE D\'INTENTION DE PORTER ATTEINTE À L\'INTÉGRITÉ**',
      priorite: 'freq',
    },
    {
      infraction: '**Le viol commis par un majeur sur un mineur de 15 ans**',
      legal: 'Art. 222-23-1 C.P.',
      materiel:
        '**UN ACTE DE PÉNÉTRATION SEXUELLE OU UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **COMMIS SUR LA PERSONNE DE LA VICTIME OU SUR LA PERSONNE DE L\'AUTEUR** / **UN AUTEUR MAJEUR** / **UNE VICTIME MINEURE DE MOINS DE 15 ANS** / **UNE DIFFÉRENCE D\'ÂGE D\'AU MOINS CINQ ANS, SAUF CONTREPARTIE**',
      moral:
        '**CONNAISSANCE DE L\'ÂGE INFÉRIEUR À QUINZE ANS DE LA VICTIME** / **VOLONTÉ DE L\'AUTEUR D\'IMPOSER UN ACTE DE NATURE SEXUELLE**',
    },
    {
      infraction: '**Le viol incestueux**',
      legal: 'Art. 222-23-2 C.P.',
      materiel:
        '**UN ACTE DE PÉNÉTRATION SEXUELLE OU UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **COMMIS SUR LA PERSONNE DE LA VICTIME OU SUR LA PERSONNE DE L\'AUTEUR** / **UN AUTEUR MAJEUR** / **UNE VICTIME MINEURE** / **UN LIEN DE PARENTÉ DIRECT OU INDIRECT** / **UNE AUTORITÉ DE DROIT OU DE FAIT SUR LA VICTIME**',
      moral:
        '**CONNAISSANCE DU LIEN DE PARENTÉ ET DE LA MINORITÉ DE LA VICTIME** / **VOLONTÉ DE L\'AUTEUR D\'IMPOSER UN ACTE DE NATURE SEXUELLE**',
      priorite: 'core',
    },
    {
      infraction: '**Les agressions sexuelles sur personne vulnérable**',
      legal: 'Art. 222-29 C.P.',
      materiel:
        '**UN ACTE DE NATURE SEXUELLE AUTRE QU\'UNE PÉNÉTRATION OU QU\'UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **UNE VICTIME PARTICULIÈRE** / **L\'ABSENCE DE CONSENTEMENT**',
      moral:
        '**CONNAISSANCE DE L\'AUTEUR DE L\'ABSENCE DE CONSENTEMENT** / **VOLONTÉ DE L\'AUTEUR DE COMMETTRE UN ACTE IMMORAL OU OBSCÈNE**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'agression sexuelle commise par un majeur sur un mineur de 15 ans**',
      legal: 'Art. 222-29-2 C.P.',
      materiel:
        '**UN ACTE DE NATURE SEXUELLE AUTRE QU\'UNE PÉNÉTRATION OU QU\'UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **COMMIS SUR LA PERSONNE DE LA VICTIME OU SUR LA PERSONNE DE L\'AUTEUR** / **UN AUTEUR MAJEUR** / **UNE VICTIME MINEURE DE MOINS DE 15 ANS** / **UNE DIFFÉRENCE D\'ÂGE D\'AU MOINS CINQ ANS, SAUF CONTREPARTIE**',
      moral:
        '**CONNAISSANCE DE L\'ÂGE INFÉRIEUR À QUINZE ANS DE LA VICTIME** / **VOLONTÉ DE L\'AUTEUR D\'IMPOSER UN ACTE IMMORAL OU OBSCÈNE**',
    },
    {
      infraction: '**L\'agression sexuelle incestueuse**',
      legal: 'Art. 222-29-3 C.P.',
      materiel:
        '**UN ACTE DE NATURE SEXUELLE AUTRE QU\'UNE PÉNÉTRATION OU QU\'UN ACTE BUCCO-GÉNITAL OU BUCCO-ANAL** / **COMMIS SUR LA PERSONNE DE LA VICTIME OU SUR LA PERSONNE DE L\'AUTEUR** / **UN AUTEUR MAJEUR** / **UNE VICTIME MINEURE** / **UN LIEN DE PARENTÉ DIRECT OU INDIRECT** / **UNE AUTORITÉ DE DROIT OU DE FAIT SUR LA VICTIME**',
      moral:
        '**CONNAISSANCE DU LIEN DE PARENTÉ ET DE LA MINORITÉ DE LA VICTIME** / **VOLONTÉ DE L\'AUTEUR D\'IMPOSER UN ACTE IMMORAL OU OBSCÈNE**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'administration de substance pour viol ou agression sexuelle**',
      legal: 'Art. 222-30-1 C.P.',
      materiel:
        '**ADMINISTRATION D\'UNE SUBSTANCE** / **À L\'INSU DE LA VICTIME** / **DE NATURE À ALTÉRER SON DISCERNEMENT OU LE CONTRÔLE DE SES ACTES** / **DANS LE BUT DE COMMETTRE UN VIOL OU UNE AGRESSION SEXUELLE**',
      moral:
        '**CONNAISSANCE DU CARACTÈRE SÉDATIF/AMNÉSIANT DE LA SUBSTANCE** / **VOLONTÉ DE PROFITER DE LA SOUMISSION CHIMIQUE DE LA VICTIME POUR COMMETTRE UN VIOL OU UNE AGRESSION SEXUELLE**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'enregistrement d\'images de violences (happy slapping)**',
      legal: 'Art. 222-33-3 C.P.',
      materiel: '**ENREGISTREMENT D\'IMAGES DE VIOLENCE** / **FAITS JUSTIFICATIFS**',
      moral:
        '**ENREGISTREMENT RÉALISÉ SCIEMMENT** / **CONSCIENCE QUE LES IMAGES SONT RELATIVES À DES INFRACTIONS DE VIOLENCE**',
    },
    {
      infraction: '**La diffusion d\'images de violences**',
      legal: 'Art. 222-33-3 al. 2 C.P.',
      materiel: '**DIFFUSION D\'IMAGES DE VIOLENCE** / **FAITS JUSTIFICATIFS**',
      moral:
        '**CONNAISSANCE DU CONTENU DES IMAGES ENREGISTRÉES** / **VOLONTÉ DE DIFFUSER CES IMAGES**',
      priorite: 'secours',
    },
  ],
};
