"use client";

import Link from "next/link";
import { blackFridayCopy, blackFridayLinks } from "../../lib/blackFridayCampaign";
import { useBlackFridayActive } from "./useBlackFridayActive";

export default function BlackFridayAnnouncementBar() {
  const active = useBlackFridayActive();
  if (!active) return null;

  return (
    <div className="bf-bar" role="region" aria-label="Black Friday offer">
      <Link href={blackFridayLinks.memberships} className="bf-bar__link">
        <span className="bf-bar__text">{blackFridayCopy.announcement}</span>
      </Link>
    </div>
  );
}
