import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Instructors section hidden until ready — direct URLs redirect home.
  if (pathname.startsWith("/instructors")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Short offers URL — keep old MMS / marketing links working.
  if (pathname === "/pricing/summer-reset" || pathname === "/pricing/summer-reset/") {
    return NextResponse.redirect(new URL("/offers", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/instructors",
    "/instructors/:path*",
    "/pricing/summer-reset",
    "/pricing/summer-reset/",
  ],
};
