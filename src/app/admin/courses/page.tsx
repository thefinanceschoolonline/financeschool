
'use client';

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCollection, useFirestore } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Edit3, Plus, ExternalLink, Info, Star, BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export default function AdminCoursesPage() {
  const db = useFirestore();
  const searchParams = useSearchParams();
  const viewMode = searchParams.get('view') || 'all';
  
  const coursesQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "courses"), orderBy("order", "asc"));
  }, [db]);
  
  const { data: allCourses, loading } = useCollection(coursesQuery);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    oldPrice: "",
    imageUrl: "",
    instamojoLink: "",
    features: "",
    order: 0,
    curriculumRaw: "" // For senior dev UX: Chapters separated by empty line, lessons starting with -
  });

  const filteredCourses = useMemo(() => {
    if (!allCourses) return [];
    if (viewMode === 'featured') {
      return allCourses.filter(c => (c.order !== undefined && c.order < 3));
    }
    return allCourses;
  }, [allCourses, viewMode]);

  const handleOpenDialog = (course: any = null) => {
    if (course) {
      setEditingCourse(course);
      // Format curriculum back to raw text for editing
      const raw = (course.curriculum || []).map((chap: any) => {
        return `${chap.title} | ${chap.duration}\n${(chap.lessons || []).map((l: string) => `- ${l}`).join('\n')}`;
      }).join('\n\n');

      setFormData({
        title: course.title || "",
        description: course.description || "",
        longDescription: course.longDescription || "",
        price: course.price?.toString() || "",
        oldPrice: course.oldPrice?.toString() || "",
        imageUrl: course.imageUrl || "",
        instamojoLink: course.instamojoLink || "",
        features: (course.features || []).join("\n"),
        order: course.order || 0,
        curriculumRaw: raw
      });
    } else {
      setEditingCourse(null);
      setFormData({ 
        title: "", 
        description: "", 
        longDescription: "",
        price: "", 
        oldPrice: "", 
        imageUrl: "", 
        instamojoLink: "", 
        features: "", 
        order: allCourses?.length || 0,
        curriculumRaw: ""
      });
    }
    setIsDialogOpen(true);
  };

  const parseCurriculum = (raw: string) => {
    if (!raw.trim()) return [];
    const chapters = raw.split('\n\n');
    return chapters.map(chapStr => {
      const lines = chapStr.split('\n');
      const header = lines[0].split('|');
      const title = header[0]?.trim() || "Untitled Chapter";
      const duration = header[1]?.trim() || "0h 0m";
      const lessons = lines.slice(1)
        .filter(l => l.trim().startsWith('-'))
        .map(l => l.trim().substring(1).trim());
      return { title, duration, lessons };
    });
  };

  const handleSave = () => {
    if (!db) return;
    
    const curriculum = parseCurriculum(formData.curriculumRaw);
    const payload = {
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription,
      price: parseFloat(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      imageUrl: formData.imageUrl,
      instamojoLink: formData.instamojoLink,
      features: formData.features.split("\n").filter(f => f.trim() !== ""),
      order: Number(formData.order),
      curriculum: curriculum
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
          <h1 className="text-3xl font-headline font-bold uppercase tracking-tight">
            {viewMode === 'featured' ? "Home Page Featured" : "Course Catalog"}
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">
            {viewMode === 'featured' ? "Managing the top 3 slots for the home page" : "Managing all active learning programs"}
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-primary rounded-none h-12 px-8 font-bold uppercase tracking-widest text-xs">
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      <Alert className="bg-primary/5 border-primary/20 rounded-none">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-[10px] font-bold uppercase tracking-widest">Sorting Logic</AlertTitle>
        <AlertDescription className="text-xs font-medium text-muted-foreground">
          Courses with <strong>Sort Order 0, 1, and 2</strong> are automatically displayed in the "Featured" section on the Home Page.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-20 opacity-50 font-bold uppercase tracking-[0.3em]">Syncing Data...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-card/20 border border-dashed border-white/10 opacity-50 font-bold uppercase tracking-widest">
            {viewMode === 'featured' ? "No featured courses found (Order < 3)." : "No courses found."}
          </div>
        ) : filteredCourses.map((course) => (
          <Card key={course.id} className={cn(
            "bg-card/40 border-white/5 rounded-none overflow-hidden group shadow-none",
            course.order < 3 && "border-primary/20 bg-primary/5"
          )}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 relative aspect-[16/9] bg-muted shrink-0">
                {course.imageUrl && <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />}
                {course.order < 3 && (
                  <div className="absolute top-2 left-2 bg-primary px-2 py-1 text-[8px] font-bold text-white uppercase tracking-tighter">Home Featured</div>
                )}
              </div>
              <CardContent className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                       <h3 className="text-2xl font-headline font-bold">{course.title}</h3>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 opacity-60">Order: {course.order}</span>
                          {course.order < 3 && <Star size={12} className="text-primary fill-primary" />}
                       </div>
                    </div>
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
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-primary">
                      <BookOpen size={14} /> {course.curriculum?.length || 0} Chapters
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-accent">
                      <Clock size={14} /> ₹{course.price}
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <a href={course.instamojoLink} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-primary flex items-center gap-2 hover:underline uppercase tracking-widest">
                    <ExternalLink size={14} /> View Gateway
                  </a>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl bg-card border-white/10 rounded-none max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-8 border-b border-white/10 bg-white/5">
            <DialogTitle className="text-2xl font-headline font-bold uppercase tracking-tight">{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-8 p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Course Title</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-background rounded-none border-white/5 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sort Order (0, 1, 2 for Home)</label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="bg-background rounded-none border-white/5 h-12" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Description (For List Cards)</label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[80px]" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Detailed Content (About Section on Syllabus Page)</label>
              <Textarea value={formData.longDescription} onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[150px]" placeholder="Deep dive into what the course covers..." />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price (₹)</label>
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="bg-background rounded-none border-white/5 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Old Price (₹)</label>
                <Input type="number" value={formData.oldPrice} onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })} className="bg-background rounded-none border-white/5 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Image URL</label>
              <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="bg-background rounded-none border-white/5 h-12" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Instamojo Link</label>
              <Input value={formData.instamojoLink} onChange={(e) => setFormData({ ...formData, instamojoLink: e.target.value })} className="bg-background rounded-none border-white/5 h-12" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Key Highlights (One per line)</label>
              <Textarea value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[100px]" />
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary h-4 w-4" />
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Curriculum Editor (Senior Dev UX)</label>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Format: <strong>Title | Duration</strong> followed by <strong>- Lesson Name</strong>. Separate chapters with an empty line.</p>
              <Textarea 
                value={formData.curriculumRaw} 
                onChange={(e) => setFormData({ ...formData, curriculumRaw: e.target.value })} 
                className="bg-background rounded-none border-white/5 min-h-[300px] font-mono text-xs leading-relaxed" 
                placeholder="Introduction | 1h 30m&#10;- Lesson One Name&#10;- Lesson Two Name&#10;&#10;Advanced Module | 4h 00m&#10;- Deep Dive Lesson"
              />
            </div>
          </div>
          <DialogFooter className="p-8 border-t border-white/10 bg-white/5 gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-none border-white/10 h-12 px-8 font-bold uppercase tracking-widest text-[10px]">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary rounded-none h-12 px-10 font-bold uppercase tracking-widest text-[10px]">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
