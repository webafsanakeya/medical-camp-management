import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { FaGithub, FaFacebookF,  FaLinkedin } from "react-icons/fa"
import MediCampLogo from "../MediCampLogo/MediCampLogo"


export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        {/* Section 1: Brand & about */}
        <div>
          <div className="flex items-center">
         <MediCampLogo />
      
  </div>
          <p className="text-muted-foreground mt-2">
            A platform to manage and join medical camps with ease.
          </p>
        </div>

        {/* Section 2: Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold">Navigation</h2>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/available-camps" className="hover:underline">Available Camps</Link></li>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/join" className="hover:underline">Join Us</Link></li>
          </ul>
        </div>

        {/* Section 3: Social Links */}
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
    <div className="flex gap-4 mt-3">
  <a href="https://github.com/webafsanakeya" target="_blank" rel="noopener noreferrer">
    <Button variant="ghost" size="icon"><FaGithub /></Button>
  </a>
  <a href="https://www.facebook.com/cutty.angel.92/" target="_blank" rel="noopener noreferrer">
    <Button variant="ghost" size="icon"><FaFacebookF /></Button>
  </a>
  <a href="https://www.linkedin.com/in/web-afsana-noor-keya-/" target="_blank" rel="noopener noreferrer">
    <Button variant="ghost" size="icon"><FaLinkedin /></Button>
  </a>

</div>
        </div>
      </div>
    </footer>
  )
}
