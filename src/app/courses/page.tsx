
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCheck,
  Star,
  Zap,
  BookOpen,
  CircleCheck,
  TrendingUp
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
    features: ["Full Certification Syllabus", "Recorded High-Quality Lectures", "Study Material Books Combo", "Mock Test Guidance"],
    layout: "left"
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
    features: ["Hindi Language Medium", "Equity Research Modules", "Financial Statement Analysis", "SEBI Regulations"],
    layout: "right"
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
    features: ["A to Z Market Mastery", "Proprietary LW Strategy", "Liquidity & Order Blocks", "Real Market Execution"],
    layout: "left"
  },
  {
    id: "lw-strategy",
    title: "LW Strategy: Master Course",
    price: null, // Contact for pricing
    description: "Deep-dive into the LW Strategy — a proprietary trading methodology focused on liquidity, market structure, and precision entries. Designed for traders who want a systematic edge.",
    tags: ["Advanced", "Proprietary", "Systematic"],
    enrollLink: "https://imjo.in/evyGME",
    image: PlaceHolderImages.find(img => img.id === "course-lw-strategy")?.imageUrl,
    features: ["Precision Entry Models", "Institutional Liquidity", "Advanced Market Structure", "Private Strategy Community"],
    layout: "right"
  },
  {
    id: "crypto-live",
    title: "Crypto Live Classes — 1 to 1 Personalized",
    price: null,
    description: "Fully personalized one-on-one live crypto classes tailored to your pace and learning level. Direct mentorship, custom curriculum, and real-time doubt solving.",
    tags: ["Mentorship", "Personalized", "Live"],
    enrollLink: "https://imjo.in/pC6qZp",
    image: PlaceHolderImages.find(img => img.id === "course-crypto-live")?.imageUrl,
    features: ["Custom Learning Path", "1-on-1 Live Mentorship", "Direct Query Resolution", "Practical Market Trading"],
    layout: "left"
  },
  {
    id: "combo-personalized",
    title: "Crypto + Stock Market Combo Classes",
    price: null,
    description: "The ultimate combo — personalized one-on-one sessions covering both crypto trading and stock market fundamentals. Ideal for learners who want full-spectrum market knowledge.",
    tags: ["Combo", "1-to-1", "Full Spectrum"],
    enrollLink: "https://imjo.in/AcxnDv",
    image: PlaceHolderImages.find(img => img.id === "course-combo-personalized")?.imageUrl,
    features: ["Dual Market Knowledge", "Inter-Market Analysis", "Personalized Mentorship", "Career Support"],
    layout: "right"
  }
];

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="container mx-auto px-4 text-center">
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

        {/* Course Rows */}
        <section className="pb-32">
          <div className="container mx-auto px-4 space-y-32">
            {coursesList.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid lg:grid-cols-2 gap-16 items-center`}
              >
                <div className={`relative aspect-video rounded-[2rem] overflow-hidden group border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] ${course.layout === 'right' ? 'lg:order-2' : ''}`}>
                  <Image 
                    src={course.image || "https://picsum.photos/seed/finance/800/450"} 
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    data-ai-hint="finance trading"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                  {course.badge && (
                    <div className="absolute top-8 left-8">
                      <Badge className="bg-primary text-white font-bold py-2 px-6 shadow-2xl shadow-primary/40 border-0">
                        {course.badge}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className={`space-y-8 ${course.layout === 'right' ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap gap-3">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-primary/80 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-headline font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                      <Link href={`/courses/${course.id}`}>{course.title}</Link>
                    </h3>
                    <div className="flex items-baseline gap-4">
                      {course.price ? (
                        <div className="flex items-center gap-3">
                          <span className="text-4xl font-bold text-foreground">
                            ₹<NumberFlow value={course.price} />
                          </span>
                          {course.oldPrice && (
                            <span className="text-xl text-muted-foreground line-through opacity-50">₹{course.oldPrice}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-primary">Contact for Pricing</span>
                      )}
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 group/item">
                        <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <CheckCheck className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href={course.enrollLink} target="_blank" className="flex-1">
                      <Button className="w-full h-14 rounded-2xl bg-gradient-to-t from-primary to-orange-400 shadow-xl shadow-primary/25 border border-primary/20 text-lg font-bold group transition-all">
                        Enroll Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link href={`/courses/${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-lg font-bold">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
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
              {/* Connecting line */}
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
                    <div className="w-24 h-24 rounded-[2rem] bg-background border border-primary/20 flex items-center justify-center mx-auto relative shadow-2xl group hover:border-primary transition-all duration-500">
                      <item.icon className="w-10 h-10 text-primary" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xl shadow-primary/20">
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
                  <div className="p-8 rounded-[1.5rem] bg-card/30 border border-white/5 hover:border-primary/20 transition-all duration-300">
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
                <Button size="lg" className="h-16 px-12 text-xl font-bold bg-gradient-to-t from-primary to-orange-400 rounded-2xl shadow-2xl shadow-primary/25">
                  Get Started
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
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
