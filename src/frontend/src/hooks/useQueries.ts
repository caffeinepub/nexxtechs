import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Course,
  CourseModule,
  Instructor,
  Testimonial,
  UserProfile,
} from "../backend.d";
import { UserRole } from "../backend.d";
import { useActor } from "./useActor";

export function useAllCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCourseById(courseId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Course | null>({
    queryKey: ["course", courseId?.toString()],
    queryFn: async () => {
      if (!actor || courseId === undefined) return null;
      return actor.getCourseById(courseId);
    },
    enabled: !!actor && !isFetching && courseId !== undefined,
  });
}

export function useCourseCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCourseCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllInstructors() {
  const { actor, isFetching } = useActor();
  return useQuery<Instructor[]>({
    queryKey: ["instructors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInstructors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEnrolledCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint[]>({
    queryKey: ["enrolled"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnrolledCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCourseProgress(courseId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<number>({
    queryKey: ["progress", courseId?.toString()],
    queryFn: async () => {
      if (!actor || courseId === undefined) return 0;
      return actor.getCourseProgress(courseId);
    },
    enabled: !!actor && !isFetching && courseId !== undefined,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutations
export function useEnrollInCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.enrollInCourse(courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolled"] });
    },
  });
}

export function useMarkModuleCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      moduleId,
    }: { courseId: bigint; moduleId: bigint }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.markModuleCompleted(courseId, moduleId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["progress", variables.courseId.toString()],
      });
    },
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      rating,
      comment,
    }: {
      courseId: bigint;
      rating: bigint;
      comment: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addTestimonial(courseId, rating, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useCreateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      category: string;
      instructorId: bigint | null;
      modules: CourseModule[];
      thumbnailUrl: string;
      duration: number;
      difficulty: string;
      price: number;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createCourse(
        params.title,
        params.description,
        params.category,
        params.instructorId,
        params.modules,
        params.thumbnailUrl,
        params.duration,
        params.difficulty,
        params.price,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      courseId: bigint;
      title: string;
      description: string;
      category: string;
      instructorId: bigint | null;
      modules: CourseModule[];
      thumbnailUrl: string;
      duration: number;
      difficulty: string;
      price: number;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateCourse(
        params.courseId,
        params.title,
        params.description,
        params.category,
        params.instructorId,
        params.modules,
        params.thumbnailUrl,
        params.duration,
        params.difficulty,
        params.price,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteCourse(courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useCreateInstructor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      bio: string;
      expertise: string[];
      avatarUrl: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createInstructor(
        params.name,
        params.bio,
        params.expertise,
        params.avatarUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}

export function useUpdateInstructor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      instructorId: bigint;
      name: string;
      bio: string;
      expertise: string[];
      avatarUrl: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateInstructor(
        params.instructorId,
        params.name,
        params.bio,
        params.expertise,
        params.avatarUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}

export function useDeleteInstructor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (instructorId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteInstructor(instructorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}
