import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
const origin = process.env.TEST_BASE_URL || "http://127.0.0.1:3001";
const canonical = "https://www.albireno.fr";
const local = new URL(origin).hostname === "127.0.0.1";
const headers = local ? { Host: "www.albireno.fr" } : {};
// Node fetch does not preserve an overridden Host header; use HTTP directly
// when simulating Vercel's canonical and preview hosts against localhost.
function fetchSite(url, options = {}) {
  if (!local) return fetch(url, options);
  return new Promise((resolve, reject) => {
    const request = httpRequest(url, { method: options.method, headers: options.headers }, response => {
      const chunks = [];
      response.on("data", chunk => chunks.push(chunk));
      response.on("end", () => resolve(new Response(Buffer.concat(chunks), {
        status: response.statusCode,
        headers: Object.fromEntries(Object.entries(response.headers).filter(([, value]) => typeof value === "string")),
      })));
      response.on("error", reject);
    });
    request.on("error", reject);
    request.end(options.body);
  });
}
const visible = ["/", "/realisations", "/realisations/cuisine-optimisee", "/notre-approche", "/contact", "/devis"];
const drafts = ["/realisations/cuisine-rochefort", "/installation-cuisine-la-rochelle", "/renovation-cuisine-la-rochelle", "/optimisation-petite-cuisine", "/reparation-cuisine-la-rochelle", "/conception-cuisine-3d", "/mentions-legales", "/politique-confidentialite"];
for (const path of [...visible, ...drafts]) {
  const response = await fetchSite(origin + path, { headers });
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const robots = html.match(/name="robots" content="([^"]+)"/)?.[1];
  assert.ok(robots, path + " robots metadata");
  if (visible.includes(path)) {
    assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex/);
    assert.match(robots, /(?:^|,\s*)index(?:,|$)/);
    assert.doesNotMatch(robots, /noindex/);
  } else assert.match(robots, /noindex/, path);
  assert.ok(html.includes("Activité cuisine en préparation"), path + " preparation notice");
  assert.ok(!html.includes('type="application/ld+json"'), "unapproved business schema stays off");
}
const sitemap = await (await fetchSite(origin + "/sitemap.xml", { headers })).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(urls.sort(), visible.map(path => canonical + (path === "/" ? "" : path)).sort());
const robots = await (await fetchSite(origin + "/robots.txt", { headers })).text();
assert.match(robots, /Allow: \/\n/);
assert.match(robots, /Disallow: \/api\//);
assert.ok(robots.includes("Sitemap: " + canonical + "/sitemap.xml"));
if (local) {
  for (const host of ["127.0.0.1:3001", "preview.vercel.app", "example.com"])
    assert.match((await fetchSite(origin, { headers: { Host: host } })).headers.get("x-robots-tag") || "", /noindex/, host);
}
const payload = { name: "Indexing check", phone: "0600000000", email: "test@example.com", city: "La Rochelle", needs: ["reparation"], answers: { repairs: ["Portes à régler"] }, timeframe: "Dans 1 à 3 mois", budget: "", comments: "", sourcing: "À discuter", consent: true };
const mail = await fetchSite(origin + "/api/devis", { method: "POST", headers: { ...headers, Origin: local ? canonical : origin, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
assert.equal(mail.status, 503, "automatic email must remain off");
console.log(JSON.stringify({ origin, indexablePages: visible.length, noindexPages: drafts.length, sitemapEntries: urls.length, preparationStatus: "unchanged", businessSchema: "off", automaticEmail: "off", alternateHosts: local ? "noindex verified" : "covered by local production check" }));
