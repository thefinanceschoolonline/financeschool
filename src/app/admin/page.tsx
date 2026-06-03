
'use client';

import { useCollection, useFirestore } from "@/firebase";
import { collection } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Headphones, TrendingUp, Bookmark } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export default function AdminDashboard() {
  const db = useFirestore();
  
  const coursesQuery = useMemo(() => db ? collection(db, "courses") : null, [db]);
  const booksQuery = useMemo(() => db ? collection(db, "books") : null, [db]);
  const bookingsQuery = useMemo(() => db ? collection(db, "bookings") : null, [db]);
  
  const { data: courses } = useCollection(coursesQuery);
  const { data: books } = useCollection(booksQuery);
  const { data: bookings } = useCollection(bookingsQuery);

  const stats = [
    { label: "Total Courses", value: courses?.length || 0, icon: BookOpen, color: "text-primary" },
    { label: "Total Books", value: books?.length || 0, icon: Bookmark, color: "text-blue-500" },
    { label: "Total Bookings", value: bookings?.length || 0, icon: Headphones, color: "text-accent" },
    { label: "Success Rate", value: 100, icon: TrendingUp, color: "text-green-500", suffix: "%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold uppercase tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">Trading School Performance Overview</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/40 border-white/5 rounded-none group hover:border-primary/20 transition-all shadow-none">
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
        <Card className="bg-card/40 border-white/5 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-headline uppercase font-bold">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-[10px] opacity-70">Database Connection</span>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px]">Stable</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-[10px] opacity-70">Instamojo Gateway</span>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px]">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
