import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { FaGithub, FaFacebookF, FaLinkedin } from "react-icons/fa";
import logo_white from '../../assets/logo/logo_white.png';

export default function Footer() {
  return (
    <footer className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-gray-900 text-gray-300 border-t border-gray-700 shadow-t-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        {/* Section 1: Brand & About */}
        <div>
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo_white}
                alt="MediCamp Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="ml-2 font-semibold text-xl text-white">
                MediCamp
              </span>
            </Link>
          </div>
          <p className="text-gray-400 mt-2">
            A platform to manage and join medical camps with ease.
          </p>
        </div>

        {/* Section 2: Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="hover:underline text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/available-camps" className="hover:underline text-gray-400 hover:text-white">
                Available Camps
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline text-gray-400 hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Social Links */}
        <div>
          <h2 className="text-lg font-semibold text-white">Follow Us</h2>
          <div className="flex gap-4 mt-3">
            <a
              href="https://github.com/webafsanakeya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <FaGithub />
              </Button>
            </a>
            <a
              href="https://www.facebook.com/cutty.angel.92/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <FaFacebookF />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/web-afsana-noor-keya-/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <FaLinkedin />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
