
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { CoursesSection } from "@/components/sections/Courses";
import { ConsultationSection } from "@/components/sections/Consultation";
import { AboutSection } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Main Banner Image Section - Centered and Styled */}
        <div className="container mx-auto px-4 mb-24">
          <div className="relative w-full max-w-6xl mx-auto group">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_60px_-15px_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-[1.01] hover:shadow-[0_0_70px_-10px_rgba(249,115,22,0.5)]">
              <Image
                src="https://financeschool.sirv.com/ChatGPT%20Image%20May%2027%2C%202026%2C%2010_08_50%20PM.png"
                alt="The Finance School Trading Dashboard"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div id="courses">
          <CoursesSection />
        </div>
        
        <div id="consultation">
          <ConsultationSection />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
        
        {/* Testimonial / Social Proof Ticker */}
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
