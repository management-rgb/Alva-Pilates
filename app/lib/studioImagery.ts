/**
 * Local Alva photography used across the site. Every entry here is referenced
 * by a component — add a key only when you wire it up.
 */
export const studioImagery = {
  /** Home hero full-bleed (`public/hero-home.png`) */
  heroPrimary: "/hero-home.png",
  /** Full-bleed immersive studio moment (`public/intentional-movement.jpg`) */
  heroStudio: "/intentional-movement.jpg",
  /** Split image: Why Alva (`public/hero-reformer.jpg`) */
  storySplit: "/hero-reformer.jpg",
  /** Private training editorial split (`public/about-philosophy.jpg`) */
  privateTraining: "/about-philosophy.jpg",
  /** About — Our Philosophy (`public/about-philosophy.jpg`) */
  philosophy: "/about-philosophy.jpg",
  /** About — Our Story (`public/our-story-arches.jpg`) */
  ourStory: "/our-story-arches.jpg",
} as const;
