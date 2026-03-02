import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Clock, Mail, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import { sampleCourses, sampleInstructors } from "../data/sampleData";

export function CourseDetailPage() {
  const { id } = useParams({ from: "/courses/$id" });
  const courseId = BigInt(id);

  const displayCourse =
    sampleCourses.find((c) => c.id === courseId) ?? sampleCourses[0];

  const instructor = sampleInstructors.find(
    (i) => i.id === displayCourse?.instructorId,
  );

  function getThumbnail(thumbnailUrl: string): string {
    if (thumbnailUrl && thumbnailUrl.trim() !== "") return thumbnailUrl;
    return `https://picsum.photos/seed/${courseId.toString()}/1200/500`;
  }

  if (!displayCourse) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Course not found
          </h1>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const thumbnail = getThumbnail(displayCourse.thumbnailUrl);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={thumbnail}
          alt={displayCourse.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        {/* Back link */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Courses
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{displayCourse.category}</Badge>
                <Badge
                  variant="outline"
                  className={`capitalize ${
                    displayCourse.difficulty === "beginner"
                      ? "badge-beginner"
                      : displayCourse.difficulty === "intermediate"
                        ? "badge-intermediate"
                        : "badge-advanced"
                  }`}
                >
                  {displayCourse.difficulty}
                </Badge>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                {displayCourse.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {displayCourse.duration} hours
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {displayCourse.modules.length} modules
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  4.9 rating
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  2,400+ enrolled
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                About This Course
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {displayCourse.description}
              </p>
            </div>

            <Separator />

            {/* Curriculum */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Course Curriculum
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {displayCourse.modules.map((mod, index) => (
                  <AccordionItem
                    key={mod.id.toString()}
                    value={mod.id.toString()}
                    className="card-glow rounded-xl border-0 px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-medium text-foreground">
                          {mod.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="pl-10">
                        <p className="text-sm text-muted-foreground mb-3">
                          {mod.description}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Instructor */}
            {instructor && (
              <>
                <Separator />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    Your Instructor
                  </h2>
                  <div className="card-glow rounded-xl p-6 flex gap-5">
                    <img
                      src={
                        instructor.avatarUrl ||
                        `https://picsum.photos/seed/${instructor.id.toString()}/300/300`
                      }
                      alt={instructor.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">
                        {instructor.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {instructor.expertise.map((exp) => (
                          <Badge
                            key={exp}
                            variant="secondary"
                            className="text-xs"
                          >
                            {exp}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-glow rounded-xl p-6 sticky top-24">
              <div className="text-3xl font-display font-extrabold text-foreground mb-2">
                {displayCourse.price === 0 ? (
                  <span className="text-emerald-400">Free</span>
                ) : (
                  <span className="gradient-text">${displayCourse.price}</span>
                )}
              </div>

              <Link to="/contact">
                <Button
                  className="w-full gap-2 bg-primary text-primary-foreground hover:opacity-90 glow-cyan"
                  size="lg"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us to Enroll
                </Button>
              </Link>

              <Separator className="my-5" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">
                    {displayCourse.duration} hours
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modules</span>
                  <span className="font-medium text-foreground">
                    {displayCourse.modules.length} lessons
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium text-foreground capitalize">
                    {displayCourse.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">
                    {displayCourse.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access</span>
                  <span className="font-medium text-foreground">Lifetime</span>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="text-center text-xs text-muted-foreground">
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
