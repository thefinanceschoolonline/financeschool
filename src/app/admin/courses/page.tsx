'use client';

import { useState, useMemo } from "react";
import { useCollection, useFirestore } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Edit3, Plus, ExternalLink, Info } from "lucide-react";
import Image from "next/image";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminCoursesPage() {
  const db = useFirestore();
  
  const coursesQuery = useMemo(() => 
    db ? query(collection(db, "courses"), orderBy("order", "asc")) : null, 
  [db]);
  
  const { data: courses, loading } = useCollection(coursesQuery);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    imageUrl: "",
    instamojoLink: "",
    features: "",
    order: 0
  });

  const handleOpenDialog = (course: any = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title || "",
        description: course.description || "",
        price: course.price?.toString() || "",
        oldPrice: course.oldPrice?.toString() || "",
        imageUrl: course.imageUrl || "",
        instamojoLink: course.instamojoLink || "",
        features: (course.features || []).join("\n"),
        order: course.order || 0
      });
    } else {
      setEditingCourse(null);
      setFormData({ title: "", description: "", price: "", oldPrice: "", imageUrl: "", instamojoLink: "", features: "", order: courses?.length || 0 });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!db) return;
    
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      features: formData.features.split("\n").filter(f => f.trim() !== ""),
      order: Number(formData.order)
    };

    if (editingCourse) {
      const docRef = doc(db, "courses", editingCourse.id);
      updateDoc(docRef, payload).catch(async (e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'update', requestResourceData: payload }));
      });
    } else {
      const colRef = collection(db, "courses");
      addDoc(colRef, payload).catch(async (e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: colRef.path, operation: 'create', requestResourceData: payload }));
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!db) return;
    if (confirm("Are you sure you want to delete this course?")) {
      const docRef = doc(db, "courses", id);
      deleteDoc(docRef).catch(async (e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'delete' }));
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold uppercase tracking-tight">Manage Courses</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">Dynamic Learning Content & Enrollments</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-primary rounded-none h-12 px-8 font-bold uppercase tracking-widest text-xs">
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      <Alert className="bg-primary/5 border-primary/20 rounded-none">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-[10px] font-bold uppercase tracking-widest">Dashboard Note</AlertTitle>
        <AlertDescription className="text-xs font-medium text-muted-foreground">
          The Home Page displays the first 3 courses based on the <strong>Sort Order</strong>. The Courses Page displays all entries.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-20 opacity-50 font-bold uppercase tracking-[0.3em]">Syncing Courses...</div>
        ) : courses?.length === 0 ? (
          <div className="text-center py-20 bg-card/20 border border-dashed border-white/10 opacity-50 font-bold uppercase tracking-widest">No courses found. Add one to get started.</div>
        ) : courses?.map((course) => (
          <Card key={course.id} className="bg-card/40 border-white/5 rounded-none overflow-hidden group shadow-none">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 relative aspect-[16/9] bg-muted shrink-0">
                {course.imageUrl && <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />}
              </div>
              <CardContent className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-headline font-bold">{course.title}</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(course)} className="rounded-none border-white/10 hover:bg-primary hover:text-white">
                        <Edit3 size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(course.id)} className="rounded-none border-white/10 hover:bg-destructive hover:text-white">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-medium">{course.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xl font-bold">₹{course.price}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10">Order: {course.order}</span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <a href={course.instamojoLink} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-primary flex items-center gap-2 hover:underline uppercase tracking-widest">
                    <ExternalLink size={14} /> Instamojo Gateway
                  </a>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-white/10 rounded-none max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-8 border-b border-white/10 bg-white/5">
            <DialogTitle className="text-2xl font-headline font-bold uppercase tracking-tight">{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Course Title</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="e.g. NISM Series 8" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sort Order (0-2 for Home)</label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="bg-background rounded-none border-white/5 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[120px]" placeholder="Detailed description of the course..." />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Price (₹)</label>
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="599" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Old Price (₹)</label>
                <Input type="number" value={formData.oldPrice} onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="1499" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Image URL (16:9 Cinematic)</label>
              <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Instamojo Payment Link</label>
              <Input value={formData.instamojoLink} onChange={(e) => setFormData({ ...formData, instamojoLink: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="https://imjo.in/..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Highlights (One per line)</label>
              <Textarea value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[100px]" placeholder="Live Sessions&#10;Study Material&#10;Mock Tests" />
            </div>
          </div>
          <DialogFooter className="p-8 border-t border-white/10 bg-white/5 gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-none border-white/10 h-12 px-8 font-bold uppercase tracking-widest text-[10px]">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary rounded-none h-12 px-10 font-bold uppercase tracking-widest text-[10px]">Save Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
