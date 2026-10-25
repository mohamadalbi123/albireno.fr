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
          utilisé pour ce projet de services de cuisine. Nom commercial de
          l’entreprise existante : Chambre 17.
        </p>
        <p>
          SIRET : {business.siret}. Établissement enregistré : 17140 Lagord,
          France. L’adresse professionnelle complète reste à préciser.
        </p>
        <p>
          Responsable de publication : {business.publicationDirector}. Contact :{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> —{" "}
          {business.phone}.
        </p>
        <h2>Activité</h2>
        <p>
          L’activité actuellement déclarée de Chambre 17 concerne la
          programmation informatique (APE 62.01Z). L’ajout des activités de
          cuisine est en cours de préparation par l’exploitant. Aucune
          certification ni couverture d’assurance pour ces activités n’est
          revendiquée sur ce site.
        </p>
        <h2>Hébergement</h2>
        <p>
          Hébergement prévu : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
          91723, États-Unis. <a href="https://vercel.com">vercel.com</a>.
        </p>
        <h2>Demandes et prestations</h2>
        <p>
          Le site permet de préparer une demande et de prendre contact. Aucun
          paiement ni commande ferme n’est effectué en ligne. Le périmètre, la
          disponibilité et les conditions applicables sont à confirmer
          directement avant tout engagement.
        </p>
        <h2>Photographies et réalisations</h2>
        <p>
          Les photographies de cuisine fournies par le responsable du projet
          présentent un projet personnel. Les visuels d’inspiration sont
          identifiés comme tels et ne représentent pas des réalisations clients.
        </p>
      </article>
    </>
  );
}
