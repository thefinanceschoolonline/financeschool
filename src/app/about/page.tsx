"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCheck, 
  ChevronRight, 
  Users, 
  TrendingUp, 
  Video, 
  ShieldCheck, 
  Zap, 
  Star,
  Target,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Send,
  Quote
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState, useEffect } from "react";

const rawStats = [
  { label: "Students Trained", key: "students", value: 1200, icon: Users },
  { label: "Years Of Experience", key: "years", value: 6, icon: TrendingUp },
  { label: "Live Sessions", key: "sessions", value: 100, icon: Video },
];

export default function AboutPage() {
  const bannerImage = PlaceHolderImages.find(img => img.id === "banner-about");
  
  const [stats, setStats] = useState({
    students: 0,
    years: 0,
    sessions: 0
  });

  useEffect(() => {
    // 2 second delay for slow climb animation start
    const timer = setTimeout(() => {
      setStats({
        students: 1200,
        years: 6,
        sessions: 100
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 10 second ultra-slow climb duration
  const numberTransition = { 
    duration: 10000, 
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)' 
  };

  const faqs = [
    { q: "Do I need prior knowledge to start learning trading?", a: "No. Our basic modules start from absolute zero, covering market foundations before moving to advanced strategies." },
    { q: "Which course is best for beginners?", a: "We recommend starting with NISM Series 8 or our Crypto A-Z course depending on your asset preference." },
    { q: "Will I get access to recorded lectures?", a: "Yes, all our certificate courses come with lifetime access to high-quality recorded lectures." },
    { q: "Do you provide live trading sessions?", a: "Yes, our advanced mentorship and 1-on-1 programs include regular live market analysis sessions." },
    { q: "Is this course helpful for NISM certification?", a: "Absolutely. Our NISM prep courses are specifically designed to help you clear SEBI-mandated exams." },
    { q: "How can I enroll in a course?", a: "Simply visit our Courses page, select your desired program, and click Enroll Now to get instant access." }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Breadcrumb Header with Banner */}
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
            <h1 className="text-5xl md:text-8xl font-headline font-bold mb-6">About Us</h1>
            <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-foreground">About</span>
            </nav>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Our Philosophy</span>
                  <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                    Trading Isn’t Easy — But It Can Be <span className="text-gradient">Learned the Right Way</span>
                  </h2>
                </div>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p className="font-bold text-foreground">
                    Most people enter trading thinking it’s easy money. That’s exactly why most people lose.
                  </p>
                  <p>
                    At The Finance School, we focus on what actually works — discipline, risk management, and real market understanding. 
                    No shortcuts. No fake strategies. Just practical learning you can apply in real market conditions.
                  </p>
                  <p>
                    We focus on structured learning, covering everything from basic concepts to advanced trading strategies, 
                    including technical analysis, risk management, and live market insights. Whether you are a beginner or looking 
                    to improve your skills, our courses are designed to guide you step-by-step.
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 pt-4">
                  <Link href="/courses">
                    <Button size="lg" className="h-14 px-10 text-lg font-bold bg-gradient-to-t from-primary to-orange-400 rounded-none shadow-xl shadow-primary/25 border border-primary/20 uppercase tracking-widest">
                      Explore Courses
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-none border-white/10 bg-white/5 uppercase tracking-widest">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-none overflow-hidden border border-white/10 shadow-2xl relative">
                  <Image 
                    src="https://financeschool.sirv.com/ChatGPT%20Image%20Jun%203%2C%202026%2C%2002_32_14%20PM.png" 
                    alt="The Finance School Mentor" 
                    fill 
                    className="object-cover"
                    data-ai-hint="stock trader"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-10 -left-10 md:left-10 p-8 bg-card border border-white/10 rounded-none shadow-2xl space-y-6 min-w-[280px]">
                  {rawStats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-none bg-primary/10 flex items-center justify-center text-primary">
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold flex items-baseline">
                          <NumberFlow 
                            value={stats[stat.key as keyof typeof stats]} 
                            transition={numberTransition}
                          />+
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-card/20 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">FAQs</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight">Frequently Asked Questions</h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 rounded-none px-6 bg-background/50">
                  <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary transition-colors uppercase tracking-tight">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm font-medium">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
          <div className="container mx-auto px-4 text-center space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Consultation</span>
              <h2 className="text-4xl md:text-7xl font-headline font-bold max-w-4xl mx-auto uppercase">
                Still Confused Whether To <br />
                <span className="text-gradient">Enroll Or Not?</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                Learn how markets work, build strong trading strategies, and develop real-world skills through structured, application-focused training.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Link href="/#consultation">
                <Button size="lg" className="h-16 px-12 text-xl font-bold bg-gradient-to-t from-primary to-orange-400 rounded-none shadow-2xl shadow-primary/25 border border-primary/20 uppercase tracking-widest">
                  Book Free Consultation
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