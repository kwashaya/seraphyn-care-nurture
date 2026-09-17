import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Activity,
  Users,
  ClipboardList,
  Clock,
  Building2,
  DollarSign,
  HeartPulse,
  Gauge,
  LineChart,
  Search,
  Calculator,
  Compass,
} from "lucide-react";
import heroImage from "@/assets/assessment-hero.jpg";
import financialImage from "@/assets/assessment-financial.jpg";
import strategyImage from "@/assets/assessment-strategy.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
    {children}
  </p>
);

const Flow = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
    {steps.map((s, i) => (
      <div key={s} className="flex items-center gap-2 md:flex-1">
        <div className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-foreground">
          {s}
        </div>
        {i < steps.length - 1 && (
          <>
            <ArrowRight
              size={16}
              className="hidden shrink-0 text-accent md:block"
            />
            <ArrowDown size={16} className="shrink-0 text-accent md:hidden" />
          </>
        )}
      </div>
    ))}
  </div>
);

/* ---------------- Intro (shown before the assessment begins) ---------------- */

const measures = [
  { icon: Users, title: "Retention", desc: "How consistently your nursing workforce stays in place over a 12-month period." },
  { icon: Activity, title: "Turnover", desc: "The share of nurses departing and the pressure that creates across units." },
  { icon: ClipboardList, title: "Vacancy", desc: "Open positions relative to budgeted roles, and the coverage gap they leave." },
  { icon: Building2, title: "Agency Utilization", desc: "How far your staffing model depends on temporary and contract labor." },
  { icon: Clock, title: "Overtime", desc: "Overtime hours as a proportion of total hours worked by your nursing team." },
  { icon: Gauge, title: "Time-to-Fill", desc: "The average number of days required to fill an open nursing position." },
  { icon: HeartPulse, title: "Workforce Experience", desc: "A structured read on burnout risk and day-to-day strain on your teams." },
  { icon: DollarSign, title: "Financial Impact", desc: "The estimated cost associated with turnover and agency reliance." },
];

const framework = [
  { n: "01", icon: Search, title: "Assess", desc: "Understand your current workforce environment." },
  { n: "02", icon: LineChart, title: "Diagnose", desc: "Identify areas of instability and potential drivers." },
  { n: "03", icon: Calculator, title: "Quantify", desc: "Understand the potential operational and financial impact." },
  { n: "04", icon: Compass, title: "Strategize", desc: "Identify opportunities for targeted action." },
];

const rippleSteps = [
  "Nurse Turnover",
  "Vacancies",
  "Overtime & Agency Dependence",
  "Workforce Strain",
  "Financial Impact",
  "Patient Care & Organizational Performance",
];

const sampleMetrics = [
  { label: "Nurse Retention", value: "88%", note: "Illustrative" },
  { label: "Nurse Turnover", value: "18%", note: "Illustrative" },
  { label: "Vacancy Rate", value: "11%", note: "Illustrative" },
  { label: "Overtime Share", value: "9%", note: "Illustrative" },
  { label: "Agency Utilization", value: "14%", note: "Illustrative" },
  { label: "Time-to-Fill", value: "62 days", note: "Illustrative" },
  { label: "Burnout Risk", value: "High", note: "Illustrative" },
  { label: "Financial Impact", value: "Quantified", note: "From your inputs" },
];

