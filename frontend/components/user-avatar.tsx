import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/auth-context";

const UserAvatar = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="size-10 rounded-full bg-gray-300 animate-pulse" />;
  }

  return (
    <Avatar className="size-10 hover:opacity-80 border border-foreground transition-all duration-150">
      <AvatarImage src={user?.avatar} alt="user avatar" />
      <AvatarFallback>{user?.email?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
