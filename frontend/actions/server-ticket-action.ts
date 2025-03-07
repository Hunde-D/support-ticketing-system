"use server";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export const getTickets = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const requestHeaders = await headers();
  try {
    const response = await fetch(`${apiUrl}/api/tickets`, {
      method: "GET",
      headers: requestHeaders,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to get tickets=>");
    }
    return await response.json();
  } catch (error) {
    console.error("Get Tickets Error:", error);
    return { success: false, error: "An error occurred while getting tickets" };
  }
};

export const loginUser = async (email: string, password: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  const data = await res.json();
  const token = data.token || null;
  const cookieStore = await cookies();

  if (token) {
    cookieStore.set({
      name: "auth_token",
      value: token,
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
    });
  }
  return;
};
