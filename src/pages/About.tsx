import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
};

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container text-center py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}>
          <h3 className="text-xs mb-4 text-muted-foreground">ABOUT US</h3>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground">Built by Nurses, for Healthcare</h1>
          <p className="mt-6 text-muted-foreground max-w-[55ch] mx-auto leading-relaxed text-lg">
            Seraphyn Care was founded on a simple belief: the healthcare staffing crisis can only be solved by the people who understand it best — nurses.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="seraphyn-section">
      <div className="seraphyn-container max-w-3xl">
        <motion.div {...fadeUp} className="space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Seraphyn Care was born from the frontlines of healthcare. Our founding team — clinical nurses, healthcare executives, and technologists — saw firsthand how the revolving door of travel nurses and agency dependency was eroding care quality, burning out permanent staff, and costing health systems billions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We built Seraphyn Care to be different. Not another staffing agency peddling bodies to fill shifts, but a strategic partner that combines cutting-edge technology with deep clinical expertise to create sustainable workforce solutions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we serve health systems across the country with our dual-model approach: an AI-powered staffing marketplace for immediate needs, and executive consulting for long-term transformation.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div {...fadeUp} className="seraphyn-card">
            <h3 className="text-xs mb-4">OUR MISSION</h3>
            <h2 className="font-serif text-3xl text-foreground">Improving nurse retention and patient care through technology and human-centered strategy.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              Every decision we make is guided by a single question: does this make nursing more sustainable and patient care better?
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="seraphyn-card bg-primary text-primary-foreground">
            <h3 className="text-xs mb-4 text-primary-foreground/60">OUR VISION</h3>
            <h2 className="font-serif text-3xl text-primary-foreground tracking-tight">A future where every healthcare system operates with a stable, empowered nursing workforce.</h2>
            <p className="mt-4 text-primary-foreground/70 leading-relaxed text-sm">
              We envision a healthcare industry where nurse burnout is the exception, not the norm — and where technology amplifies human connection rather than replacing it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="seraphyn-section">
      <div className="seraphyn-container">
        <SectionHeading tag="OUR VALUES" title="What We Stand For" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Clinical First", description: "Every product decision and consulting recommendation is grounded in real clinical experience and evidence." },
            { title: "Radical Transparency", description: "We share our data, our methods, and our results openly. Trust is earned through visibility." },
            { title: "Sustainable Impact", description: "Quick fixes don't work. We design systems and strategies that compound in value over time." },
          ].map((v, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="seraphyn-card">
              <h3 className="text-sm mb-3">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="seraphyn-section seraphyn-gradient-bg">
      <div className="seraphyn-container text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Join Us in Transforming Healthcare</h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-95 active:scale-95" style={{ boxShadow: "var(--shadow-button)" }}>
              Start a Conversation
            </Link>
            <Link to="/for-nurses" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium tracking-wide transition-all duration-200 hover:brightness-110 active:scale-95">
              For Nurses
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default About;
