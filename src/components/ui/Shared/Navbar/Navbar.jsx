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

  // Define route sets
  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "Available Camps", path: "/available-camps" },
    { label: "About", path: "/about" },
  ];

  const privateLinks = [
    { label: "Home", path: "/" },
    { label: "Available Camps", path: "/available-camps" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Bookings", path: "/bookings" },
    { label: "About", path: "/about" },
  ];

  const linksToShow = user ? privateLinks : publicLinks;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <MediCampLogo invert/>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-primary/80 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {linksToShow.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant="ghost"
                className="text-white hover:text-secondary hover:bg-primary/80 transition"
              >
                {link.label}
              </Button>
            </Link>
          ))}

          {!user ? (
            <Link to="/signup">
              <Button className="bg-secondary text-primary hover:bg-secondary/90 transition">
                Join Us
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-secondary transition">
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
                <DropdownMenuItem asChild>
                  <Link to="/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logOut}
                  className="text-red-600 cursor-pointer"
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
        <div className="md:hidden bg-primary text-white mt-2 space-y-2 px-4 pb-3 animate-in slide-in-from-top-4">
          {linksToShow.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start text-white hover:text-secondary">
                {link.label}
              </Button>
            </Link>
          ))}

          {!user ? (
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                Join Us
              </Button>
            </Link>
          ) : (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-300 hover:text-red-500"
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
