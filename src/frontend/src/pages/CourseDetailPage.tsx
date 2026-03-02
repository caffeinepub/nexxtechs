import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Instructor } from "../backend.d";
import { sampleCourses, sampleInstructors } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddTestimonial,
  useAllInstructors,
  useAllTestimonials,
  useCourseById,
  useCourseProgress,
  useEnrollInCourse,
  useEnrolledCourses,
  useMarkModuleCompleted,
} from "../hooks/useQueries";

export function CourseDetailPage() {
  const { id } = useParams({ from: "/courses/$id" });
  const courseId = BigInt(id);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const { data: course, isLoading } = useCourseById(courseId);
  const { data: backendInstructors } = useAllInstructors();
  const { data: enrolledIds } = useEnrolledCourses();
  const { data: progress } = useCourseProgress(courseId);
  const { data: allTestimonials } = useAllTestimonials();
  const { mutate: enroll, isPending: isEnrolling } = useEnrollInCourse();
  const { mutate: markComplete, isPending: isMarkingComplete } =
    useMarkModuleCompleted();
  const { mutate: addTestimonial, isPending: isSubmittingReview } =
    useAddTestimonial();
  const { identity, login } = useInternetIdentity();

  // Fallback to sample data
  const displayCourse =
    course ?? sampleCourses.find((c) => c.id === courseId) ?? sampleCourses[0];
  const instructors: Instructor[] =
    backendInstructors && backendInstructors.length > 0
      ? backendInstructors
      : sampleInstructors;

  const instructor = instructors.find(
    (i) => i.id === displayCourse?.instructorId,
  );
  const isEnrolled =
    enrolledIds?.map(String).includes(courseId.toString()) ?? false;
  const courseTestimonials =
    allTestimonials?.filter(
      (t) => t.courseId.toString() === courseId.toString(),
    ) ?? [];

  function getThumbnail(thumbnailUrl: string): string {
    if (thumbnailUrl && thumbnailUrl.trim() !== "") return thumbnailUrl;
    return `https://picsum.photos/seed/${courseId.toString()}/1200/500`;
  }

  function handleEnroll() {
    if (!identity) {
      login();
      return;
    }
    enroll(courseId, {
      onSuccess: () =>
        toast.success("Successfully enrolled! Start learning now."),
      onError: () => toast.error("Enrollment failed. Please try again."),
    });
  }

  function handleMarkComplete(moduleId: bigint) {
    if (!identity) return;
    markComplete(
      { courseId, moduleId },
      {
        onSuccess: () => toast.success("Module marked as complete!"),
        onError: () => toast.error("Failed to mark module. Please try again."),
      },
    );
  }

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!identity) {
      login();
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please write a review comment.");
      return;
    }
    addTestimonial(
      { courseId, rating: BigInt(reviewRating), comment: reviewComment },
      {
        onSuccess: () => {
          toast.success("Review submitted!");
          setReviewComment("");
          setReviewRating(5);
        },
        onError: () => toast.error("Failed to submit review."),
      },
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </div>
    );
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

            {/* Progress bar (if enrolled) */}
            {isEnrolled && progress !== undefined && (
              <div className="card-glow rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Your Progress
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {progress === 100
                    ? "🎉 Course completed!"
                    : "Keep going, you're doing great!"}
                </p>
              </div>
            )}

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
                        {isEnrolled && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 text-xs"
                            onClick={() => handleMarkComplete(mod.id)}
                            disabled={isMarkingComplete}
                          >
                            {isMarkingComplete ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            )}
                            Mark as Complete
                          </Button>
                        )}
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

            {/* Reviews */}
            {courseTestimonials.length > 0 && (
              <>
                <Separator />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    Student Reviews
                  </h2>
                  <div className="space-y-4">
                    {courseTestimonials.map((t) => (
                      <div
                        key={t.userId.toString()}
                        className="card-glow rounded-xl p-5"
                      >
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5]
                            .slice(0, Number(t.rating))
                            .map((star) => (
                              <Star
                                key={star}
                                className="h-4 w-4 fill-amber-400 text-amber-400"
                              />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t.comment}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-2">
                          {t.userId.toString().slice(0, 12)}...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Add Review (enrolled users) */}
            {isEnrolled && (
              <>
                <Separator />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    Leave a Review
                  </h2>
                  <form
                    onSubmit={handleSubmitReview}
                    className="card-glow rounded-xl p-6 space-y-4"
                  >
                    <div>
                      <span className="text-sm font-medium text-foreground mb-2 block">
                        Rating
                      </span>
                      <fieldset className="flex gap-1 border-0 p-0 m-0">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setReviewRating(r)}
                            aria-label={`${r} star${r !== 1 ? "s" : ""}`}
                            className="focus-visible:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 transition-colors ${
                                r <= reviewRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </fieldset>
                    </div>
                    <div>
                      <label
                        htmlFor="review-comment"
                        className="text-sm font-medium text-foreground mb-2 block"
                      >
                        Your Review
                      </label>
                      <Textarea
                        id="review-comment"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience with this course..."
                        className="bg-card border-border resize-none"
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="gap-2"
                    >
                      {isSubmittingReview && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      Submit Review
                    </Button>
                  </form>
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
                  <>
                    <span className="gradient-text">
                      ${displayCourse.price}
                    </span>
                  </>
                )}
              </div>

              {isEnrolled ? (
                <div className="space-y-3">
                  <Button className="w-full gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30">
                    <CheckCircle2 className="h-4 w-4" />
                    Enrolled
                  </Button>
                  <Link to="/dashboard">
                    <Button className="w-full gap-2" variant="outline">
                      <PlayCircle className="h-4 w-4" />
                      Go to Dashboard
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  className="w-full gap-2 bg-primary text-primary-foreground hover:opacity-90 glow-cyan"
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  size="lg"
                >
                  {isEnrolling ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PlayCircle className="h-4 w-4" />
                  )}
                  {isEnrolling
                    ? "Enrolling..."
                    : displayCourse.price === 0
                      ? "Enroll for Free"
                      : "Enroll Now"}
                </Button>
              )}

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
