
'use client';

import { useState, useEffect, useMemo } from "react";
import { useFirestore, useDoc } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, RefreshCcw, Home, Share2, Instagram, Youtube, Send, Facebook, Headphones } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    consultationPaymentLink: "https://imjo.in/pC6qZp"
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
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
        consultationPaymentLink: heroData.consultationPaymentLink || "https://imjo.in/pC6qZp"
      });
      setIsInitialized(true);
    }
  }, [heroData, loading, isInitialized]);

  const handleSave = async () => {
    if (!db) return;
    try {
      await setDoc(doc(db, "settings", "homepage"), formData);
      toast({
        title: "Settings Saved",
        description: "Site content and social links have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save settings.",
      });
    }
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
        <Button onClick={handleSave} className="bg-primary rounded-none h-12 px-10 font-bold uppercase tracking-widest text-[10px]">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid gap-8">
        {/* Hero Section Card */}
        <Card className="bg-card/40 border-white/5 rounded-none shadow-none overflow-hidden">
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
        <Card className="bg-card/40 border-white/5 rounded-none shadow-none overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="flex items-center gap-2 text-xl font-headline font-bold uppercase tracking-tight">
              <Headphones className="h-5 w-5 text-primary" />
              Consultation Section Content
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Headline</label>
                  <Input value={formData.consultationHeadline} onChange={(e) => setFormData({...formData, consultationHeadline: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                  <Textarea value={formData.consultationDescription} onChange={(e) => setFormData({...formData, consultationDescription: e.target.value})} className="bg-background rounded-none border-white/5 min-h-[100px]" />
                </div>
              </div>
              <div className="space-y-6">
                 <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Booking Card Title</label>
                  <Input value={formData.consultationCardTitle} onChange={(e) => setFormData({...formData, consultationCardTitle: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Booking Card Desc</label>
                  <Input value={formData.consultationCardDesc} onChange={(e) => setFormData({...formData, consultationCardDesc: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Instamojo Payment Link</label>
                  <Input value={formData.consultationPaymentLink} onChange={(e) => setFormData({...formData, consultationPaymentLink: e.target.value})} className="bg-background rounded-none border-white/5 h-12" />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5" />
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Feature 1</label>
                <Input value={formData.consultationF1Title} onChange={(e) => setFormData({...formData, consultationF1Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.consultationF1Desc} onChange={(e) => setFormData({...formData, consultationF1Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Feature 2</label>
                <Input value={formData.consultationF2Title} onChange={(e) => setFormData({...formData, consultationF2Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.consultationF2Desc} onChange={(e) => setFormData({...formData, consultationF2Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Feature 3</label>
                <Input value={formData.consultationF3Title} onChange={(e) => setFormData({...formData, consultationF3Title: e.target.value})} className="bg-background rounded-none border-white/5 h-10" placeholder="Title" />
                <Textarea value={formData.consultationF3Desc} onChange={(e) => setFormData({...formData, consultationF3Desc: e.target.value})} className="bg-background rounded-none border-white/5 text-xs" placeholder="Description" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Card */}
        <Card className="bg-card/40 border-white/5 rounded-none shadow-none overflow-hidden">
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

      <div className="flex justify-end pt-4">
         <Button variant="ghost" className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest hover:text-primary" onClick={() => window.location.reload()}>
           <RefreshCcw className="mr-2 h-3 w-3" /> Revert Local Changes
         </Button>
      </div>
    </div>
  );
}
