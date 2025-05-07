import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";
  const isDashboardPage = pathname.startsWith("/cpanel");

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/cpanel", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/cpanel/:path*"],
};
