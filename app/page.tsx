import { business } from "@/lib/business";
import Image from "next/image";
import Link from "next/link";
import { Button, Eyebrow, ContactCTA } from "@/components/ui";
import { ServiceCards } from "@/components/service-cards";
import { ProjectImage } from "@/components/project-image";
import { publishedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
import { PricingOverview } from "@/components/pricing-overview";
export const metadata = pageMetadata(
  "Installateur cuisine La Rochelle — installation et rénovation",
  "ALBI RENO : installation, rénovation, réparation et optimisation de cuisines à La Rochelle. Conception 3D et solutions adaptées aux petits espaces.",
  "/",
);
export default function Home() {
  const kitchen = publishedProjects[0];
  return (
    <>
      <section className="hero kitchen-hero container">
        <div className="hero-copy">
          <div className="hero-brand">
            <strong>{business.name}</strong>
            <em>{business.descriptor}</em>
          </div>
          <Eyebrow>La Rochelle & alentours</Eyebrow>
          <h1>
            Installation et <br />
            rénovation <br />
            de cuisines <br />
            <em>à La Rochelle</em>
          </h1>
          <p className="hero-subtitle">
            Votre cuisine, pensée pour votre espace.
          </p>
          <p className="hero-description">
            Installation de cuisines neuves, rénovation, optimisation des petits
            espaces et solutions d’aménagement personnalisées. Nous vous
            accompagnons pour créer une cuisine fonctionnelle, élégante et
            adaptée à votre quotidien.
          </p>
          <div className="hero-actions">
            <Button>Parler de mon projet</Button>
            <Link className="text-link" href="/realisations">
              Découvrir nos réalisations <span>↗</span>
            </Link>
          </div>
          <div className="hero-note">
            <span className="small-rule" />
            Des solutions intelligentes, même pour les petites cuisines.
          </div>
        </div>
        <figure className="hero-photo">
          <ProjectImage image={kitchen.images[0]} priority />
          <figcaption>
            <span>UN VRAI PROJET, DES SOLUTIONS CONCRÈTES</span>
            <Link href="/realisations/cuisine-optimisee">
              Une cuisine compacte, bien pensée.<span>↗</span>
            </Link>
            <small>Projet personnel · Photographie réelle</small>
          </figcaption>
        </figure>
        <div className="hero-bottom">
          <span>INSTALLATION · RÉNOVATION · AMÉNAGEMENT</span>
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
              Une installation complète ou un ajustement ciblé : commençons par
              ce qui compte pour vous.
            </p>
          </div>
          <ServiceCards />
          <div className="unsure">
            <p>Vous pouvez réunir plusieurs besoins dans une même demande.</p>
            <Link className="text-link" href="/devis?service=autre">
              Je ne sais pas par où commencer <span>↗</span>
            </Link>
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
              imaginer des solutions adaptées et réaliser des aménagements qui
              allient fonctionnalité et esthétique.
            </p>
            <div className="solution-thumbnails">
              {[
                {
                  src: "rangement-vertical",
                  alt: "Inspiration IA de rangement vertical",
                },
                {
                  src: "rangement-tournant",
                  alt: "Inspiration IA de rangement d’angle",
                },
              ].map((i) => (
                <figure key={i.src}>
                  <Image
                    src={`/images/optimisation/${i.src}.webp`}
                    alt={i.alt}
                    width={142}
                    height={160}
                  />
                  <figcaption>Inspiration · image IA</figcaption>
                </figure>
              ))}
            </div>
            <Button href="/optimisation-petite-cuisine" variant="outline">
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
            <span className="plan-label">VOTRE PROJET, ÉTAPE PAR ÉTAPE</span>
            <ol>
              {[
                "Visiter et mesurer l’espace",
                "Comprendre vos besoins et votre budget",
                "Imaginer l’implantation",
                "Visualiser en 3D avec HomeStyler",
                "Revoir la proposition ensemble",
                "Préparer un devis détaillé",
                "Planifier le projet validé",
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
              Votre future cuisine,
              <br />
              <em>avant les travaux.</em>
            </h2>
            <p>
              Un meuble déplacé, un passage plus fluide, un rangement
              supplémentaire. HomeStyler permet d’explorer une implantation et
              de mieux comprendre ce qu’elle change au quotidien.
            </p>
            <Button href="/conception-cuisine-3d" variant="cream">
              Découvrir la conception 3D
            </Button>
            <p className="planning-caption">
              Un service optionnel pour les projets qui le nécessitent. Une
              simple réparation n’a pas besoin d’une étude 3D.
            </p>
          </div>
        </div>
      </section>
      <section className="section container selected-project">
        <div className="section-top">
          <div>
            <Eyebrow>Un projet réel, en images</Eyebrow>
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
            aria-label="Découvrir la cuisine personnelle optimisée"
          >
            <ProjectImage image={kitchen.images[1]} />
          </Link>
          <div className="project-feature-copy">
            <span className="tag">Projet personnel</span>
            <p className="project-category">
              CONCEPTION · OPTIMISATION · INSTALLATION
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
      <section className="section process-section">
        <div className="container">
          <Eyebrow>Du premier échange aux derniers ajustements</Eyebrow>
          <h2>Avancer avec des idées claires.</h2>
          <div className="process-grid">
            {[
              {
                title: "Vous nous racontez.",
                text: "Choisissez vos besoins, partagez les contraintes de votre cuisine et vos envies. Un seul projet peut réunir plusieurs interventions.",
              },
              {
                title: "On étudie les options.",
                text: "Dimensions, état des meubles, accès, budget : nous précisons le périmètre et examinons les solutions adaptées.",
              },
              {
                title: "Vous décidez.",
                text: "Une proposition détaillée, un périmètre convenu et une organisation définie avant l’intervention.",
              },
            ].map((p, i) => (
              <div key={p.title}>
                <span className="process-number">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="values-row">
            <span>Des choix expliqués</span>
            <span>Le souci du détail</span>
            <span>Le respect de votre espace</span>
            <span>Une communication organisée</span>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
