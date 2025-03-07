"use client";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAvatarUrl } from "@/lib/utils";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { loginUser } from "@/actions/server-ticket-action";

interface User {
  _id: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    email: string;
    password: string;
    role: "user" | "admin";
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const queryClient = getQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/api/auth/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("User session expired");
      const user = await res.json();
      return { ...user, avatar: getAvatarUrl(user.email) };
    },
    staleTime: 1000 * 60 * 5,
  });

  const login = async (email: string, password: string) => {
    const res = await loginUser(email, password);

    if (!res.ok) {
      throw new Error("Invalid email or password");
    }
    await queryClient.invalidateQueries({ queryKey: ["user"] });
    router.push("/");
  };

  const signup = async (userData: {
    email: string;
    password: string;
    role: "user" | "admin";
  }) => {
    const res = await fetch(`${apiUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Refetch user
      router.push("/");
    } else {
      throw new Error("Failed to create account");
    }
  };

  const logout = async () => {
    await fetch(`${apiUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    queryClient.invalidateQueries({ queryKey: ["user"] }); // Clear cached user
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user: user || null, isLoading, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
