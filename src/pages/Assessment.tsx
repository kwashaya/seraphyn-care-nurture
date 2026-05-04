import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  ShieldAlert,
  Target,
  Timer,
  Megaphone,
  DollarSign,
  HeartPulse,
  BarChart3,
  ClipboardList,
  Wrench,
  TrendingUp,
  TrendingDown,
  Sparkle,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------- Types ---------------- */

type InsightTone = "red" | "amber" | "green";
type BurnoutLevel = "Low" | "Moderate" | "High" | "Severe";

type FormState = {
  // Section 0 — About you
  orgName: string;
  position: string;
  fullName: string;
  email: string;
  // Section 1
  startNurses: string;
  endNurses: string;
  newHires: string;
  nursesLeft: string;
  totalNurses: string;
  costPerNurse: string;
  // Section 2
  openPos: string;
  totalPos: string;
  otHours: string;
  totalHours: string;
  agencyHours: string;
  agencyRate: string;
  agencyReliance: string; // "20" | "15" | "10" | "5"
  totalDays: string;
  rolesFilled: string;
  // Section 3
  reductionPct: string;
  costPerNurse2: string;
  burnout: BurnoutLevel | "";
};

const initialState: FormState = {
  orgName: "",
  position: "",
  fullName: "",
  email: "",
  startNurses: "",
  endNurses: "",
  newHires: "",
  nursesLeft: "",
  totalNurses: "",
  costPerNurse: "",
  openPos: "",
  totalPos: "",
  otHours: "",
  totalHours: "",
  agencyHours: "",
  agencyRate: "",
  agencyReliance: "",
  totalDays: "",
  rolesFilled: "",
  reductionPct: "10",
  costPerNurse2: "",
  burnout: "",
};

/* ---------------- Helpers ---------------- */

const num = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && v.trim() !== "" ? n : null;
};
const fmt$ = (v: number | null) =>
  v == null ? "—" : "$" + Math.round(v).toLocaleString();
const fmtPct = (v: number | null) => (v == null ? "—" : v.toFixed(1) + "%");

/* ---------------- Reusable UI ---------------- */

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <Label className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
      {label}
    </Label>
    {children}
  </div>
);

const ResultChip = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="mt-2 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
    <span className="text-xs font-medium uppercase tracking-wider text-accent">
      {label}
    </span>
    <span className="font-mono-tabular text-lg font-medium text-foreground">
      {value}
    </span>
  </div>
);

