
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cookie, ChevronRight, Settings, Info, Zap } from "lucide-react";
import Link from "next/link";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Zap,
      title: "Essential Cookies",
      content: "These are necessary for the website to function. We use Firebase Authentication cookies to keep you logged in to your account and manage your dashboard access safely."
    },
    {
      icon: Settings,
      title: "Preference Cookies",
      content: "These allow our website to remember choices you make, such as your preferred language or region, providing a more personalized experience."
    },
    {
      icon: Info,
      title: "Analytics Cookies",
      content: "We use basic analytics to understand how visitors interact with our website. This helps us improve our course offerings and user experience. No personal identifiers are used for these statistics."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-16">
        <section className="relative py-24 border-b border-white/5 bg-card/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 uppercase tracking-tight">Cookie Policy</h1>
            <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-foreground">Cookies</span>
            </nav>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-16">
              <div className="flex gap-4 items-center mb-12">
                <Cookie className="text-primary" size={32} />
                <p className="text-lg text-muted-foreground font-medium">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                </p>
              </div>

              <div className="grid gap-12">
                {cookieTypes.map((type, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 bg-card/40 border border-white/5 rounded-none space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <type.icon size={20} />
                      </div>
                      <h2 className="text-2xl font-bold uppercase tracking-tight">{type.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-medium pl-14">
                      {type.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-12 space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-tight">Managing Cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                </p>
                <div className="p-6 bg-white/5 border border-white/5 rounded-none text-xs text-muted-foreground">
                  Note: Disabling essential cookies will prevent you from accessing your student dashboard and protected course content.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
