
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, Star, ArrowRight, Zap, BookOpen, BarChart3 } from "lucide-react";
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
    icon: BookOpen
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
    popular: true
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
    icon: Zap
  }
];

export function CoursesSection() {
  return (
    <section id="courses" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Course Marketplace</span>
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
              <Card className={`relative h-full overflow-hidden border-white/5 bg-card/40 flex flex-col group hover:border-primary/50 transition-all duration-500 rounded-[2.5rem] ${course.popular ? 'ring-2 ring-primary shadow-2xl shadow-primary/20' : ''}`}>
                {course.popular && (
                  <div className="absolute top-6 right-6 z-10">
                    <Badge className="bg-primary text-white font-bold py-1.5 px-4 shadow-xl border-0">MOST POPULAR</Badge>
                  </div>
                )}
                
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={course.image || "https://picsum.photos/seed/finance/800/600"} 
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    data-ai-hint="finance education"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <course.icon size={22} />
                    </div>
                    <span className="text-xs font-bold text-primary tracking-widest uppercase">{course.tag}</span>
                  </div>
                  <CardTitle className="font-headline text-3xl group-hover:text-primary transition-colors">
                    <Link href={`/courses/${course.id}`}>{course.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-base line-clamp-2">{course.description}</CardDescription>
                  
                  <div className="flex items-baseline gap-4 py-2">
                    <span className="text-4xl font-bold">
                      ₹<NumberFlow value={course.price} />
                    </span>
                    <span className="text-lg text-muted-foreground line-through opacity-50">₹{course.oldPrice}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow space-y-4">
                  <div className="h-px bg-white/5 w-full mb-6" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">What's Included</p>
                  <div className="space-y-3">
                    {course.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <CheckCheck className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="p-6 pt-0 mt-auto">
                  <Link href={`/courses/${course.id}`}>
                    <Button className={`w-full h-14 rounded-2xl text-lg font-bold group transition-all duration-300 ${
                      course.popular 
                        ? 'bg-gradient-to-t from-primary to-orange-400 shadow-xl shadow-primary/25 border-primary/20' 
                        : 'bg-gradient-to-t from-neutral-800 to-neutral-700 hover:from-primary hover:to-orange-400 shadow-xl shadow-black/50 border-white/10'
                    }`}>
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/courses">
            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 gap-2 text-lg font-bold">
              Explore All Trading Courses
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
