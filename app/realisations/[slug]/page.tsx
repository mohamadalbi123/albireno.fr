import { notFound } from "next/navigation";
import { publishedProjects, projectKindLabels } from "@/lib/projects";
import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectGallery } from "@/components/project-gallery";
import { pageMetadata } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = publishedProjects.find((p) => p.slug === slug);
  return p
    ? pageMetadata(p.title, p.description, `/realisations/${p.slug}`)
    : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = publishedProjects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageIntro
        eyebrow={projectKindLabels[p.kind]}
        title={p.title}
        text={p.description}
      />
      <section className="container section">
        <ProjectGallery images={p.images} label={projectKindLabels[p.kind]} />
        <p className="case-study-context">Deux angles d’un même espace terminé. Ce projet personnel présente une démarche d’aménagement ; il ne constitue pas une référence de chantier client ni un comparatif avant-après.</p>
        <div className="project-tags">
          {p.services.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="project-details">
          {p.details.map((d) => (
            <div key={d.title}>
              <h2>{d.title}</h2>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
        {p.homestylerUrl && (
          <a
            className="button"
            href={p.homestylerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvrir la visite 3D sur HomeStyler ↗
          </a>
        )}
      </section>
      <ContactCTA />
    </>
  );
}
