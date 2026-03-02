import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";

export function AdminPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <div className="card-glow rounded-3xl p-12">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Admin panel is not available{" "}
            <span className="gradient-text">in this version</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            The admin panel requires the full backend version of NexXTechs. This
            is the static frontend preview.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2 border-border">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
