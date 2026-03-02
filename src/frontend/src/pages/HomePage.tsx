import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  Globe,
  MapPin,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import { CourseCard } from "../components/CourseCard";
import { EnquiryForm } from "../components/EnquiryForm";
import {
  categoryIcons,
  sampleCourses,
  sampleInstructors,
  sampleTestimonials,
} from "../data/sampleData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomePage() {
  const courses = sampleCourses;
  const instructors = sampleInstructors;
  const displayTestimonials = sampleTestimonials;

  const featuredCourses = courses.slice(0, 6);
  const categories = [...new Set(courses.map((c) => c.category))];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x500.jpg"
            alt="NexXTechs Platform"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-circuit opacity-30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 gap-2 px-4 py-1.5 text-sm border-border bg-muted"
            >
              <Zap className="h-3.5 w-3.5 text-primary" />
              Industry-Leading IT Education Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            <span className="gradient-text text-glow-cyan">Level Up</span>
            <br />
            <span className="text-foreground">Your Tech Career</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Master cutting-edge technologies with hands-on courses taught by
            industry experts. From web dev to AI engineering — your future
            starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/courses">
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:opacity-90 glow-cyan px-8"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/instructors">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border px-8"
              >
                Meet Our Instructors
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                icon: BookOpen,
                value: `${courses.length}+`,
                label: "Expert Courses",
              },
              {
                icon: Users,
                value: `${instructors.length * 5}+`,
                label: "Instructors",
              },
              { icon: TrendingUp, value: "50K+", label: "Students Enrolled" },
              { icon: Award, value: "98%", label: "Completion Rate" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="card-glow rounded-xl p-4 text-center"
              >
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-circuit">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From AI to cybersecurity — find the specialization that matches
              your career goals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((cat) => (
              <motion.div key={cat} variants={itemVariants}>
                <Link to="/courses">
                  <button
                    type="button"
                    className="card-glow rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium text-foreground hover:border-primary/50 transition-all"
                  >
                    <span className="text-lg">
                      {categoryIcons[cat] || "💡"}
                    </span>
                    {cat}
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-muted-foreground">
                Start learning with our most popular courses
              </p>
            </motion.div>
            <Link to="/courses">
              <Button
                variant="ghost"
                className="gap-1 text-primary hover:text-primary/80"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard
                key={course.id.toString()}
                course={course}
                isEnrolled={false}
                onEnroll={() => {}}
                isEnrolling={false}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features/Why NexXTechs */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="gradient-text">NexXTechs</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We're not just another learning platform — we're your career
              acceleration partner.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Zap,
                title: "Project-Based Learning",
                description:
                  "Every course includes real-world projects that you can add directly to your portfolio. No theory-only courses here.",
                color: "text-cyan-DEFAULT",
              },
              {
                icon: Shield,
                title: "Industry-Certified Content",
                description:
                  "Curriculum designed by active industry professionals aligned with the latest certification standards and job requirements.",
                color: "text-accent",
              },
              {
                icon: Globe,
                title: "Learn at Your Own Pace",
                description:
                  "Lifetime access to all course materials. Study when it works for you, revisit content as many times as needed.",
                color: "text-emerald-400",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="card-glow rounded-xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-muted-foreground">
              Real outcomes from real learners
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayTestimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="card-glow rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].slice(0, t.rating).map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{t.comment}"
                </p>
                <div className="mt-auto">
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                  <div className="text-xs text-primary mt-1">
                    {t.courseTitle}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact / Enquiry Section */}
      <section className="py-20 bg-circuit">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Interested in a course? Drop us an enquiry and we'll help you find
              the right program for your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Contact Info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Address */}
              <div className="card-glow rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Our Office
                  </h3>
                </div>
                <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                  B 54, First Floor, New Krishna Park,
                  <br />
                  Vikaspuri, Janakpuri,
                  <br />
                  Near Janakpuri West Metro Station
                  <br />
                  <span className="text-primary font-medium">
                    Pin Code: 110058
                  </span>
                </address>
              </div>

              {/* WhatsApp */}
              <div className="card-glow rounded-2xl p-5 space-y-2">
                <h3 className="font-semibold text-sm text-foreground mb-3">
                  WhatsApp Us
                </h3>
                <a
                  href="https://wa.me/919217179762"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-400 transition-colors"
                >
                  <SiWhatsapp className="h-4 w-4 text-green-500 flex-shrink-0" />
                  +91 9217179762
                </a>
                <a
                  href="https://wa.me/919217179764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-400 transition-colors"
                >
                  <SiWhatsapp className="h-4 w-4 text-green-500 flex-shrink-0" />
                  +91 9217179764
                </a>
              </div>

              {/* Collaboration */}
              <div className="card-glow rounded-2xl p-5">
                <p className="text-xs text-muted-foreground">
                  In collaboration with{" "}
                  <span className="text-primary font-semibold">
                    CyberHooks Institute
                  </span>
                </p>
              </div>

              <Link to="/contact">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-border hover:border-primary/50"
                >
                  View Full Contact Page
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="card-glow rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Quick Enquiry
                </h3>
                <EnquiryForm compact />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-circuit">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center card-glow rounded-3xl p-12 relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                Ready to <span className="gradient-text">Transform</span> Your
                Career?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Join 50,000+ tech professionals who have accelerated their
                careers with NexXTechs. Start learning today — many courses are
                completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses">
                  <Button
                    size="lg"
                    className="gap-2 bg-primary text-primary-foreground hover:opacity-90 glow-cyan px-10"
                  >
                    Start Learning Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-border"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
