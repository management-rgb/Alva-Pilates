/**
 * Generates /public/marketing/summer-reset-2026.webp for Mindbody MMS.
 *
 * Source of truth for offer copy: app/lib/summerResetCopy.ts
 * Visual design mirrors app/components/SummerResetPromoCard.tsx
 *
 * Run: npm run generate:mms-card
 * Wired into prebuild so the asset regenerates before every production build.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import QRCode from "qrcode";
import {
  summerResetCopy,
  summerResetOfferCards,
} from "../app/lib/summerResetCopy";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "marketing");
const OUT_FILE = path.join(OUT_DIR, "summer-reset-2026.webp");

const LANDING_URL = "https://www.alvapilates.com/offers";
const TARGET_WIDTH = 1200;
const MAX_BYTES = 400 * 1024;

async function buildHtml(qrDataUrl: string): Promise<string> {
  const eyebrow = summerResetCopy.hero.eyebrow;
  const price = summerResetOfferCards.unlimitedIntro.price;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --dark: #343330;
      --paper: #f7f5f2;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      margin: 0;
      background: #f7f5f2;
      font-family: "Instrument Sans", system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .canvas {
      width: ${TARGET_WIDTH}px;
      min-height: 1500px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 72px 80px;
      background:
        radial-gradient(circle at 70% 20%, rgba(198,170,131,0.12), transparent 45%),
        radial-gradient(circle at 20% 85%, rgba(52,51,48,0.06), transparent 40%),
        linear-gradient(180deg, #f7f5f2 0%, #ece9e3 100%);
    }
    .brand {
      position: absolute;
      top: 48px;
      left: 80px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #6d6c68;
    }
    .card {
      position: relative;
      width: 520px;
      border-radius: 8px;
      border: 1px solid rgba(74,64,50,0.16);
      background: rgba(248,244,238,0.97);
      padding: 48px 44px;
      box-shadow: 0 24px 60px -28px rgba(30,22,14,0.35);
    }
    .eyebrow {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: #201f1c;
    }
    .deadline {
      margin-top: 10px;
      font-size: 13px;
      line-height: 1.5;
      color: #6d6c68;
    }
    .divider {
      margin-top: 36px;
      border-top: 1px solid rgba(74,64,50,0.14);
      padding-top: 36px;
    }
    .offer-label {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #6d6c68;
    }
    .price {
      margin-top: 12px;
      font-size: 76px;
      font-weight: 600;
      line-height: 0.82;
      letter-spacing: -0.045em;
      color: #201f1c;
    }
    .details {
      margin-top: 16px;
      font-size: 13px;
      line-height: 1.7;
      color: #6d6c68;
    }
    .also {
      margin-top: 36px;
      border-top: 1px solid rgba(74,64,50,0.14);
      padding-top: 24px;
    }
    .also-label {
      display: block;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #8a8880;
    }
    .also-row {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: -0.01em;
      color: #4a4945;
    }
    .cta {
      margin-top: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 48px;
      border-radius: 10px;
      background: var(--dark);
      color: var(--paper);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
    .qr-row {
      margin-top: 32px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      border-top: 1px solid rgba(74,64,50,0.14);
      padding-top: 24px;
    }
    .qr-label {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #8a8880;
    }
    .qr-url {
      margin-top: 6px;
      font-size: 11px;
      line-height: 1.35;
      color: #6d6c68;
    }
    .qr {
      width: 72px;
      height: 72px;
      border-radius: 4px;
      background: #fff;
      padding: 4px;
      flex-shrink: 0;
    }
    .qr img { width: 100%; height: 100%; display: block; }
  </style>
</head>
<body>
  <div class="canvas" id="capture">
    <div class="brand">Alva Pilates · Valencia</div>
    <div class="card" data-summer-reset-promo-card>
      <p class="eyebrow">${eyebrow}</p>
      <p class="deadline">Limited through August 15</p>
      <div class="divider">
        <p class="offer-label">15 Days Unlimited</p>
        <p class="price">${price}</p>
        <p class="details">One class per day<br />15 consecutive days</p>
      </div>
      <div class="also">
        <span class="also-label">Also available</span>
        <div class="also-row">
          <span>20% Off Class Packs</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
      <div class="cta">View Summer Offers →</div>
      <div class="qr-row">
        <div>
          <p class="qr-label">Scan to book</p>
          <p class="qr-url">alvapilates.com/offers</p>
        </div>
        <div class="qr"><img src="${qrDataUrl}" alt="QR code" width="64" height="64" /></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function compressToWebp(pngBuffer: Buffer): Promise<Buffer> {
  let quality = 90;
  let out = await sharp(pngBuffer)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();

  while (out.byteLength > MAX_BYTES && quality > 55) {
    quality -= 5;
    out = await sharp(pngBuffer)
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();
  }

  return out;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const qrDataUrl = await QRCode.toDataURL(LANDING_URL, {
    margin: 1,
    width: 256,
    color: { dark: "#201F1C", light: "#FFFFFF" },
  });

  const html = await buildHtml(qrDataUrl);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: TARGET_WIDTH, height: 1600 },
      deviceScaleFactor: 2,
    });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const doc = document as Document & { fonts?: FontFaceSet };
      if (doc.fonts?.ready) {
        await doc.fonts.ready;
      }
    });

    const el = page.locator("#capture");
    const png = await el.screenshot({ type: "png" });
    const webp = await compressToWebp(Buffer.from(png));
    await writeFile(OUT_FILE, webp);

    const kb = (webp.byteLength / 1024).toFixed(1);
    console.log(`Wrote ${OUT_FILE} (${kb} KB, quality target <400 KB)`);
    console.log(`Public URL: /marketing/summer-reset-2026.webp`);
    console.log(`Landing URL: ${LANDING_URL}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
