
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-32 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-8 bg-card/40 border border-white/5 p-12 rounded-none shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary" />
          
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <CheckCircle2 size={64} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground font-medium">Thank you for your purchase. You're now one step closer to mastering the markets.</p>
          </div>

          <div className="bg-white/5 p-6 space-y-2 rounded-none border border-white/5 text-sm">
            <p className="text-muted-foreground">An email confirmation has been sent to your registered address. Our team will contact you shortly with further instructions.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button className="w-full h-14 rounded-none bg-primary font-bold uppercase tracking-widest text-xs group">
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/courses" className="flex-1">
              <Button variant="outline" className="w-full h-14 rounded-none border-white/10 font-bold uppercase tracking-widest text-xs">
                Explore More
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
