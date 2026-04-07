'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';

function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <GlassCard padding='p-3 sm:p-4' className='overflow-x-auto text-xs sm:text-sm'>
      {children}
    </GlassCard>
  );
}

function Piege({ children }: { children: React.ReactNode }) {
  return (
    <p className='mt-3 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2 text-xs text-amber-100'>
      <span className='font-bold'>Piège examen ⚠️</span> {children}
    </p>
  );
}

/** Synthèse structurée F09, F10, F11, F15 — tableaux alignés sur les fascicules ; // TODO: relecture PDF si le moindre doute. */
export function FondamentauxStructuredIntro() {
  return (
    <section className='border-b border-white/10 bg-navy-950 px-4 py-12 md:px-8' aria-labelledby='fond-structure-title'>
      <div className='mx-auto max-w-4xl'>
        <h2 id='fond-structure-title' className='font-display text-2xl font-bold text-white md:text-3xl'>
          Les fondamentaux de l’OPJ
        </h2>
        <p className='mt-3 text-slate-400'>
          Le socle procédural et pénal à maîtriser en profondeur. Ces notions reviennent dans toutes les épreuves. La
          rubrique 1 reprend le tableau des conséquences (F09.txt, p. 9 du fascicule) ; vérifiez les montants et délais
          sur votre édition papier si besoin.
        </p>

        <Accordion type='single' collapsible className='mt-10 w-full space-y-3'>
          {/* RUBRIQUE 1 — F09 */}
          <AccordionItem value='f09-class' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              1. La classification des infractions{' '}
              <span className='ml-1 text-xs font-normal text-slate-500'>[F09 — tab. p. 8–9]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <p className='text-xs text-slate-500'>
                Tableau « CONSÉQUENCES DE LA CLASSIFICATION DES INFRACTIONS » — colonnes dans l’ordre du fascicule : Crime,
                Délit, Contravention (F09.txt).
              </p>
              <TableWrap>
                <table className='w-full min-w-[720px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-[11px] uppercase text-slate-400'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>Crime</th>
                      <th className='py-2 pr-2'>Délit</th>
                      <th className='py-2'>Contravention</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-300'>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Juridictions compétentes</td>
                      <td>Cour d&apos;assises ou cour criminelle départementale</td>
                      <td>Tribunal correctionnel</td>
                      <td>Tribunal de police</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>L&apos;enquête de flagrant délit</td>
                      <td>Possible pour crime</td>
                      <td>Possible pour délit puni de peine d&apos;emprisonnement</td>
                      <td>Non applicable</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>L&apos;instruction</td>
                      <td>Obligatoire</td>
                      <td>Facultative</td>
                      <td>Exceptionnelle, sur requête du procureur de la République</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Délais prescription : action publique</td>
                      <td>20 ans</td>
                      <td>6 ans</td>
                      <td>1 an</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Délais prescription : peine</td>
                      <td>20 ans</td>
                      <td>6 ans</td>
                      <td>3 ans</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>La tentative</td>
                      <td>Toujours punissable</td>
                      <td>Punissable si un texte le prévoit</td>
                      <td>Non punissable</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>La complicité</td>
                      <td>Punissable</td>
                      <td>Punissable</td>
                      <td>Punissable uniquement quand un texte le prévoit expressément</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-white'>L&apos;extradition</td>
                      <td>Possible</td>
                      <td>Possible</td>
                      <td>Non applicable</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <div>
                <p className='font-semibold text-white'>Éléments constitutifs de l’infraction</p>
                <blockquote className='mt-3 border-l-4 border-emerald-500/50 pl-4 text-[13px] leading-relaxed text-slate-200'>
                  L&apos;article 111-3 du C.P. pose le principe de légalité en disposant que &quot;nul ne peut être puni
                  pour un crime ou pour un délit dont les éléments ne sont pas définis par la loi, ou pour les
                  contraventions dont les éléments ne sont pas définis par le règlement&quot;.
                </blockquote>
                <ul className='mt-3 list-inside list-disc space-y-1'>
                  <li>
                    Élément légal : sans texte légal, pas d&apos;infraction (même si l&apos;acte trouble l&apos;ordre
                    public).
                  </li>
                  <li>Élément matériel : acte positif ou négatif (commission / omission).</li>
                  <li>
                    Élément moral : dol général (intentionnel) / faute non intentionnelle / faute contraventionnelle.
                  </li>
                </ul>
              </div>
              <TableWrap>
                <p className='mb-2 text-xs font-semibold text-slate-400'>Éléments moraux (F09)</p>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-[11px] uppercase text-slate-400'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>Intentionnel</th>
                      <th className='py-2 pr-2'>Non intentionnel</th>
                      <th className='py-2'>Contraventionnel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Définition</td>
                      <td>Volonté d’accomplir l’acte en sachant qu’il est illicite</td>
                      <td>Imprudence, négligence, maladresse</td>
                      <td>Violation de la prescription légale</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-white'>Dol spécial</td>
                      <td>Volonté d’atteindre un résultat précis</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <Piege>
                Confondre régime de la tentative ou de la prescription entre contravention, délit et crime — revérifier le
                tableau au fascicule F09.
              </Piege>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 2 — F11 */}
          <AccordionItem value='cadres' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              2. Les cadres d’enquête <span className='ml-1 text-xs font-normal text-slate-500'>[F11]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <TableWrap>
                <table className='w-full min-w-[800px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-[11px] uppercase text-slate-400'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>Flagrance</th>
                      <th className='py-2 pr-2'>Préliminaire</th>
                      <th className='py-2 pr-2'>CR</th>
                      <th className='py-2'>Instruction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Déclenchement</td>
                      <td>Crime ou délit flagrant [art. 53 CPP]</td>
                      <td>Initiative OPJ ou plainte</td>
                      <td>Ordonnance JI</td>
                      <td>Réquisitoire introductif</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Durée initiale</td>
                      <td>8 jours sans discontinuer [art. 53 CPP]</td>
                      <td>Pas de délai fixe</td>
                      <td>Durée de la CR</td>
                      <td>Pas de limite fixe</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Prolongation</td>
                      <td>
                        8 jours sup. si infraction ≥ 5 ans emprisonnement + investigations non différables — décision PR{' '}
                        [art. 53 al. 2 CPP]
                      </td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Perquisition</td>
                      <td>De droit ; nuit possible si crime ou délit flagrant</td>
                      <td>Assentiment écrit ou JLD</td>
                      <td>Selon ordonnance JI</td>
                      <td>Selon ordonnance JI</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>GAV</td>
                      <td>OPJ compétence exclusive</td>
                      <td>OPJ compétence exclusive</td>
                      <td>OPJ sur instruction JI</td>
                      <td>OPJ sur instruction JI</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-white'>Direction</td>
                      <td>Procureur de la République</td>
                      <td>Procureur de la République</td>
                      <td>Juge d’instruction</td>
                      <td>Juge d’instruction</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <p className='text-xs text-slate-400'>
                Conditions de validité de l’enquête de flagrance : continuité des actes d’investigation. « L’interruption dans
                la rédaction des actes de procédure ne marque pas la volonté d’abandonner l’enquête » (Cass. crim.
                20/12/94).
              </p>
              <TableWrap>
                <p className='mb-2 text-xs font-semibold text-slate-400'>
                  Compétences indicatives OPJ / APJ / APJA / AE — TODO : F11 + tableau compétences officiel
                </p>
                <table className='w-full min-w-[720px] border-collapse text-left text-[11px] sm:text-xs'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-1'>Acte</th>
                      <th className='py-2 pr-1'>OPJ</th>
                      <th className='py-2 pr-1'>APJ</th>
                      <th className='py-2 pr-1'>APJA</th>
                      <th className='py-2'>AE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-white/5'>
                      <td className='py-1.5'>Plainte</td>
                      <td>OUI</td>
                      <td>NON</td>
                      <td>NON</td>
                      <td>Notif. droits victime</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-1.5'>Placement GAV</td>
                      <td>OUI seul</td>
                      <td>NON</td>
                      <td>NON</td>
                      <td>NON</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-1.5'>Perquisition</td>
                      <td>OUI</td>
                      <td>Seconde OPJ</td>
                      <td>Seconde OPJ</td>
                      <td>Seconde OPJ (instructions)</td>
                    </tr>
                    <tr>
                      <td className='py-1.5'>Réquisitions</td>
                      <td>OUI</td>
                      <td>NON</td>
                      <td>NON</td>
                      <td>Sur autorisation PR/JLD</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <p className='text-xs text-slate-500'>
                Lieux / personnes protégés en flagrance : TODO compléter depuis F11 + Cours synthèse — Assemblée, Sénat,
                ambassades, universités, établissements militaires, lieux de culte ; personnes : PR, parlementaires, agents
                diplomatiques et consulaires.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 3 */}
          <AccordionItem value='ci' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              3. Le contrôle d’identité <span className='ml-1 text-xs font-normal text-slate-500'>[art. 78-1 à 78-6 CPP]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <TableWrap>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-[11px] uppercase text-slate-400'>
                      <th className='py-2 pr-2'>Régime</th>
                      <th className='py-2 pr-2'>Base légale</th>
                      <th className='py-2 pr-2'>Conditions</th>
                      <th className='py-2'>Durée max</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-white'>Judiciaire (crime ou délit)</td>
                      <td>Art. 78-2 al. 1 CPP</td>
                      <td>Raisons plausibles de soupçonner</td>
                      <td>4 h</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-white'>Judiciaire (infraction commise)</td>
                      <td>Art. 78-2 al. 2 CPP</td>
                      <td>Participation possible à une infraction</td>
                      <td>4 h</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-white'>Administratif</td>
                      <td>Art. 78-2 al. 4 CPP</td>
                      <td>Maintien ordre public / prévention infractions</td>
                      <td>4 h</td>
                    </tr>
                    <tr>
                      <td className='font-medium text-white'>Frontalier</td>
                      <td>Art. 78-2 al. 5 CPP</td>
                      <td>Zone de 20 km des frontières</td>
                      <td>4 h</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <p>
                Suites : vérification d’identité [art. 78-3 CPP] ; relevé d’empreintes et photographies [art. 78-3 al. 4] ;
                retenue pour vérification (max 4 h).
              </p>
              <Piege>Le contrôle administratif ne peut pas conduire à une GAV.</Piege>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 4 GAV */}
          <AccordionItem value='gav' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              4. La garde à vue <span className='ml-1 text-xs font-normal text-slate-500'>[F11 — art. 62-2 et s. CPP]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p className='font-semibold text-white'>Motifs de placement [art. 62-2 CPP]</p>
              <ol className='list-decimal space-y-1 pl-5'>
                <li>Permettre l’exécution des investigations</li>
                <li>Garantir la présentation devant le procureur</li>
                <li>Empêcher la modification des preuves ou indices</li>
                <li>Empêcher pression sur témoins ou victimes</li>
                <li>Empêcher concertation avec coauteurs ou complices</li>
                <li>Garantir la mise en œuvre de mesures pour faire cesser le crime</li>
              </ol>
              <p>
                <span className='text-white'>Durées :</span> droit commun 24 h + 24 h (PR) = 48 h max ; CDO [art. 706-73 CPP]
                jusqu’à 96 h ; terrorisme jusqu’à 144 h — TODO : F11 p. — vérifier libellés exacts des prolongations.
              </p>
              <p className='font-semibold text-white'>Droits notifiés dès le début [art. 63-1 CPP]</p>
              <ul className='list-inside list-disc space-y-1 text-xs sm:text-sm'>
                <li>Nature de l’infraction reprochée ; durée max et prolongations possibles</li>
                <li>Droit d’avertir proche / employeur / autorités consulaires</li>
                <li>Droit à un avocat (entretien 30 min, assistance auditions)</li>
                <li>Droit à un médecin ; droit de se taire ; droit à un interprète</li>
                <li>Droit de consulter certaines pièces ; droit d’observations au magistrat ; formulaire des droits</li>
                <li>Mineur : représentant légal, avocat, droits supplémentaires — TODO : liste exhaustive F11 / ME2</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 5 AL */}
          <AccordionItem value='al' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              5. L’audition libre <span className='ml-1 text-xs font-normal text-slate-500'>[art. 61-1 CPP]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <TableWrap>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-[11px] text-slate-400'>
                      <th className='py-2 pr-2' />
                      <th className='py-2 pr-2'>GAV</th>
                      <th className='py-2'>Audition libre</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Contrainte</td>
                      <td>OUI</td>
                      <td>NON (libre de partir)</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Conditions</td>
                      <td>6 motifs art. 62-2 CPP</td>
                      <td>Simple convocation</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Durée</td>
                      <td>48 h / 96 h / 144 h selon régime</td>
                      <td>Pas de durée légale fixe</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-white'>Si la personne veut partir</td>
                      <td>Peut être maintenue (mesure coercitive)</td>
                      <td>Doit être laissée partir</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <p>Droits notifiés en audition libre : qualification et date de l’infraction ; droit de quitter les locaux ; droit au silence ; droit à un avocat si demande [art. 61-1 CPP].</p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 6 F15 */}
          <AccordionItem value='null' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              6. Les nullités de procédure <span className='ml-1 text-xs font-normal text-slate-500'>[F15 + F11]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-3 pb-6 text-sm text-slate-300'>
              <p>
                <span className='text-white'>Nullités textuelles :</span> prévues expressément ; ex. [art. 63-1 CPP] non-notification des droits GAV — prouvées par le constat du manquement.
              </p>
              <p>
                <span className='text-white'>Nullités substantielles :</span> formalité substantielle + grief — [art. 802 CPP] : charge de prouver le grief pour celui qui invoque.
              </p>
              <p>
                Invocation : avant tout débat au fond [art. 385 al. 1 CPP] ; passé ce délai : purge ; exceptions nullités d’ordre public.
              </p>
              <p>Effet : annulation de l’acte et des actes dépendants ; preuves écartées si tirées de l’acte annulé.</p>
              <Piege>
                Irrégularité d’une perquisition ≠ nullité automatique de la GAV ; purge si non soulevée avant le fond.
              </Piege>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 7 */}
          <AccordionItem value='perq' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              7. Perquisitions, saisies, réquisitions <span className='ml-1 text-xs font-normal text-slate-500'>[F11]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <TableWrap>
                <table className='w-full min-w-[720px] border-collapse text-left text-[11px] sm:text-xs'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-1'>Cadre</th>
                      <th className='py-2 pr-1'>Heure légale</th>
                      <th className='py-2 pr-1'>Assentiment</th>
                      <th className='py-2'>Magistrat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Flagrance</td>
                      <td>Toute heure si flagrant ; sinon 6 h–21 h</td>
                      <td>Non requis</td>
                      <td>Avis PR si domicile</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>Préliminaire</td>
                      <td>6 h–21 h sauf dérogation</td>
                      <td>Écrit manuscrit ou JLD</td>
                      <td>PR ou JLD</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-white'>CR / Instruction</td>
                      <td>6 h–21 h sauf dérogation ordonnance</td>
                      <td>Selon ordonnance</td>
                      <td>JI</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <p>
                Présence [art. 57 CPP] : personne concernée ou représentant ou témoin ; si absence : deux témoins. Saisies :
                description, scellés numérotés, inventaire contradictoire.
              </p>
              <p className='text-xs text-slate-500'>Réquisitions : écrit, mission précise, délai — TODO : F11 pages réquisitions.</p>
            </AccordionContent>
          </AccordionItem>

          {/* RUBRIQUE 8 F10 */}
          <AccordionItem value='recidive' className='rounded-xl border border-white/10 bg-white/[0.02] px-4'>
            <AccordionTrigger className='text-left font-display text-lg font-semibold text-white hover:no-underline'>
              8. La récidive et le concours d’infractions <span className='ml-1 text-xs font-normal text-slate-500'>[F10]</span>
            </AccordionTrigger>
            <AccordionContent className='space-y-4 pb-6 text-sm text-slate-300'>
              <TableWrap>
                <p className='mb-2 text-xs font-semibold text-slate-400'>Récidive — TODO : vérifier libellés exacts F10 p. 26</p>
                <table className='w-full min-w-[760px] border-collapse text-left text-[11px] sm:text-xs'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-1'>1re infraction</th>
                      <th className='py-2 pr-1'>2e infraction</th>
                      <th className='py-2 pr-1'>Délai</th>
                      <th className='py-2'>Effet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-white/5'>
                      <td className='py-2'>Crime ou délit puni 10 ans</td>
                      <td>Crime</td>
                      <td>Perpétuel</td>
                      <td>Réclusion perpétuité ou +10 ans</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2'>Crime ou délit puni 10 ans</td>
                      <td>Délit puni 10 ans</td>
                      <td>10 ans</td>
                      <td>Doublement</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2'>Crime ou délit puni 10 ans</td>
                      <td>Délit &lt; 10 ans &gt; 1 an</td>
                      <td>5 ans</td>
                      <td>Doublement</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2'>Délit &lt; 10 ans</td>
                      <td>Délit identique ou assimilé</td>
                      <td>5 ans</td>
                      <td>Doublement</td>
                    </tr>
                    <tr>
                      <td className='py-2'>Contravention 5e cl.</td>
                      <td>Même contravention</td>
                      <td>1 an</td>
                      <td>Amende portée à 3 000 €</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              <p>
                Infractions assimilées [art. 132-16 à 132-16-5 C.P.] : liste au fascicule F10 — vol, extorsion, escroquerie,
                agressions sexuelles, délits routiers, etc.
              </p>
              <p>
                <span className='text-white'>Non bis in idem :</span> un même fait ne reçoit pas deux qualifications sauf
                infractions distinctes ; qualifications incompatibles ou absorbantes — TODO : préciser avec F10.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
