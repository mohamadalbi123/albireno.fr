import assert from "node:assert/strict";
import { test } from "node:test";
import { canIndexSite } from "../lib/indexing-policy.ts";
const approved = {
  ownerApproved: true,
  enabled: true,
  environment: "production",
  siteUrl: "https://www.albireno.fr",
  registeredDomain: "albireno.fr",
};
test("explicit owner approval permits the canonical production site", () => {
  assert.equal(canIndexSite(approved), true);
});
test("owner approval and the production switch are independently required", () => {
  assert.equal(canIndexSite({ ...approved, ownerApproved: false }), false);
  assert.equal(canIndexSite({ ...approved, enabled: false }), false);
});
test("preview, development and unspecified environments stay noindex", () => {
  for (const environment of ["preview", "development", undefined])
    assert.equal(canIndexSite({ ...approved, environment }), false);
});
test("only the registered canonical www host may become indexable", () => {
  for (const siteUrl of ["https://albireno.fr", "https://branch.vercel.app", "https://chambre17.com", "https://www.albireno.fr.example.com", "https://example.com"])
    assert.equal(canIndexSite({ ...approved, siteUrl }), false);
});
test("invalid, non-HTTPS and non-origin URLs fail closed", () => {
  for (const siteUrl of [undefined, "invalid", "http://www.albireno.fr", "https://www.albireno.fr/path", "https://www.albireno.fr?index=true", "https://www.albireno.fr#home", "https://name:password@www.albireno.fr"])
    assert.equal(canIndexSite({ ...approved, siteUrl }), false);
});
