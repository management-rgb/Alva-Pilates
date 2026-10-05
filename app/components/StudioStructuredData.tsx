import { STUDIO_INSTAGRAM_URL } from "../lib/socialLinks";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, studio } from "../lib/site";

/** Site-wide LocalBusiness data so Google can show address, hours, and phone. */
export default function StudioStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/alva_logo_web.png`,
    image: `${SITE_URL}/hero-home.png`,
    telephone: studio.telephone,
    email: studio.email,
    priceRange: "$$",
    address: { "@type": "PostalAddress", ...studio.address },
    areaServed: ["Valencia, CA", "Santa Clarita, CA"],
    openingHoursSpecification: studio.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [STUDIO_INSTAGRAM_URL.split("?")[0]],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
