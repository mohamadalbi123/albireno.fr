import nextEnv from "@next/env";
import { business } from "../lib/business.ts";
import { canIndexSite } from "../lib/indexing-policy.ts";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
if (
  process.env.SITE_INDEXABLE === "true" &&
  process.env.VERCEL_ENV !== "preview"
) {
  const siteUrl = process.env.SITE_URL || `https://www.${business.registeredDomain}`;
  if (!canIndexSite({
    ownerApproved: business.indexingApproved,
    enabled: true,
    environment: process.env.VERCEL_ENV,
    siteUrl,
    registeredDomain: business.registeredDomain,
  })) throw new Error("Indexation : accord explicite, environnement de production et domaine canonique requis.");
  // Commercial publication still needs the existing independent readiness check.
  if (business.launchApproved) await import("./check-launch.mjs");
}
