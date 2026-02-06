"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/constant/pages";

const plans = PLANS;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Pricing = () => {
  return (
    <section id='pricing' className='py-12 md:py-24 px-4 md:px-6'>
      <div className='container mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-8 md:mb-16'
        >
          <span className='text-sm font-semibold tracking-wide uppercase text-muted-foreground'>
            Pricing
          </span>
          <h2 className='  text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4'>
            Simple, transparent pricing
          </h2>
          <p className='text-lg text-muted-foreground max-w-xl mx-auto'>
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto'
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`
                relative rounded-2xl p-8 transition-all duration-300
                ${
                  plan.featured
                    ? "bg-feature-card text-feature-card-foreground scale-105 shadow-2xl"
                    : "bg-background border border-border hover:border-primary/30 hover:shadow-lg"
                }
              `}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                  <span className='gradient-bg text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full'>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className='mb-6'>
                <h3
                  className={`  text-xl font-semibold mb-2 ${plan.featured ? "text-white" : ""}`}
                >
                  {plan.name}
                </h3>
                <div className='flex items-baseline gap-1'>
                  <span
                    className={`  text-4xl font-bold ${plan.featured ? "text-white" : ""}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${plan.featured ? "text-white/60" : "text-muted-foreground"}`}
                  >
                    /{plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm mt-2 ${plan.featured ? "text-white/70" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className='space-y-3 mb-8'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-3'>
                    <Check
                      className={`h-5 w-5 flex-shrink-0 ${plan.featured ? "text-primary" : "text-primary"}`}
                    />
                    <span
                      className={`text-sm ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full ${
                  plan.featured
                    ? "bg-white text-feature-card hover:bg-white/90"
                    : "gradient-bg text-primary-foreground hover:opacity-90"
                }`}
                size='lg'
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
