import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { summerResetOfferCards } from "./lib/summerResetCopy";

export const alt = "Alva Pilates — boutique reformer Pilates studio in Valencia, CA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link preview shown when the site is shared by text, DM, or social. */
export default async function OpengraphImage() {
  const [logo, studio] = await Promise.all(
    ["logo.png", "studio.jpg"].map(async (file) => {
      const data = await readFile(join(process.cwd(), "app/og", file));
      const type = file.endsWith(".png") ? "png" : "jpeg";
      return `data:image/${type};base64,${data.toString("base64")}`;
    }),
  );
  const intro = summerResetOfferCards.unlimitedIntro;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f5f2" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 540,
            padding: "64px 56px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={260} height={160} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 22,
                letterSpacing: 4,
                lineHeight: 1.5,
                color: "#6d6c68",
              }}
            >
              <div>REFORMER PILATES</div>
              <div>VALENCIA, CA</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: 28,
                color: "#201f1c",
              }}
            >
              <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1 }}>{intro.price}</div>
              <div style={{ fontSize: 30, marginLeft: 18 }}>15 days unlimited</div>
            </div>
            <div style={{ fontSize: 24, marginTop: 14, color: "#6d6c68" }}>
              Intro offer for new clients
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={studio}
          width={660}
          height={630}
          alt=""
          style={{ objectFit: "cover", filter: "grayscale(25%)" }}
        />
      </div>
    ),
    size,
  );
}
