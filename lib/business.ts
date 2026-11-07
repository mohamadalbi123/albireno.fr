import {publicContact,publicWhatsappUrl} from './public-contact.mjs';
/** Central brand/contact configuration. Future trade registration remains unverified. */
export const business = {
  name: "ALBI RENO",
  registeredDomain: "albireno.fr",
  repository: "https://github.com/mohamadalbi123/albireno.fr.git",
  descriptor: "Conception et installation de cuisines",
  preparationNotice: "Activité cuisine en préparation. Aucune prestation payante ni réservation d’intervention n’est proposée à ce stade.",
  tagline: "AlbiReno — Conception et installation de cuisines à La Rochelle et ses alentours",
  phone: publicContact.phone,
  email: publicContact.email,
  whatsappNumber: publicContact.whatsappNumber,
  whatsappDisplay: "+33 7 63 73 43 72",
  areas: ["La Rochelle", "Charente-Maritime"],
  legalName: "Mohamad Albi",
  // Professional/domiciliation address explicitly confirmed for publication by the owner, 7 November 2026.
  professionalAddress: "243B Avenue de Lagord, Bâtiment E, Résidence Puy Mou, Logement 2, rez-de-chaussée, 17140 Lagord, France",
  legalForm: "Entrepreneur individuel — micro-entreprise",
  siren: "131 127 979",
  siret: "131 127 979 00014",
  publicationDirector: "Mohamad Albi",
  socialAccounts: [] as { name: string; url: string }[],
  brandApproved: true,
  // Owner explicitly approved Google indexing on 28 October 2026.
  indexingApproved: true,
  legalApproved: false,
  privacyApproved: false,
  servicesApproved: false,
  launchApproved: false,
  emailDeliveryApproved: false,
};
export const whatsappMessage =
  "Bonjour, je souhaite vous parler de mon projet de cuisine.";
export function whatsappUrl(message = whatsappMessage) {
  return publicWhatsappUrl(message);
}
