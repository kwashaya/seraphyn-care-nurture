import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Activity,
  ArrowRight,
  ArrowLeft,
  Download,
  Sparkles,
  Target,
  Shield,
  Building2,
} from "lucide-react";

/* ---------------- Types & helpers ---------------- */

type FormState = {
  // Org info
  orgName: string;
  contactName: string;
  email: string;
  role: string;

  // Section 1
  startingNurses: string;
  endingNurses: string;
  newHires: string;
  nursesLeft: string;
  totalNurses: string;
  costPerNurse: string; // 40000–80000

  // Section 2
  openPositions: string;
  totalPositions: string;
  overtimeHours: string;
  totalHours: string;
  monthlyAgencySpend: string;

  // Section 3
  retentionImprovementPct: string; // 5/10/15
  timeToFill: string; // days
  burnoutRisk: "low" | "moderate" | "high" | "";

  // Pattern recognition
  patterns: string[];
};

const initialForm: FormState = {
  orgName: "",
  contactName: "",
  email: "",
  role: "",
  startingNurses: "",
  endingNurses: "",
  newHires: "",
  nursesLeft: "",
  totalNurses: "",
  costPerNurse: "60000",
  openPositions: "",
  totalPositions: "",
  overtimeHours: "",
  totalHours: "",
  monthlyAgencySpend: "",
  retentionImprovementPct: "10",
  timeToFill: "",
  burnoutRisk: "",
  patterns: [],
};

const num = (v: string) => {
  const n = parseFloat((v || "").toString().replace(/[^0-9.\-]/g, ""));
  return isNaN(n) ? 0 : n;
};

const fmt$ = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

const fmtPct = (n: number) =>
  (isFinite(n) ? n : 0).toFixed(1) + "%";

/* ---------------- Calculations ---------------- */

function computeMetrics(f: FormState) {
  const startingNurses = num(f.startingNurses);
  const endingNurses = num(f.endingNurses);
  const newHires = num(f.newHires);
  const nursesLeft = num(f.nursesLeft);
  const totalNurses = num(f.totalNurses);
  const costPerNurse = num(f.costPerNurse) || 60000;

  const openPositions = num(f.openPositions);
  const totalPositions = num(f.totalPositions);
  const overtimeHours = num(f.overtimeHours);
  const totalHours = num(f.totalHours);
  const monthlyAgency = num(f.monthlyAgencySpend);

  const improvementPct = num(f.retentionImprovementPct) || 10;
  const timeToFill = num(f.timeToFill);

  const retentionRate =
    startingNurses > 0
      ? ((endingNurses - newHires) / startingNurses) * 100
      : 0;

  const turnoverRate =
    totalNurses > 0 ? (nursesLeft / totalNurses) * 100 : 0;

  const turnoverCost = nursesLeft * costPerNurse;
  const trueTurnoverCost = turnoverCost * 1.75; // 1.5–2x adjustment

  const vacancyRate =
    totalPositions > 0 ? (openPositions / totalPositions) * 100 : 0;

  const overtimePct =
    totalHours > 0 ? (overtimeHours / totalHours) * 100 : 0;

  const annualAgency = monthlyAgency * 12;

  // Projected savings: improvement % of nurses retained * cost per turnover
  const nursesSaved = (improvementPct / 100) * nursesLeft;
  const projectedSavings =
    nursesSaved * costPerNurse + annualAgency * (improvementPct / 100) * 0.5;

  const totalAnnualLoss = trueTurnoverCost + annualAgency;
  const threeYearLoss = totalAnnualLoss * 3 * 1.08; // mild compounding

  /* ---------- Stability Score (0–100) ---------- */
  // Each component scored individually, weighted, then summed.
  const score = (() => {
    let s = 0;

    // Retention 30 pts (target 90%+)
    s += Math.max(0, Math.min(30, ((retentionRate - 70) / 25) * 30));

    // Turnover 20 pts (lower better; <10% = full)
    s += Math.max(0, Math.min(20, ((30 - turnoverRate) / 20) * 20));

    // Vacancy 15 pts (<5% full, >20% zero)
    s += Math.max(0, Math.min(15, ((20 - vacancyRate) / 15) * 15));

    // Overtime 15 pts (<5% full, >25% zero)
    s += Math.max(0, Math.min(15, ((25 - overtimePct) / 20) * 15));

    // Agency 10 pts (lower better, scaled by total nurses)
    const agencyPerNurse =
      totalNurses > 0 ? annualAgency / totalNurses : 0;
    s += Math.max(0, Math.min(10, ((20000 - agencyPerNurse) / 20000) * 10));

    // Time to fill 5 pts (<30 full, >120 zero)
    s += Math.max(0, Math.min(5, ((120 - timeToFill) / 90) * 5));

    // Burnout 5 pts
    s +=
      f.burnoutRisk === "low"
        ? 5
        : f.burnoutRisk === "moderate"
          ? 2.5
          : f.burnoutRisk === "high"
            ? 0
            : 2.5;

    return Math.round(Math.max(0, Math.min(100, s)));
  })();

  const riskLevel: "Stable" | "At Risk" | "Critical" =
    score >= 75 ? "Stable" : score >= 50 ? "At Risk" : "Critical";

  return {
    retentionRate,
    turnoverRate,
    turnoverCost,
    trueTurnoverCost,
    vacancyRate,
    overtimePct,
    annualAgency,
    monthlyAgency,
    projectedSavings,
    timeToFill,
    totalAnnualLoss,
    threeYearLoss,
    score,
    riskLevel,
    nursesLeft,
    totalNurses,
    costPerNurse,
  };
}

