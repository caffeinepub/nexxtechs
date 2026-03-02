import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Course } from "../backend.d";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: (courseId: bigint) => void;
  isEnrolling?: boolean;
  index?: number;
}

function getThumbnail(course: Course): string {
  if (course.thumbnailUrl && course.thumbnailUrl.trim() !== "") {
    return course.thumbnailUrl;
  }
  return `https://picsum.photos/seed/${course.id.toString()}/600/400`;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const lower = difficulty.toLowerCase();
  if (lower === "beginner") {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full badge-beginner font-medium">
        Beginner
      </span>
    );
  }
  if (lower === "intermediate") {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full badge-intermediate font-medium">
        Intermediate
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full badge-advanced font-medium">
      Advanced
    </span>
  );
}

export function CourseCard({
  course,
  isEnrolled = false,
  onEnroll,
  isEnrolling = false,
  index = 0,
}: CourseCardProps) {
  const thumbnail = getThumbnail(course);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group card-glow rounded-xl overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <Link
        to="/courses/$id"
        params={{ id: course.id.toString() }}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="text-xs bg-background/80 backdrop-blur-sm border-border"
            >
              {course.category}
            </Badge>
          </div>
          {/* Price overlay */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                course.price === 0
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-background/80 backdrop-blur-sm text-foreground border border-border"
              }`}
            >
              {course.price === 0 ? "FREE" : `$${course.price}`}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <Link to="/courses/$id" params={{ id: course.id.toString() }}>
          <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}h
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules.length} modules
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            4.9
          </span>
        </div>

        {/* Difficulty */}
        <div>
          <DifficultyBadge difficulty={course.difficulty} />
        </div>

        {/* Enroll button */}
        <div className="mt-auto pt-2">
          {isEnrolled ? (
            <Link to="/dashboard" className="block">
              <Button variant="secondary" className="w-full" size="sm">
                Continue Learning
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full bg-primary text-primary-foreground hover:opacity-90"
              size="sm"
              onClick={() => onEnroll?.(course.id)}
              disabled={isEnrolling}
            >
              {isEnrolling
                ? "Enrolling..."
                : course.price === 0
                  ? "Enroll Free"
                  : "Enroll Now"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
