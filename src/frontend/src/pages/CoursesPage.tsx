import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Course } from "../backend.d";
import { CourseCard } from "../components/CourseCard";
import { sampleCourses } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllCourses,
  useCourseCategories,
  useEnrollInCourse,
  useEnrolledCourses,
} from "../hooks/useQueries";

const DIFFICULTY_OPTIONS = ["All", "Beginner", "Intermediate", "Advanced"];

export function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const { data: backendCourses, isLoading } = useAllCourses();
  const { data: backendCategories } = useCourseCategories();
  const { data: enrolledIds } = useEnrolledCourses();
  const { mutate: enrollInCourse, isPending: isEnrolling } =
    useEnrollInCourse();
  const { identity, login } = useInternetIdentity();

  const courses: Course[] =
    backendCourses && backendCourses.length > 0
      ? backendCourses
      : sampleCourses;
  const sampleCategories = [...new Set(sampleCourses.map((c) => c.category))];
  const categories = [
    "All",
    ...(backendCategories && backendCategories.length > 0
      ? backendCategories
      : sampleCategories),
  ];

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        search === "" ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "All" ||
        course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [courses, search, selectedCategory, selectedDifficulty]);

  function handleEnroll(courseId: bigint) {
    if (!identity) {
      login();
      return;
    }
    enrollInCourse(courseId, {
      onSuccess: () => toast.success("Successfully enrolled!"),
      onError: () => toast.error("Enrollment failed. Please try again."),
    });
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
  }

  const hasFilters =
    search !== "" || selectedCategory !== "All" || selectedDifficulty !== "All";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            All <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {courses.length} expert-led courses to advance your IT career
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, topics, technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
            {search && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "card-glow text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground">Difficulty:</span>
            {DIFFICULTY_OPTIONS.map((diff) => (
              <button
                type="button"
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? "bg-accent text-accent-foreground"
                    : "card-glow text-muted-foreground hover:text-foreground"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Active filters + clear */}
          {hasFilters && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>
              {search && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  "{search}"
                  <button type="button" onClick={() => setSearch("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory !== "All" && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {selectedCategory}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("All")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedDifficulty !== "All" && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {selectedDifficulty}
                  <button
                    type="button"
                    onClick={() => setSelectedDifficulty("All")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </motion.div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} of {courses.length} courses
        </p>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
              <div key={sk} className="card-glow rounded-xl overflow-hidden">
                <Skeleton className="aspect-video" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, index) => (
              <CourseCard
                key={course.id.toString()}
                course={course}
                isEnrolled={
                  enrolledIds?.map(String).includes(course.id.toString()) ??
                  false
                }
                onEnroll={handleEnroll}
                isEnrolling={isEnrolling}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
