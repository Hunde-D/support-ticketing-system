import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAvatarUrl = (email: string) => {
  const encodedEmail = encodeURIComponent(email); // Ensure it's URL-safe
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodedEmail}`;
};

export const getCategoryColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-yellow-500";
    case "in-progress":
      return "bg-blue-500";
    case "closed":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "PPP");
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "p");
};
