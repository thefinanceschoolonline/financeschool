import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { CoursesSection } from "@/components/sections/Courses";
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
        
        <div id="consultation">
          <ConsultationSection />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
