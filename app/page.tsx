import Link from "next/link";
import { Icon } from "@/components/icon";
import {
  Button,
  Eyebrow,
  SectionHeading,
  PhotoPlaceholder,
} from "@/components/ui";
import { RoomIllustration } from "@/components/room-illustration";
import { ServiceCards } from "@/components/service-cards";
import { Reviews } from "@/components/reviews";
import { QuoteForm } from "@/components/quote-form";
import { business, whatsappUrl } from "@/lib/business";
import { pageMetadata, isPreview, mailReady } from "@/lib/site";
export const metadata = pageMetadata(
  "Plaquiste à Aytré et La Rochelle",
  "Luna Plâtrerie vous accompagne dans votre projet intérieur à Aytré et autour de La Rochelle. Échangez sur WhatsApp ou préparez votre demande de devis gratuit.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Plâtrerie · Aytré & La Rochelle</Eyebrow>
            <h1>
              <span className="sr-only">
                Luna Plâtrerie, plaquiste à Aytré et La Rochelle.{" "}
              </span>
              De beaux espaces.
              <br />
              De nouvelles
              <br />
              <span>perspectives.</span>
            </h1>
            <p className="hero-subtitle">
              Votre spécialiste en plâtrerie
              <br className="desktop-break" /> et rénovation intérieure à La
              Rochelle.
            </p>
            <p className="hero-description">
              Donnez vie à vos projets d’aménagement intérieur avec un
              professionnel à votre écoute.
            </p>
            <div className="hero-actions">
              <Button>Demander un devis gratuit</Button>
              <a
                className="text-link"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="chat" />
                Discuter sur WhatsApp
              </a>
            </div>
            <div className="hero-note">
              <span className="local-dot" />
              <span>Installé à Aytré, tout près de chez vous.</span>
            </div>
          </div>
          <RoomIllustration />
        </div>
        <div className="hero-bottom container">
          <span>VOTRE INTÉRIEUR, NOTRE POINT DE DÉPART.</span>
          <a href="#savoir-faire">
            Découvrir Luna <span>↓</span>
          </a>
        </div>
      </section>
      <section className="trust-strip">
        <div className="container">
          <div>
            <Icon name="pin" />
            <span>Un artisan de proximité</span>
          </div>
          <div>
            <Icon name="chat" />
            <span>Un échange direct</span>
          </div>
          <div>
            <Icon name="ruler" />
            <span>Un projet pensé avec vous</span>
          </div>
          <div>
            <Icon name="check" />
            <span>Une demande de devis gratuite</span>
          </div>
        </div>
      </section>
      <section className="section container" id="savoir-faire">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="Des idées aux volumes"
            title="Votre intérieur a du potentiel."
            text="Repenser une pièce, créer un nouvel espace, préparer une rénovation. Chaque projet commence par vos envies."
          />
          <Link className="text-link" href="/prestations">
            Explorer les prestations <Icon name="arrow" />
          </Link>
        </div>
        {isPreview && (
          <p className="draft-note">
            Aperçu des prestations envisagées · Périmètre à confirmer avec Luna
            Plâtrerie.
          </p>
        )}
        <ServiceCards />
      </section>
      <section className="about-section">
        <div className="container about-grid">
          <div className="about-art">
            <div className="about-monogram" aria-hidden="true">
              L<span>.</span>
            </div>
            <span className="about-art-caption">
              LUNA PLÂTRERIE
              <br />
              <small>AYTRÉ · CHARENTE-MARITIME</small>
            </span>
            <div className="location-stamp">
              <Icon name="pin" width={28} height={28} />
              <span>
                Le sens du détail.
                <br />
                <strong>L’esprit local.</strong>
              </span>
            </div>
          </div>
          <div className="about-copy">
            <Eyebrow>Un artisan, un échange, votre projet</Eyebrow>
            <h2>
              Bien chez vous,
              <br />
              ça commence ici.
            </h2>
            <p>
              Luna Plâtrerie est une entreprise de plâtrerie installée à Aytré,
              aux portes de La Rochelle. Notre point de départ : comprendre
              votre intérieur et ce que vous souhaitez en faire.
            </p>
            <p>
              Une pièce à repenser, des volumes à aménager ou un projet de
              rénovation ? Échangeons sur vos besoins pour définir les
              prochaines étapes.
            </p>
            <div className="about-values">
              <span>
                <Icon name="check" />À l’écoute de vos idées
              </span>
              <span>
                <Icon name="check" />
                Au plus près de votre projet
              </span>
            </div>
            <Button href="/a-propos" variant="navy">
              Faire connaissance
            </Button>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="Du projet à la réalisation"
            title="Place aux transformations."
            text="Des espaces qui évoluent, des intérieurs qui prennent forme. Notre galerie accueillera bientôt les photos de nos chantiers."
          />
          <Link className="text-link" href="/realisations">
            Voir la galerie <Icon name="arrow" />
          </Link>
        </div>
        <div className="before-after">
          <div>
            <PhotoPlaceholder label="Avant les travaux" />
            <span className="photo-chip">AVANT</span>
          </div>
          <div>
            <PhotoPlaceholder label="Après les travaux" kind="after" />
            <span className="photo-chip">APRÈS</span>
          </div>
          <span className="comparison-center" aria-hidden="true">
            ↔
          </span>
        </div>
        <p className="gallery-caption">
          <Icon name="image" width={16} />
          Emplacements réservés aux photos réelles. Aucun chantier n’est
          présenté à titre d’exemple fictif.
        </p>
      </section>
      <Reviews />
      <section className="process-section">
        <div className="container">
          <SectionHeading
            eyebrow="Simple, du premier échange à votre projet"
            title="Et si on avançait ensemble ?"
          />
          <div className="process-grid">
            {[
              {
                title: "Vous nous racontez",
                text: "Décrivez votre intérieur, vos envies et la ville de votre projet.",
              },
              {
                title: "Nous faisons le point",
                text: "Précisons ensemble les besoins, les contraintes et le périmètre des travaux.",
              },
              {
                title: "Vous décidez",
                text: "Étudiez la proposition avant de vous engager et posons les bases de la suite.",
              },
            ].map((s, i) => (
              <div key={s.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="area-section container">
        <div className="area-art" aria-hidden="true">
          <span className="ocean-label">L’ATLANTIQUE</span>
          <div className="coastline" />
          <span className="map-town rochelle">
            <span />
            La Rochelle
          </span>
          <span className="map-town aytre">
            <Icon name="pin" width={30} height={30} />
            Aytré<small>Notre point de départ</small>
          </span>
          <span className="map-label">SCHÉMA DE LOCALISATION</span>
        </div>
        <div>
          <Eyebrow>Tout près de votre projet</Eyebrow>
          <h2>
            À Aytré.
            <br />
            Autour de La Rochelle.
          </h2>
          <p>
            Vous avez un projet de plâtrerie ou de rénovation intérieure dans le
            secteur rochelais ? Indiquez-nous votre commune pour vérifier les
            possibilités d’intervention.
          </p>
          <div className="area-tags">
            {business.areas.map((a) => (
              <span key={a}>
                <Icon name="pin" width={14} />
                {a}
              </span>
            ))}
          </div>
          <Button href="/contact" variant="outline">
            Parlons de votre projet
          </Button>
        </div>
      </section>
      <section className="quote-section" id="devis">
        <div className="container quote-grid">
          <div className="quote-copy">
            <Eyebrow light>Un premier pas, tout simplement</Eyebrow>
            <h2>
              Votre projet
              <br />
              commence{" "}
              <br />
              <span>ici.</span>
            </h2>
            <p>
              Quelques informations suffisent pour engager la conversation. La
              demande de devis est gratuite.
            </p>
            <a
              href={whatsappUrl()}
              className="quote-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" width={28} height={28} />
              <span>
                Vous préférez un message ?
                <strong>
                  Discutons sur WhatsApp <Icon name="diagonal" width={16} />
                </strong>
              </span>
            </a>
            <span className="quote-hours">Lundi – samedi · 8h – 18h</span>
          </div>
          <QuoteForm mailEnabled={mailReady} />
        </div>
      </section>
    </>
  );
}
