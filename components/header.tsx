"use client";
import { business } from "@/lib/business";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
const links = [
  { href: "/#services", label: "Nos expertises" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/notre-approche", label: "Notre approche" },
];
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      href="/"
      aria-label={`${business.name} — accueil`}
    >
      <span className="brand-symbol" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
          <path
            d="M5 32V9h30v23H5Zm0-12h30M19 9v23M8 5h24"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M15 13v3m8-3v3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <span>
        <strong>{business.name}</strong>
        <small>{business.descriptor}</small>
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
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
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
        <Link href="/devis" className="button header-quote">
          Parler de mon projet <Icon name="arrow" width={17} />
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
          {[...links, { href: "/devis", label: "Parler de mon projet" }].map(
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
    </header>
  );
}
