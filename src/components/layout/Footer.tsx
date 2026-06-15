"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Send, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function Footer() {
  const db = useFirestore();
  const heroDocRef = useMemo(() => db ? doc(db, "settings", "homepage") : null, [db]);
  const { data: heroSettings } = useDoc(heroDocRef as any);

  const currentYear = new Date().getFullYear();
  const logoUrl = "https://financeschool.sirv.com/TFS_LOGO2-removebg-preview.png";
  
  const socialLinks = {
    instagram: heroSettings?.instagramUrl || "#",
    youtube: heroSettings?.youtubeUrl || "#",
    telegram: heroSettings?.telegramUrl || "#",
    facebook: heroSettings?.facebookUrl || "#"
  };

  const socials = [
    { icon: Instagram, href: socialLinks.instagram, label: "Instagram", hoverColor: "hover:bg-pink-500 hover:border-pink-500" },
    { icon: Send, href: socialLinks.telegram, label: "Telegram", hoverColor: "hover:bg-sky-400 hover:border-sky-400" },
    { icon: Youtube, href: socialLinks.youtube, label: "Youtube", hoverColor: "hover:bg-red-600 hover:border-red-600" },
    { icon: Facebook, href: socialLinks.facebook, label: "Facebook", hoverColor: "hover:bg-blue-600 hover:border-blue-600" }
  ];

  return (
    <footer className="bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative h-24 w-24 flex items-center justify-center transition-all group-hover:scale-110">
                <Image 
                  src={logoUrl} 
                  alt="The Finance School Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Empowering the next generation of Indian traders through practical education and institutional-grade strategies. Consistency over hype.
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center transition-all group",
                    social.hoverColor
                  )}
                >
                  <social.icon size={18} className="group-hover:text-white transition-colors" />
                </a>
              ))}
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
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              Copyright © {currentYear} The Finance School. All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/60 font-medium">
              Designed and Developed by <a href="https://budgetdev.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">BudgetDev Software Solutions</a>
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <span>Empowering Traders</span>
            <span>Built for Results</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
