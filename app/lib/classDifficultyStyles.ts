/** Tailwind classes for class level badges (supports full phrases, not only single words). */
export function getDifficultyBadgeClassName(level?: string): string {
  const l = (level ?? "").toLowerCase();
  if (l.includes("advanced")) return "bg-red-100 text-red-800";
  if (l.includes("intermediate")) return "bg-yellow-100 text-yellow-800";
  if (
    l.includes("beginner") ||
    l.includes("intro") ||
    l.includes("new to pilates")
  ) {
    return "bg-green-100 text-green-800";
  }
  if (l.includes("fundamentals recommended")) {
    return "bg-sky-100 text-sky-800";
  }
  if (l.includes("level 1.5")) {
    return "bg-red-100 text-red-800";
  }
  if (l.includes("all levels")) {
    return "bg-primary/10 text-primary";
  }
  return "bg-primary/10 text-primary";
}
