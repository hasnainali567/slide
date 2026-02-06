'use client'
import { motion } from "framer-motion";
import { MessageSquare, MessagesSquare, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MessageSquare,
    label: "Feature",
    title: "Intelligent DM responses",
    description: "Reply instantly when followers message with specific keywords.",
    featured: true,
  },
  {
    icon: MessagesSquare,
    title: "Comment automation",
    description: "Like and reply to video comments automatically.",
    featured: false,
  },
  {
    icon: LayoutDashboard,
    title: "Seamless interaction",
    description: "Manage all engagement from one simple dashboard.",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
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

export const Features = () => {
  return (
    <section id="features" className="py-12 md:py-24 px-4 md:px-6">
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
            Capabilities
          </span>
          <h2 className="  text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            What you can do
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Automate your Instagram presence with intelligent responses and engagement.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`
                relative rounded-2xl p-8 transition-all duration-300
                ${feature.featured 
                  ? 'bg-feature-card text-feature-card-foreground md:row-span-1' 
                  : 'bg-feature-card text-feature-card-foreground'
                }
                hover:scale-[1.02] hover:shadow-xl
              `}
            >
              {/* Icon */}
              <div className={`
                inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6
                ${feature.featured ? 'bg-white/10' : 'bg-white/10'}
              `}>
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Label (for featured) */}
              {feature.label && (
                <span className="text-xs font-semibold tracking-wide uppercase text-white/60 block mb-2">
                  {feature.label}
                </span>
              )}

              {/* Content */}
              <h3 className="  text-xl md:text-2xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 mb-6">
                {feature.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-4">
                {feature.featured && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                  >
                    Learn more
                  </Button>
                )}
                <button className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group">
                  <span>{feature.featured ? 'Arrow' : 'Arrow'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
