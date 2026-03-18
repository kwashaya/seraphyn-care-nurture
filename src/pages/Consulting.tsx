import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import consultingImage from "@/assets/consulting-glass.jpg";
import { Search, Brain, GraduationCap, Headphones } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const services = [
  { icon: Search, title: "Organizational Assessments", description: "Comprehensive analysis of your workforce dynamics, turnover patterns, and operational inefficiencies to build a clear picture of where value is being lost." },
  { icon: Brain, title: "AI-Driven Recommendations", description: "Leveraging proprietary algorithms and clinical data to deliver actionable, evidence-based strategies tailored to your organization's unique challenges." },
  { icon: GraduationCap, title: "Training & Implementation", description: "Hands-on support to embed new retention strategies, from leadership development to frontline engagement programs." },
  { icon: Headphones, title: "Long-Term Support", description: "Ongoing partnership with quarterly reviews, data monitoring, and strategy refinement to ensure sustained results." },
];

const Consulting = () => (
  <Layout>
    {/* Hero */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] as const }}>
            <h3 className="text-xs mb-4 text-muted-foreground">EXECUTIVE CONSULTING</h3>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
              Strategic Clarity for Healthcare Leaders
            </h1>
            <p className="mt-6 text-muted-foreground max-w-[55ch] leading-relaxed">
              Bespoke consulting engagements designed for C-Suite leaders seeking organizational transformation in nurse retention and workforce sustainability.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-8 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95"
              style={{ boxShadow: "var(--shadow-button)" }}
            >
              Schedule a Strategy Call
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <img src={consultingImage} alt="Abstract glass shapes representing clarity" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <SectionHeading tag="OUR APPROACH" title="A Framework for Transformation" description="Every engagement is custom-built around your organization's specific challenges, culture, and goals." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card">
              <s.icon className="mb-5 text-accent" size={24} strokeWidth={1.5} />
              <h3 className="text-sm mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ROI Section */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading tag="MEASURABLE IMPACT" title="Consulting That Pays for Itself" center={false} />
            <div className="space-y-6">
              {[
                { metric: "14.2%", label: "Average reduction in annual turnover costs" },
                { metric: "90 days", label: "Average time to positive ROI" },
                { metric: "$4.2M", label: "Average annual savings per health system" },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="flex items-baseline gap-4 pb-6 border-b border-border last:border-0">
                  <span className="font-mono-tabular text-2xl font-semibold text-accent">{item.metric}</span>
                  <span className="text-muted-foreground text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div {...fadeUp} className="seraphyn-card bg-primary text-primary-foreground">
            <h3 className="text-xs mb-6 text-primary-foreground/60">REQUEST AN EXECUTIVE BRIEFING</h3>
            <h2 className="font-serif text-3xl text-primary-foreground tracking-tight">Let's discuss how we can transform your workforce strategy.</h2>
            <p className="mt-4 text-primary-foreground/70 leading-relaxed text-sm">
              Our executive briefings are complimentary, confidential, and designed to give you actionable insights within the first conversation.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-8 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95"
            >
              Request a Briefing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Consulting;
