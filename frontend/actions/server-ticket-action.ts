"use server";
import { headers } from "next/headers";

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
