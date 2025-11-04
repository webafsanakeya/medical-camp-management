import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import MediCampLogo from "../MediCampLogo/MediCampLogo";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to add shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseLinks = [
    { label: "Home", path: "/" },
    { label: "Available Camps", path: "/available-camps" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
    { label: "Blog", path: "/blog" },
  ];

  const privateOnlyLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Bookings", path: "/bookings" },
  ];

  const linksToShow = user ? [...baseLinks, ...privateOnlyLinks] : baseLinks;

  return (
    <nav
   className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? "shadow-md bg-white" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <MediCampLogo  />
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
  className={`hover:text-primary hover:bg-gray-100 transition ${
    location.pathname === link.path
      ? "text-primary font-semibold"
      : "text-gray-700"
  }`}
>
                {link.label}
              </Button>
            </Link>
          ))}

          {!user ? (
            <Link to="/signup">
              <Button className="bg-primary text-white hover:bg-primary/90 transition">
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
                {privateOnlyLinks.map((link) => (
                  <DropdownMenuItem asChild key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
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
        <div className="md:hidden bg-white text-gray-700 mt-2 space-y-2 px-4 pb-3 animate-in slide-in-from-top-4">
          {linksToShow.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
  variant="ghost"
  className={`w-full justify-start hover:text-primary ${
    location.pathname === link.path
      ? "text-primary font-semibold"
      : "text-gray-700"
  }`}
>
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
          )}
        </div>
      )}
    </nav>
  );
}
