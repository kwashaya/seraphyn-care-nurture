import { motion } from "framer-motion";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ tag, title, description, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
    className={`mb-16 ${center ? "text-center" : ""}`}
  >
    {tag && <h3 className="text-xs mb-4 text-muted-foreground">{tag}</h3>}
    <h2 className="font-serif text-4xl md:text-5xl text-foreground">{title}</h2>
    {description && (
      <p className="mt-6 text-muted-foreground leading-relaxed max-w-[65ch] mx-auto">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
