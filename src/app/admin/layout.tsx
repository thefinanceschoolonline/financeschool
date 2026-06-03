'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Headphones, Home, LogOut, Bookmark } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Manage Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Manage Books", href: "/admin/books", icon: Bookmark },
  { label: "Consultations", href: "/admin/consultations", icon: Headphones },
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

  useEffect(() => {
    if (!loading) {
      if (!user) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } else {
        if (ALLOWED_ADMINS.includes(user.email || "")) {
          setIsAuthorized(true);
          if (pathname === '/admin/login') {
            router.push('/admin');
          }
        } else {
          // Logged in but not an authorized admin
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
  }, [user, loading, pathname, router, auth]);

  // Don't wrap the login page in the sidebar layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading state only when we are actually waiting for auth on protected routes
  if (loading || (!user && pathname !== '/admin/login') || (user && !isAuthorized)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 text-white">Authenticating Administrator...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar className="border-r border-white/5 bg-card">
          <SidebarHeader className="p-6 border-b border-white/5">
            <h2 className="text-xl font-headline font-bold text-primary">TFS Admin</h2>
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{DISPLAY_ADMIN_EMAIL}</span>
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
