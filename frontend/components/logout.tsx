"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      logout();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="linkHover2"
      onClick={handleLogout}
      disabled={isLoading}
      aria-label="Logout"
      className="border hover:bg-muted"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          <span className="ml-2">Logout</span>
        </>
      )}
    </Button>
  );
}

export default LogoutButton;
