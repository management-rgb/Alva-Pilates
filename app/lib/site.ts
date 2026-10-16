/**
 * Canonical studio details for SEO metadata, the sitemap, and structured data.
 * Keep in sync with the contact page and footer when hours or contact info change.
 */
export const SITE_URL = "https://www.alvapilates.com";

export const SITE_NAME = "Alva Pilates";

export const SITE_DESCRIPTION =
  "Boutique reformer Pilates studio in Valencia, Santa Clarita. Small-group reformer classes, private training, and expert instruction for every level.";

export const studio = {
  telephone: "+1-661-977-7898",
  email: "info@formaluxecollective.com",
  address: {
    streetAddress: "23840 Copper Hill Drive",
    addressLocality: "Valencia",
    addressRegion: "CA",
    postalCode: "91354",
    addressCountry: "US",
  },
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "13:00",
    },
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "16:30",
      closes: "19:00",
    },
    { days: ["Saturday", "Sunday"], opens: "09:00", closes: "12:00" },
  ],
} as const;

/** Customer-facing hours copy. Keep in sync with `studio.openingHours` above. */
export const STUDIO_HOURS_DISPLAY = {
  weekdays: ["8:00 AM – 1:00 PM", "4:30 PM – 7:00 PM"],
  weekends: "Classes at 9, 10 & 11 AM",
} as const;

/** Studio phone accepts texts; sms: opens the visitor's messaging app. */
export const STUDIO_SMS_HREF = "sms:+16619777898";

/**
 * Google Analytics 4 measurement ID (public, not a secret). The Mindbody booking
 * widget reuses the page's gtag/dataLayer, so its events reach this property too.
 * Its class-booking `purchase` is renamed `class_booking` by MindbodyGaBridge.
 */
export const GA_MEASUREMENT_ID = "G-FR15M2BQQM";
