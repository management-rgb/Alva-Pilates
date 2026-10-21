"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPageView } from "../lib/metaPixel";

export default function MetaPixel() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) trackMetaPageView(pathname);
  }, [pathname]);
  return null;
}
