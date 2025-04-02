
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import UserAvatar from "../../components/ui/UserAvatar";
import { useUserSession } from "../../hooks/use-user-session";
import { getFullImageUrl } from "../../utils/GetFullImageUrl";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user, loading } = useUserSession();

  console.log("User session:", user, loading);

  
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold">{title}</h1>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 bg-muted text-muted-foreground"
            />
          </div>

          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>

          <Button size="icon" variant="ghost">
            <Settings className="h-5 w-5" />
          </Button>

          {!loading && user ? (
            <UserAvatar
              src={
                user.avatar ? getFullImageUrl(user.avatar) : "/placeholder.svg"
              }
              fallback={`${user.firstName[0]}${user.lastName[0]}`}
              name={`${user.firstName} ${user.lastName}`}
              role={user.role}
            />
          ) : (
            <UserAvatar
              src="/placeholder.svg"
              fallback="A"
              name={loading ? "Loading..." : "Guest"}
              role={loading ? "Loading..." : "Unauthenticated"}
            />
          )}
        </div>
      </div>
    </header>
  );
}
