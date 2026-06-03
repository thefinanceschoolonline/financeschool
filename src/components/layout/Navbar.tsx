"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, BookOpen, Headphones, User, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Consultation", href: "/#consultation", icon: Headphones },
  { label: "Course", href: "/courses", icon: BookOpen },
  { label: "Books", href: "/books", icon: BookOpen },
  { label: "Account", href: "/account", icon: User },
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
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center group relative">
            {/* Professional dark glow for visibility */}
            <div className="absolute inset-0 bg-black/80 blur-3xl rounded-full scale-125 -z-10" />
            <div className="relative h-24 w-48 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <Image 
                src={logoUrl} 
                alt="Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </Link>

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
                <Button className="bg-primary hover:bg-primary/90 transition-all rounded-none px-8 h-12 font-bold shadow-xl shadow-primary/25 border border-primary/20">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <button 
            className="flex h-12 w-12 items-center justify-center rounded-none bg-white/5 text-foreground md:hidden border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 space-y-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-lg font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={20} className="text-primary" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 rounded-none bg-primary font-bold text-lg">
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
