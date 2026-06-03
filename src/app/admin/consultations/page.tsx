'use client';

import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Clock, User, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export default function AdminConsultationsPage() {
  const db = useFirestore();
  
  // Stabilize the query reference to prevent Firestore internal assertion errors
  const bookingsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  }, [db]);
  
  const { data: bookings, loading } = useCollection(bookingsQuery);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold uppercase tracking-tight">Consultation Bookings</h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">View and Manage Scheduled Mentor Sessions</p>
      </div>

      <Card className="bg-card/40 border-white/5 rounded-none overflow-hidden shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Customer</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Date & Slot</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Contact Info</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right">Booked On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 opacity-30 font-bold uppercase tracking-[0.3em]">Syncing Bookings...</TableCell>
                </TableRow>
              ) : !bookings || bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 opacity-30 font-bold uppercase tracking-[0.3em]">No Bookings Found</TableCell>
                </TableRow>
              ) : bookings.map((booking: any) => (
                <TableRow key={booking.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-none bg-primary/10 flex items-center justify-center text-primary">
                        <User size={14} />
                      </div>
                      {booking.customerName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <CalendarDays size={12} className="text-primary" /> {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                        <Clock size={12} className="text-primary" /> {booking.slot}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail size={12} className="text-muted-foreground opacity-70" /> {booking.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Phone size={12} className="text-muted-foreground opacity-70" /> {booking.phone || 'N/A'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "rounded-none border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                      booking.status === 'confirmed' ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {booking.status || 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-[10px] font-medium text-muted-foreground">
                    {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}