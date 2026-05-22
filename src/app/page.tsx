
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { CoursesSection } from "@/components/sections/Courses";
import { AIPathFinder } from "@/components/sections/AIPathFinder";
import { ConsultationSection } from "@/components/sections/Consultation";
import { AboutSection } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <div id="courses">
          <CoursesSection />
        </div>
        
        <div id="ai-finder">
          <AIPathFinder />
        </div>
        
        <div id="consultation">
          <ConsultationSection />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
        
        {/* Testimonial / Social Proof Ticker Mockup */}
        <section className="py-12 bg-primary/10 overflow-hidden whitespace-nowrap border-y border-primary/20">
          <div className="flex animate-marquee items-center gap-12 text-lg font-headline font-bold uppercase tracking-tighter text-primary/50">
            <span>TRUSTED BY 1000+ LEARNERS</span>
            <span>•</span>
            <span>NISM SERIES 8 CERTIFIED</span>
            <span>•</span>
            <span>CRYPTO TRADING MASTERY</span>
            <span>•</span>
            <span>INSTITUTIONAL RISK MANAGEMENT</span>
            <span>•</span>
            <span>TRUSTED BY 1000+ LEARNERS</span>
            <span>•</span>
            <span>NISM SERIES 8 CERTIFIED</span>
            <span>•</span>
            <span>CRYPTO TRADING MASTERY</span>
            <span>•</span>
            <span>INSTITUTIONAL RISK MANAGEMENT</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
