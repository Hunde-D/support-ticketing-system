"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  (await cookies()).delete("token");
  redirect("/login");
};

export const getUser = async () => {
  const token = (await cookies()).get("token")?.value;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("User session expired");
  const user = await res.json();
  return user;
};
