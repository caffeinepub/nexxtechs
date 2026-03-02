import type { Course, Instructor } from "../backend.d";
import { sampleCourses, sampleInstructors } from "../data/sampleData";

export function useAllCourses() {
  return { data: sampleCourses as Course[], isLoading: false };
}

export function useCourseById(id: bigint | undefined) {
  return {
    data:
      id !== undefined
        ? (sampleCourses.find((c) => c.id === id) ?? null)
        : null,
    isLoading: false,
  };
}

export function useCourseCategories() {
  return {
    data: [...new Set(sampleCourses.map((c) => c.category))],
    isLoading: false,
  };
}

export function useAllInstructors() {
  return { data: sampleInstructors as Instructor[], isLoading: false };
}

export function useAllTestimonials() {
  return { data: [], isLoading: false };
}

export function useEnrolledCourses() {
  return { data: [] as bigint[], isLoading: false };
}

export function useCourseProgress(_courseId: bigint | undefined) {
  return { data: 0, isLoading: false };
}

export function useIsAdmin() {
  return { data: false, isLoading: false };
}

export function useUserRole() {
  return { data: "guest" as const, isLoading: false };
}

export function useUserProfile() {
  return { data: null, isLoading: false };
}

export function useEnrollInCourse() {
  return { mutate: () => {}, isPending: false };
}

export function useMarkModuleCompleted() {
  return { mutate: () => {}, isPending: false };
}

export function useAddTestimonial() {
  return { mutate: () => {}, isPending: false };
}

export function useSaveUserProfile() {
  return { mutate: () => {}, isPending: false };
}

export function useCreateCourse() {
  return { mutate: () => {}, isPending: false };
}

export function useUpdateCourse() {
  return { mutate: () => {}, isPending: false };
}

export function useDeleteCourse() {
  return { mutate: () => {}, isPending: false };
}

export function useCreateInstructor() {
  return { mutate: () => {}, isPending: false };
}

export function useUpdateInstructor() {
  return { mutate: () => {}, isPending: false };
}

export function useDeleteInstructor() {
  return { mutate: () => {}, isPending: false };
}

export function useAllEnquiries() {
  return { data: [], isLoading: false };
}

export function useSubmitEnquiry() {
  return { mutate: () => {}, isPending: false, isSuccess: false };
}

export function useDeleteEnquiry() {
  return { mutate: () => {}, isPending: false };
}
