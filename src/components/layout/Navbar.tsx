
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

  // Close sub-nav when clicking outside
  useEffect(() => {
    if (isShopSubOpen) {
      const handleClickOutside = () => setIsShopSubOpen(false);
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [isShopSubOpen]);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Main Navbar */}
      <nav 
        className={cn(
          "relative z-20 w-full transition-all duration-300 border-b",
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-white/5" : "bg-background border-white/10"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 overflow-hidden transition-transform group-hover:scale-105">
              <Image 
                src={logoUrl} 
                alt="The Finance School Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="font-headline text-xl font-bold tracking-tight hidden sm:inline-block">
              The Finance<span className="text-primary">School</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
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
                    "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-white/5 hover:text-primary",
                    pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground",
                    item.hasSub && isShopSubOpen && "text-primary bg-primary/5"
                  )}
                  onClick={(e) => {
                    if (item.hasSub) e.preventDefault();
                  } }
                >
                  {item.label}
                  {item.hasSub && (
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isShopSubOpen && "rotate-180")} />
                  )}
                </Link>
              </div>
            ))}
            
            <div className="ml-4 pl-4 border-l border-white/10">
              <Link href="/courses">
                <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-6 font-bold shadow-xl shadow-primary/20">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Desktop Sub-navigation Bar */}
      <AnimatePresence>
        {isShopSubOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-background border-b border-white/5 z-10 hidden md:block"
            onMouseEnter={() => setIsShopSubOpen(true)}
            onMouseLeave={() => setIsShopSubOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-center gap-8">
                {shopSubItems.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/5 group"
                  >
                    <subItem.icon className="h-4 w-4 text-primary/40 group-hover:text-primary transition-colors" />
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-background border-l border-white/10 z-50 p-6 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-lg">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={24} className="text-muted-foreground" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      {item.hasSub ? (
                        <>
                          <button 
                            onClick={() => setIsShopSubOpen(!isShopSubOpen)}
                            className="flex items-center justify-between w-full p-3 text-base font-bold rounded-2xl bg-white/5 hover:text-primary transition-all"
                          >
                            <span className="flex items-center gap-3">
                              <item.icon size={18} className="text-primary" />
                              {item.label}
                            </span>
                            <ChevronDown size={18} className={cn("transition-transform", isShopSubOpen && "rotate-180")} />
                          </button>
                          <AnimatePresence>
                            {isShopSubOpen && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-col pl-6 gap-1"
                              >
                                {shopSubItems.map((sub) => (
                                  <Link 
                                    key={sub.label}
                                    href={sub.href}
                                    className="p-3 text-sm font-medium text-muted-foreground hover:text-primary"
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
                            "flex items-center gap-3 p-3 text-base font-bold rounded-2xl hover:bg-white/5 transition-all",
                            pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon size={18} className="text-primary" />
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
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
