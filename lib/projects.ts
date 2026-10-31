export type ProjectKind =
  | "personal"
  | "own-business"
  | "client"
  | "concept"
  | "in-progress"
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
  indexable?: boolean;
  context?: string;
  details: { title: string; text: string }[];
};
export const projectKindLabels: Record<ProjectKind, string> = {
  personal: "Conception & aménagement",
  "own-business": "Projet pour notre activité",
  client: "Projet client",
  concept: "Concept d’aménagement",
  "in-progress": "Projet en cours · Vues 3D",
  inspiration: "Inspiration",
};
export const projects: Project[] = [
  {
    slug: "cuisine-optimisee",
    title: "Projet de cuisine — Conception & aménagement",
    kind: "personal",
    category: "Cuisine et rangement",
    published: true,
    context: "Deux angles d’un même espace terminé. Ce projet présente une démarche de conception et d’aménagement ; il ne constitue pas une référence de chantier client ni un comparatif avant-après.",
    description:
      "Étude de l’espace, conception 3D et optimisation de l’agencement pour une cuisine fonctionnelle et adaptée aux besoins du projet.",
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
        alt: "Cuisine aménagée : façades grises, plan de travail clair et retour en péninsule",
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
        title: "Le défi : réunir toutes les fonctions dans un espace réduit",
        text: "La disposition rapproche les zones de cuisson, de lavage et de préparation, tout en conservant un passage central.",
      },
      {
        title: "Les choix : une lecture claire de l’espace",
        text: "Les façades grises sont associées à un plan de travail clair à effet marbré et à un sol gris. Le contraste donne une lecture simple de l’espace.",
      },
      {
        title: "La solution : prolonger sans encombrer",
        text: "Le retour en péninsule ajoute une zone de préparation tout en gardant les rangements accessibles depuis l’intérieur du U. Les meubles hauts utilisent la hauteur disponible. La circulation centrale et l’ouverture des portes restent des points à vérifier lors du choix d’une implantation.",
      },
      {
        title: "Du plan à l’installation",
        text: "Après une conception avec HomeStyler et une réflexion sur l’implantation, le montage et l’agencement donnent forme à cette cuisine. Les deux photographies présentent le même espace terminé, sous deux angles.",
      },
    ],
  },
  {
    slug: "cuisine-rochefort",
    title: "Cuisine à Rochefort — un projet en cours",
    kind: "in-progress",
    category: "Conception de cuisine",
    location: "Rochefort",
    published: true,
    indexable: false,
    description: "Deux vues 3D d’un projet de cuisine en cours à Rochefort. Des façades blanches, des surfaces à l’aspect bois clair et un élément central avec évier composent l’aménagement envisagé.",
    context: "Deux vues 3D du même projet en cours à Rochefort. Elles illustrent l’aménagement envisagé et ne constituent pas des photographies de travaux terminés.",
    services: ["Étude de l’implantation", "Visualisation 3D", "Choix d’aménagement"],
    images: [
      {
        src: "/images/projects/rochefort/cuisine-rochefort-v2-01.webp",
        alt: "Vue 3D en perspective du projet de cuisine à Rochefort : mobilier blanc, surfaces à l’aspect bois clair et élément central avec évier",
        role: "design",
        width: 1650,
        height: 997,
      },
      {
        src: "/images/projects/rochefort/cuisine-rochefort-v2-02.webp",
        alt: "Vue 3D de face du projet de cuisine à Rochefort : implantation du mobilier et rangements intégrés à l’élément central",
        role: "design",
        width: 1429,
        height: 1007,
      },
    ],
    details: [
      {
        title: "Lire l’implantation en 3D",
        text: "Les vues permettent d’explorer la disposition du mobilier, la position des appareils et l’espace autour de l’élément central.",
      },
      {
        title: "Associer le blanc et l’aspect bois clair",
        text: "Les façades blanches et les surfaces à l’aspect bois clair dessinent une palette sobre, ponctuée par l’évier foncé et les rangements de l’élément central.",
      },
      {
        title: "Un projet qui continue d’évoluer",
        text: "Ces images présentent la conception du projet, et non une cuisine installée. Les choix et les détails pourront évoluer au fil de sa préparation.",
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
