import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Zap, Brain, DollarSign, Clock, Shield, Users } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const features = [
  { icon: Zap, title: "Real-Time Matching", description: "Our AI pairs qualified nurses to open shifts instantly. Average time to fill: 14 minutes." },
  { icon: Brain, title: "AI-Powered Profiles", description: "Intelligent profiles match experience, certifications, and preferences for optimal placement." },
  { icon: DollarSign, title: "Reduced Agency Costs", description: "Cut travel nurse dependency by up to 60% with our in-network marketplace model." },
  { icon: Clock, title: "Flexible Scheduling", description: "Nurses choose shifts that fit their lives. Hospitals fill gaps without overtime penalties." },
  { icon: Shield, title: "Verified Credentials", description: "Every nurse is credentialed, background-checked, and skills-verified before entering the network." },
  { icon: Users, title: "Dedicated Support", description: "Our team ensures seamless onboarding and ongoing support for both hospitals and nurses." },
];

const Staffing = () => (
  <Layout>
    {/* Hero */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container text-center py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}>
          <h3 className="text-xs mb-4 text-muted-foreground">STAFFING MARKETPLACE</h3>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground">Intelligent Staffing, Delivered</h1>
          <p className="mt-6 text-muted-foreground max-w-[55ch] mx-auto leading-relaxed text-lg">
            A technology-driven marketplace that connects healthcare systems with qualified nurses in real time — reducing costs and improving care.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
              Post a Shift
            </Link>
            <Link to="/for-nurses" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-110 active:scale-95">
              Browse Nurses
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Live Dashboard Mockup */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <SectionHeading tag="LIVE MATCHING" title="See It in Action" description="Our AI-powered dashboard matches nurses to shifts based on skills, location, availability, and preferences." />
        <motion.div {...fadeUp} className="seraphyn-card p-0 overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Live Shift Dashboard</span>
            <span className="ml-auto font-mono-tabular text-xs text-accent">Average time to fill: 14 min</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { unit: "ICU — Night Shift", time: "7p–7a", status: "Matched", nurse: "J. Williams, RN" },
              { unit: "ER — Day Shift", time: "7a–7p", status: "Pending", nurse: "Matching..." },
              { unit: "Med-Surg — Evening", time: "3p–11p", status: "Matched", nurse: "A. Chen, BSN" },
            ].map((shift, i) => (
              <div key={i} className="p-6">
                <p className="text-sm font-medium text-foreground">{shift.unit}</p>
                <p className="text-xs text-muted-foreground mt-1">{shift.time}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${shift.status === "Matched" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                    {shift.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{shift.nurse}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <SectionHeading tag="PLATFORM FEATURES" title="Built for Modern Healthcare" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="seraphyn-card">
              <f.icon className="mb-5 text-accent" size={24} strokeWidth={1.5} />
              <h3 className="text-sm mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="seraphyn-section">
      <div className="seraphyn-container text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Ready to Transform Your Staffing?</h2>
          <p className="mt-6 text-muted-foreground max-w-[50ch] mx-auto">Start filling shifts faster while reducing costs. Our team will walk you through the platform.</p>
          <Link to="/assessment" className="inline-block mt-10 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
            Get Started Today
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Staffing;
