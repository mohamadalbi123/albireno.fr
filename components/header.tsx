"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
const links = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
];
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      href="/"
      aria-label="Luna Plâtrerie — accueil"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M8 8h10v29h22v9H8V8Z" fill="currentColor" />
          <path d="M26 2h14v27H26V2Z" fill="#d77b42" />
        </svg>
      </span>
      <span>
        <strong>LUNA</strong>
        <small>PLÂTRERIE</small>
      </span>
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return (
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
          Parlons de votre projet <Icon name="arrow" width={17} />
        </Link>
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
          {[
            ...links,
            { href: "/contact", label: "Demander un devis gratuit" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
