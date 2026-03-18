import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="seraphyn-container px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <span className="font-serif text-xl text-foreground">Seraphyn Care</span>
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
