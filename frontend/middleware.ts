import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const sessionCookie = (await cookies()).get("support_ticket")?.value; // Get the specific cookie
  if (!sessionCookie) {
    const allCookies = await cookies();
    console.log(allCookies);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
