
'use client';

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, ArrowRight, Zap, BookOpen, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";

export function CoursesSection() {
  const db = useFirestore();
  const coursesQuery = query(collection(db!, "courses"), orderBy("order", "asc"), limit(3));
  const { data: courses, loading } = useCollection(coursesQuery);

  return (
    <section id="courses" className="py-32 bg-background relative overflow-hidden trading-grid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 space-y-4">
          <span className="text-xs font-bold text-accent uppercase tracking-[0.3em]">Course Marketplace</span>
          <h2 className="text-4xl md:text-7xl font-headline font-bold">
            Choose Your <span className="text-gradient">Success Path</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our courses focus on practical strategies and live market understanding, helping you clear certifications and trade with confidence.
          </p>
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-card/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {courses?.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-full overflow-hidden border-white/5 bg-card/40 flex flex-col group hover:border-accent/30 transition-all duration-500 rounded-none">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={course.imageUrl || "https://picsum.photos/seed/finance/800/600"} 
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                  </div>

                  <CardHeader className="space-y-3 p-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <Zap size={18} />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">Course</span>
                    </div>
                    <CardTitle className="font-headline text-2xl group-hover:text-accent transition-colors">
                      <Link href={`/courses/${course.id}`}>{course.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
                    
                    <div className="flex items-baseline gap-3 py-1">
                      <span className="text-3xl font-bold">
                        ₹<NumberFlow value={course.price} />
                      </span>
                      {course.oldPrice && (
                        <span className="text-base text-muted-foreground line-through opacity-50">₹{course.oldPrice}</span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-4 px-6 pb-6 pt-0">
                    <div className="h-px bg-white/5 w-full mb-4" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">What's Included</p>
                    <div className="space-y-2">
                      {course.features?.slice(0, 4).map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-5 w-5 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                            <CheckCheck className="h-3 w-3 text-accent" />
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <div className="p-6 pt-0 mt-auto">
                    <a href={course.instamojoLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full h-12 rounded-none text-base font-bold bg-primary hover:glow-orange shadow-xl shadow-primary/25 border-primary/20 group transition-all duration-300">
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
