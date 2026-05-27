
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Headphones, Clock, Users, CalendarDays, Star } from "lucide-react";

const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

export function ConsultationSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6 font-bold text-sm">
              <Star size={14} fill="currentColor" /> Expert Guidance
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6">Need a <span className="text-accent">Personal Strategy</span>?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Sometimes classroom learning isn't enough. Schedule a one-on-one session with our senior mentors to review your portfolio, discuss advanced trading setups, or clarify complex derivatives concepts.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Clock, title: "Flexible Timing", desc: "Choose a slot that fits your busy schedule." },
                { icon: Users, title: "1-on-1 Focused", desc: "Zero distractions, just you and the mentor." },
                { icon: Headphones, title: "Post-Session Support", desc: "Get session recordings and summary notes." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card border border-white/5 flex items-center justify-center shrink-0">
                    <item.icon className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
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
            <Card className="border-white/5 bg-card/50 backdrop-blur-md shadow-2xl overflow-hidden rounded-[2.5rem]">
              <CardHeader className="bg-primary/5 border-b border-white/5 p-8">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CalendarDays className="text-primary w-6 h-6" />
                  Schedule Your Session
                </CardTitle>
                <CardDescription className="text-base">Select your preferred date and time slot below.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-[1fr,240px] gap-10">
                  <div className="flex justify-center md:justify-start">
                    <div className="bg-background rounded-2xl p-4 border border-white/5 shadow-inner inline-block">
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
                      <h5 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Time Slot</h5>
                      <p className="text-xs text-muted-foreground">Select one available slot</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-xl text-sm font-bold border transition-all text-center ${
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
                        <Button className="w-full bg-gradient-to-t from-primary to-orange-400 h-14 font-bold rounded-xl shadow-2xl shadow-primary/25 border border-primary/20 text-base">
                          Confirm Booking
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest font-bold">
                          Confirmation sent to email
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
