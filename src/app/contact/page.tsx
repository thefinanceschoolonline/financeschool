
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Send,
  MessageSquare,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ContactPage() {
  const bannerImage = PlaceHolderImages.find(img => img.id === "banner-contact");

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: "India",
      subDetails: "Registered Office",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 956 037 7562",
      subDetails: "Mon-Sat, 10am to 7pm",
    },
    {
      icon: Mail,
      title: "Email",
      details: "thefinanceschool461@gmail.com",
      subDetails: "24/7 Support Online",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Breadcrumb Header with Banner */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden border-b border-white/5">
          {bannerImage && (
            <div className="absolute inset-0">
              <Image 
                src={bannerImage.imageUrl} 
                alt={bannerImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={bannerImage.imageHint}
              />
              <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
            </div>
          )}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-8xl font-headline font-bold mb-6">Contact Us</h1>
            <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-foreground">Contact</span>
            </nav>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Our Contact</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold">Get In Touch With Our Support</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Contact our support team with any questions or queries you may have. We're here to help you on your trading journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/40 border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-primary/20 transition-all duration-500">
                    <CardContent className="p-10 text-center space-y-6">
                      <div className="h-16 w-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform duration-500">
                        <item.icon size={32} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-xl font-bold text-foreground">{item.details}</p>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">{item.subDetails}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-card/20 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Message Us</span>
                  <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                    Have a Question? <span className="text-gradient">Send a Message</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    Whether you're looking for course details, technical support, or corporate training, fill out the form and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="h-12 w-12 rounded-xl bg-background border border-white/5 flex items-center justify-center text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Support Hours</h4>
                      <p className="text-muted-foreground text-sm">Monday — Saturday: 10AM to 7PM</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="h-12 w-12 rounded-xl bg-background border border-white/5 flex items-center justify-center text-primary">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Quick Response</h4>
                      <p className="text-muted-foreground text-sm">Typically responds in under 4 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-background border-white/10 rounded-[3rem] shadow-2xl p-8 md:p-12">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                      <Input placeholder="John" className="bg-card/50 border-white/5 h-14 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                      <Input placeholder="Doe" className="bg-card/50 border-white/5 h-14 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="bg-card/50 border-white/5 h-14 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                    <Input placeholder="+91 000 000 0000" className="bg-card/50 border-white/5 h-14 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Message</label>
                    <Textarea placeholder="How can we help you?" className="bg-card/50 border-white/5 min-h-[150px] rounded-2xl resize-none" />
                  </div>
                  <Button className="w-full h-16 rounded-2xl bg-gradient-to-t from-primary to-orange-400 text-lg font-bold shadow-2xl shadow-primary/25 group">
                    Send Message
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
