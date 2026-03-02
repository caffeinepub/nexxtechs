import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  BookOpen,
  Edit2,
  Loader2,
  LogIn,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Course, CourseModule, Instructor } from "../backend.d";
import { sampleCourses, sampleInstructors } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllCourses,
  useAllInstructors,
  useCreateCourse,
  useCreateInstructor,
  useDeleteCourse,
  useDeleteInstructor,
  useIsAdmin,
  useUpdateCourse,
  useUpdateInstructor,
} from "../hooks/useQueries";

// ── Course Form ──────────────────────────────────────────────────

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  instructorId: string;
  thumbnailUrl: string;
  duration: string;
  difficulty: string;
  price: string;
  moduleTitles: string[];
  moduleDescriptions: string[];
}

const emptyCourseForm: CourseFormData = {
  title: "",
  description: "",
  category: "",
  instructorId: "",
  thumbnailUrl: "",
  duration: "0",
  difficulty: "beginner",
  price: "0",
  moduleTitles: [""],
  moduleDescriptions: [""],
};

function courseToForm(course: Course): CourseFormData {
  return {
    title: course.title,
    description: course.description,
    category: course.category,
    instructorId: course.instructorId?.toString() ?? "",
    thumbnailUrl: course.thumbnailUrl,
    duration: course.duration.toString(),
    difficulty: course.difficulty,
    price: course.price.toString(),
    moduleTitles: course.modules.map((m) => m.title),
    moduleDescriptions: course.modules.map((m) => m.description),
  };
}

// ── Instructor Form ──────────────────────────────────────────────

interface InstructorFormData {
  name: string;
  bio: string;
  avatarUrl: string;
  expertiseRaw: string;
}

const emptyInstructorForm: InstructorFormData = {
  name: "",
  bio: "",
  avatarUrl: "",
  expertiseRaw: "",
};

function instructorToForm(instructor: Instructor): InstructorFormData {
  return {
    name: instructor.name,
    bio: instructor.bio,
    avatarUrl: instructor.avatarUrl,
    expertiseRaw: instructor.expertise.join(", "),
  };
}

// ── Main Component ───────────────────────────────────────────────

