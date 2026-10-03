import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Building2, Check, DollarSign, HeartHandshake, Stethoscope } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const primaryCta = "inline-flex items-center justify-center gap-2 px-7 py-4 bg-accent text-accent-foreground rounded-lg font-medium transition-all duration-200 hover:brightness-95 active:scale-95";
const secondaryCta = "inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-200 hover:brightness-110 active:scale-95";

const marketplaceRoles = [
  {
    icon: Stethoscope,
    audience: "For Nurses",
    points: ["Create a professional profile", "Choose your desired pay", "Set opportunity preferences and availability", "Be considered for relevant opportunities"],
  },
  {
    icon: Building2,
    audience: "For Hospitals",
    points: ["Define your staffing needs", "Establish preferred staffing budgets", "Review qualified nurse profiles", "See the complete bill-rate calculation"],
  },
  {
    icon: HeartHandshake,
    audience: "For Seraphyn Care",
    points: ["Connect nurses and healthcare organizations", "Provide marketplace technology", "Facilitate staffing administration", "Maintain transparent pricing"],
  },
];

const Staffing = () => (
  <Layout>
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container py-12 text-center md:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] as const }}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-accent">California staffing marketplace · first launch market</p>
          <h1 className="mx-auto max-w-[18ch] text-4xl md:text-6xl">California First. Nurse-Powered. Transparent Staffing.</h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            Seraphyn Care is launching its staffing marketplace in California, connecting qualified nurses with healthcare organizations while bringing greater transparency to staffing rates.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/signup" className={primaryCta} style={{ boxShadow: "var(--shadow-button)" }}>
              California Nurses: Join the Marketplace <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className={secondaryCta}>
              California Healthcare Organizations: Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="seraphyn-section bg-card">
      <div className="seraphyn-container">
        <SectionHeading
          tag="TRANSPARENT PRICING"
          title="See Exactly How the Staffing Rate Works"
          description="Nurses express the compensation they desire. Hospitals decide which nurses and complete rates fit their staffing needs and budgets."
        />
        <motion.div {...fadeUp} className="mx-auto max-w-5xl rounded-lg border border-border bg-background p-6 md:p-10">
          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Nurse compensation</p>
              <p className="mt-3 font-mono-tabular text-4xl font-semibold text-foreground">$65<span className="text-lg">/hr</span></p>
              <p className="mt-2 text-sm text-muted-foreground">Nurse's desired pay</p>
            </div>
            <span className="self-center text-center text-3xl text-accent">+</span>
            <div className="rounded-lg border border-accent/40 bg-card p-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Seraphyn Care agency fee</p>
              <p className="mt-3 font-mono-tabular text-4xl font-semibold text-accent">$17<span className="text-lg">/hr</span></p>
              <p className="mt-2 text-sm text-muted-foreground">Clearly disclosed</p>
            </div>
            <span className="self-center text-center text-3xl text-accent">=</span>
            <div className="rounded-lg bg-primary p-6 text-center text-primary-foreground">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-primary-foreground/70">Hospital bill rate</p>
              <p className="mt-3 font-mono-tabular text-4xl font-semibold">$82<span className="text-lg">/hr</span></p>
              <p className="mt-2 text-sm text-primary-foreground/70">Complete rate example</p>
            </div>
          </div>
          <div className="mt-8 flex gap-4 border-t border-border pt-7">
            <DollarSign className="mt-0.5 shrink-0 text-accent" size={22} strokeWidth={1.5} />
            <p className="text-sm leading-7 text-muted-foreground">
              The $17/hour Seraphyn Care agency fee supports the operational infrastructure required to provide staffing services, including platform technology and maintenance, Human Resources functions, payroll administration, employer taxes and required filings, unemployment insurance, workers' compensation, and related staffing administration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <SectionHeading tag="THE MARKETPLACE MODEL" title="A Different Approach to Staffing" description="Choice on both sides, supported by a transparent California nurse staffing marketplace." />
        <div className="grid gap-6 lg:grid-cols-3">
          {marketplaceRoles.map((role, index) => (
            <motion.div key={role.audience} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }} className="seraphyn-card">
              <role.icon className="mb-5 text-accent" size={25} strokeWidth={1.5} />
              <h3 className="mb-5 text-sm">{role.audience}</h3>
              <ul className="space-y-3">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 shrink-0 text-accent" size={16} /> {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.p {...fadeUp} className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-muted-foreground">
          Nurses choose the pay they desire. Hospitals choose the opportunities and rates that fit their staffing needs and budgets. A higher desired rate may result in fewer matching opportunities, while urgent needs may lead hospitals to consider nurses outside their preferred range.
        </motion.p>
      </div>
    </section>

    <section className="seraphyn-section bg-card">
      <div className="seraphyn-container grid gap-8 lg:grid-cols-2">
        <motion.div {...fadeUp} className="rounded-lg border border-border p-8 md:p-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-accent">For California nurses</p>
          <h2 className="text-3xl md:text-4xl">Your Pay. Your Choice.</h2>
          <p className="mt-5 leading-7 text-muted-foreground">Set your desired pay, create your professional profile, and position yourself for staffing opportunities that match your qualifications, preferences, availability, and rate.</p>
          <Link to="/signup" className={`${primaryCta} mt-8`}>Join the California Nurse Marketplace <ArrowRight size={16} /></Link>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="rounded-lg bg-primary p-8 text-primary-foreground md:p-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-primary-foreground/70">For California healthcare organizations</p>
          <h2 className="text-3xl text-primary-foreground md:text-4xl">Transparent Staffing Starts Here.</h2>
          <p className="mt-5 leading-7 text-primary-foreground/70">Tell us what you need, establish your staffing parameters, and review qualified nurses with transparent rate information.</p>
          <Link to="/contact" className={`${primaryCta} mt-8`}>Explore Staffing Solutions <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Staffing;
