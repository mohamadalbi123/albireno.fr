import assert from "node:assert/strict";
import { test } from "node:test";
import { validateQuote, quoteMessage } from "../lib/quote-validation.ts";
import { whatsappUrl } from "../lib/business.ts";
const valid = {
  name: "Client de test",
  phone: "06 00 00 00 00",
  email: "test@example.com",
  city: "Aytré",
  workType: "Travaux de plâtrerie",
  description: "Demande de test : repenser une pièce intérieure.",
  consent: true,
  website: "",
  token: "",
};
test("accepts and trims a normal French request", () => {
  const result = validateQuote({ ...valid, name: "  Client de test  " });
  assert.equal(result.valid, true);
  assert.equal(result.data.name, "Client de test");
});
test("reports required fields and rejects missing consent", () => {
  const result = validateQuote({});
  assert.equal(result.valid, false);
  for (const field of [
    "name",
    "phone",
    "email",
    "city",
    "workType",
    "description",
    "consent",
  ])
    assert.ok(result.errors[field as keyof typeof result.errors]);
});
test("rejects malformed email, arbitrary services and header injection", () => {
  for (const change of [
    { email: "a@b" },
    { email: "test@example.com\nBcc: other@example.com" },
    { workType: "invented" },
    { city: "Aytré\nSubject: test" },
    { phone: "call me" },
  ])
    assert.equal(validateQuote({ ...valid, ...change }).valid, false);
});
test("rejects oversized input and hidden spam field", () => {
  assert.equal(
    validateQuote({ ...valid, description: "x".repeat(5001) }).valid,
    false,
  );
  assert.equal(
    validateQuote({ ...valid, website: "https://spam.example" }).valid,
    false,
  );
});
test("does not treat truthy strings as consent", () =>
  assert.equal(validateQuote({ ...valid, consent: "true" }).valid, false));
test("encodes user content in the WhatsApp URL without creating extra parameters", () => {
  const message = quoteMessage(
    validateQuote({
      ...valid,
      description: "Projet avec & et ? ainsi que des accents é à ç.",
    }).data,
  );
  const url = new URL(whatsappUrl(message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/33781844419");
  assert.equal([...url.searchParams].length, 1);
  assert.equal(url.searchParams.get("text"), message);
});
