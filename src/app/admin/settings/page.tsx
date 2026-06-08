'use client';

import { useState, useEffect, useMemo } from "react";
import { useFirestore, useDoc } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, RefreshCcw, Home, Share2, Instagram, Youtube, Send, Facebook, Headphones, Info, TrendingUp, Users, Link as LinkIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function AdminSettingsPage() {
  const db = useFirestore();
  
  const heroDocRef = useMemo(() => 
    db ? doc(db, "settings", "homepage") : null, 
  [db]);
  
  const { data: heroData, loading } = useDoc(heroDocRef as any);

  const [formData, setFormData] = useState({
    heroBadge: "Empowering 1,000+ Indian Traders",
    heroHeadline: "Master Financial Markets",
    heroSubheadline: "With Precision",
    heroDescription: "Learn practical strategies, clear NISM certifications, and build real market skills — without the hype. Professional education for the modern investor.",
    cta1Text: "Start Learning Now",
    cta1Link: "#courses",
    cta2Text: "Book a Consultation",
    cta2Link: "#consultation",
    instagramUrl: "",
    youtubeUrl: "",
    telegramUrl: "",
    facebookUrl: "",
    consultationHeadline: "Need a Personal Strategy?",
    consultationDescription: "Schedule a one-on-one session with our senior mentors to review your portfolio, discuss advanced trading setups, or clarify complex concepts.",
    consultationF1Title: "Flexible Timing",
    consultationF1Desc: "Choose a slot that fits your busy schedule.",
    consultationF2Title: "1-on-1 Focused",
    consultationF2Desc: "Zero distractions, just you and the mentor.",
    consultationF3Title: "Post-Session Support",
    consultationF3Desc: "Get session recordings and summary notes.",
    consultationCardTitle: "Schedule Your Session",
    consultationCardDesc: "Select your preferred date and time slot below.",
    consultationPaymentLink: "https://imjo.in/pC6qZp",
    aboutHeadline: "Helping You Learn Stock Market Trading the Right Way",
    aboutDescription: "At The Finance School, we focus on practical stock market education designed for real-world results. Our goal is to help beginners and aspiring traders understand market fundamentals, technical analysis, and risk management with clarity.",
    aboutPhilosophy1Title: "Ethical Learning",
    aboutPhilosophy1Desc: "No hype, no shortcuts. Just pure market logic and data-driven strategies.",
    aboutPhilosophy2Title: "Goal Oriented",
    aboutPhilosophy2Desc: "Whether it's NISM certification or wealth building, we stay focused on your target.",
    aboutPhilosophy3Title: "Verified Skills",
    aboutPhilosophy3Desc: "Our curriculum is vetted by industry experts with 6+ years of active trading experience.",
    aboutStat1Value: 1200,
    aboutStat2Value: 6
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only initialize once when data arrives
    if (heroData && !loading && !isInitialized) {
      setFormData({
        heroBadge: heroData.heroBadge || "Empowering 1,000+ Indian Traders",
        heroHeadline: heroData.heroHeadline || "Master Financial Markets",
        heroSubheadline: heroData.heroSubheadline || "With Precision",
        heroDescription: heroData.heroDescription || "Learn practical strategies, clear NISM certifications, and build real market skills — without the hype. Professional education for the modern investor.",
        cta1Text: heroData.cta1Text || "Start Learning Now",
        cta1Link: heroData.cta1Link || "#courses",
        cta2Text: heroData.cta2Text || "Book a Consultation",
        cta2Link: heroData.cta2Link || "#consultation",
        instagramUrl: heroData.instagramUrl || "",
        youtubeUrl: heroData.youtubeUrl || "",
        telegramUrl: heroData.telegramUrl || "",
        facebookUrl: heroData.facebookUrl || "",
        consultationHeadline: heroData.consultationHeadline || "Need a Personal Strategy?",
        consultationDescription: heroData.consultationDescription || "Schedule a one-on-one session with our senior mentors to review your portfolio, discuss advanced trading setups, or clarify complex concepts.",
        consultationF1Title: heroData.consultationF1Title || "Flexible Timing",
        consultationF1Desc: heroData.consultationF1Desc || "Choose a slot that fits your busy schedule.",
        consultationF2Title: heroData.consultationF2Title || "1-on-1 Focused",
        consultationF2Desc: heroData.consultationF2Desc || "Zero distractions, just you and the mentor.",
        consultationF3Title: heroData.consultationF3Title || "Post-Session Support",
        consultationF3Desc: heroData.consultationF3Desc || "Get session recordings and summary notes.",
        consultationCardTitle: heroData.consultationCardTitle || "Schedule Your Session",
        consultationCardDesc: heroData.consultationCardDesc || "Select your preferred date and time slot below.",
        consultationPaymentLink: heroData.consultationPaymentLink || "https://imjo.in/pC6qZp",
        aboutHeadline: heroData.aboutHeadline || "Helping You Learn Stock Market Trading the Right Way",
        aboutDescription: heroData.aboutDescription || "At The Finance School, we focus on practical stock market education designed for real-world results. Our goal is to help beginners and aspiring traders understand market fundamentals, technical analysis, and risk management with clarity.",
        aboutPhilosophy1Title: heroData.aboutPhilosophy1Title || "Ethical Learning",
        aboutPhilosophy1Desc: heroData.aboutPhilosophy1Desc || "No hype, no shortcuts. Just pure market logic and data-driven strategies.",
        aboutPhilosophy2Title: heroData.aboutPhilosophy2Title || "Goal Oriented",
        aboutPhilosophy2Desc: heroData.aboutPhilosophy2Desc || "Whether it's NISM certification or wealth building, we stay focused on your target.",
        aboutPhilosophy3Title: heroData.aboutPhilosophy3Title || "Verified Skills",
        aboutPhilosophy3Desc: heroData.aboutPhilosophy3Desc || "Our curriculum is vetted by industry experts with 6+ years of active trading experience.",
        aboutStat1Value: heroData.aboutStat1Value || 1200,
        aboutStat2Value: heroData.aboutStat2Value || 6
      });
      setIsInitialized(true);
    }
  }, [heroData, loading, isInitialized]);

  const handleSave = () => {
    if (!db || !heroDocRef) return;
    
    // Non-blocking mutation call to ensure local cache updates immediately
    setDoc(heroDocRef, formData, { merge: true })
      .then(() => {
        toast({
          title: "Settings Saved",
          description: "Site content and social links have been updated successfully.",
        });
      })
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: heroDocRef.path,
          operation: 'write',
          requestResourceData: formData,
        }));
      });
  };

  if (loading && !isInitialized) {
    return <div className="text-center py-20 opacity-30 font-bold uppercase tracking-[0.3em]">Syncing Settings...</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold uppercase tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">Manage Homepage Content & Global Links</p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest hover:text-primary" onClick={() => window.location.reload()}>
            <RefreshCcw className="mr-2 h-3 w-3" /> Revert
          </Button>
          <Button onClick={handleSave} className="bg-primary rounded-none h-12 px-10 font-bold uppercase tracking-widest text-[10px]">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Hero Section Card */}
        <Card id="hero" className="bg-card/40 border-white/5 rounded-none shadow-none overflow-hidden scroll-mt-24">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="flex items-center gap-2 text-xl font-headline font-bold uppercase tracking-tight">
              <Home className="h-5 w-5 text-primary" />
              Hero Section Content
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Badge Text</label>
              <Input 
                value={formData.heroBadge} 
                onChange={(e) => setFormData({...formData, heroBadge: e.target.value})}
                className="bg-background rounded-none border-white/5 h-12"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Headline</label>
                <Input 
                  value={formData.heroHeadline} 
                  onChange={(e) => setFormData({...formData, heroHeadline: e.target.value})}
                  className="bg-background rounded-none border-white/5 h-12"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Headline Accent (Sub-headline)</label>
                <Input 
                  value={formData.heroSubheadline} 
                  onChange={(e) => setFormData({...formData, heroSubheadline: e.target.value})}
                  className="bg-background rounded-none border-white/5 h-12"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hero Description</label>
              <Textarea 
                value={formData.heroDescription} 
                onChange={(e) => setFormData({...formData, heroDescription: e.target.value})}
                className="bg-background rounded-none border-white/5 min-h-[120px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Primary Button Label</label>
                <Input value={formData.cta1Text} onChange={(e) => setFormData({...formData, cta1Text: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                <label className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Link URL</label>
                <Input value={formData.cta1Link} onChange={(e) => setFormData({...formData, cta1Link: e.target.value})} className="bg-background rounded-none border-white/5 h-10" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Secondary Button Label</label>
                <Input value={formData.cta2Text} onChange={(e) => setFormData({...formData, cta2Text: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                <label className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Link URL</label>
                <Input value={formData.cta2Link} onChange={(e) => setFormData({...formData, cta2Link: e.target.value})} className="bg-background rounded-none border-white/5 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Content Card */}
        <Card id="consultation" className="bg-card/40 border-white/5 rounded-none shadow-none overflow-hidden scroll-mt-24">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="flex items-center gap-2 text-xl font-headline font-bold uppercase tracking-tight">
              <Headphones className="h-5 w-5 text-primary" />
              Consultation & Calendar Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            {/* Payment Link Section - High Visibility */}
            <div className="bg-primary/5 p-6 border border-primary/20 space-y-4">
              <div className="flex items-center gap-2">
                <LinkIcon size={16} className="text-primary" />
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Instamojo Payment Gateway Link</label>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-2">This link is used when customers click "Confirm & Pay" on the calendar.</p>
              <Input 
                value={formData.consultationPaymentLink} 
                onChange={(e) => setFormData({...formData, consultationPaymentLink: e.target.value})} 
                className="bg-background rounded-none border-white/10 h-14 text-sm font-bold placeholder:opacity-30" 
                placeholder="https://imjo.in/..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Strategy Headline</label>
                  <Input value={formData.consultationHeadline} onChange={(e) => setFormData({...formData, consultationHeadline: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Strategy Description</label>
                  <Textarea value={formData.consultationDescription} onChange={(e) => setFormData({...formData, consultationDescription: e.target.value})} className="bg-background rounded-none border-white/5 min-h-[100px]" />
                </div>
              </div>
              <div className="space-y-6">
                 <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Calendar Card Title</label>
                  <Input value={formData.consultationCardTitle} onChange={(e) => setFormData({...formData, consultationCardTitle: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Calendar Card Description</label>
                  <Input value={formData.consultationCardDesc} onChange={(e) => setFormData({...formData, consultationCardDesc: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5" />
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Highlight 1</label>
                <Input value={formData.consultationF1Title} onChange={(e) => setFormData({...formData, consultationF1Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.consultationF1Desc} onChange={(e) => setFormData({...formData, consultationF1Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Highlight 2</label>
                <Input value={formData.consultationF2Title} onChange={(e) => setFormData({...formData, consultationF2Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.consultationF2Desc} onChange={(e) => setFormData({...formData, consultationF2Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Highlight 3</label>
                <Input value={formData.consultationF3Title} onChange={(e) => setFormData({...formData, consultationF3Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.consultationF3Desc} onChange={(e) => setFormData({...formData, consultationF3Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section Card */}
        <Card id="about" className="bg-card/40 border-white/5 rounded-none shadow-none overflow-hidden scroll-mt-24">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="flex items-center gap-2 text-xl font-headline font-bold uppercase tracking-tight">
              <Info className="h-5 w-5 text-primary" />
              About Section Content
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Headline</label>
              <Input 
                value={formData.aboutHeadline} 
                onChange={(e) => setFormData({...formData, aboutHeadline: e.target.value})}
                className="bg-background rounded-none border-white/5 h-12"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">About Description</label>
              <Textarea 
                value={formData.aboutDescription} 
                onChange={(e) => setFormData({...formData, aboutDescription: e.target.value})}
                className="bg-background rounded-none border-white/5 min-h-[120px]"
              />
            </div>

            <div className="h-px bg-white/5" />

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Philosophy 1</label>
                <Input value={formData.aboutPhilosophy1Title} onChange={(e) => setFormData({...formData, aboutPhilosophy1Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.aboutPhilosophy1Desc} onChange={(e) => setFormData({...formData, aboutPhilosophy1Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Philosophy 2</label>
                <Input value={formData.aboutPhilosophy2Title} onChange={(e) => setFormData({...formData, aboutPhilosophy2Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.aboutPhilosophy2Desc} onChange={(e) => setFormData({...formData, aboutPhilosophy2Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Philosophy 3</label>
                <Input value={formData.aboutPhilosophy3Title} onChange={(e) => setFormData({...formData, aboutPhilosophy3Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.aboutPhilosophy3Desc} onChange={(e) => setFormData({...formData, aboutPhilosophy3Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-primary" />
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Students Trained Count</label>
                </div>
                <Input type="number" value={formData.aboutStat1Value} onChange={(e) => setFormData({...formData, aboutStat1Value: parseInt(e.target.value)})} className="bg-background rounded-none border-white/5 h-12" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-primary" />
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Years Experience Count</label>
                </div>
                <Input type="number" value={formData.aboutStat2Value} onChange={(e) => setFormData({...formData, aboutStat2Value: parseInt(e.target.value)})} className="bg-background rounded-none border-white/5 h-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Card */}
        <Card id="socials" className="bg-card/40 border-white/5 rounded-none shadow-none overflow-hidden scroll-mt-24">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="flex items-center gap-2 text-xl font-headline font-bold uppercase tracking-tight">
              <Share2 className="h-5 w-5 text-primary" />
              Social Media Connections
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Instagram size={16} className="text-primary" />
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Instagram URL</label>
                </div>
                <Input value={formData.instagramUrl} onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Youtube size={16} className="text-primary" />
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">YouTube URL</label>
                </div>
                <Input value={formData.youtubeUrl} onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Send size={16} className="text-primary" />
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Telegram URL</label>
                </div>
                <Input value={formData.telegramUrl} onChange={(e) => setFormData({...formData, telegramUrl: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Facebook size={16} className="text-primary" />
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Facebook URL</label>
                </div>
                <Input value={formData.facebookUrl} onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
