import { PageIntro, ContactCTA, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Notre approche — des solutions pour votre cuisine",
  "ALBI RENO : comprendre vos usages, résoudre les difficultés d’aménagement et concevoir une cuisine fonctionnelle à La Rochelle.",
  "/notre-approche",
);
export default function Approach() {
  return (
    <>
      <PageIntro
        eyebrow="L’esprit ALBI RENO"
        title="Une belle cuisine commence par une bonne compréhension de votre espace."
        text="Votre cuisine, de la conception à l’installation. Des solutions intelligentes pour chaque cuisine, même les plus petites."
      />
      <section className="container section detail-grid">
        <div>
          <Eyebrow>Une approche concrète</Eyebrow>
          <h2>Penser aux gestes autant qu’aux meubles.</h2>
          <p className="lead">
            Préparer un repas, ranger les courses, ouvrir un tiroir sans gêner
            le passage : une cuisine réussie facilite le quotidien.
          </p>
          <p>
            ALBI RENO est le projet porté par Mohamad Albi autour d’une
            conviction : comprendre les contraintes d’un espace permet
            d’envisager de meilleures solutions. Le projet personnel présenté
            dans le portfolio en donne un exemple concret.
          </p>
          <p>
            Nous cherchons à conserver ce qui fonctionne, à améliorer ce qui
            gêne et à concentrer l’effort sur les changements utiles. Une petite
            cuisine mérite autant de réflexion qu’une grande.
          </p>
        </div>
        <div className="approach-values">
          <h3>Analyser avant de proposer</h3>
          <p>
            Dimensions, angles, réseaux et habitudes d’usage : le projet se
            construit à partir de l’existant.
          </p>
          <h3>Rendre les choix lisibles</h3>
          <p>
            Expliquer les options et leurs limites. Utiliser une visualisation
            3D lorsqu’elle facilite la décision.
          </p>
          <h3>Préciser le cadre</h3>
          <p>
            Un périmètre et un devis détaillés avant l’intervention, des
            échanges organisés et une attention portée aux finitions.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
