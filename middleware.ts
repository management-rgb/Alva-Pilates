import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { summerResetEnabled } from "./app/lib/summerResetCopy";
import { STAFF_COOKIE, STAFF_LOGIN, verifySessionToken } from "./app/lib/staffAuth";

/** Staff area: require a valid session cookie; never index or cache. */
async function staffGate(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLogin = pathname === STAFF_LOGIN || pathname === `${STAFF_LOGIN}/`;
  let response = NextResponse.next();

  if (!isLogin && !(await verifySessionToken(request.cookies.get(STAFF_COOKIE)?.value))) {
    const url = new URL(STAFF_LOGIN, request.url);
    if (pathname !== "/staff" && pathname !== "/staff/") url.searchParams.set("next", pathname + search);
    response = NextResponse.redirect(url);
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/staff" || pathname.startsWith("/staff/")) {
    return staffGate(request);
  }

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
    "/staff",
    "/staff/:path*",
    "/instructors",
    "/instructors/:path*",
    "/offers",
    "/offers/",
    "/pricing/summer-reset",
    "/pricing/summer-reset/",
  ],
};
