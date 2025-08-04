import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Menu } from "lucide-react";
import MediCampLogo from "../MediCampLogo/MediCampLogo";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm px-4 py-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <MediCampLogo />
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/available-camps">
            <Button variant="ghost" className="hover:bg-gray-100">
              Available Camps
            </Button>
          </Link>

          {!user ? (
            <Link to="/signup">
              <Button className="hover:bg-blue-600 transition">Join Us</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition">
                  <AvatarImage
                    src={user?.photoURL || undefined}
                    alt={user?.displayName || "Profile"}
                  />
                  <AvatarFallback>
                    {(user?.displayName?.[0] || "U").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8} className="w-48">
                <DropdownMenuItem disabled className="font-medium text-gray-700">
                  {user?.displayName || "User"}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logOut();
                  }}
                  className="text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-2 transition-all animate-in slide-in-from-top-4">
          <Link to="/available-camps" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Available Camps
            </Button>
          </Link>

          {!user ? (
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Join Us</Button>
            </Link>
          ) : (
            <>
              <div className="px-4 text-sm font-medium text-gray-700">
                {user?.displayName || "User"}
              </div>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logOut();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
