import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const authMiddleware = auth.middleware({ loginUrl: "/sign-in" });

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If user visits the root / or auth pages, redirect to /dashboard if logged in
  if (pathname === "/") {
    const hasSession = request.cookies
      .getAll()
      .some(
        (c) =>
          c.name.includes("neon-auth") ||
          c.name.includes("session_token") ||
          c.name.includes("session_data"),
      );

    if (hasSession) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  return authMiddleware(request);
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/onboarding/:path*"],
};
