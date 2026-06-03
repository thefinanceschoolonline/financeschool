
'use client';

import { useState } from 'react';
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Lock, Mail, ArrowRight, HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Access Granted",
        description: "Welcome back to the dashboard.",
      });
      router.push('/admin');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "Invalid credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInitialization = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Enter your admin email to receive a password setup link.",
      });
      return;
    }
    
    if (email !== "thefinanceschoolonline@gmail.com" && email !== "venkateshchop14@gmail.com") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "This email is not authorized to initialize an admin account.",
      });
      return;
    }

    if (!auth) {
      toast({
        variant: "destructive",
        title: "Config Missing",
        description: "Firebase is not initialized. Check your environment keys.",
      });
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Initialization Email Sent",
        description: "Check your inbox for the link to set your admin password.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Process Failed",
        description: error.message,
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden font-body">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/admin-bg/1920/1080"
          alt="Admin Background"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-white/5 rounded-none shadow-2xl relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        
        <CardHeader className="text-center pt-10 pb-6">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <ShieldCheck size={32} />
            </div>
          </div>
          <CardTitle className="text-3xl font-headline font-bold uppercase tracking-tight">Admin Portal</CardTitle>
          <CardDescription className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">The Finance School</CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-12">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Authorized Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="pl-10 h-12 bg-background/50 border-white/5 rounded-none focus-visible:ring-primary"
                    placeholder="thefinanceschoolonline@gmail.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="pl-10 h-12 bg-background/50 border-white/5 rounded-none focus-visible:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-none group"
              >
                {loading ? "Verifying..." : "Login to Dashboard"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                <div className="relative flex justify-center text-[8px] uppercase font-bold tracking-[0.3em]"><span className="bg-card px-2 text-muted-foreground">OR</span></div>
              </div>

              <Button 
                type="button"
                variant="outline"
                onClick={handleInitialization}
                disabled={resetLoading}
                className="w-full h-12 rounded-none border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <HelpCircle size={14} />
                {resetLoading ? "Processing..." : "Initialize / Reset Password"}
              </Button>
            </div>
            
            <p className="text-[9px] text-center text-muted-foreground leading-relaxed uppercase tracking-wider font-bold opacity-40 px-4">
              First time? Use the "Initialize" button above to set your password via your authorized email.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
