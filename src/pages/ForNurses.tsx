import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, Heart, TrendingUp, Shield, Star, Users } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

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
          <h3 className="text-xs mb-4 text-muted-foreground">FOR NURSES</h3>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground">Work Where You Are Valued</h1>
          <p className="mt-6 text-muted-foreground max-w-[55ch] mx-auto leading-relaxed text-lg">
            Join a network of elite nursing professionals who choose flexibility, fair compensation, and workplaces that respect them.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-10 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            Join the Network
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Live Shift Preview */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <SectionHeading tag="LIVE PREVIEW" title="See What's Available" description="Browse real-time shifts from top healthcare facilities. Sign up to view full details and apply." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { role: "ICU Registered Nurse", facility: "Metro Health System", location: "San Francisco, CA", shift: "Night · 7p–7a", rate: "$65/hr" },
            { role: "ER Nurse (BSN)", facility: "Pacific Coast Medical", location: "Los Angeles, CA", shift: "Day · 7a–7p", rate: "$72/hr" },
            { role: "Med-Surg RN", facility: "Sunrise Health", location: "Denver, CO", shift: "Evening · 3p–11p", rate: "$58/hr" },
          ].map((shift, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card">
              <p className="text-sm font-medium text-foreground">{shift.role}</p>
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
    <section className="seraphyn-section seraphyn-gradient-bg">
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

    {/* CTA */}
    <section className="seraphyn-section">
      <div className="seraphyn-container text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Your Career, Your Terms</h2>
          <p className="mt-6 text-muted-foreground max-w-[50ch] mx-auto">
            Join thousands of nurses who have found a better way to practice. Free to join, always.
          </p>
          <Link to="/contact" className="inline-block mt-10 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
            Join the Network
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ForNurses;
