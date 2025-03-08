"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/actions/auth-action";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await logout();
    toast.success("logged out");
    setIsLoading(false);
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
