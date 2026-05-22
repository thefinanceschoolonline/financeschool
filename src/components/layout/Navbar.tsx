"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <TrendingUp size={20} />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight">
            The Finance<span className="text-primary">School</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/courses" className="text-sm font-medium transition-colors hover:text-primary">
            Courses
          </Link>
          <Link href="/#consultation" className="text-sm font-medium transition-colors hover:text-primary">
            Consultation
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact Us
          </Link>
          <Link href="/courses">
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-xl px-6 font-bold shadow-lg shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>

        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}
