
"use client";

import Link from "next/link";
import { TrendingUp, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <TrendingUp size={20} />
              </div>
              <span className="font-headline text-xl font-bold">Finance<span className="text-primary">School</span></span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Empowering the next generation of Indian traders through practical education and institutional-grade strategies.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-primary">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#courses" className="hover:text-primary transition-colors">Course Marketplace</Link></li>
              <li><Link href="#consultation" className="hover:text-primary transition-colors">Mentorship</Link></li>
              <li><Link href="#about" className="hover:text-primary transition-colors">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-primary">Certifications</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">NISM Series 8</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">NISM Series 15</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Crypto Trading Pro</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Research Analyst</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-primary">Contact Us</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@thefinanceschool.online</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Navi Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Finance School. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
