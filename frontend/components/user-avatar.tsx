import { getUser } from "@/actions/auth-action";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getAvatarUrl } from "@/lib/utils";

const UserAvatar = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  if (isLoading) {
    return <div className="size-10 rounded-full bg-gray-300 animate-pulse" />;
  }

  return (
    <Avatar className="size-10 hover:opacity-80 border border-foreground transition-all duration-150">
      <AvatarImage src={getAvatarUrl(user.email)} alt="user avatar" />
      <AvatarFallback>{user?.email?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
