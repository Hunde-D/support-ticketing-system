import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/", "/admin"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // Changed req to request for consistency
  const isProtectedRoute = protectedRoutes.includes(path);
  const sessionCookie = (await cookies()).get("auth_token")?.value; // Get the specific cookie
  const allCookies = await cookies();
  console.log(allCookies);
  if (isProtectedRoute && !sessionCookie) {
    console.log("no cookie");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
