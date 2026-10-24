import { PageIntro, ContactCTA, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Notre approche de l’aménagement",
  "Penser les usages avant les mètres carrés : une approche pratique, attentive aux détails et aux priorités de votre projet.",
  "/notre-approche",
);
export default function Approach() {
  return (
    <>
      <PageIntro
        eyebrow="Notre approche"
        title="Le beau n’est pas une question de mètres carrés."
        text="Des espaces bien pensés devraient pouvoir s’adapter à différents logements, usages et budgets."
      />
      <section className="container section detail-grid">
        <div>
          <Eyebrow>Partir de ce qui compte</Eyebrow>
          <h2>Votre quotidien comme point de départ.</h2>
          <p className="lead">
            Une belle pièce doit aussi être agréable à utiliser. Avant de
            choisir une couleur ou un meuble, nous nous intéressons à la façon
            dont vous habitez l’espace.
          </p>
          <p>
            Nous cherchons des solutions cohérentes : garder ce qui fonctionne,
            améliorer ce qui gêne et concentrer l’effort sur les changements
            utiles.
          </p>
        </div>
        <div className="approach-values">
          <h3>Rendre les choix lisibles</h3>
          <p>
            Expliquer les options, leurs contraintes et leur place dans le
            projet.
          </p>
          <h3>Préparer avant d’intervenir</h3>
          <p>
            Préciser les dimensions, les matériaux et le périmètre. Utiliser la
            3D quand elle aide à décider.
          </p>
          <h3>Avancer avec un cadre clair</h3>
          <p>
            Définir une proposition et un calendrier ensemble, après examen du
            projet.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
