
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            <Card className="border-white/5 bg-card/50 backdrop-blur-md shadow-2xl overflow-hidden">
              <CardHeader className="bg-primary/10 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="text-primary w-5 h-5" />
                  Schedule Your Session
                </CardTitle>
                <CardDescription>Select your preferred date and time slot below.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                  <div className="bg-background rounded-xl p-2 border border-white/5">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border-0"
                    />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <h5 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Available Time Slots</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-lg text-sm font-bold border transition-all ${
                            selectedSlot === slot 
                              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
                              : 'bg-background border-white/5 hover:border-primary/50 text-muted-foreground'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {selectedSlot && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                        <Button className="w-full bg-accent hover:bg-accent/90 h-12 font-bold uppercase tracking-widest">
                          Confirm Booking
                        </Button>
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
