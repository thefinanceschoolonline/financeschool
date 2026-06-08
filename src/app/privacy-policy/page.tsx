
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, ChevronRight, Eye, Lock, Database } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Data Collection",
      content: "We collect information you provide directly to us when you enroll in a course, book a consultation, or contact us. This includes your name, email address, phone number, and any payment information processed through our secure gateway (Instamojo)."
    },
    {
      icon: Database,
      title: "How We Use Data",
      content: "Your data is used to provide access to our educational materials, manage your consultation bookings, and send you important updates regarding your courses. We do not sell your personal information to third parties."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement industry-standard security measures provided by Firebase (Google) to protect your data. All financial transactions are handled through encrypted gateways to ensure your sensitive information never touches our servers."
    },
    {
      icon: Shield,
      title: "Third-Party Services",
      content: "We use Firebase for authentication and database management, and Instamojo for payment processing. These services have their own privacy policies which we encourage you to review."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-16">
        <section className="relative py-24 border-b border-white/5 bg-card/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 uppercase tracking-tight">Privacy Policy</h1>
            <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-foreground">Privacy</span>
            </nav>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-16">
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Last Updated: October 2023. At The Finance School, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information across our digital platforms.
                </p>
              </div>

              <div className="grid gap-12">
                {sections.map((section, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6 items-start"
                  >
                    <div className="h-12 w-12 rounded-none bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                      <section.icon size={24} />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold uppercase tracking-tight">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed font-medium">{section.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-card/50 p-8 border border-white/5 rounded-none">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-primary">Contact Privacy Officer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our treatment of your personal data, please contact us at: <br />
                  <span className="text-foreground font-bold">thefinanceschool461@gmail.com</span>
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
