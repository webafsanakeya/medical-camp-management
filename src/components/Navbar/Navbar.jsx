// Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMenu, HiX, HiOutlineChevronDown,
  HiOutlineUser, HiOutlineUserAdd
} from "react-icons/hi";
import { BiLogOutCircle, BiLayout, BiLogIn } from "react-icons/bi";
import MediCampLogo from "../ui/Shared/MediCampLogo/MediCampLogo";
import useUserRole from "@/hooks/useUserRole";
import toast from "react-hot-toast";
import { AuthContext } from "@/providers/AuthProvider";

const Navbar = () => {
  const { role } = useUserRole();
  const { user, logOut, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);

  const handleDemoLogin = async (demoRole) => {
    const credentials = {
      admin: { email: "demo.admin@medicamp.com", password: "password123" },
      user: { email: "demo.user@medicamp.com", password: "password123" },
    };
    const { email, password } = demoRole === "admin" ? credentials.admin : credentials.user;
    try {
      await signIn(email, password);
      toast.success(`Logged in as Demo ${demoRole === "admin" ? "Organizer" : "Participant"}`);
      const redirectPath = demoRole === "admin" ? "/dashboard/overview" : "/dashboard/analytics";
      navigate(redirectPath);
    } catch (err) {
      toast.error("Demo login failed. Please ensure demo accounts are set up.");
    }
    setIsJoinUsOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Sign out successfully"))
      .catch((error) => toast.error(error.message));
    setIsProfileOpen(false);
  };

  const handleDashboardNavigate = () => {
    const dashboardPath = role === "user" || role === "participant" ? "/dashboard/analytics" : "/dashboard/overview";
    navigate(dashboardPath);
    setIsProfileOpen(false);
  };

  const loggedOutLinks = [
    { text: "Home", href: "/" },
    { text: "Available Camps", href: "/available-camps" },
    { text: "Contact", href: "/#contact" },
  ];

  const loggedInLinks = [
    { text: "Home", href: "/" },
    { text: "Available Camps", href: "/available-camps" },
    { text: "Services", href: "/#services" },
    { text: "About Us", href: "/#about" },
    { text: "Contact", href: "/#contact" },
  ];

  const linksToDisplay = user ? loggedInLinks : loggedOutLinks;

  const dropdownVariants = {
    open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    closed: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.1 } },
  };

  const isHashLink = (href) => href.includes("/#");

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div onClick={() => navigate("/")} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <MediCampLogo />
            <span className="text-2xl font-bold text-white">Medi<span className="text-teal-200">Camp</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-baseline space-x-6">
            {linksToDisplay.map(link => {
              const LinkComponent = isHashLink(link.href) ? HashLink : Link;
              const isActive =
                pathname === link.href || (isHashLink(link.href) && pathname === "/" && hash === link.href.substring(1));
              return (
                <LinkComponent
                  key={link.text}
                  to={link.href}
                  {...(isHashLink(link.href) ? { smooth: true } : {})}
                  className={`relative px-1 py-2 text-base font-medium transition-all duration-200
                    ${isActive
                      ? "text-white font-semibold border-b-2 border-white"
                      : "text-white/90 hover:text-teal-200 hover:border-b hover:border-teal-200"
                    }`}
                >
                  {link.text}
                </LinkComponent>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex text-sm bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.photoURL || "https://placehold.co/100x100/E2E8F0/4A5568?text=User"}
                    alt={user?.displayName || "User"}
                  />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={dropdownVariants}
                      className="absolute right-0 w-56 mt-2 origin-top-right bg-white/90 backdrop-blur-md rounded-md shadow-lg ring-1 ring-black ring-opacity-10"
                    >
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm text-gray-500">Welcome,</p>
                          <p className="font-medium text-gray-800 truncate">{user?.displayName || "User"}</p>
                        </div>
                        <button
                          onClick={handleDashboardNavigate}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100"
                        >
                          <BiLayout className="w-5 h-5 mr-2" /> Dashboard
                        </button>
                        <button
                          onClick={handleLogOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                        >
                          <BiLogOutCircle className="w-5 h-5 mr-2" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsJoinUsOpen(!isJoinUsOpen)}
                  className="flex items-center gap-2 px-5 py-2.5 text-base font-medium text-white bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Join Us
                  <HiOutlineChevronDown className={`h-5 w-5 transition-transform ${isJoinUsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isJoinUsOpen && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={dropdownVariants}
                      className="absolute right-0 w-56 mt-2 origin-top-right bg-white/90 backdrop-blur-md rounded-md shadow-lg ring-1 ring-black ring-opacity-10"
                    >
                      <div className="py-1">
                        <Link
                          to="/sign-in"
                          onClick={() => setIsJoinUsOpen(false)}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100"
                        >
                          <BiLogIn className="w-5 h-5 mr-2" /> Sign In
                        </Link>
                        <Link
                          to="/sign-up"
                          onClick={() => setIsJoinUsOpen(false)}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100"
                        >
                          <HiOutlineUserAdd className="w-5 h-5 mr-2" /> Sign Up
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={() => handleDemoLogin("user")}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100"
                        >
                          <HiOutlineUser className="w-5 h-5 mr-2 text-blue-500" /> Demo Participant
                        </button>
                        <button
                          onClick={() => handleDemoLogin("admin")}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100"
                        >
                          <HiOutlineUser className="w-5 h-5 mr-2 text-teal-500" /> Demo Organizer
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex -mr-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-teal-200 hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <HiX className="block w-6 h-6" /> : <HiMenu className="block w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/30 md:hidden bg-gradient-to-b from-teal-500 via-teal-600 to-cyan-500"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {linksToDisplay.map(link => {
                const LinkComponent = isHashLink(link.href) ? HashLink : Link;
                return (
                  <LinkComponent
                    key={link.text}
                    to={link.href}
                    smooth
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 transition-all duration-200"
                  >
                    {link.text}
                  </LinkComponent>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
