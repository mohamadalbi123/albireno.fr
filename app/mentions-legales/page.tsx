import { PageIntro } from "@/components/ui";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Mentions légales",
  "Identification de l’éditeur du site ALBI RENO.",
  "/mentions-legales",
  true,
);
export default function Legal() {
  return (
    <>
      <PageIntro
        eyebrow="Informations légales"
        title="Mentions légales"
        text="Informations relatives à l’éditeur et au fonctionnement du site ALBI RENO."
      />
      <article className="container legal-copy section">
        <h2>Éditeur du site</h2>
        <p>
          {business.legalName}, {business.legalForm}. ALBI RENO est le nom
          utilisé pour ce projet d’activité cuisine en préparation, porté par
          la même micro-entreprise que Chambre 17, avec le même SIRET.
        </p>
        <p>
          SIREN : {business.siren}. SIRET : {business.siret}.
        </p>
        <p>
          Adresse professionnelle : <bdi dir="ltr">{business.professionalAddress}</bdi>
        </p>
        <p>
          Responsable de publication : {business.publicationDirector}. Contact :{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> —{" "}
          {business.phone}.
        </p>
        <h2>Activité</h2>
        <p>
          Selon les informations communiquées par l’exploitant, l’ajout de l’activité cuisine est en attente de signature INPI et de validation administrative. Son immatriculation pour ces activités n’est pas confirmée.
          Aucune qualification professionnelle ni couverture d’assurance pour
          ces activités n’est revendiquée sur ce site.
        </p>
        <h2>Hébergement</h2>
        <p>
          Hébergement du site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
          91723, États-Unis. <a href="https://vercel.com">vercel.com</a>.
          Contact juridique publié par l’hébergeur (agent DMCA) :{" "}
          <a href="tel:+15592887060">+1 559 288 7060</a>, selon sa{" "}
          <a href="https://vercel.com/legal/dmca-policy">politique DMCA</a>.
        </p>
        <h2>Demandes et prestations</h2>
        <p>
          Le site présente un projet d’activité en préparation et permet un
          premier échange. Aucune prestation payante, commande ou réservation
          d’intervention n’est proposée à ce stade. Le démarrage de l’activité
          reste soumis aux démarches et aux conditions applicables, à confirmer
          avant toute proposition commerciale.
        </p>
        <h2>Photographies et réalisations</h2>
        <p>
          Les photographies de cuisine fournies par le responsable du projet
          présentent un projet de conception et d’aménagement, illustré par des vues de l’espace terminé. Les vues 3D du projet en cours à Rochefort ne sont pas des photographies de travaux réalisés. Les visuels d’inspiration sont
          identifiés comme tels et ne représentent pas de réalisations pour des clients.
        </p>
      </article>
    </>
  );
}
