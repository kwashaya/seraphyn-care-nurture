import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, BookOpen, TrendingDown, DollarSign, Shield, Heart, CheckCircle, Quote } from "lucide-react";
import bookMockup from "@/assets/book-mockup.jpg";
import authorPortrait from "@/assets/author-portrait.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const stats = [
  { value: "$4.4M", label: "Average annual cost of nurse turnover per hospital" },
  { value: "100.5%", label: "National RN turnover rate at its peak" },
  { value: "$46K", label: "Average cost to replace a single bedside nurse" },
];

const learnings = [
  "The Million Dollar Nurse Turnover Equation—quantify exactly what turnover costs your system",
  "Proven retention frameworks that reduce RN attrition by 30–50%",
  "How to eliminate dependency on expensive travel nurse agencies",
  "AI-driven workforce optimization strategies for modern health systems",
  "Executive playbooks for building cultures that nurses refuse to leave",
  "ROI models that turn retention into a measurable financial strategy",
];

const impacts = [
  { icon: DollarSign, title: "Cut Costs by Millions", desc: "Replace reactive agency spending with proactive retention strategies that deliver 5–10x ROI." },
  { icon: Heart, title: "Improve Patient Outcomes", desc: "Stable nursing teams deliver measurably better care, fewer errors, and higher patient satisfaction scores." },
  { icon: Shield, title: "Operational Resilience", desc: "Build a workforce infrastructure that withstands market volatility, seasonal surges, and regulatory changes." },
];

const testimonials = [
  { quote: "This book should be required reading for every hospital CFO in America. The financial frameworks alone saved us over $2M in our first year.", author: "Chief Financial Officer", org: "Regional Health System, Southeast" },
  { quote: "Kundayi doesn't just identify the problem—she gives you the exact playbook to fix it. We reduced our travel nurse dependency by 40% within six months.", author: "Chief Nursing Officer", org: "Academic Medical Center, Midwest" },
  { quote: "Finally, a data-driven approach to nurse retention that speaks the language of the C-suite. This changed how our entire leadership team thinks about workforce investment.", author: "VP of Operations", org: "Multi-Hospital Health Network" },
];

