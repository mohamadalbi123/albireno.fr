import { PageIntro, Eyebrow } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { Icon } from "@/components/icon";
import { business, whatsappUrl } from "@/lib/business";
import {
  mailReady,
  contactEmail,
  contactPhone,
  pageMetadata,
} from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Contact et devis gratuit à Aytré et La Rochelle",
  "Un projet de plâtrerie ou de rénovation intérieure ? Contactez Luna Plâtrerie sur WhatsApp ou préparez votre demande de devis gratuit.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact & devis gratuit"
        title="Parlons de votre intérieur."
        text="Une question sur votre projet ? Présentez-nous vos idées et faisons le point ensemble."
      />
      <section className="contact-page container">
        <aside>
          <Eyebrow>Un échange direct</Eyebrow>
          <h2>À votre écoute.</h2>
          <p>
            Vous pouvez nous écrire directement sur WhatsApp ou préparer votre
            demande à l’aide du formulaire.
          </p>
          <a
            className="contact-method"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="chat" />
            <span>
              <small>Discuter sur WhatsApp</small>
              <strong>{business.whatsappDisplay}</strong>
            </span>
            <Icon name="diagonal" />
          </a>
          {contactPhone && (
            <a
              className="contact-method"
              href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`}
            >
              <Icon name="phone" />
              <span>
                <small>Téléphone</small>
                <strong>{contactPhone}</strong>
              </span>
            </a>
          )}
          {contactEmail && (
            <a className="contact-method" href={`mailto:${contactEmail}`}>
              <Icon name="mail" />
              <span>
                <small>E-mail</small>
                <strong>{contactEmail}</strong>
              </span>
            </a>
          )}
          <div className="contact-method">
            <Icon name="pin" />
            <span>
              <small>Adresse de l’entreprise</small>
              <strong>
                {business.address}
                <br />
                {business.postalCode} {business.city}
              </strong>
            </span>
          </div>
          <div className="contact-method">
            <Icon name="clock" />
            <span>
              <small>Horaires</small>
              <strong>
                Lundi – samedi : 8h – 18h
                <br />
                Dimanche : fermé
              </strong>
            </span>
          </div>
          <a
            className="text-link"
            href={business.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir la fiche Google <Icon name="diagonal" />
          </a>
          <div className="contact-tip">
            <h3>Pour bien préparer votre demande</h3>
            <p>
              Indiquez votre commune, les pièces concernées et une description
              des travaux. Des photos de l’existant peuvent aussi faciliter le
              premier échange.
            </p>
          </div>
        </aside>
        <QuoteForm mailEnabled={mailReady} />
      </section>
    </>
  );
}
