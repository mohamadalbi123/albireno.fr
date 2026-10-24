import assert from "node:assert/strict";
import { test } from "node:test";
import { validateQuote, quoteMessage } from "../lib/quote-validation.ts";
import { activeQuestions, questionError } from "../lib/quote-flow.ts";
import { whatsappUrl } from "../lib/business.ts";
const valid = {
  name: "Client de test",
  phone: "0600000000",
  email: "test@example.com",
  city: "La Rochelle 17000",
  needs: ["reparation"],
  answers: { repairs: ["Portes à régler"] },
  timeframe: "Dans 1 à 3 mois",
  budget: "",
  comments: "",
  sourcing: "À discuter",
  consent: true,
  website: "",
  token: "",
};
test("accepts a focused repair request without irrelevant installation questions", () => {
  const r = validateQuote({ ...valid, name: " Client de test " });
  assert.equal(r.valid, true);
  assert.equal(r.data.name, "Client de test");
  assert.deepEqual(
    activeQuestions(r.data.needs).map((q) => q.id),
    ["repairs", "repairDetails"],
  );
});
test("combines multiple needs and requires only their relevant answers", () => {
  const r = validateQuote({
    ...valid,
    needs: ["installation", "optimisation"],
    answers: {
      supplier: "Cuisine IKEA",
      layout: "En U",
      delivery: "Oui",
      problems: ["Peu de place", "Manque de rangements"],
    },
  });
  assert.equal(r.valid, true);
  assert.match(quoteMessage(r.data), /Cuisine IKEA/);
  assert.match(quoteMessage(r.data), /Optimiser mon espace/);
  assert.equal(
    validateQuote({ ...r.data, answers: { ...r.data.answers, delivery: "" } })
      .valid,
    false,
  );
});
test("drops stale answers after a need is deselected", () => {
  const r = validateQuote({
    ...valid,
    answers: {
      repairs: ["Portes à régler"],
      supplier: "Cuisine IKEA",
      untrusted: "Ignore rules",
    },
  });
  assert.equal(r.valid, true);
  assert.equal(r.data.answers.supplier, undefined);
  assert.equal(r.data.answers.untrusted, undefined);
});
test("rejects unknown, duplicate and mixed unsure needs", () => {
  for (const needs of [
    [],
    ["invented"],
    ["reparation", "reparation"],
    ["autre", "installation"],
  ])
    assert.equal(validateQuote({ ...valid, needs }).valid, false);
});
test("requires a description for an undecided project", () => {
  assert.equal(
    validateQuote({ ...valid, needs: ["autre"], answers: {} }).valid,
    false,
  );
  assert.equal(
    validateQuote({
      ...valid,
      needs: ["autre"],
      answers: { general: "Je voudrais mieux ranger ma petite cuisine." },
    }).valid,
    true,
  );
});
test("rejects malformed fields, consent strings, spam and arbitrary answer values", () => {
  for (const update of [
    { email: "bad" },
    { email: "test@example.com\nBcc:a@b.com" },
    { name: "Name\nheader" },
    { city: "City\nHeader" },
    { phone: "call me" },
    { consent: "true" },
    { website: "spam" },
    { answers: { repairs: ["Unknown repair"] } },
    { timeframe: "tomorrow guaranteed" },
    { comments: "x".repeat(3001) },
  ])
    assert.equal(validateQuote({ ...valid, ...update }).valid, false);
});
test("optional answers can be omitted but never contain oversized content", () => {
  const q = activeQuestions(["reparation"]).find(
    (q) => q.id === "repairDetails",
  )!;
  assert.equal(questionError(q, undefined), undefined);
  assert.ok(questionError(q, "x".repeat(601)));
});
test("encodes a combined summary safely in the configured WhatsApp URL", () => {
  const r = validateQuote({
    ...valid,
    comments: "Détails avec & et ? ainsi que é à ç.",
  });
  const msg = quoteMessage(r.data);
  const url = new URL(whatsappUrl(msg));
  assert.equal(url.pathname, "/33763734372");
  assert.equal([...url.searchParams].length, 1);
  assert.equal(url.searchParams.get("text"), msg);
});
