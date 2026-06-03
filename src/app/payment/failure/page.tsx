
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCcw, Headphones } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentFailurePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-32 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-8 bg-card/40 border border-white/5 p-12 rounded-none shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
          
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-none bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
              <XCircle size={64} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Payment Failed</h1>
            <p className="text-xl text-muted-foreground font-medium">We couldn't process your transaction. Please try again or contact support.</p>
          </div>

          <div className="bg-white/5 p-6 text-sm rounded-none border border-white/5">
            <p className="text-muted-foreground">Error Code: TXN_REJECTED_BY_BANK</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/courses" className="flex-1">
              <Button className="w-full h-14 rounded-none bg-primary font-bold uppercase tracking-widest text-xs">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button variant="outline" className="w-full h-14 rounded-none border-white/10 font-bold uppercase tracking-widest text-xs">
                <Headphones className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
