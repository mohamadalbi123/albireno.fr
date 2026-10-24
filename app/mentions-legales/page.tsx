import { PageIntro } from "@/components/ui";
import { business } from "@/lib/business";
import { contactEmail, contactPhone, pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Mentions légales",
  "Informations sur l’éditeur du site Luna Plâtrerie, la conception et l’hébergement.",
  "/mentions-legales",
  !business.legalApproved,
);
export default function LegalPage() {
  return (
    <>
      <PageIntro
        eyebrow="Informations du site"
        title="Mentions légales"
        text="Identification de l’éditeur, conception et hébergement du site."
      />
      <article className="prose container">
        {!business.legalApproved && (
          <div className="editorial-notice">
            <strong>
              Document préparatoire — à compléter avant publication
            </strong>
            <p>
              Les informations signalées ci-dessous doivent être confirmées par
              l’entreprise. Cette version ne constitue pas des mentions légales
              finalisées.
            </p>
          </div>
        )}
        <h2>Éditeur du site</h2>
        <dl>
          <dt>Nom commercial</dt>
          <dd>{business.name}</dd>
          <dt>Raison sociale / identité de l’entrepreneur</dt>
          <dd>{business.legalName || "À confirmer par l’entreprise"}</dd>
          <dt>Forme juridique</dt>
          <dd>{business.legalForm || "À confirmer par l’entreprise"}</dd>
          <dt>Adresse</dt>
          <dd>
            {business.address}, {business.postalCode} {business.city}, France
          </dd>
          <dt>SIRET</dt>
          <dd>{business.siret || "À compléter avant mise en ligne"}</dd>
          <dt>TVA intracommunautaire</dt>
          <dd>{business.vat || "Numéro ou régime applicable à confirmer"}</dd>
          <dt>Téléphone</dt>
          <dd>{contactPhone || "Numéro d’appel à confirmer"}</dd>
          <dt>E-mail</dt>
          <dd>{contactEmail || "Adresse professionnelle à fournir"}</dd>
          <dt>Responsable de publication</dt>
          <dd>{business.publicationDirector || "À compléter"}</dd>
        </dl>
        <h2>Conception</h2>
        <p>
          Site conçu et développé par{" "}
          <a
            href="https://chambre17.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chambre 17
          </a>
          .
        </p>
        <h2>Hébergement</h2>
        <p>
          Hébergement prévu : Vercel. Les coordonnées complètes de l’hébergeur
          et le domaine définitif seront renseignés après confirmation du
          déploiement.
        </p>
        <h2>Informations professionnelles</h2>
        <p>
          {business.insurance ||
            "Les informations relatives à l’assurance professionnelle, à son périmètre et, le cas échéant, aux qualifications seront ajoutées après vérification des justificatifs."}
        </p>
        <h2>Contenus et visuels</h2>
        <p>
          Les illustrations sont des éléments de présentation. Les emplacements
          sans photographie ne représentent pas des chantiers réalisés. Les
          droits de diffusion des futures photographies devront être vérifiés
          avant leur publication.
        </p>
        <h2>Médiation de la consommation</h2>
        <p>
          Le nom, les coordonnées et le site du médiateur compétent sont à
          renseigner par l’entreprise avant la mise en ligne définitive, selon
          ses obligations applicables.
        </p>
        <h2>Données personnelles</h2>
        <p>
          Pour connaître les modalités de traitement des données, consultez la{" "}
          <a href="/confidentialite">politique de confidentialité</a>.
        </p>
      </article>
    </>
  );
}
