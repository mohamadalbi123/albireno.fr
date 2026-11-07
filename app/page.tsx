import {estimatorPath} from "@/lib/estimator-path.mjs";
import { business } from "@/lib/business";
import Link from "next/link";
import { Button, Eyebrow, ContactCTA } from "@/components/ui";
import { ServiceCards } from "@/components/service-cards";
import { ProjectImage } from "@/components/project-image";
import { publishedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
import { editorialImages } from "@/lib/inspiration";
import { PricingOverview } from "@/components/pricing-overview";
import { HowItWorks } from "@/components/how-it-works";
export const metadata = pageMetadata(
  "Installation et pose de cuisine à La Rochelle — Conception 3D",
  "Conception 3D, installation et pose de cuisine à La Rochelle : préparez votre projet IKEA, Leroy Merlin ou autre fournisseur. Activité en préparation.",
  "/",
);
export default function Home() {
  const kitchen = publishedProjects[0];
  return (
    <>
      <section className="hero kitchen-hero container">
        <div className="hero-copy">
          <div className="hero-headline">
            <Eyebrow>La Rochelle et ses alentours</Eyebrow>
            <h1>Votre cuisine, de la conception <em>à l’installation.</em></h1>
          </div>
          <div className="hero-intro">
            <p className="hero-description">Nous prenons les mesures, concevons votre cuisine en 3D et préparons son installation à La Rochelle et ses alentours. Vous choisissez et commandez votre cuisine chez le fournisseur de votre choix.</p>
            <div className="hero-actions">
              <Button href={estimatorPath}>Estimer ma pose</Button>
              <Button href="/contact" variant="outline">Nous contacter</Button>
              <Link className="text-link" href="/realisations">Voir nos réalisations <span>↗</span></Link>
            </div>
            <p className="quiet-note">Vous achetez et organisez la livraison directement avec votre fournisseur. AlbiReno ne fournit ni ne livre les meubles.</p>
            <div className="hero-note"><span className="small-rule" />{business.preparationNotice}</div>
          </div>
        </div>
        <figure className="hero-photo editorial-hero-photo">
          <ProjectImage image={editorialImages.hero} priority sizes="(max-width: 700px) 100vw, (max-width: 1440px) 92vw, 1320px" />
          <figcaption>
            <span>UNE INSPIRATION POUR VOTRE CUISINE</span>
            <p>Imaginez un espace à votre mesure.</p>
            <small className="media-disclosure">Illustration IA</small>
          </figcaption>
        </figure>
        <div className="hero-bottom">
          <span>CONCEPTION · INSTALLATION</span>
          <span>Conception 3D et pose de cuisine</span>
        </div>
      </section>
      <HowItWorks />
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-top">
            <div>
              <Eyebrow>Un besoin, une première idée</Eyebrow>
              <h2>
                Quel est votre
                <br />
                projet de cuisine ?
              </h2>
            </div>
            <p>
              Deux accompagnements, à choisir séparément ou ensemble : une conception adaptée à votre espace et une installation définie selon votre projet.
            </p>
          </div>
          <ServiceCards />
          <div className="unsure">
            <p>Un plan déjà finalisé ? L’installation peut être demandée directement.</p>
            <Link className="text-link" href="/contact">
              Nous contacter <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section container selected-project">
        <div className="section-top">
          <div>
            <Eyebrow>Photographies d’une cuisine aménagée</Eyebrow>
            <h2>
              Petite surface.
              <br />
              Grand soin du détail.
            </h2>
          </div>
          <Link href="/realisations" className="text-link">
            Découvrir les réalisations <span>↗</span>
          </Link>
        </div>
        <div className="project-feature">
          <Link
            href="/realisations/cuisine-optimisee"
            className="project-feature-image"
            aria-label="Découvrir le projet de cuisine — conception et aménagement"
          >
            <ProjectImage image={kitchen.images[1]} />
          </Link>
          <div className="project-feature-copy">
            <span className="tag">Photographies réelles · Hors chantier client</span>
            <p className="project-category">
              CONCEPTION · AMÉNAGEMENT · INSTALLATION
            </p>
            <h3>{kitchen.title}</h3>
            <p>{kitchen.description}</p>
            <ul className="project-points">
              <li>Une implantation réfléchie avec HomeStyler</li>
              <li>Un plan de travail prolongé en péninsule</li>
              <li>Des rangements intégrés sur trois côtés</li>
            </ul>
            <Button href="/realisations/cuisine-optimisee" variant="outline">
              Voir les solutions en détail
            </Button>
          </div>
        </div>
      </section>
      <PricingOverview />
      <ContactCTA />
    </>
  );
}
