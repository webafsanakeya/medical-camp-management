import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { FaGithub, FaFacebookF, FaLinkedin } from "react-icons/fa";
import logo_white from '../../assets/logo/logo_white.png';

export default function Footer() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Available Camps", href: "/available-camps" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/webafsanakeya" },
    { icon: <FaFacebookF />, href: "https://www.facebook.com/cutty.angel.92/" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/web-afsana-noor-keya-/" },
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid gap-8 md:grid-cols-3 text-sm">

        {/* Brand & About */}
        <div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img src={logo_white} alt="MediCamp Logo" className="w-10 h-10 object-contain" />
            <span className="ml-2 font-bold text-xl">Medi<span className="text-teal-200">Camp</span></span>
          </div>
          <p className="text-white/80 mt-3">
            A modern platform to manage and join medical camps with ease.
          </p>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="md:block hidden">
          <h2 className="text-lg font-semibold mb-3">Navigation</h2>
          <ul className="space-y-2">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="relative inline-block text-white/90 hover:text-teal-200 transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links - Desktop */}
        <div className="md:block hidden">
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20 text-white hover:text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {link.icon}
                </Button>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Collapsible Navigation */}
        <div className="md:hidden">
          {/* Nav */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="w-full text-left text-white font-semibold flex justify-between items-center py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Navigation
            <span className={`transform transition-transform ${isNavOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
          {isNavOpen && (
            <ul className="mt-2 space-y-2 px-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block px-3 py-2 rounded-md text-white hover:bg-white/20 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Social */}
          <button
            onClick={() => setIsSocialOpen(!isSocialOpen)}
            className="w-full text-left text-white font-semibold flex justify-between items-center mt-4 py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Follow Us
            <span className={`transform transition-transform ${isSocialOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
          {isSocialOpen && (
            <div className="flex gap-4 mt-2 px-2">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/10 hover:bg-white/20 text-white hover:text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {link.icon}
                  </Button>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-white/70">
        &copy; {new Date().getFullYear()} MediCamp. All rights reserved.
      </div>
    </footer>
  );
}
