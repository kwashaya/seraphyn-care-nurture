import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";


const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="seraphyn-container px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <span className="text-lg font-semibold text-foreground">Seraphyn Care</span>
          <p className="mt-4 text-sm text-muted-foreground max-w-[30ch] leading-relaxed">
            Sustainable systems for the future of care.
          </p>
        </div>
        <div>
          <h4 className="text-xs mb-4">Solutions</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/staffing" className="hover:text-foreground transition-colors">Staffing Marketplace</Link>
            <Link to="/consulting" className="hover:text-foreground transition-colors">Executive Consulting</Link>
            <Link to="/assessment" className="hover:text-foreground transition-colors">Free Assessment</Link>
            <Link to="/book" className="hover:text-foreground transition-colors">The Book</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs mb-4">Company</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
            <Link to="/for-nurses" className="hover:text-foreground transition-colors">For Nurses</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs mb-4">Connect</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span>info@seraphyncare.com</span>
            <span>(800) 555-0199</span>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Facebook size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Instagram size={20} /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Twitter size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Seraphyn Care. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
