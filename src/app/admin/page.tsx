
'use client';

import { useCollection, useFirestore } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Headphones, TrendingUp, Users } from "lucide-react";
import NumberFlow from "@number-flow/react";

export default function AdminDashboard() {
  const db = useFirestore();
  const { data: courses } = useCollection(collection(db!, "courses"));
  const { data: bookings } = useCollection(collection(db!, "bookings"));

  const stats = [
    { label: "Total Courses", value: courses?.length || 0, icon: BookOpen, color: "text-primary" },
    { label: "Total Bookings", value: bookings?.length || 0, icon: Headphones, color: "text-accent" },
    { label: "New Leads", value: 12, icon: Users, color: "text-blue-500" },
    { label: "Success Rate", value: 100, icon: TrendingUp, color: "text-green-500", suffix: "%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your trading school performance.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/40 border-white/5 rounded-none group hover:border-primary/20 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn("h-12 w-12 rounded-none bg-white/5 flex items-center justify-center", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                  <div className="text-3xl font-bold flex items-center">
                    <NumberFlow value={stat.value} />{stat.suffix}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/40 border-white/5 rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground py-10 text-center uppercase tracking-widest font-bold opacity-50">
              No recent activity to show
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-white/5 rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-headline">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-[10px]">Database Connection</span>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px]">Stable</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-[10px]">Instamojo Gateway</span>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px]">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