const InsightBox = ({
  message,
  tone = "red",
}: {
  message: string | null;
  tone?: InsightTone;
}) => {
  if (!message) return null;
  const tones: Record<InsightTone, string> = {
    red: "border-l-destructive bg-destructive/5 text-destructive",
    amber: "border-l-accent bg-accent/5 text-accent-foreground/80",
    green: "border-l-emerald-600 bg-emerald-50 text-emerald-900",
  };
  const iconTone: Record<InsightTone, string> = {
    red: "text-destructive",
    amber: "text-accent",
    green: "text-emerald-600",
  };
  const Icon =
    tone === "green" ? CheckCircle2 : tone === "amber" ? AlertTriangle : AlertOctagon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 flex items-start gap-3 rounded-r-xl border-l-[3px] px-4 py-3 text-sm leading-relaxed ${tones[tone]}`}
    >
      <Icon size={18} strokeWidth={1.75} className={`mt-0.5 shrink-0 ${iconTone[tone]}`} />
      <span>{message}</span>
    </motion.div>
  );
};

const QuestionCard = ({
  num: cardNum,
  title,
  description,
  children,
}: {
  num: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="seraphyn-card mb-5"
  >
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono-tabular text-sm font-medium text-accent">
        {cardNum}
      </div>
      <div>
        <h3 className="mb-1 text-base font-semibold normal-case tracking-normal text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
    {children}
  </motion.div>
);

/* ---------------- Page ---------------- */

const SECTIONS = 4;

const Assessment = () => {
  const [section, setSection] = useState(0);
  const [f, setF] = useState<FormState>(initialState);

  const set = (key: keyof FormState, value: string) =>
    setF((prev) => ({ ...prev, [key]: value }));

  /* ---- Live calculations ---- */
  const calc = useMemo(() => {
    const start = num(f.startNurses);
    const end = num(f.endNurses);
    const hires = num(f.newHires);
    const left = num(f.nursesLeft);
    const total = num(f.totalNurses);
    const cpn = num(f.costPerNurse);
    const open = num(f.openPos);
    const totalPos = num(f.totalPos);
    const ot = num(f.otHours);
    const totalHr = num(f.totalHours);
    const agH = num(f.agencyHours);
    const agR = num(f.agencyRate);
    const days = num(f.totalDays);
    const roles = num(f.rolesFilled);

    const retentionRate =
      start && start > 0 && end != null && hires != null
        ? ((end - hires) / start) * 100
        : null;
    const turnoverRate =
      total && total > 0 && left != null ? (left / total) * 100 : null;
    const turnoverCost =
      left != null && cpn != null && left > 0 && cpn > 0 ? left * cpn : null;
    const vacancyRate =
      totalPos && totalPos > 0 && open != null ? (open / totalPos) * 100 : null;
    const overtimePct =
      totalHr && totalHr > 0 && ot != null ? (ot / totalHr) * 100 : null;
    const agencyAnnual =
      agH != null && agR != null && agH > 0 && agR > 0
        ? agH * agR * 12
        : null;
    const ttf = roles && roles > 0 && days != null ? days / roles : null;

    // Section 3 derived
    const reductionPct = num(f.reductionPct) ?? 10;
    const cpn2 = num(f.costPerNurse2) ?? cpn ?? null;
    const currentTurnoverNurses = left;
    const savings =
      currentTurnoverNurses != null && cpn2 != null && cpn2 > 0
        ? (currentTurnoverNurses * reductionPct) / 100 * cpn2
        : null;

    const annualLoss = (turnoverCost ?? 0) + (agencyAnnual ?? 0);
    const threeYearLoss = annualLoss * 3;

    // Score
    const r1 =
      retentionRate == null
        ? 0
        : retentionRate >= 90
        ? 40
        : retentionRate >= 80
        ? 30
        : retentionRate >= 70
        ? 20
        : 10;
    const r2 =
      vacancyRate == null
        ? 0
        : vacancyRate <= 5
        ? 20
        : vacancyRate <= 10
        ? 15
        : vacancyRate <= 20
        ? 10
        : 5;
    const r3 =
      overtimePct == null
        ? 0
        : overtimePct <= 5
        ? 20
        : overtimePct <= 10
        ? 15
        : overtimePct <= 20
        ? 10
        : 5;
    const r4 = num(f.agencyReliance) ?? 0;
    const total100 = r1 + r2 + r3 + r4;

    return {
      retentionRate,
      turnoverRate,
      turnoverCost,
      vacancyRate,
      overtimePct,
      agencyAnnual,
      ttf,
      savings,
      annualLoss,
      threeYearLoss,
      r1,
      r2,
      r3,
      r4,
      total: total100,
    };
  }, [f]);

  /* ---- Auto-fill nurses-left & cost prefill ---- */
  useEffect(() => {
    const start = num(f.startNurses);
    const end = num(f.endNurses);
    if (start && end != null && !f.nursesLeft) {
      const left = Math.max(0, Math.round(start - end));
      if (left) set("nursesLeft", String(left));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.startNurses, f.endNurses]);

  useEffect(() => {
    if (section === 3 && !f.costPerNurse2 && f.costPerNurse) {
      set("costPerNurse2", f.costPerNurse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  /* ---- Insights ---- */
  const retentionInsight: { msg: string; tone: InsightTone } | null =
    calc.retentionRate == null
      ? null
      : calc.retentionRate >= 90
      ? {
          msg: "Strong retention. Your organization has stable staffing foundations — focus on maintaining this level.",
          tone: "green",
        }
      : calc.retentionRate >= 85
      ? {
          msg: "Moderate. You're close to the danger zone. Small improvements could meaningfully stabilize your workforce.",
          tone: "amber",
        }
      : {
          msg: "Below 85% — your organization is likely stuck in a constant hiring cycle, with significant hidden costs compounding monthly.",
          tone: "red",
        };

  const turnoverInsight =
    calc.turnoverRate == null
      ? null
      : calc.turnoverRate <= 10
      ? {
          msg: "Low turnover. Industry-leading stability — well below the national average of ~22%.",
          tone: "green" as InsightTone,
        }
      : calc.turnoverRate <= 20
      ? {
          msg: "Moderate turnover (~national average). Proactive retention programs could prevent escalation.",
          tone: "amber" as InsightTone,
        }
      : {
          msg: "High turnover compounds costs through training, lost productivity, and increased clinical errors. Immediate action recommended.",
          tone: "red" as InsightTone,
        };

  const turnoverCostInsight =
    calc.turnoverCost == null
      ? null
      : calc.turnoverCost < 200000
      ? {
          msg: "Below $200K. Manageable — but remember: true cost is often 1.5–2× your calculated number.",
          tone: "green" as InsightTone,
        }
      : calc.turnoverCost < 500000
      ? {
          msg: "$200K–$500K. Significant leakage. Tailored retention programs will deliver strong ROI.",
          tone: "amber" as InsightTone,
        }
      : {
          msg: `Above $500K — significant hidden financial loss. A 10% retention improvement alone could recover $${Math.round(
            calc.turnoverCost * 0.1
          ).toLocaleString()} annually.`,
          tone: "red" as InsightTone,
        };

  const vacancyInsight =
    calc.vacancyRate == null
      ? null
      : calc.vacancyRate <= 5
      ? {
          msg: "Low vacancy. Strong hiring or solid retention — your team isn't carrying undue pressure.",
          tone: "green" as InsightTone,
        }
      : calc.vacancyRate <= 10
      ? {
          msg: "Approaching critical threshold. Monitor closely — above 10% triggers the burnout feedback loop.",
          tone: "amber" as InsightTone,
        }
      : {
          msg: "Above 10% — this is actively creating a self-perpetuating staffing crisis: Vacancies → Overtime → Burnout → More Vacancies.",
          tone: "red" as InsightTone,
        };

  const overtimeInsight =
    calc.overtimePct == null
      ? null
      : calc.overtimePct <= 5
      ? {
          msg: "Healthy overtime levels. Staff are not being overextended.",
          tone: "green" as InsightTone,
        }
      : calc.overtimePct <= 10
      ? {
          msg: "Elevated overtime. If the same nurses are consistently covering extra shifts, watch for early burnout signals.",
          tone: "amber" as InsightTone,
        }
      : {
          msg: "High overtime burden. This is one of the strongest predictors of imminent turnover — your team is at serious risk.",
          tone: "red" as InsightTone,
        };

  const agencyInsight =
    calc.agencyAnnual == null
      ? null
      : calc.agencyAnnual < 100000
      ? {
          msg: "Low agency spend. You're not overly dependent on temporary staffing.",
          tone: "green" as InsightTone,
        }
      : calc.agencyAnnual < 500000
      ? {
          msg: "Notable agency spend. This level of reliance begins to significantly inflate long-term labor costs.",
          tone: "amber" as InsightTone,
        }
      : {
          msg: "High agency dependency — this signals deeper retention issues and is masking the true cost of your staffing model.",
          tone: "red" as InsightTone,
        };

  const burnoutMsg: Record<BurnoutLevel, string> = {
    Low: "Low risk. Staffing levels are stable, overtime is minimal, and your team is generally not overworked.",
    Moderate:
      "Moderate risk. You experience occasional staffing gaps or overtime, with some signs of fatigue beginning to surface.",
    High: "High risk. Staffing shortages and overtime are frequent — your team is often stretched thin.",
    Severe:
      "Severe risk. Consistently understaffed, heavy reliance on overtime or agency staff, and burnout is clearly impacting your team.",
  };

  /* ---- Score appearance ---- */
  const scoreMeta = useMemo(() => {
    const t = calc.total;
    if (t >= 85)
      return {
        color: "hsl(150 55% 45%)",
        label: "Stable — Strong Systems In Place",
        ring: "border-emerald-500/40 bg-emerald-50 text-emerald-700",
      };
    if (t >= 70)
      return {
        color: "hsl(40 70% 50%)",
        label: "Moderate Risk — Some Instability",
        ring: "border-accent/40 bg-accent/10 text-accent",
      };
    if (t >= 50)
      return {
        color: "hsl(22 85% 55%)",
        label: "High Risk — Significant Issues",
        ring: "border-orange-500/40 bg-orange-50 text-orange-700",
      };
    return {
      color: "hsl(0 70% 55%)",
      label: "Critical — Immediate Intervention Needed",
      ring: "border-destructive/40 bg-destructive/10 text-destructive",
    };
  }, [calc.total]);

  const ringCircumference = 2 * Math.PI * 80;
  const ringOffset =
    ringCircumference - (calc.total / 100) * ringCircumference;

  /* ---- Recommendations ---- */
  const recs = useMemo(() => {
    const list: { icon: typeof Target; title: string; desc: string }[] = [];
    if (calc.retentionRate != null && calc.retentionRate < 85)
      list.push({
        icon: Target,
        title: "Priority 1: Stabilize Retention",
        desc: "Improve early nurse experience and address onboarding gaps. Nurses leaving in 6–12 months signal support failures, not recruitment failures.",
      });
    if (calc.overtimePct != null && calc.overtimePct > 10)
      list.push({
        icon: Timer,
        title: "Reduce Overtime Dependency",
        desc: "Identify which units carry disproportionate overtime. Build scheduling buffers before resignations accelerate.",
      });
    if (calc.vacancyRate != null && calc.vacancyRate > 10)
      list.push({
        icon: Megaphone,
        title: "Strengthen Hiring Pipeline",
        desc: "Time-to-fill delays are compounding pressure on your existing team. Build a consistent candidate flow to reduce average fill time.",
      });
    const ag = num(f.agencyReliance);
    if (ag != null && ag < 15)
      list.push({
        icon: DollarSign,
        title: "Reduce Agency Reliance",
        desc: "Constant agency use is masking deeper retention issues while inflating costs. Reduce dependency through tailored retention incentives.",
      });
    if (f.burnout === "High" || f.burnout === "Severe")
      list.push({
        icon: HeartPulse,
        title: "Address Burnout Drivers Urgently",
        desc: "Burnout shows in data before behavior. Conduct unit-level pulse surveys now — intervention before resignations is always less expensive.",
      });
    if (calc.total < 70)
      list.push({
        icon: BarChart3,
        title: "Book a Workforce Optimization Analysis",
        desc: "Organizations scoring below 70 are typically overspending 20–40% on labor costs. A tailored strategy can begin recovering this within 90 days.",
      });
    if (!list.length)
      list.push({
        icon: ShieldCheck,
        title: "Maintain Your Strong Foundation",
        desc: "Your score reflects solid workforce management. Focus on continuous monitoring and proactive retention programs to sustain this advantage.",
      });
    return list;
  }, [calc, f.agencyReliance, f.burnout]);

  /* ---- Navigation ---- */
  const goTo = (n: number) => {
    setSection(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = (section / SECTIONS) * 100;
  const introValid =
    f.orgName.trim() !== "" &&
    f.position.trim() !== "" &&
    f.fullName.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim());

  /* ---------------- Render ---------------- */
  return (
    <Layout>
      <section className="seraphyn-section seraphyn-gradient-bg">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              <Sparkles className="h-3 w-3" /> Seraphyn Care
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl">
              Staffing Stability
              <br />
              Assessment™
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A data-driven diagnostic to identify hidden financial loss,
              staffing instability, and retention breakdowns — in minutes.
            </p>

            {/* Progress */}
            <div className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* SECTION 0 — About You */}
            {section === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Get Started
                </div>
                <h2 className="mb-2 text-3xl md:text-4xl">
                  Tell Us About You
                </h2>
                <p className="mb-9 max-w-xl text-muted-foreground">
                  We use this information to personalize your Staffing Stability
                  Report. All fields are required.
                </p>

                <div className="seraphyn-card mb-6 space-y-5">
                  <Field label="Organization Name">
                    <Input
                      type="text"
                      placeholder="e.g. Sunrise Health System"
                      value={f.orgName}
                      onChange={(e) => set("orgName", e.target.value)}
                    />
                  </Field>
                  <Field label="Your Position at the Organization">
                    <Input
                      type="text"
                      placeholder="e.g. Chief Nursing Officer"
                      value={f.position}
                      onChange={(e) => set("position", e.target.value)}
                    />
                  </Field>
                  <Field label="Full Name">
                    <Input
                      type="text"
                      placeholder="e.g. Jane Doe"
                      value={f.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                    />
                  </Field>
                  <Field label="Email Address">
                    <Input
                      type="email"
                      placeholder="you@organization.com"
                      value={f.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {introValid
                      ? "You're all set."
                      : "Please complete all fields to continue."}
                  </p>
                  <Button
                    onClick={() => goTo(1)}
                    size="lg"
                    disabled={!introValid}
                  >
                    Begin Assessment <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* SECTION 1 */}
            {section === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Section 1 of 4
                </div>
                <h2 className="mb-2 text-3xl md:text-4xl">
                  Your Current Staffing Reality
                </h2>
                <p className="mb-9 max-w-xl text-muted-foreground">
                  Enter your nurse headcount numbers. Estimates are perfectly
                  fine — the goal is clarity, not perfection.
                </p>

                <QuestionCard
                  num="01"
                  title="Nurse Retention Rate"
                  description="How many nurses are staying vs. leaving — your foundation metric for stability. Use a 12-month period (e.g. last calendar year)."
                >
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Starting Nurses (at the beginning of the year)">
                      <Input
                        type="number"
                        placeholder="e.g. 120"
                        value={f.startNurses}
                        onChange={(e) => set("startNurses", e.target.value)}
                      />
                    </Field>
                    <Field label="Ending Nurses (at the end of the year)">
                      <Input
                        type="number"
                        placeholder="e.g. 108"
                        value={f.endNurses}
                        onChange={(e) => set("endNurses", e.target.value)}
                      />
                    </Field>
                    <Field label="New Hires (during the year)">
                      <Input
                        type="number"
                        placeholder="e.g. 18"
                        value={f.newHires}
                        onChange={(e) => set("newHires", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Retention Rate"
                    value={fmtPct(calc.retentionRate)}
                  />
                  {retentionInsight && (
                    <InsightBox
                      message={retentionInsight.msg}
                      tone={retentionInsight.tone}
                    />
                  )}
                </QuestionCard>

                <QuestionCard
                  num="02"
                  title="Turnover Rate"
                  description="The percentage of nurses who left throughout the year. Turnover directly drives financial loss, burnout, and staffing gaps."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nurses Who Left (throughout the year)">
                      <Input
                        type="number"
                        placeholder="e.g. 24"
                        value={f.nursesLeft}
                        onChange={(e) => set("nursesLeft", e.target.value)}
                      />
                    </Field>
                    <Field label="Total Nurses (average across the year)">
                      <Input
                        type="number"
                        placeholder="e.g. 120"
                        value={f.totalNurses}
                        onChange={(e) => set("totalNurses", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Turnover Rate"
                    value={fmtPct(calc.turnoverRate)}
                  />
                  {turnoverInsight && (
                    <InsightBox
                      message={turnoverInsight.msg}
                      tone={turnoverInsight.tone}
                    />
                  )}
                </QuestionCard>

                <QuestionCard
                  num="03"
                  title="Annual Cost of Turnover"
                  description="The estimated cost to recruit, hire, onboard, and train a single replacement nurse — including lost productivity, agency coverage, and orientation time. Industry research places this at 1.5–2× a nurse's annual salary."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Cost to Replace One Nurse ($)">
                      <Select
                        value={f.costPerNurse}
                        onValueChange={(v) => set("costPerNurse", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select estimated range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="40000">
                            Conservative — $40,000
                          </SelectItem>
                          <SelectItem value="55000">
                            Moderate — $55,000
                          </SelectItem>
                          <SelectItem value="60000">
                            Average — $60,000
                          </SelectItem>
                          <SelectItem value="70000">
                            Above Average — $70,000
                          </SelectItem>
                          <SelectItem value="80000">High — $80,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Nurses Who Left (auto-filled)">
                      <Input
                        type="number"
                        placeholder="From above"
                        value={f.nursesLeft}
                        onChange={(e) => set("nursesLeft", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Annual Turnover Cost"
                    value={fmt$(calc.turnoverCost)}
                  />
                  {turnoverCostInsight && (
                    <InsightBox
                      message={turnoverCostInsight.msg}
                      tone={turnoverCostInsight.tone}
                    />
                  )}
                </QuestionCard>

                <div className="mt-8 flex justify-end">
                  <Button onClick={() => goTo(2)} size="lg">
                    Continue <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* SECTION 2 */}
            {section === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Section 2 of 4
                </div>
                <h2 className="mb-2 text-3xl md:text-4xl">
                  What's Driving Your Turnover
                </h2>
                <p className="mb-9 max-w-xl text-muted-foreground">
                  Uncover the operational factors creating financial leakage and
                  burnout risk in your organization.
                </p>

                <QuestionCard
                  num="04"
                  title="Vacancy Rate"
                  description="Vacancies increase workload → burnout → more resignations. Above 10% creates a self-perpetuating crisis."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Open Positions">
                      <Input
                        type="number"
                        placeholder="e.g. 14"
                        value={f.openPos}
                        onChange={(e) => set("openPos", e.target.value)}
                      />
                    </Field>
                    <Field label="Total Positions">
                      <Input
                        type="number"
                        placeholder="e.g. 130"
                        value={f.totalPos}
                        onChange={(e) => set("totalPos", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Vacancy Rate"
                    value={fmtPct(calc.vacancyRate)}
                  />
                  {vacancyInsight && (
                    <InsightBox
                      message={vacancyInsight.msg}
                      tone={vacancyInsight.tone}
                    />
                  )}
                </QuestionCard>

                <QuestionCard
                  num="05"
                  title="Overtime Burden"
                  description="Overtime is one of the strongest predictors of burnout and turnover. If the same nurses always cover it, resignations are likely imminent."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Overtime Hours (monthly)">
                      <Input
                        type="number"
                        placeholder="e.g. 850"
                        value={f.otHours}
                        onChange={(e) => set("otHours", e.target.value)}
                      />
                    </Field>
                    <Field label="Total Hours Worked (monthly)">
                      <Input
                        type="number"
                        placeholder="e.g. 8500"
                        value={f.totalHours}
                        onChange={(e) => set("totalHours", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Overtime %"
                    value={fmtPct(calc.overtimePct)}
                  />
                  {overtimeInsight && (
                    <InsightBox
                      message={overtimeInsight.msg}
                      tone={overtimeInsight.tone}
                    />
                  )}
                </QuestionCard>

                <QuestionCard
                  num="06"
                  title="Agency Usage & Cost"
                  description="Agency reliance is where massive hidden costs live. Constant usage signals deeper retention issues."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Agency Hours / Month">
                      <Input
                        type="number"
                        placeholder="e.g. 400"
                        value={f.agencyHours}
                        onChange={(e) => set("agencyHours", e.target.value)}
                      />
                    </Field>
                    <Field label="Agency Hourly Rate ($)">
                      <Input
                        type="number"
                        placeholder="e.g. 85"
                        value={f.agencyRate}
                        onChange={(e) => set("agencyRate", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Annual Agency Spend"
                    value={
                      calc.agencyAnnual == null
                        ? "—"
                        : fmt$(calc.agencyAnnual) + "/yr"
                    }
                  />
                  {agencyInsight && (
                    <InsightBox
                      message={agencyInsight.msg}
                      tone={agencyInsight.tone}
                    />
                  )}

                  <div className="mt-6">
                    <Label className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                      Overall Agency Reliance Level
                    </Label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { v: "20", label: "Minimal / None" },
                        { v: "15", label: "Occasional" },
                        { v: "10", label: "Frequent" },
                        { v: "5", label: "Heavy Reliance" },
                      ].map((opt) => (
                        <button
                          key={opt.v}
                          type="button"
                          onClick={() => set("agencyReliance", opt.v)}
                          className={`rounded-full border px-4 py-2 text-sm transition-all ${
                            f.agencyReliance === opt.v
                              ? "border-accent bg-accent/15 text-accent"
                              : "border-border text-muted-foreground hover:border-foreground/20"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </QuestionCard>

                <QuestionCard
                  num="07"
                  title="Time-to-Fill"
                  description="The longer roles stay open, the more pressure on your team. Even 1–2 week delays significantly increase strain."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Total Days to Fill Roles">
                      <Input
                        type="number"
                        placeholder="e.g. 180"
                        value={f.totalDays}
                        onChange={(e) => set("totalDays", e.target.value)}
                      />
                    </Field>
                    <Field label="Number of Roles Filled">
                      <Input
                        type="number"
                        placeholder="e.g. 6"
                        value={f.rolesFilled}
                        onChange={(e) => set("rolesFilled", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Avg. Time-to-Fill"
                    value={
                      calc.ttf == null ? "— days" : calc.ttf.toFixed(1) + " days"
                    }
                  />
                </QuestionCard>

                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" onClick={() => goTo(1)}>
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => goTo(3)} size="lg">
                    Continue <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* SECTION 3 */}
            {section === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Section 3 of 4
                </div>
                <h2 className="mb-2 text-3xl md:text-4xl">
                  Financial Impact & Savings Potential
                </h2>
                <p className="mb-9 max-w-xl text-muted-foreground">
                  See how small improvements create massive financial upside —
                  and assess your organization's burnout risk level.
                </p>

                <QuestionCard
                  num="08"
                  title="Retention Improvement Scenario"
                  description="A 5–10% improvement in retention can save hundreds of thousands annually. Savings multiply across overtime and agency reduction."
                >
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Current Turnover (nurses)">
                      <Input
                        type="number"
                        placeholder="Auto-filled"
                        value={f.nursesLeft}
                        onChange={(e) => set("nursesLeft", e.target.value)}
                      />
                    </Field>
                    <Field label="Target Reduction (%)">
                      <Input
                        type="number"
                        placeholder="e.g. 10"
                        value={f.reductionPct}
                        onChange={(e) => set("reductionPct", e.target.value)}
                      />
                    </Field>
                    <Field label="Cost Per Nurse ($)">
                      <Input
                        type="number"
                        placeholder="e.g. 60000"
                        value={f.costPerNurse2}
                        onChange={(e) => set("costPerNurse2", e.target.value)}
                      />
                    </Field>
                  </div>
                  <ResultChip
                    label="Projected Annual Savings"
                    value={
                      calc.savings == null ? "—" : fmt$(calc.savings) + "/yr"
                    }
                  />
                </QuestionCard>

                <QuestionCard
                  num="09"
                  title="Burnout Risk Index"
                  description="Based on your current staffing situation, how would you describe your team's level of burnout risk? Think about overtime, staffing shortages, and turnover when answering — choose the option that best reflects your current reality."
                >
                  <div className="grid gap-3">
                    {(
                      [
                        {
                          l: "Low",
                          emoji: "🟢",
                          cls: "emerald",
                          headline: "Low Risk",
                          desc: "Our staffing levels are stable, overtime is minimal, and our team is generally not overworked.",
                        },
                        {
                          l: "Moderate",
                          emoji: "🟡",
                          cls: "accent",
                          headline: "Moderate Risk",
                          desc: "We experience occasional staffing gaps or overtime, and some signs of fatigue are present.",
                        },
                        {
                          l: "High",
                          emoji: "🟠",
                          cls: "orange",
                          headline: "High Risk",
                          desc: "Staffing shortages and overtime are frequent, and our team is often stretched thin.",
                        },
                        {
                          l: "Severe",
                          emoji: "🔴",
                          cls: "destructive",
                          headline: "Severe Risk",
                          desc: "We are consistently understaffed, relying heavily on overtime or agency staff, and burnout is clearly impacting our team.",
                        },
                      ] as const
                    ).map((b) => {
                      const selected = f.burnout === b.l;
                      const colorMap: Record<string, string> = {
                        emerald:
                          "border-emerald-500 bg-emerald-50 text-emerald-900",
                        accent: "border-accent bg-accent/10 text-foreground",
                        orange:
                          "border-orange-500 bg-orange-50 text-orange-900",
                        destructive:
                          "border-destructive bg-destructive/10 text-foreground",
                      };
                      return (
                        <button
                          key={b.l}
                          type="button"
                          onClick={() => set("burnout", b.l)}
                          className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                            selected
                              ? colorMap[b.cls]
                              : "border-border bg-background hover:border-foreground/20"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <span>{b.emoji}</span>
                            <span>{b.headline}</span>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {b.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </QuestionCard>

                <QuestionCard
                  num="💰"
                  title="Financial Impact Summary"
                  description="Your estimated annual financial exposure from staffing instability."
                >
                  {calc.annualLoss > 0 ? (
                    <div className="space-y-3">
                      <FinRow
                        label="Turnover Cost"
                        sub="Annual"
                        value={fmt$(calc.turnoverCost)}
                      />
                      <FinRow
                        label="Agency Spend"
                        sub="Annual"
                        value={fmt$(calc.agencyAnnual)}
                      />
                      <FinRow
                        label="Estimated 3-Year Loss"
                        sub="If trends continue"
                        value={fmt$(calc.threeYearLoss)}
                        emphasis
                      />
                      {calc.savings != null && calc.savings > 0 && (
                        <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-50 px-5 py-4">
                          <div>
                            <div className="text-sm text-emerald-900">
                              💚 Projected Savings
                            </div>
                            <div className="text-xs text-emerald-700">
                              With targeted retention improvement
                            </div>
                          </div>
                          <div className="font-serif text-2xl font-bold text-emerald-700">
                            {fmt$(calc.savings)}/yr
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Complete Sections 1 & 2 to see your full financial
                      picture.
                    </p>
                  )}
                </QuestionCard>

                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" onClick={() => goTo(2)}>
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => goTo(4)} size="lg">
                    Generate My Score <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* SECTION 4 */}
            {section === 4 && (
              <motion.div
                key="s4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="print:m-0"
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Section 4 of 4
                </div>
                <h2 className="mb-2 text-3xl md:text-4xl">
                  Your Staffing Stability Score™
                </h2>
                <p className="mb-9 max-w-xl text-muted-foreground">
                  A single number reflecting your workforce stability, financial
                  efficiency, and burnout risk.
                </p>

                {/* Score Ring */}
                <div className="seraphyn-card flex flex-col items-center py-10 text-center">
                  <div className="relative inline-block">
                    <svg width="200" height="200" viewBox="0 0 180 180">
                      <circle
                        cx="90"
                        cy="90"
                        r="80"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="90"
                        cy="90"
                        r="80"
                        fill="none"
                        stroke={scoreMeta.color}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={ringCircumference}
                        initial={{ strokeDashoffset: ringCircumference }}
                        animate={{ strokeDashoffset: ringOffset }}
                        transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "50% 50%",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        key={calc.total}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-serif text-6xl font-bold text-foreground"
                      >
                        {calc.total}
                      </motion.div>
                      <div className="text-sm text-muted-foreground">
                        / 100
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold ${scoreMeta.ring}`}
                  >
                    {scoreMeta.label}
                  </div>
                </div>

                {/* Breakdown */}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <ScoreBar
                    label="Retention Rate"
                    pts={calc.r1}
                    max={40}
                    color="hsl(180 60% 45%)"
                  />
                  <ScoreBar
                    label="Vacancy Rate"
                    pts={calc.r2}
                    max={20}
                    color="hsl(40 70% 55%)"
                  />
                  <ScoreBar
                    label="Overtime Burden"
                    pts={calc.r3}
                    max={20}
                    color="hsl(22 85% 55%)"
                  />
                  <ScoreBar
                    label="Agency Usage"
                    pts={calc.r4}
                    max={20}
                    color="hsl(0 70% 55%)"
                  />
                </div>

                {/* Report */}
                <div className="mt-10">
                  <h3 className="mb-4 border-b pb-3 font-serif text-2xl normal-case tracking-normal">
                    📋 Nurse Workforce Diagnostic Report
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <MetricItem
                      label="Retention Rate"
                      value={fmtPct(calc.retentionRate)}
                    />
                    <MetricItem
                      label="Turnover Rate"
                      value={fmtPct(calc.turnoverRate)}
                    />
                    <MetricItem
                      label="Vacancy Rate"
                      value={fmtPct(calc.vacancyRate)}
                    />
                    <MetricItem
                      label="Overtime %"
                      value={fmtPct(calc.overtimePct)}
                    />
                    <MetricItem
                      label="Avg. Time-to-Fill"
                      value={
                        calc.ttf == null
                          ? "—"
                          : calc.ttf.toFixed(0) + " days"
                      }
                    />
                    <MetricItem
                      label="Burnout Risk"
                      value={f.burnout || "—"}
                    />
                    <MetricItem
                      label="Stability Score"
                      value={`${calc.total} / 100`}
                    />
                    <MetricItem
                      label="Risk Level"
                      value={
                        calc.total >= 85
                          ? "Stable"
                          : calc.total >= 70
                          ? "Moderate"
                          : calc.total >= 50
                          ? "High"
                          : "Critical"
                      }
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="mb-4 border-b pb-3 font-serif text-2xl normal-case tracking-normal">
                    💰 Financial Impact Analysis
                  </h3>
                  {calc.annualLoss > 0 ? (
                    <div className="space-y-3">
                      {calc.turnoverCost != null && (
                        <FinRow
                          label="Annual Turnover Cost"
                          value={fmt$(calc.turnoverCost)}
                        />
                      )}
                      {calc.agencyAnnual != null && (
                        <FinRow
                          label="Annual Agency Spend"
                          value={fmt$(calc.agencyAnnual)}
                        />
                      )}
                      <FinRow
                        label="Estimated Annual Loss"
                        value={fmt$(calc.annualLoss)}
                        emphasis
                      />
                      <p className="text-sm text-muted-foreground">
                        If trends continue, projected 3-year loss:{" "}
                        <strong className="text-destructive">
                          {fmt$(calc.threeYearLoss)}
                        </strong>
                      </p>
                      {calc.savings != null && calc.savings > 0 && (
                        <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-50 px-5 py-4">
                          <div>
                            <div className="text-sm text-emerald-900">
                              💚 Potential Annual Savings
                            </div>
                            <div className="text-xs text-emerald-700">
                              With tailored retention intervention
                            </div>
                          </div>
                          <div className="font-serif text-2xl font-bold text-emerald-700">
                            {fmt$(calc.savings)}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Complete turnover and agency fields for financial analysis.
                    </p>
                  )}
                </div>

                <div className="mt-10">
                  <h3 className="mb-4 border-b pb-3 font-serif text-2xl normal-case tracking-normal">
                    🛠 Strategic Recommendations
                  </h3>
                  <ul className="divide-y divide-border">
                    {recs.map((r, i) => (
                      <li key={i} className="flex gap-3 py-3">
                        <span className="text-base">{r.icon}</span>
                        <div>
                          <strong className="text-foreground">{r.title}</strong>
                          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                            {r.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA — Calendly embed */}
                <div className="mt-10 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 p-6 md:p-9 text-center print:hidden">
                  <h3 className="mb-2 font-serif text-2xl normal-case tracking-normal text-foreground">
                    Ready to Recover Your Lost Revenue?
                  </h3>
                  <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {f.fullName ? `${f.fullName.split(" ")[0]}, you've ` : "You've "}
                    identified the problem. Book a free strategy call below to
                    get a tailored plan to reduce turnover, stabilize staffing,
                    and recover lost revenue at {f.orgName || "your organization"}.
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-border bg-background">
                    <iframe
                      src={`https://calendly.com/seraphyncare-info/30min?hide_gdpr_banner=1&name=${encodeURIComponent(
                        f.fullName
                      )}&email=${encodeURIComponent(
                        f.email
                      )}&a1=${encodeURIComponent(
                        `${f.position} @ ${f.orgName}`
                      )}`}
                      title="Book a strategy call with Seraphyn Care"
                      width="100%"
                      height="700"
                      frameBorder="0"
                      className="block w-full"
                    />
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Trouble loading the calendar?{" "}
                    <a
                      href="https://calendly.com/seraphyncare-info/30min"
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Open in a new tab
                    </a>
                    .
                  </p>
                </div>

                <div className="mt-8 flex justify-between print:hidden">
                  <Button variant="ghost" onClick={() => goTo(3)}>
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.print()}
                  >
                    <Printer className="mr-1 h-4 w-4" /> Print Report
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="mt-16 text-center text-xs text-muted-foreground/60">
            © Seraphyn Care · Staffing Stability Assessment™ ·
            seraphyncare.com
          </footer>
        </div>
      </section>
    </Layout>
  );
};

/* ---------------- Small subcomponents ---------------- */

const FinRow = ({
  label,
  sub,
  value,
  emphasis = false,
}: {
  label: string;
  sub?: string;
  value: string;
  emphasis?: boolean;
}) => (
  <div
    className={`flex items-center justify-between rounded-2xl border px-5 py-4 ${
      emphasis
        ? "border-destructive/30 bg-gradient-to-r from-destructive/5 to-orange-500/5"
        : "border-border bg-secondary/30"
    }`}
  >
    <div>
      <div className="text-sm text-foreground">{label}</div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
    <div
      className={`font-serif text-2xl font-bold ${
        emphasis ? "text-destructive" : "text-foreground"
      }`}
    >
      {value}
    </div>
  </div>
);

const ScoreBar = ({
  label,
  pts,
  max,
  color,
}: {
  label: string;
  pts: number;
  max: number;
  color: string;
}) => (
  <div className="seraphyn-card">
    <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
      {label}
    </div>
    <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${(pts / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
    <div className="flex items-baseline gap-1">
      <span className="font-mono-tabular text-xl font-medium text-foreground">
        {pts}
      </span>
      <span className="text-xs text-muted-foreground">/ {max}</span>
    </div>
  </div>
);

const MetricItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 px-4 py-3">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-mono-tabular text-base font-medium text-foreground">
      {value}
    </span>
  </div>
);

export default Assessment;
