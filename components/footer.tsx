import Link from "next/link";
import { Brand } from "./header";
import { business, whatsappUrl } from "@/lib/business";
import { featuredServices } from "@/lib/services";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Brand light />
            <p>{business.tagline}. {business.preparationNotice}</p>
            <span>La Rochelle · Charente-Maritime</span>
          </div>
          <div>
            <h3>Explorer</h3>
            <Link href="/notre-approche">Notre approche</Link>
            <Link href="/realisations">Réalisations</Link>
            <Link href="/devis">Votre projet</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h3>Nos expertises</h3>
            {featuredServices.map((s) => (
              <Link href={`/${s.slug}`} key={s.slug}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h3>Faisons connaissance</h3>
            <a href={`tel:${business.phone.replace(/[^+\d]/g, "")}`}>
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Écrire sur WhatsApp ↗
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
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.name}
          </span>
          <div>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
          </div>
          <a
            className="site-credit"
            href="https://chambre17.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Créé par <strong>Chambre17</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}
