
'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState, useMemo } from "react";
import { Headphones, Clock, Users, CalendarDays, Star } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

export function ConsultationSection() {
  const db = useFirestore();
  const heroDocRef = useMemo(() => db ? doc(db, "settings", "homepage") : null, [db]);
  const { data: heroSettings } = useDoc(heroDocRef as any);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const content = {
    headline: heroSettings?.consultationHeadline || "Need a Personal Strategy?",
    description: heroSettings?.consultationDescription || "Schedule a one-on-one session with our senior mentors to review your portfolio, discuss advanced trading setups, or clarify complex concepts.",
    features: [
      { icon: Clock, title: heroSettings?.consultationF1Title || "Flexible Timing", desc: heroSettings?.consultationF1Desc || "Choose a slot that fits your busy schedule." },
      { icon: Users, title: heroSettings?.consultationF2Title || "1-on-1 Focused", desc: heroSettings?.consultationF2Desc || "Zero distractions, just you and the mentor." },
      { icon: Headphones, title: heroSettings?.consultationF3Title || "Post-Session Support", desc: heroSettings?.consultationF3Desc || "Get session recordings and summary notes." }
    ],
    cardTitle: heroSettings?.consultationCardTitle || "Schedule Your Session",
    cardDesc: heroSettings?.consultationCardDesc || "Select your preferred date and time slot below.",
    paymentLink: heroSettings?.consultationPaymentLink || "https://imjo.in/pC6qZp"
  };

  const handleBooking = async () => {
    if (!date || !selectedSlot) return;
    setIsBooking(true);
    // In a real app, you might save the intention to DB here first.
    window.location.href = content.paymentLink;
  };

  return (
    <section id="consultation" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6 font-bold text-sm uppercase tracking-widest">
              <Star size={14} fill="currentColor" /> Expert Guidance
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6 uppercase tracking-tight leading-tight">
              {content.headline}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
              {content.description}
            </p>
            
            <div className="space-y-6">
              {content.features.map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-none bg-card border border-white/5 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                    <item.icon className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-tight">{item.title}</h4>
                    <p className="text-muted-foreground text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-white/5 bg-card/50 backdrop-blur-md shadow-2xl overflow-hidden rounded-none">
              <CardHeader className="bg-primary/5 border-b border-white/5 p-8">
                <CardTitle className="flex items-center gap-2 text-2xl font-headline uppercase font-bold tracking-tight">
                  <CalendarDays className="text-primary w-6 h-6" />
                  {content.cardTitle}
                </CardTitle>
                <CardDescription className="text-base font-medium">{content.cardDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-[1fr,240px] gap-10">
                  <div className="flex justify-center md:justify-start">
                    <div className="bg-background rounded-none p-4 border border-white/5 shadow-inner inline-block">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-0"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary">Time Slot</h5>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold opacity-50">Select one available slot</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-none text-[10px] font-bold border transition-all text-center uppercase tracking-widest ${
                            selectedSlot === slot 
                              ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                              : 'bg-background border-white/5 hover:border-primary/30 text-muted-foreground'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {selectedSlot && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                        <Button 
                          onClick={handleBooking}
                          disabled={isBooking}
                          className="w-full bg-gradient-to-t from-primary to-orange-400 h-14 font-bold rounded-none shadow-2xl shadow-primary/25 border border-primary/20 text-[10px] uppercase tracking-[0.2em]"
                        >
                          {isBooking ? "Redirecting..." : "Confirm & Pay"}
                        </Button>
                        <p className="text-[8px] text-center text-muted-foreground mt-4 uppercase tracking-[0.1em] font-bold">
                          Secure Payment via Instamojo
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
