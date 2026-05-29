"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, ArrowRight, Zap, BookOpen, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import NumberFlow from "@number-flow/react";

const featuredCourses = [
  {
    id: "nism-series-8",
    title: "NISM Series 8",
    description: "Complete lectures with books combo. Perfect for beginners entering the certification space.",
    price: 599,
    oldPrice: 1499,
    features: ["Certification Syllabus", "Recorded High-Quality Lectures", "Study Material Books Combo", "Mock Test Guidance"],
    image: PlaceHolderImages.find(img => img.id === "course-nism8-full")?.imageUrl,
    tag: "Certification",
    icon: BookOpen,
    accent: "hsl(var(--accent))"
  },
  {
    id: "nism-series-15",
    title: "Research Analyst",
    description: "Full syllabus coverage with simple Hindi explanations. Mastering financial statements and valuation.",
    price: 599,
    oldPrice: 1499,
    features: ["Hindi Language Medium", "Equity Research & Valuation", "Financial Analysis", "SEBI Exam Focused"],
    image: PlaceHolderImages.find(img => img.id === "course-nism15-full")?.imageUrl,
    tag: "Professional",
    icon: BarChart3,
    popular: true,
    accent: "hsl(var(--primary))"
  },
  {
    id: "crypto-az",
    title: "Crypto Trading A to Z",
    description: "Beginner to Advanced journey including our exclusive LW Strategy for market liquidity.",
    price: 2999,
    oldPrice: 9999,
    features: ["A to Z Roadmap", "Exclusive LW Strategy", "Liquidity & Order Blocks", "Live Session Access"],
    image: PlaceHolderImages.find(img => img.id === "course-crypto-az-full")?.imageUrl,
    tag: "Advanced",
    icon: Zap,
    accent: "hsl(var(--destructive))"
  }
];

export function CoursesSection() {
  return (
    <section id="courses" className="py-32 bg-background relative overflow-hidden trading-grid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 space-y-4">
          <span className="text-xs font-bold text-accent uppercase tracking-[0.3em]">Course Marketplace</span>
          <h2 className="text-4xl md:text-7xl font-headline font-bold">
            Choose Your <span className="text-gradient">Success Path</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our courses focus on practical strategies and live market understanding, helping you clear certifications and trade with confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className={`relative h-full overflow-hidden border-white/5 bg-card/40 flex flex-col group hover:border-accent/30 transition-all duration-500 rounded-3xl ${course.popular ? 'ring-1 ring-primary/30 shadow-2xl shadow-primary/10' : ''}`}>
                {course.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-primary text-white font-bold py-1 px-3 shadow-xl border-0 text-[10px] glow-orange">MOST POPULAR</Badge>
                  </div>
                )}
                
                <div className="relative h-60 overflow-hidden">
                  <Image 
                    src={course.image || "https://picsum.photos/seed/finance/800/600"} 
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                </div>

                <CardHeader className="space-y-3 p-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <course.icon size={18} style={{ color: course.accent }} />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">{course.tag}</span>
                  </div>
                  <CardTitle className="font-headline text-2xl group-hover:text-accent transition-colors">
                    <Link href={`/courses/${course.id}`}>{course.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
                  
                  <div className="flex items-baseline gap-3 py-1">
                    <span className="text-3xl font-bold">
                      ₹<NumberFlow value={course.price} />
                    </span>
                    <span className="text-base text-muted-foreground line-through opacity-50">₹{course.oldPrice}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow space-y-4 px-6 pb-6 pt-0">
                  <div className="h-px bg-white/5 w-full mb-4" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">What's Included</p>
                  <div className="space-y-2">
                    {course.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                          <CheckCheck className="h-3 w-3 text-accent" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="p-6 pt-0 mt-auto">
                  <Link href={`/courses/${course.id}`}>
                    <Button className={`w-full h-12 rounded-2xl text-base font-bold group transition-all duration-300 ${
                      course.popular 
                        ? 'bg-primary hover:glow-orange shadow-xl shadow-primary/25 border-primary/20' 
                        : 'bg-card border-white/10 hover:bg-accent hover:text-white hover:glow-green'
                    }`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}