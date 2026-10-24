export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  kind: string;
  preparation: string;
  quoteType: string;
  steps: string[];
  note: string;
  number: string;
  confirmed: boolean;
  featured: boolean;
};
export const services: Service[] = [
  {
    slug: "montage-meubles-la-rochelle",
    title: "Montage de meubles & bricolage",
    short: "Des meubles bien installés, un quotidien simplifié.",
    intro:
      "Monter une armoire, installer une étagère ou organiser un coin bureau : les petites interventions méritent autant d’attention que les grands projets.",
    kind: "meubles",
    preparation:
      "Références et notices des meubles, nombre de colis, dimensions et accès à la pièce.",
    quoteType: "Montage de meubles",
    steps: [
      "Vérifier les éléments et les notices",
      "Préparer la pièce et les surfaces de travail",
      "Assembler, ajuster et vérifier les ouvertures",
    ],
    note: "Une fixation murale dépend du support, des charges et des consignes du fabricant. Ces points sont examinés avant de définir l’intervention.",
    number: "01",
    confirmed: false,
    featured: true,
  },
  {
    slug: "renovation-interieure-la-rochelle",
    title: "Rénovation intérieure",
    short: "Retrouver le plaisir d’habiter votre espace.",
    intro:
      "Repenser une pièce commence par comprendre ce qui fonctionne et ce qui doit évoluer : circulation, lumière, usages et état des surfaces. Le projet se construit à partir de l’existant.",
    kind: "renovation",
    preparation:
      "Pièces concernées, surfaces approximatives, état des supports et finitions souhaitées.",
    quoteType: "Rénovation intérieure",
    steps: [
      "Faire le point sur les usages et l’existant",
      "Définir les finitions et les priorités",
      "Organiser les étapes et les intervenants",
    ],
    note: "Le périmètre technique, les corps de métier nécessaires et les éventuelles contraintes du bâtiment doivent être définis avant tout engagement.",
    number: "02",
    confirmed: false,
    featured: true,
  },
  {
    slug: "installation-cuisine-la-rochelle",
    title: "Cuisines & rangements",
    short: "Chaque centimètre trouve sa fonction.",
    intro:
      "Une cuisine réussie associe des rangements accessibles, un plan de travail pratique et des circulations fluides. L’implantation se prépare à partir des dimensions réelles et du mobilier choisi.",
    kind: "cuisine",
    preparation:
      "Plan coté, fournisseur, liste des meubles, caractéristiques du plan de travail et état de la cuisine existante.",
    quoteType: "Installation de cuisine",
    steps: [
      "Vérifier les cotes et l’implantation",
      "Préparer le montage et les ajustements",
      "Contrôler l’alignement et l’usage des rangements",
    ],
    note: "Les raccordements électriques, gaz et plomberie sont à identifier séparément avec les professionnels compétents. Leur réalisation n’est pas présumée incluse.",
    number: "03",
    confirmed: false,
    featured: true,
  },
  {
    slug: "conception-3d",
    title: "Conception & aménagement 3D",
    short: "Se projeter avant de se décider.",
    intro:
      "Comparer plusieurs implantations permet de prendre des décisions plus sereinement. La conception 3D aide à comprendre les volumes, la place du mobilier et l’harmonie des matières.",
    kind: "3d",
    preparation:
      "Dimensions, photos de l’existant, contraintes, style souhaité et objectifs de la pièce.",
    quoteType: "Conception 3D",
    steps: [
      "Comprendre vos besoins et relever les dimensions",
      "Construire une proposition d’aménagement",
      "Ajuster le concept avant de chiffrer les travaux",
    ],
    note: "Un visuel 3D est une aide à la décision. Il ne remplace pas les relevés, les études techniques ou la validation des produits et finitions.",
    number: "04",
    confirmed: false,
    featured: true,
  },
  {
    slug: "mobilier-sur-mesure",
    title: "Mobilier sur mesure & sourcing",
    short: "Trouver la pièce qui s’accorde à votre projet.",
    intro:
      "Recherche et accompagnement à l’approvisionnement de mobilier sur mesure. Un comptoir d’accueil, une bibliothèque ou un rangement peuvent être étudiés selon vos dimensions et vos usages.",
    kind: "mobilier",
    preparation:
      "Type de meuble, dimensions, quantités, matières souhaitées, références et budget indicatif.",
    quoteType: "Mobilier sur mesure",
    steps: [
      "Définir un cahier des besoins précis",
      "Rechercher et comparer des propositions",
      "Examiner les conditions d’approvisionnement",
    ],
    note: "Le modèle d’achat, d’intermédiation ou d’importation reste à définir. Prix, conformité, transport, délais et garanties devront être vérifiés pour chaque proposition.",
    number: "05",
    confirmed: false,
    featured: true,
  },
  {
    slug: "amenagement-professionnel",
    title: "Locaux professionnels",
    short: "Un lieu qui fait travailler votre image.",
    intro:
      "Un espace d’accueil, un bureau ou un salon doit servir les équipes autant que les visiteurs. Le parcours, les rangements et l’identité du lieu se réfléchissent ensemble.",
    kind: "pro",
    preparation:
      "Activité, plan, usages, mobilier nécessaire, contraintes d’ouverture et calendrier indicatif.",
    quoteType: "Locaux professionnels",
    steps: [
      "Comprendre les parcours des équipes et visiteurs",
      "Organiser les zones de travail et d’accueil",
      "Définir le mobilier et les étapes du projet",
    ],
    note: "Les exigences propres au local et à son usage doivent être étudiées avec les intervenants appropriés avant de valider un aménagement.",
    number: "06",
    confirmed: false,
    featured: true,
  },
  {
    slug: "bricolage-la-rochelle",
    title: "Bricolage à La Rochelle",
    short: "Les petits détails qui changent le quotidien.",
    intro:
      "Poser des accessoires, ajuster un élément de mobilier ou organiser des rangements : une liste précise des besoins facilite la préparation des petites interventions.",
    kind: "bricolage",
    preparation:
      "Liste des éléments, photos des supports, dimensions et références des produits.",
    quoteType: "Bricolage",
    steps: [
      "Lister les interventions pièce par pièce",
      "Examiner les supports et contraintes de fixation",
      "Préparer les produits et le matériel adaptés",
    ],
    note: "Les demandes impliquant des réseaux, la structure du bâtiment ou une technicité particulière nécessitent une évaluation distincte.",
    number: "07",
    confirmed: false,
    featured: false,
  },
];
export const featuredServices = services.filter((s) => s.featured);
