"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, Headphones, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Consultation", href: "/#consultation", icon: Headphones },
  { label: "Course", href: "/courses", icon: BookOpen },
  { label: "Books", href: "/books", icon: BookOpen },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const logoUrl = "https://financeschool.sirv.com/TFS_LOGO2-removebg-preview.png";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav 
        className={cn(
          "relative z-20 w-full transition-all duration-500 border-b",
          scrolled ? "bg-background/90 backdrop-blur-xl shadow-2xl border-white/5 py-1" : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center group relative z-30">
            {/* Darkish background glow for logo clarity */}
            <div className="absolute inset-0 bg-black/60 blur-2xl rounded-full scale-110 -z-10" />
            <div className="relative h-20 w-40 md:h-32 md:w-64 flex items-center justify-start transition-transform duration-500 group-hover:scale-105">
              <Image 
                src={logoUrl} 
                alt="Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {mainNavItems.map((item) => (
              <div key={item.label} className="relative">
                <Link 
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all hover:text-accent",
                    pathname === item.href ? "text-accent" : "text-muted-foreground/80"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-none"
                    />
                  )}
                </Link>
              </div>
            ))}
            
            <div className="ml-6 pl-6 border-l border-white/10">
              <Link href="/courses">
                <Button className="bg-primary hover:bg-primary/90 transition-all rounded-none px-8 h-12 font-bold shadow-xl shadow-primary/25 border border-primary/20 uppercase tracking-widest text-xs">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-none bg-white/5 text-foreground md:hidden border border-white/10 relative z-30 hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-2xl border-b border-white/5 overflow-hidden absolute top-0 left-0 w-full pt-20"
          >
            <div className="container mx-auto px-6 py-10 space-y-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-3 border-b border-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={22} className="text-primary" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-6">
                <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-16 rounded-none bg-primary font-bold text-lg uppercase tracking-widest shadow-2xl shadow-primary/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
