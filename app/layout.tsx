import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Instrument_Sans,
  Instrument_Serif,
  Inter,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import "./globals.css";
import ErrorSuppressor from "./components/ErrorSuppressor";
import SmoothScroll from "./components/SmoothScroll";

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
  title: "Alva Pilates | Movement & Wellness Studio",
  description:
    "Discover mindful movement at Alva Pilates in Valencia, Santa Clarita. Expert-led reformer classes, personalized sessions, and a welcoming community dedicated to your wellness journey.",
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
        {children}
      </body>
    </html>
  );
}