export const ExecIntro = () => (
  <>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <img
        src={heroImage}
        alt="Hospital leadership team reviewing workforce analytics in an executive boardroom"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      <div className="seraphyn-container relative py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            For Healthcare Executives
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] text-primary-foreground md:text-6xl">
            Staffing Stability Assessment™
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Something important is happening inside your workforce. This
            executive diagnostic brings retention, staffing, and labor cost
            indicators together so leaders can see where instability may be
            forming — in minutes.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#assessment"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 font-medium tracking-wide text-accent-foreground transition-all duration-200 hover:brightness-95 active:scale-95"
            >
              Begin the Assessment <ArrowRight size={16} className="ml-2" />
            </a>
            <Link
              to="/consulting"
              className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 px-8 py-4 font-medium tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
            >
              Talk With Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Why this matters */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Why This Matters</Eyebrow>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Staffing Instability Has a Ripple Effect.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            When nurse turnover, vacancies, overtime, agency utilization, and
            burnout begin to rise, the impact extends far beyond staffing. It
            can affect financial performance, workforce stability, patient
            care, and organizational culture.
          </p>
        </motion.div>

        <motion.ol {...fadeUp} className="mt-12 grid gap-3 md:grid-cols-2">
          {rippleSteps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4"
            >
              <span className="font-mono-tabular text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-foreground">
                {step}
              </span>
              <span className="ml-auto h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
            </li>
          ))}
        </motion.ol>
      </div>
    </section>

    {/* See what's really happening */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Workforce Intelligence</Eyebrow>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            See What's Really Happening Inside Your Workforce.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            The Staffing Stability Assessment™ brings key workforce and
            operational indicators together to help healthcare leaders identify
            areas of instability and understand where deeper attention may be
            needed.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="mt-12 overflow-hidden rounded-3xl border border-border bg-primary"
        >
          <div className="flex items-center gap-3 border-b border-primary-foreground/10 px-6 py-4">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-sm text-primary-foreground/80">
              Workforce Indicators — Illustrative View
            </span>
            <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-primary-foreground/50">
              Sample data
            </span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-primary-foreground/10 lg:grid-cols-4">
            {sampleMetrics.map((m) => (
              <div key={m.label} className="bg-primary px-5 py-6">
                <p className="text-[11px] uppercase tracking-[0.1em] text-primary-foreground/60">
                  {m.label}
                </p>
                <p className="mt-2 font-serif text-2xl text-primary-foreground">
                  {m.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-accent">
                  {m.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        <p className="mt-4 text-xs text-muted-foreground">
          This view illustrates the types of indicators the assessment examines.
          It does not represent real hospital results.
        </p>
      </div>
    </section>

    {/* What we look at */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>What We Measure</Eyebrow>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Eight Indicators of Staffing Stability
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {measures.map((m, i) => (
            <motion.div
              key={m.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="seraphyn-card"
            >
              <m.icon size={20} strokeWidth={1.5} className="mb-4 text-accent" />
              <h3 className="mb-2 text-sm font-medium text-foreground">
                {m.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* From data to action */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Methodology</Eyebrow>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            From Data to Action
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {framework.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.07 }}
              className="seraphyn-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 font-mono-tabular text-sm text-accent">
                  {s.n}
                </span>
                <s.icon size={18} strokeWidth={1.5} className="text-accent" />
              </div>
              <h3 className="mt-5 text-sm font-medium uppercase tracking-[0.1em] text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Financial impact */}
    <section className="seraphyn-section">
      <div className="seraphyn-container grid items-center gap-12 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <Eyebrow>Financial Impact &amp; Savings Potential</Eyebrow>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Workforce Stability Is a Financial Position.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            The assessment quantifies the financial impact using the figures you
            provide — no assumptions, no invented benchmarks.
          </p>
          <div className="mt-9 space-y-6">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-destructive">
                The Cost Pathway
              </p>
              <Flow
                steps={[
                  "Instability",
                  "Turnover",
                  "Vacancies",
                  "Overtime / Agency",
                  "Financial Impact",
                ]}
              />
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                The Value Pathway
              </p>
              <Flow
                steps={[
                  "Retention Strategy",
                  "Staffing Stability",
                  "Lower Avoidable Costs",
                  "Stronger Workforce",
                  "Organizational Value",
                ]}
              />
            </div>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="seraphyn-card overflow-hidden p-2">
          <img
            src={financialImage}
            alt="Healthcare executive reviewing workforce labor cost analytics"
            className="h-auto w-full rounded-lg object-cover"
            loading="lazy"
            width={1536}
            height={1024}
          />
        </motion.div>
      </div>
    </section>
  </>
);

/* ---------------- Outro (shown with the results) ---------------- */

export const ExecOutro = () => (
  <div className="mt-16 space-y-16 print:hidden">
    <motion.div {...fadeUp} className="seraphyn-card">
      <Eyebrow>Your Next Step</Eyebrow>
      <h2 className="font-serif text-3xl normal-case tracking-normal text-foreground">
        Your Score Is the Starting Point.
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        Understanding where your organization stands is the first step. The next
        is determining what is driving the results and what actions can create
        meaningful improvement.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="#book-call"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 font-medium tracking-wide text-accent-foreground transition-all duration-200 hover:brightness-95 active:scale-95"
        >
          Explore Your Results With Seraphyn Care
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-lg border border-border px-7 py-3.5 font-medium tracking-wide text-foreground transition-all duration-200 hover:bg-card"
        >
          Talk With Our Team
        </Link>
      </div>
    </motion.div>

    <motion.div {...fadeUp}>
      <Eyebrow>Seraphyn Care Consulting</Eyebrow>
      <h2 className="font-serif text-3xl normal-case tracking-normal text-foreground">
        From Assessment to Action.
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        The Staffing Stability Assessment™ can help identify where your
        organization may need deeper attention. Seraphyn Care can then work with
        healthcare leaders to translate those insights into practical workforce
        strategies.
      </p>
      <div className="mt-8">
        <Flow
          steps={[
            "Assessment",
            "Insights",
            "Strategy",
            "Implementation",
            "Ongoing Improvement",
          ]}
        />
      </div>
      <div className="seraphyn-card mt-10 overflow-hidden p-2">
        <img
          src={strategyImage}
          alt="Healthcare executives and nurse leaders reviewing workforce strategy"
          className="h-auto w-full rounded-lg object-cover"
          loading="lazy"
          width={1536}
          height={1024}
        />
      </div>
    </motion.div>
  </div>
);
