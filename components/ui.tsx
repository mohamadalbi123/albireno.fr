import Link from "next/link";
import { Icon } from "./icon";
import { whatsappUrl } from "@/lib/business";
export function Button({
  children,
  href = "/devis",
  variant = "",
  external = false,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: string;
  external?: boolean;
}) {
  const content = (
    <>
      {children}
      <Icon name={external ? "diagonal" : "arrow"} width={18} height={18} />
    </>
  );
  return external ? (
    <a
      className={`button ${variant}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <Link className={`button ${variant}`} href={href}>
      {content}
    </Link>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <Link className="breadcrumb" href="/">
          Accueil <span>/</span>
        </Link>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p className="lead">{text}</p>
      </div>
    </section>
  );
}
export function ContactCTA() {
  return (
    <section className="cta-section container">
      <div>
        <Eyebrow light>La suite commence par un échange</Eyebrow>
        <h2>
          Votre cuisine mérite
          <br />
          qu’on en parle.
        </h2>
        <p>Une idée, une question, des plans ? Faisons le point ensemble.</p>
      </div>
      <div className="cta-actions">
        <Button>Parler de mon projet</Button>
        <a
          className="text-link light"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="chat" />
          Discuter sur WhatsApp <Icon name="diagonal" />
        </a>
      </div>
    </section>
  );
}
