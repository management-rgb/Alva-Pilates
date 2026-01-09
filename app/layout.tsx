import type { Metadata } from "next";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";
import ErrorSuppressor from "./components/ErrorSuppressor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
      className={`${cormorant.variable} ${quicksand.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased bg-background text-foreground">
        <ErrorSuppressor />
        {children}
      </body>
    </html>
  );
}
