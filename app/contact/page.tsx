import { PageIntro } from "@/components/ui";
import { business, whatsappUrl } from "@/lib/business";
import { QuoteForm } from "@/components/quote-form";
import {mailReady} from "@/lib/site";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact — parlons de votre cuisine",
  "Contactez-nous par téléphone, e-mail ou WhatsApp pour échanger sur la conception ou l’installation de votre cuisine à La Rochelle.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Faisons connaissance"
        title="Une idée ? Parlons-en."
        text="L’activité cuisine est en préparation. Vous pouvez partager vos idées pour un futur projet, sans réservation ni prestation payante à ce stade."
      />
      <section className="container section contact-cards">
        <a href={`tel:${business.phone.replace(/[^+\d]/g, "")}`}>
          <span>01 / PAR TÉLÉPHONE</span>
          <h2>{business.phone}</h2>
          <p>Prendre le temps d’un premier échange. ↗</p>
        </a>
        <a href="#formulaire-contact">
          <span>02 / FORMULAIRE DE CONTACT</span>
          <h2>Formulaire de contact</h2>
          <p>Présenter votre projet en quelques mots. ↗</p>
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <span>03 / SUR WHATSAPP</span>
          <h2>Échanger simplement.</h2>
          <p>Partager vos idées et vos photos. ↗</p>
        </a>
      </section>
      <section className="container section wizard-container" id="formulaire-contact" aria-labelledby="contact-form-title">
        <h2 id="contact-form-title">Formulaire de contact</h2>
        <QuoteForm mailEnabled={mailReady} simpleContact />
      </section>
    </>
  );
}
