
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCheck,
  Zap,
  BookOpen,
  CircleCheck
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import NumberFlow from "@number-flow/react";

const coursesList = [
  {
    id: "nism-series-8",
    title: "NISM (SEBI) Series 8 — Equity and Derivatives",
    price: 599,
    oldPrice: 1499,
    description: "Complete NISM Series 8 syllabus covering equity and derivatives concepts. Includes recorded video lectures and study material books combo. Beginner friendly with structured learning path.",
    tags: ["NISM Prep", "Beginner", "Recorded Lectures"],
    enrollLink: "https://imjo.in/tZhckj",
    image: PlaceHolderImages.find(img => img.id === "course-nism8-full")?.imageUrl,
    features: ["Full Certification Syllabus", "Recorded High-Quality Lectures", "Study Material Books Combo", "Mock Test Guidance"]
  },
  {
    id: "nism-series-15",
    title: "NISM Series 15 — Research Analyst",
    price: 599,
    oldPrice: 1499,
    description: "Full NISM Series 15 syllabus with equity research, financial statement analysis, valuation techniques, and SEBI regulations. Explained in Hindi with easy language.",
    tags: ["Research Analyst", "Hindi", "SEBI"],
    enrollLink: "https://imjo.in/yKSphX",
    image: PlaceHolderImages.find(img => img.id === "course-nism15-full")?.imageUrl,
    features: ["Hindi Language Medium", "Equity Research Modules", "Financial Statement Analysis", "SEBI Regulations"]
  },
  {
    id: "crypto-az",
    title: "Ultimate Crypto Trading Course — A to Z",
    price: 2999,
    oldPrice: 9999,
    description: "The most complete crypto course — from market basics to advanced trade execution. Includes the proprietary LW Strategy, market structure, liquidity concepts, and real market insights.",
    tags: ["Crypto", "LW Strategy", "Live Sessions"],
    enrollLink: "https://imjo.in/QgnbDY",
    badge: "Most Popular",
    image: PlaceHolderImages.find(img => img.id === "course-crypto-az-full")?.imageUrl,
    features: ["A to Z Market Mastery", "Proprietary LW Strategy", "Liquidity & Order Blocks", "Real Market Execution"]
  },
  {
    id: "lw-strategy",
    title: "LW Strategy: Master Course",
    price: null,
    description: "Deep-dive into the LW Strategy — a proprietary trading methodology focused on liquidity, market structure, and precision entries. Designed for traders who want a systematic edge.",
    tags: ["Advanced", "Proprietary", "Systematic"],
    enrollLink: "https://imjo.in/evyGME",
    image: PlaceHolderImages.find(img => img.id === "course-lw-strategy")?.imageUrl,
    features: ["Precision Entry Models", "Institutional Liquidity", "Advanced Market Structure", "Private Strategy Community"]
  },
  {
    id: "crypto-live",
    title: "Crypto Live Classes — 1 to 1 Personalized",
    price: null,
    description: "Fully personalized one-on-one live crypto classes tailored to your pace and learning level. Direct mentorship, custom curriculum, and real-time doubt solving.",
    tags: ["Mentorship", "Personalized", "Live"],
    enrollLink: "https://imjo.in/pC6qZp",
    image: PlaceHolderImages.find(img => img.id === "course-crypto-live")?.imageUrl,
    features: ["Custom Learning Path", "1-on-1 Live Mentorship", "Direct Query Resolution", "Practical Market Trading"]
  },
  {
    id: "combo-personalized",
    title: "Crypto + Stock Market Combo Classes",
    price: null,
    description: "The ultimate combo — personalized one-on-one sessions covering both crypto trading and stock market fundamentals. Ideal for learners who want full-spectrum market knowledge.",
    tags: ["Combo", "1-to-1", "Full Spectrum"],
    enrollLink: "https://imjo.in/AcxnDv",
    image: PlaceHolderImages.find(img => img.id === "course-combo-personalized")?.imageUrl,
    features: ["Dual Market Knowledge", "Inter-Market Analysis", "Personalized Mentorship", "Career Support"]
  }
];

