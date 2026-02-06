'use client'
import { motion } from "framer-motion";
import { Link, Zap, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Connect your account",
    description: "Link your Instagram profile securely in just a few clicks. No passwords stored.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Set up automations",
    description: "Create custom triggers and responses for DMs and comments using our intuitive builder.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Watch engagement grow",
    description: "Sit back as Engagely handles conversations and tracks your growth in real-time.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-24 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
            How it works
          </span>
          <h2 className="  text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Three simple steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Get started in minutes and let automation handle the rest.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative text-center"
            >
              {/* Connector line (hidden on mobile, shown between items on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              {/* Step Number & Icon */}
              <div className="relative inline-flex flex-col items-center mb-6">
                <span className="text-xs font-bold tracking-widest gradient-text mb-3">
                  {step.number}
                </span>
                <div className="w-24 h-24 rounded-2xl bg-background border border-border shadow-lg flex items-center justify-center group hover:border-primary/50 transition-colors">
                  <step.icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>

              {/* Content */}
              <h3 className="  text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
