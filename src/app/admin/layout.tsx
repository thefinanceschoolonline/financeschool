
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Headphones, Home, LogOut, Bookmark, AlertCircle, Star, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Featured (Home)", href: "/admin/courses?view=featured", icon: Star },
  { label: "Full Course Catalog", href: "/admin/courses", icon: BookOpen },
  { label: "Manage Books", href: "/admin/books", icon: Bookmark },
  { label: "Consultations", href: "/admin/consultations", icon: Headphones },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "View Site", href: "/", icon: Home },
];

const ALLOWED_ADMINS = [
  "thefinanceschoolonline@gmail.com",
  "venkateshchop14@gmail.com"
];

const DISPLAY_ADMIN_EMAIL = "thefinanceschoolonline@gmail.com";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const auth = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted) {
      if (!user) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } else {
        const email = user.email?.toLowerCase();
        if (ALLOWED_ADMINS.some(admin => admin.toLowerCase() === email)) {
          setIsAuthorized(true);
          if (pathname === '/admin/login') {
            router.push('/admin');
          }
        } else {
          if (auth) {
            signOut(auth).then(() => {
              if (pathname !== '/admin/login') {
                router.push('/admin/login');
              }
            });
          }
        }
      }
    }
  }, [user, loading, pathname, router, auth, mounted]);

  if (mounted && !auth && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-card border border-white/5 p-8">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h2 className="text-xl font-headline font-bold uppercase tracking-tight">Configuration Required</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Firebase configuration is missing. Please ensure your <strong>.env</strong> file contains valid Firebase API keys.
          </p>
          <Button onClick={() => window.location.reload()} className="w-full h-12 bg-primary rounded-none font-bold uppercase tracking-widest text-[10px]">
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!mounted || loading || (user && !isAuthorized)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 text-white">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground font-body">
        <Sidebar className="border-r border-white/5 bg-card">
          <SidebarHeader className="p-6 border-b border-white/5">
            <h2 className="text-xl font-headline font-bold text-primary uppercase tracking-tight">TFS Admin</h2>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className={cn(
                      "flex items-center gap-3 px-4 py-3 transition-all font-bold uppercase tracking-widest text-xs rounded-none",
                      pathname === item.href ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5 hover:text-primary"
                    )}>
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 border-b border-white/5 flex items-center px-6 justify-between bg-card/50 backdrop-blur-md">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary hidden sm:inline-block">{DISPLAY_ADMIN_EMAIL}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={async () => {
                  if (auth) {
                    await signOut(auth);
                    router.push('/admin/login');
                  }
                }} 
                className="hover:text-destructive rounded-none"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-8 bg-background/50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
