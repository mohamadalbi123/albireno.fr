export type Service = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  short: string;
  seoDescription: string;
  intro: string;
  image: string;
  preparation: string;
  steps: string[];
  note: string;
  examples: string[];
  number: string;
  confirmed: boolean;
  featured: boolean;
};
export const services: Service[] = [
  {
    id: "installation",
    seoDescription: "Installation de cuisines à La Rochelle : étude de l’implantation, montage des meubles, ajustements et finitions selon le périmètre à confirmer.",
    slug: "installation-cuisine-la-rochelle",
    title: "Installer une cuisine",
    seoTitle: "Installation de cuisines à La Rochelle",
    short: "Une installation pensée dans les moindres détails.",
    intro:
      "Une cuisine neuve commence par une implantation juste. Nous étudions le plan, les dimensions et les contraintes avant de préparer le montage des caissons, leur positionnement et les ajustements. Une cuisine IKEA, Leroy Merlin ou d’une autre marque nécessite de suivre les notices du fabricant et de vérifier les composants livrés.",
    image: "/images/installation/cuisine-blanche.webp",
    preparation:
      "Plan du fournisseur, dimensions, liste des modules, état de la livraison et caractéristiques du plan de travail.",
    steps: [
      "Vérifier les cotes, les supports et les accès",
      "Monter, positionner et ajuster les meubles prévus",
      "Vérifier les alignements, les ouvertures et les finitions",
    ],
    note: "Les travaux sur les réseaux électriques, de gaz ou de plomberie sont examinés séparément et réservés aux professionnels compétents dans un périmètre autorisé et assuré. ALBI RENO n’est affiliée à aucune enseigne.",
    examples: [
      "Montage et positionnement des caissons",
      "Pose et adaptation du plan de travail, sous réserve de faisabilité",
      "Organisation des rangements et intégration du mobilier",
    ],
    number: "01",
    confirmed: false,
    featured: true,
  },
  {
    id: "renovation",
    seoDescription: "Rénovation de cuisines à La Rochelle : étudier les façades, plans de travail et rangements à conserver ou à adapter selon l’état de votre cuisine.",
    slug: "renovation-cuisine-la-rochelle",
    title: "Rénover ma cuisine",
    seoTitle: "Rénovation de cuisines à La Rochelle",
    short: "Un nouvel élan, en partant de l’existant.",
    intro:
      "Tout remplacer n’est pas toujours la meilleure réponse. Une cuisine peut évoluer grâce à de nouvelles façades compatibles, un plan de travail adapté, des rangements mieux organisés ou des finitions reprises. Le premier échange permet d’identifier ce qui peut être conservé et ce qui mérite d’être changé.",
    image: "/images/renovation/cuisine-blanche-renovee.webp",
    preparation:
      "Photos des meubles existants, état des caissons et des façades, références connues et liste des changements souhaités.",
    steps: [
      "Examiner les éléments à conserver",
      "Comparer les modifications et leurs contraintes",
      "Définir la préparation et les étapes d’intervention",
    ],
    note: "La compatibilité des pièces, l’état des supports et les contraintes techniques doivent être vérifiés avant de retenir une solution. Aucun résultat de rénovation n’est garanti sans examen.",
    examples: [
      "Moderniser certains éléments sans tout remplacer",
      "Réorganiser les rangements existants",
      "Améliorer les finitions et le confort d’usage",
    ],
    number: "02",
    confirmed: false,
    featured: true,
  },
  {
    id: "optimisation",
    seoDescription: "Optimisation des petites cuisines à La Rochelle : circulation, angles et rangements. Découvrez des pistes adaptées aux contraintes de votre espace.",
    slug: "optimisation-petite-cuisine",
    title: "Optimiser mon espace",
    seoTitle: "Optimisation des petites cuisines",
    short: "Chaque centimètre peut devenir une bonne idée.",
    intro:
      "Une petite surface, un angle difficile, des tuyaux apparents ou une circulation peu pratique : chaque cuisine présente ses contraintes. Nous cherchons à comprendre vos gestes et les possibilités de la pièce avant de proposer des adaptations. L’objectif est d’utiliser l’espace plus intelligemment, sans présumer que toute modification est possible.",
    image: "/images/optimisation/cuisine-sous-escalier.webp",
    preparation:
      "Dimensions approximatives, photos des angles et obstacles, rangements manquants, meubles conservés et changements souhaités.",
    steps: [
      "Observer les usages et les obstacles",
      "Étudier les rangements et les implantations possibles",
      "Valider les ajustements réalisables avant toute intervention",
    ],
    note: "L’accès aux équipements, la ventilation et l’entretien des réseaux doivent être préservés. Les adaptations sont soumises à une vérification sur place.",
    examples: [
      "Valoriser les angles et les hauteurs disponibles",
      "Adapter un meuble autour d’une contrainte",
      "Repenser la place des appareils et les circulations",
    ],
    number: "03",
    confirmed: false,
    featured: true,
  },
  {
    id: "reparation",
    seoDescription: "Réparation et modification de cuisines à La Rochelle : portes, charnières, tiroirs et meubles. Préparez les références et les photos pour étudier la faisabilité.",
    slug: "reparation-cuisine-la-rochelle",
    title: "Réparer ou modifier ma cuisine",
    seoTitle: "Réparation et modification de cuisines à La Rochelle",
    short: "Les bons ajustements font la différence.",
    intro:
      "Une porte désalignée, un tiroir qui accroche ou une charnière usée peuvent gêner chaque jour. Une intervention ciblée commence par identifier le mécanisme, sa référence et l’état du meuble. Nous étudions aussi les modifications de rangement et les adaptations ponctuelles.",
    image: "/images/reparation/placard-charniere.webp",
    preparation:
      "Photos du problème et du mécanisme, marque ou référence si connue, nombre d’éléments concernés et dimensions utiles.",
    steps: [
      "Identifier la cause et les pièces compatibles",
      "Définir le réglage, le remplacement ou l’ajustement nécessaire",
      "Contrôler le fonctionnement après intervention",
    ],
    note: "Certaines pièces ne sont plus disponibles ou ne peuvent pas être adaptées sans modifier le meuble. La faisabilité et le périmètre sont précisés avant toute intervention.",
    examples: [
      "Réglage de portes et remplacement de charnières",
      "Examen des coulisses et des tiroirs",
      "Ajustements de meubles et petites adaptations",
    ],
    number: "04",
    confirmed: false,
    featured: true,
  },
  {
    id: "conception",
    seoDescription: "Conception de cuisines en 3D à La Rochelle avec HomeStyler : comparer l’implantation, les volumes et les rangements avant de choisir.",
    slug: "conception-cuisine-3d",
    title: "Concevoir ma cuisine en 3D",
    seoTitle: "Conception de cuisines en 3D à La Rochelle",
    short: "Voir les possibilités avant de choisir.",
    intro:
      "La conception 3D aide à comparer des implantations et à comprendre les volumes, avec des outils de planification comme HomeStyler ou ceux de Leroy Merlin. À partir des dimensions et de vos besoins, une proposition permet de réfléchir à la circulation, aux rangements, aux matières et à la place de l’électroménager. La première conception 3D préliminaire est offerte ; l’installation est chiffrée séparément sur devis. Cette étape est facultative et s’adapte aux besoins du projet.",
    image: "/images/conception-3d/plan-vue-dessus.webp",
    preparation:
      "Dimensions, photos, plan existant si disponible, style souhaité, budget indicatif et priorités d’usage.",
    steps: [
      "Relever les dimensions et comprendre vos besoins",
      "Construire une implantation et une visualisation 3D",
      "Ajuster la proposition avant de préparer un devis",
    ],
    note: "Une visualisation n’est pas un plan technique d’exécution. Les cotes, matériaux, fixations et contraintes des réseaux restent à vérifier. Une réparation simple ne nécessite pas de conception 3D.",
    examples: [
      "Étude de l’implantation et des rangements",
      "Visualisation des volumes et des matériaux",
      "Échange autour des choix avant les travaux",
    ],
    number: "05",
    confirmed: false,
    featured: true,
  },
];
export const featuredServices = services;
