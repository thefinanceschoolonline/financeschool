
'use client';

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Headphones, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Manage Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Consultations", href: "/admin/consultations", icon: Headphones },
  { label: "View Site", href: "/", icon: Home },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-xs",
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
              <span className="text-sm font-bold opacity-70">Administrator</span>
              <Button variant="ghost" size="icon" className="rounded-full">
                <LogOut size={18} className="text-destructive" />
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

import { Button } from "@/components/ui/button";
