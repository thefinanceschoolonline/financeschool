
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Gavel, ChevronRight, AlertTriangle, BookOpen, CreditCard } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const terms = [
    {
      icon: AlertTriangle,
      title: "Educational Disclaimer",
      content: "All content provided by The Finance School is for educational purposes only. We are not SEBI registered investment advisors. Trading in financial markets involves high risk. We do not provide financial advice, tips, or guaranteed returns."
    },
    {
      icon: BookOpen,
      title: "Course Access",
      content: "Upon enrollment, you are granted a non-exclusive, non-transferable license to access the course materials for your personal use. Commercial redistribution or sharing of account credentials is strictly prohibited and will result in immediate termination of access."
    },
    {
      icon: CreditCard,
      title: "Payments & Refunds",
      content: "Payments for courses and consultations are processed through Instamojo. Due to the digital nature of our educational content, all sales are final. Refunds are only processed in exceptional circumstances at the sole discretion of management."
    },
    {
      icon: Gavel,
      title: "User Conduct",
      content: "Users must behave professionally in all live sessions and community groups. Any form of harassment, spamming, or promotion of external services will lead to permanent removal without refund."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-16">
        <section className="relative py-24 border-b border-white/5 bg-card/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 uppercase tracking-tight">Terms of Service</h1>
            <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-foreground">Terms</span>
            </nav>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-16">
              <div className="bg-destructive/10 border border-destructive/20 p-8 rounded-none">
                <div className="flex gap-4 items-start">
                  <AlertTriangle className="text-destructive shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-destructive uppercase tracking-tight mb-2">Important Risk Warning</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Trading stocks and cryptocurrencies involves significant risk of loss and is not suitable for every investor. The valuation of financial instruments may fluctuate, and as a result, clients may lose more than their original investment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-12">
                {terms.map((term, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6 items-start"
                  >
                    <div className="h-12 w-12 rounded-none bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                      <term.icon size={24} />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold uppercase tracking-tight">{term.title}</h2>
                      <p className="text-muted-foreground leading-relaxed font-medium">{term.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="prose prose-invert border-t border-white/5 pt-12">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Governing Law</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  These terms are governed by the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
