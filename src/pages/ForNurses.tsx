import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Heart, TrendingUp, Shield, Star, Users, ArrowRight, ClipboardCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import nursesImage from "@/assets/nurses-early-access.jpg";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const ctaLinkClass =
  "inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95";
const ctaGhostClass =
  "inline-block px-8 py-4 rounded-lg font-medium tracking-wide border border-border text-foreground transition-all duration-200 hover:bg-card";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Create Your Profile",
    description: "Build your professional nurse profile and tell us what kind of work you're looking for.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Set Your Preferences",
    description: "Share your specialty, location, availability, desired work schedule, and compensation preferences.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Be Ready for Opportunities",
    description: "As healthcare facilities join the Seraphyn Care marketplace, your profile will be ready for relevant opportunities.",
  },
];

const previewShifts = [
  { role: "ICU Registered Nurse", facility: "Metro Health System", location: "San Francisco, CA", shift: "Night · 7p–7a", rate: "$65/hr" },
  { role: "ER Nurse (BSN)", facility: "Pacific Coast Medical", location: "Los Angeles, CA", shift: "Day · 7a–7p", rate: "$72/hr" },
  { role: "Med-Surg RN", facility: "Sunrise Health", location: "Denver, CO", shift: "Evening · 3p–11p", rate: "$58/hr" },
];

const benefits = [
  { icon: Calendar, title: "Flexible Shifts", description: "Choose when, where, and how often you work. Full control over your schedule with shifts that fit your life." },
  { icon: Heart, title: "Better Work Environments", description: "We partner with hospitals committed to nurse well-being, safe staffing ratios, and respectful culture." },
  { icon: TrendingUp, title: "Career Growth", description: "Access continuing education, mentorship programs, and leadership development opportunities." },
  { icon: Shield, title: "Fair Compensation", description: "Transparent pay rates with no hidden fees. Know exactly what you'll earn before you accept a shift." },
  { icon: Star, title: "Professional Recognition", description: "Your skills and experience are valued. Build a verified profile that showcases your expertise." },
  { icon: Users, title: "Community & Support", description: "Join a network of elite nursing professionals who support each other and advocate for better working conditions." },
];

const ForNurses = () => (
  <Layout>
    {/* Hero */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container text-center py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] as const }}>
          <h3 className="text-xs mb-4 text-muted-foreground tracking-[0.2em]">FOR NURSES · EARLY ACCESS</h3>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground max-w-[20ch] mx-auto">
            Be Among the First Nurses on the Seraphyn Care Network
          </h1>
          <p className="mt-6 text-muted-foreground max-w-[58ch] mx-auto leading-relaxed text-lg">
            We're building a better way for nurses to choose where and when they work. Join the network now, create your profile, and be ready when opportunities become available in your area.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className={ctaLinkClass} style={{ boxShadow: "var(--shadow-button)" }}>
              Join the Nurse Network
            </Link>
            <a href="#why-join" className={ctaGhostClass}>
              Learn How It Works
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Why Join Before Launch */}
    <section id="why-join" className="seraphyn-section scroll-mt-24">
      <div className="seraphyn-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <h3 className="text-xs mb-4 text-muted-foreground tracking-[0.2em]">WHY JOIN BEFORE LAUNCH?</h3>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">Get Your Profile in Early</h2>
            <div className="mt-10 flex flex-col gap-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <span className="font-serif text-2xl text-accent shrink-0 w-10">{step.number}</span>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <step.icon size={16} strokeWidth={1.5} className="text-accent" />
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/signup" className={`${ctaLinkClass} mt-10`} style={{ boxShadow: "var(--shadow-button)" }}>
              Create Your Profile
            </Link>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="order-1 lg:order-2">
            <div className="seraphyn-card p-2 overflow-hidden">
              <img
                src={nursesImage}
                alt="A team of professional nurses in a modern hospital"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Marketplace Preview */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <SectionHeading
          tag="MARKETPLACE PREVIEW"
          title="A Look at What's Coming"
          description="Here's how opportunities will appear on the Seraphyn Care marketplace. Your profile and preferences determine which opportunities you see as our healthcare network grows."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewShifts.map((shift, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{shift.role}</p>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2 py-0.5">Preview</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{shift.facility}</p>
              <p className="text-xs text-muted-foreground">{shift.location}</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{shift.shift}</span>
                <span className="font-mono-tabular text-sm text-accent font-medium">{shift.rate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <SectionHeading tag="WHY SERAPHYN" title="Built Around Your Needs" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="seraphyn-card">
              <b.icon className="mb-5 text-accent" size={24} strokeWidth={1.5} />
              <h3 className="text-sm mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Launch Message */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground max-w-[22ch] mx-auto">
            Get Ready Before the Opportunities Arrive
          </h2>
          <p className="mt-6 text-muted-foreground max-w-[55ch] mx-auto leading-relaxed">
            The sooner your profile is complete, the sooner you'll be ready to explore opportunities that match your specialty, preferences, and availability as our healthcare network grows.
          </p>
          <Link to="/signup" className={`${ctaLinkClass} mt-10`} style={{ boxShadow: "var(--shadow-button)" }}>
            Get Early Access
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="seraphyn-section">
      <div className="seraphyn-container text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Your Career, Your Terms</h2>
          <p className="mt-6 text-muted-foreground max-w-[50ch] mx-auto">
            Join early. Build your profile. Set your preferences. Be ready for opportunities. Free to join, always.
          </p>
          <Link to="/signup" className={`${ctaLinkClass} mt-10`} style={{ boxShadow: "var(--shadow-button)" }}>
            Join the Nurse Network <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ForNurses;