export function AdminPage() {
  const { identity, login } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: backendCourses } = useAllCourses();
  const { data: backendInstructors } = useAllInstructors();

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const createInstructor = useCreateInstructor();
  const updateInstructor = useUpdateInstructor();
  const deleteInstructor = useDeleteInstructor();

  const courses: Course[] =
    backendCourses && backendCourses.length > 0
      ? backendCourses
      : sampleCourses;
  const instructors: Instructor[] =
    backendInstructors && backendInstructors.length > 0
      ? backendInstructors
      : sampleInstructors;

  // Course dialog state
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState<CourseFormData>(emptyCourseForm);

  // Instructor dialog state
  const [instructorDialogOpen, setInstructorDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(
    null,
  );
  const [instructorForm, setInstructorForm] =
    useState<InstructorFormData>(emptyInstructorForm);

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "course" | "instructor";
    id: bigint;
    title: string;
  } | null>(null);

  if (!identity) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Admin Access Required
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Please sign in to access the admin panel.
          </p>
          <Button
            onClick={login}
            className="gap-2 bg-primary text-primary-foreground hover:opacity-90"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-sm">
            You don't have admin privileges to access this area.
          </p>
        </div>
      </div>
    );
  }

  // ── Course CRUD ──────────────────────────────────────────────

  function openCreateCourse() {
    setEditingCourse(null);
    setCourseForm(emptyCourseForm);
    setCourseDialogOpen(true);
  }

  function openEditCourse(course: Course) {
    setEditingCourse(course);
    setCourseForm(courseToForm(course));
    setCourseDialogOpen(true);
  }

  function handleSaveCourse() {
    const modules: CourseModule[] = courseForm.moduleTitles.map((title, i) => ({
      id: BigInt(i + 1),
      title: title.trim(),
      description: courseForm.moduleDescriptions[i]?.trim() ?? "",
    }));

    const params = {
      title: courseForm.title.trim(),
      description: courseForm.description.trim(),
      category: courseForm.category.trim(),
      instructorId: courseForm.instructorId
        ? BigInt(courseForm.instructorId)
        : null,
      modules,
      thumbnailUrl: courseForm.thumbnailUrl.trim(),
      duration: Number(courseForm.duration),
      difficulty: courseForm.difficulty,
      price: Number(courseForm.price),
    };

    if (editingCourse) {
      updateCourse.mutate(
        { courseId: editingCourse.id, ...params },
        {
          onSuccess: () => {
            toast.success("Course updated!");
            setCourseDialogOpen(false);
          },
          onError: () => toast.error("Failed to update course"),
        },
      );
    } else {
      createCourse.mutate(params, {
        onSuccess: () => {
          toast.success("Course created!");
          setCourseDialogOpen(false);
        },
        onError: () => toast.error("Failed to create course"),
      });
    }
  }

  function handleDeleteCourse(courseId: bigint) {
    deleteCourse.mutate(courseId, {
      onSuccess: () => {
        toast.success("Course deleted");
        setDeleteConfirm(null);
      },
      onError: () => toast.error("Failed to delete course"),
    });
  }

  // ── Instructor CRUD ──────────────────────────────────────────

  function openCreateInstructor() {
    setEditingInstructor(null);
    setInstructorForm(emptyInstructorForm);
    setInstructorDialogOpen(true);
  }

  function openEditInstructor(instructor: Instructor) {
    setEditingInstructor(instructor);
    setInstructorForm(instructorToForm(instructor));
    setInstructorDialogOpen(true);
  }

  function handleSaveInstructor() {
    const expertise = instructorForm.expertiseRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const params = {
      name: instructorForm.name.trim(),
      bio: instructorForm.bio.trim(),
      expertise,
      avatarUrl: instructorForm.avatarUrl.trim(),
    };

    if (editingInstructor) {
      updateInstructor.mutate(
        { instructorId: editingInstructor.id, ...params },
        {
          onSuccess: () => {
            toast.success("Instructor updated!");
            setInstructorDialogOpen(false);
          },
          onError: () => toast.error("Failed to update instructor"),
        },
      );
    } else {
      createInstructor.mutate(params, {
        onSuccess: () => {
          toast.success("Instructor created!");
          setInstructorDialogOpen(false);
        },
        onError: () => toast.error("Failed to create instructor"),
      });
    }
  }

  function handleDeleteInstructor(instructorId: bigint) {
    deleteInstructor.mutate(instructorId, {
      onSuccess: () => {
        toast.success("Instructor deleted");
        setDeleteConfirm(null);
      },
      onError: () => toast.error("Failed to delete instructor"),
    });
  }

  const isSavingCourse = createCourse.isPending || updateCourse.isPending;
  const isSavingInstructor =
    createInstructor.isPending || updateInstructor.isPending;
  const isDeleting = deleteCourse.isPending || deleteInstructor.isPending;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground">
              Admin <span className="gradient-text">Panel</span>
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage courses and instructors.
          </p>
        </motion.div>

        <Tabs defaultValue="courses">
          <TabsList className="mb-8">
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Courses ({courses.length})
            </TabsTrigger>
            <TabsTrigger value="instructors" className="gap-2">
              <Users className="h-4 w-4" />
              Instructors ({instructors.length})
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                All Courses
              </h2>
              <Button onClick={openCreateCourse} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Course
              </Button>
            </div>
            <div className="card-glow rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Modules</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id.toString()}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {course.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            course.difficulty === "beginner"
                              ? "badge-beginner"
                              : course.difficulty === "intermediate"
                                ? "badge-intermediate"
                                : "badge-advanced"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                      </TableCell>
                      <TableCell>
                        {course.price === 0 ? (
                          <span className="text-emerald-400 text-xs font-bold">
                            Free
                          </span>
                        ) : (
                          <span>${course.price}</span>
                        )}
                      </TableCell>
                      <TableCell>{course.modules.length}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditCourse(course)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setDeleteConfirm({
                                type: "course",
                                id: course.id,
                                title: course.title,
                              })
                            }
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Instructors Tab */}
          <TabsContent value="instructors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                All Instructors
              </h2>
              <Button
                onClick={openCreateInstructor}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New Instructor
              </Button>
            </div>
            <div className="card-glow rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructors.map((instructor) => (
                    <TableRow key={instructor.id.toString()}>
                      <TableCell className="font-medium">
                        {instructor.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {instructor.expertise.slice(0, 2).map((exp) => (
                            <Badge
                              key={exp}
                              variant="secondary"
                              className="text-xs"
                            >
                              {exp}
                            </Badge>
                          ))}
                          {instructor.expertise.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{instructor.expertise.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate text-muted-foreground text-sm">
                        {instructor.bio}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditInstructor(instructor)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setDeleteConfirm({
                                type: "instructor",
                                id: instructor.id,
                                title: instructor.name,
                              })
                            }
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Course Dialog */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingCourse ? "Edit Course" : "Create New Course"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Title *</Label>
                <Input
                  className="mt-1"
                  placeholder="Course title"
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Category *</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g. Web Development"
                  value={courseForm.category}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, category: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                className="mt-1 resize-none"
                placeholder="Course description..."
                rows={3}
                value={courseForm.description}
                onChange={(e) =>
                  setCourseForm((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <Label>Difficulty</Label>
                <Select
                  value={courseForm.difficulty}
                  onValueChange={(v) =>
                    setCourseForm((p) => ({ ...p, difficulty: v }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration (hrs)</Label>
                <Input
                  type="number"
                  className="mt-1"
                  min="0"
                  value={courseForm.duration}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, duration: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  className="mt-1"
                  min="0"
                  value={courseForm.price}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, price: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Instructor ID</Label>
                <Input
                  className="mt-1"
                  placeholder="1"
                  value={courseForm.instructorId}
                  onChange={(e) =>
                    setCourseForm((p) => ({
                      ...p,
                      instructorId: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label>Thumbnail URL</Label>
              <Input
                className="mt-1"
                placeholder="https://..."
                value={courseForm.thumbnailUrl}
                onChange={(e) =>
                  setCourseForm((p) => ({ ...p, thumbnailUrl: e.target.value }))
                }
              />
            </div>

            {/* Modules */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Modules</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-xs gap-1"
                  onClick={() =>
                    setCourseForm((p) => ({
                      ...p,
                      moduleTitles: [...p.moduleTitles, ""],
                      moduleDescriptions: [...p.moduleDescriptions, ""],
                    }))
                  }
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Module
                </Button>
              </div>
              <div className="space-y-3">
                {courseForm.moduleTitles.map((title, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: module order is position-based
                  <div key={i} className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary flex-shrink-0 mt-2">
                      {i + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Input
                        placeholder={`Module ${i + 1} title`}
                        value={title}
                        onChange={(e) =>
                          setCourseForm((p) => {
                            const titles = [...p.moduleTitles];
                            titles[i] = e.target.value;
                            return { ...p, moduleTitles: titles };
                          })
                        }
                      />
                      <Input
                        placeholder="Description"
                        value={courseForm.moduleDescriptions[i] ?? ""}
                        onChange={(e) =>
                          setCourseForm((p) => {
                            const descs = [...p.moduleDescriptions];
                            descs[i] = e.target.value;
                            return { ...p, moduleDescriptions: descs };
                          })
                        }
                      />
                    </div>
                    {courseForm.moduleTitles.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive mt-0.5"
                        onClick={() =>
                          setCourseForm((p) => ({
                            ...p,
                            moduleTitles: p.moduleTitles.filter(
                              (_, idx) => idx !== i,
                            ),
                            moduleDescriptions: p.moduleDescriptions.filter(
                              (_, idx) => idx !== i,
                            ),
                          }))
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCourseDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveCourse}
              disabled={isSavingCourse}
              className="gap-2"
            >
              {isSavingCourse && <Loader2 className="h-4 w-4 animate-spin" />}
              {editingCourse ? "Update Course" : "Create Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Instructor Dialog */}
      <Dialog
        open={instructorDialogOpen}
        onOpenChange={setInstructorDialogOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingInstructor ? "Edit Instructor" : "Create New Instructor"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label>Name *</Label>
              <Input
                className="mt-1"
                placeholder="Instructor name"
                value={instructorForm.name}
                onChange={(e) =>
                  setInstructorForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Bio *</Label>
              <Textarea
                className="mt-1 resize-none"
                placeholder="Instructor bio..."
                rows={3}
                value={instructorForm.bio}
                onChange={(e) =>
                  setInstructorForm((p) => ({ ...p, bio: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Avatar URL</Label>
              <Input
                className="mt-1"
                placeholder="https://..."
                value={instructorForm.avatarUrl}
                onChange={(e) =>
                  setInstructorForm((p) => ({
                    ...p,
                    avatarUrl: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Expertise (comma-separated)</Label>
              <Input
                className="mt-1"
                placeholder="React, Node.js, AWS"
                value={instructorForm.expertiseRaw}
                onChange={(e) =>
                  setInstructorForm((p) => ({
                    ...p,
                    expertiseRaw: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setInstructorDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveInstructor}
              disabled={isSavingInstructor}
              className="gap-2"
            >
              {isSavingInstructor && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {editingInstructor ? "Update Instructor" : "Create Instructor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Confirm Delete
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              "{deleteConfirm?.title}"
            </span>
            ? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={() => {
                if (!deleteConfirm) return;
                if (deleteConfirm.type === "course")
                  handleDeleteCourse(deleteConfirm.id);
                else handleDeleteInstructor(deleteConfirm.id);
              }}
              className="gap-2"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