const Book = () => {
  const [leadForm, setLeadForm] = useState({ email: "", org: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="seraphyn-section seraphyn-gradient-bg min-h-[90vh] flex items-center">
        <div className="seraphyn-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <h3 className="text-xs mb-4 text-accent">NEW BOOK BY KUNDAYI WASHAYA, RN</h3>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                The Million Dollar Nurse
              </h1>
              <p className="mt-2 font-serif text-2xl md:text-3xl text-muted-foreground italic">
                How Nurse Retention Saves Hospitals Millions and Protects Patient Care
              </p>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-[55ch]">
                The definitive guide for healthcare executives who are ready to stop bleeding millions to turnover and start building the workforce infrastructure that drives financial performance and clinical excellence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#buy" className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95 inline-flex items-center gap-2" style={{ boxShadow: "var(--shadow-button)" }}>
                  Buy the Book <BookOpen size={18} />
                </a>
                <Link to="/contact" className="px-8 py-4 border border-border text-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:bg-muted inline-flex items-center gap-2">
                  Book a Strategy Call <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              <div className="relative">
                <img src={bookMockup} alt="The Million Dollar Nurse book by Kundayi Washaya" className="rounded-2xl w-full max-w-lg mx-auto" style={{ boxShadow: "var(--shadow-card-hover)" }} />
                <div className="absolute -bottom-6 -left-6 seraphyn-card py-4 px-6 hidden md:block">
                  <p className="font-mono-tabular text-2xl font-semibold text-foreground">$4.4M</p>
                  <p className="text-xs text-muted-foreground mt-1">Average annual turnover cost per hospital</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container">
          <SectionHeading tag="THE CRISIS" title="Healthcare Is Hemorrhaging Talent—and Money" description="Every nurse who walks out your door takes $46,000 in replacement costs with them. Multiply that across your system, and the number is staggering. Yet most organizations still treat turnover as an unavoidable cost of doing business." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card text-center">
                <p className="font-mono-tabular text-4xl font-semibold text-accent">{stat.value}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed">
              The staffing crisis isn't just about shortages—it's about a broken system. Burnout-driven attrition, over-reliance on travel nurse agencies charging 3x market rates, and reactive hiring practices are draining hospital budgets while patient care suffers. <strong className="text-foreground">This book proves there's a better way.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="seraphyn-section">
        <div className="seraphyn-container">
          <SectionHeading tag="THE SOLUTION" title="A Strategic Blueprint for Retention-Driven Growth" description="This isn't another nursing textbook. It's a C-suite playbook that translates workforce challenges into financial strategy—with actionable frameworks you can implement immediately." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
            <motion.div {...fadeUp}>
              <h3 className="text-xs mb-6 text-muted-foreground">WHAT YOU'LL LEARN</h3>
              <div className="space-y-4">
                {learnings.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle size={20} className="text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="seraphyn-card bg-primary text-primary-foreground">
              <h3 className="text-xs mb-4 text-primary-foreground/60">FEATURED FRAMEWORK</h3>
              <h2 className="font-serif text-3xl text-primary-foreground">The Million Dollar Nurse Turnover Equation</h2>
              <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
                A proprietary formula that quantifies the true cost of nurse turnover across direct, indirect, and hidden expense categories—giving executives the financial clarity they need to justify retention investments to their boards.
              </p>
              <div className="mt-6 pt-6 border-t border-primary-foreground/10">
                <p className="text-xs text-primary-foreground/50">Used by health systems managing 500+ beds to recover millions in preventable losses.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container">
          <SectionHeading tag="THE IMPACT" title="Why This Book Is a Business Decision" description="Every chapter is designed to deliver measurable return on investment. This isn't aspirational thinking—it's operational strategy backed by data." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {impacts.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-2xl text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="seraphyn-section">
        <div className="seraphyn-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <img src={authorPortrait} alt="Kundayi Washaya, RN — Author and Healthcare Consultant" className="rounded-2xl w-full max-w-md mx-auto lg:mx-0" style={{ boxShadow: "var(--shadow-card-hover)" }} />
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <h3 className="text-xs mb-4 text-muted-foreground">ABOUT THE AUTHOR</h3>
              <h2 className="font-serif text-4xl text-foreground">Kundayi Washaya, RN</h2>
              <p className="mt-2 text-accent font-medium text-sm">Nurse Leader · Healthcare Consultant · Founder, Seraphyn Care</p>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Kundayi Washaya is a registered nurse turned healthcare strategist who has spent her career on both sides of the staffing equation—at the bedside and in the boardroom. After witnessing firsthand the devastating effects of nurse burnout and systemic understaffing, she founded Seraphyn Care to bridge the gap between frontline nursing reality and executive decision-making.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Her work combines clinical expertise with data-driven consulting, helping health systems transform their workforce strategies from reactive cost centers into proactive growth engines. <em>The Million Dollar Nurse</em> distills years of real-world experience into a framework that any healthcare leader can implement.
              </p>
              <Link to="/about" className="mt-6 text-accent text-sm font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                Learn more about Seraphyn Care <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container">
          <SectionHeading tag="WHAT LEADERS ARE SAYING" title="Trusted by Healthcare Executives" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card flex flex-col">
                <Quote size={24} className="text-accent/30 mb-4" strokeWidth={1.5} />
                <p className="text-sm text-foreground leading-relaxed flex-1">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Buy */}
      <section id="buy" className="seraphyn-section seraphyn-gradient-bg">
        <div className="seraphyn-container text-center max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h3 className="text-xs mb-4 text-accent">START SAVING MILLIONS TODAY</h3>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">The Cost of Inaction Is Measured in Millions</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-[55ch] mx-auto">
              Every month you delay a retention strategy, your organization loses nurses—and the revenue, patient trust, and institutional knowledge they take with them. This book gives you the roadmap to stop the bleed.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="https://amazon.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95 inline-flex items-center gap-2" style={{ boxShadow: "var(--shadow-button)" }}>
                Buy on Amazon <BookOpen size={18} />
              </a>
              <Link to="/contact" className="px-8 py-4 border border-border text-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:bg-muted inline-flex items-center gap-2">
                Schedule a Strategy Call <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h3 className="text-xs mb-4 text-muted-foreground">FREE RESOURCE</h3>
            <h2 className="font-serif text-4xl text-foreground">Get Your Free Staffing Cost Analysis</h2>
            <p className="mt-4 text-muted-foreground max-w-[50ch] mx-auto text-sm leading-relaxed">
              Discover exactly how much nurse turnover is costing your organization—and the specific strategies to reduce it. No obligation, no sales pitch. Just data.
            </p>

            {leadSubmitted ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10 seraphyn-card">
                <CheckCircle className="mx-auto mb-4 text-accent" size={40} strokeWidth={1.5} />
                <h2 className="font-serif text-2xl text-foreground">Your Analysis Is on the Way</h2>
                <p className="mt-3 text-sm text-muted-foreground">We'll deliver your personalized staffing cost analysis within 24 hours.</p>
              </motion.div>
            ) : (
              <div className="mt-10 seraphyn-card text-left">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Work Email</label>
                    <input type="email" value={leadForm.email} onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="cno@hospital.org" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Organization</label>
                    <input type="text" value={leadForm.org} onChange={e => setLeadForm({ ...leadForm, org: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Metro Health System" />
                  </div>
                </div>
                <button onClick={() => setLeadSubmitted(true)} className="w-full mt-6 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
                  Get My Free Analysis
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
