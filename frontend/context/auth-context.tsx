"use client";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAvatarUrl } from "@/lib/utils";
import { getUser } from "@/actions/auth-action";

interface User {
  _id: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  // login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUser();
      return { ...user, avatar: getAvatarUrl(user.email) };
    },
  });
  return (
    <AuthContext.Provider value={{ user: user || null, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
