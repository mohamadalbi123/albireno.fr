import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { validateQuote, quoteMessage } from "@/lib/quote-validation";
import { preparePhotos } from "@/lib/photo-validation";
import { MAX_QUOTE_BODY_BYTES } from "@/lib/photo-rules";
import { mailReady, contactEmail } from "@/lib/site";
export const runtime = "nodejs";
const reply = (body: object, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  let sameOrigin = false;
  try {
    const parsed = new URL(origin || "");
    sameOrigin =
      ["http:", "https:"].includes(parsed.protocol) &&
      parsed.host === request.headers.get("host");
  } catch {}
  if (!sameOrigin)
    return reply({ message: "Origine de la demande non autorisée." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ message: "Format de demande invalide." }, 415);
  // Enforce the body limit even when Content-Length is omitted or inaccurate.
  let body = "";
  let size = 0;
  const reader = request.body?.getReader();
  if (!reader) return reply({ message: "Demande vide." }, 400);
  try {
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_QUOTE_BODY_BYTES) {
        await reader.cancel();
        return reply({ message: "La demande est trop volumineuse." }, 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return reply({ message: "La demande est illisible." }, 400);
  }
  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return reply({ message: "Format de demande invalide." }, 400);
  }
  const validation = validateQuote(input);
  if (!validation.valid)
    return reply(
      {
        message: "Vérifiez les champs du formulaire.",
        errors: validation.errors,
      },
      400,
    );
  if (!mailReady)
    return reply(
      {
        message:
          "L’envoi par e-mail n’est pas encore disponible. Contactez-nous sur WhatsApp.",
      },
      503,
    );
  const { data } = validation;
  if (!data.token || data.token.length > 2048)
    return reply(
      { message: "Veuillez effectuer la vérification anti-spam." },
      400,
    );
  try {
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: data.token,
        }),
        signal: AbortSignal.timeout(6000),
      },
    );
    const challenge = await verification.json();
    const hosts = (process.env.TURNSTILE_HOSTNAMES || "")
      .split(",")
      .map((h) => h.trim());
    if (
      !verification.ok ||
      !challenge.success ||
      challenge.action !== "quote" ||
      !hosts.includes(challenge.hostname)
    )
      return reply(
        {
          message:
            "La vérification anti-spam a expiré ou échoué. Veuillez la recommencer.",
        },
        400,
      );
    let attachments: { filename: string; content: string }[];
    try {
      attachments = await preparePhotos(
        (input as Record<string, unknown>).photos,
      );
    } catch (error) {
      return reply(
        {
          message:
            error instanceof Error ? error.message : "Photographies invalides.",
        },
        400,
      );
    }
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `quote-${createHash("sha256").update(data.token).digest("hex")}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [contactEmail],
        reply_to: data.email,
        attachments,
        subject: `Demande de devis — ${data.city}`,
        text:
          quoteMessage(data) +
          "\n\nLa personne a accepté le traitement de cette demande via le formulaire.",
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!sent.ok)
      return reply(
        {
          message:
            "L’envoi n’a pas pu être confirmé. Contactez-nous sur WhatsApp.",
        },
        502,
      );
    const receipt = await sent.json();
    if (!receipt.id)
      return reply(
        {
          message:
            "L’envoi n’a pas pu être confirmé. Contactez-nous sur WhatsApp.",
        },
        502,
      );
    return reply({ message: "Votre demande a bien été transmise." }, 200);
  } catch {
    return reply(
      {
        message:
          "L’envoi n’a pas pu être confirmé. Contactez-nous sur WhatsApp avant de renouveler votre demande.",
      },
      502,
    );
  }
}
