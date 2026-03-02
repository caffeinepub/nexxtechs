import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Principal "mo:core/Principal";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type CourseModule = {
    id : Nat;
    title : Text;
    description : Text;
  };

  module CourseModule {
    public func compareById(module1 : CourseModule, module2 : CourseModule) : Order.Order {
      Nat.compare(module1.id, module2.id);
    };
  };

  public type Course = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    instructorId : ?Nat;
    modules : [CourseModule];
    thumbnailUrl : Text;
    duration : Float;
    difficulty : Text;
    price : Float;
  };

  module Course {
    public func compareById(course1 : Course, course2 : Course) : Order.Order {
      Nat.compare(course1.id, course2.id);
    };
  };

  public type Instructor = {
    id : Nat;
    name : Text;
    bio : Text;
    expertise : [Text];
    avatarUrl : Text;
  };

  module Instructor {
    public func compareById(instructor1 : Instructor, instructor2 : Instructor) : Order.Order {
      Nat.compare(instructor1.id, instructor2.id);
    };
  };

  public type Testimonial = {
    userId : Principal;
    courseId : Nat;
    rating : Nat;
    comment : Text;
  };

  var testimonials = List.empty<Testimonial>();

  let courseCategories = [
    "Web Development",
    "Networking",
    "Cybersecurity",
    "Cloud Computing",
    "Programming",
    "Data Science",
    "DevOps",
    "Database",
  ];

  var instructorIdCounter = 0;
  var courseIdCounter = 0;
  var moduleIdCounter = 0;

  let courses = Map.empty<Nat, Course>();
  let instructors = Map.empty<Nat, Instructor>();
  let enrollments = Map.empty<Principal, List.List<Nat>>();
  let moduleProgress = Map.empty<(Principal, Nat), List.List<Nat>>();

  module PrincipalNat {
    public func compare(a : (Principal, Nat), b : (Principal, Nat)) : Order.Order {
      switch (Principal.compare(a.0, b.0)) {
        case (#equal) { Nat.compare(a.1, b.1) };
        case (order) { order };
      };
    };
  };

  public shared ({ caller }) func createCourse(
    title : Text,
    description : Text,
    category : Text,
    instructorId : ?Nat,
    modules : [CourseModule],
    thumbnailUrl : Text,
    duration : Float,
    difficulty : Text,
    price : Float,
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create courses");
    };

    courseIdCounter += 1;
    let course : Course = {
      id = courseIdCounter;
      title;
      description;
      category;
      instructorId;
      modules;
      thumbnailUrl;
      duration;
      difficulty;
      price;
    };
    courses.add(courseIdCounter, course);
    courseIdCounter;
  };

  public shared ({ caller }) func updateCourse(
    courseId : Nat,
    title : Text,
    description : Text,
    category : Text,
    instructorId : ?Nat,
    modules : [CourseModule],
    thumbnailUrl : Text,
    duration : Float,
    difficulty : Text,
    price : Float,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update courses");
    };

    switch (courses.get(courseId)) {
      case (null) {
        Runtime.trap("Course not found");
      };
      case (?_) {
        let course : Course = {
          id = courseId;
          title;
          description;
          category;
          instructorId;
          modules;
          thumbnailUrl;
          duration;
          difficulty;
          price;
        };
        courses.add(courseId, course);
      };
    };
  };

  public shared ({ caller }) func deleteCourse(courseId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };

    switch (courses.get(courseId)) {
      case (null) {
        Runtime.trap("Course not found");
      };
      case (?_) {
        courses.remove(courseId);
      };
    };
  };

  public shared ({ caller }) func createInstructor(
    name : Text,
    bio : Text,
    expertise : [Text],
    avatarUrl : Text,
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create instructors");
    };

    instructorIdCounter += 1;
    let instructor : Instructor = {
      id = instructorIdCounter;
      name;
      bio;
      expertise;
      avatarUrl;
    };
    instructors.add(instructorIdCounter, instructor);
    instructorIdCounter;
  };

  public shared ({ caller }) func updateInstructor(
    instructorId : Nat,
    name : Text,
    bio : Text,
    expertise : [Text],
    avatarUrl : Text,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update instructors");
    };

    switch (instructors.get(instructorId)) {
      case (null) {
        Runtime.trap("Instructor not found");
      };
      case (?_) {
        let instructor : Instructor = {
          id = instructorId;
          name;
          bio;
          expertise;
          avatarUrl;
        };
        instructors.add(instructorId, instructor);
      };
    };
  };

  public shared ({ caller }) func deleteInstructor(instructorId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete instructors");
    };

    switch (instructors.get(instructorId)) {
      case (null) {
        Runtime.trap("Instructor not found");
      };
      case (?_) {
        instructors.remove(instructorId);
      };
    };
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray().sort(Course.compareById);
  };

  public query ({ caller }) func getCourseById(courseId : Nat) : async ?Course {
    courses.get(courseId);
  };

  public query ({ caller }) func getAllInstructors() : async [Instructor] {
    instructors.values().toArray().sort(Instructor.compareById);
  };

  public query ({ caller }) func getCourseCategories() : async [Text] {
    courseCategories;
  };

  public shared ({ caller }) func enrollInCourse(courseId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated students can enroll in courses");
    };

    let userEnrollments = switch (enrollments.get(caller)) {
      case (null) {
        let newEnrollments = List.empty<Nat>();
        enrollments.add(caller, newEnrollments);
        newEnrollments;
      };
      case (?existing) { existing };
    };

    if (userEnrollments.contains(courseId)) {
      Runtime.trap("Already enrolled in this course");
    };

    userEnrollments.add(courseId);
  };

  public shared ({ caller }) func markModuleCompleted(courseId : Nat, moduleId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only students can complete modules");
    };

    let moduleList = switch (moduleProgress.get((caller, courseId))) {
      case (null) {
        let newList = List.empty<Nat>();
        moduleProgress.add((caller, courseId), newList);
        newList;
      };
      case (?existing) { existing };
    };

    if (moduleList.contains(moduleId)) {
      Runtime.trap("Module already marked as completed");
    };

    moduleList.add(moduleId);
  };

  public query ({ caller }) func getCourseProgress(courseId : Nat) : async Float {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only students can view their progress");
    };

    switch (moduleProgress.get((caller, courseId))) {
      case (null) { 0 };
      case (?completedModules) {
        switch (courses.get(courseId)) {
          case (null) { 0 };
          case (?course) {
            let completedCount = completedModules.size().toFloat();
            if (course.modules.size() == 0) { 0 } else {
              completedCount / course.modules.size().toFloat() * 100.0;
            };
          };
        };
      };
    };
  };

  public shared ({ caller }) func addTestimonial(courseId : Nat, rating : Nat, comment : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only students can add testimonials");
    };

    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let testimonial : Testimonial = {
      userId = caller;
      courseId;
      rating;
      comment;
    };
    testimonials.add(testimonial);
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.toArray();
  };

  public query ({ caller }) func getEnrolledCourses() : async [Nat] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only students can view their enrollments");
    };

    switch (enrollments.get(caller)) {
      case (null) { [] };
      case (?enrolled) { enrolled.toArray() };
    };
  };
};
