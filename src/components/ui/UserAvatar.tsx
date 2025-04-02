import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserSessionUtils } from "../../utils/UserSessionUtils";

interface UserAvatarProps {
  src: string;
  fallback: string;
  name: string;
  role: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  fallback,
  name,
  role,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session and redirect to login
    UserSessionUtils.clearLocalStorageAndLogout();
    navigate("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={src} alt={name} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-60" align="end">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={src} alt={name} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="sm" className="justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
