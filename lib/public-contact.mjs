/** Approved public contact data; never place service credentials here. */
export const publicContact={email:'albireno@icloud.com',phone:'+33 7 63 73 43 72',whatsappNumber:'33763734372'};
export function publicWhatsappUrl(message=''){return `https://wa.me/${publicContact.whatsappNumber}?text=${encodeURIComponent(message)}`;}
