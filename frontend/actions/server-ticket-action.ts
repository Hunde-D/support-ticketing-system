"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

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

export const login = async (email: string, password: string) => {
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
  console.log("data-token", data);
  (await cookies()).set({
    name: "token",
    value: data.token,
  });
  redirect("/");
};

export const logout = async () => {
  const requestHeaders = await headers();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/auth/logout`, {
    method: "POST",
    headers: requestHeaders,
    credentials: "include",
  });
  if (!res.ok) {
    return false;
  }

  (await cookies()).delete("token");
  redirect("/login");
};

export const getToken = async () => {
  return (await cookies()).get("token")?.value;
};

export const createTicket = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const tk = await getToken();
  const token = (await cookies()).get("token")?.value;
  console.log("token", token);
  console.log("tk", tk);

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

export const updateTicket = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const tk = await getToken();
  const token = (await cookies()).get("token")?.value;
  console.log("token", token);
  console.log("tk", tk);
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
