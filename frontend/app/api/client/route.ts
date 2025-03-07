import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Sending login request to external API
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // Ensures cookies are included
  });

  if (!response.ok) {
    // If login fails, return error response
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const data = await response.json();
  const token = data.token || null;
  const cookieStore = await cookies();

  if (token) {
    // Setting the token in cookies
    cookieStore.set({
      name: "auth_token",
      value: token,
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      httpOnly: true, // Cookie should not be accessible via JavaScript
      path: "/",
    });
  }

  // Return user data (optional)
  return NextResponse.json({ data });
}
