import {
  PageIntro,
  Eyebrow,
  ContactCTA,
  PhotoPlaceholder,
} from "@/components/ui";
import { Icon } from "@/components/icon";
import { business } from "@/lib/business";
import { pageMetadata, isPreview } from "@/lib/site";
export const metadata = pageMetadata(
  "Votre entreprise de plâtrerie à Aytré",
  "Faites connaissance avec Luna Plâtrerie, entreprise de plâtrerie installée à Aytré, près de La Rochelle. Un premier échange pour comprendre votre projet.",
  "/a-propos",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="À propos de Luna"
        title="Votre intérieur. Une rencontre. Un projet."
        text="Derrière un aménagement, il y a d’abord une façon de vivre. Prenons le temps de comprendre la vôtre."
      />
      <section className="section container about-page-grid">
        <PhotoPlaceholder label="Portrait de l’artisan à venir" />
        <div>
          <Eyebrow>De la proximité, avant tout</Eyebrow>
          <h2>
            Luna Plâtrerie,
            <br />à deux pas de chez vous.
          </h2>
          <p>
            Installée au {business.address} à Aytré, Luna Plâtrerie intervient
            dans le secteur de La Rochelle pour les projets de plâtrerie et de
            rénovation intérieure.
          </p>
          <p>
            Le premier échange est l’occasion de parler de votre logement, de
            vos attentes et des contraintes du chantier. À partir de ces
            éléments, nous pouvons préciser les travaux à envisager.
          </p>
          {business.founder && <p>{business.founder}</p>}
          {business.experience && <p>{business.experience}</p>}
          {business.qualifications && <p>{business.qualifications}</p>}
          {isPreview && !business.founder && (
            <div className="editorial-notice">
              <strong>Le portrait de l’artisan arrive bientôt</strong>
              <p>
                Présentation du fondateur, parcours et qualifications :
                informations à compléter avec l’entreprise.
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="process-section">
        <div className="container">
          <Eyebrow>Notre approche</Eyebrow>
          <h2>Le projet se construit ensemble.</h2>
          <div className="process-grid">
            {[
              {
                icon: "chat",
                title: "Comprendre",
                text: "Partir de vos besoins, de l’existant et de vos habitudes au quotidien.",
              },
              {
                icon: "ruler",
                title: "Préciser",
                text: "Définir le périmètre des travaux et les questions techniques à résoudre.",
              },
              {
                icon: "home",
                title: "Se projeter",
                text: "Échanger sur les étapes du chantier avant de convenir de la suite.",
              },
            ].map((v) => (
              <div key={v.title}>
                <Icon name={v.icon} width={32} height={32} />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
