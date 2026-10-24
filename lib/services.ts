export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  number: string;
  confirmed: boolean;
  icon: "wall" | "ceiling" | "layers" | "home";
  benefits: { title: string; text: string }[];
  preparation: string;
};
export const services: Service[] = [
  {
    slug: "pose-plaques-platre",
    title: "Plaques de plâtre & cloisons",
    short: "Redessiner les espaces, créer de nouveaux volumes.",
    number: "01",
    icon: "wall",
    confirmed: false,
    intro:
      "Une cloison permet de créer une chambre, de séparer un bureau ou de repenser la circulation d’un logement. Le choix des plaques et de l’ossature dépend de la pièce et de ses contraintes.",
    benefits: [
      {
        title: "Des volumes adaptés à votre quotidien",
        text: "La distribution des pièces se réfléchit à partir de vos usages, de la lumière et des passages existants.",
      },
      {
        title: "Des matériaux choisis selon la pièce",
        text: "Humidité, acoustique et résistance sont des points à examiner avant de retenir une solution.",
      },
      {
        title: "Une préparation pour les finitions",
        text: "Les joints et les raccords doivent être pris en compte dans le périmètre du devis et le calendrier des travaux.",
      },
    ],
    preparation:
      "Précisez la fonction des pièces, les dimensions approximatives, les ouvertures souhaitées et les éventuelles contraintes techniques.",
  },
  {
    slug: "faux-plafonds",
    title: "Faux plafonds",
    short: "Repenser les hauteurs et harmoniser les pièces.",
    number: "02",
    icon: "ceiling",
    confirmed: false,
    intro:
      "Un faux plafond peut modifier la perception d’une pièce et dissimuler certains réseaux. Sa conception demande de vérifier le support, la hauteur disponible et les équipements à intégrer.",
    benefits: [
      {
        title: "Une hauteur pensée pour votre intérieur",
        text: "La hauteur finale doit préserver le confort et s’accorder avec les portes et les fenêtres.",
      },
      {
        title: "Une place pour les équipements",
        text: "Éclairage, ventilation et trappes d’accès se prévoient en amont avec les intervenants concernés.",
      },
      {
        title: "Un rendu cohérent",
        text: "Le traitement des rives, des joints et des raccords participe à l’aspect du plafond terminé.",
      },
    ],
    preparation:
      "Indiquez la surface, la hauteur actuelle, le type de support et les éléments que vous souhaitez intégrer au plafond.",
  },
  {
    slug: "isolation-doublage",
    title: "Isolation & doublage",
    short: "Réfléchir au confort, du sol au plafond.",
    number: "03",
    icon: "layers",
    confirmed: false,
    intro:
      "Le doublage intérieur et l’isolation nécessitent une étude du mur existant, de l’humidité et de la ventilation. Le choix d’une solution dépend du bâtiment, de son usage et des performances recherchées.",
    benefits: [
      {
        title: "Comprendre l’existant",
        text: "Un mur ancien, une paroi humide et un support récent ne se traitent pas de la même manière.",
      },
      {
        title: "Définir vos priorités",
        text: "Le confort thermique, les bruits et la place disponible permettent d’orienter la discussion technique.",
      },
      {
        title: "Anticiper les raccords",
        text: "Menuiseries, prises et jonctions avec les sols et plafonds font partie des points à examiner.",
      },
    ],
    preparation:
      "Décrivez les murs concernés, l’âge du logement si vous le connaissez et les problèmes de confort ou d’humidité observés.",
  },
  {
    slug: "amenagement-renovation-interieure",
    title: "Aménagement & finitions",
    short: "Donner une nouvelle cohérence à votre intérieur.",
    number: "04",
    icon: "home",
    confirmed: false,
    intro:
      "Un projet intérieur commence par un besoin : mieux utiliser une pièce, remettre en état un support ou préparer un nouvel aménagement. Un échange permet de préciser les travaux à envisager.",
    benefits: [
      {
        title: "Un projet bien défini",
        text: "Une liste claire des pièces et des travaux souhaités facilite l’étude de votre demande.",
      },
      {
        title: "Des étapes à coordonner",
        text: "Les interventions des différents métiers doivent être identifiées pour établir un périmètre réaliste.",
      },
      {
        title: "Des finitions à préciser",
        text: "Le niveau de préparation des supports et les finitions attendues sont à convenir dans le devis.",
      },
    ],
    preparation:
      "Présentez l’état actuel du logement, les changements souhaités, vos contraintes d’accès et votre calendrier indicatif.",
  },
];
export function availableServices(preview: boolean) {
  return services.filter((s) => s.confirmed || preview);
}
