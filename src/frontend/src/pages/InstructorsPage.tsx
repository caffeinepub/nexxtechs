import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Course, Instructor } from "../backend.d";
import { sampleCourses, sampleInstructors } from "../data/sampleData";
import { useAllCourses, useAllInstructors } from "../hooks/useQueries";

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

export function InstructorsPage() {
  const { data: backendInstructors, isLoading } = useAllInstructors();
  const { data: backendCourses } = useAllCourses();

  const instructors: Instructor[] =
    backendInstructors && backendInstructors.length > 0
      ? backendInstructors
      : sampleInstructors;
  const courses: Course[] =
    backendCourses && backendCourses.length > 0
      ? backendCourses
      : sampleCourses;

  function getInstructorCourseCount(instructorId: bigint): number {
    return courses.filter(
      (c) =>
        c.instructorId !== undefined &&
        c.instructorId.toString() === instructorId.toString(),
    ).length;
  }

  function getAvatarUrl(instructor: Instructor): string {
    if (instructor.avatarUrl && instructor.avatarUrl.trim() !== "")
      return instructor.avatarUrl;
    return `https://picsum.photos/seed/${instructor.id.toString()}/300/300`;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Meet Our <span className="gradient-text">Instructors</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn from industry veterans who are still actively working in the
            field. Real experience, practical knowledge.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-14"
        >
          {[
            {
              icon: Users,
              value: `${instructors.length}`,
              label: "Expert Instructors",
            },
            {
              icon: BookOpen,
              value: `${courses.length}+`,
              label: "Total Courses",
            },
            { icon: Star, value: "4.9", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="h-4 w-4 text-primary" />
                <span className="font-display text-2xl font-bold gradient-text">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Instructors grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["is1", "is2", "is3"].map((sk) => (
              <div key={sk} className="card-glow rounded-xl p-6 space-y-4">
                <Skeleton className="w-20 h-20 rounded-full mx-auto" />
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {instructors.map((instructor) => {
              const courseCount = getInstructorCourseCount(instructor.id);
              const avatar = getAvatarUrl(instructor);

              return (
                <motion.div
                  key={instructor.id.toString()}
                  variants={itemVariants}
                  className="card-glow rounded-xl p-8 text-center group"
                >
                  {/* Avatar */}
                  <div className="relative w-24 h-24 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-md group-hover:blur-lg transition-all" />
                    <img
                      src={avatar}
                      alt={instructor.name}
                      className="relative w-24 h-24 rounded-full object-cover border-2 border-border"
                    />
                  </div>

                  {/* Name & Role */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {instructor.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {courseCount} course{courseCount !== 1 ? "s" : ""}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      4.9
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5 text-left">
                    {instructor.bio}
                  </p>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {instructor.expertise.slice(0, 4).map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                    {instructor.expertise.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{instructor.expertise.length - 4}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty state */}
        {!isLoading && instructors.length === 0 && (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              No instructors yet
            </h3>
            <p className="text-muted-foreground">
              Instructors will appear here soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
