
"use client";

import { useState, useEffect, useMemo } from "react";
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
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

const marqueeItems = [
  "TRUSTED BY 1,000+ LEARNERS",
  "NISM SERIES 8 CERTIFIED",
  "CRYPTO TRADING MASTERY",
  "INSTITUTIONAL RISK MANAGEMENT",
];

export function HeroSection() {
  const db = useFirestore();
  const heroDocRef = useMemo(() => db ? doc(db, "settings", "homepage") : null, [db]);
  const { data: heroSettings } = useDoc(heroDocRef as any);

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

  // Default content fallbacks
  const content = {
    badge: heroSettings?.heroBadge || "Empowering 1,000+ Indian Traders",
    headline: heroSettings?.heroHeadline || "Master Financial Markets",
    subheadline: heroSettings?.heroSubheadline || "With Precision",
    description: heroSettings?.heroDescription || "Learn practical strategies, clear NISM certifications, and build real market skills — without the hype. Professional education for the modern investor.",
    cta1Text: heroSettings?.cta1Text || "Start Learning Now",
    cta1Link: heroSettings?.cta1Link || "#courses",
    cta2Text: heroSettings?.cta2Text || "Book a Consultation",
    cta2Link: heroSettings?.cta2Link || "#consultation",
    instagramUrl: heroSettings?.instagramUrl || "#",
    youtubeUrl: heroSettings?.youtubeUrl || "#",
    telegramUrl: heroSettings?.telegramUrl || "#",
    facebookUrl: heroSettings?.facebookUrl || "#"
  };

  const socials = [
    { icon: Instagram, href: content.instagramUrl, label: "Instagram", colorClass: "group-hover:text-pink-500 group-hover:border-pink-500/50" },
    { icon: Youtube, href: content.youtubeUrl, label: "Youtube", colorClass: "group-hover:text-red-600 group-hover:border-red-600/50" },
    { icon: Send, href: content.telegramUrl, label: "Telegram", colorClass: "group-hover:text-sky-400 group-hover:border-sky-400/50" },
    { icon: Facebook, href: content.facebookUrl, label: "Facebook", colorClass: "group-hover:text-blue-600 group-hover:border-blue-600/50" }
  ];

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20 bg-background min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat",
        "bg-[url('https://financeschool.sirv.com/ChatGPT%20Image%20Jun%203%2C%202026%2C%2002_56_08%20PM.png')]",
        "md:bg-[url('https://financeschool.sirv.com/ChatGPT%20Image%20May%2027%2C%202026%2C%2010_08_50%20PM.png')]"
      )}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto flex flex-col items-center justify-center px-4 text-center relative z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-none border border-accent/30 bg-accent/10 px-4 py-1.5 text-[10px] md:text-xs font-bold text-accent glow-green backdrop-blur-sm uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            {content.badge}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 font-headline text-4xl font-bold tracking-tight md:text-7xl lg:text-8xl leading-[1.1] text-white uppercase"
        >
          {content.headline}
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-accent">
            {content.subheadline}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-2xl text-sm md:text-base text-white/90 font-bold leading-relaxed px-4 uppercase tracking-wider"
        >
          {content.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={content.cta1Link}>
              <Button size="lg" className="h-14 px-10 text-xs font-bold bg-primary hover:bg-primary/90 hover:glow-orange shadow-2xl shadow-primary/20 gap-2 rounded-none transition-all border border-primary/20 uppercase tracking-widest">
                {content.cta1Text}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={content.cta2Link}>
              <Button size="lg" variant="outline" className="h-14 px-10 text-xs border-white/20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-none transition-all font-bold text-white uppercase tracking-widest">
                {content.cta2Text}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dynamic Social Icons */}
        <motion.div variants={itemVariants} className="mb-10 flex gap-4 justify-center">
          {socials.map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "h-12 w-12 flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-300 group",
                social.colorClass
              )}
              aria-label={social.label}
            >
              <social.icon size={22} className="text-white/60 transition-colors duration-300" />
            </a>
          ))}
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
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-4 md:p-6 rounded-none backdrop-blur-sm border border-white/5 transition-all hover:border-accent/20">
            <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors flex items-center">
              <NumberFlow value={stats.students} />
              <span>+</span>
            </div>
            <div className="text-[9px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-accent" /> Students
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-4 md:p-6 rounded-none backdrop-blur-sm border border-white/5 transition-all hover:border-primary/20">
            <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors flex items-center">
              <NumberFlow value={stats.years} />
              <span>+</span>
            </div>
            <div className="text-[9px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" /> Years
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-4 md:p-6 rounded-none backdrop-blur-sm border border-white/5 transition-all hover:border-destructive/20">
            <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-destructive transition-colors flex items-center">
              <NumberFlow value={stats.sessions} />
              <span>+</span>
            </div>
            <div className="text-[9px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-destructive" /> Live Sessions
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group bg-black/40 p-4 md:p-6 rounded-none backdrop-blur-sm border border-white/5 transition-all hover:border-accent/20">
            <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors flex items-center">
              <NumberFlow value={stats.practical} />
              <span>%</span>
            </div>
            <div className="text-[9px] md:text-[10px] text-white/80 uppercase tracking-widest font-bold text-accent">Practical</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