type Metrics = ReturnType<typeof computeMetrics>;

/* ---------------- Step config ---------------- */

const stepLabels = [
  "About You",
  "Retention",
  "Drivers",
  "Financial",
  "Stability",
  "Report",
];

/* ---------------- Reusable UI ---------------- */

const Field = ({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) => (
  <div>
    <label className="text-xs uppercase tracking-[0.1em] text-muted-foreground block mb-2 font-medium">
      {label}
    </label>
    {children}
    {hint && (
      <p className="mt-1.5 text-xs text-muted-foreground/80">{hint}</p>
    )}
  </div>
);

const NumInput = ({
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}) => (
  <div className="relative">
    {prefix && (
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono-tabular">
        {prefix}
      </span>
    )}
    <input
      inputMode="decimal"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg bg-muted border border-transparent text-foreground text-sm font-mono-tabular focus:outline-none focus:border-accent/60 focus:bg-card transition ${prefix ? "pl-8" : ""} ${suffix ? "pr-12" : ""}`}
    />
    {suffix && (
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
        {suffix}
      </span>
    )}
  </div>
);

const TextInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent text-foreground text-sm focus:outline-none focus:border-accent/60 focus:bg-card transition"
  />
);

const InsightBox = ({
  tone = "alert",
  title,
  children,
}: {
  tone?: "alert" | "consult";
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className={`rounded-xl p-4 border-l-2 ${
      tone === "alert"
        ? "bg-destructive/5 border-destructive"
        : "bg-accent/10 border-accent"
    }`}
  >
    <div className="flex items-center gap-2 mb-1.5">
      {tone === "alert" ? (
        <AlertTriangle size={14} className="text-destructive" />
      ) : (
        <Sparkles size={14} className="text-accent" />
      )}
      <span className="text-[11px] uppercase tracking-[0.15em] font-medium text-foreground">
        {title}
      </span>
    </div>
    <p className="text-sm text-foreground/80 leading-relaxed">{children}</p>
  </div>
);

const MetricRow = ({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "neutral" | "good" | "warn" | "bad";
}) => {
  const color =
    tone === "good"
      ? "text-emerald-600"
      : tone === "warn"
        ? "text-accent"
        : tone === "bad"
          ? "text-destructive"
          : "text-foreground";
  return (
    <div className="flex items-baseline justify-between py-3 border-b border-border/60 last:border-0">
      <div>
        <div className="text-sm text-foreground">{label}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </div>
      <div className={`font-mono-tabular text-lg font-medium ${color}`}>
        {value}
      </div>
    </div>
  );
};

/* ---------------- Main component ---------------- */

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const togglePattern = (p: string) =>
    setForm((f) => ({
      ...f,
      patterns: f.patterns.includes(p)
        ? f.patterns.filter((x) => x !== p)
        : [...f.patterns, p],
    }));

  const metrics = useMemo(() => computeMetrics(form), [form]);

  const next = () => setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const canProceed = (() => {
    switch (step) {
      case 0:
        return form.orgName.trim() && form.contactName.trim() && /\S+@\S+\.\S+/.test(form.email);
      case 1:
        return form.startingNurses && form.endingNurses && form.newHires && form.nursesLeft && form.totalNurses;
      case 2:
        return form.openPositions && form.totalPositions && form.overtimeHours && form.totalHours;
      case 3:
        return form.timeToFill && form.burnoutRisk;
      default:
        return true;
    }
  })();

  return (
    <Layout>
      <section className="seraphyn-section seraphyn-gradient-bg min-h-screen">
        <div className="seraphyn-container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 mb-4">
              <Sparkles size={12} className="text-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-foreground font-medium">
                Nurse Workforce Diagnostic
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-[0.95]">
              The Staffing Stability Assessment™
            </h1>
            <p className="mt-5 text-muted-foreground max-w-[55ch] mx-auto leading-relaxed">
              Answer a few simple questions about your nursing team. Estimates are perfectly fine — we'll calculate the rest and show you what it's costing you.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                Step {Math.min(step + 1, stepLabels.length)} of {stepLabels.length}
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-foreground font-medium">
                {stepLabels[step]}
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={false}
                animate={{ width: `${((step + 1) / stepLabels.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* ============ STEP 0: ABOUT YOU ============ */}
              {step === 0 && (
                <div className="seraphyn-card space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl text-foreground">
                      First, tell us a little about you
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      We'll use this to personalize your report. Your information stays private.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Where do you work?" hint="Your hospital, clinic, or facility name">
                      <TextInput value={form.orgName} onChange={(v) => update("orgName", v)} placeholder="e.g. Metro Health System" />
                    </Field>
                    <Field label="What's your job title?" hint="So we can tailor the report to you">
                      <TextInput value={form.role} onChange={(v) => update("role", v)} placeholder="e.g. CNO, CFO, HR Director" />
                    </Field>
                    <Field label="Your name">
                      <TextInput value={form.contactName} onChange={(v) => update("contactName", v)} placeholder="Jane Smith" />
                    </Field>
                    <Field label="Your work email" hint="We'll send your report here">
                      <TextInput type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="jane@hospital.org" />
                    </Field>
                  </div>
                </div>
              )}

              {/* ============ STEP 1: RETENTION REALITY ============ */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="seraphyn-card space-y-6">
                    <div className="flex items-start gap-3">
                      <Users className="text-accent mt-1" size={22} />
                      <div>
                        <h2 className="font-serif text-3xl text-foreground">Your nursing team — by the numbers</h2>
                        <p className="text-sm text-muted-foreground mt-2 max-w-[60ch]">
                          Think back over the past 12 months. Round numbers are fine — we just need a clear picture of how many nurses came, went, and stayed.
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <Field label="How many nurses did you have a year ago?" hint="Your headcount 12 months back">
                        <NumInput value={form.startingNurses} onChange={(v) => update("startingNurses", v)} placeholder="e.g. 220" />
                      </Field>
                      <Field label="How many nurses do you have today?" hint="Current total nursing staff">
                        <NumInput value={form.endingNurses} onChange={(v) => update("endingNurses", v)} placeholder="e.g. 210" />
                      </Field>
                      <Field label="How many new nurses did you hire this year?" hint="Total hires over the last 12 months">
                        <NumInput value={form.newHires} onChange={(v) => update("newHires", v)} placeholder="e.g. 55" />
                      </Field>
                      <Field label="How many nurses left this year?" hint="Resignations, terminations, retirements">
                        <NumInput value={form.nursesLeft} onChange={(v) => update("nursesLeft", v)} placeholder="e.g. 65" />
                      </Field>
                      <Field label="What's your average nurse headcount?" hint="A rough average across the year is fine">
                        <NumInput value={form.totalNurses} onChange={(v) => update("totalNurses", v)} placeholder="e.g. 215" />
                      </Field>
                      <Field label="What does it cost to replace one nurse?" hint="Industry estimate: $40K–$80K per nurse. Pick the closest.">
                        <select
                          value={form.costPerNurse}
                          onChange={(e) => update("costPerNurse", e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent text-foreground text-sm focus:outline-none focus:border-accent/60"
                        >
                          <option value="40000">$40,000 — Conservative</option>
                          <option value="55000">$55,000 — Moderate</option>
                          <option value="60000">$60,000 — Average (most common)</option>
                          <option value="70000">$70,000 — Above average</option>
                          <option value="80000">$80,000 — High (specialty/ICU)</option>
                        </select>
                      </Field>
                    </div>

                    {/* Live calculations */}
                    <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                      <div className="bg-muted/60 rounded-xl p-4">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Retention Rate</div>
                        <div className="font-mono-tabular text-2xl text-foreground mt-1">{fmtPct(metrics.retentionRate)}</div>
                      </div>
                      <div className="bg-muted/60 rounded-xl p-4">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Turnover Rate</div>
                        <div className="font-mono-tabular text-2xl text-foreground mt-1">{fmtPct(metrics.turnoverRate)}</div>
                      </div>
                      <div className="bg-muted/60 rounded-xl p-4">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Annual Turnover Cost</div>
                        <div className="font-mono-tabular text-2xl text-destructive mt-1">{fmt$(metrics.turnoverCost)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <InsightBox tone="alert" title="What this means">
                      {metrics.retentionRate < 85
                        ? "When fewer than 85 out of 100 nurses stay, you're stuck in a constant hiring cycle — and every cycle costs more than the last."
                        : "You're holding onto your nurses well. The next 12 months will determine whether that lasts."}
                    </InsightBox>
                    <InsightBox tone="consult" title="Worth knowing">
                      The real cost of losing a nurse is usually 1.5–2× higher than the obvious number — once you add lost productivity, errors, and overtime to cover the gap.
                    </InsightBox>
                  </div>
                </div>
              )}

              {/* ============ STEP 2: DRIVERS ============ */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="seraphyn-card space-y-6">
                    <div className="flex items-start gap-3">
                      <Activity className="text-accent mt-1" size={22} />
                      <div>
                        <h2 className="font-serif text-3xl text-foreground">What's stretching your team thin?</h2>
                        <p className="text-sm text-muted-foreground mt-2 max-w-[60ch]">
                          A few questions about open roles, overtime, and agency staff. These are the silent costs that quietly drain your budget every month.
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="How many nursing positions are unfilled right now?" hint="Open roles you're actively trying to fill">
                        <NumInput value={form.openPositions} onChange={(v) => update("openPositions", v)} placeholder="e.g. 32" />
                      </Field>
                      <Field label="How many nursing positions do you have in total?" hint="All budgeted RN positions, filled or not">
                        <NumInput value={form.totalPositions} onChange={(v) => update("totalPositions", v)} placeholder="e.g. 240" />
                      </Field>
                      <Field label="How many overtime hours did your nurses work this year?" hint="A yearly estimate is fine. Tip: monthly OT hours × 12">
                        <NumInput value={form.overtimeHours} onChange={(v) => update("overtimeHours", v)} placeholder="e.g. 48,000" />
                      </Field>
                      <Field label="How many total hours did your nurses work this year?" hint="Roughly 2,000 hrs per full-time nurse × your headcount">
                        <NumInput value={form.totalHours} onChange={(v) => update("totalHours", v)} placeholder="e.g. 420,000" />
                      </Field>
                      <Field label="How much do you spend on agency / travel nurses each month?" hint="Your average monthly invoice. Enter 0 if none.">
                        <NumInput value={form.monthlyAgencySpend} onChange={(v) => update("monthlyAgencySpend", v)} placeholder="e.g. 180,000" prefix="$" />
                      </Field>
                      <div className="bg-muted/60 rounded-xl p-4">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Annual Agency Spend</div>
                        <div className="font-mono-tabular text-2xl text-destructive mt-1">{fmt$(metrics.annualAgency)}</div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div className="bg-muted/60 rounded-xl p-4">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Vacancy Rate</div>
                        <div className="font-mono-tabular text-2xl text-foreground mt-1">{fmtPct(metrics.vacancyRate)}</div>
                      </div>
                      <div className="bg-muted/60 rounded-xl p-4">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Overtime Burden</div>
                        <div className="font-mono-tabular text-2xl text-foreground mt-1">{fmtPct(metrics.overtimePct)}</div>
                      </div>
                    </div>

                    {/* Pattern recognition */}
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-xs mb-2 text-muted-foreground">Which of these sound familiar?</h3>
                      <p className="text-xs text-muted-foreground/80 mb-3">Tap any that match what you're seeing in your organization. Skip if none apply.</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          "Nurses leaving + overtime keeps climbing",
                          "Lots of open roles + heavy agency use",
                          "Hiring takes forever + the team feels burned out",
                          "Costs going up but nothing is improving",
                        ].map((p) => {
                          const active = form.patterns.includes(p);
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => togglePattern(p)}
                              className={`text-left px-4 py-3 rounded-lg border text-sm transition ${
                                active
                                  ? "border-accent bg-accent/10 text-foreground"
                                  : "border-border bg-muted/40 text-muted-foreground hover:border-foreground/20"
                              }`}
                            >
                              <span className="inline-flex items-center gap-2">
                                <span
                                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                                    active ? "bg-accent border-accent" : "border-muted-foreground/40"
                                  }`}
                                >
                                  {active && <CheckCircle size={12} className="text-accent-foreground" />}
                                </span>
                                {p}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <InsightBox tone="alert" title="The cycle to watch for">
                    These problems feed each other. Empty roles → more overtime → tired nurses → more nurses leave → more empty roles. Once it starts, it's hard to break without a plan.
                  </InsightBox>
                </div>
              )}

              {/* ============ STEP 3: FINANCIAL ============ */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="seraphyn-card space-y-6">
                    <div className="flex items-start gap-3">
                      <DollarSign className="text-accent mt-1" size={22} />
                      <div>
                        <h2 className="font-serif text-3xl text-foreground">What could you save — and what's at risk?</h2>
                        <p className="text-sm text-muted-foreground mt-2 max-w-[60ch]">
                          A few last questions about your hiring speed, your goals, and how stretched your team feels. Then we'll show you the full picture.
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <Field label="If we kept more nurses, how much better would you like to do?" hint="A realistic 12-month goal — small improvements add up fast">
                        <select
                          value={form.retentionImprovementPct}
                          onChange={(e) => update("retentionImprovementPct", e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent text-foreground text-sm focus:outline-none focus:border-accent/60"
                        >
                          <option value="5">Keep 5% more nurses</option>
                          <option value="10">Keep 10% more nurses</option>
                          <option value="15">Keep 15% more nurses</option>
                          <option value="20">Keep 20% more nurses</option>
                        </select>
                      </Field>
                      <Field label="On average, how long does it take to fill an open nurse role?" hint="From posting the job to the nurse starting. Estimate is fine.">
                        <NumInput value={form.timeToFill} onChange={(v) => update("timeToFill", v)} placeholder="e.g. 68" suffix="days" />
                      </Field>
                      <Field label="How burned out does your nursing team feel right now?" hint="Your honest gut read — you know your team best">
                        <div className="grid grid-cols-3 gap-2">
                          {(["low", "moderate", "high"] as const).map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => update("burnoutRisk", r)}
                              className={`py-3 rounded-lg text-xs uppercase tracking-[0.1em] font-medium transition ${
                                form.burnoutRisk === r
                                  ? r === "high"
                                    ? "bg-destructive text-destructive-foreground"
                                    : r === "moderate"
                                      ? "bg-accent text-accent-foreground"
                                      : "bg-emerald-600 text-white"
                                  : "bg-muted text-muted-foreground hover:bg-muted/70"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>

                    {/* Live financial summary */}
                    <div className="bg-foreground text-background rounded-2xl p-6 mt-4">
                      <div className="text-[11px] uppercase tracking-[0.15em] text-background/60 mb-4">
                        Here's what your numbers tell us
                      </div>
                      <div className="grid sm:grid-cols-2 gap-x-8">
                        <MetricRow label="What turnover is costing you" value={fmt$(metrics.turnoverCost)} />
                        <MetricRow label="The real cost (with hidden losses)" value={fmt$(metrics.trueTurnoverCost)} />
                        <MetricRow label="What you spend on agency nurses each year" value={fmt$(metrics.annualAgency)} />
                        <MetricRow label="What you could save next year" value={fmt$(metrics.projectedSavings)} />
                      </div>
                      <div className="mt-5 pt-5 border-t border-background/10 grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.15em] text-background/60">You're losing about this much every year</div>
                          <div className="font-mono-tabular text-3xl mt-1">{fmt$(metrics.totalAnnualLoss)}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.15em] text-background/60">If nothing changes — 3-year loss</div>
                          <div className="font-mono-tabular text-3xl mt-1 text-accent">{fmt$(metrics.threeYearLoss)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <InsightBox tone="consult" title="The good news">
                    Even keeping just 5–10% more nurses creates a ripple effect — less overtime, fewer agency hours, more steady care. Most clients see the savings cover the work within a single quarter.
                  </InsightBox>
                </div>
              )}

              {/* ============ STEP 4: STABILITY SCORE ============ */}
              {step === 4 && (
                <ScoreReveal metrics={metrics} onContinue={next} />
              )}

              {/* ============ STEP 5: REPORT ============ */}
              {step === 5 && <Report form={form} metrics={metrics} />}
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={next}
                disabled={!canProceed}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide hover:brightness-95 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none transition"
                style={{ boxShadow: "var(--shadow-button)" }}
              >
                {step === 3 ? "See My Stability Score" : "Continue"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

/* ---------------- Score Reveal ---------------- */

const ScoreReveal = ({
  metrics,
  onContinue,
}: {
  metrics: Metrics;
  onContinue: () => void;
}) => {
  const { score, riskLevel } = metrics;
  const ringColor =
    riskLevel === "Stable"
      ? "text-emerald-600"
      : riskLevel === "At Risk"
        ? "text-accent"
        : "text-destructive";

  const dash = 2 * Math.PI * 90;
  const offset = dash - (score / 100) * dash;

  return (
    <div className="seraphyn-card text-center py-12">
      <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium mb-2">
        Staffing Stability Score™
      </div>
      <h2 className="font-serif text-4xl text-foreground mb-8">Your Organizational Risk Profile</h2>

      <div className="relative w-64 h-64 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            className={ringColor}
            strokeDasharray={dash}
            initial={{ strokeDashoffset: dash }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: [0.2, 0, 0, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="font-mono-tabular text-6xl text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {score}
          </motion.div>
          <div className="text-xs text-muted-foreground mt-1">/ 100</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-muted">
          <span
            className={`w-2 h-2 rounded-full ${
              riskLevel === "Stable" ? "bg-emerald-600" : riskLevel === "At Risk" ? "bg-accent" : "bg-destructive"
            }`}
          />
          <span className="text-sm font-medium text-foreground">{riskLevel}</span>
        </div>
        <p className="mt-6 text-sm text-muted-foreground max-w-[50ch] mx-auto leading-relaxed">
          This score reveals how efficiently your workforce converts labor into outcomes. Your full diagnostic report is ready.
        </p>

        <button
          onClick={onContinue}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide hover:brightness-95 active:scale-[0.98] transition"
          style={{ boxShadow: "var(--shadow-button)" }}
        >
          View Full Report <ArrowRight size={16} />
        </button>
      </motion.div>
    </div>
  );
};

/* ---------------- Personalized Report ---------------- */

const Report = ({ form, metrics }: { form: FormState; metrics: Metrics }) => {
  const findings: string[] = [];
  if (metrics.overtimePct > 10 && metrics.vacancyRate > 10)
    findings.push("High overtime + vacancy rates indicate a burnout-driven turnover cycle.");
  if (metrics.annualAgency > 1_000_000)
    findings.push("Significant agency usage suggests a reactive staffing strategy with high cost leakage.");
  if (metrics.timeToFill > 60)
    findings.push("Time-to-fill delays are increasing operational strain on existing nurses.");
  if (metrics.retentionRate < 80)
    findings.push("Retention below 80% signals a systemic onboarding or culture gap, not a recruiting one.");
  if (metrics.turnoverRate > 20)
    findings.push("Turnover above 20% is well beyond the national benchmark and is materially impacting margin.");
  if (form.burnoutRisk === "high")
    findings.push("Self-reported burnout is high — leading indicator of a 6–12 month resignation wave.");
  if (findings.length === 0)
    findings.push("Your indicators are within healthy bands. The opportunity now is to defend that position with a proactive workforce strategy.");

  const rootCauses: string[] = [];
  if (metrics.timeToFill > 60) rootCauses.push("Inefficient hiring processes");
  if (metrics.retentionRate < 85) rootCauses.push("Poor retention systems");
  if (metrics.vacancyRate > 12) rootCauses.push("Staffing model imbalance");
  if (metrics.overtimePct > 10) rootCauses.push("Over-reliance on overtime");
  if (metrics.annualAgency > 500_000) rootCauses.push("High agency dependency");

  const interpret = (rate: number) =>
    rate >= 90 ? "Strong" : rate >= 80 ? "Moderate" : "Weak";

  return (
    <div className="space-y-6">
      {/* Cover */}
      <div className="seraphyn-card">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
              Nurse Workforce Diagnostic Report
            </div>
            <h2 className="font-serif text-4xl text-foreground mt-2">
              Prepared for {form.orgName || "Your Organization"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date().toLocaleDateString("en-US", { dateStyle: "long" })} ·{" "}
              {form.contactName} {form.role && `· ${form.role}`}
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition"
          >
            <Download size={14} /> Print / Save
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="seraphyn-card">
        <h3 className="text-xs mb-4 text-muted-foreground">1. Executive Summary</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/60 rounded-xl p-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Stability Score</div>
            <div className="font-mono-tabular text-3xl text-foreground mt-1">{metrics.score}<span className="text-base text-muted-foreground">/100</span></div>
          </div>
          <div className="bg-muted/60 rounded-xl p-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Risk Level</div>
            <div className="text-2xl font-medium text-foreground mt-1">{metrics.riskLevel}</div>
          </div>
          <div className="bg-foreground text-background rounded-xl p-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-background/60 font-medium">Annual Financial Leakage</div>
            <div className="font-mono-tabular text-3xl mt-1">{fmt$(metrics.totalAnnualLoss)}</div>
          </div>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Based on the data you provided, your current staffing model is{" "}
          {metrics.riskLevel === "Stable"
            ? "performing well, with select areas to harden against future risk"
            : metrics.riskLevel === "At Risk"
              ? "producing measurable financial leakage and showing early signs of workforce instability"
              : "creating significant avoidable financial loss and operational risk that compounds each quarter it remains unaddressed"}.
        </p>
      </div>

      {/* Metrics Breakdown */}
      <div className="seraphyn-card">
        <h3 className="text-xs mb-4 text-muted-foreground">2. Key Metrics Breakdown</h3>
        <MetricRow
          label="Retention Rate"
          sub={`Interpretation: ${interpret(metrics.retentionRate)}`}
          value={fmtPct(metrics.retentionRate)}
          tone={metrics.retentionRate >= 85 ? "good" : metrics.retentionRate >= 75 ? "warn" : "bad"}
        />
        <MetricRow
          label="Turnover Rate"
          sub={`Financial Impact: ${fmt$(metrics.turnoverCost)}`}
          value={fmtPct(metrics.turnoverRate)}
          tone={metrics.turnoverRate <= 15 ? "good" : metrics.turnoverRate <= 25 ? "warn" : "bad"}
        />
        <MetricRow
          label="Vacancy Rate"
          sub="Operational impact across all units"
          value={fmtPct(metrics.vacancyRate)}
          tone={metrics.vacancyRate <= 8 ? "good" : metrics.vacancyRate <= 15 ? "warn" : "bad"}
        />
        <MetricRow
          label="Overtime %"
          sub={`Burnout Risk: ${metrics.overtimePct > 15 ? "Elevated" : metrics.overtimePct > 8 ? "Moderate" : "Contained"}`}
          value={fmtPct(metrics.overtimePct)}
          tone={metrics.overtimePct <= 8 ? "good" : metrics.overtimePct <= 15 ? "warn" : "bad"}
        />
        <MetricRow
          label="Agency Spend (annual)"
          sub={`Monthly: ${fmt$(metrics.monthlyAgency)}`}
          value={fmt$(metrics.annualAgency)}
          tone="bad"
        />
        <MetricRow
          label="Time to Fill"
          value={`${metrics.timeToFill} days`}
          tone={metrics.timeToFill <= 45 ? "good" : metrics.timeToFill <= 75 ? "warn" : "bad"}
        />
      </div>

      {/* Critical Findings */}
      <div className="seraphyn-card">
        <h3 className="text-xs mb-4 text-muted-foreground flex items-center gap-2">
          <AlertTriangle size={14} className="text-destructive" /> 3. Critical Findings
        </h3>
        <ul className="space-y-3">
          {findings.map((f, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
              <span className="text-destructive mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Financial Impact */}
      <div className="seraphyn-card bg-foreground text-background">
        <h3 className="text-xs mb-4 text-background/60">4. Financial Impact Analysis</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-background/60">Estimated Annual Loss</div>
            <div className="font-mono-tabular text-3xl mt-1">{fmt$(metrics.totalAnnualLoss)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-background/60">Projected 3-Year Loss</div>
            <div className="font-mono-tabular text-3xl mt-1 text-accent">{fmt$(metrics.threeYearLoss)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-background/60">Recoverable with Intervention</div>
            <div className="font-mono-tabular text-3xl mt-1 text-emerald-400">{fmt$(metrics.projectedSavings)}</div>
          </div>
        </div>
      </div>

      {/* Root Causes */}
      <div className="seraphyn-card">
        <h3 className="text-xs mb-4 text-muted-foreground">5. Root Cause Analysis</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Inefficient hiring processes",
            "Poor retention systems",
            "Staffing model imbalance",
            "Over-reliance on overtime",
            "High agency dependency",
          ].map((c) => {
            const active = rootCauses.includes(c);
            return (
              <div
                key={c}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm ${
                  active
                    ? "border-destructive/30 bg-destructive/5 text-foreground"
                    : "border-border bg-muted/30 text-muted-foreground"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    active ? "bg-destructive border-destructive" : "border-muted-foreground/40"
                  }`}
                >
                  {active && <CheckCircle size={12} className="text-destructive-foreground" />}
                </div>
                {c}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="seraphyn-card">
        <h3 className="text-xs mb-6 text-muted-foreground">6. Strategic Recommendations</h3>
        <div className="space-y-5">
          {[
            {
              icon: Shield,
              title: "Priority 1 — Stabilize Retention",
              points: ["Improve early-tenure nurse experience", "Address top burnout drivers by unit"],
            },
            {
              icon: TrendingDown,
              title: "Priority 2 — Reduce Cost Leakage",
              points: ["Optimize scheduling to cut overtime", "Reduce agency dependence with internal float"],
            },
            {
              icon: Target,
              title: "Priority 3 — Strengthen Hiring Pipeline",
              points: ["Reduce time-to-fill by 30–50%", "Build a consistent candidate flow"],
            },
          ].map((p, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <p.icon size={18} className="text-accent" />
              </div>
              <div>
                <div className="font-medium text-foreground">{p.title}</div>
                <ul className="mt-1.5 space-y-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-sm text-muted-foreground">• {pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps CTA */}
      <div className="seraphyn-card bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/20">
        <div className="flex items-center gap-3 mb-3">
          <Building2 size={20} className="text-accent" />
          <span className="text-[11px] uppercase tracking-[0.15em] text-foreground font-medium">
            Recommended Next Step
          </span>
        </div>
        <h3 className="font-serif text-3xl text-foreground">
          Free Nurse Retention Strategy Call
        </h3>
        <p className="mt-3 text-sm text-foreground/80 max-w-[55ch] leading-relaxed">
          Most organizations stop at data. That's the mistake — data without strategy doesn't create change. We'll analyze your results, identify hidden financial loss, and build a custom recovery plan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide hover:brightness-95 active:scale-[0.98] transition"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            Book Your Strategy Call <ArrowRight size={16} />
          </Link>
          <Link
            to="/consulting"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-foreground/20 rounded-lg font-medium tracking-wide hover:bg-foreground/5 transition"
          >
            Explore Consulting
          </Link>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center pt-4">
        Estimates based on industry benchmarks and the data you provided. Actual outcomes vary by organization.
      </p>
    </div>
  );
};

/* ---------------- Unused icon import guard ---------------- */
// Clock kept for potential future use
void Clock;

export default Assessment;
