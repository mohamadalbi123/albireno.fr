export type ProjectKind =
  | "personal"
  | "own-business"
  | "client"
  | "concept"
  | "inspiration";
export type ProjectImage = {
  src: string;
  alt: string;
  role: "before" | "original" | "design" | "finished" | "inspiration";
  width: number;
  height: number;
};
export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  category: string;
  description: string;
  services: string[];
  images: ProjectImage[];
  location?: string;
  homestylerUrl?: string;
  published: boolean;
  details: { title: string; text: string }[];
};
export const projectKindLabels: Record<ProjectKind, string> = {
  personal: "Projet personnel",
  "own-business": "Projet pour notre activité",
  client: "Projet client",
  concept: "Concept d’aménagement",
  inspiration: "Inspiration",
};
export const projects: Project[] = [
  {
    slug: "cuisine-optimisee",
    title: "Une cuisine compacte, optimisée et fonctionnelle",
    kind: "personal",
    category: "Cuisine & rangement",
    published: true,
    description:
      "Une cuisine personnelle pensée autour des gestes du quotidien. Des façades grises, un plan de travail clair et des rangements répartis sur trois côtés composent un espace compact et fonctionnel.",
    services: [
      "Conception avec HomeStyler",
      "Conception de l’implantation",
      "Sélection des matériaux",
      "Optimisation des rangements",
      "Montage des meubles et installation",
    ],
    images: [
      {
        src: "/images/projects/kitchen/cuisine-01.webp",
        alt: "Cuisine personnelle : façades grises, plan de travail clair et retour en péninsule",
        role: "finished",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/projects/kitchen/cuisine-02.webp",
        alt: "Vue intérieure de la cuisine avec rangements en U et plan de travail autour de l’évier",
        role: "finished",
        width: 1200,
        height: 1600,
      },
    ],
    details: [
      {
        title: "Le défi : faire tenir les usages",
        text: "La disposition rapproche les zones de cuisson, de lavage et de préparation, tout en conservant un passage central.",
      },
      {
        title: "Les choix : une lecture claire de l’espace",
        text: "Les façades grises sont associées à un plan de travail clair à effet marbré et à un sol gris. Le contraste donne une lecture simple de l’espace.",
      },
      {
        title: "La solution : prolonger sans encombrer",
        text: "Le retour en péninsule prolonge le plan de travail et accueille des rangements. Les meubles hauts complètent la capacité de stockage.",
      },
      {
        title: "Du plan à l’installation",
        text: "Après une conception avec HomeStyler et une réflexion sur l’implantation, le montage et l’agencement donnent forme à cette cuisine personnelle. Les deux photographies présentent le même espace terminé, sous deux angles.",
      },
    ],
  },
  {
    slug: "lazoya-beauty-center",
    title: "Lazoya Beauty Center",
    kind: "own-business",
    category: "Espace professionnel",
    published: false,
    description: "Contenu et photographies en attente de validation.",
    services: [],
    images: [],
    details: [],
    homestylerUrl:
      "https://3d.homestyler.com/shareviewer/index.html?assetId=5a59999f-0640-4366-9e93-cd8924b68203&lang=en_US",
  },
];
export const publishedProjects = projects.filter((p) => p.published);
