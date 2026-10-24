import Link from "next/link";
import { Button, Eyebrow, ContactCTA } from "@/components/ui";
import { ServiceCards } from "@/components/service-cards";
import { ProjectImage } from "@/components/project-image";
import { publishedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Aménagement, rénovation et installation à La Rochelle",
  "Du montage de meubles à la conception 3D : des espaces réfléchis pour votre quotidien à La Rochelle et en Charente-Maritime.",
  "/",
);
export default function Home() {
  const kitchen = publishedProjects[0];
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>La Rochelle & ses environs</Eyebrow>
          <h1>
            Aménagement, <br />
            rénovation et <br />
            installation <br />
            <em>à La Rochelle</em>
          </h1>
          <p className="hero-description">
            Donnez une nouvelle dimension à votre intérieur. Du montage de
            meubles à la rénovation, en passant par la conception 3D et le
            mobilier sur mesure, nous vous accompagnons dans vos projets.
          </p>
          <div className="hero-actions">
            <Button href="#services">Quel est votre projet ?</Button>
            <Link className="text-link" href="/realisations">
              Voir le projet cuisine <span>↗</span>
            </Link>
          </div>
          <div className="hero-note">
            <span className="small-rule" />
            Des idées justes. Des espaces à vivre.
          </div>
        </div>
        <figure className="hero-photo">
          <ProjectImage image={kitchen.images[0]} priority />
          <figcaption>
            <span>01 / INTÉRIEUR VÉCU</span>
            <Link href="/realisations/cuisine-optimisee">
              Une cuisine, chaque détail pensé.<span>↗</span>
            </Link>
            <small>Projet personnel · Photographie réelle</small>
          </figcaption>
        </figure>
        <div className="hero-bottom">
          <span>CONCEVOIR. INSTALLER. TRANSFORMER.</span>
          <a href="#services">Découvrir nos expertises ↓</a>
        </div>
      </section>
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-top">
            <div>
              <Eyebrow>À chaque projet, son point de départ</Eyebrow>
              <h2>Quel est votre projet ?</h2>
            </div>
            <p>
              Du simple montage à la transformation complète de votre espace.
            </p>
          </div>
          <ServiceCards />
          <div className="unsure">
            <p>Une envie, mais pas encore de plan précis ?</p>
            <Link className="text-link" href="/devis">
              Je ne sais pas par où commencer <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section container approach">
        <div>
          <Eyebrow>Notre regard</Eyebrow>
          <h2>
            Le beau n’est pas
            <br />
            une question de
            <br />
            <em>mètres carrés.</em>
          </h2>
        </div>
        <div className="approach-copy">
          <p className="large-copy">
            Un intérieur réussi commence par une bonne idée, pas par une grande
            surface.
          </p>
          <p>
            Un rangement qui libère de la place. Une cuisine qui facilite les
            gestes. Une pièce dans laquelle on se sent bien. Notre approche part
            de votre quotidien pour donner du sens à chaque choix.
          </p>
          <p>
            Nous pensons les usages, les matières et les détails ensemble, avec
            un périmètre clair et une attention portée à votre budget.
          </p>
          <Button href="/notre-approche" variant="outline">
            Découvrir notre approche
          </Button>
        </div>
      </section>
      <section className="planning-section">
        <div className="container planning">
          <div className="planning-process">
            <span className="plan-label">DE L’IDÉE AU PROJET</span>
            <ol>
              {[
                "Comprendre vos besoins",
                "Relever les dimensions",
                "Concevoir en 3D",
                "Ajuster la proposition",
                "Préparer le devis",
                "Planifier les travaux validés",
              ].map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <span className="plan-foot">
              UNE VISION PARTAGÉE, AVANT DE COMMENCER.
            </span>
          </div>
          <div>
            <Eyebrow light>Conception & projection 3D</Eyebrow>
            <h2>
              Imaginez votre espace
              <br />
              <em>avant les travaux.</em>
            </h2>
            <p>
              Explorer une implantation, comparer les volumes, trouver la bonne
              place pour chaque meuble. La 3D rend vos idées plus concrètes et
              aide à décider ensemble.
            </p>
            <Button href="/conception-3d" variant="cream">
              Découvrir la conception 3D
            </Button>
            <p className="planning-caption">
              Le concept guide les choix. Les dimensions et contraintes
              techniques restent à vérifier sur place.
            </p>
          </div>
        </div>
      </section>
      <section className="section container selected-project">
        <div className="section-top">
          <div>
            <Eyebrow>Un espace, une histoire</Eyebrow>
            <h2>Du dessin au quotidien.</h2>
          </div>
          <Link href="/realisations" className="text-link">
            Explorer les réalisations <span>↗</span>
          </Link>
        </div>
        <div className="project-feature">
          <Link
            href="/realisations/cuisine-optimisee"
            className="project-feature-image"
            aria-label="Découvrir la cuisine optimisée"
          >
            <ProjectImage image={kitchen.images[1]} />
          </Link>
          <div className="project-feature-copy">
            <span className="tag">Projet personnel</span>
            <p className="project-category">
              CUISINE · AMÉNAGEMENT · INSTALLATION
            </p>
            <h3>{kitchen.title}</h3>
            <p>{kitchen.description}</p>
            <ul className="project-points">
              <li>Une implantation en U</li>
              <li>Un plan de travail prolongé</li>
              <li>Des rangements intégrés à l’espace</li>
            </ul>
            <Button href="/realisations/cuisine-optimisee" variant="outline">
              Entrer dans le projet
            </Button>
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <Eyebrow>Simple, du premier échange au dernier détail</Eyebrow>
          <h2>Un projet bien accompagné.</h2>
          <div className="process-grid">
            {[
              {
                title: "On vous écoute.",
                text: "Vos envies, vos usages, vos contraintes. Nous commençons par comprendre ce qui compte pour vous.",
              },
              {
                title: "On précise ensemble.",
                text: "Périmètre, choix des matériaux et visualisation si utile : les décisions se préparent avant le devis.",
              },
              {
                title: "On organise la suite.",
                text: "Une proposition à examiner, des étapes définies et des interventions planifiées après validation.",
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
