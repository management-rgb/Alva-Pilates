import type { Metadata } from "next";
import faqData from "../data/faq.json";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Alva Pilates: what to expect at your first reformer class, what to wear, policies, memberships, and more.",
  alternates: { canonical: "/faq" },
};

/** Real questions only — the long policy documents aren't Q&A and are left out. */
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData
    .filter((item) => item.question.trim().endsWith("?"))
    .map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\*\*/g, "").trim(),
      },
    })),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {children}
    </>
  );
}
