"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserAvatar from "./user-avatar";
import LogoutButton from "./logout";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/auth-action";
import { Skeleton } from "@/components/ui/skeleton";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button className="p-2 text-white rounded-md hover:bg-white/10 transition-colors">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <div className="flex flex-col h-full">
          <div className="flex flex-col space-y-6 mt-6">
            <div className="flex items-center gap-4 p-4 rounded-lg">
              <UserAvatar />
              <div className="flex flex-col cursor-pointer">
                {isLoading ? (
                  <Skeleton className="h-6 w-32 bg-gray-600" />
                ) : (
                  <>
                    <span className="font-semibold">{user?.email}</span>
                    <span className="text-sm text-gray-400">{user?.role}</span>
                  </>
                )}
              </div>
            </div>

            <div className="mt-auto border mx-5 hover:bg-muted bg-accent rounded-lg">
              <LogoutButton />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
