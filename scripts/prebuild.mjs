import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
if (
  process.env.SITE_INDEXABLE === "true" &&
  process.env.VERCEL_ENV !== "preview"
)
  await import("./check-launch.mjs");
