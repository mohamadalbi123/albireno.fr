import { PageIntro, Button } from "@/components/ui";
import { business, whatsappUrl } from "@/lib/business";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact — parlons de votre intérieur",
  "Contactez-nous par téléphone, e-mail ou WhatsApp pour échanger sur votre projet d’aménagement à La Rochelle.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Faisons connaissance"
        title="Une idée ? Parlons-en."
        text="Un meuble à installer, une pièce à repenser ou un projet plus large : décrivez-nous ce que vous avez en tête."
      />
      <section className="container section contact-cards">
        <a href={`tel:${business.phone.replace(/[^+\d]/g, "")}`}>
          <span>01 / PAR TÉLÉPHONE</span>
          <h2>{business.phone}</h2>
          <p>Prendre le temps d’un premier échange. ↗</p>
        </a>
        <a href={`mailto:${business.email}`}>
          <span>02 / PAR E-MAIL</span>
          <h2>{business.email}</h2>
          <p>Présenter votre projet en quelques mots. ↗</p>
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <span>03 / SUR WHATSAPP</span>
          <h2>Échanger simplement.</h2>
          <p>Partager vos idées et vos photos. ↗</p>
        </a>
      </section>
      <section className="container contact-end">
        <h2>Posons les premières idées.</h2>
        <Button href="/devis">Préparer ma demande</Button>
      </section>
    </>
  );
}
