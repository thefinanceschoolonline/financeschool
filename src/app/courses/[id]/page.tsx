
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
  Star, 
  Clock, 
  Users, 
  BookOpen,
  Award,
  BarChart,
  ShieldCheck,
  CheckCheck,
  Lock,
  PlayCircle,
  FileText
} from "lucide-react";
import { useDoc, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import NumberFlow from "@number-flow/react";
import { useMemo } from "react";

export default function CourseDetailPage() {
  const { id } = useParams();
  const db = useFirestore();
  
  const courseRef = useMemo(() => 
    db && id ? doc(db, "courses", id as string) : null, 
  [db, id]);
  
  const { data: course, loading } = useDoc(courseRef as any);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Syncing Syllabus...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-headline font-bold uppercase">Course Not Found</h1>
          <Link href="/courses">
            <Button variant="outline" className="rounded-none uppercase tracking-widest font-bold">
              Back to Catalog
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
        {/* Header Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <Link href="/courses" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-4 hover:underline transition-all">
            <ArrowLeft size={16} /> Back to All Courses
          </Link>
        </div>

        {/* Hero Section */}
        <section className="pb-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 font-bold uppercase tracking-widest px-4 py-1.5 rounded-none">
                    Course Syllabus
                  </Badge>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                    <Star size={14} className="text-primary fill-primary" />
                    Premium Content
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight">
                  {course.title}
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-6 py-6 border-y border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Chapters</p>
                      <p className="text-sm font-bold">{course.curriculum?.length || 0} Modules</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center text-primary">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Learners</p>
                      <p className="text-sm font-bold">1,000+ Enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Access</p>
                      <p className="text-sm font-bold">Lifetime</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video order-1 lg:order-2 rounded-none overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image 
                  src={course.imageUrl || "https://picsum.photos/seed/course/800/450"} 
                  alt={course.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                     <PlayCircle size={40} className="md:size-[48px]" />
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Award className="text-primary w-6 h-6" />
                    <h2 className="text-2xl md:text-3xl font-headline font-bold">About this Course</h2>
                  </div>
                  <div className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line bg-card/30 p-6 md:p-8 rounded-none border border-white/5 font-medium">
                    {course.longDescription || "This comprehensive course is designed to take you from fundamentals to advanced trading setups. Learn with precision and master the institutional narrative."}
                  </div>
                </div>

                {course.curriculum && course.curriculum.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BarChart className="text-primary w-6 h-6" />
                        <h2 className="text-2xl md:text-3xl font-headline font-bold">Course Curriculum</h2>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {course.curriculum.length} Chapters
                      </p>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full space-y-3">
                      {course.curriculum.map((chapter: any, i: number) => (
                        <AccordionItem 
                          key={i} 
                          value={`chapter-${i}`} 
                          className="border border-white/5 rounded-none bg-card/40 overflow-hidden hover:border-primary/20 transition-all data-[state=open]:border-primary/30"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center gap-4 text-left w-full pr-4">
                              <span className="text-xl font-bold text-primary/20 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                              <div className="flex-grow">
                                <h4 className="text-base font-bold">{chapter.title}</h4>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">
                                  {chapter.lessons?.length || 0} Lessons • {chapter.duration}
                                </p>
                              </div>
                              <div className="shrink-0 text-muted-foreground">
                                {i === 0 ? <PlayCircle size={16} className="text-primary" /> : <Lock size={16} />}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-5 pt-1">
                            <div className="space-y-2 pl-8 border-l border-white/5">
                              {chapter.lessons?.map((lesson: string, j: number) => (
                                <div key={j} className="flex items-center justify-between py-2.5 px-4 rounded-none bg-background/30 border border-white/5 hover:border-white/10 transition-colors group">
                                  <div className="flex items-center gap-3">
                                    <FileText size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span className="text-sm font-medium">{lesson}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="lg:sticky lg:top-24 space-y-8">
                  <div className="p-8 rounded-none bg-gradient-to-b from-card to-card/50 border border-white/10 shadow-2xl">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Enrollment Fee</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-bold">₹<NumberFlow value={course.price} /></span>
                          {course.oldPrice && (
                            <span className="text-xl text-muted-foreground line-through opacity-50">₹{course.oldPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5 space-y-5">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Included:</p>
                        <div className="space-y-3">
                          {(course.features || []).map((highlight: string, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="h-5 w-5 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <CheckCheck className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-xs font-bold text-muted-foreground">{highlight}</span>
                            </div>
                          ))}
                          <div className="flex items-center gap-3">
                            <div className="h-5 w-5 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                              <ShieldCheck className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs font-bold text-muted-foreground">Lifetime Access</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <Link href={course.instamojoLink} target="_blank">
                          <Button className="w-full h-14 rounded-none bg-gradient-to-t from-primary to-orange-400 font-bold text-lg shadow-2xl shadow-primary/25 hover:translate-y-[-2px] transition-all uppercase tracking-widest">
                            Enroll Now
                          </Button>
                        </Link>
                        <p className="text-[9px] text-center text-muted-foreground mt-4 uppercase tracking-[0.1em] font-bold">
                          Safe & Secure Checkout
                        </p>
                      </div>
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
