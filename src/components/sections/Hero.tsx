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
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 trading-grid"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(5, 8, 22, 0.8), rgba(5, 8, 22, 0.95)), url('https://financeschool.sirv.com/ChatGPT%20Image%20May%2027%2C%202026%2C%2010_08_50%20PM.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/20 blur-[100px] rounded-full" 
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent glow-green">
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
          className="mb-10 max-w-3xl text-lg md:text-xl text-muted-foreground font-medium"
        >
          Learn practical strategies, clear NISM certifications, and build real market skills — 
          without the hype. Professional education for the modern investor.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#courses">
              <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 hover:glow-orange shadow-2xl shadow-primary/25 gap-2 rounded-2xl transition-all">
                Start Learning Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#consultation">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 bg-white/5 hover:bg-accent/10 hover:border-accent/50 hover:text-accent backdrop-blur-md rounded-2xl transition-all">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-12 border-t border-white/10 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center gap-1 group">
            <div className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">1,200+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-accent" /> Students
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group">
            <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">6+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" /> Years
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group">
            <div className="text-3xl font-bold text-foreground group-hover:text-destructive transition-colors">42+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-destructive" /> Live Sessions
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group">
            <div className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold text-accent">Practical</div>
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
                  "h-10 w-10 rounded-xl bg-card border border-white/5 flex items-center justify-center text-muted-foreground transition-all hover:border-accent/50 hover:bg-accent/5 group",
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