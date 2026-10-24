import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectGallery } from "@/components/project-gallery";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Réalisations et transformations intérieures",
  "La galerie des réalisations de Luna Plâtrerie est en préparation. Retrouvez bientôt les photos de chantiers et les transformations avant et après travaux.",
  "/realisations",
);
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Réalisations"
        title="Les espaces changent. La vie aussi."
        text="Une nouvelle pièce, des volumes repensés, un intérieur qui vous ressemble. Découvrez bientôt nos réalisations en images."
      />
      <section className="section container">
        <ProjectGallery projects={projects.filter((p) => p.published)} />
      </section>
      <ContactCTA />
    </>
  );
}
