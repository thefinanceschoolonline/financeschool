
'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  ChevronRight, 
  ShoppingCart,
  BookMarked
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import NumberFlow from "@number-flow/react";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useMemo } from "react";

export default function BooksPage() {
  const db = useFirestore();
  
  const booksQuery = useMemo(() => 
    db ? query(collection(db, "books"), orderBy("order", "asc")) : null, 
  [db]);
  
  const { data: books, loading } = useCollection(booksQuery);
  const bannerImage = PlaceHolderImages.find(img => img.id === "banner-courses");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden border-b border-white/5">
          {bannerImage && (
            <div className="absolute inset-0">
              <Image 
                src={bannerImage.imageUrl} 
                alt={bannerImage.description}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
            </div>
          )}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-8xl font-headline font-bold uppercase">Our Books</h1>
              <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-foreground">Books</span>
              </nav>
            </motion.div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-4"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Knowledge Hub</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight uppercase">
                Master Trading with Our <br />
                <span className="text-gradient">Premium Study Materials</span>
              </h2>
            </motion.div>
          </div>
        </section>

        <section className="pb-32">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20 opacity-30 font-bold uppercase tracking-[0.3em]">Syncing Study Materials...</div>
            ) : books?.length === 0 ? (
              <div className="text-center py-20 opacity-30 font-bold uppercase tracking-[0.3em]">No books available at the moment.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books?.map((book: any, idx: number) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden border-white/5 bg-card/40 hover:border-primary/50 transition-all duration-500 rounded-none group shadow-none flex flex-col h-full">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image 
                          src={book.imageUrl} 
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-8 flex flex-col flex-grow space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-primary">
                            <BookMarked size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Study Material</span>
                          </div>
                          <h3 className="text-2xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                            {book.description}
                          </p>
                        </div>

                        <div className="mt-auto space-y-6">
                          <div className="flex items-baseline gap-4">
                            <span className="text-2xl font-bold text-foreground">
                              ₹<NumberFlow value={book.price} />
                            </span>
                            {book.oldPrice && (
                              <span className="text-base text-muted-foreground line-through opacity-50 font-medium">₹{book.oldPrice}</span>
                            )}
                          </div>

                          <a href={book.instamojoLink} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full h-12 rounded-none bg-gradient-to-t from-primary to-orange-400 border border-primary/20 font-bold group transition-all uppercase tracking-widest text-xs">
                              Buy Now
                              <ShoppingCart className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
