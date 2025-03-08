"use server";
import { cookies } from "next/headers";

export const createTicket = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = (await cookies()).get("token")?.value;
  const response = await fetch(`${apiUrl}/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create ticket");
  }

  return response.json();
};

export const getTickets = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await fetch(`${apiUrl}/api/tickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export const updateTicket = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = (await cookies()).get("token")?.value;
  const response = await fetch(`${apiUrl}/api/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Explicitly set Content-Type
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ status: status }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update ticket");
  }

  return response.json();
};
