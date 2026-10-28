type IndexingPolicy = {
  ownerApproved: boolean;
  enabled: boolean;
  environment: string | undefined;
  siteUrl: string | undefined;
  registeredDomain: string;
};

/** Search visibility is independent of approval to offer paid services. */
export function canIndexSite(policy: IndexingPolicy): boolean {
  if (!policy.ownerApproved || !policy.enabled || policy.environment !== "production" || !policy.siteUrl)
    return false;
  try {
    const url = new URL(policy.siteUrl);
    return url.protocol === "https:" &&
      url.origin === policy.siteUrl &&
      url.hostname === `www.${policy.registeredDomain}`;
  } catch {
    return false;
  }
}
