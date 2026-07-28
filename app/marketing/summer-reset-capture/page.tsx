import type { Metadata } from "next";
import SummerResetPromoCard, {
  SUMMER_RESET_LANDING_URL,
} from "../../components/SummerResetPromoCard";

export const metadata: Metadata = {
  title: "Summer Reset MMS Capture | Alva Pilates",
  robots: { index: false, follow: false },
};

/**
 * Isolated capture surface for `npm run generate:mms-card`.
 * Renders the shared SummerResetPromoCard with QR — not linked from site nav.
 */
export default function SummerResetMmsCapturePage() {
  // Placeholder QR; the generate script injects a real QR via HTML capture.
  // This page exists for visual QA of the shared card in isolation.
  const qrPlaceholder =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#fff"/><text x="36" y="40" text-anchor="middle" font-size="8" fill="#6d6c68">QR</text></svg>`
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5F2] p-10">
      <SummerResetPromoCard
        staticMode
        qrCodeSrc={qrPlaceholder}
        qrCodeHref={SUMMER_RESET_LANDING_URL}
        className="shadow-[0_24px_60px_-28px_rgba(30,22,14,0.35)]"
      />
    </div>
  );
}
