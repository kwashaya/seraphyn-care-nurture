import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, BookOpen, DollarSign, Shield, TrendingDown, BarChart3, CheckCircle, Quote, PieChart } from "lucide-react";
import bookMockup from "@/assets/book-mockup.jpg";
import authorPortrait from "@/assets/author-portrait.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const stats = [
  { value: "$4.4M", label: "Average annual nurse turnover cost per hospital", context: "Direct P&L impact" },
  { value: "3–5×", label: "What travel nurse agencies charge vs. permanent staff rates", context: "Agency cost multiplier" },
  { value: "$46K", label: "Fully loaded cost to replace a single bedside RN", context: "Per-departure expense" },
  { value: "17%", label: "Average EBITDA margin erosion from preventable turnover", context: "Margin compression" },
];

const learnings = [
  "The Million Dollar Nurse Turnover Equation—a CFO-ready formula to quantify total turnover cost across direct, indirect, and hidden expense lines",
  "How to eliminate $2–8M in annual travel nurse agency spend through structured retention pipelines",
  "Board-ready ROI models that justify retention investment with 90-day payback projections",
  "Workforce cost optimization frameworks that reduce labor expense ratio by 12–18%",
  "P&L-aligned retention strategies that convert your largest variable cost into a predictable, controlled line item",
  "Benchmarking tools to compare your turnover costs against national and peer-group medians",
];

const impacts = [
  { icon: DollarSign, title: "Recover $2–8M Annually", desc: "Replace reactive agency spending with proactive retention strategies that deliver 5–10× ROI within the first fiscal year. Most systems recover investment within 90 days." },
  { icon: TrendingDown, title: "Reduce Labor Cost Ratio", desc: "Lower your labor expense from 55–60% of operating revenue to the 48–52% benchmark through permanent staff optimization and agency dependency elimination." },
  { icon: BarChart3, title: "Protect Operating Margins", desc: "Stabilize EBITDA by removing the volatility of travel nurse premiums, overtime surges, and the hidden costs of institutional knowledge loss." },
  { icon: Shield, title: "De-Risk Regulatory Exposure", desc: "Reduce CMS penalty risk, improve quality metrics tied to reimbursement, and build staffing resilience that satisfies board-level governance requirements." },
];

const testimonials = [
  { quote: "This book paid for itself before I finished Chapter 3. The turnover cost equation alone revealed $3.2M in hidden expenses our finance team had been miscategorizing. We presented the framework to our board within a week.", author: "Chief Financial Officer", org: "650-Bed Regional Health System, Southeast" },
  { quote: "As a CFO, I've seen dozens of workforce proposals. This is the first one that speaks our language—IRR, payback period, cost-per-FTE. We reduced agency spend by $4.1M in the first year of implementation.", author: "SVP of Finance", org: "Multi-Hospital Academic System, Northeast" },
  { quote: "Kundayi doesn't just identify the problem—she gives you the exact financial playbook to fix it. We cut travel nurse dependency by 40% and redirected $2.8M to permanent staff recruitment and retention programs.", author: "Chief Operating Officer", org: "3-Hospital Health Network, Midwest" },
];

const roiBreakdown = [
  { label: "Travel nurse agency elimination", savings: "$2.1–6.4M", timeline: "6–12 months" },
  { label: "Reduced turnover replacement costs", savings: "$920K–2.3M", timeline: "3–9 months" },
  { label: "Overtime & premium pay reduction", savings: "$480K–1.1M", timeline: "3–6 months" },
  { label: "Improved quality metric reimbursement", savings: "$200K–800K", timeline: "12–18 months" },
];

