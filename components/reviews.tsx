import { business } from "@/lib/business";
import { Button, Eyebrow } from "./ui";
export function Reviews() {
  return (
    <section className="reviews-section container">
      <div>
        <Eyebrow>Vos retours comptent</Eyebrow>
        <h2>
          La confiance se construit.
          <br />
          Les avis se partagent.
        </h2>
        <p>
          Découvrez les retours publiés par nos clients sur notre fiche Google.
          Leurs expériences vous aideront à préparer votre projet.
        </p>
        <Button href={business.googleProfile} external variant="outline">
          Consulter les avis Google
        </Button>
      </div>
      <div className="google-card">
        <div className="google-card-top">
          <span className="google-word">
            <i>G</i>
            <i>o</i>
            <i>o</i>
            <i>g</i>
            <i>l</i>
            <i>e</i>
          </span>
          <span>Avis clients</span>
        </div>
        <p>
          Votre prochain projet
          <br />
          commence par
          <br />
          <strong>la confiance.</strong>
        </p>
        <div className="google-card-bottom">
          <span>Luna Plâtrerie</span>
          <span>Aytré, Charente-Maritime</span>
        </div>
      </div>
    </section>
  );
}
