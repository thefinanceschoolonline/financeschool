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
  CheckCheck
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import NumberFlow from "@number-flow/react";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useMemo } from "react";

export default function CoursesPage() {
  const db = useFirestore();
  
  // Courses page shows ALL courses managed by the admin
  const coursesQuery = useMemo(() => 
    db ? query(collection(db, "courses"), orderBy("order", "asc")) : null, 
  [db]);
  
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
              <h1 className="text-5xl md:text-8xl font-headline font-bold uppercase">Professional Courses</h1>
              <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-foreground">Courses</span>
              </nav>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-4 text-center mb-20"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Full Curriculum</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight uppercase">
                Advance Your <span className="text-gradient">Financial Career</span>
              </h2>
            </motion.div>

            {loading ? (
              <div className="text-center py-20 opacity-30 font-bold uppercase tracking-[0.3em]">Syncing All Courses...</div>
            ) : courses?.length === 0 ? (
              <div className="text-center py-20 opacity-30 font-bold uppercase tracking-[0.3em]">No courses available. Check back soon.</div>
            ) : (
              <div className="space-y-12">
                {courses?.map((course: any, idx: number) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <Card className="overflow-hidden border-white/5 bg-card/40 hover:border-primary/50 transition-all duration-500 rounded-none group shadow-none">
                      <div className="flex flex-col lg:flex-row min-h-full">
                        <div className="lg:w-2/5 relative aspect-video lg:aspect-auto min-h-[300px] overflow-hidden">
                          <Image 
                            src={course.imageUrl} 
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        </div>

                        <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center space-y-8">
                          <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                              <Link href={`/courses/${course.id}`}>{course.title}</Link>
                            </h3>
                            <div className="flex items-center gap-4">
                              <span className="text-3xl font-bold text-foreground">
                                ₹<NumberFlow value={course.price} />
                              </span>
                              {course.oldPrice && (
                                <span className="text-lg text-muted-foreground line-through opacity-50 font-medium">₹{course.oldPrice}</span>
                              )}
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                              {course.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                            {course.features?.map((feature: string, i: number) => (
                              <div key={i} className="flex items-center gap-3 group/item">
                                <div className="h-5 w-5 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                  <CheckCheck className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href={course.instamojoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button className="w-full h-16 rounded-none bg-gradient-to-t from-primary to-orange-400 border border-primary/20 font-bold group transition-all uppercase tracking-widest text-sm shadow-2xl shadow-primary/20">
                                Enroll Now
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </a>
                            <Link href={`/courses/${course.id}`} className="flex-1">
                              <Button variant="outline" className="w-full h-16 rounded-none border-white/10 bg-white/5 hover:bg-white/10 font-bold uppercase tracking-widest text-sm">
                                Explore Syllabus
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-32 bg-card relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
          <div className="container mx-auto px-4 text-center space-y-12">
            <h2 className="text-4xl md:text-7xl font-headline font-bold max-w-5xl mx-auto uppercase">
              Ready to Master the <br />
              <span className="text-gradient">Financial Markets?</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact">
                <Button size="lg" className="h-16 px-12 text-lg font-bold bg-primary rounded-none uppercase tracking-widest border border-primary/20">
                  Talk to an Expert
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
