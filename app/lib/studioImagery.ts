/**
 * Cohesive boutique reformer studio look: warm light, neutrals, calm movement.
 * Replace with on-site Alva photography when available.
 */
const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const studioImagery = {
  /** Home hero — Alva studio with lit arches (`public/hero-home.jpg`) */
  hero: "/hero-home.jpg",
  /** Bright reformer movement (`public/intentional-movement.jpg`) */
  heroStudio: "/intentional-movement.jpg",
  /** Home — Welcome to Alva (`public/welcome-alva-bottles.jpg`) */
  welcomeAlva: "/welcome-alva-bottles.jpg",
  /** Instruction / session — studio guidance */
  session: u("photo-1574680096145-d05b474e2155", 1920),
  /** Equipment detail — springs, wood, minimal */
  reformerDetail: u("photo-1599058945522-28d584b6f0ff", 1920),
  /** Restorative stretch — calm, low intensity */
  stretchCalm: u("photo-1552196563-55cd4e45efb3", 1200),
  /** Home — Instagram / community card (`public/instagram-community-card.jpg`) */
  communityInstagram: "/instagram-community-card.jpg",
  /** About — Our Philosophy (`public/about-philosophy.jpg`) */
  philosophy: "/about-philosophy.jpg",
  /** About — Our Story (`public/our-story-arches.jpg`) */
  ourStory: "/our-story-arches.jpg",
  /** Card / sidebar crops */
  cardSession: u("photo-1574680096145-d05b474e2155", 1200),
  cardReformer: u("photo-1518611012118-696072aa579a", 1200),
  cardDetail: u("photo-1599058945522-28d584b6f0ff", 800),
  cardStretch: u("photo-1552196563-55cd4e45efb3", 800),

  /* ---- Luxury journey placements (local Alva assets) ---- */
  /** Hero full-bleed */
  heroPrimary: "/hero-home.png",
  /** Cropped lifestyle bleed — hero → story */
  bleedMovement: "/intentional-movement.jpg",
  /** Split-image: Why Alva / story */
  storySplit: "/hero-reformer.jpg",
  /** Full-bleed immersive moment between classes and offers */
  immersive: "/welcome-alva-bottles.jpg",
  /** Cropped lifestyle bleed — memberships → founding */
  bleedCommunity: "/our-story-studio.jpg",
  /** Private training editorial image */
  privateTraining: "/about-philosophy.jpg",
  /** Pricing intro feature card image */
  introFeature: "/class-alva-sculpt.jpg",
  /** Pricing hero backdrop */
  pricingHero: "/our-story-arches.jpg",
} as const;
