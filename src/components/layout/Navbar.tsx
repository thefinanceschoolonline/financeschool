
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

  useEffect(() => {
    if (isShopSubOpen) {
      const handleClickOutside = () => setIsShopSubOpen(false);
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [isShopSubOpen]);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav 
        className={cn(
          "relative z-20 w-full transition-all duration-500 border-b",
          scrolled ? "bg-background/95 backdrop-blur-xl shadow-2xl border-white/5 py-2" : "bg-background border-white/10 py-4"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 blur-2xl rounded-full animate-pulse group-hover:bg-primary/50 transition-colors" />
              <div className="relative h-11 w-11 rounded-[1.25rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/50">
                <Image 
                  src={logoUrl} 
                  alt="The Finance School Logo" 
                  fill 
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-xl md:text-2xl font-bold tracking-tight leading-none">
                The Finance<span className="text-primary">School</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors mt-1">
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
                onClick={(e) => {
                  if (item.hasSub) {
                    e.stopPropagation();
                    setIsShopSubOpen(!isShopSubOpen);
                  }
                }}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all hover:bg-white/5 hover:text-primary",
                    pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground/80",
                    item.hasSub && isShopSubOpen && "text-primary bg-primary/5"
                  )}
                  onClick={(e) => {
                    if (item.hasSub) e.preventDefault();
                  } }
                >
                  {item.label}
                  {item.hasSub && (
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isShopSubOpen && "rotate-180")} />
                  )}
                </Link>
              </div>
            ))}
            
            <div className="ml-6 pl-6 border-l border-white/10">
              <Link href="/courses">
                <Button className="bg-gradient-to-t from-primary to-orange-400 hover:scale-105 transition-transform rounded-2xl px-8 h-12 font-bold shadow-xl shadow-primary/25 border border-primary/20">
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

      <AnimatePresence>
        {isShopSubOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[80px] left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/5 z-10 hidden md:block shadow-2xl"
            onMouseEnter={() => setIsShopSubOpen(true)}
            onMouseLeave={() => setIsShopSubOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-center gap-12">
                {shopSubItems.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all py-3 px-6 rounded-2xl hover:bg-primary/5 group"
                  >
                    <subItem.icon className="h-4 w-4 text-primary/40 group-hover:text-primary transition-all group-hover:scale-110" />
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[300px] bg-background border-l border-white/10 z-50 p-8 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-xl uppercase tracking-widest text-primary">Menu</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center"
                  >
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {mainNavItems.map((item) => (
                    <div key={item.label} className="flex flex-col gap-2">
                      {item.hasSub ? (
                        <>
                          <button 
                            onClick={() => setIsShopSubOpen(!isShopSubOpen)}
                            className="flex items-center justify-between w-full p-4 text-base font-bold rounded-2xl bg-white/5 hover:text-primary transition-all border border-white/5"
                          >
                            <span className="flex items-center gap-4">
                              <item.icon size={20} className="text-primary" />
                              {item.label}
                            </span>
                            <ChevronDown size={20} className={cn("transition-transform duration-300", isShopSubOpen && "rotate-180")} />
                          </button>
                          <AnimatePresence>
                            {isShopSubOpen && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-col pl-8 gap-2 border-l-2 border-primary/20 ml-6 mt-2"
                              >
                                {shopSubItems.map((sub) => (
                                  <Link 
                                    key={sub.label}
                                    href={sub.href}
                                    className="py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link 
                          href={item.href}
                          className={cn(
                            "flex items-center gap-4 p-4 text-base font-bold rounded-2xl hover:bg-white/5 transition-all border border-white/5",
                            pathname === item.href ? "text-primary bg-primary/10 border-primary/20" : "text-muted-foreground"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon size={20} className="text-primary" />
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 mt-4">
                  <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-16 bg-gradient-to-t from-primary to-orange-400 rounded-[1.5rem] font-bold text-xl shadow-2xl shadow-primary/30 border border-primary/20">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
