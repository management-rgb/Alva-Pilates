import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { summerResetEnabled } from "./app/lib/summerResetCopy";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Instructors section hidden until ready — direct URLs redirect home.
  if (pathname.startsWith("/instructors")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Campaign ended — send old promo URLs to standard pricing.
  if (!summerResetEnabled) {
    if (
      pathname === "/offers" ||
      pathname === "/offers/" ||
      pathname === "/pricing/summer-reset" ||
      pathname === "/pricing/summer-reset/"
    ) {
      return NextResponse.redirect(new URL("/pricing", request.url), 308);
    }
  }

  // Short offers URL — keep old MMS / marketing links working while live.
  if (pathname === "/pricing/summer-reset" || pathname === "/pricing/summer-reset/") {
    return NextResponse.redirect(new URL("/offers", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/instructors",
    "/instructors/:path*",
    "/offers",
    "/offers/",
    "/pricing/summer-reset",
    "/pricing/summer-reset/",
  ],
};
