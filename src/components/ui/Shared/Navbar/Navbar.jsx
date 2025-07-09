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

export default function Navbar({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="border-b shadow-sm px-4 py-1">
      <div className="flex justify-between items-center">
        
  <div className="flex items-center">
         <MediCampLogo />
        <Link to="/" className="text-xl font-bold -ml-4">
          MediCamp
        </Link>
  </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/available-camps">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/available-camps">
            <Button variant="ghost">Available Camps</Button>
          </Link>
          {!user ? (
            <Link to="/signup">
              <Button>Join Us</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>{user?.name}</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full">
              Home
            </Button>
          </Link>
          <Link
            to="/available-camps"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Button variant="ghost" className="w-full">
              Available Camps
            </Button>
          </Link>

          {!user ? (
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Join Us</Button>
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="px-4 text-sm font-medium">{user?.name}</div>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">Dashboard</Button>
              </Link>
              <Link to="/logout" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">Logout</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
