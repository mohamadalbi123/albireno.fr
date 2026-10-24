"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./icon";
import {
  validateQuote,
  quoteMessage,
  workTypes,
  type FieldErrors,
} from "@/lib/quote-validation";
import { whatsappUrl } from "@/lib/business";
declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}
export function QuoteForm({
  mailEnabled = false,
  initialService = "",
}: {
  mailEnabled?: boolean;
  initialService?: string;
}) {
  const id = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [prepared, setPrepared] = useState("");
  const [token, setToken] = useState("");
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(
    () => () => {
      if (widgetId.current !== undefined && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = undefined;
      }
    },
    [],
  );
  function renderWidget() {
    if (widget.current && window.turnstile && widgetId.current === undefined)
      widgetId.current = window.turnstile.render(widget.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        action: "quote",
        language: "fr",
        theme: "light",
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        "error-callback": () => {
          setToken("");
          setStatus(
            "La vérification anti-spam est indisponible. Réessayez ou contactez-nous sur WhatsApp.",
          );
        },
      });
  }
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const checked = validateQuote({
      ...Object.fromEntries(fields),
      consent: fields.get("consent") === "on",
      token,
    });
    setErrors(checked.errors);
    setStatus("");
    setSuccess(false);
    setPrepared("");
    if (!checked.valid) {
      const first = Object.keys(checked.errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (!mailEnabled) {
      setPrepared(whatsappUrl(quoteMessage(checked.data)));
      setStatus(
        "Votre demande est prête. Ouvrez WhatsApp pour vérifier le message et l’envoyer. Aucun message n’a encore été envoyé.",
      );
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    if (!token) {
      setStatus("Veuillez terminer la vérification anti-spam avant l’envoi.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(
          result.message ||
            "L’envoi n’a pas pu être confirmé. Réessayez ou contactez-nous sur WhatsApp.",
        );
      }
      setSuccess(true);
      setStatus(
        "Votre demande a bien été transmise. Merci de nous avoir présenté votre projet.",
      );
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "L’envoi n’a pas pu être confirmé. Contactez-nous sur WhatsApp avant de renouveler votre demande.",
      );
    } finally {
      setPending(false);
      setToken("");
      if (widgetId.current && window.turnstile)
        window.turnstile.reset(widgetId.current);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  function field(
    name: "name" | "phone" | "email" | "city",
    label: string,
    placeholder: string,
    type = "text",
    autoComplete?: string,
  ) {
    return (
      <div className="form-field">
        <label htmlFor={`${id}-${name}`}>
          {label} <span>*</span>
        </label>
        <input
          id={`${id}-${name}`}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          maxLength={name === "email" ? 254 : name === "phone" ? 30 : 100}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}
        />
        {errors[name] && (
          <span className="field-error" id={`${id}-${name}-error`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  }
  return (
    <form
      className="quote-form"
      onSubmit={submit}
      noValidate
      onChange={() => {
        if (prepared) {
          setPrepared("");
          setStatus("");
        }
        if (success) {
          setSuccess(false);
          setStatus("");
        }
      }}
    >
      <div className="form-heading">
        <span className="form-step">PARLONS DE VOTRE INTÉRIEUR</span>
        <h3>Présentez votre projet</h3>
        <p>Les champs marqués d’un * sont obligatoires.</p>
      </div>
      {!mailEnabled && (
        <div className="form-notice">
          <Icon name="chat" width={18} />
          <p>
            L’envoi automatique par e-mail n’est pas activé. Préparez votre
            demande ici, puis envoyez-la sur WhatsApp.
          </p>
        </div>
      )}
      <div className="form-row">
        {field("name", "Nom et prénom", "Votre nom", "text", "name")}
        {field("phone", "Téléphone", "06 00 00 00 00", "tel", "tel")}
      </div>
      <div className="form-row">
        {field("email", "Adresse e-mail", "vous@exemple.fr", "email", "email")}
        {field(
          "city",
          "Ville du projet",
          "Ex. La Rochelle",
          "text",
          "address-level2",
        )}
      </div>
      <div className="form-field">
        <label htmlFor={`${id}-work`}>
          Type de travaux <span>*</span>
        </label>
        <select
          name="workType"
          id={`${id}-work`}
          defaultValue={initialService}
          required
          aria-invalid={!!errors.workType}
          aria-describedby={errors.workType ? `${id}-work-error` : undefined}
        >
          <option value="" disabled>
            Votre projet concerne…
          </option>
          {workTypes.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
        {errors.workType && (
          <span className="field-error" id={`${id}-work-error`}>
            {errors.workType}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor={`${id}-description`}>
          Votre projet en quelques mots <span>*</span>
        </label>
        <textarea
          name="description"
          id={`${id}-description`}
          rows={4}
          required
          minLength={20}
          maxLength={5000}
          placeholder="Les pièces concernées, vos envies, une surface approximative…"
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? `${id}-description-error` : undefined
          }
        />
        {errors.description && (
          <span className="field-error" id={`${id}-description-error`}>
            {errors.description}
          </span>
        )}
      </div>
      <p className="photo-help">
        <Icon name="image" width={17} />
        Des photos à partager ? Vous pourrez les joindre dans WhatsApp.
      </p>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Ne pas remplir ce champ</label>
        <input
          name="website"
          id={`${id}-website`}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <label className="consent" htmlFor={`${id}-consent`}>
        <input
          id={`${id}-consent`}
          type="checkbox"
          name="consent"
          required
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
        />
        <span>
          J’ai lu la{" "}
          <Link href="/politique-confidentialite" target="_blank">
            politique de confidentialité
          </Link>{" "}
          et j’accepte que mes informations soient utilisées pour répondre à ma
          demande. *
        </span>
      </label>
      {errors.consent && (
        <span className="field-error" id={`${id}-consent-error`}>
          {errors.consent}
        </span>
      )}
      {mailEnabled && (
        <>
          <div ref={widget} />
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            onReady={renderWidget}
          />
          <p className="form-privacy">
            Protection anti-spam Cloudflare Turnstile. Vos informations servent
            uniquement à traiter votre demande.
          </p>
        </>
      )}
      <button type="submit" className="button form-submit" disabled={pending}>
        {pending
          ? "Envoi en cours…"
          : mailEnabled
            ? "Envoyer ma demande"
            : "Préparer ma demande sur WhatsApp"}
        <Icon name="arrow" width={18} />
      </button>
      <div
        ref={statusRef}
        tabIndex={-1}
        className={`form-status ${success ? "success" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status && <p>{status}</p>}
        {prepared && (
          <a
            className="button navy"
            href={prepared}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvrir WhatsApp et envoyer
            <Icon name="diagonal" />
          </a>
        )}
      </div>
      <p className="form-privacy">
        {mailEnabled
          ? "Vos informations sont transmises lors de l’envoi de votre demande."
          : "Vos informations restent dans cette page jusqu’à l’ouverture du lien WhatsApp. Vous pourrez alors vérifier et envoyer le message."}
      </p>
    </form>
  );
}
