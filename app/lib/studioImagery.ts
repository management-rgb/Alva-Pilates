/**
 * Local Alva photography used across the site. Every entry here is referenced
 * by a component — add a key only when you wire it up.
 */
export const studioImagery = {
  /** Home hero full-bleed (`public/hero-home.jpg`) */
  heroPrimary: "/hero-home.jpg",
  /** Full-bleed immersive studio moment (`public/our-story-arches.jpg`, shared with the About header) */
  heroStudio: "/our-story-arches.jpg",
  /** Full-bleed "The studio" band on the homepage (`public/studio-band.jpg`) */
  studioBand: "/studio-band.jpg",
  /** Split image: Why Alva (`public/story-detail.jpg`) */
  storySplit: "/story-detail.jpg",
  /** Private training editorial split (`public/about-philosophy.jpg`) */
  privateTraining: "/about-philosophy.jpg",
  /** About — Our Philosophy, team photo (`public/about-team.jpg`) */
  philosophy: "/about-team.jpg",
  /** About — Our Story (`public/our-story-arches.jpg`) */
  ourStory: "/our-story-arches.jpg",
} as const;
