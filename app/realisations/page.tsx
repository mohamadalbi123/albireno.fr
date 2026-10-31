import Link from "next/link";
import { publishedProjects, projectKindLabels } from "@/lib/projects";
import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectImage } from "@/components/project-image";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Réalisations et projets de cuisine",
  "Découvrez un projet de conception et d’aménagement de cuisine, ainsi qu’un projet en cours à Rochefort présenté en vues 3D.",
  "/realisations",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="Le portfolio"
        title="Des cuisines pensées pour la vie."
        text="Un projet de conception et d’aménagement, illustré par des photographies de l’espace terminé, et un projet en cours à Rochefort, présenté en vues 3D : chaque projet précise la nature de ses images."
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
