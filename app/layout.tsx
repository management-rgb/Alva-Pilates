import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Instrument_Sans,
  Instrument_Serif,
  Inter,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ErrorSuppressor from "./components/ErrorSuppressor";
import SmoothScroll from "./components/SmoothScroll";
import StudioStructuredData from "./components/StudioStructuredData";
import MobileBookBar from "./components/MobileBookBar";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/site";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Premium display serif — Alva identity, used sparingly for headlines only */
const instrumentSerif = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alva Pilates | Reformer Pilates Studio in Valencia, CA",
    template: "%s | Alva Pilates",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  verification: { google: "32Y3_TyIe5MXqIF8YBEcxRT-OGEC-3amjSxOcj35FeI" },
  keywords: [
    "Pilates",
    "Valencia",
    "Santa Clarita",
    "Reformer Pilates",
    "Wellness",
    "Fitness",
    "Mind-body",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${inter.variable} ${GeistSans.variable} ${instrumentSerif.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased bg-background font-paragraph text-foreground">
        <Script
          id="alva-error-suppress-bootstrap"
          src="/error-suppress-bootstrap.js"
          strategy="beforeInteractive"
        />
        <ErrorSuppressor />
        <SmoothScroll />
        <StudioStructuredData />
        {children}
        <MobileBookBar />
        <Analytics />
      </body>
    </html>
  );
}
