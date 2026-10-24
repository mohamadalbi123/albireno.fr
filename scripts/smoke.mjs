import assert from "node:assert/strict";
const origin = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const paths = [
  "/",
  "/installation-cuisine-la-rochelle",
  "/renovation-cuisine-la-rochelle",
  "/optimisation-petite-cuisine",
  "/reparation-cuisine-la-rochelle",
  "/conception-cuisine-3d",
  "/realisations",
  "/realisations/cuisine-optimisee",
  "/notre-approche",
  "/devis",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
];
const titles = new Set();
const links = new Set();
for (const path of paths) {
  const r = await fetch(origin + path);
  assert.equal(r.status, 200, path);
  assert.match(r.headers.get("x-robots-tag") || "", /noindex/, path);
  const html = await r.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path + " one H1");
  assert.match(html, /<html[^>]*lang="fr"/);
  assert.match(html, /name="description"/);
  assert.doesNotMatch(
    html,
    /Luna|LUNA|NOM DE MARQUE|33781844419|Suzanne Lenglen/,
  );
  assert.doesNotMatch(html, /lazoya-beauty-center|5a59999f-0640/);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title);
  assert.ok(!titles.has(title), "unique title " + path);
  titles.add(title);
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (!m[1].startsWith("/_next")) links.add(m[1]);
  }
  console.log("PASS " + path);
}
for (const path of links) {
  assert.equal((await fetch(origin + path)).status, 200, "link " + path);
}
assert.match(
  await (await fetch(origin + "/robots.txt")).text(),
  /Disallow: \//,
);
assert.ok(
  !(await (await fetch(origin + "/sitemap.xml")).text()).includes("<loc>"),
);
assert.equal((await fetch(origin + "/does-not-exist")).status, 404);
assert.equal((await fetch(origin + "/opengraph-image")).status, 200);
assert.equal(
  (await fetch(origin + "/realisations/lazoya-beauty-center")).status,
  404,
);
for (const old of [
  "/renovation-interieure-la-rochelle",
  "/mobilier-sur-mesure",
  "/amenagement-professionnel",
  "/montage-meubles-la-rochelle",
])
  assert.equal((await fetch(origin + old)).status, 404);
const payload = {
  name: "Client test",
  phone: "0600000000",
  email: "test@example.com",
  city: "La Rochelle",
  needs: ["reparation"],
  answers: { repairs: ["Portes à régler"] },
  timeframe: "Dans 1 à 3 mois",
  budget: "",
  comments: "",
  sourcing: "À discuter",
  consent: true,
};
const post = (data, headers = {}) =>
  fetch(origin + "/api/devis", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
assert.equal(
  (await post(payload, { Origin: "https://attacker.example" })).status,
  403,
);
assert.equal(
  (await post(payload, { "Content-Type": "text/plain" })).status,
  415,
);
assert.equal((await post("{")).status, 400);
assert.equal((await post({ ...payload, consent: false })).status, 400);
assert.equal((await post({ ...payload, website: "spam" })).status, 400);
assert.equal((await post("x".repeat(3_000_001))).status, 413);
assert.equal(
  (await post(payload)).status,
  503,
  "unconfigured delivery must not claim success",
);
console.log(
  `PASS: ${paths.length} pages, ${links.size} internal targets, preview SEO, 404, social image, and API validation/fail-closed checks.`,
);
