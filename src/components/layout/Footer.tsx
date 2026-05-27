
"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Send, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const logoUrl = "https://financeschool.sirv.com/TFS_LOGO2-removebg-preview.png";
  
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image 
                  src={logoUrl} 
                  alt="The Finance School Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-headline text-xl font-bold">Finance<span className="text-primary">School</span></span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Empowering the next generation of Indian traders through practical education and institutional-grade strategies. Consistency over hype.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-primary transition-all group">
                <Instagram size={18} className="group-hover:text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-primary transition-all group">
                <Send size={18} className="group-hover:text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-primary transition-all group">
                <Youtube size={18} className="group-hover:text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-primary transition-all group">
                <Facebook size={18} className="group-hover:text-white" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>thefinanceschool461@gmail.com</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 956 037 7562</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Pages</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/#consultation" className="hover:text-primary transition-colors">Consultation</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground font-medium">
            Copyright © {currentYear} The Finance School. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <span>Empowering Traders</span>
            <span>Built for Results</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
