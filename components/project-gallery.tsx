"use client";
import Image from "next/image";
import { useState } from "react";
import { type Project } from "@/lib/projects";
import { PhotoPlaceholder } from "./ui";
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("Tous les projets");
  const types = [
    "Tous les projets",
    ...new Set(projects.map((p) => p.workType)),
  ];
  return (
    <>
      {projects.length > 0 ? (
        <>
          <div
            className="gallery-filters"
            aria-label="Filtrer les réalisations"
          >
            {types.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="project-list">
            {projects
              .filter(
                (p) => filter === "Tous les projets" || p.workType === filter,
              )
              .map((p) => (
                <article key={p.slug}>
                  <div className="project-photos">
                    <figure>
                      <Image
                        src={p.before}
                        alt={p.beforeAlt}
                        width={900}
                        height={675}
                        sizes="(max-width: 700px) 100vw, 50vw"
                      />
                      <figcaption>Avant</figcaption>
                    </figure>
                    <figure>
                      <Image
                        src={p.after}
                        alt={p.afterAlt}
                        width={900}
                        height={675}
                        sizes="(max-width: 700px) 100vw, 50vw"
                      />
                      <figcaption>Après</figcaption>
                    </figure>
                  </div>
                  <p className="eyebrow">
                    {p.location} · {p.workType}
                  </p>
                  <h2>{p.title}</h2>
                  <p>{p.description}</p>
                </article>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="before-after">
            <div>
              <PhotoPlaceholder label="Le point de départ" />
              <span className="photo-chip">AVANT</span>
            </div>
            <div>
              <PhotoPlaceholder label="Le nouvel intérieur" kind="after" />
              <span className="photo-chip">APRÈS</span>
            </div>
            <span className="comparison-center" aria-hidden="true">
              ↔
            </span>
          </div>
          <div className="gallery-empty">
            <span className="eyebrow">Les images arrivent bientôt</span>
            <h2>
              De vrais chantiers.
              <br />
              Bientôt, de vraies images.
            </h2>
            <p>
              Nous préparons les photos et les descriptions de nos réalisations.
              Cet espace accueillera uniquement des projets réellement réalisés
              par Luna Plâtrerie.
            </p>
          </div>
        </>
      )}
    </>
  );
}
