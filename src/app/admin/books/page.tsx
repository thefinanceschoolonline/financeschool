
'use client';

import { useState, useMemo } from "react";
import { useCollection, useFirestore } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Edit3, Plus, ExternalLink, ListChecks, BookOpen } from "lucide-react";
import Image from "next/image";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function AdminBooksPage() {
  const db = useFirestore();
  
  const booksQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "books"), orderBy("order", "asc"));
  }, [db]);
  
  const { data: books, loading } = useCollection(booksQuery);
  const [editingBook, setEditingBook] = useState<any>(null);
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
    chaptersRaw: "" // Format: Title | Description per line
  });

  const handleOpenDialog = (book: any = null) => {
    if (book) {
      setEditingBook(book);
      const chapRaw = (book.chapters || []).map((c: any) => `${c.title} | ${c.description}`).join('\n');
      setFormData({
        title: book.title || "",
        description: book.description || "",
        longDescription: book.longDescription || "",
        price: book.price?.toString() || "",
        oldPrice: book.oldPrice?.toString() || "",
        imageUrl: book.imageUrl || "",
        instamojoLink: book.instamojoLink || "",
        features: (book.features || []).join("\n"),
        order: book.order || 0,
        chaptersRaw: chapRaw
      });
    } else {
      setEditingBook(null);
      setFormData({ 
        title: "", 
        description: "", 
        longDescription: "",
        price: "", 
        oldPrice: "", 
        imageUrl: "", 
        instamojoLink: "", 
        features: "",
        order: books?.length || 0,
        chaptersRaw: ""
      });
    }
    setIsDialogOpen(true);
  };

  const parseChapters = (raw: string) => {
    if (!raw.trim()) return [];
    return raw.split('\n').filter(l => l.trim().includes('|')).map(l => {
      const [title, description] = l.split('|');
      return { title: title?.trim(), description: description?.trim() };
    });
  };

  const handleSave = () => {
    if (!db) return;
    
    const chapters = parseChapters(formData.chaptersRaw);
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
      chapters: chapters
    };

    if (editingBook) {
      const docRef = doc(db, "books", editingBook.id);
      updateDoc(docRef, payload).catch(async (e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'update', requestResourceData: payload }));
      });
    } else {
      const colRef = collection(db, "books");
      addDoc(colRef, payload).catch(async (e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: colRef.path, operation: 'create', requestResourceData: payload }));
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!db) return;
    if (confirm("Are you sure you want to delete this book?")) {
      const docRef = doc(db, "books", id);
      deleteDoc(docRef).catch(async (e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'delete' }));
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold uppercase tracking-tight">Manage Books</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">Educational Resources & Study Material</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-primary rounded-none h-12 px-8 font-bold uppercase tracking-widest text-xs">
          <Plus className="mr-2 h-4 w-4" /> Add New Book
        </Button>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-20 opacity-50 font-bold uppercase tracking-[0.3em]">Syncing Books...</div>
        ) : !books || books.length === 0 ? (
          <div className="text-center py-20 bg-card/20 border border-dashed border-white/10 opacity-50 font-bold uppercase tracking-widest">No books found. Add one to get started.</div>
        ) : books.map((book) => (
          <Card key={book.id} className="bg-card/40 border-white/5 rounded-none overflow-hidden group shadow-none">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 relative aspect-[16/9] bg-muted shrink-0 flex items-center justify-center overflow-hidden">
                {book.imageUrl && <Image src={book.imageUrl} alt={book.title} fill className="object-contain" />}
              </div>
              <CardContent className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-headline font-bold">{book.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 opacity-60">Order: {book.order}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(book)} className="rounded-none border-white/10 hover:bg-primary hover:text-white">
                        <Edit3 size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(book.id)} className="rounded-none border-white/10 hover:bg-destructive hover:text-white">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-medium">{book.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xl font-bold">₹{book.price}</span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <a href={book.instamojoLink} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-primary flex items-center gap-2 hover:underline uppercase tracking-widest">
                    <ExternalLink size={14} /> Instamojo Link
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
            <DialogTitle className="text-2xl font-headline font-bold uppercase tracking-tight">{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Book Title</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="e.g. Master Course Book" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sort Order</label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="bg-background rounded-none border-white/5 h-12" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Description (For List Cards)</label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[80px]" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Detailed Content (About Section on Details Page)</label>
              <Textarea value={formData.longDescription} onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[150px]" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Price (₹)</label>
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="499" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Old Price (₹)</label>
                <Input type="number" value={formData.oldPrice} onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })} className="bg-background rounded-none border-white/5 h-12" placeholder="999" />
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Key Features (One per line)</label>
              <Textarea value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} className="bg-background rounded-none border-white/5 min-h-[120px]" />
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary h-4 w-4" />
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Table of Contents / Chapters (Senior Dev UX)</label>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Format: <strong>Chapter Title | Brief Description</strong> per line.</p>
              <Textarea 
                value={formData.chaptersRaw} 
                onChange={(e) => setFormData({ ...formData, chaptersRaw: e.target.value })} 
                className="bg-background rounded-none border-white/5 min-h-[200px] font-mono text-xs" 
                placeholder="Introduction | Basic overview of the material&#10;Core Concepts | Deep dive into fundamentals"
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
