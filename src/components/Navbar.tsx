import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/staffing", label: "Staffing" },
  { href: "/consulting", label: "Consulting" },
  { href: "/book", label: "The Book" },
  { href: "/for-nurses", label: "For Nurses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 seraphyn-glass border-b border-border/50">
      <div className="seraphyn-container flex items-center justify-between h-20 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Seraphyn Care Solutions" className="h-16 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-1/2 h-px bg-foreground transition-transform duration-300 origin-center ${
                  location.pathname === link.href ? "w-full -translate-x-1/2 scale-x-100" : "w-full -translate-x-1/2 scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
          <Link
            to="/assessment"
            className="px-5 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium transition-all duration-200 hover:brightness-95 active:scale-95"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            Free Assessment
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/assessment"
                onClick={() => setOpen(false)}
                className="px-5 py-3 bg-accent text-accent-foreground rounded-lg text-sm font-medium text-center"
              >
                Free Assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
