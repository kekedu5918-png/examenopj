'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';

function Piege() {
  return (
    <span className='ml-2 inline-flex items-center rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-100'>
      Piège examen ⚠️
    </span>
  );
}

function Ref({ children }: { children: React.ReactNode }) {
  return <span className='text-cyan-400/90'>{children}</span>;
}

/** Architecture 8 rubriques — sources F09, F10, F11, F15. // TODO: valider chaque cellule avec fascicule PDF (F09 p.8, F10 p.26, F11, F15). */
export function FondamentauxEightRubrics() {
  return (
    <section className='border-b border-white/10 bg-navy-950 px-4 py-12 md:px-8' aria-labelledby='fond-structure-title'>
      <div className='mx-auto max-w-4xl'>
        <h2 id='fond-structure-title' className='font-display text-2xl font-bold text-white md:text-3xl'>
          Les fondamentaux de l&apos;OPJ
        </h2>
        <p className='mt-3 text-slate-400'>
          Synthèse procédurale et pénale — à recaler sur les fascicules SDCP (F09 à F15). Les tableaux ci-dessous
          reprennent la structure imposée ; toute ligne doit être vérifiée sur le fascicule indiqué.
        </p>

        <Accordion type='multiple' className='mt-10 w-full space-y-3'>
          {/* RUBRIQUE 1 */}
          <AccordionItem value='r1' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              1. La classification des infractions <Ref>[F09]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <p>
                <strong className='text-white'>Éléments constitutifs</strong> — Élément légal :{' '}
                <Ref>[art. 111-1 C.P. — pas de crime ou de délit sans loi — principe légal d&apos;une infraction]</Ref>. Élément matériel : acte positif
                ou négatif (commission / omission). Élément moral : dol général (intentionnel) / faute non intentionnelle /
                faute contraventionnelle.
              </p>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <p className='mb-2 font-semibold text-white'>Tableau tripartite — // TODO: vérifier F09 p.8</p>
                <table className='w-full min-w-[720px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>Contravention</th>
                      <th className='py-2 pr-2'>Délit</th>
                      <th className='py-2'>Crime</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Juridiction</td>
                      <td>Tribunal de police</td>
                      <td>Tribunal correctionnel</td>
                      <td>Cour d&apos;assises / CCD</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Flagrance</td>
                      <td>Non applicable</td>
                      <td>Possible si peine d&apos;emprisonnement</td>
                      <td>Possible</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Prescription action publique</td>
                      <td>1 an</td>
                      <td>6 ans</td>
                      <td>20 ans</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Prescription peine</td>
                      <td>3 ans</td>
                      <td>6 ans</td>
                      <td>20 ans</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Tentative</td>
                      <td>Non punissable</td>
                      <td>Si texte le prévoit</td>
                      <td>Toujours punissable</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-slate-300'>Complicité</td>
                      <td>Si texte le prévoit expressément</td>
                      <td>Punissable</td>
                      <td>Punissable</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <p className='mb-2 font-semibold text-white'>Éléments moraux (schéma)</p>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>Intentionnel</th>
                      <th className='py-2 pr-2'>Non intentionnel</th>
                      <th className='py-2'>Contraventionnel</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Définition</td>
                      <td>Volonté d&apos;accomplir l&apos;acte en sachant qu&apos;il est illicite</td>
                      <td>Imprudence, négligence, maladresse</td>
                      <td>Violation de la prescription légale</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-slate-300'>Dol spécial</td>
                      <td>Volonté d&apos;atteindre un résultat précis</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 2 */}
          <AccordionItem value='r2' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              2. Les cadres d&apos;enquête <Ref>[F11]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[800px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>Flagrance</th>
                      <th className='py-2 pr-2'>Préliminaire</th>
                      <th className='py-2 pr-2'>CR</th>
                      <th className='py-2'>Instruction</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Déclenchement</td>
                      <td>Crime ou délit flagrant <Ref>[art. 53 CPP]</Ref></td>
                      <td>Initiative OPJ ou plainte</td>
                      <td>Ordonnance JI</td>
                      <td>Réquisitoire introductif</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Durée initiale</td>
                      <td>8 jours sans discontinuer <Ref>[art. 53 CPP]</Ref></td>
                      <td>Pas de délai fixe</td>
                      <td>Durée de la CR</td>
                      <td>Pas de limite fixe</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Prolongation</td>
                      <td>
                        8 jours sup. si infraction ≥ 5 ans emprisonnement + investigations non différables{' '}
                        <Ref>[art. 53 al. 2 CPP]</Ref>
                      </td>
                      <td colSpan={3}>
                        {/* TODO: F11 — préciser régimes */}
                        N/A / selon texte
                      </td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Perquisition</td>
                      <td>De droit, nuit possible si crime ou délit flagrant</td>
                      <td>Assentiment écrit ou JLD</td>
                      <td colSpan={2}>Selon ordonnance JI</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>GAV</td>
                      <td>OPJ compétence exclusive</td>
                      <td>OPJ compétence exclusive</td>
                      <td colSpan={2}>OPJ sur instruction JI</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-slate-300'>Direction</td>
                      <td>Procureur de la République</td>
                      <td>Procureur de la République</td>
                      <td colSpan={2}>Juge d&apos;instruction</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <p>
                <strong className='text-white'>Validité de la flagrance</strong> — continuité des actes
                d&apos;investigation ; « l&apos;interruption dans la rédaction des actes de procédure ne marque pas la
                volonté d&apos;abandonner l&apos;enquête » <Piege /> <Ref>(Cass. crim. 20/12/1994)</Ref>.
              </p>
              <p className='text-xs text-slate-500'>
                {/* TODO: F11 + Tableau_compétences_FD.pdf — tableau OPJ/APJ/APJA/AE et lieux protégés : reprise mot pour mot */}
                Tableau des compétences OPJ / APJ / APJA / AE et lieux protégés : à compléter depuis F11 et documents
                annexes officiels.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 3 */}
          <AccordionItem value='r3' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              3. Le contrôle d&apos;identité <Ref>[art. 78-1 à 78-6 CPP — F11]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2'>Régime</th>
                      <th className='py-2 pr-2'>Base légale</th>
                      <th className='py-2 pr-2'>Conditions</th>
                      <th className='py-2'>Durée max</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Judiciaire (crime ou délit)</td>
                      <td>
                        <Ref>[art. 78-2 al.1 CPP]</Ref>
                      </td>
                      <td>Raisons plausibles de soupçonner</td>
                      <td>4 h</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Judiciaire (infraction commise)</td>
                      <td>
                        <Ref>[art. 78-2 al.2 CPP]</Ref>
                      </td>
                      <td>Participation possible à une infraction</td>
                      <td>4 h</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Administratif</td>
                      <td>
                        <Ref>[art. 78-2 al.4 CPP]</Ref>
                      </td>
                      <td>Maintien ordre public / prévention infractions</td>
                      <td>4 h</td>
                    </tr>
                    <tr>
                      <td className='font-medium text-slate-300'>Frontalier</td>
                      <td>
                        <Ref>[art. 78-2 al.5 CPP]</Ref>
                      </td>
                      <td>Zone de 20 km des frontières</td>
                      <td>4 h</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <p>
                Suites : vérification d&apos;identité <Ref>[art. 78-3 CPP]</Ref>, relevé d&apos;empreintes et
                photographies <Ref>[art. 78-3 al.4]</Ref>, retenue pour vérification (max 4 h).{' '}
                <span className='text-rose-300'>
                  Piège : le contrôle administratif ne peut pas conduire à GAV. <Piege />
                </span>
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 4 */}
          <AccordionItem value='r4' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              4. La garde à vue <Ref>[F11 — art. 62-2, 63-1 CPP]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>
                <strong className='text-white'>Six motifs (art. 62-2 CPP)</strong> : 1° investigations — 2° présentation
                procureur — 3° preuves/indices — 4° témoins/victimes — 5° coauteurs/complices — 6° faire cesser le crime.
              </p>
              <p>
                <strong className='text-white'>Durées (schéma)</strong> — droit commun : 24 h + 24 h (PR) = 48 h max ; CDO{' '}
                <Ref>[art. 706-73 CPP]</Ref> : jusqu&apos;à 96 h ; terrorisme : jusqu&apos;à 144 h —{' '}
                {/* TODO: F11 p. — recaler seuils exacts */}
                <span className='text-slate-500'>TODO — vérifier F11 : durées régimes spéciaux</span>
              </p>
              <p>
                <strong className='text-white'>Droits notifiés (art. 63-1 CPP)</strong> : infraction reprochée ; durée max
                et prolongation ; proche/employeur/consulat ; avocat (30 min, assistance auditions) ; médecin ; silence ;
                interprète ; consultation certaines pièces ; observations au magistrat ; formulaire des droits.{' '}
                <strong>Mineurs</strong> : avis représentant légal obligatoire, avocat de droit, droits supplémentaires
                listés au fascicule.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 5 */}
          <AccordionItem value='r5' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              5. L&apos;audition libre <Ref>[art. 61-1 CPP — F11]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>GAV</th>
                      <th className='py-2'>Audition libre</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Contrainte</td>
                      <td>OUI</td>
                      <td>NON (libre de partir)</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Conditions</td>
                      <td>6 motifs art. 62-2</td>
                      <td>Simple convocation</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Droits</td>
                      <td>Notification complète</td>
                      <td>
                        <Ref>[art. 61-1 CPP]</Ref>
                      </td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Avocat</td>
                      <td>De droit (mineur)</td>
                      <td>Si demande</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Durée</td>
                      <td>48 h / 96 h / 144 h selon régime</td>
                      <td>Pas de durée légale fixe</td>
                    </tr>
                    <tr>
                      <td className='font-medium text-slate-300'>Si la personne veut partir</td>
                      <td>Peut être maintenue</td>
                      <td>Doit être laissée partir</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <p>
                Droits notifiés en audition libre : qualification et date ; droit de quitter les locaux ; silence ; avocat
                si demande.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 6 */}
          <AccordionItem value='r6' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              6. Les nullités de procédure <Ref>[F15 + F11]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>
                <strong className='text-white'>Nullités textuelles</strong> : prévues expressément par un texte — ex.{' '}
                <Ref>[art. 63-1 CPP]</Ref> non-notification des droits GAV — prouvées par le simple constat du
                manquement.
              </p>
              <p>
                <strong className='text-white'>Nullités substantielles</strong> : violation d&apos;une formalité
                substantielle portant atteinte aux intérêts de la partie —{' '}
                <Ref>
                  [art. 802 CPP — la nullité ne peut être prononcée qu&apos;à charge de prouver le grief]
                </Ref>
                .
              </p>
              <p>
                Invocation : avant tout débat au fond <Ref>[art. 385 al.1 CPP]</Ref> ; purge si non soulevée à temps ;
                exceptions nullités d&apos;ordre public. Effet : annulation de l&apos;acte et actes dépendants ; preuves
                écartées.
              </p>
              <p className='text-rose-200'>
                Pièges : irrégularité de perquisition ≠ nullité automatique de la GAV ; purge ; régularisation possible.{' '}
                <Piege />
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 7 */}
          <AccordionItem value='r7' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              7. Perquisitions, saisies, réquisitions <Ref>[F11]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[720px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2'>Cadre</th>
                      <th className='py-2 pr-2'>Heure légale</th>
                      <th className='py-2 pr-2'>Assentiment</th>
                      <th className='py-2'>Magistrat</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Flagrance</td>
                      <td>Toute heure si flagrant / 6h–21h sinon</td>
                      <td>Non requis</td>
                      <td>Avis PR si domicile</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Préliminaire</td>
                      <td>6h–21h sauf dérogation</td>
                      <td>Écrit manuscrit OBLIGATOIRE ou JLD</td>
                      <td>PR ou JLD</td>
                    </tr>
                    <tr>
                      <td className='font-medium text-slate-300'>CR / Instruction</td>
                      <td>6h–21h sauf dérogation ordonnance</td>
                      <td>Selon ordonnance</td>
                      <td>JI</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <p>
                Présence <Ref>[art. 57 CPP]</Ref> — personne concernée ou représentant ou témoin ; si absence : deux
                témoins. Saisies : description, scellés numérotés, inventaire contradictoire. Réquisitions : écrit,
                mission précise, délai.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 8 */}
          <AccordionItem value='r8' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              8. La récidive et le concours d&apos;infractions <Ref>[F10]</Ref>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <p className='mb-2 font-semibold text-white'>Récidive — // TODO: vérifier F10 p.26</p>
                <table className='w-full min-w-[800px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10'>
                      <th className='py-2 pr-2'>1ère infraction</th>
                      <th className='py-2 pr-2'>2e infraction</th>
                      <th className='py-2 pr-2'>Délai</th>
                      <th className='py-2'>Effet</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td>Crime ou délit puni 10 ans</td>
                      <td>Crime</td>
                      <td>Perpétuel</td>
                      <td>Réclusion perpétuité ou +10 ans</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td>Crime ou délit puni 10 ans</td>
                      <td>Délit puni 10 ans</td>
                      <td>10 ans</td>
                      <td>Doublement</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td>Crime ou délit puni 10 ans</td>
                      <td>Délit &lt; 10 ans &gt; 1 an</td>
                      <td>5 ans</td>
                      <td>Doublement</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td>Délit &lt; 10 ans</td>
                      <td>Délit identique ou assimilé</td>
                      <td>5 ans</td>
                      <td>Doublement</td>
                    </tr>
                    <tr>
                      <td>Contravention 5e cl.</td>
                      <td>Même contravention</td>
                      <td>1 an</td>
                      <td>Amende portée à 3 000 €</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <p>
                Infractions assimilées <Ref>[art. 132-16 à 132-16-5 C.P.]</Ref> — liste au fascicule F10.{' '}
                <strong className='text-white'>Non bis in idem</strong> : un même fait ne reçoit pas deux qualifications
                sauf distinctions (faits distincts, qualifications incompatibles ou absorbantes).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
