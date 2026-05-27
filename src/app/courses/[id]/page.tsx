
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
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  Award,
  BarChart,
  ShieldCheck,
  CheckCheck,
  Lock,
  PlayCircle,
  FileText
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
    longDescription: "This course is specifically designed for students and professionals looking to build a career in the financial markets. We cover everything from the basics of derivatives to complex hedging and trading strategies required for the SEBI NISM Series 8 examination.\n\nYou will gain deep insights into the forward and futures market, option pricing, and various risk management techniques used by institutional traders.",
    duration: "20+ Hours",
    students: "850+",
    rating: "4.9/5",
    image: PlaceHolderImages.find(img => img.id === "course-nism8-full")?.imageUrl,
    enrollLink: "https://imjo.in/tZhckj",
    curriculum: [
      { title: "Introduction to Derivatives", duration: "2h 15m", lessons: ["What are Derivatives?", "History & Evolution", "Market Participants", "Economic Function"] },
      { title: "Understanding Forwards & Futures", duration: "3h 45m", lessons: ["Forward Contracts", "Futures Terminology", "Pricing of Futures", "Hedged vs Speculative Trades"] },
      { title: "Options Trading Strategies", duration: "5h 20m", lessons: ["Call vs Put", "Option Greeks", "Spreads & Straddles", "Institutional Entry Models"] },
      { title: "Risk Management in Derivatives", duration: "4h 10m", lessons: ["Value at Risk (VaR)", "Margining System", "Risk Exposure Levels", "Stop Loss Strategies"] },
      { title: "Clearing and Settlement Process", duration: "2h 30m", lessons: ["Clearing Corporations", "Mark-to-Market", "Settlement Mechanism"] },
      { title: "Legal and Regulatory Environment", duration: "2h 00m", lessons: ["SEBI Act", "Exchange Regulations", "Client Protection"] }
    ],
    highlights: ["Official NISM Syllabus", "Recorded High-Quality Lectures", "Study Material Books Combo", "Mock Test Guidance"]
  },
  "nism-series-15": {
    title: "NISM Series 15 — Research Analyst",
    fullTitle: "NISM Series 15 — Research Analyst Certification Preparation",
    price: 599,
    oldPrice: 1499,
    description: "A complete guide to becoming a certified Research Analyst. Learn equity research, financial statement analysis, and valuation techniques in easy-to-understand Hindi.",
    longDescription: "Become an expert in analyzing companies and making data-driven investment recommendations. Our Hindi-medium course breaks down complex financial concepts into simple, actionable steps for anyone wanting to work in equity research.\n\nWe focus on the practical side of research analysis, helping you build your own research reports and understand industry dynamics.",
    duration: "15+ Hours",
    students: "420+",
    rating: "4.8/5",
    image: PlaceHolderImages.find(img => img.id === "course-nism15-full")?.imageUrl,
    enrollLink: "https://imjo.in/yKSphX",
    curriculum: [
      { title: "Introduction to Research Analysis", duration: "1h 45m", lessons: ["Role of a Research Analyst", "Types of Research", "Market Sentiment"] },
      { title: "Economic & Industry Analysis", duration: "2h 30m", lessons: ["Top-Down Approach", "Sectoral Analysis", "Macro Factors"] },
      { title: "Financial Statement Analysis", duration: "4h 00m", lessons: ["Balance Sheet Deep Dive", "P&L Interpretation", "Cash Flow Analysis"] },
      { title: "Valuation Principles & Models", duration: "3h 30m", lessons: ["DCF Method", "Relative Valuation", "Intrinsic Value Calculation"] },
      { title: "Fundamentals of Corporate Actions", duration: "1h 50m", lessons: ["Dividends & Splits", "Rights Issue", "Buybacks"] },
      { title: "Ethics and Regulations", duration: "1h 30m", lessons: ["SEBI (Research Analyst) Regs", "Code of Conduct", "Conflicts of Interest"] }
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
      { title: "Crypto Basics & Market Structure", duration: "4h 00m", lessons: ["Blockchain Fundamentals", "Exchanges vs DEXs", "Order Books & Liquidity"] },
      { title: "Advanced Liquidity Concepts", duration: "6h 30m", lessons: ["Institutional Footprints", "Liquidity Voids", "Premium vs Discount Zones"] },
      { title: "The Proprietary LW Strategy", duration: "10h 00m", lessons: ["Strategy Mechanics", "Entry Checklists", "Timeframe Alignment", "Stop Loss Placement"] },
      { title: "Risk Management & Psychology", duration: "8h 00m", lessons: ["Position Sizing", "The Trader's Mindset", "Overtrading & Recovery"] },
      { title: "Real-time Trade Execution", duration: "6h 00m", lessons: ["Live Chart Mapping", "Identifying Setups", "Managing Active Trades"] },
      { title: "Security & Portfolio Management", duration: "5h 30m", lessons: ["Cold Storage", "Security Audits", "Diversification Strategy"] }
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
      { title: "Defining the Institutional Narrative", duration: "4h 00m", lessons: ["Smart Money Theory", "Market Cycle Archetypes", "The Institutional Narrative"] },
      { title: "HTF vs LTF Alignment", duration: "5h 00m", lessons: ["Top-Down Narrative", "Structural Shifts", "Point of Interest (POI)"] },
      { title: "Entry Models (Precision Focus)", duration: "8h 00m", lessons: ["BOS vs CHoCH", "Order Blocks & Breakers", "FVG Entry Models"] },
      { title: "Dealing with Stop Hunts", duration: "5h 00m", lessons: ["Liquidity Grabs", "Inducement Areas", "Wicks vs Bodies"] },
      { title: "Advanced Scaling Strategies", duration: "4h 00m", lessons: ["Scaling In", "Partial Profits", "Trailing with Structure"] },
      { title: "Psychology of Professional Trading", duration: "4h 00m", lessons: ["Performance Tracking", "The Professional Edge", "Systematic Discipline"] }
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
      { title: "Customized Learning Goals", duration: "Variable", lessons: ["Goal Setting", "Initial Assessment", "Skill Mapping"] },
      { title: "Live Chart Analysis Sessions", duration: "Variable", lessons: ["Screen Sharing Sessions", "Real-time Setup Scanning", "Market Analysis"] },
      { title: "Personalized Strategy Tuning", duration: "Variable", lessons: ["Optimizing Entry rules", "Risk Adjustment", "Strategy Refinement"] },
      { title: "Direct Doubt Solving", duration: "Variable", lessons: ["Concept Clarification", "Q&A Workshops", "Case Studies"] },
      { title: "Trade Review Workshops", duration: "Variable", lessons: ["Analyzing Past Trades", "Fixing Psychology Errors", "Execution Review"] },
      { title: "1-on-1 Mentorship Calls", duration: "Variable", lessons: ["Weekly Review", "Psychological Coaching", "Career Advice"] }
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
      { title: "Inter-market Fundamentals", duration: "Variable", lessons: ["Stocks vs Crypto", "Correlation Analysis", "Market Sentiment"] },
      { title: "Stock Technical Analysis", duration: "Variable", lessons: ["Price Action Basics", "Indicator Strategy", "Sector Rotation"] },
      { title: "Crypto Market Cycles", duration: "Variable", lessons: ["Bitcoin Cycles", "Altcoin Analysis", "Stablecoins & Yield"] },
      { title: "Cross-Asset Risk Management", duration: "Variable", lessons: ["Balanced Allocation", "Hedged Strategies", "Global Risk Outlook"] },
      { title: "Building a Hybrid Portfolio", duration: "Variable", lessons: ["Long-term Wealth", "Active Income Trading", "Taxation Basics"] },
      { title: "Advanced Mentorship Access", duration: "Variable", lessons: ["Executive Coaching", "Market Alpha Access", "VIP Community"] }
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
        {/* Header Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <Link href="/courses" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-4 hover:underline transition-all">
            <ArrowLeft size={16} /> Back to All Courses
          </Link>
        </div>

        {/* Hero Section */}
        <section className="pb-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg">
                    Course Overview
                  </Badge>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold">{course.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                  {course.fullTitle}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-8 py-4 border-y border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Duration</p>
                      <p className="text-sm font-bold">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Learners</p>
                      <p className="text-sm font-bold">{course.students}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Access</p>
                      <p className="text-sm font-bold">Lifetime</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
              >
                <Image 
                  src={course.image || "https://picsum.photos/seed/course/800/450"} 
                  alt={course.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-20 w-20 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                     <PlayCircle size={48} />
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Left Column: Details & Curriculum */}
              <div className="lg:col-span-2 space-y-20">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Award className="text-primary w-6 h-6" />
                    <h2 className="text-3xl font-headline font-bold">About this Course</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line bg-card/30 p-8 rounded-3xl border border-white/5">
                    {course.longDescription}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BarChart className="text-primary w-6 h-6" />
                      <h2 className="text-3xl font-headline font-bold">Course Curriculum</h2>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      {course.curriculum.length} Chapters
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {course.curriculum.map((chapter, i) => (
                      <AccordionItem 
                        key={i} 
                        value={`chapter-${i}`} 
                        className="border border-white/5 rounded-2xl bg-card/40 overflow-hidden hover:border-primary/20 transition-all data-[state=open]:border-primary/30"
                      >
                        <AccordionTrigger className="px-6 py-5 hover:no-underline">
                          <div className="flex items-center gap-6 text-left w-full pr-4">
                            <span className="text-2xl font-bold text-primary/20 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                            <div className="flex-grow">
                              <h4 className="text-lg font-bold">{chapter.title}</h4>
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">
                                {chapter.lessons.length} Lessons • {chapter.duration}
                              </p>
                            </div>
                            <div className="shrink-0 text-muted-foreground">
                              {i === 0 ? <PlayCircle size={18} className="text-primary" /> : <Lock size={18} />}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                          <div className="space-y-2 pl-12">
                            {chapter.lessons.map((lesson, j) => (
                              <div key={j} className="flex items-center justify-between py-3 px-4 rounded-xl bg-background/50 border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                  <FileText size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                  <span className="text-sm font-medium">{lesson}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                   <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Video</span>
                                   {i === 0 && j === 0 ? (
                                     <Badge variant="outline" className="text-[10px] text-primary border-primary/20 bg-primary/5">Free Preview</Badge>
                                   ) : (
                                     <Lock size={12} className="text-muted-foreground opacity-50" />
                                   )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Right Column: Sticky Pricing & CTA */}
              <div className="relative">
                <div className="lg:sticky lg:top-28 space-y-8">
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-b from-card to-card/50 border border-white/10 shadow-2xl">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-primary uppercase tracking-widest">Enrollment Fee</p>
                        {course.price ? (
                          <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-bold">₹<NumberFlow value={course.price} /></span>
                            <span className="text-2xl text-muted-foreground line-through opacity-50">₹{course.oldPrice}</span>
                          </div>
                        ) : (
                          <h3 className="text-3xl font-bold">Contact for Pricing</h3>
                        )}
                      </div>

                      <div className="pt-6 border-t border-white/5 space-y-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">What's Included:</p>
                        <div className="space-y-4">
                          {course.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <CheckCheck className="h-3.5 w-3.5 text-primary" />
                              </div>
                              <span className="text-sm font-bold text-muted-foreground">{highlight}</span>
                            </div>
                          ))}
                          <div className="flex items-center gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground">Lifetime Course Access</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <Link href={course.enrollLink} target="_blank">
                          <Button className="w-full h-16 rounded-2xl bg-gradient-to-t from-primary to-orange-400 font-bold text-xl shadow-[0_20px_40px_-12px_rgba(249,115,22,0.3)] hover:translate-y-[-2px] transition-all">
                            Get Started Now
                          </Button>
                        </Link>
                        <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em] font-bold">
                          Safe & Secure Checkout
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-card/20 border border-white/5">
                    <h4 className="font-bold mb-4">Need Help?</h4>
                    <p className="text-sm text-muted-foreground mb-6">Not sure if this course is right for you? Talk to our mentors.</p>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full rounded-xl border-white/10 h-12 font-bold">
                        Talk to an Advisor
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
