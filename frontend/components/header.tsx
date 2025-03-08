"use client";
import LogoutButton from "./auth/logout";
import UserAvatar from "./user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/actions/auth-action";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4 text-white h-24 max-sm:hidden">
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <UserAvatar />
        </div>
        <div className="flex flex-col">
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
      <div className="flex items-center gap-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
