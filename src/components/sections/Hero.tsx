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
      className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20 bg-background min-h-screen flex items-center justify-center"
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
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[10px] md:text-xs font-bold text-accent glow-green backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Empowering 1,000+ Indian Traders
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 font-headline text-4xl font-bold tracking-tight md:text-7xl lg:text-8xl leading-[1] text-white"
        >
          Master Financial Markets
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">With Precision</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-2xl text-sm md:text-base text-white/90 font-medium leading-relaxed px-4"
        >
          Learn practical strategies, clear NISM certifications, and build real market skills — 
          without the hype. Professional education for the modern investor.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#courses">
              <Button size="lg" className="h-12 px-8 text-sm font-bold bg-primary hover:bg-primary/90 hover:glow-orange shadow-2xl shadow-primary/20 gap-2 rounded-xl transition-all border border-primary/20">
                Start Learning Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#consultation">
              <Button size="lg" variant="outline" className="h-12 px-8 text-sm border-white/20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl transition-all font-bold text-white">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Social Proof Marquee */}
        <motion.div 
          variants={itemVariants}
          className="w-full relative py-3 bg-black/40 backdrop-blur-md border-y border-white/10 mb-10 overflow-hidden flex"
        >
          <div className="flex animate-marquee whitespace-nowrap items-center shrink-0">
            {marqueeItems.concat(marqueeItems).map((text, i) => (
              <div key={`m1-${i}`} className="flex items-center gap-8 md:gap-12 px-4 md:px-6">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary shrink-0">{text}</span>
                <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap items-center shrink-0">
            {marqueeItems.concat(marqueeItems).map((text, i) => (
              <div key={`m2-${i}`} className="flex items-center gap-8 md:gap-12 px-4 md:px-6">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary shrink-0">{text}</span>
                <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl px-2"
        >
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-3 md:p-5 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-accent/20">
            <div className="text-xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors flex items-center">
              <NumberFlow value={stats.students} />
              <span>+</span>
            </div>
            <div className="text-[8px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-accent" /> Students
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-3 md:p-5 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-primary/20">
            <div className="text-xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors flex items-center">
              <NumberFlow value={stats.years} />
              <span>+</span>
            </div>
            <div className="text-[8px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" /> Years
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-3 md:p-5 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-destructive/20">
            <div className="text-xl md:text-3xl font-bold text-white group-hover:text-destructive transition-colors flex items-center">
              <NumberFlow value={stats.sessions} />
              <span>+</span>
            </div>
            <div className="text-[8px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-destructive" /> Live Sessions
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-3 md:p-5 rounded-xl backdrop-blur-sm border border-white/5 transition-all hover:border-accent/20">
            <div className="text-xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors flex items-center">
              <NumberFlow value={stats.practical} />
              <span>%</span>
            </div>
            <div className="text-[8px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold text-accent">Practical</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
