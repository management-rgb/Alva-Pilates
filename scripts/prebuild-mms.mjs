/**
 * On Vercel, skip Playwright MMS generation and use the committed
 * public/marketing/summer-reset-2026.webp. Locally, regenerate before build.
 */
import { spawnSync } from "node:child_process";

if (process.env.VERCEL) {
  console.log(
    "Skipping MMS card generation on Vercel (using committed public/marketing asset)."
  );
  process.exit(0);
}

const result = spawnSync("npm", ["run", "generate:mms-card"], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
