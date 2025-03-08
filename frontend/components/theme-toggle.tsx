"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Only show the theme toggle after client-side hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same dimensions during SSR
  if (!mounted) {
    return (
      <div
        className={cn(
          "flex w-16 h-8 p-1 rounded-full border border-zinc-200 bg-white",
          className
        )}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center w-6 h-6 rounded-full transform translate-x-8 bg-gray-200">
            <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
          </div>
          <div className="flex justify-center items-center w-6 h-6 rounded-full transform -translate-x-8">
            <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-zinc-950 border border-zinc-800"
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "transform translate-x-0 bg-zinc-800"
              : "transform translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}
