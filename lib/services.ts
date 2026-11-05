export type Service = {
  id: 'conception' | 'installation'; slug: string; title: string; seoTitle: string;
  short: string; seoDescription: string; intro: string; image: string;
  preparation: string; steps: string[]; note: string; examples: string[];
  number: string; confirmed: boolean; featured: boolean; cta: string;
};
export const services: Service[] = [
  {
    id: 'conception', slug: 'conception-cuisine-3d', title: 'Conception de cuisines',
    seoTitle: 'Conception de cuisines en 3D à La Rochelle',
    short: 'Une cuisine pensée pour votre espace et votre quotidien.',
    seoDescription: 'Étude de votre espace, conception de cuisine en 3D et choix d’implantation à La Rochelle. Un accompagnement distinct de l’installation, pour votre futur projet.',
    intro: 'À partir de vos dimensions, de vos photos et de vos envies, nous pouvons préparer votre conception 3D à distance. Vous visualisez l’implantation avant de finaliser votre commande chez le fournisseur, en limitant les rendez-vous inutiles en magasin. Les cotes et la faisabilité restent à vérifier.',
    image: '/images/conception-3d/plan-vue-dessus.webp',
    preparation: 'Un plan ou quelques dimensions si vous les connaissez, des photos de l’espace, vos envies et votre budget indicatif. Ces éléments pourront être précisés après le premier échange.',
    steps: ['Échanger sur vos usages, vos envies et votre budget', 'Étudier les dimensions, l’implantation et les contraintes', 'Préparer une visualisation 3D et comparer les choix'],
    examples: ['Étude de votre espace', 'Prise en compte des dimensions et contraintes', 'Optimisation de l’implantation', 'Conception et visualisation 3D', 'Accompagnement dans le choix des meubles'],
    note: 'La conception peut être demandée seule ou avec l’installation. Ses modalités et ses conditions commerciales seront précisées avant tout engagement. Vous achetez et organisez la livraison directement avec votre fournisseur ; AlbiReno ne fournit ni ne livre les meubles. Elle est réalisée par ALBI RENO, à l’aide d’outils de planification comme HomeStyler ou ceux de Leroy Merlin ; aucun configurateur public en ligne n’est proposé. Une vue 3D n’est pas un plan technique d’exécution. Les cotes et la faisabilité restent à vérifier. ALBI RENO n’est affiliée à aucune enseigne.',
    number: '01', confirmed: false, featured: true, cta: 'Parler de mon projet',
  },
  {
    id: 'installation', slug: 'installation-cuisine-la-rochelle', title: 'Installation de cuisines',
    seoTitle: 'Installation et pose de cuisines à La Rochelle',
    short: 'Une pose soignée, adaptée à votre projet.',
    seoDescription: 'Installation et pose de cuisine à La Rochelle : meubles IKEA, Leroy Merlin ou autre fournisseur, montage et ajustements sur devis. Activité en préparation.',
    intro: 'Vous avez choisi votre cuisine chez IKEA, Leroy Merlin ou un autre fournisseur ? AlbiReno vous accompagne dans sa mise en place, du montage des meubles aux ajustements nécessaires à une installation soignée.',
    image: '/images/installation/cuisine-blanche.webp',
    preparation: 'Le plan du fournisseur et la liste des meubles, si vous les avez déjà, l’état de la livraison et vos disponibilités. Aucun décompte technique détaillé n’est nécessaire pour nous contacter.',
    steps: ['Vérifier le plan, les cotes, les supports et les accès', 'Préciser le périmètre et préparer un devis avant toute intervention', 'Monter, poser et ajuster les éléments convenus lorsque l’activité sera prête'],
    examples: ['Montage et pose des meubles', 'Installation des meubles hauts et colonnes', 'Installation des meubles d’angle', 'Pose et ajustement des plans de travail, sous réserve de faisabilité', 'Intégration des équipements prévus au devis', 'Adaptation aux contraintes techniques de la cuisine'],
    note: 'Vous pouvez demander uniquement l’installation, avec un plan déjà finalisé. Vous achetez vos meubles et équipements directement auprès du fournisseur de votre choix et organisez avec lui leur livraison à domicile. AlbiReno ne fournit ni ne livre les meubles. Les modifications de plomberie, d’électricité, de gaz ou de structure ne sont pas automatiquement incluses : elles nécessitent une étude et des professionnels dont les compétences, l’activité déclarée et l’assurance couvrent les travaux. ALBI RENO n’est affiliée à aucune enseigne. Toute intervention reste conditionnée à la disponibilité effective de l’activité, à la vérification technique et à l’acceptation du devis.',
    number: '02', confirmed: false, featured: true, cta: 'Demander un devis',
  },
];
export const featuredServices = services.filter(s=>s.featured);
export const retiredServiceRedirects = {
  '/renovation-cuisine-la-rochelle': '/installation-cuisine-la-rochelle',
  '/reparation-cuisine-la-rochelle': '/installation-cuisine-la-rochelle',
  '/optimisation-petite-cuisine': '/conception-cuisine-3d',
};