export default function CoursesPage() {
  const bannerImage = PlaceHolderImages.find(img => img.id === "banner-courses");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header Section with Banner */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden border-b border-white/5">
          {bannerImage && (
            <div className="absolute inset-0">
              <Image 
                src={bannerImage.imageUrl} 
                alt={bannerImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={bannerImage.imageHint}
              />
              <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
            </div>
          )}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-8xl font-headline font-bold">Our Courses</h1>
              <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-foreground">Courses</span>
              </nav>
            </motion.div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-4"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Our Courses</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                Build Real-World Skills in <br />
                <span className="text-gradient">Finance & Trading</span>
              </h2>
            </motion.div>
          </div>
        </section>

        {/* Course Cards */}
        <section className="pb-32">
          <div className="container mx-auto px-4 space-y-12">
            {coursesList.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="overflow-hidden border-white/5 bg-card/40 hover:border-primary/50 transition-all duration-500 rounded-none group shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-col lg:flex-row min-h-full">
                    {/* Thumbnail Section */}
                    <div className="lg:w-2/5 relative aspect-video lg:aspect-video min-h-[220px] overflow-hidden">
                      <Image 
                        src={course.image || "https://picsum.photos/seed/finance/800/450"} 
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60 lg:hidden" />
                      {course.badge && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-white font-bold py-1 px-3 shadow-2xl shadow-primary/40 border-0 text-[10px] rounded-none">
                            {course.badge}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-3/5 p-6 md:p-10 flex flex-col justify-center space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-primary/80 bg-primary/5 px-3 py-1 rounded-none border border-primary/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-2xl md:text-3xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/courses/${course.id}`}>{course.title}</Link>
                          </h3>
                          <div className="flex items-baseline gap-4">
                            {course.price ? (
                              <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-foreground">
                                  ₹<NumberFlow value={course.price} />
                                </span>
                                {course.oldPrice && (
                                  <span className="text-base text-muted-foreground line-through opacity-50 font-medium">₹{course.oldPrice}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-primary">Contact for Pricing</span>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {course.features.slice(0, 4).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 group/item">
                            <div className="h-4 w-4 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                              <CheckCheck className="h-2.5 w-2.5 text-primary" />
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2 mt-auto">
                        <Link href={course.enrollLink} target="_blank" className="flex-1">
                          <Button className="w-full h-12 rounded-none bg-gradient-to-t from-primary to-orange-400 shadow-xl shadow-primary/25 border border-primary/20 font-bold group transition-all">
                            Enroll Now
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                        <Link href={`/courses/${course.id}`} className="flex-1">
                          <Button variant="outline" className="w-full h-12 rounded-none border-white/10 bg-white/5 hover:bg-white/10 font-bold">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="py-32 bg-card/20 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-6xl font-headline font-bold">How it Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Your systematic journey to mastering financial markets.</p>
            </div>
            
            <div className="relative">
              <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />
              <div className="grid lg:grid-cols-3 gap-16">
                {[
                  { step: "01", title: "Choose Your Course", desc: "Select from our specialized NISM certifications or Advanced Crypto modules.", icon: BookOpen },
                  { step: "02", title: "Learn with Structured Modules", desc: "Access high-quality, structured curriculum designed for real-world application.", icon: Zap },
                  { step: "03", title: "Apply & Build Confidence", desc: "Execute strategies in live markets with expert support and community.", icon: CircleCheck }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="text-center space-y-8"
                  >
                    <div className="w-24 h-24 rounded-none bg-background border border-primary/20 flex items-center justify-center mx-auto relative shadow-2xl group hover:border-primary transition-all duration-500">
                      <item.icon className="w-10 h-10 text-primary" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-none bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xl shadow-primary/20">
                        {item.step}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-2xl font-bold">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-left mb-16 space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Questions?</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "What courses are offered at The Finance School?", a: "We offer NISM Series 8 & 15 prep, a complete Crypto A-Z course, our proprietary LW Strategy, and personalized 1-on-1 mentorship." },
                { q: "Who can enroll in these courses?", a: "From beginners wanting certifications to traders seeking an edge. No prior knowledge is required for our basic modules." },
                { q: "Is prior financial knowledge needed?", a: "No. We start from the absolute basics of market structure and build up to professional-grade concepts." },
                { q: "Are the courses more practical or theoretical?", a: "While we cover theory for exams, our focus is 100% on practical application and live market setups." },
                { q: "How are the courses delivered?", a: "Self-paced video modules for certificates, and live 1-on-1 sessions for our advanced mentorship programs." },
                { q: "What support is available?", a: "Direct mentor access for 1-on-1 students, and comprehensive study materials for all certificate students." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-8 rounded-none bg-card/30 border border-white/5 hover:border-primary/20 transition-all duration-300">
                    <h4 className="text-xl font-bold mb-4 flex items-center justify-between">
                      {item.q}
                      <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 bg-card relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
          <div className="container mx-auto px-4 text-center space-y-12">
            <div className="space-y-4">
              <span className="text-sm font-bold text-primary uppercase tracking-[0.3em]">Finance & Trading Courses</span>
              <h2 className="text-4xl md:text-7xl font-headline font-bold max-w-5xl mx-auto">
                Learn Finance, Trading & Market <br />
                Analysis with Confidence
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Link href="/courses">
                <Button size="lg" className="h-16 px-12 text-xl font-bold bg-gradient-to-t from-primary to-orange-400 rounded-none shadow-2xl shadow-primary/25">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-none border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
