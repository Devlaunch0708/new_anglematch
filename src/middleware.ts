import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    // Redirect unverified users
    if (!dbUser?.emailVerified && !req.nextUrl.pathname.startsWith("/verify")) {
      return NextResponse.redirect(new URL("/verify", req.url));
    }
  }

  // Existing protected routes check
  const protectedRoutes = ["/dashboard", "/create-startup", "/create-investor"];
  if (
    !user &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
