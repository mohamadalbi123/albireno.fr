import Link from "next/link";
import { Brand } from "./header";
import { Icon } from "./icon";
import { business, whatsappUrl } from "@/lib/business";
import { contactEmail, contactPhone } from "@/lib/site";
export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <Brand light />
              <p>
                La plâtrerie au service
                <br />
                de votre intérieur.
              </p>
              <span>Aytré · La Rochelle</span>
              <div className="social-links">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Luna Plâtrerie sur WhatsApp"
                >
                  <Icon name="chat" />
                </a>
                <a
                  href={business.googleProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Consulter la fiche Google de Luna Plâtrerie"
                >
                  <span className="google-letter">G</span>
                </a>
                {business.socialAccounts.map((s) => (
                  <a
                    href={s.url}
                    key={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3>Explorer</h3>
              <Link href="/prestations">Prestations</Link>
              <Link href="/realisations">Réalisations</Link>
              <Link href="/a-propos">À propos</Link>
              <Link href="/contact">Devis gratuit</Link>
            </div>
            <div>
              <h3>Nous trouver</h3>
              <p>
                {business.address}
                <br />
                {business.postalCode} {business.city}, France
              </p>
              <p>
                Lundi – samedi : 8h – 18h
                <br />
                Dimanche : fermé
              </p>
            </div>
            <div>
              <h3>Un projet en tête ?</h3>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp <Icon name="diagonal" width={14} />
              </a>
              <p>{business.whatsappDisplay}</p>
              {contactPhone && (
                <a href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`}>
                  Appeler {contactPhone}
                </a>
              )}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              )}
              <Link className="footer-contact" href="/contact">
                Échangeons sur votre projet <Icon name="arrow" width={17} />
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <a
              className="site-credit"
              href="https://chambre17.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Site réalisé par Chambre 17"
            >
              Built by <strong>Chambre 17</strong>
            </a>
            <span>© {new Date().getFullYear()} Luna Plâtrerie</span>
            <div>
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/confidentialite">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
      <nav className="mobile-contact" aria-label="Contact rapide">
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <Icon name="chat" />
          WhatsApp
        </a>
        <Link href="/contact">
          Devis gratuit
          <Icon name="arrow" />
        </Link>
      </nav>
    </>
  );
}
