import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { CheckCircle } from "lucide-react";

const steps = ["Your Info", "Organization", "Details", "Complete"];

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", bedCount: "", agencySpend: "" });

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else setSubmitted(true);
  };

  return (
    <Layout>
      <section className="seraphyn-section seraphyn-gradient-bg min-h-[80vh] flex items-center">
        <div className="seraphyn-container w-full max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-xs mb-4 text-muted-foreground">FREE ASSESSMENT</h3>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">Discover Your Retention ROI</h1>
            <p className="mt-4 text-muted-foreground max-w-[50ch] mx-auto">
              Get a complimentary analysis of your staffing costs and retention opportunities. No obligation.
            </p>
          </div>

          {/* Progress */}
          <div className="flex justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  i <= step || submitted ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {submitted || i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`w-8 h-px ${i < step || submitted ? "bg-accent" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="seraphyn-card text-center">
              <CheckCircle className="mx-auto mb-4 text-accent" size={48} strokeWidth={1.5} />
              <h2 className="font-serif text-3xl text-foreground">Your Report Is Being Prepared</h2>
              <p className="mt-4 text-muted-foreground max-w-[45ch] mx-auto text-sm leading-relaxed">
                We'll send your personalized retention and staffing cost analysis within 24 hours. A member of our team will follow up to schedule a strategy call.
              </p>
            </motion.div>
          ) : (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="seraphyn-card">
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Full Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Dr. Jane Smith" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Work Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="jane@hospital.org" />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Organization Name</label>
                  <input type="text" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Metro Health System" />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Number of Licensed Beds</label>
                    <input type="text" value={form.bedCount} onChange={e => setForm({ ...form, bedCount: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="500" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Annual Agency Spend (Estimate)</label>
                    <input type="text" value={form.agencySpend} onChange={e => setForm({ ...form, agencySpend: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="$5,000,000" />
                  </div>
                </div>
              )}
              <button onClick={handleNext} className="w-full mt-8 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
                {step === 2 ? "Get My Free Report" : "Continue"}
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Assessment;
