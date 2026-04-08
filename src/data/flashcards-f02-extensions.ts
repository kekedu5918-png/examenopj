import type { Flashcard } from '@/data/flashcards-types';

const C = 'Atteintes aux biens';

/** F02 — Groupes 2 à 6 (Partie 2). Deux cartes par infraction : légal / matériel+moral. */
export const flashcardsF02Extensions: Flashcard[] = [
  // ── Groupe 2 : Infractions voisines du vol ──
  {
    id: 'fc-f02-extorsion-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: "L'extorsion",
    definitionCourte:
      "**L'extorsion est le fait d'obtenir par violence, menace de violences ou contrainte soit une signature, un engagement ou une renonciation, soit la révélation d'un secret, soit la remise de fonds, de valeurs ou d'un bien quelconque.**",
    materiel: [],
    moral: '',
    legal: "*L'article 312-1 du C.P.* définit et réprime l'extorsion.",
    versoFooter: "*L'article 312-1 du C.P.* définit et réprime l'extorsion.",
  },
  {
    id: 'fc-f02-extorsion-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: "L'extorsion",
    definitionCourte:
      "**L'extorsion est le fait d'obtenir par violence, menace de violences ou contrainte soit une signature, un engagement ou une renonciation, soit la révélation d'un secret, soit la remise de fonds, de valeurs ou d'un bien quelconque.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **DES MOYENS MIS EN ŒUVRE**
- *Des violences*
- *Des menaces de violences*
- *Une contrainte morale*

➤ **UNE REMISE PAR LA VICTIME**
- *Une remise involontaire mais consciente*
- *Une victime personne physique*
- *Une victime personne morale*

➤ **L'OBJET DE LA REMISE**
- *Une signature*
- *Un engagement ou une renonciation*
- *La révélation d'un secret*
- *La remise de fonds, de valeurs ou d'un bien quelconque*

**ÉLÉMENT MORAL :**

**VOLONTÉ DE L'AUTEUR D'OBTENIR CE QUI NE PEUT ÊTRE LIBREMENT CONSENTI EN USANT DE PROCÉDÉS CONTRAIGNANTS**`,
    versoFooter: "*L'article 312-1 du C.P.* définit et réprime l'extorsion.",
  },
  {
    id: 'fc-f02-chantage-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: 'Le chantage',
    definitionCourte:
      "**Le chantage est le fait d'obtenir, en menaçant de révéler ou d'imputer des faits de nature à porter atteinte à l'honneur ou à la considération, soit une signature, un engagement ou une renonciation, soit la révélation d'un secret, soit la remise de fonds, de valeurs ou d'un bien quelconque.**",
    materiel: [],
    moral: '',
    legal: "*L'article 312-10 du C.P.* définit et réprime le chantage.",
    versoFooter: "*L'article 312-10 du C.P.* définit et réprime le chantage.",
  },
  {
    id: 'fc-f02-chantage-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: 'Le chantage',
    definitionCourte:
      "**Le chantage est le fait d'obtenir, en menaçant de révéler ou d'imputer des faits de nature à porter atteinte à l'honneur ou à la considération, soit une signature, un engagement ou une renonciation, soit la révélation d'un secret, soit la remise de fonds, de valeurs ou d'un bien quelconque.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **MENACE DE RÉVÉLATIONS OU D'IMPUTATIONS DIFFAMATOIRES**
- *Caractère diffamatoire de la menace*
- *Une menace visant une personne physique ou morale*
- *Une menace visant un fait déterminé vrai ou faux*

➤ **L'EXPRESSION DE LA MENACE**
- *Menace écrite ou verbale*
- *Sens et portée de la menace*
- *Inapplicabilité des lois sur la presse*

➤ **L'OBJET DE LA MENACE**
- *Une signature*
- *Un engagement ou une renonciation*
- *La révélation d'un secret*
- *La remise de fonds, de valeurs ou d'un bien quelconque*

**ÉLÉMENT MORAL :**

**VOLONTÉ DE L'AUTEUR DE CONTRAINDRE AUTRUI POUR OBTENIR CE QUI N'AURAIT PU ÊTRE OBTENU PAR UN ACCORD LIBREMENT CONSENTI**`,
    versoFooter: "*L'article 312-10 du C.P.* définit et réprime le chantage.",
  },
  {
    id: 'fc-f02-demande-fonds-contrainte-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: 'La demande de fonds sous contrainte',
    definitionCourte:
      "**La demande de fonds sous contrainte est le fait, en réunion et de manière agressive, ou sous la menace d'un animal dangereux, de solliciter, sur la voie publique, la remise de fonds, de valeurs ou d'un bien.**",
    materiel: [],
    moral: '',
    legal: "*L'article 312-12-1 du C.P.* définit et réprime la demande de fonds sous contrainte.",
    versoFooter: "*L'article 312-12-1 du C.P.* définit et réprime la demande de fonds sous contrainte.",
  },
  {
    id: 'fc-f02-demande-fonds-contrainte-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: 'La demande de fonds sous contrainte',
    definitionCourte:
      "**La demande de fonds sous contrainte est le fait, en réunion et de manière agressive, ou sous la menace d'un animal dangereux, de solliciter, sur la voie publique, la remise de fonds, de valeurs ou d'un bien.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UN COMPORTEMENT**
*L'article 312-12-1 du C.P.* prévoit deux situations :
- *En réunion et de manière agressive*
- *Sous la menace d'un animal dangereux*

➤ **UNE SOLLICITATION**
- *Sur la voie publique*
- *Une remise de fonds, valeurs ou d'un bien*

**ÉLÉMENT MORAL :**

**CONSCIENCE DE L'AUTEUR D'AVOIR UN COMPORTEMENT MENAÇANT POUR OBTENIR LA REMISE DE FONDS, DE VALEURS OU D'UN BIEN**`,
    versoFooter: "*L'article 312-12-1 du C.P.* définit et réprime la demande de fonds sous contrainte.",
  },
  {
    id: 'fc-f02-escroquerie-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: "L'escroquerie",
    definitionCourte:
      "**L'escroquerie est le fait, soit par l'usage d'un faux nom ou d'une fausse qualité, soit par l'abus d'une qualité vraie, soit par l'emploi de manœuvres frauduleuses, de tromper une personne physique ou morale et de la déterminer ainsi, à son préjudice ou au préjudice d'un tiers, à remettre des fonds, des valeurs ou un bien quelconque, à fournir un service ou à consentir un acte opérant obligation ou décharge.**",
    materiel: [],
    moral: '',
    legal: "*L'article 313-1 du C.P.* définit et réprime l'escroquerie.",
    versoFooter: "*L'article 313-1 du C.P.* définit et réprime l'escroquerie.",
  },
  {
    id: 'fc-f02-escroquerie-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: "L'escroquerie",
    definitionCourte:
      "**L'escroquerie est le fait, soit par l'usage d'un faux nom ou d'une fausse qualité, soit par l'abus d'une qualité vraie, soit par l'emploi de manœuvres frauduleuses, de tromper une personne physique ou morale et de la déterminer ainsi, à son préjudice ou au préjudice d'un tiers, à remettre des fonds, des valeurs ou un bien quelconque, à fournir un service ou à consentir un acte opérant obligation ou décharge.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UN MOYEN DE TROMPERIE**
- *L'usage d'un faux nom*
- *L'usage d'une fausse qualité*
- *L'abus d'une qualité vraie*
- *L'emploi de manœuvres frauduleuses*
  - *La production d'un document écrit*
  - *Une mise en scène*
  - *L'intervention d'un tiers*

➤ **UNE REMISE**
- *Une remise de fonds, valeurs ou d'un bien quelconque*
- *La fourniture d'un service*
- *Le consentement à un acte opérant obligation ou décharge*

➤ **AU PRÉJUDICE D'UNE VICTIME**
- *Un préjudice*
- *Une victime personne physique ou morale*

**ÉLÉMENT MORAL :**

**CONSCIENCE DE L'AUTEUR D'UTILISER DES MOYENS FRAUDULEUX EN VUE D'OBTENIR UNE REMISE DE LA VICTIME**`,
    versoFooter: "*L'article 313-1 du C.P.* définit et réprime l'escroquerie.",
  },
  {
    id: 'fc-f02-filouteries-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: 'Les filouteries',
    definitionCourte: `**La filouterie est le fait par une personne qui sait être dans l'impossibilité absolue de payer ou qui est déterminée à ne pas payer :**
1° De se faire servir des boissons ou des aliments dans un établissement vendant des boissons ou des aliments ;
2° De se faire attribuer et d'occuper effectivement une ou plusieurs chambres dans un établissement louant des chambres, lorsque l'occupation n'a pas excédé dix jours ;
3° De se faire servir des carburants ou lubrifiants dont elle fait remplir tout ou partie des réservoirs d'un véhicule par des professionnels de la distribution ;
4° De se faire transporter en taxi ou en voiture de place.`,
    materiel: [],
    moral: '',
    legal: "*L'article 313-5 du C.P.* définit et réprime la filouterie.",
    versoFooter: "*L'article 313-5 du C.P.* définit et réprime la filouterie.",
  },
  {
    id: 'fc-f02-filouteries-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: 'Les filouteries',
    definitionCourte: `**La filouterie est le fait par une personne qui sait être dans l'impossibilité absolue de payer ou qui est déterminée à ne pas payer :**
1° De se faire servir des boissons ou des aliments dans un établissement vendant des boissons ou des aliments ;
2° De se faire attribuer et d'occuper effectivement une ou plusieurs chambres dans un établissement louant des chambres, lorsque l'occupation n'a pas excédé dix jours ;
3° De se faire servir des carburants ou lubrifiants dont elle fait remplir tout ou partie des réservoirs d'un véhicule par des professionnels de la distribution ;
4° De se faire transporter en taxi ou en voiture de place.`,
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **IMPOSSIBILITÉ ABSOLUE DE PAYER OU REFUS DE PAYER**
- *L'impossibilité absolue de payer*
- *La détermination à ne pas payer*

➤ **UNE REMISE**
*L'article 313-5 du C.P.* ne vise que 4 cas de filouterie :
- *Se faire servir des boissons ou des aliments dans un établissement vendant des boissons ou des aliments*
- *Se faire attribuer et occuper effectivement une ou plusieurs chambres dans un établissement louant des chambres*
- *Se faire servir des carburants ou lubrifiants*
- *Se faire transporter en taxi ou voiture de place*

**ÉLÉMENT MORAL :**

*L'article 313-5 du C.P.* énumère deux possibilités :

**CONSCIENCE DE L'AUTEUR DE SON IMPÉCUNIOSITÉ**

**VOLONTÉ DE L'AUTEUR DE NE PAS PAYER**`,
    versoFooter: "*L'article 313-5 du C.P.* définit et réprime la filouterie.",
  },
  {
    id: 'fc-f02-abus-confiance-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: "L'abus de confiance",
    definitionCourte:
      "**L'abus de confiance est le fait par une personne de détourner, au préjudice d'autrui, des fonds, des valeurs ou un bien quelconque qui lui ont été remis et qu'elle a acceptés à charge de les rendre, de les représenter ou d'en faire un usage déterminé.**",
    materiel: [],
    moral: '',
    legal: "*L'article 314-1 du C.P.* définit et réprime l'abus de confiance.",
    versoFooter: "*L'article 314-1 du C.P.* définit et réprime l'abus de confiance.",
  },
  {
    id: 'fc-f02-abus-confiance-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Infractions voisines du vol',
    nom: "L'abus de confiance",
    definitionCourte:
      "**L'abus de confiance est le fait par une personne de détourner, au préjudice d'autrui, des fonds, des valeurs ou un bien quelconque qui lui ont été remis et qu'elle a acceptés à charge de les rendre, de les représenter ou d'en faire un usage déterminé.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE REMISE PRÉALABLE DE LA CHOSE**
- *Cadre juridique de la remise* :
  - *Soit un cadre contractuel*
  - *Soit des dispositions légales ou réglementaires*
  - *Soit une décision de justice*
  - *Soit une simple situation de fait*
- *Contenu de la remise* :
  - *soit de fonds*
  - *soit de valeurs*
  - *soit d'un bien quelconque*
- *Affectation de la remise*

➤ **UN ACTE MATÉRIEL DE DÉTOURNEMENT**
- *L'usage abusif*
- *Le retard de restitution*
- *Le refus de restituer*
- *L'impossibilité de restituer*

➤ **AU PRÉJUDICE D'AUTRUI**

**ÉLÉMENT MORAL :**

**CONSCIENCE DE LA PRÉCARITÉ DE LA DÉTENTION ET DE L'OBLIGATION COMBINÉE DE RESTITUTION**`,
    versoFooter: "*L'article 314-1 du C.P.* définit et réprime l'abus de confiance.",
  },
  // ── Groupe 3 : Recel et non-justification de ressources ──
  {
    id: 'fc-f02-recel-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Recel et non-justification de ressources',
    nom: 'Le recel',
    definitionCourte:
      "**Le recel est le fait de dissimuler, de détenir ou de transmettre une chose, ou de faire office d'intermédiaire afin de la transmettre, en sachant que cette chose provient d'un crime ou d'un délit.**\nConstitue également un recel le fait, en connaissance de cause, de bénéficier, par tout moyen, du produit d'un crime ou d'un délit.",
    materiel: [],
    moral: '',
    legal: "*L'article 321-1 du C.P.* définit et réprime le recel.",
    versoFooter: "*L'article 321-1 du C.P.* définit et réprime le recel.",
  },
  {
    id: 'fc-f02-recel-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Recel et non-justification de ressources',
    nom: 'Le recel',
    definitionCourte:
      "**Le recel est le fait de dissimuler, de détenir ou de transmettre une chose, ou de faire office d'intermédiaire afin de la transmettre, en sachant que cette chose provient d'un crime ou d'un délit.**\nConstitue également un recel le fait, en connaissance de cause, de bénéficier, par tout moyen, du produit d'un crime ou d'un délit.",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UN ACTE MATÉRIEL**
- *Dissimuler, détenir, transmettre ou faire office d'intermédiaire pour transmettre*
- *Bénéficier par tout moyen du produit d'un crime ou d'un délit*

➤ **L'OBJET DE L'ACTE**
- *La nature de la chose*
- *Une chose provenant d'un crime ou d'un délit*
- *Une infraction d'origine commise par un tiers*

**ÉLÉMENT MORAL :**

**CONNAISSANCE DE L'ORIGINE FRAUDULEUSE DE LA CHOSE**`,
    versoFooter: "*L'article 321-1 du C.P.* définit et réprime le recel.",
  },
  {
    id: 'fc-f02-non-justif-ressources-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Recel et non-justification de ressources',
    nom: 'La non-justification de ressources',
    definitionCourte:
      "**Le fait de ne pas pouvoir justifier de ressources correspondant à son train de vie ou de ne pas pouvoir justifier de l'origine d'un bien détenu, tout en étant en relations habituelles avec une ou plusieurs personnes qui soit se livrent à la commission de crimes ou délits punis d'au moins cinq ans d'emprisonnement et procurant à celles-ci un profit direct ou indirect, soit sont les victimes d'une des infractions.**",
    materiel: [],
    moral: '',
    legal: "*L'article 321-6 alinéa 1 du C.P.* définit et réprime la non-justification de ressources.",
    versoFooter: "*L'article 321-6 alinéa 1 du C.P.* définit et réprime la non-justification de ressources.",
  },
  {
    id: 'fc-f02-non-justif-ressources-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Recel et non-justification de ressources',
    nom: 'La non-justification de ressources',
    definitionCourte:
      "**Le fait de ne pas pouvoir justifier de ressources correspondant à son train de vie ou de ne pas pouvoir justifier de l'origine d'un bien détenu, tout en étant en relations habituelles avec une ou plusieurs personnes qui soit se livrent à la commission de crimes ou délits punis d'au moins cinq ans d'emprisonnement et procurant à celles-ci un profit direct ou indirect, soit sont les victimes d'une des infractions.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **ABSENCE DE JUSTIFICATION DE RESSOURCES OU DE L'ORIGINE DES BIENS POSSÉDÉS**
- *Les ressources personnelles ne correspondent pas au train de vie de la personne*
- *L'origine indéterminée d'un bien détenu*

➤ **RELATIONS HABITUELLES DU MIS EN CAUSE**
- *Avec un ou plusieurs auteurs d'infraction*
- *Avec la victime d'une de ces infractions*

**ÉLÉMENT MORAL :**

**CONSCIENCE DE BÉNÉFICIER DU PRODUIT DE LA COMMISSION D'INFRACTIONS COMMISES PAR UNE PERSONNE AVEC LAQUELLE IL ENTRETIENT DES RELATIONS HABITUELLES**

**CONSCIENCE DE PROFITER DES RESSOURCES DE LA VICTIME DE CES INFRACTIONS**`,
    versoFooter: "*L'article 321-6 alinéa 1 du C.P.* définit et réprime la non-justification de ressources.",
  },
  // ── Groupe 4 : Destructions, dégradations et détériorations ──
  {
    id: 'fc-f02-destruc-dom-important-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destruction, dégradation et détérioration ne présentant pas un danger pour les personnes et entraînant un dommage important',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration d'un bien appartenant à autrui constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 322-1 I du C.P.* définit et réprime les destructions, dégradations ou détériorations ne présentant pas un danger pour les personnes et entraînant un dommage important.",
    versoFooter:
      "*L'article 322-1 I du C.P.* définit et réprime les destructions, dégradations ou détériorations ne présentant pas un danger pour les personnes et entraînant un dommage important.",
  },
  {
    id: 'fc-f02-destruc-dom-important-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destruction, dégradation et détérioration ne présentant pas un danger pour les personnes et entraînant un dommage important',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration d'un bien appartenant à autrui constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE ATTEINTE MATÉRIELLE**

➤ **SUR UN BIEN APPARTENANT A AUTRUI**
- *Les biens de nature immobilière*
- *Les biens de nature mobilière*
- *L'appartenance du bien*

➤ **ENTRAÎNANT UN DOMMAGE IMPORTANT**
- *La destruction*
- *La dégradation*
- *La détérioration*

**ÉLÉMENT MORAL :**

**AGIR SCIEMMENT ET VOLONTAIREMENT SACHANT NE PAS ÊTRE PROPRIÉTAIRE DU BIEN ET N'AVOIR AUCUN DROIT DE DISPOSITION (CASS. CRIM., 18 SEPTEMBRE 1991)**`,
    versoFooter:
      "*L'article 322-1 I du C.P.* définit et réprime les destructions, dégradations ou détériorations ne présentant pas un danger pour les personnes et entraînant un dommage important.",
  },
  {
    id: 'fc-f02-destruc-dom-leger-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations ne présentant pas un danger pour les personnes et entraînant un dommage léger',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration volontaires d'un bien appartenant à autrui dont il n'est résulté qu'un dommage léger, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article R. 635-1 du C.P.* définit et réprime les destructions, dégradations ou détériorations ne présentant pas un danger pour les personnes et entraînant un dommage léger.",
    versoFooter:
      "*L'article R. 635-1 du C.P.* définit et réprime les destructions, dégradations ou détériorations ne présentant pas un danger pour les personnes et entraînant un dommage léger.",
  },
  {
    id: 'fc-f02-destruc-dom-leger-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations ne présentant pas un danger pour les personnes et entraînant un dommage léger',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration volontaires d'un bien appartenant à autrui dont il n'est résulté qu'un dommage léger, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE ATTEINTE MATÉRIELLE**

➤ **SUR UN BIEN APPARTENANT À AUTRUI**
- *Les biens de nature immobilière*
- *Les biens de nature mobilière*
- *L'appartenance du bien*

➤ **ENTRAÎNANT UN DOMMAGE LÉGER**
- *La destruction, la dégradation et la détérioration*

**ÉLÉMENT MORAL :**

Par dérogation à la règle applicable aux contraventions punissables, dès lors qu'a été accompli le fait matériel, *l'article R. 635-1 du C.P.* requiert l'intention coupable. Le texte dit que le dommage est « volontaire ».`,
    versoFooter:
      "*L'article R. 635-1 du C.P.* définit et réprime les destructions, dégradations ou détériorations ne présentant pas un danger pour les personnes et entraînant un dommage léger.",
  },
  {
    id: 'fc-f02-tags-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations par inscriptions, signes et dessins communément appelés « tags »',
    definitionCourte:
      "**Le fait de tracer des inscriptions, des signes ou des dessins, sans autorisation préalable, sur les façades, les véhicules, les voies publiques ou le mobilier urbain lorsqu'il n'en est résulté qu'un dommage léger, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: "*L'article 322-1 II du C.P.* définit et réprime les « tags ».",
    versoFooter: "*L'article 322-1 II du C.P.* définit et réprime les « tags ».",
  },
  {
    id: 'fc-f02-tags-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations par inscriptions, signes et dessins communément appelés « tags »',
    definitionCourte:
      "**Le fait de tracer des inscriptions, des signes ou des dessins, sans autorisation préalable, sur les façades, les véhicules, les voies publiques ou le mobilier urbain lorsqu'il n'en est résulté qu'un dommage léger, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE ATTEINTE MATÉRIELLE PAR TRAÇAGE**
- *Des inscriptions*
- *Des signes*
- *Des dessins*

➤ **SUR UN BIEN APPARTENANT À AUTRUI**
- *Des façades*
- *Des véhicules*
- *Des voies publiques*
- *Du mobilier urbain*

➤ **ENTRAÎNANT UN DOMMAGE LÉGER**
- *La destruction, la dégradation et la détérioration*

**ÉLÉMENT MORAL :**

**AGIR SCIEMMENT ET VOLONTAIREMENT SACHANT NE PAS ÊTRE PROPRIÉTAIRE DU BIEN ET N'AVOIR AUCUN DROIT DE DISPOSITION (CASS. CRIM., 18 SEPTEMBRE 1991)**`,
    versoFooter: "*L'article 322-1 II du C.P.* définit et réprime les « tags ».",
  },
  {
    id: 'fc-f02-biens-culturels-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations portant sur des biens culturels publics ou classés',
    definitionCourte: `**Constitue une infraction la destruction, la dégradation ou la détérioration lorsqu'elle porte sur :**
1° Un immeuble ou objet mobilier classé ou inscrit en application des dispositions du code du patrimoine ou un document d'archives privées classé en application des dispositions du même code ;
2° Le patrimoine archéologique au sens de l'article L. 510-1 du code du patrimoine ;
3° Un bien culturel qui relève du domaine public mobilier ou qui est exposé, conservé ou déposé, même de façon temporaire, soit dans un musée de France, une bibliothèque, une médiathèque ou un service d'archives, soit dans un lieu dépendant d'une personne publique ou d'une personne privée assurant une mission d'intérêt général, soit dans un édifice affecté au culte ;
4° Un édifice affecté au culte.`,
    materiel: [],
    moral: '',
    legal:
      "*L'article 322-3-1 du C.P.* définit et réprime les destructions, dégradations ou détériorations portant sur des biens culturels publics ou classés.",
    versoFooter:
      "*L'article 322-3-1 du C.P.* définit et réprime les destructions, dégradations ou détériorations portant sur des biens culturels publics ou classés.",
  },
  {
    id: 'fc-f02-biens-culturels-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations portant sur des biens culturels publics ou classés',
    definitionCourte: `**Constitue une infraction la destruction, la dégradation ou la détérioration lorsqu'elle porte sur :**
1° Un immeuble ou objet mobilier classé ou inscrit en application des dispositions du code du patrimoine ou un document d'archives privées classé en application des dispositions du même code ;
2° Le patrimoine archéologique au sens de l'article L. 510-1 du code du patrimoine ;
3° Un bien culturel qui relève du domaine public mobilier ou qui est exposé, conservé ou déposé, même de façon temporaire, soit dans un musée de France, une bibliothèque, une médiathèque ou un service d'archives, soit dans un lieu dépendant d'une personne publique ou d'une personne privée assurant une mission d'intérêt général, soit dans un édifice affecté au culte ;
4° Un édifice affecté au culte.`,
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE ATTEINTE MATÉRIELLE**

➤ **SUR UN BIEN CULTUREL PUBLIC OU CLASSÉ**
- Un immeuble ou objet mobilier classé ou inscrit en application des dispositions du code du patrimoine ou un document d'archives privées classé en application des dispositions du même code ;
- Le patrimoine archéologique, au sens de *l'article L.510-1 du code du patrimoine* ;
- Un bien culturel qui relève du domaine public mobilier ou qui est exposé, conservé ou déposé, même de façon temporaire, soit dans un musée de France, une bibliothèque, une médiathèque ou un service d'archives, soit dans un lieu dépendant d'une personne publique ou d'une personne privée assurant une mission d'intérêt général, soit dans un édifice affecté au culte ;
- Un édifice affecté au culte.

➤ **ENTRAÎNANT UN DOMMAGE**

**ÉLÉMENT MORAL :**

**VOLONTÉ D'OCCASIONNER UN DOMMAGE SUR UN BIEN EN SACHANT QU'IL PRÉSENTE UN INTÉRÊT POUR LA COLLECTIVITÉ**`,
    versoFooter:
      "*L'article 322-3-1 du C.P.* définit et réprime les destructions, dégradations ou détériorations portant sur des biens culturels publics ou classés.",
  },
  {
    id: 'fc-f02-destruc-dang-intent-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations dangereuses pour les personnes (infraction intentionnelle)',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration d'un bien appartenant à autrui par l'effet d'une substance explosive, d'un incendie ou de tout autre moyen de nature à créer un danger pour les personnes, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 322-6 al. 1 du C.P.* définit et réprime les destructions, dégradations ou détériorations volontaires et dangereuses pour les personnes.",
    versoFooter:
      "*L'article 322-6 al. 1 du C.P.* définit et réprime les destructions, dégradations ou détériorations volontaires et dangereuses pour les personnes.",
  },
  {
    id: 'fc-f02-destruc-dang-intent-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations dangereuses pour les personnes (infraction intentionnelle)',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration d'un bien appartenant à autrui par l'effet d'une substance explosive, d'un incendie ou de tout autre moyen de nature à créer un danger pour les personnes, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE ATTEINTE MATÉRIELLE DE NATURE A CRÉER UN DANGER POUR LES PERSONNES**
- *L'effet d'une substance explosive*
- *L'incendie*
- *Les moyens créant un danger pour les personnes*

➤ **SUR UN BIEN APPARTENANT À AUTRUI**
- *Les biens*
- *L'appartenance du bien*

➤ **ENTRAÎNANT UN DOMMAGE**
- *La destruction*
- *La dégradation*
- *La détérioration*

**ÉLÉMENT MORAL :**

**AGIR EN CONNAISSANT L'EFFICACITÉ DU MOYEN MIS EN ŒUVRE, AINSI QUE LE DANGER REPRÉSENTE PAR CE MOYEN POUR LA SÉCURITÉ DES PERSONNES**`,
    versoFooter:
      "*L'article 322-6 al. 1 du C.P.* définit et réprime les destructions, dégradations ou détériorations volontaires et dangereuses pour les personnes.",
  },
  {
    id: 'fc-f02-destruc-dang-non-intent-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations dangereuses pour les personnes (infraction non intentionnelle)',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration involontaire d'un bien appartenant à autrui par l'effet d'une explosion ou d'un incendie provoqués par manquement à une obligation de prudence ou de sécurité imposée par la loi ou le règlement, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 322-5 al. 1 du C.P.* définit et réprime les destructions, dégradations ou détériorations involontaires et dangereuses pour les personnes.",
    versoFooter:
      "*L'article 322-5 al. 1 du C.P.* définit et réprime les destructions, dégradations ou détériorations involontaires et dangereuses pour les personnes.",
  },
  {
    id: 'fc-f02-destruc-dang-non-intent-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Destructions, dégradations et détériorations dangereuses pour les personnes (infraction non intentionnelle)',
    definitionCourte:
      "**La destruction, la dégradation ou la détérioration involontaire d'un bien appartenant à autrui par l'effet d'une explosion ou d'un incendie provoqués par manquement à une obligation de prudence ou de sécurité imposée par la loi ou le règlement, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UN MANQUEMENT A UNE OBLIGATION DE PRUDENCE OU DE SÉCURITÉ IMPOSÉE PAR LA LOI OU LE RÈGLEMENT**

➤ **UNE ATTEINTE MATÉRIELLE**
- *L'effet d'une explosion*
- *L'incendie*

➤ **SUR UN BIEN APPARTENANT A AUTRUI**

➤ **ENTRAÎNANT UN DOMMAGE**
- *La destruction*
- *La dégradation*
- *La détérioration*

➤ **UN LIEN DE CAUSALITÉ**
- *La causalité indirecte*
- *La causalité directe*

**ÉLÉMENT MORAL :**

Pour *l'article 322-5 al. 1 du C.P.* :

**AGIR EN MÉCONNAISSANT LES EXIGENCES LÉGALES OU RÉGLEMENTAIRES QUI AURAIENT DU ÊTRE RESPECTÉES**

Pour *l'article 322-5 al. 2 du C.P.* :

**AGIR EN MÉCONNAISSANT VOLONTAIREMENT LES EXIGENCES LÉGALES OU RÉGLEMENTAIRES EN TOUTE CONNAISSANCE DES RISQUES ENCOURUS**`,
    versoFooter:
      "*L'article 322-5 al. 1 du C.P.* définit et réprime les destructions, dégradations ou détériorations involontaires et dangereuses pour les personnes.",
  },
  {
    id: 'fc-f02-diffusion-procedes-engins-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: "La diffusion de procédés permettant la fabrication d'engins de destruction",
    definitionCourte:
      "**Le fait de diffuser par tout moyen, sauf à destination des professionnels, des procédés permettant la fabrication d'engins de destruction élaborés à partir de poudre ou de substances explosives, de matières nucléaires, biologiques ou chimiques, ou à partir de tout autre produit destiné à l'usage domestique, industriel ou agricole, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 322-6-1 al. 1 du C.P.* définit et réprime la diffusion de procédés permettant la fabrication d'engins de destruction.",
    versoFooter:
      "*L'article 322-6-1 al. 1 du C.P.* définit et réprime la diffusion de procédés permettant la fabrication d'engins de destruction.",
  },
  {
    id: 'fc-f02-diffusion-procedes-engins-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: "La diffusion de procédés permettant la fabrication d'engins de destruction",
    definitionCourte:
      "**Le fait de diffuser par tout moyen, sauf à destination des professionnels, des procédés permettant la fabrication d'engins de destruction élaborés à partir de poudre ou de substances explosives, de matières nucléaires, biologiques ou chimiques, ou à partir de tout autre produit destiné à l'usage domestique, industriel ou agricole, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **LES MOYENS DE DIFFUSION**

➤ **LA DIFFUSION A L'ÉGARD DE TOUT PUBLIC**

➤ **LES PROCÉDÉS PERMETTANT LA FABRICATION D'ENGINS DE DESTRUCTION**

**ÉLÉMENT MORAL :**

**CONNAISSANCE DU RISQUE COURU EN DIFFUSANT DES MODES D'EMPLOI DONT L'UTILISATION S'AVÈRE DANGEREUSE**

**DIFFUSER SCIEMMENT UN MODE D'EMPLOI DESTINE A FABRIQUER UN ENGIN DE DESTRUCTION**`,
    versoFooter:
      "*L'article 322-6-1 al. 1 du C.P.* définit et réprime la diffusion de procédés permettant la fabrication d'engins de destruction.",
  },
  {
    id: 'fc-f02-detention-explosifs-prep-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: "Détention ou transport de substances ou produits incendiaires ou explosifs en vue de la préparation de destruction, dégradation ou détérioration dangereuses ou d'une atteinte aux personnes",
    materiel: [],
    moral: '',
    legal:
      "*L'article 322-11-1 al. 1 du C.P.* définit et réprime la détention ou le transport de substances ou produits incendiaires ou explosifs en vue de la préparation de destruction, dégradation ou détérioration dangereuses ou d'une atteinte aux personnes.",
    versoFooter:
      "*L'article 322-11-1 al. 1 du C.P.* définit et réprime la détention ou le transport de substances ou produits incendiaires ou explosifs en vue de la préparation de destruction, dégradation ou détérioration dangereuses ou d'une atteinte aux personnes.",
  },
  {
    id: 'fc-f02-detention-explosifs-prep-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: "Détention ou transport de substances ou produits incendiaires ou explosifs en vue de la préparation de destruction, dégradation ou détérioration dangereuses ou d'une atteinte aux personnes",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **LA NATURE DES SUBSTANCES ET PRODUITS INCENDIAIRES OU EXPLOSIFS**
- *Les substances ou produits incendiaires ou explosifs*
- *Les éléments ou substances destinés à entrer dans la composition de produits ou engins incendiaires ou explosifs*
- *Pluralité d'objets, substances ou produits*

➤ **LA PRÉPARATION CARACTÉRISÉE DE CERTAINES INFRACTIONS**
- *L'infraction définie à l'article 322-6 du C.P.*
- *Les infractions d'atteintes aux personnes*

➤ **L'ABSENCE D'UTILISATION DE CES SUBSTANCES OU PRODUITS INCENDIAIRES OU EXPLOSIFS**

**ÉLÉMENT MORAL :**

**CONSCIENCE DE DÉTENIR OU DE TRANSPORTER DES PRODUITS OU SUBSTANCES INCENDIAIRES OU EXPLOSIFS DANS LE BUT DE COMMETTRE UNE INFRACTION DANGEREUSE POUR LES PERSONNES**`,
    versoFooter:
      "*L'article 322-11-1 al. 1 du C.P.* définit et réprime la détention ou le transport de substances ou produits incendiaires ou explosifs en vue de la préparation de destruction, dégradation ou détérioration dangereuses ou d'une atteinte aux personnes.",
  },
  {
    id: 'fc-f02-detention-explosifs-sans-motif-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Détention ou transport de substances ou produits incendiaires ou explosifs sans motif légitime permettant de commettre des destructions, dégradations ou détériorations dangereuses',
    definitionCourte: `**Constitue une infraction la détention ou le transport sans motif légitime :**
1° De substances ou produits explosifs permettant de commettre les infractions définies à l'article 322-6, lorsque ces substances ou produits ne sont pas soumis, pour la détention ou le transport, à un régime particulier ;
2° De substances ou produits incendiaires permettant de commettre les infractions définies à l'article 322-6 ainsi que d'éléments ou substances destinés à entrer dans la composition de produits ou engins incendiaires ou explosifs, lorsque leur détention ou leur transport ont été interdits par arrêté préfectoral en raison de l'urgence ou du risque de trouble à l'ordre public.`,
    materiel: [],
    moral: '',
    legal:
      "*L'article 322-11-1 al. 3 du C.P.* définit et réprime la détention ou le transport, sans motif légitime, de substances ou produits incendiaires ou explosifs lorsqu'ils sont susceptibles de permettre des destructions, dégradations ou détériorations dangereuses pour les personnes.",
    versoFooter:
      "*L'article 322-11-1 al. 3 du C.P.* définit et réprime la détention ou le transport, sans motif légitime, de substances ou produits incendiaires ou explosifs lorsqu'ils sont susceptibles de permettre des destructions, dégradations ou détériorations dangereuses pour les personnes.",
  },
  {
    id: 'fc-f02-detention-explosifs-sans-motif-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Détention ou transport de substances ou produits incendiaires ou explosifs sans motif légitime permettant de commettre des destructions, dégradations ou détériorations dangereuses',
    definitionCourte: `**Constitue une infraction la détention ou le transport sans motif légitime :**
1° De substances ou produits explosifs permettant de commettre les infractions définies à l'article 322-6, lorsque ces substances ou produits ne sont pas soumis, pour la détention ou le transport, à un régime particulier ;
2° De substances ou produits incendiaires permettant de commettre les infractions définies à l'article 322-6 ainsi que d'éléments ou substances destinés à entrer dans la composition de produits ou engins incendiaires ou explosifs, lorsque leur détention ou leur transport ont été interdits par arrêté préfectoral en raison de l'urgence ou du risque de trouble à l'ordre public.`,
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **LA POSSESSION DE SUBSTANCES OU PRODUITS INCENDIAIRES OU EXPLOSIFS, SANS MOTIF LÉGITIME**
- *La détention ou le transport*
- *L'absence de motif légitime*

➤ **LA NATURE DES SUBSTANCES ET PRODUITS INCENDIAIRES OU EXPLOSIFS**
- *Les substances ou produits explosifs non soumis à un régime particulier*
- *Les substances ou produits incendiaires et les éléments ou substances destinés à entrer dans la composition de produits ou engins incendiaires ou explosifs détenus ou transportés malgré l'interdiction qui en a été faite par arrêté préfectoral en raison de l'urgence ou du risque de trouble à l'ordre public*

➤ **L'ABSENCE D'UTILISATION DE CES PRODUITS INCENDIAIRES OU EXPLOSIFS**

**ÉLÉMENT MORAL :**

Pour *l'article 322-11-1, 1° du C.P.* :

**CONSCIENCE DE DÉTENIR OU DE TRANSPORTER DES SUBSTANCES OU PRODUITS EXPLOSIFS SANS MOTIF LÉGITIME**

Pour *l'article 322-11-1, 2° du C.P.* :

**N'AVOIR AUCUN MOTIF LÉGITIME ET NE PAS RESPECTER L'ARRÊTÉ PRÉFECTORAL**`,
    versoFooter:
      "*L'article 322-11-1 al. 3 du C.P.* définit et réprime la détention ou le transport, sans motif légitime, de substances ou produits incendiaires ou explosifs lorsqu'ils sont susceptibles de permettre des destructions, dégradations ou détériorations dangereuses pour les personnes.",
  },
  {
    id: 'fc-f02-menaces-biens-sans-condition-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Les menaces de destruction, de dégradation ou de détérioration sans condition',
    definitionCourte:
      "**La menace de commettre une destruction, une dégradation ou une détérioration dangereuses pour les personnes lorsqu'elle est soit réitérée, soit matérialisée par un écrit, une image ou tout autre objet, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: "*L'article 322-12 du C.P.* définit et réprime les menaces d'atteintes aux biens sans condition.",
    versoFooter: "*L'article 322-12 du C.P.* définit et réprime les menaces d'atteintes aux biens sans condition.",
  },
  {
    id: 'fc-f02-menaces-biens-sans-condition-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Les menaces de destruction, de dégradation ou de détérioration sans condition',
    definitionCourte:
      "**La menace de commettre une destruction, une dégradation ou une détérioration dangereuses pour les personnes lorsqu'elle est soit réitérée, soit matérialisée par un écrit, une image ou tout autre objet, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **LA FORME DE LA MENACE**

➤ **L'OBJET DE LA MENACE**

**ÉLÉMENT MORAL :**

**VOLONTÉ D'ATTEINDRE MORALEMENT LA VICTIME**`,
    versoFooter: "*L'article 322-12 du C.P.* définit et réprime les menaces d'atteintes aux biens sans condition.",
  },
  {
    id: 'fc-f02-menaces-biens-avec-condition-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Les menaces de destruction, de dégradation ou de détérioration avec condition',
    definitionCourte:
      "**La menace, par quelque moyen que ce soit, de commettre une destruction, une dégradation ou une détérioration lorsqu'elle est faite avec l'ordre de remplir une condition, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: "*L'article 322-13 al. 1 du C.P.* définit et réprime les menaces d'atteintes aux biens avec condition.",
    versoFooter: "*L'article 322-13 al. 1 du C.P.* définit et réprime les menaces d'atteintes aux biens avec condition.",
  },
  {
    id: 'fc-f02-menaces-biens-avec-condition-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Les menaces de destruction, de dégradation ou de détérioration avec condition',
    definitionCourte:
      "**La menace, par quelque moyen que ce soit, de commettre une destruction, une dégradation ou une détérioration lorsqu'elle est faite avec l'ordre de remplir une condition, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **LA FORME DE LA MENACE**

➤ **L'OBJET DE LA MENACE**

➤ **LA CONDITION**

**ÉLÉMENT MORAL :**

**VOLONTÉ D'ATTEINDRE MORALEMENT LA VICTIME**`,
    versoFooter: "*L'article 322-13 al. 1 du C.P.* définit et réprime les menaces d'atteintes aux biens avec condition.",
  },
  {
    id: 'fc-f02-fausses-alertes-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Les fausses alertes',
    definitionCourte:
      "**Le fait de communiquer ou de divulguer une fausse information dans le but de faire croire qu'une destruction, une dégradation ou une détérioration dangereuse pour les personnes va être ou a été commise, constitue une infraction.**\nLe fait de communiquer ou de divulguer une fausse information faisant croire à un sinistre et de nature à provoquer l'intervention inutile des secours, constitue également une infraction.",
    materiel: [],
    moral: '',
    legal: "*L'article 322-14 du C.P.* définit et réprime les fausses alertes.",
    versoFooter: "*L'article 322-14 du C.P.* définit et réprime les fausses alertes.",
  },
  {
    id: 'fc-f02-fausses-alertes-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Destructions, dégradations et détériorations',
    nom: 'Les fausses alertes',
    definitionCourte:
      "**Le fait de communiquer ou de divulguer une fausse information dans le but de faire croire qu'une destruction, une dégradation ou une détérioration dangereuse pour les personnes va être ou a été commise, constitue une infraction.**\nLe fait de communiquer ou de divulguer une fausse information faisant croire à un sinistre et de nature à provoquer l'intervention inutile des secours, constitue également une infraction.",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **LA COMMUNICATION OU LA DIVULGATION**

➤ **UNE FAUSSE INFORMATION**
- *Soit l'existence ou la survenance d'une destruction, dégradation ou détérioration dangereuses pour les personnes*
- *Soit l'existence d'un sinistre et provoquer l'intervention inutile des secours*

**ÉLÉMENT MORAL :**

**CONNAISSANCE DE LA FAUSSETÉ DE L'INFORMATION**

**VOLONTÉ DE FAIRE CROIRE A AUTRUI SOIT L'EXISTENCE OU LA SURVENANCE D'UNE DESTRUCTION, UNE DÉGRADATION OU UNE DÉTÉRIORATION DANGEREUSE POUR LES PERSONNES SOIT LA NÉCESSITÉ D'UNE INTERVENTION DES SECOURS**`,
    versoFooter: "*L'article 322-14 du C.P.* définit et réprime les fausses alertes.",
  },
  // ── Groupe 5 : Atteintes aux STAD ──
  {
    id: 'fc-f02-stad-acces-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'accès ou le maintien frauduleux dans un système de traitement automatisé de données",
    definitionCourte:
      "**Le fait d'accéder ou de se maintenir, frauduleusement, dans tout ou partie d'un système de traitement automatisé de données constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 323-1 du C.P.* définit et réprime l'accès ou le maintien dans un système de traitement automatisé de données.",
    versoFooter:
      "*L'article 323-1 du C.P.* définit et réprime l'accès ou le maintien dans un système de traitement automatisé de données.",
  },
  {
    id: 'fc-f02-stad-acces-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'accès ou le maintien frauduleux dans un système de traitement automatisé de données",
    definitionCourte:
      "**Le fait d'accéder ou de se maintenir, frauduleusement, dans tout ou partie d'un système de traitement automatisé de données constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UN SYSTÈME DE TRAITEMENT AUTOMATISÉ DE DONNÉES**
- *La notion de système*
- *Le « maître du système »*

➤ **UN ACCÈS OU UN MAINTIEN**
- *L'accès dans un système de traitement automatisé de données*
- *Le maintien dans un système de traitement automatisé de données*

**ÉLÉMENT MORAL :**

**CONSCIENCE DE L'AUTEUR D'ACCÉDER OU DE SE MAINTENIR SANS DROIT DANS UN SYSTÈME AUTOMATISÉ DE DONNÉES**`,
    versoFooter:
      "*L'article 323-1 du C.P.* définit et réprime l'accès ou le maintien dans un système de traitement automatisé de données.",
  },
  {
    id: 'fc-f02-stad-entrave-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'entrave au fonctionnement d'un système de traitement automatisé de données",
    definitionCourte:
      "**Le fait d'entraver ou de fausser le fonctionnement d'un système de traitement automatisé de données, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 323-2 du C.P.* définit et réprime le fait d'entraver ou de fausser le fonctionnement d'un système de traitement automatisé des données.",
    versoFooter:
      "*L'article 323-2 du C.P.* définit et réprime le fait d'entraver ou de fausser le fonctionnement d'un système de traitement automatisé des données.",
  },
  {
    id: 'fc-f02-stad-entrave-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'entrave au fonctionnement d'un système de traitement automatisé de données",
    definitionCourte:
      "**Le fait d'entraver ou de fausser le fonctionnement d'un système de traitement automatisé de données, constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE ENTRAVE**

➤ **L'ACTION DE FAUSSER**

**ÉLÉMENT MORAL :**

**CONSCIENCE DE L'AUTEUR DE L'ENTRAVE APPORTÉE AU SYSTÈME OU DU FAIT QU'IL FAUSSE LE FONCTIONNEMENT DU SYSTÈME**`,
    versoFooter:
      "*L'article 323-2 du C.P.* définit et réprime le fait d'entraver ou de fausser le fonctionnement d'un système de traitement automatisé des données.",
  },
  {
    id: 'fc-f02-stad-donnees-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'introduction, la suppression ou la modification frauduleuse de données",
    definitionCourte:
      "**Le fait d'introduire frauduleusement des données dans un système de traitement automatisé, d'extraire, de détenir, de reproduire, de transmettre, de supprimer ou de modifier frauduleusement les données qu'il contient constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 323-3 du C.P.* définit et réprime l'introduction, la suppression ou la modification frauduleuse de données.",
    versoFooter:
      "*L'article 323-3 du C.P.* définit et réprime l'introduction, la suppression ou la modification frauduleuse de données.",
  },
  {
    id: 'fc-f02-stad-donnees-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'introduction, la suppression ou la modification frauduleuse de données",
    definitionCourte:
      "**Le fait d'introduire frauduleusement des données dans un système de traitement automatisé, d'extraire, de détenir, de reproduire, de transmettre, de supprimer ou de modifier frauduleusement les données qu'il contient constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **DES ACTES PORTANT SUR LES DONNÉES**
- l'introduction frauduleuse de données
- l'extraction frauduleuse de données
- la détention frauduleuse de données
- la reproduction frauduleuse de données
- la transmission frauduleuse de données
- la suppression frauduleuse de données
- la modification frauduleuse de données

**ÉLÉMENT MORAL :**

**CONSCIENCE DE L'AUTEUR D'INTRODUIRE, DE DÉTENIR, DE REPRODUIRE, D'EXTRAIRE ET DE TRANSMETTRE, SUPPRIMER OU MODIFIER FRAUDULEUSEMENT DES DONNÉES CONTENUES DANS UN SYSTÈME**`,
    versoFooter:
      "*L'article 323-3 du C.P.* définit et réprime l'introduction, la suppression ou la modification frauduleuse de données.",
  },
  {
    id: 'fc-f02-stad-moyens-adaptes-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'importation, la détention, l'offre, la cession, la mise à disposition de toutes données adaptées pour commettre les infractions d'atteintes aux systèmes de traitement automatisé de données",
    definitionCourte:
      "**Le fait, sans motif légitime, notamment de recherche ou de sécurité informatique, d'importer, de détenir, d'offrir, de céder ou de mettre à disposition un équipement, un instrument, un programme informatique ou toute donnée conçus ou spécialement adaptés pour commettre une ou plusieurs des infractions prévues par les articles 323-1 à 323-3 du C.P., constitue une infraction.**",
    materiel: [],
    moral: '',
    legal:
      "*L'article 323-3-1 du C.P.* définit et réprime l'importation, la détention, l'offre, la cession, la mise à disposition de toutes données adaptées pour commettre les infractions d'atteintes aux systèmes de traitement automatisé des données.",
    versoFooter:
      "*L'article 323-3-1 du C.P.* définit et réprime l'importation, la détention, l'offre, la cession, la mise à disposition de toutes données adaptées pour commettre les infractions d'atteintes aux systèmes de traitement automatisé des données.",
  },
  {
    id: 'fc-f02-stad-moyens-adaptes-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'importation, la détention, l'offre, la cession, la mise à disposition de toutes données adaptées pour commettre les infractions d'atteintes aux systèmes de traitement automatisé de données",
    definitionCourte:
      "**Le fait, sans motif légitime, notamment de recherche ou de sécurité informatique, d'importer, de détenir, d'offrir, de céder ou de mettre à disposition un équipement, un instrument, un programme informatique ou toute donnée conçus ou spécialement adaptés pour commettre une ou plusieurs des infractions prévues par les articles 323-1 à 323-3 du C.P., constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UNE FOURNITURE DE MOYEN**
Sont sanctionnées :
- *l'importation* (introduire quelque chose d'étranger)
- *la détention* (avoir en sa possession)
- *l'offre* (donner quelque chose à quelqu'un)
- *la cession* (abandonner quelque chose à quelqu'un, le lui donner)
- *la mise à disposition* (donner pour usage)

➤ **UNE ÉVENTUELLE COMMISSION D'INFRACTION**
Les moyens sont conçus ou spécialement adaptés pour commettre les faits prévus par *les articles 323-1 à 323-3 du C.P.*

➤ **UNE ABSENCE DE MOTIF LÉGITIME**

**ÉLÉMENT MORAL :**

Ce délit n'implique par forcément la volonté directe de nuire. La simple détention est réprimée même si l'auteur n'avait de prime abord aucune intention de diffuser, voire contaminer un système de traitement automatisé de données.
Le mobile importe peu, l'auteur pouvant agir par jeu ou pour intérêt technique personnel.`,
    versoFooter:
      "*L'article 323-3-1 du C.P.* définit et réprime l'importation, la détention, l'offre, la cession, la mise à disposition de toutes données adaptées pour commettre les infractions d'atteintes aux systèmes de traitement automatisé des données.",
  },
  {
    id: 'fc-f02-stad-association-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'association de malfaiteurs en informatique",
    definitionCourte:
      "**La participation à un groupement formé ou à une entente établie en vue de la préparation, caractérisée par un ou plusieurs faits matériels, d'une ou de plusieurs infractions prévues par les articles 323-1 à 323-3-1 du C.P., constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: "*L'article 323-4 du C.P.* définit et réprime l'association de malfaiteurs en informatique.",
    versoFooter: "*L'article 323-4 du C.P.* définit et réprime l'association de malfaiteurs en informatique.",
  },
  {
    id: 'fc-f02-stad-association-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Atteintes aux STAD',
    nom: "L'association de malfaiteurs en informatique",
    definitionCourte:
      "**La participation à un groupement formé ou à une entente établie en vue de la préparation, caractérisée par un ou plusieurs faits matériels, d'une ou de plusieurs infractions prévues par les articles 323-1 à 323-3-1 du C.P., constitue une infraction.**",
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UN GROUPEMENT OU UNE ENTENTE**

➤ **LA PRÉPARATION A LA COMMISSION D'UNE OU PLUSIEURS INFRACTIONS**
Les infractions visées par *l'article 323-4 du C.P.* sont :
- l'accès ou le maintien frauduleux dans un système de traitement automatisé de données
- l'entrave au fonctionnement d'un système de traitement automatisé de données
- l'introduction, l'extraction, la détention, la reproduction, la transmission, la suppression ou la modification frauduleuse de données
- l'importation, la détention, l'offre, la cession, la mise à disposition de toutes données adaptées ou conçues pour commettre les infractions d'atteintes au système de traitement automatisé de données

**ÉLÉMENT MORAL :**

**CONSCIENCE DE L'AUTEUR DE L'ACTIVITÉ DU GROUPEMENT ET DE SON OBJET**`,
    versoFooter: "*L'article 323-4 du C.P.* définit et réprime l'association de malfaiteurs en informatique.",
  },
  // ── Groupe 6 : Contrefaçons et falsifications ──
  {
    id: 'fc-f02-contrefacon-paiement-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Contrefaçons et falsifications',
    nom: 'Les contrefaçons et falsifications de chèques ou autre instrument de paiement',
    definitionCourte: `**Constitue une infraction le fait de :**
1. Contrefaire ou falsifier un chèque ou un autre instrument mentionné à l'article L. 133-4 ;
2. Faire ou tenter de faire usage, en connaissance de cause, d'un chèque ou un autre instrument mentionné à l'article L. 133-4 contrefaisant ou falsifié ;
3. Accepter, en connaissance de cause, de recevoir un chèque ou un autre instrument mentionné à l'article L. 133-4 contrefaisant ou falsifié.`,
    materiel: [],
    moral: '',
    legal:
      "*L'article L. 163-3 du code monétaire et financier* incrimine les actes délictueux concernant les chèques et les autres instruments dont les cartes de paiement ou de retrait.",
    versoFooter:
      "*L'article L. 163-3 du code monétaire et financier* incrimine les actes délictueux concernant les chèques et les autres instruments dont les cartes de paiement ou de retrait.",
  },
  {
    id: 'fc-f02-contrefacon-paiement-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: C,
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Contrefaçons et falsifications',
    nom: 'Les contrefaçons et falsifications de chèques ou autre instrument de paiement',
    definitionCourte: `**Constitue une infraction le fait de :**
1. Contrefaire ou falsifier un chèque ou un autre instrument mentionné à l'article L. 133-4 ;
2. Faire ou tenter de faire usage, en connaissance de cause, d'un chèque ou un autre instrument mentionné à l'article L. 133-4 contrefaisant ou falsifié ;
3. Accepter, en connaissance de cause, de recevoir un chèque ou un autre instrument mentionné à l'article L. 133-4 contrefaisant ou falsifié.`,
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ **UN MOYEN DE PAIEMENT**

➤ **UN COMPORTEMENT RÉPRÉHENSIBLE**
- *La contrefaçon ou la falsification*
- *L'usage d'un moyen de paiement contrefaisant ou falsifié*
- *L'acceptation d'un moyen de paiement contrefaisant ou falsifié*

**ÉLÉMENT MORAL :**

**AGIR SCIEMMENT ET VOLONTAIREMENT SACHANT QUE SON INTERVENTION PERMET DE CONTREFAIRE, FALSIFIER, USER OU ACCEPTER UN MOYEN DE PAIEMENT CONTREFAISANT**`,
    versoFooter:
      "*L'article L. 163-3 du code monétaire et financier* incrimine les actes délictueux concernant les chèques et les autres instruments dont les cartes de paiement ou de retrait.",
  },
];
