
"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCheck, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  Award,
  BarChart,
  ShieldCheck
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import NumberFlow from "@number-flow/react";

const coursesData = {
  "nism-series-8": {
    title: "NISM Series 8 — Equity and Derivatives",
    fullTitle: "NISM (SEBI) Series 8 — Equity and Derivatives Lectures with Books Combo",
    price: 599,
    oldPrice: 1499,
    description: "Master the concepts of equity derivatives and prepare for the NISM Series 8 certification. This comprehensive package includes high-quality video lectures and printed study materials delivered to your doorstep.",
    longDescription: "This course is specifically designed for students and professionals looking to build a career in the financial markets. We cover everything from the basics of derivatives to complex hedging and trading strategies required for the SEBI NISM Series 8 examination.",
    duration: "20+ Hours",
    students: "850+",
    rating: "4.9/5",
    image: PlaceHolderImages.find(img => img.id === "course-nism8-full")?.imageUrl,
    enrollLink: "https://imjo.in/tZhckj",
    curriculum: [
      "Introduction to Derivatives",
      "Understanding Forwards & Futures",
      "Options Trading Strategies",
      "Risk Management in Derivatives",
      "Clearing and Settlement Process",
      "Legal and Regulatory Environment"
    ],
    highlights: ["Official NISM Syllabus", "Recorded High-Quality Lectures", "Study Material Books Combo", "Mock Test Guidance"]
  },
  "nism-series-15": {
    title: "NISM Series 15 — Research Analyst",
    fullTitle: "NISM Series 15 — Research Analyst Certification Preparation",
    price: 599,
    oldPrice: 1499,
    description: "A complete guide to becoming a certified Research Analyst. Learn equity research, financial statement analysis, and valuation techniques in easy-to-understand Hindi.",
    longDescription: "Become an expert in analyzing companies and making data-driven investment recommendations. Our Hindi-medium course breaks down complex financial concepts into simple, actionable steps for anyone wanting to work in equity research.",
    duration: "15+ Hours",
    students: "420+",
    rating: "4.8/5",
    image: PlaceHolderImages.find(img => img.id === "course-nism15-full")?.imageUrl,
    enrollLink: "https://imjo.in/yKSphX",
    curriculum: [
      "Introduction to Research Analysis",
      "Economic & Industry Analysis",
      "Financial Statement Analysis",
      "Valuation Principles & Models",
      "Fundamentals of Corporate Actions",
      "Ethics and Regulations"
    ],
    highlights: ["Hindi Language Medium", "Equity Research Modules", "Valuation Models Included", "SEBI Exam Focused"]
  },
  "crypto-az": {
    title: "Ultimate Crypto Course — A to Z",
    fullTitle: "The Ultimate Crypto Trading Course — Beginner to Advanced",
    price: 2999,
    oldPrice: 9999,
    description: "The most complete cryptocurrency trading journey from absolute basics to institutional execution using our proprietary LW Strategy.",
    longDescription: "Go beyond basic chart patterns. This course teaches you how to read market liquidity, understand the intent of large players, and execute trades with precision using our proprietary LW Strategy. Perfect for anyone serious about crypto trading.",
    duration: "40+ Hours",
    students: "1200+",
    rating: "5.0/5",
    image: PlaceHolderImages.find(img => img.id === "course-crypto-az-full")?.imageUrl,
    enrollLink: "https://imjo.in/QgnbDY",
    curriculum: [
      "Crypto Basics & Market Structure",
      "Advanced Liquidity Concepts",
      "The Proprietary LW Strategy",
      "Risk Management & Psychology",
      "Real-time Trade Execution",
      "Security & Portfolio Management"
    ],
    highlights: ["Complete A to Z Roadmap", "Exclusive LW Strategy", "Liquidity & Order Blocks", "Community Trade Access"]
  },
  "lw-strategy": {
    title: "LW Strategy: Master Course",
    fullTitle: "LW Strategy — Advanced Liquidity and Market Structure Mastery",
    price: null,
    description: "The crown jewel of our curriculum. Learn the precise strategy that identifies institutional footprints in the market.",
    longDescription: "The LW Strategy is a systematic trading methodology focused on high-probability entries based on institutional liquidity and market structure. This course is for experienced traders who want to transition from retail mindset to institutional understanding.",
    duration: "30+ Hours",
    students: "250+",
    rating: "5.0/5",
    image: PlaceHolderImages.find(img => img.id === "course-lw-strategy")?.imageUrl,
    enrollLink: "https://imjo.in/evyGME",
    curriculum: [
      "Defining the Institutional Narrative",
      "HTF vs LTF Alignment",
      "Entry Models (Precision Focus)",
      "Dealing with Stop Hunts",
      "Advanced Scaling Strategies",
      "Psychology of Professional Trading"
    ],
    highlights: ["High-Precision Entries", "Institutional Narrative", "Institutional Liquidity", "Private Alpha Group"]
  },
  "crypto-live": {
    title: "Crypto Live Classes — 1 to 1",
    fullTitle: "Personalized 1 to 1 Live Crypto Mentorship Classes",
    price: null,
    description: "Direct mentorship with an expert trader. A tailored learning experience focused on your specific goals and pace.",
    longDescription: "No more watching generic videos. Get direct access to a mentor who analyzes your trades, identifies your mistakes, and builds a custom curriculum for you. This is the fastest way to master the crypto markets.",
    duration: "Flexible (1 Month)",
    students: "50+ (Limited Seats)",
    rating: "5.0/5",
    image: PlaceHolderImages.find(img => img.id === "course-crypto-live")?.imageUrl,
    enrollLink: "https://imjo.in/pC6qZp",
    curriculum: [
      "Customized Learning Goals",
      "Live Chart Analysis Sessions",
      "Personalized Strategy Tuning",
      "Direct Doubt Solving",
      "Trade Review Workshops",
      "1-on-1 Mentorship Calls"
    ],
    highlights: ["100% Personalized", "Flexible Scheduling", "Direct Mentor Access", "Practical Trade Feedback"]
  },
  "combo-personalized": {
    title: "Crypto + Stock Combo Classes",
    fullTitle: "The Ultimate Crypto + Stock Market Personalized Combo",
    price: null,
    description: "Master both worlds. A comprehensive 1-to-1 mentorship program covering both Stocks and Cryptocurrencies.",
    longDescription: "Why choose when you can master both? This program bridges the gap between traditional stock market fundamentals and the fast-paced world of crypto. Learn to apply professional trading strategies across any asset class.",
    duration: "Flexible (2 Months)",
    students: "30+ (Exclusive)",
    rating: "5.0/5",
    image: PlaceHolderImages.find(img => img.id === "course-combo-personalized")?.imageUrl,
    enrollLink: "https://imjo.in/AcxnDv",
    curriculum: [
      "Inter-market Fundamentals",
      "Stock Technical Analysis",
      "Crypto Market Cycles",
      "Cross-Asset Risk Management",
      "Building a Hybrid Portfolio",
      "Advanced Mentorship Access"
    ],
    highlights: ["Dual Market Mastery", "Cross-Asset Strategy", "Personalized Coaching", "Full Portfolio Guidance"]
  }
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = coursesData[id as keyof typeof coursesData];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-headline font-bold">Course Not Found</h1>
          <Link href="/courses">
            <Button variant="outline">Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-card/20 relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
          <div className="container mx-auto px-4">
            <Link href="/courses" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:underline">
              <ArrowLeft size={16} /> Back to All Courses
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 font-bold uppercase tracking-widest px-4 py-1.5">
                    Professional Education
                  </Badge>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold ml-1 text-foreground">{course.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                  {course.fullTitle}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
                
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Duration</p>
                    <p className="text-lg font-bold flex items-center gap-2"><Clock size={16} className="text-primary" /> {course.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Learners</p>
                    <p className="text-lg font-bold flex items-center gap-2"><Users size={16} className="text-primary" /> {course.students}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Language</p>
                    <p className="text-lg font-bold flex items-center gap-2"><BookOpen size={16} className="text-primary" /> English/Hindi</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-6">
                   {course.price ? (
                     <div className="flex items-baseline gap-4">
                       <span className="text-5xl font-bold">₹<NumberFlow value={course.price} /></span>
                       <span className="text-2xl text-muted-foreground line-through opacity-50">₹{course.oldPrice}</span>
                     </div>
                   ) : (
                     <span className="text-3xl font-bold text-primary">Contact for Pricing</span>
                   )}
                   <Link href={course.enrollLink} target="_blank">
                      <Button size="lg" className="h-16 px-10 text-xl font-bold bg-gradient-to-t from-primary to-orange-400 rounded-2xl shadow-xl shadow-primary/25">
                        Enroll Now
                      </Button>
                   </Link>
                </div>
              </div>
              
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src={course.image || "https://picsum.photos/seed/course/800/450"} 
                  alt={course.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                    <Award className="text-primary" /> About this Course
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {course.longDescription}
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                    <BarChart className="text-primary" /> Course Curriculum
                  </h2>
                  <div className="grid gap-4">
                    {course.curriculum.map((item, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-card/40 border border-white/5 hover:border-primary/20 transition-all">
                        <span className="text-2xl font-bold text-primary/20">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-lg font-bold">{item}</span>
                        <Badge variant="outline" className="ml-auto opacity-50">Topic</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-[2rem] bg-gradient-to-b from-card to-card/50 border border-white/5 sticky top-28">
                  <h3 className="text-2xl font-headline font-bold mb-8">What's Included?</h3>
                  <div className="space-y-6 mb-8">
                    {course.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <CheckCheck className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2"><ShieldCheck size={14} /> Full Access</span>
                      <span className="text-foreground font-bold">Lifetime</span>
                    </div>
                    <Link href={course.enrollLink} target="_blank">
                      <Button className="w-full h-14 rounded-2xl bg-gradient-to-t from-primary to-orange-400 font-bold text-lg shadow-xl shadow-primary/25">
                        Get Instant Access
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
