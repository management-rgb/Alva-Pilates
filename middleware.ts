import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Instructors section hidden until ready — direct URLs redirect home. */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/instructors")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/instructors", "/instructors/:path*"],
};
