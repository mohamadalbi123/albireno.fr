import { business } from "@/lib/business";
import Link from "next/link";
import { Button, Eyebrow, ContactCTA } from "@/components/ui";
import { ServiceCards } from "@/components/service-cards";
import { ProjectImage } from "@/components/project-image";
import { publishedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
import { editorialImages, inspirationDetails } from "@/lib/inspiration";
import { InspirationFigure } from "@/components/inspiration-figure";
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
            <div className="hero-brand">
              <strong>{business.name}</strong>
              <em>{business.descriptor}</em>
            </div>
            <Eyebrow>La Rochelle et ses alentours</Eyebrow>
            <h1>Votre cuisine, de la conception 3D <em>à l’installation.</em></h1>
          </div>
          <div className="hero-intro">
            <p className="hero-subtitle">Votre projet à La Rochelle et ses alentours.</p>
            <p className="hero-description">Nous concevons votre cuisine selon vos dimensions et vos envies. Vous choisissez et commandez vos meubles chez IKEA, Leroy Merlin ou le fournisseur de votre choix. Nous nous occupons ensuite de leur installation à La Rochelle et ses alentours.</p>
            <div className="hero-actions">
              <Button href="/devis?service=installation">Demander un devis</Button>
              <Button href="/testing" variant="outline">Estimer le prix de pose</Button>
              <Link className="text-link" href="/devis?service=conception">Concevoir ma cuisine <span>↗</span></Link>
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
            <small>Inspiration générée par IA · pas une réalisation ALBI RENO</small>
          </figcaption>
        </figure>
        <div className="hero-bottom">
          <span>CONCEPTION · INSTALLATION</span>
          <a href="#services">Trouver le point de départ de mon projet ↓</a>
        </div>
      </section>
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
            <Link className="text-link" href="/devis?service=complet">
              Concevoir et installer ma cuisine <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
      <HowItWorks />
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
      <section className="section container solutions-section">
        <div className="section-top">
          <div>
            <Eyebrow>Le regard ALBI RENO</Eyebrow>
            <h2>
              Chaque cuisine a ses défis.
              <br />
              <em>Nous avons des idées.</em>
            </h2>
          </div>
        </div>
        <div className="solutions-grid">
          <div className="solutions-story">
            <p className="large-copy">
              Chaque espace a son potentiel. Nous trouvons les solutions pour le
              révéler.
            </p>
            <p>
              Une petite surface, un angle difficile, des tuyaux apparents ou un
              agencement peu pratique ? Chaque cuisine présente ses propres
              contraintes. Notre approche consiste à analyser votre espace,
              à imaginer des solutions adaptées et à réaliser des aménagements qui
              allient fonctionnalité et esthétique.
            </p>
            <div className="solution-thumbnails">
              <InspirationFigure image={inspirationDetails.pullout} />
              <InspirationFigure image={inspirationDetails.drawers} />
            </div>
            <Button href="/conception-cuisine-3d" variant="outline">
              Explorer les possibilités
            </Button>
          </div>
          <div className="solution-principles">
            {[
              {
                title: "Comprendre l’espace",
                text: "Étudier les dimensions, les contraintes et les besoins. Repérer ce qui gêne et ce qui peut être conservé.",
              },
              {
                title: "Imaginer la solution",
                text: "Proposer des adaptations, des rangements et une implantation intelligente. Comparer les options avant de décider.",
              },
              {
                title: "Réaliser avec soin",
                text: "Installer et ajuster les éléments en respectant le projet validé et les contraintes techniques.",
              },
            ].map((s, i) => (
              <div key={s.title}>
                <span>0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
            <p className="quiet-note">
              Chaque adaptation est étudiée selon la configuration et la
              faisabilité du projet.
            </p>
          </div>
        </div>
      </section>
      <section className="planning-section">
        <div className="container planning">
          <div className="planning-process">
            <span className="plan-label">LES POINTS À ÉTUDIER EN 3D</span>
            <ol>
              {[
                "Les dimensions et les contraintes existantes",
                "Les zones de cuisson, de lavage et de préparation",
                "La circulation et l’ouverture des portes",
                "Les rangements et leur accessibilité",
                "Les volumes, les matériaux et les finitions",
                "Les choix compatibles avec votre budget",
              ].map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Eyebrow light>La 3D, quand elle vous aide à choisir</Eyebrow>
            <h2>
              Visualisez votre future cuisine <em>avant son installation.</em>
            </h2>
            <p>
              Préparez votre projet à distance à partir de vos dimensions et de vos photos. Nous pouvons étudier une première conception 3D avant que vous finalisiez votre commande chez le fournisseur, pour faciliter vos choix et limiter les rendez-vous inutiles en magasin.
            </p>
            <Button href="/conception-cuisine-3d" variant="cream">
              Découvrir la conception 3D
            </Button>
            <p className="planning-caption">
              La conception est un accompagnement réalisé par ALBI RENO, avec des outils de planification adaptés au projet. Les modalités et le périmètre de cet accompagnement seront précisés avant tout engagement. Les dimensions et la faisabilité devront être vérifiées avant l’installation.
            </p>
          </div>
        </div>
      </section>
      <PricingOverview />
      <ContactCTA />
    </>
  );
}
