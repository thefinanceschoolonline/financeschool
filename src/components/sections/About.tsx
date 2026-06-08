
"use client";

import { motion } from "framer-motion";
import { Shield, Target, Award, Quote } from "lucide-react";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { useState, useEffect, useMemo } from "react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

export function AboutSection() {
  const db = useFirestore();
  const heroDocRef = useMemo(() => db ? doc(db, "settings", "homepage") : null, [db]);
  const { data: heroSettings } = useDoc(heroDocRef as any);

  const [stats, setStats] = useState({
    students: 0,
    years: 0
  });

  const content = {
    headline: heroSettings?.aboutHeadline || "Helping You Learn Stock Market Trading the Right Way",
    description: heroSettings?.aboutDescription || "At The Finance School, we focus on practical stock market education designed for real-world results. Our goal is to help beginners and aspiring traders understand market fundamentals, technical analysis, and risk management with clarity.",
    points: [
      { 
        icon: Shield, 
        title: heroSettings?.aboutPhilosophy1Title || "Ethical Learning", 
        desc: heroSettings?.aboutPhilosophy1Desc || "No hype, no shortcuts. Just pure market logic and data-driven strategies." 
      },
      { 
        icon: Target, 
        title: heroSettings?.aboutPhilosophy2Title || "Goal Oriented", 
        desc: heroSettings?.aboutPhilosophy2Desc || "Whether it's NISM certification or wealth building, we stay focused on your target." 
      },
      { 
        icon: Award, 
        title: heroSettings?.aboutPhilosophy3Title || "Verified Skills", 
        desc: heroSettings?.aboutPhilosophy3Desc || "Our curriculum is vetted by industry experts with 6+ years of active trading experience." 
      }
    ],
    stat1Value: heroSettings?.aboutStat1Value || 1200,
    stat2Value: heroSettings?.aboutStat2Value || 6
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        students: content.stat1Value,
        years: content.stat2Value
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [content.stat1Value, content.stat2Value]);

  const numberTransition = { 
    duration: 10000, 
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)' 
  };

  return (
    <section id="about" className="py-24 bg-background overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-none overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="https://financeschool.sirv.com/ChatGPT%20Image%20Jun%203%2C%202026%2C%2002_32_14%20PM.png" 
                alt="The Finance School Mentor" 
                fill 
                className="object-cover"
                data-ai-hint="stock trader mentor"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 p-6 bg-card rounded-none border border-white/10 shadow-2xl hidden md:block">
              <Quote className="text-primary mb-4 w-8 h-8 opacity-50" />
              <p className="text-sm italic leading-relaxed text-muted-foreground mb-4">
                "We don't just teach trading, we build the mindset required to survive and thrive in volatile markets."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-primary/20 flex items-center justify-center text-primary font-bold">F</div>
                <div>
                  <p className="font-bold text-sm">Finance School Founder</p>
                  <p className="text-xs text-muted-foreground">Certified Research Analyst</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 mb-8">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Our Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tight">{content.headline}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
              {content.description}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {content.points.map((val, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <val.icon className="text-primary w-5 h-5" />
                    <h4 className="font-bold text-lg uppercase tracking-tight">{val.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{val.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/5 flex gap-12">
               <div>
                 <div className="text-3xl font-bold flex items-center">
                    <NumberFlow 
                      value={stats.students} 
                      transition={numberTransition} 
                    />+
                 </div>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Students Trained</p>
               </div>
               <div>
                 <div className="text-3xl font-bold flex items-center">
                    <NumberFlow 
                      value={stats.years} 
                      transition={numberTransition} 
                    />+
                 </div>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Years Experience</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
