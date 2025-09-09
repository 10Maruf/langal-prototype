import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAssetPath } from "@/lib/utils";

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  // Only use notifications for experts
  let unreadCount = 0;
  if (isAuthenticated && user?.type === 'expert') {
    try {
      const notifications = useNotifications();
      unreadCount = notifications.unreadCount;
    } catch (error) {
      // NotificationContext not available
      unreadCount = 0;
    }
  }

  const handleLogout = () => {
    logout();
  };

  const getProfileLink = () => {
    if (!user) return "/profile";
    switch (user.type) {
      case 'expert':
        return '/expert-profile';
      case 'customer':
        return '/customer-profile';
      case 'farmer':
      default:
        return '/profile';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={getAssetPath("/img/Asset 3.png")} alt="logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold text-primary">লাঙল<sub>prototype</sub></h1>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {isAuthenticated && (
            <>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {user?.type === 'expert' && unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.name}
                  <div className="text-xs text-muted-foreground">
                    {user?.type === 'farmer' ? 'কৃষক' :
                      user?.type === 'expert' ? 'কৃষি বিশেষজ্ঞ' :
                        user?.type === 'customer' ? 'ক্রেতা' : ''}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getProfileLink()}>প্রোফাইল</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  লগআউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/login">লগইন</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};