import type { MetadataRoute } from "next";
import { getAllClasses } from "./lib/data";
import { SITE_URL } from "./lib/site";

/** Public pages only — staff, marketing, and redirected routes are excluded. */
const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/classes", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/book", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/pilates-santa-clarita", priority: 0.7 },
  { path: "/appointments", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/join-the-team", priority: 0.5 },
  { path: "/register", priority: 0.4 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      priority,
    })),
    ...getAllClasses().map((c) => ({
      url: `${SITE_URL}/classes/${c._id}`,
      priority: 0.7,
    })),
  ];
}
