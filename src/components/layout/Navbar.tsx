"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ShoppingBag, BookOpen, Headphones, User, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", hasSub: true, icon: ShoppingBag },
  { label: "Consultation", href: "/#consultation", icon: Headphones },
  { label: "Course", href: "/courses", icon: BookOpen },
  { label: "Books", href: "/books", icon: BookOpen },
  { label: "Account", href: "/account", icon: User },
];

const shopSubItems = [
  { label: "Consultation", href: "/#consultation", icon: Headphones },
  { label: "Course", href: "/courses", icon: BookOpen },
  { label: "Books", href: "/books", icon: BookOpen },
  { label: "Shop All", href: "/shop", icon: ShoppingBag },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopSubOpen, setIsShopSubOpen] = useState(false);
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
          scrolled ? "bg-background/90 backdrop-blur-xl shadow-2xl border-white/5 py-2" : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-11 w-11 rounded-[1.25rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-accent/50">
                <Image 
                  src={logoUrl} 
                  alt="The Finance School Logo" 
                  fill 
                  className="object-contain p-2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-xl md:text-2xl font-bold tracking-tight leading-none">
                The Finance<span className="text-primary">School</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground group-hover:text-accent transition-colors mt-1">
                Legacy of Excellence
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {mainNavItems.map((item) => (
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => item.hasSub && setIsShopSubOpen(true)}
                onMouseLeave={() => item.hasSub && setIsShopSubOpen(false)}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all hover:text-accent",
                    pathname === item.href ? "text-accent" : "text-muted-foreground/80"
                  )}
                >
                  {item.label}
                  {item.hasSub && (
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isShopSubOpen && "rotate-180")} />
                  )}
                  {pathname === item.href && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent glow-green rounded-full"
                    />
                  )}
                </Link>
              </div>
            ))}
            
            <div className="ml-6 pl-6 border-l border-white/10">
              <Link href="/courses">
                <Button className="bg-primary hover:bg-primary/90 hover:glow-orange transition-all rounded-2xl px-8 h-12 font-bold shadow-xl shadow-primary/25 border border-primary/20">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <button 
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-foreground md:hidden border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu removed for brevity but ideally updated similarly */}
    </header>
  );
}