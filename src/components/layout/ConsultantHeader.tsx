import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAssetPath } from "@/lib/utils";

interface ConsultantHeaderProps {
    onProfileClick: () => void;
}

export const ConsultantHeader = ({ onProfileClick }: ConsultantHeaderProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={getAssetPath("/img/Asset 3.png")} alt="লাঙল" className="h-8 w-8" />
                    <span className="text-lg font-bold text-primary">লাঙল - বিশেষজ্ঞ</span>
                </div>

                {/* Right side - Notifications and Profile */}
                <div className="flex items-center gap-2">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                        >
                            3
                        </Badge>
                    </Button>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {user?.name?.charAt(0) || "ব"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <div className="flex flex-col space-y-1 p-2">
                                <p className="text-sm font-medium leading-none">{user?.name || "বিশেষজ্ঞ"}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email || "expert@example.com"}
                                </p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onProfileClick}>
                                <User className="mr-2 h-4 w-4" />
                                <span>প্রোফাইল</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>লগ আউট</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};
