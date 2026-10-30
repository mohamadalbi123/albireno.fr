import Link from "next/link";
import { publishedProjects, projectKindLabels } from "@/lib/projects";
import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectImage } from "@/components/project-image";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Réalisations et projets de cuisine",
  "Découvrez une cuisine personnelle réalisée et un projet en cours à Rochefort, présenté en vues 3D.",
  "/realisations",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="Le portfolio"
        title="Des cuisines pensées pour la vie."
        text="Une cuisine personnelle réalisée et un projet en cours à Rochefort : des démarches différentes, présentées avec leur contexte et leurs choix d’aménagement."
      />
      <section className="container section portfolio-grid">
        {publishedProjects.map((p) => (
          <article key={p.slug}>
            <Link href={`/realisations/${p.slug}`}>
              <ProjectImage image={p.images[0]} />
              <span className="tag">{projectKindLabels[p.kind]}</span>
              <h2>{p.title} ↗</h2>
            </Link>
            <p>{p.description}</p>
          </article>
        ))}
      </section>
      <ContactCTA />
    </>
  );
}
