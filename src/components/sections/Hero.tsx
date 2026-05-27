
"use client";

import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  Instagram,
  Youtube,
  Send,
  Facebook
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Youtube, href: "#", label: "Youtube", color: "hover:text-red-500" },
  { icon: Send, href: "#", label: "Telegram", color: "hover:text-blue-400" },
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
];

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Empowering 1,000+ Indian Traders
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 font-headline text-5xl font-bold tracking-tight md:text-8xl leading-tight"
        >
          Master Financial Markets
          <br />
          <span className="text-gradient">With Precision</span>
        </motion.h1>

        {/* Description text */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-3xl text-lg md:text-xl text-muted-foreground"
        >
          Learn practical strategies, clear NISM certifications, and build real market skills — 
          without the hype. Professional education for the modern investor.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#courses">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 gap-2 rounded-2xl">
                Start Learning Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#consultation">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Banner image - EMBEDDED IN FLOW BEFORE STATS */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-6xl mb-20 px-4"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(249,115,22,0.3)] group transition-transform duration-500 hover:scale-[1.01]">
            <Image 
              src="https://financeschool.sirv.com/ChatGPT%20Image%20May%2027%2C%202026%2C%2010_08_50%20PM.png"
              alt="Trading Dashboard"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-12 border-t border-white/10 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl font-bold text-foreground">1,200+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Students
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl font-bold text-foreground">6+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" /> Years
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl font-bold text-foreground">42+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Live Sessions
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl font-bold text-foreground">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Practical</div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Follow Our Community</span>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <Link 
                key={i} 
                href={social.href} 
                className={cn(
                  "h-10 w-10 rounded-xl bg-card border border-white/5 flex items-center justify-center text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 group",
                  social.color
                )}
                aria-label={social.label}
              >
                <social.icon size={18} className="transition-transform group-hover:scale-110" />
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
