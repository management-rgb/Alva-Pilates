import {
  summerResetEnabled,
  summerResetEndDate,
  summerResetOfferCards,
  summerResetStartDate,
} from "../lib/summerResetCopy";

export default function SummerResetStructuredData() {
  if (!summerResetEnabled) return null;

  const { threeClassIntro, unlimitedIntro, classPackSale } = summerResetOfferCards;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HealthClub",
        "@id": "https://www.alvapilates.com/#localbusiness",
        name: "Alva Pilates",
        description:
          "Boutique reformer Pilates studio in Valencia, California offering small-group classes and personalized instruction.",
        url: "https://www.alvapilates.com/",
        telephone: "+1-661-977-7898",
        email: "info@formaluxecollective.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "23840 Copper Hill Drive",
          addressLocality: "Valencia",
          addressRegion: "CA",
          postalCode: "91354",
          addressCountry: "US",
        },
      },
      {
        "@type": "Offer",
        name: `Summer Reset — ${threeClassIntro.title}`,
        description: threeClassIntro.description,
        price: "69",
        priceCurrency: "USD",
        validFrom: summerResetStartDate,
        priceValidUntil: summerResetEndDate,
        availability: "https://schema.org/InStock",
        seller: { "@id": "https://www.alvapilates.com/#localbusiness" },
        url: "https://www.alvapilates.com/pricing#get-started",
      },
      {
        "@type": "Offer",
        name: "Summer Reset — 15-Day Unlimited Intro",
        description: unlimitedIntro.description,
        price: "99",
        priceCurrency: "USD",
        validFrom: summerResetStartDate,
        priceValidUntil: summerResetEndDate,
        availability: "https://schema.org/InStock",
        seller: { "@id": "https://www.alvapilates.com/#localbusiness" },
        url: "https://www.alvapilates.com/pricing#get-started",
      },
      {
        "@type": "Offer",
        name: "Summer Reset — Class Pack Sale",
        description: `${classPackSale.mainOffer} on select class packs during the Summer Reset campaign.`,
        validFrom: summerResetStartDate,
        priceValidUntil: summerResetEndDate,
        availability: "https://schema.org/InStock",
        seller: { "@id": "https://www.alvapilates.com/#localbusiness" },
        url: "https://www.alvapilates.com/pricing#group-packages",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
