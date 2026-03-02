import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CourseModule {
    id: bigint;
    title: string;
    description: string;
}
export interface Instructor {
    id: bigint;
    bio: string;
    name: string;
    expertise: Array<string>;
    avatarUrl: string;
}
export interface Course {
    id: bigint;
    title: string;
    duration: number;
    thumbnailUrl: string;
    difficulty: string;
    description: string;
    instructorId?: bigint;
    category: string;
    price: number;
    modules: Array<CourseModule>;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    userId: Principal;
    comment: string;
    rating: bigint;
    courseId: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTestimonial(courseId: bigint, rating: bigint, comment: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCourse(title: string, description: string, category: string, instructorId: bigint | null, modules: Array<CourseModule>, thumbnailUrl: string, duration: number, difficulty: string, price: number): Promise<bigint>;
    createInstructor(name: string, bio: string, expertise: Array<string>, avatarUrl: string): Promise<bigint>;
    deleteCourse(courseId: bigint): Promise<void>;
    deleteInstructor(instructorId: bigint): Promise<void>;
    enrollInCourse(courseId: bigint): Promise<void>;
    getAllCourses(): Promise<Array<Course>>;
    getAllInstructors(): Promise<Array<Instructor>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourseById(courseId: bigint): Promise<Course | null>;
    getCourseCategories(): Promise<Array<string>>;
    getCourseProgress(courseId: bigint): Promise<number>;
    getEnrolledCourses(): Promise<Array<bigint>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markModuleCompleted(courseId: bigint, moduleId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCourse(courseId: bigint, title: string, description: string, category: string, instructorId: bigint | null, modules: Array<CourseModule>, thumbnailUrl: string, duration: number, difficulty: string, price: number): Promise<void>;
    updateInstructor(instructorId: bigint, name: string, bio: string, expertise: Array<string>, avatarUrl: string): Promise<void>;
}
