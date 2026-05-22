
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Loader2, Sparkles, GraduationCap, ArrowRight, Lightbulb } from "lucide-react";
import { personalLearningPathFinder, type PersonalLearningPathFinderOutput } from "@/ai/flows/personal-learning-path-finder-flow";

export function AIPathFinder() {
  const [background, setBackground] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalLearningPathFinderOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const output = await personalLearningPathFinder({
        tradingBackground: background,
        financialGoals: goals,
      });
      setResult(output);
    } catch (error) {
      console.error("Pathfinder failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-finder" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
            <BrainCircuit className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">AI Learning <span className="text-primary">Pathfinder</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Unsure where to start? Tell our AI advisor about your background and goals, and we'll craft a personalized roadmap just for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="border-white/10 bg-background/50 backdrop-blur-md shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Profile
              </CardTitle>
              <CardDescription>Give us a brief overview of your current knowledge.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Trading Background</label>
                  <Textarea 
                    placeholder="e.g. Absolute beginner, or 2 years in crypto, or preparing for NISM Series 8..."
                    className="min-h-[120px] bg-background border-white/10 focus:border-primary/50"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Your Goals</label>
                  <Textarea 
                    placeholder="e.g. Become a full-time research analyst, or master risk management in derivatives..."
                    className="min-h-[120px] bg-background border-white/10 focus:border-primary/50"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading || !background || !goals} 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Your Future...
                    </>
                  ) : (
                    "Generate My Path"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {!result && !loading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-2xl"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <GraduationCap className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-2">Ready to Start?</h3>
                  <p className="text-muted-foreground">Fill out the form to receive your custom educational roadmap instantly.</p>
                </motion.div>
              ) : loading ? (
                <motion.div 
                   key="loading"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-2xl animate-pulse"
                >
                  <BrainCircuit className="w-16 h-16 text-primary mb-6 animate-bounce" />
                  <h3 className="text-2xl font-headline font-bold mb-2">AI is Thinking...</h3>
                  <p className="text-muted-foreground">Curating the perfect courses based on your unique goals.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                    <h3 className="text-xl font-headline font-bold mb-3 flex items-center gap-2">
                      <Lightbulb className="text-primary w-5 h-5" />
                      Our Recommendation
                    </h3>
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{result?.learningPathDescription}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Recommended Curriculum</h4>
                    {result?.recommendedCourses.map((course, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-xl bg-card border border-white/5 flex items-center justify-between group hover:border-primary/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h5 className="font-bold text-lg group-hover:text-primary transition-colors">{course.courseName}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{course.courseDescription}</p>
                          <span className="text-xs font-bold text-accent uppercase">{course.relevance}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
