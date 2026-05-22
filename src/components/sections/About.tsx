"use client";

import { motion } from "framer-motion";
import { Shield, Target, Award, Quote } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/trading-team/800/800" 
                alt="Our School" 
                fill 
                className="object-cover"
                data-ai-hint="stock trader office"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 p-6 bg-card rounded-2xl border border-white/10 shadow-2xl hidden md:block">
              <Quote className="text-primary mb-4 w-8 h-8 opacity-50" />
              <p className="text-sm italic leading-relaxed text-muted-foreground mb-4">
                "We don't just teach trading, we build the mindset required to survive and thrive in volatile markets."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">F</div>
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
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Helping You Learn <span className="text-primary">Stock Market Trading</span> the Right Way</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At The Finance School, we focus on practical stock market education designed for real-world results. Our goal is to help beginners and aspiring traders understand market fundamentals, technical analysis, and risk management with clarity.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Ethical Learning", desc: "No hype, no shortcuts. Just pure market logic and data-driven strategies." },
                { icon: Target, title: "Goal Oriented", desc: "Whether it's NISM certification or wealth building, we stay focused on your target." },
                { icon: Award, title: "Verified Skills", desc: "Our curriculum is vetted by industry experts with 6+ years of active trading experience." }
              ].map((val, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <val.icon className="text-primary w-5 h-5" />
                    <h4 className="font-bold text-lg">{val.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{val.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/5 flex gap-12">
               <div>
                 <p className="text-3xl font-bold">1,208+</p>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Students Trained</p>
               </div>
               <div>
                 <p className="text-3xl font-bold">6+</p>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Years Experience</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
