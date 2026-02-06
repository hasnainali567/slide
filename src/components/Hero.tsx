'use client'
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import Image from "next/image";

export const Hero = () => {
 return (
  <section className="relative pt-24 md:pt-32 pb-20 px-4 md:px-6 overflow-hidden">
   

   <div className="container mx-auto">
    {/* Hero Content */}
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     className="text-center max-w-4xl mx-auto mb-8 md:mb-16"
    >
     <h1 className="  text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
      Turn Instagram conversations
      <br />
      <span className="gradient-text font-logo font-medium">into real opportunities</span>
     </h1>
     
     <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-5 md:mb-10">
      Respond to every message automatically. Engage with every comment. 
      Build relationships at scale without lifting a finger.
     </p>

     <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button 
       size="lg" 
       className="gradient-bg text-primary-foreground hover:opacity-90 px-8 h-12 text-base font-medium rounded-full cursor-pointer"
      >
       Start free
      </Button>
      <Button 
       variant="outline" 
       size="lg"
       className="px-8 h-12 text-base font-medium group rounded-full cursor-pointer"
      >
       <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
       Watch demo
      </Button>
     </div>
    </motion.div>

    {/* Hero Image */}
    <motion.div
     initial={{ opacity: 0, y: 40 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.2 }}
     className="relative max-w-5xl mx-auto"
    >
     <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 gradient-bg opacity-10" />
      <Image
       src={heroDashboard}
       alt="Engagely dashboard showing Instagram automation features"
       className="w-full h-auto"
      />
     </div>
     
     {/* Decorative gradient blur */}
     <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 gradient-bg opacity-20 blur-3xl" />
    </motion.div>
   </div>
  </section>
 );
};