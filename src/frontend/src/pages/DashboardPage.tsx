import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Clock,
  Loader2,
  LogIn,
  PlayCircle,
  TrendingUp,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Course } from "../backend.d";
import { sampleCourses } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllCourses,
  useCourseProgress,
  useEnrolledCourses,
  useSaveUserProfile,
  useUserProfile,
} from "../hooks/useQueries";

function EnrolledCourseCard({ course }: { course: Course }) {
  const { data: progress } = useCourseProgress(course.id);

  function getThumbnail(url: string): string {
    if (url && url.trim() !== "") return url;
    return `https://picsum.photos/seed/${course.id.toString()}/600/400`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-glow rounded-xl p-5 flex gap-4"
    >
      <img
        src={getThumbnail(course.thumbnailUrl)}
        alt={course.title}
        className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <Link to="/courses/$id" params={{ id: course.id.toString() }}>
          <h3 className="font-display font-semibold text-foreground text-sm mb-1 line-clamp-1 hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.duration}h
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {course.modules.length} modules
          </span>
          <Badge variant="secondary" className="text-xs">
            {course.category}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Progress value={progress ?? 0} className="h-1.5" />
          </div>
          <span className="text-xs font-bold text-primary w-10 text-right">
            {Math.round(progress ?? 0)}%
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Link to="/courses/$id" params={{ id: course.id.toString() }}>
          <Button size="sm" variant="outline" className="gap-1 text-xs">
            <PlayCircle className="h-3.5 w-3.5 text-primary" />
            Continue
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

function ProfileForm() {
  const { data: profile, isLoading } = useUserProfile();
  const { mutate: saveProfile, isPending } = useSaveUserProfile();
  const [name, setName] = useState(profile?.name ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    saveProfile(
      { name: name.trim() },
      {
        onSuccess: () => toast.success("Profile saved!"),
        onError: () => toast.error("Failed to save profile"),
      },
    );
  }

  if (isLoading) return <Skeleton className="h-24 w-full rounded-xl" />;

  return (
    <div className="card-glow rounded-xl p-5">
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <User className="h-4 w-4 text-primary" />
        Your Profile
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          placeholder="Your display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-card border-border flex-1"
        />
        <Button type="submit" disabled={isPending} size="sm">
          {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Save
        </Button>
      </form>
      {profile?.name && (
        <p className="text-xs text-muted-foreground mt-2">
          Current name: {profile.name}
        </p>
      )}
    </div>
  );
}

export function DashboardPage() {
  const { identity, login } = useInternetIdentity();
  const { data: backendCourses, isLoading: coursesLoading } = useAllCourses();
  const { data: enrolledIds, isLoading: enrolledLoading } =
    useEnrolledCourses();

  const allCourses: Course[] =
    backendCourses && backendCourses.length > 0
      ? backendCourses
      : sampleCourses;

  const enrolledCourses = enrolledIds
    ? allCourses.filter((c) =>
        enrolledIds.map(String).includes(c.id.toString()),
      )
    : [];

  const isLoading = coursesLoading || enrolledLoading;

  if (!identity) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Sign In to Access Dashboard
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Track your learning progress, access enrolled courses, and manage
            your profile.
          </p>
          <Button
            onClick={login}
            className="gap-2 bg-primary text-primary-foreground hover:opacity-90"
          >
            <LogIn className="h-4 w-4" />
            Sign In with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-2">
            Your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Track your learning journey and continue where you left off.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: BookOpen,
              label: "Enrolled",
              value: enrolledCourses.length.toString(),
              color: "text-primary",
            },
            {
              icon: TrendingUp,
              label: "In Progress",
              value: enrolledCourses.length.toString(),
              color: "text-accent",
            },
            {
              icon: Award,
              label: "Completed",
              value: "0",
              color: "text-emerald-400",
            },
            {
              icon: Clock,
              label: "Hours Learned",
              value: enrolledCourses
                .reduce((acc, c) => acc + c.duration, 0)
                .toString(),
              color: "text-amber-400",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glow rounded-xl p-5 text-center"
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
              <div className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-foreground mb-5">
              Your Courses
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {["ds1", "ds2", "ds3"].map((sk) => (
                  <div key={sk} className="card-glow rounded-xl p-5 flex gap-4">
                    <Skeleton className="w-24 h-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : enrolledCourses.length === 0 ? (
              <div className="card-glow rounded-xl p-10 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  No courses yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Start learning by enrolling in one of our expert-led courses.
                </p>
                <Link to="/courses">
                  <Button className="gap-2 bg-primary text-primary-foreground hover:opacity-90">
                    <BookOpen className="h-4 w-4" />
                    Browse Courses
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <EnrolledCourseCard
                    key={course.id.toString()}
                    course={course}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileForm />

            {/* Recommended */}
            <div className="card-glow rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-4">
                Recommended for You
              </h3>
              <div className="space-y-3">
                {sampleCourses.slice(0, 3).map((course) => (
                  <Link
                    key={course.id.toString()}
                    to="/courses/$id"
                    params={{ id: course.id.toString() }}
                    className="flex gap-3 group"
                  >
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-12 h-9 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {course.price === 0 ? "Free" : `$${course.price}`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/courses">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 gap-1"
                >
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
