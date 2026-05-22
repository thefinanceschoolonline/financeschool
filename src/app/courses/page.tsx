
"use client";

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
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  Users, 
  Zap, 
  CircleCheck,
  HelpCircle
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const coursesList = [
  {
    title: "NISM (SEBI) SERIES 8 — EQUITY AND DERIVATIVES LECTURES WITH BOOKS COMBO",
    price: "₹599",
    description: "Complete NISM Series 8 syllabus covering equity and derivatives concepts. Includes recorded video lectures and study material books combo. Beginner friendly with structured learning path.",
    tags: ["NISM Prep", "Beginner", "Recorded Lectures", "Study Material"],
    enrollLink: "https://imjo.in/tZhckj",
    image: PlaceHolderImages.find(img => img.id === "course-nism8-full")?.imageUrl,
    layout: "left"
  },
  {
    title: "NISM SERIES 15 — RESEARCH ANALYST EXAMINATION",
    price: "₹599",
    description: "Full NISM Series 15 syllabus with equity research, financial statement analysis, valuation techniques, and SEBI regulations. Explained in Hindi with easy language.",
    tags: ["NISM Prep", "Research Analyst", "Hindi", "SEBI"],
    enrollLink: "https://imjo.in/yKSphX",
    image: PlaceHolderImages.find(img => img.id === "course-nism15-full")?.imageUrl,
    layout: "right"
  },
  {
    title: "THE ULTIMATE CRYPTO TRADING COURSE — A TO Z: Beginner to Advanced",
    price: "₹2,999",
    description: "The most complete crypto course — from market basics to advanced trade execution. Includes the proprietary LW Strategy, market structure, liquidity concepts, trade setup, and real market insights with live session exposure.",
    tags: ["Crypto", "Beginner to Advanced", "LW Strategy", "Live Sessions"],
    enrollLink: "https://imjo.in/QgnbDY",
    badge: "Most Popular",
    image: PlaceHolderImages.find(img => img.id === "course-crypto-az-full")?.imageUrl,
    layout: "left"
  },
  {
    title: "LW STRATEGY: MASTER COURSE",
    price: "Contact for pricing",
    description: "Deep-dive into the LW Strategy — a proprietary trading methodology focused on liquidity, market structure, and precision entries. Designed for traders who want a systematic, repeatable edge.",
    tags: ["Strategy", "Advanced", "Proprietary Method", "Systematic Trading"],
    enrollLink: "https://imjo.in/evyGME",
    image: PlaceHolderImages.find(img => img.id === "course-lw-strategy")?.imageUrl,
    layout: "right"
  },
  {
    title: "CRYPTO LIVE CLASSES — 1 TO 1 PERSONALIZED",
    price: "Contact for pricing",
    description: "Fully personalized one-on-one live crypto classes tailored to your pace and learning level. Direct mentorship, custom curriculum, and real-time doubt solving with an expert trader.",
    tags: ["1-to-1", "Personalized", "Live", "Mentorship"],
    enrollLink: "https://imjo.in/pC6qZp",
    image: PlaceHolderImages.find(img => img.id === "course-crypto-live")?.imageUrl,
    layout: "left"
  },
  {
    title: "CRYPTO + STOCK MARKET COMBO — PERSONALIZED 1 TO 1 CLASSES",
    price: "Contact for pricing",
    description: "The ultimate combo — personalized one-on-one sessions covering both crypto trading and stock market fundamentals. Ideal for learners who want full-spectrum financial market knowledge in one package.",
    tags: ["Combo", "1-to-1", "Crypto + Stocks", "Personalized"],
    enrollLink: "https://imjo.in/AcxnDv",
    image: PlaceHolderImages.find(img => img.id === "course-combo-personalized")?.imageUrl,
    layout: "right"
  }
];

