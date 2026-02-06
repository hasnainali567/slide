"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='fixed top-0 left-0 right-0 z-50'
    >
      <div
        style={
          isScrolled
            ? {
                backgroundImage:
                  "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }
            : {}
        }
        className={cn(
          "mx-auto transition-all duration-500 ease-out overflow-hidden", // Added overflow-hidden
          isScrolled
            ? [
                "mt-4 w-[92%] max-w-5xl",
                // 1. Added a slight white tint (bg-white/[0.03]) for depth
                // 2. Used a more pronounced border-t for that "rim light" effect
                "bg-white/5 dark:bg-white/2 backdrop-blur-2xl",
                "border border-white/10 border-t-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
                isOpen ? "rounded-3xl" : "rounded-[50px]",
              ]
            : [
                "mt-0 w-full rounded-none shadow-none",
                "bg-background/80 backdrop-blur-lg border-b border-white/10",
                "px-10! md:px-20! xl:px-40!",
              ],
        )}
      >
        <div className='flex items-center justify-between h-14 px-3 pl-6'>
          {/* Logo */}
          <Link
            href='/'
            className='font-logo text-lg tracking-tight text-primary font-medium'
          >
            Engagely
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8 ml-10'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                // Changed: Use foreground color with high opacity instead of muted-foreground
                className='text-sm   text-foreground/70 hover:text-primary/50 font-bold transition-colors duration-200'
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className='hidden md:flex items-center gap-2  '>
            <ThemeToggle />
            <Button
              variant='ghost'
              size='sm'
              className='rounded-full cursor-pointer'
            >
              Sign in
            </Button>
            <Button
              size='sm'
              className='gradient-bg text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90'
            >
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex md:hidden items-center gap-2'>
            <ThemeToggle />
            <button
              type='button'
              onClick={() => setIsOpen(!isOpen)}
              className='p-2 text-foreground'
            >
              {isOpen ? (
                <X className='h-6 w-6 cursor-pointer' />
              ) : (
                <Menu className='h-6 w-6 cursor-pointer' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Wrapped in AnimatePresence for smooth exit */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='md:hidden'
            >
              <div className='flex flex-col gap-4 p-6 border-t border-border/20 bg-background/60'>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)} // Close menu on click
                    className='text-lg font-medium text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.name}
                  </Link>
                ))}
                <div className='flex flex-col gap-2 pt-4 border-t border-border/20'>
                  <Button variant='ghost' className='justify-start text-lg'>
                    Sign in
                  </Button>
                  <Button className='gradient-bg text-primary-foreground rounded-xl py-6 text-lg'>
                    Start free
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
