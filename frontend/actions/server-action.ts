"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

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

export const login = async (email: string, password: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to login");
  }
  const data = await response.json();
  (await cookies()).set("support_ticket", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  redirect("/");
};
