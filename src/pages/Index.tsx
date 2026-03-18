import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-hospital.jpg";
import { TrendingDown, Users, Heart, Shield, Clock, BarChart3 } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const stats = [
  { value: "$4.2M", label: "Average annual savings per system", icon: TrendingDown },
  { value: "14.2%", label: "Reduction in turnover costs", icon: BarChart3 },
  { value: "89%", label: "Nurse retention rate", icon: Heart },
  { value: "14 min", label: "Average time to fill a shift", icon: Clock },
];

const benefits = [
  {
    icon: TrendingDown,
    title: "Reduce Agency Costs",
    description: "Eliminate expensive travel nurse reliance with a sustainable, in-network staffing model that saves hospitals millions annually.",
  },
  {
    icon: Users,
    title: "Retain Top Talent",
    description: "Our AI-driven retention strategies identify burnout risks before they lead to resignation, keeping your best nurses engaged.",
  },
  {
    icon: Heart,
    title: "Improve Patient Outcomes",
    description: "Stable, empowered nursing teams deliver measurably better patient care, reducing readmissions and improving satisfaction scores.",
  },
  {
    icon: Shield,
    title: "Data-Driven Strategy",
    description: "We analyze 42 data points across your organization to build customized retention and staffing strategies that deliver ROI.",
  },
  {
    icon: Clock,
    title: "Real-Time Matching",
    description: "Our AI-powered marketplace connects qualified nurses to open shifts in minutes, not days. Reducing downtime and overtime costs.",
  },
  {
    icon: BarChart3,
    title: "Executive Consulting",
    description: "Bespoke consulting engagements designed for C-Suite leaders seeking organizational transformation in nurse retention.",
  },
];

const testimonials = [
  {
    quote: "Seraphyn Care transformed our staffing model. We reduced agency spend by 40% in the first year while improving nurse satisfaction scores across the board.",
    name: "Dr. Sarah Mitchell",
    role: "Chief Nursing Officer, Metro Health System",
  },
  {
    quote: "The assessment alone was worth its weight in gold. It revealed inefficiencies we'd been blind to for years. The consulting engagement paid for itself in 90 days.",
    name: "James R. Thornton",
    role: "CEO, Pacific Coast Medical Center",
  },
  {
    quote: "As a nurse, joining Seraphyn's network gave me the flexibility and respect I was looking for. I finally feel valued in my profession.",
    name: "Maria Rodriguez, RN",
    role: "ICU Nurse, 12 years experience",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05]"
        >
          Transforming Healthcare Through Nurse Retention & Smart Staffing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0, 0, 1] }}
          className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-[55ch] mx-auto leading-relaxed"
        >
          Seraphyn Care integrates clinical intelligence with bespoke consulting to reduce agency reliance and restore organizational health.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/consulting"
            className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            Book a Consultation
          </Link>
          <Link
            to="/staffing"
            className="px-8 py-4 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-lg font-medium tracking-wide backdrop-blur-sm transition-all duration-200 hover:bg-primary-foreground/20 active:scale-95"
          >
            Find Nurses
          </Link>
          <Link
            to="/for-nurses"
            className="px-8 py-4 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-lg font-medium tracking-wide backdrop-blur-sm transition-all duration-200 hover:bg-primary-foreground/20 active:scale-95"
          >
            Join as a Nurse
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Trusted By Marquee */}
    <section className="py-12 border-b border-border overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.1em] text-muted-foreground mb-8">
        Trusted by leading health systems
      </p>
      <div className="flex animate-marquee gap-16 opacity-40 grayscale items-center">
        {["Metro Health", "Pacific Coast Medical", "Sunrise Health", "Ascend Healthcare", "Pinnacle Systems", "Northwell Partners", "Metro Health", "Pacific Coast Medical", "Sunrise Health", "Ascend Healthcare", "Pinnacle Systems", "Northwell Partners"].map((name, i) => (
          <span key={i} className="font-serif text-xl text-foreground whitespace-nowrap">{name}</span>
        ))}
      </div>
    </section>

    {/* Problem Section */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <SectionHeading
          tag="THE CHALLENGE"
          title="The Cost of Turnover"
          description="Healthcare systems lose billions annually to nurse burnout, agency dependency, and retention failures. The staffing crisis isn't coming — it's here."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card text-center">
              <stat.icon className="mx-auto mb-4 text-accent" size={28} strokeWidth={1.5} />
              <p className="font-mono-tabular text-3xl font-semibold text-foreground">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <SectionHeading
          tag="THE SOLUTION"
          title="A Better Way to Staff and Retain"
          description="Seraphyn Care combines a technology-driven staffing marketplace with executive consulting to deliver sustainable workforce transformation."
        />
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

    {/* Testimonials */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <SectionHeading tag="TESTIMONIALS" title="What Leaders Are Saying" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card">
              <p className="text-muted-foreground leading-relaxed italic text-sm">"{t.quote}"</p>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="seraphyn-section">
      <div className="seraphyn-container text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">The End of the Staffing Crisis</h2>
          <p className="mt-6 text-muted-foreground max-w-[55ch] mx-auto leading-relaxed">
            Discover how Seraphyn Care can save your organization millions while creating a workplace where nurses thrive.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95"
              style={{ boxShadow: "var(--shadow-button)" }}
            >
              Get Your Free Assessment
            </Link>
            <Link
              to="/consulting"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-110 active:scale-95"
            >
              Schedule a Strategy Call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
