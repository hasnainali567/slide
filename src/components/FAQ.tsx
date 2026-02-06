'use client'
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my Instagram account safe?",
    answer: "Absolutely. We use Instagram's official API and never store your password. Your account credentials are encrypted and we follow all of Instagram's guidelines to ensure your account remains secure and in good standing.",
  },
  {
    question: "How does the AI respond to messages?",
    answer: "Our AI analyzes incoming messages for keywords and context, then selects the most appropriate response from your custom templates. You have full control over what gets sent—nothing goes out without your approval of the response templates.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time with no questions asked. If you cancel, you'll retain access until the end of your current billing period. We also offer a 14-day money-back guarantee on all paid plans.",
  },
  {
    question: "What happens when I hit my reply limit on the Free plan?",
    answer: "When you reach 50 auto-replies on the Free plan, automated responses pause until the next month. You can upgrade to Pro anytime for unlimited replies, and your upgrade takes effect immediately.",
  },
  {
    question: "Do you support multiple Instagram accounts?",
    answer: "Yes! The Pro plan supports up to 3 Instagram accounts, and Enterprise offers unlimited accounts. Each account can have its own unique automation rules and response templates.",
  },
  {
    question: "How quickly are messages responded to?",
    answer: "Responses are sent within seconds of receiving a message. Our infrastructure is designed for speed, ensuring your followers get instant engagement that feels natural and timely.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-12 md:py-24 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
            FAQ
          </span>
          <h2 className="  text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Common questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about Engagely.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left   font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
