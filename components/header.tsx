"use client";
import {useLocale} from "./language-context";
import {LanguageSwitcher} from "./language-switcher";
import {translatedNodes} from "./translated-content";
import {frenchPath} from "@/lib/i18n";
import { business } from "@/lib/business";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
const links = [
  { href: "/", label: "Accueil" },
  { href: "/conception-cuisine-3d", label: "Conception" },
  { href: "/installation-cuisine-la-rochelle", label: "Installation" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
];
export function Brand({ light = false }: { light?: boolean }) {
  const locale=useLocale();
  return translatedNodes(
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      href="/"
      aria-label={`${business.name} — accueil`}
    >
      <span className="brand-wordmark" dir="ltr" translate="no">Albi<span>Reno</span></span>
    </Link>,locale
  );
}
export function Header() {
  const locale=useLocale();
  const pathname = frenchPath(usePathname());
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return translatedNodes(
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={
                (
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href)
                )
                  ? "page"
                  : undefined
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button header-quote">
          Nous contacter <Icon name="arrow" width={17} />
        </Link>
        <LanguageSwitcher locale={locale}/>
        <button
          ref={menuRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Navigation mobile"
        >
          <a href={`tel:${business.phone.replace(/[^+\d]/g,"")}`}>Appeler AlbiReno <Icon name="arrow"/></a>
          {[...links, { href: "/simulateur-pose-cuisine", label: "Estimer ma pose" }].map(
            (l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
                <Icon name="arrow" />
              </Link>
            ),
          )}
        </nav>
      )}
    </header>,locale
  );
}
