
"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  BookMarked, 
  ShoppingCart, 
  ShieldCheck, 
  CheckCheck,
  FileText,
  Star,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { useDoc, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import NumberFlow from "@number-flow/react";
import { useMemo } from "react";

export default function BookDetailPage() {
  const { id } = useParams();
  const db = useFirestore();
  
  const bookRef = useMemo(() => 
    db && id ? doc(db, "books", id as string) : null, 
  [db, id]);
  
  const { data: book, loading } = useDoc(bookRef as any);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Syncing Details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-headline font-bold uppercase">Material Not Found</h1>
          <Link href="/books">
            <Button variant="outline" className="rounded-none uppercase tracking-widest font-bold">
              Back to Materials
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/books" className="hover:text-primary transition-colors">Books</Link>
            <ChevronRight size={10} />
            <span className="text-foreground">{book.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              {/* Left: Image Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[4/5] md:aspect-square bg-white/5 border border-white/10 p-12 flex items-center justify-center group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-50" />
                <div className="relative w-full h-full">
                  <Image 
                    src={book.imageUrl || "https://picsum.photos/seed/book/800/1000"} 
                    alt={book.title}
                    fill
                    className="object-contain transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                </div>
              </motion.div>

              {/* Right: Info Section */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 font-bold uppercase tracking-widest px-4 py-1.5 rounded-none">
                      <BookMarked size={14} className="mr-2" />
                      Educational Material
                    </Badge>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                      <Star size={14} className="text-primary fill-primary" />
                      Premium Quality
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight uppercase">
                    {book.title}
                  </h1>

                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-foreground">
                      ₹<NumberFlow value={book.price} />
                    </span>
                    {book.oldPrice && (
                      <span className="text-xl text-muted-foreground line-through opacity-50 font-medium">₹{book.oldPrice}</span>
                    )}
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {book.description}
                  </p>
                </div>

                {book.longDescription && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                      {book.longDescription}
                    </p>
                  </div>
                )}

                {book.chapters && book.chapters.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-primary w-5 h-5" />
                      <h3 className="text-xl font-headline font-bold uppercase">Table of Contents</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-2">
                      {book.chapters.map((chapter: any, i: number) => (
                        <AccordionItem key={i} value={`chapter-${i}`} className="border border-white/5 rounded-none bg-white/5 px-6">
                          <AccordionTrigger className="text-sm font-bold hover:no-underline uppercase tracking-tight">
                            {chapter.title}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-xs font-medium">
                            {chapter.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* Features / Specifications */}
                {book.features && book.features.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Key Specifications</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {book.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
                          <CheckCheck className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                  <a href={book.instamojoLink} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full h-16 rounded-none bg-gradient-to-t from-primary to-orange-400 font-bold text-lg shadow-2xl shadow-primary/25 border border-primary/20 uppercase tracking-widest">
                      Purchase Now
                      <ShoppingCart className="ml-2 h-5 w-5" />
                    </Button>
                  </a>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-primary" size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Expert Reviewed</span>
                    </div>
                  </div>
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
