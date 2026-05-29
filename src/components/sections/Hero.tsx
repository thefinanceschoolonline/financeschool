"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap
} from "lucide-react";
import Link from "next/link";
import NumberFlow from "@number-flow/react";

const marqueeItems = [
  "TRUSTED BY 1,000+ LEARNERS",
  "NISM SERIES 8 CERTIFIED",
  "CRYPTO TRADING MASTERY",
  "INSTITUTIONAL RISK MANAGEMENT",
];

export function HeroSection() {
  const [stats, setStats] = useState({
    students: 0,
    years: 0,
    sessions: 0,
    practical: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        students: 1200,
        years: 6,
        sessions: 42,
        practical: 100
      });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section
      className="relative overflow-hidden pt-20 pb-6 md:pt-24 md:pb-10 bg-background min-h-[90vh] flex items-start justify-center"
      style={{
        backgroundImage: "url('https://financeschool.sirv.com/ChatGPT%20Image%20May%2027%2C%202026%2C%2010_08_50%20PM.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto flex flex-col items-center justify-center px-4 text-center relative z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-3 md:mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[10px] md:text-xs font-bold text-accent glow-green backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Empowering 1,000+ Indian Traders
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="mb-3 md:mb-4 font-headline text-3xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-[1.1] text-white"
        >
          Master Financial Markets
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">With Precision</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mb-4 md:mb-6 max-w-xl text-sm md:text-base text-white/90 font-medium leading-relaxed"
        >
          Learn practical strategies, clear NISM certifications, and build real market skills — 
          without the hype. Professional education for the modern investor.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#courses">
              <Button size="lg" className="h-11 px-6 text-xs md:text-sm font-bold bg-primary hover:bg-primary/90 hover:glow-orange shadow-2xl shadow-primary/20 gap-2 rounded-xl transition-all border border-primary/20">
                Start Learning Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#consultation">
              <Button size="lg" variant="outline" className="h-11 px-6 text-xs md:text-sm border-white/20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl transition-all font-bold text-white">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Social Proof Marquee */}
        <motion.div 
          variants={itemVariants}
          className="w-full relative py-2 md:py-3 bg-black/40 backdrop-blur-md border-y border-white/10 mb-6 md:mb-8 overflow-hidden flex"
        >
          <div className="flex animate-marquee whitespace-nowrap items-center shrink-0">
            {marqueeItems.map((text, i) => (
              <div key={`m1-${i}`} className="flex items-center gap-6 md:gap-10 px-3 md:px-5">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary shrink-0">{text}</span>
                <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap items-center shrink-0">
            {marqueeItems.map((text, i) => (
              <div key={`m2-${i}`} className="flex items-center gap-6 md:gap-10 px-3 md:px-5">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary shrink-0">{text}</span>
                <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-3xl"
        >
          <div className="flex flex-col items-center gap-0.5 group bg-black/40 p-2 md:p-3 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-accent/20">
            <div className="text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors flex items-center">
              <NumberFlow value={stats.students} />
              <span>+</span>
            </div>
            <div className="text-[8px] md:text-[9px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-accent" /> Students
            </div>
          </div>
          <div className="flex flex-col items-center gap-0.5 group bg-black/40 p-2 md:p-3 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-primary/20">
            <div className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors flex items-center">
              <NumberFlow value={stats.years} />
              <span>+</span>
            </div>
            <div className="text-[8px] md:text-[9px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-primary" /> Years
            </div>
          </div>
          <div className="flex flex-col items-center gap-0.5 group bg-black/40 p-2 md:p-3 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-destructive/20">
            <div className="text-lg md:text-xl font-bold text-white group-hover:text-destructive transition-colors flex items-center">
              <NumberFlow value={stats.sessions} />
              <span>+</span>
            </div>
            <div className="text-[8px] md:text-[9px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1">
              <TrendingUp className="w-2.5 h-2.5 text-destructive" /> Live Sessions
            </div>
          </div>
          <div className="flex flex-col items-center gap-0.5 group bg-black/40 p-2 md:p-3 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-accent/20">
            <div className="text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors flex items-center">
              <NumberFlow value={stats.practical} />
              <span>%</span>
            </div>
            <div className="text-[8px] md:text-[9px] text-white/80 uppercase tracking-widest font-bold text-accent">Practical</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}