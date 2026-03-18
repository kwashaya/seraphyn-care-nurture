import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { CheckCircle } from "lucide-react";

const intents = [
  "I need help with staffing",
  "I'm interested in consulting",
  "I'm a nurse looking to join",
  "I have a general question",
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <Layout>
      <section className="seraphyn-section seraphyn-gradient-bg min-h-[80vh] flex items-center">
        <div className="seraphyn-container w-full max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-xs mb-4 text-muted-foreground">CONTACT</h3>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">Start a Conversation</h1>
            <p className="mt-4 text-muted-foreground">Tell us what you need and we'll connect you with the right team.</p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="seraphyn-card text-center">
              <CheckCircle className="mx-auto mb-4 text-accent" size={48} strokeWidth={1.5} />
              <h2 className="font-serif text-3xl text-foreground">We'll Be in Touch</h2>
              <p className="mt-4 text-muted-foreground text-sm">Our team will respond within one business day.</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="seraphyn-card">
              {/* Intent selection */}
              <p className="text-sm text-muted-foreground mb-4">What brings you here?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {intents.map((intent) => (
                  <button
                    key={intent}
                    onClick={() => setSelectedIntent(intent)}
                    className={`px-4 py-3 rounded-lg text-sm text-left transition-all duration-200 ${
                      selectedIntent === intent
                        ? "bg-accent/10 text-accent ring-1 ring-accent/30"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {intent}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-lg bg-muted border-0 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" placeholder="Tell us about your needs..." />
                </div>
              </div>

              <button onClick={() => setSubmitted(true)} className="w-full mt-8 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
                Let's Transform Your Workforce
              </button>

              <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                <span>info@seraphyncare.com</span>
                <span className="hidden sm:inline">·</span>
                <span>(800) 555-0199</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