const Book = () => {
  const [leadForm, setLeadForm] = useState({ email: "", org: "", title: "", bedCount: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="seraphyn-section seraphyn-gradient-bg min-h-[90vh] flex items-center">
        <div className="seraphyn-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <PieChart size={14} className="text-accent" />
                <span className="text-xs font-medium text-accent">FOR CFOs & HEALTHCARE EXECUTIVES</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                Your Hospital Is Losing <span className="text-accent">$4.4 Million</span> a Year to Nurse Turnover
              </h1>
              <p className="mt-4 font-serif text-xl md:text-2xl text-muted-foreground italic">
                This book shows you exactly where it's hiding on your P&L—and how to recover it.
              </p>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-[55ch]">
                <em>The Million Dollar Nurse</em> is the first book to translate the nursing retention crisis into the financial language of the C-suite—with board-ready frameworks, ROI models, and a 90-day implementation roadmap.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#buy" className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95 inline-flex items-center gap-2" style={{ boxShadow: "var(--shadow-button)" }}>
                  Buy the Book <BookOpen size={18} />
                </a>
                <Link to="/contact" className="px-8 py-4 border border-border text-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:bg-muted inline-flex items-center gap-2">
                  Request Executive Briefing <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              <div className="relative">
                <img src={bookMockup} alt="The Million Dollar Nurse book by Kundayi Washaya" className="rounded-2xl w-full max-w-lg mx-auto" style={{ boxShadow: "var(--shadow-card-hover)" }} />
                <div className="absolute -bottom-6 -left-6 seraphyn-card py-4 px-6 hidden md:block">
                  <p className="font-mono-tabular text-2xl font-semibold text-accent">5–10×</p>
                  <p className="text-xs text-muted-foreground mt-1">Documented ROI from retention strategies</p>
                </div>
                <div className="absolute -top-4 -right-4 seraphyn-card py-3 px-5 hidden md:block">
                  <p className="font-mono-tabular text-lg font-semibold text-foreground">90 Days</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Average payback period</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Financial Problem */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container">
          <SectionHeading tag="THE FINANCIAL CRISIS" title="Nurse Turnover Is Your Largest Unmanaged Expense" description="Most health systems track turnover as an HR metric. The ones losing the least money treat it as a financial strategy. Here's what the data shows when you look at the full cost picture." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="seraphyn-card text-center">
                <p className="text-[10px] font-medium text-accent uppercase tracking-widest mb-2">{stat.context}</p>
                <p className="font-mono-tabular text-4xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed">
              Travel nurse agencies are charging 3–5× permanent staff rates. Overtime premiums are compressing margins. Every departure triggers a $46K replacement cycle that takes 90+ days to fill. <strong className="text-foreground">These aren't HR problems—they're balance sheet problems. And this book gives you the financial playbook to solve them.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI Breakdown */}
      <section className="seraphyn-section">
        <div className="seraphyn-container">
          <SectionHeading tag="THE ROI CASE" title="Projected Savings by Category" description="Based on aggregate data from health systems that implemented the frameworks outlined in this book. Results vary by system size, current turnover rate, and agency dependency level." />
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="seraphyn-card overflow-hidden">
              <div className="grid grid-cols-[1fr,auto,auto] gap-x-6 gap-y-0 text-xs text-muted-foreground font-medium uppercase tracking-wider pb-4 border-b border-border px-2">
                <span>Cost Category</span>
                <span className="text-right">Annual Savings</span>
                <span className="text-right hidden sm:block">Timeline</span>
              </div>
              {roiBreakdown.map((row, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="grid grid-cols-[1fr,auto,auto] gap-x-6 items-center py-4 border-b border-border/50 last:border-0 px-2">
                  <span className="text-sm text-foreground">{row.label}</span>
                  <span className="font-mono-tabular text-sm font-semibold text-accent text-right">{row.savings}</span>
                  <span className="text-xs text-muted-foreground text-right hidden sm:block">{row.timeline}</span>
                </motion.div>
              ))}
              <div className="grid grid-cols-[1fr,auto,auto] gap-x-6 items-center pt-4 mt-2 border-t-2 border-accent/20 px-2">
                <span className="text-sm font-semibold text-foreground">Total Projected Recovery</span>
                <span className="font-mono-tabular text-lg font-bold text-accent text-right">$3.7–10.6M</span>
                <span className="text-xs text-muted-foreground text-right hidden sm:block">Year 1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container">
          <SectionHeading tag="WHAT'S INSIDE" title="A CFO's Playbook for Workforce Cost Optimization" description="Every chapter is built around financial decision-making. No clinical theory—just actionable frameworks with quantified outcomes that translate directly to your P&L." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
            <motion.div {...fadeUp}>
              <h3 className="text-xs mb-6 text-muted-foreground">KEY FRAMEWORKS & TAKEAWAYS</h3>
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
                A proprietary financial model that quantifies the true cost of nurse turnover across 14 direct, indirect, and hidden expense categories—including productivity loss, quality metric penalties, and institutional knowledge depreciation. Designed to plug directly into board presentations and capital budget requests.
              </p>
              <div className="mt-6 pt-6 border-t border-primary-foreground/10 space-y-2">
                <p className="text-xs text-primary-foreground/50">Used by CFOs at systems managing 500–3,000+ beds to recover millions in misclassified or untracked labor costs.</p>
                <p className="text-xs text-primary-foreground/50 font-medium">Includes Excel templates and board presentation decks.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Impact */}
      <section className="seraphyn-section">
        <div className="seraphyn-container">
          <SectionHeading tag="THE BOTTOM LINE" title="Why This Book Belongs in Your Next Board Meeting" description="Every chapter delivers measurable return on investment. This is operational finance strategy backed by real health system data—not aspirational theory." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {impacts.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="seraphyn-card">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-xl text-foreground">{item.title}</h2>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <img src={authorPortrait} alt="Kundayi Washaya, RN — Author and Healthcare Consultant" className="rounded-2xl w-full max-w-md mx-auto lg:mx-0" style={{ boxShadow: "var(--shadow-card-hover)" }} />
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <h3 className="text-xs mb-4 text-muted-foreground">ABOUT THE AUTHOR</h3>
              <h2 className="font-serif text-4xl text-foreground">Kundayi Washaya, RN</h2>
              <p className="mt-2 text-accent font-medium text-sm">Nurse Leader · Healthcare Finance Strategist · Founder, Seraphyn Care</p>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Kundayi Washaya is a registered nurse turned healthcare financial strategist who has spent her career on both sides of the staffing equation—at the bedside and in the boardroom. She founded Seraphyn Care to bridge the gap between frontline nursing reality and executive financial decision-making.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Her consulting practice has helped health systems recover over $20M in preventable workforce costs. She advises CFOs and COOs on labor cost optimization, agency spend reduction, and retention-driven financial strategy. <em>The Million Dollar Nurse</em> distills these engagements into a framework any finance leader can implement.
              </p>
              <Link to="/consulting" className="mt-6 text-accent text-sm font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                Explore executive consulting services <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="seraphyn-section">
        <div className="seraphyn-container">
          <SectionHeading tag="WHAT FINANCE LEADERS ARE SAYING" title="Trusted by CFOs and Health System Executives" />
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
            <h3 className="text-xs mb-4 text-accent">THE COST OF DELAY</h3>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Every Month You Wait Costs Your System $367,000</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-[55ch] mx-auto">
              That's $4.4M divided by 12. Each month without a retention strategy is another month of agency premiums, replacement cycles, and margin compression. The frameworks in this book can be implemented in 90 days.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="https://amazon.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95 inline-flex items-center gap-2" style={{ boxShadow: "var(--shadow-button)" }}>
                Buy on Amazon <BookOpen size={18} />
              </a>
              <Link to="/contact" className="px-8 py-4 border border-border text-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:bg-muted inline-flex items-center gap-2">
                Request Executive Briefing <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture - Executive Focused */}
      <section className="seraphyn-section bg-card">
        <div className="seraphyn-container max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h3 className="text-xs mb-4 text-muted-foreground">COMPLIMENTARY FOR EXECUTIVES</h3>
            <h2 className="font-serif text-4xl text-foreground">Get Your Custom Turnover Cost Report</h2>
            <p className="mt-4 text-muted-foreground max-w-[50ch] mx-auto text-sm leading-relaxed">
              Receive a confidential, data-driven analysis of your system's turnover costs with projected savings by category. Built for CFOs and COOs making the case for retention investment.
            </p>

            {leadSubmitted ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10 seraphyn-card">
                <CheckCircle className="mx-auto mb-4 text-accent" size={40} strokeWidth={1.5} />
                <h2 className="font-serif text-2xl text-foreground">Your Report Is Being Prepared</h2>
                <p className="mt-3 text-sm text-muted-foreground">A senior analyst will deliver your confidential turnover cost report within 48 hours.</p>
              </motion.div>
            ) : (
              <div className="mt-10 seraphyn-card text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Work Email</label>
                    <input type="email" value={leadForm.email} onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="cfo@hospital.org" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Title / Role</label>
                    <input type="text" value={leadForm.title} onChange={e => setLeadForm({ ...leadForm, title: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="CFO, COO, VP Finance" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Health System</label>
                    <input type="text" value={leadForm.org} onChange={e => setLeadForm({ ...leadForm, org: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Metro Health System" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Licensed Beds</label>
                    <input type="text" value={leadForm.bedCount} onChange={e => setLeadForm({ ...leadForm, bedCount: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="500" />
                  </div>
                </div>
                <button onClick={() => setLeadSubmitted(true)} className="w-full mt-6 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
                  Get My Confidential Cost Report
                </button>
                <p className="text-[11px] text-muted-foreground/60 text-center mt-4">Your data is confidential. No sales calls without your permission.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
