"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star, BookOpen, Layers, Terminal, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const courses = [
  {
    id: "nism-8",
    title: "NISM Series 8 – Equity & Derivatives",
    description: "Complete lectures with books combo. Perfect for beginners entering the certification space.",
    price: "599",
    oldPrice: "1,499",
    features: ["NISM Series 8 Complete Syllabus", "Equity & Derivatives Concepts", "Recorded Video Lectures", "Study Material Included", "Beginner Friendly"],
    image: PlaceHolderImages.find(img => img.id === "course-nism8-full")?.imageUrl,
    tag: "Certification",
    icon: BookOpen
  },
  {
    id: "nism-15",
    title: "NISM Series 15 – Research Analyst",
    description: "Full syllabus coverage with simple Hindi explanations. Mastering financial statements and valuation.",
    price: "599",
    oldPrice: "1,499",
    features: ["NISM Series 15 Full Syllabus", "Equity Research & Valuation", "Financial Statement Analysis", "SEBI Regulations Covered", "Hindi + Easy Explanation"],
    image: PlaceHolderImages.find(img => img.id === "course-nism15-full")?.imageUrl,
    tag: "Professional",
    icon: Layers,
    popular: true
  },
  {
    id: "crypto-az",
    title: "Ultimate Crypto Trading Course",
    description: "Beginner to Advanced journey including our exclusive LW Strategy for market liquidity.",
    price: "2,999",
    oldPrice: "9,999",
    features: ["Beginner to Advanced Crypto", "LW Strategy Included", "Market Structure & Liquidity", "Trade Setup & Execution", "Real Market Insights"],
    image: PlaceHolderImages.find(img => img.id === "course-crypto-az-full")?.imageUrl,
    tag: "Advanced",
    icon: Terminal
  }
];

const FALLBACK_IMAGE = "https://picsum.photos/seed/finance-placeholder/800/600";

export function CoursesSection() {
  return (
    <section id="courses" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">Choose Your <span className="text-primary">Success Path</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our courses focus on practical strategies and live market understanding, helping you clear certifications and trade with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`relative h-full overflow-hidden border-white/5 bg-background flex flex-col group hover:border-primary/50 transition-all duration-300 ${course.popular ? 'ring-2 ring-primary shadow-2xl shadow-primary/20' : ''}`}>
                {course.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-primary text-primary-foreground font-bold">MOST POPULAR</Badge>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={course.image || FALLBACK_IMAGE} 
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="finance education"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 text-primary">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <span className="text-xs text-white ml-1 font-bold">5.0</span>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <course.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold text-primary tracking-widest uppercase">{course.tag}</span>
                  </div>
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    {course.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col items-stretch border-t border-white/5 pt-6">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <span className="text-xs text-muted-foreground line-through block">₹{course.oldPrice}</span>
                      <span className="text-3xl font-bold">₹{course.price}</span>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">
                      Save {Math.round((1 - parseInt(course.price.replace(',',''))/parseInt(course.oldPrice.replace(',',''))) * 100)}%
                    </Badge>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 h-12 font-bold text-lg">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 gap-2">
            Explore More Stock Market & Trading Courses
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
