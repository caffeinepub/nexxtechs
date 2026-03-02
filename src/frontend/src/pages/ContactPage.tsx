import { MapPin, MessageSquare, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import { EnquiryForm } from "../components/EnquiryForm";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        {/* Decorative glow blobs */}
        <div className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <MessageSquare className="h-3.5 w-3.5" />
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight"
          >
            Let's Start Your{" "}
            <span className="gradient-text text-glow-cyan">IT Journey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Have questions about a course or program? Fill out the form below
            and our team will reach out to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Address Card */}
            <motion.div
              variants={itemVariants}
              className="card-glow rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Office Location
                </h2>
              </div>
              <address className="not-italic text-muted-foreground leading-relaxed text-sm pl-1">
                <p className="font-semibold text-foreground">
                  NexXTechs Institute
                </p>
                <p className="mt-1">B 54, First Floor,</p>
                <p>New Krishna Park,</p>
                <p>Vikaspuri, Janakpuri,</p>
                <p>Near Janakpuri West Metro Station</p>
                <p className="mt-1 font-medium text-primary">
                  Pin Code: 110058
                </p>
              </address>

              {/* Map-like decorative element */}
              <div className="mt-4 rounded-xl overflow-hidden border border-border bg-muted/30 h-32 flex items-center justify-center text-muted-foreground text-xs gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Near Janakpuri West Metro Station, Delhi
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              variants={itemVariants}
              className="card-glow rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Contact & WhatsApp
                </h2>
              </div>
              <div className="space-y-3">
                <a
                  href="https://wa.me/919217179762"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10 transition-all group"
                >
                  <SiWhatsapp className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-green-400 transition-colors">
                      +91 9217179762
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tap to chat on WhatsApp
                    </p>
                  </div>
                </a>
                <a
                  href="https://wa.me/919217179764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10 transition-all group"
                >
                  <SiWhatsapp className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-green-400 transition-colors">
                      +91 9217179764
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tap to chat on WhatsApp
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Collaboration Note */}
            <motion.div
              variants={itemVariants}
              className="card-glow rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤝</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Official Partner
                </p>
                <p className="text-sm font-semibold text-foreground">
                  In collaboration with{" "}
                  <span className="text-primary">CyberHooks Institute</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card-glow rounded-2xl p-6 md:p-8">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                  Send Us an Enquiry
                </h2>
                <p className="text-muted-foreground text-sm">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>
              <EnquiryForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mt-16"
      >
        <div className="card-glow rounded-2xl p-8 bg-circuit text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-accent/10 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Prefer to Chat Directly?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
              Reach us instantly on WhatsApp — our team is available Mon–Sat, 9
              AM to 7 PM.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919217179762"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors"
              >
                <SiWhatsapp className="h-4 w-4" />
                WhatsApp +91 9217179762
              </a>
              <a
                href="https://wa.me/919217179764"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors"
              >
                <SiWhatsapp className="h-4 w-4" />
                WhatsApp +91 9217179764
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