const faqs = [
  {
    q: "What courses are offered at The Finance School?",
    a: "We offer specialized courses in NISM Certifications (Series 8 & 15), Comprehensive Crypto Trading (Beginner to Advanced), our proprietary LW Strategy, and personalized 1-on-1 mentorship for both Stock and Crypto markets."
  },
  {
    q: "Who can enroll in these courses?",
    a: "Anyone from absolute beginners to experienced traders can enroll. Our NISM courses are perfect for students and professionals looking for certifications, while our Crypto and Strategy courses are ideal for aspiring traders."
  },
  {
    q: "Is prior financial knowledge needed?",
    a: "No prior knowledge is needed for our beginner modules. We start from the absolute basics of market structure and build up to advanced concepts step-by-step."
  },
  {
    q: "Are the courses more practical or theoretical?",
    a: "We focus 100% on practical application. While we cover the necessary theory for exams, our main goal is to teach you how to analyze real markets, manage risk, and execute trades."
  },
  {
    q: "How are the courses delivered?",
    a: "We use a mix of high-quality recorded video lectures for self-paced learning and live 1-on-1 sessions for our personalized mentorship programs."
  },
  {
    q: "What kind of support is available after enrollment?",
    a: "Students get access to our doubt-clearing support, session recordings, and study materials. Our 1-on-1 programs include direct access to mentors."
  }
];

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-7xl font-headline font-bold">Our Courses</h1>
              <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-medium">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-foreground">Courses</span>
              </nav>
            </motion.div>
          </div>
        </section>

        {/* Section Intro */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Our Courses</span>
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Build Real-World Skills in Finance & Trading</h2>
            </motion.div>
          </div>
        </section>

        {/* Courses List */}
        <section className="pb-24">
          <div className="container mx-auto px-4 space-y-24">
            {coursesList.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${course.layout === 'right' ? 'lg:direction-rtl' : ''}`}
              >
                <div className={`relative aspect-video rounded-3xl overflow-hidden group border border-white/5 shadow-2xl ${course.layout === 'right' ? 'lg:order-2' : ''}`}>
                  <Image 
                    src={course.image || ""} 
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="finance course"
                  />
                  {course.badge && (
                    <div className="absolute top-6 left-6 z-10">
                      <Badge className="bg-primary text-white font-bold py-1.5 px-4 shadow-xl">
                        {course.badge}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>

                <div className={`space-y-6 ${course.layout === 'right' ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-3 py-1 rounded-full border border-primary/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-foreground">{course.price}</span>
                    <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">
                      Instant Access
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                  <Link href={course.enrollLink} target="_blank">
                    <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 group transition-all">
                      Enroll Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 bg-card/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">How it Works</h2>
              <p className="text-muted-foreground">Your journey from learning to professional trading in three simple steps.</p>
            </div>
            
            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-primary/20 -z-10" />
              
              <div className="grid md:grid-cols-3 gap-12 text-center">
                {[
                  { step: "01", title: "Choose Your Course", desc: "Browse our specialized curriculum and select the one that fits your goals.", icon: BookOpen },
                  { step: "02", title: "Learn with Structured Modules", desc: "Access high-quality lectures and study materials designed by experts.", icon: Zap },
                  { step: "03", title: "Apply & Build Confidence", desc: "Implement strategies in real-time markets with personalized guidance.", icon: CircleCheck }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center mx-auto relative shadow-2xl shadow-primary/10 group hover:border-primary transition-colors">
                      <item.icon className="w-10 h-10 text-primary" />
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="space-y-6">
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Questions & Answers</span>
                <h2 className="text-3xl md:text-5xl font-headline font-bold">Frequently Asked Questions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Have more questions? Our team is always here to help you choose the right path for your financial education.
                </p>
                <div className="pt-4">
                  <Link href="/#contact">
                    <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                      <HelpCircle size={18} />
                      Ask Custom Question
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 rounded-2xl bg-card/50 overflow-hidden px-6">
                      <AccordionTrigger className="hover:no-underline font-bold text-lg text-left py-6">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-24 bg-card border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="container mx-auto px-4 text-center space-y-8">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Finance & Trading Courses</span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold max-w-4xl mx-auto">
              Learn Finance, Trading & Market Analysis with Confidence
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/courses">
                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 rounded-full shadow-2xl shadow-primary/20">
                  Get Started
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
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
