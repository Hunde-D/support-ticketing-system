import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/", "/admin"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // Retrieve the session cookie
  const sessionCookie = (await cookies()).get("auth_token")?.value;

  // If the route is protected and the session cookie is missing, redirect to login
  if (isProtectedRoute && !sessionCookie) {
    console.log("No session cookie found, redirecting to login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proceed to the next middleware or route handler
  return NextResponse.next();
}

// Configure matcher to apply middleware on non-static, non-image routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
