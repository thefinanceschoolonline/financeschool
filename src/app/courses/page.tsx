
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
  CheckCheck,
  Zap,
  BookOpen,
  CircleCheck
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import NumberFlow from "@number-flow/react";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function CoursesPage() {
  const db = useFirestore();
  const coursesQuery = query(collection(db!, "courses"), orderBy("order", "asc"));
  const { data: courses, loading } = useCollection(coursesQuery);
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
              <h1 className="text-5xl md:text-8xl font-headline font-bold">Our Courses</h1>
              <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-foreground">Courses</span>
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
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Our Courses</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                Build Real-World Skills in <br />
                <span className="text-gradient">Finance & Trading</span>
              </h2>
            </motion.div>
          </div>
        </section>

        <section className="pb-32">
          <div className="container mx-auto px-4 space-y-12">
            {loading ? (
              <div className="text-center py-20 opacity-50 font-bold uppercase tracking-[0.3em]">Loading Professional Courses...</div>
            ) : courses?.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="overflow-hidden border-white/5 bg-card/40 hover:border-primary/50 transition-all duration-500 rounded-none group shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-col lg:flex-row min-h-full">
                    <div className="lg:w-2/5 relative aspect-video lg:aspect-video min-h-[220px] overflow-hidden">
                      <Image 
                        src={course.imageUrl} 
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>

                    <div className="lg:w-3/5 p-6 md:p-10 flex flex-col justify-center space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl md:text-3xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/courses/${course.id}`}>{course.title}</Link>
                          </h3>
                          <div className="flex items-baseline gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-foreground">
                                ₹<NumberFlow value={course.price} />
                              </span>
                              {course.oldPrice && (
                                <span className="text-base text-muted-foreground line-through opacity-50 font-medium">₹{course.oldPrice}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {course.features?.slice(0, 4).map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 group/item">
                            <div className="h-4 w-4 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                              <CheckCheck className="h-2.5 w-2.5 text-primary" />
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2 mt-auto">
                        <a href={course.instamojoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full h-12 rounded-none bg-gradient-to-t from-primary to-orange-400 shadow-xl shadow-primary/25 border border-primary/20 font-bold group transition-all">
                            Enroll Now
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </a>
                        <Link href={`/courses/${course.id}`} className="flex-1">
                          <Button variant="outline" className="w-full h-12 rounded-none border-white/10 bg-white/5 hover:bg-white/10 font-bold">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-32 bg-card relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
          <div className="container mx-auto px-4 text-center space-y-12">
            <h2 className="text-4xl md:text-7xl font-headline font-bold max-w-5xl mx-auto">
              Learn Finance, Trading & Market <br />
              Analysis with Confidence
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/courses">
                <Button size="lg" className="h-16 px-12 text-xl font-bold bg-gradient-to-t from-primary to-orange-400 rounded-none">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-none border-white/10 bg-white/5">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
