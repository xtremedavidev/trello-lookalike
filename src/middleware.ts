import { NextRequest, NextResponse } from "next/server";

const TOKEN_NAME = "token";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api
     * - login
     * - signup
     * - _next/static
     * - _next/image
     * - favicon.ico
     */
    "/((?!api|login|signup|_next/static|_next/image|favicon.ico).*)",
  ],
};
