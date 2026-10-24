import Link from "next/link";
import { publishedProjects, projectKindLabels } from "@/lib/projects";
import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectImage } from "@/components/project-image";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Réalisations et projets personnels",
  "Des espaces réellement conçus et installés. Découvrez une cuisine personnelle optimisée et ses détails d’aménagement.",
  "/realisations",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="Le portfolio"
        title="Des espaces à vivre."
        text="Chaque projet a son histoire. Les projets personnels, concepts et réalisations professionnelles sont identifiés pour vous donner un regard juste sur notre travail."
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
