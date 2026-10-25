"use client";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  needOptions,
  activeQuestions,
  questionError,
  timeframes,
  type Need,
  type Answer,
} from "@/lib/quote-flow";
import {
  validateQuote,
  quoteMessage,
  type QuoteData,
  type FieldErrors,
} from "@/lib/quote-validation";
import { photoSelectionError, type PhotoPayload } from "@/lib/photo-rules";
import { whatsappUrl } from "@/lib/business";
import { Icon } from "./icon";
declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}
function SpamCheck({
  onToken,
  onError,
}: {
  onToken: (token: string) => void;
  onError: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  function render() {
    if (container.current && window.turnstile && widget.current === undefined)
      widget.current = window.turnstile.render(container.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        action: "quote",
        language: "fr",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": onError,
      });
  }
  useEffect(
    () => () => {
      if (widget.current !== undefined)
        window.turnstile?.remove(widget.current);
    },
    [],
  );
  return (
    <>
      <div ref={container} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={render}
      />
    </>
  );
}
const blank: QuoteData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  needs: [],
  answers: {},
  timeframe: "",
  budget: "",
  comments: "",
  sourcing: "À discuter",
  consent: false,
  website: "",
  token: "",
};
export function QuoteForm({
  mailEnabled = false,
  initialService = "",
}: {
  mailEnabled?: boolean;
  initialService?: string;
}) {
  const [data, setData] = useState<QuoteData>(() => ({
    ...blank,
    needs: needOptions.some((o) => o.id === initialService)
      ? [initialService as Need]
      : [],
  }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [photos, setPhotos] = useState<PhotoPayload[]>([]);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [prepared, setPrepared] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [challengeKey, setChallengeKey] = useState(0);
  const title = useRef<HTMLHeadingElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const photoVersion = useRef(0);
  const qs = activeQuestions(data.needs);
  const contextStep = qs.length + 1,
    contactStep = qs.length + 2,
    reviewStep = qs.length + 3;
  const currentQuestion =
    step > 0 && step <= qs.length ? qs[step - 1] : undefined;
  useEffect(() => {
    if (step > 0) title.current?.focus();
  }, [step]);
  useEffect(
    () => () => {
      photoVersion.current++;
    },
    [],
  );
  function change<K extends keyof QuoteData>(key: K, value: QuoteData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setPrepared("");
    setStatus("");
    setSuccess(false);
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }
  function answer(id: string, value: Answer) {
    setData((d) => ({ ...d, answers: { ...d.answers, [id]: value } }));
    setErrors({});
    setPrepared("");
    setStatus("");
  }
  function toggleNeed(id: Need) {
    let next: Need[] =
      id === "autre"
        ? ["autre"]
        : data.needs.includes(id)
          ? data.needs.filter((n) => n !== id)
          : [...data.needs.filter((n) => n !== "autre"), id];
    const allowed = activeQuestions(next).map((q) => q.id);
    setData((d) => ({
      ...d,
      needs: next,
      answers: Object.fromEntries(
        Object.entries(d.answers).filter(([key]) => allowed.includes(key)),
      ),
    }));
    setErrors({});
    setPrepared("");
    setStatus("");
  }
  function move(to: number) {
    setStep(to);
    setErrors({});
    setStatus("");
    setPrepared("");
    setToken("");
  }
  function next() {
    let issues: FieldErrors = {};
    if (step === 0 && !data.needs.length)
      issues.needs =
        "Choisissez au moins un besoin ou « Je ne sais pas encore ».";
    if (currentQuestion) {
      const error = questionError(
        currentQuestion,
        data.answers[currentQuestion.id],
      );
      if (error) issues[currentQuestion.id] = error;
    }
    if (step === contextStep) {
      if (!timeframes.includes(data.timeframe))
        issues.timeframe = "Choisissez votre calendrier indicatif.";
      if (data.budget.length > 100) issues.budget = "100 caractères maximum.";
    }
    if (step === contactStep) {
      const checked = validateQuote({ ...data, consent: true });
      issues = Object.fromEntries(
        Object.entries(checked.errors).filter(([k]) =>
          ["name", "phone", "email", "city", "comments"].includes(k),
        ),
      );
      if (photoError) issues.photos = photoError;
    }
    if (Object.keys(issues).length) {
      setErrors(issues);
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    move(step + 1);
  }
  async function selectPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;
    const version = ++photoVersion.current;
    const error = photoSelectionError(files);
    setPhotoError(error || "");
    setPhotos([]);
    setPrepared("");
    if (error) {
      setPhotoBusy(false);
      return;
    }
    setPhotoBusy(true);
    try {
      const selected: PhotoPayload[] = [];
      for (const file of files) {
        const content = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(",")[1]);
          reader.onerror = () =>
            reject(new Error("Une photo n’a pas pu être lue."));
          reader.readAsDataURL(file);
        });
        selected.push({ name: file.name, type: file.type, content });
      }
      if (version === photoVersion.current) setPhotos(selected);
    } catch {
      if (version === photoVersion.current)
        setPhotoError(
          "Une photo n’a pas pu être lue. Réessayez avec un autre fichier.",
        );
    } finally {
      if (version === photoVersion.current) setPhotoBusy(false);
    }
  }
  async function submit() {
    const checked = validateQuote({ ...data, token });
    setErrors(checked.errors);
    setStatus("");
    setPrepared("");
    if (!checked.valid) {
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    if (!mailEnabled) {
      setPrepared(
        whatsappUrl(
          quoteMessage(checked.data) +
            (photos.length
              ? `\n\n${photos.length} photo(s) à joindre manuellement dans WhatsApp.`
              : ""),
        ),
      );
      setStatus(
        "Votre message est prêt. Aucun message ni photo n’a été envoyé. Ouvrez WhatsApp pour vérifier le texte et l’envoyer ; les photos devront être jointes manuellement.",
      );
      requestAnimationFrame(() => result.current?.focus());
      return;
    }
    if (!token) {
      setStatus("Terminez la vérification anti-spam avant l’envoi.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...checked.data, photos }),
        signal: AbortSignal.timeout(30000),
      });
      const payload = await response.json();
      if (!response.ok) {
        if (payload.errors) setErrors(payload.errors);
        throw new Error(payload.message || "L’envoi n’a pas pu être confirmé.");
      }
      setSuccess(true);
      setPhotos([]);
      setStatus(
        "Votre demande a été transmise à ALBI RENO. Nous pourrons examiner votre projet puis échanger sur les précisions nécessaires et les prochaines étapes.",
      );
    } catch (error) {
      setStatus(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "L’envoi n’a pas pu être confirmé. Contactez-nous avant de renouveler votre demande.",
      );
    } finally {
      setPending(false);
      setToken("");
      setChallengeKey((k) => k + 1);
      requestAnimationFrame(() => result.current?.focus());
    }
  }
  function field(
    name: "name" | "email" | "phone" | "city",
    label: string,
    type = "text",
    autoComplete?: string,
  ) {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label} *</label>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={data[name]}
          onChange={(e) => change(name, e.target.value)}
          maxLength={name === "email" ? 254 : name === "phone" ? 30 : 100}
          required
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <span className="field-error" id={`${name}-error`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  }
  const heading =
    step === 0
      ? "Quel est votre projet de cuisine ?"
      : currentQuestion?.title ||
        (step === contextStep
          ? "Quel calendrier avez-vous en tête ?"
          : step === contactStep
            ? "Faisons connaissance."
            : "Tout est juste ? Vérifions ensemble.");
  return (
    <div className="quote-wizard">
      <div className="wizard-progress">
        <span>VOTRE CUISINE, VOTRE PROJET</span>
        <span>
          Étape {step + 1} / {reviewStep + 1}
        </span>
        <progress
          aria-label="Avancement de votre demande"
          max={reviewStep + 1}
          value={step + 1}
        />
      </div>
      <div className="wizard-inner">
        <h2 ref={title} tabIndex={-1}>
          {heading}
        </h2>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (step === reviewStep) void submit();
            else next();
          }}
        >
          {step === 0 && (
            <>
              <p>
                Choisissez un ou plusieurs besoins. Nous vous poserons
                uniquement les questions utiles.
              </p>
              <div className="need-grid">
                {needOptions.map((n) => (
                  <button
                    type="button"
                    className={`need-card ${data.needs.includes(n.id) ? "selected" : ""}`}
                    aria-pressed={data.needs.includes(n.id)}
                    key={n.id}
                    onClick={() => toggleNeed(n.id)}
                  >
                    {n.image && (
                      <Image src={n.image} alt="" width={70} height={64} />
                    )}
                    <span>
                      <strong>{n.label}</strong>
                      <small>{n.description}</small>
                    </span>
                    <span className="choice-mark" aria-hidden="true">
                      {data.needs.includes(n.id) ? "✓" : "+"}
                    </span>
                  </button>
                ))}
              </div>
              <p className="wizard-caption">
                Vignettes d’inspiration générées par IA.
              </p>
              {errors.needs && (
                <p className="field-error" role="alert">
                  {errors.needs}
                </p>
              )}
            </>
          )}
          {currentQuestion && (
            <>
              <p>
                {currentQuestion.help ||
                  (currentQuestion.type === "multiple"
                    ? "Plusieurs réponses sont possibles."
                    : currentQuestion.optional
                      ? "Cette question est facultative. Vous pouvez passer si vous ne savez pas encore."
                      : "Choisissez la réponse qui correspond le mieux à votre projet.")}
              </p>
              {currentQuestion.type === "text" ? (
                <div className="form-field">
                  <label className="sr-only" htmlFor={currentQuestion.id}>
                    {currentQuestion.title}
                  </label>
                  <textarea
                    id={currentQuestion.id}
                    rows={4}
                    maxLength={600}
                    placeholder={currentQuestion.placeholder}
                    value={String(data.answers[currentQuestion.id] || "")}
                    onChange={(e) => answer(currentQuestion.id, e.target.value)}
                    aria-invalid={!!errors[currentQuestion.id]}
                    aria-describedby={
                      errors[currentQuestion.id] ? "question-error" : undefined
                    }
                  />
                </div>
              ) : (
                <fieldset className="choice-grid">
                  <legend className="sr-only">{currentQuestion.title}</legend>
                  {currentQuestion.options?.map((option) => {
                    const value = data.answers[currentQuestion.id];
                    const checked =
                      currentQuestion.type === "single"
                        ? value === option
                        : Array.isArray(value) && value.includes(option);
                    return (
                      <label
                        className={`choice-card ${checked ? "selected" : ""}`}
                        key={option}
                      >
                        <input
                          type={
                            currentQuestion.type === "single"
                              ? "radio"
                              : "checkbox"
                          }
                          name={currentQuestion.id}
                          value={option}
                          checked={checked}
                          onChange={() =>
                            answer(
                              currentQuestion.id,
                              currentQuestion.type === "single"
                                ? option
                                : checked
                                  ? (value as string[]).filter(
                                      (v) => v !== option,
                                    )
                                  : [
                                      ...(Array.isArray(value) ? value : []),
                                      option,
                                    ],
                            )
                          }
                          aria-invalid={!!errors[currentQuestion.id]}
                          aria-describedby={
                            errors[currentQuestion.id]
                              ? "question-error"
                              : undefined
                          }
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </fieldset>
              )}
              {errors[currentQuestion.id] && (
                <p className="field-error" id="question-error" role="alert">
                  {errors[currentQuestion.id]}
                </p>
              )}
            </>
          )}
          {step === contextStep && (
            <>
              <p>
                Ces indications aident à préparer l’échange. Elles ne
                constituent pas une réservation ni une estimation automatique.
              </p>
              <fieldset className="choice-grid">
                <legend className="sr-only">Calendrier souhaité</legend>
                {timeframes.map((t) => (
                  <label
                    className={`choice-card ${data.timeframe === t ? "selected" : ""}`}
                    key={t}
                  >
                    <input
                      type="radio"
                      name="timeframe"
                      value={t}
                      checked={data.timeframe === t}
                      onChange={() => change("timeframe", t)}
                      aria-invalid={!!errors.timeframe}
                    />
                    {t}
                  </label>
                ))}
              </fieldset>
              {errors.timeframe && (
                <p className="field-error" role="alert">
                  {errors.timeframe}
                </p>
              )}
              <div className="form-field">
                <label htmlFor="budget">Budget indicatif (facultatif)</label>
                <input
                  id="budget"
                  value={data.budget}
                  maxLength={100}
                  onChange={(e) => change("budget", e.target.value)}
                  placeholder="Votre enveloppe ou fourchette, si elle est définie"
                />
              </div>
              <fieldset className="sourcing-choices">
                <legend>
                  Souhaitez-vous une aide au choix des meubles ou matériaux ?
                </legend>
                {["Oui", "Non", "À discuter"].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="sourcing"
                      checked={data.sourcing === value}
                      onChange={() => change("sourcing", value)}
                    />
                    {value}
                  </label>
                ))}
              </fieldset>
            </>
          )}
          {step === contactStep && (
            <>
              <p>
                Les champs marqués d’un * sont nécessaires pour vous
                recontacter. Vos informations ne sont pas enregistrées pendant
                les étapes.
              </p>
              <div className="form-row">
                {field("name", "Nom et prénom", "text", "name")}
                {field("phone", "Téléphone", "tel", "tel")}
              </div>
              <div className="form-row">
                {field("email", "Adresse e-mail", "email", "email")}
                {field(
                  "city",
                  "Commune / code postal",
                  "text",
                  "address-level2",
                )}
              </div>
              <div className="form-field">
                <label htmlFor="comments">
                  Des précisions à ajouter ? (facultatif)
                </label>
                <textarea
                  id="comments"
                  rows={3}
                  maxLength={3000}
                  value={data.comments}
                  onChange={(e) => change("comments", e.target.value)}
                />
              </div>
              <div className="photo-upload">
                <label htmlFor="photos">
                  <strong>Photographies de votre cuisine</strong>
                  <span>
                    Facultatif · 3 photos maximum · JPEG, PNG ou WebP · 1 Mo par
                    photo, 2 Mo au total.
                  </span>
                </label>
                <input
                  id="photos"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={selectPhotos}
                  aria-describedby="photo-privacy"
                  aria-invalid={!!photoError}
                />
                <p id="photo-privacy">
                  {mailEnabled
                    ? "Les photos seront transmises uniquement après votre validation finale. Évitez les visages, documents et informations personnelles visibles."
                    : "Les photos restent dans cette page. Pour une demande par WhatsApp, vous devrez les joindre vous-même au message."}
                </p>
                {photoBusy && <p role="status">Lecture des photos…</p>}
                {photoError && (
                  <div>
                    <p className="field-error" role="alert">
                      {photoError}
                    </p>
                    <button
                      type="button"
                      className="wizard-back"
                      onClick={() => {
                        photoVersion.current++;
                        setPhotos([]);
                        setPhotoError("");
                        setPhotoBusy(false);
                        setErrors((e) => {
                          const next = { ...e };
                          delete next.photos;
                          return next;
                        });
                      }}
                    >
                      Continuer sans photos
                    </button>
                  </div>
                )}
                <ul className="photo-list">
                  {photos.map((p, i) => (
                    <li key={`${p.name}-${i}`}>
                      <span>{p.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotos((v) => v.filter((_, index) => index !== i));
                          setPrepared("");
                        }}
                        aria-label={`Retirer ${p.name}`}
                      >
                        Retirer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {step === reviewStep && (
            <>
              <p>
                Relisez votre demande avant de la transmettre. Aucun tarif ni
                engagement de travaux n’est calculé automatiquement.
              </p>
              <section className="quote-summary">
                <div className="summary-heading">
                  <h3>Votre projet</h3>
                  <button type="button" onClick={() => move(0)}>
                    Modifier les besoins
                  </button>
                </div>
                <p>
                  {data.needs
                    .map((n) => needOptions.find((o) => o.id === n)?.label)
                    .join(" · ")}
                </p>
                <dl>
                  {qs
                    .filter((q) => data.answers[q.id]?.length)
                    .map((q) => (
                      <div key={q.id}>
                        <dt>{q.title}</dt>
                        <dd>
                          {Array.isArray(data.answers[q.id])
                            ? (data.answers[q.id] as string[]).join(", ")
                            : data.answers[q.id]}
                          <button
                            type="button"
                            onClick={() =>
                              move(qs.findIndex((item) => item.id === q.id) + 1)
                            }
                            aria-label={`Modifier : ${q.title}`}
                          >
                            Modifier
                          </button>
                        </dd>
                      </div>
                    ))}
                  <div>
                    <dt>Calendrier</dt>
                    <dd>{data.timeframe}</dd>
                  </div>
                  <div>
                    <dt>Budget indicatif</dt>
                    <dd>{data.budget || "Non précisé"}</dd>
                  </div>
                  <div>
                    <dt>Aide au choix / sourcing</dt>
                    <dd>{data.sourcing}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="summary-edit"
                  onClick={() => move(contextStep)}
                >
                  Modifier le calendrier ou le budget
                </button>
                <div className="summary-heading">
                  <h3>Vos coordonnées</h3>
                  <button type="button" onClick={() => move(contactStep)}>
                    Modifier les coordonnées
                  </button>
                </div>
                <p>
                  {data.name}
                  <br />
                  {data.email}
                  <br />
                  {data.phone}
                  <br />
                  {data.city}
                </p>
                {data.comments && (
                  <p className="summary-comments">{data.comments}</p>
                )}
                <p>
                  {photos.length} photo(s) sélectionnée(s)
                  {!mailEnabled && photos.length > 0
                    ? " — à joindre manuellement dans WhatsApp"
                    : ""}
                </p>
              </section>
              <label className="consent">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => change("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                />
                <span>
                  J’ai lu la{" "}
                  <Link
                    href="/politique-confidentialite"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    politique de confidentialité
                  </Link>{" "}
                  et j’accepte que mes informations soient utilisées pour
                  répondre à ma demande. *
                </span>
              </label>
              {errors.consent && (
                <p className="field-error" role="alert">
                  {errors.consent}
                </p>
              )}
              {mailEnabled ? (
                <SpamCheck
                  key={challengeKey}
                  onToken={setToken}
                  onError={() => {
                    setToken("");
                    setStatus(
                      "La vérification anti-spam est indisponible. Réessayez ou contactez-nous directement.",
                    );
                  }}
                />
              ) : (
                <p className="form-notice">
                  L’envoi automatique par e-mail n’est pas activé. Vous pourrez
                  relire et envoyer votre demande dans WhatsApp.
                </p>
              )}
            </>
          )}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Ne pas remplir ce champ</label>
            <input
              id="website"
              tabIndex={-1}
              autoComplete="off"
              value={data.website}
              onChange={(e) => change("website", e.target.value)}
            />
          </div>
          <div className="wizard-actions">
            {step > 0 && !success && (
              <button
                className="wizard-back"
                type="button"
                onClick={() => move(step - 1)}
                disabled={pending}
              >
                ← Retour
              </button>
            )}
            {!success && (
              <button
                className="button"
                type="submit"
                disabled={pending || photoBusy}
              >
                {pending
                  ? "Envoi en cours…"
                  : step === reviewStep
                    ? mailEnabled
                      ? "Envoyer ma demande"
                      : "Préparer le message WhatsApp"
                    : step === contactStep
                      ? "Vérifier ma demande"
                      : "Continuer"}
                <Icon name="arrow" width={18} />
              </button>
            )}
          </div>
          <div
            ref={result}
            tabIndex={-1}
            className={`form-status ${success ? "success" : ""}`}
            role="status"
            aria-live="polite"
          >
            {status && <p>{status}</p>}
            {prepared && (
              <a
                className="button"
                href={prepared}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouvrir WhatsApp et envoyer ↗
              </a>
            )}
            {success && (
              <Link className="text-link" href="/">
                Retour à l’accueil
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
