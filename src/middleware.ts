import { NextResponse, NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    !token &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/create-startup") ||
      url.pathname.startsWith("/create-investor") ||
      url.pathname.startsWith("/investors") ||
      url.pathname.startsWith("/startups"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    token &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/create-startup",
    "/create-investor",
    "/startups/:path*",
    "/investors/:path*",
    "/login",
    "/signup",
  ],
};
