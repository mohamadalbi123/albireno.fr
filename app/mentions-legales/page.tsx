import { PageIntro } from "@/components/ui";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Mentions légales — version de travail",
  "Informations légales de la version préparatoire du site. Identification de la future activité ALBI RENO en attente de validation.",
  "/mentions-legales",
  true,
);
export default function Legal() {
  return (
    <>
      <PageIntro
        eyebrow="Version préparatoire"
        title="Mentions légales"
        text="Ce site est un prototype local non publié. Les informations légales de la future activité ALBI RENO restent à valider avant ouverture au public."
      />
      <article className="container legal-copy section">
        <h2>Responsable du projet</h2>
        <p>
          Mohamad Albi. Contact :{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a>.
        </p>
        <h2>Activité existante et activité envisagée</h2>
        <p>
          L’activité actuellement déclarée sous le nom commercial Chambre 17
          concerne le développement de sites et d’applications web (APE 62.01Z),
          sous le régime de l’entrepreneur individuel, micro-entreprise. Elle ne
          vaut pas confirmation d’une immatriculation ou d’une assurance pour
          les prestations de rénovation et d’installation de cuisines présentées
          dans cette maquette.
        </p>
        <h2>Informations à compléter avant publication</h2>
        <p>
          La dénomination définitive, l’adresse professionnelle, les mentions
          d’immatriculation applicables, le responsable de publication,
          l’hébergeur, les conditions contractuelles et les informations propres
          aux activités effectivement proposées devront être validés. Aucune
          certification ni couverture d’assurance n’est revendiquée par ce
          prototype.
        </p>
        <h2>Photographies et réalisations</h2>
        <p>
          Les photographies de cuisine ont été fournies par le responsable du
          projet et représentent un projet personnel. Les droits et
          autorisations de publication devront être confirmés avant le lancement
          public.
        </p>
      </article>
    </>
  );
}
