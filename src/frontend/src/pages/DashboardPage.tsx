import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";

export function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <div className="card-glow rounded-3xl p-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Dashboard is available after{" "}
            <span className="gradient-text">enrollment</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Browse our courses to get started. Once you enroll, your learning
            dashboard will track your progress and keep you on track.
          </p>
          <Link to="/courses">
            <Button className="gap-2 bg-primary text-primary-foreground hover:opacity-90 glow-cyan">
              <BookOpen className="h-4 w-4" />
              Browse Courses
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
