import type { Course, Instructor, Testimonial } from "../backend.d";

// Sample courses for initial display
export const sampleCourses: Course[] = [
  {
    id: BigInt(1),
    title: "Full-Stack Web Development Bootcamp",
    description:
      "Master modern web development from front-end to back-end. Learn React, Node.js, TypeScript, PostgreSQL, and deploy production-ready applications. Includes 50+ real-world projects.",
    category: "Web Development",
    difficulty: "beginner",
    duration: 80,
    price: 0,
    thumbnailUrl: "/assets/generated/course-webdev.dim_600x400.jpg",
    instructorId: BigInt(1),
    modules: [
      {
        id: BigInt(1),
        title: "HTML5 & CSS3 Fundamentals",
        description: "Build the foundation of modern web pages",
      },
      {
        id: BigInt(2),
        title: "JavaScript ES2024",
        description: "Master modern JavaScript syntax and async patterns",
      },
      {
        id: BigInt(3),
        title: "React 19 Deep Dive",
        description: "Build complex UIs with React hooks and state management",
      },
      {
        id: BigInt(4),
        title: "Node.js & Express API",
        description: "Create robust RESTful APIs with Node.js",
      },
      {
        id: BigInt(5),
        title: "PostgreSQL & Prisma ORM",
        description: "Database design, queries, and migrations",
      },
    ],
  },
  {
    id: BigInt(2),
    title: "Machine Learning & AI Engineering",
    description:
      "From neural networks to LLM fine-tuning — this comprehensive course covers the entire modern AI stack. Master PyTorch, TensorFlow, and prompt engineering for production systems.",
    category: "Artificial Intelligence",
    difficulty: "advanced",
    duration: 120,
    price: 299,
    thumbnailUrl: "/assets/generated/course-ai.dim_600x400.jpg",
    instructorId: BigInt(2),
    modules: [
      {
        id: BigInt(1),
        title: "Mathematical Foundations for ML",
        description: "Linear algebra, calculus, and statistics",
      },
      {
        id: BigInt(2),
        title: "Supervised Learning Algorithms",
        description: "Regression, classification, and evaluation",
      },
      {
        id: BigInt(3),
        title: "Deep Learning with PyTorch",
        description: "CNNs, RNNs, and transformer architectures",
      },
      {
        id: BigInt(4),
        title: "LLM Fine-Tuning & RLHF",
        description: "Adapt large language models for custom tasks",
      },
      {
        id: BigInt(5),
        title: "ML Deployment & MLOps",
        description: "Deploy models with Docker and Kubernetes",
      },
    ],
  },
  {
    id: BigInt(3),
    title: "Cybersecurity & Ethical Hacking",
    description:
      "Learn offensive and defensive security techniques. Master penetration testing, network security, cryptography, and secure coding practices used by top security professionals.",
    category: "Cybersecurity",
    difficulty: "intermediate",
    duration: 60,
    price: 199,
    thumbnailUrl: "/assets/generated/course-security.dim_600x400.jpg",
    instructorId: BigInt(3),
    modules: [
      {
        id: BigInt(1),
        title: "Network Security Fundamentals",
        description: "TCP/IP, firewalls, and network hardening",
      },
      {
        id: BigInt(2),
        title: "Web Application Penetration Testing",
        description: "OWASP Top 10 and SQLi/XSS attacks",
      },
      {
        id: BigInt(3),
        title: "Cryptography in Practice",
        description: "Symmetric, asymmetric, and hashing algorithms",
      },
      {
        id: BigInt(4),
        title: "Incident Response & Forensics",
        description: "Detect, analyze, and recover from breaches",
      },
    ],
  },
  {
    id: BigInt(4),
    title: "Cloud Architecture & DevOps",
    description:
      "Design scalable, resilient cloud infrastructure on AWS, Azure, and GCP. Master Kubernetes, Terraform, CI/CD pipelines, and GitOps for enterprise-grade deployments.",
    category: "Cloud Computing",
    difficulty: "intermediate",
    duration: 90,
    price: 249,
    thumbnailUrl: "/assets/generated/course-cloud.dim_600x400.jpg",
    instructorId: BigInt(1),
    modules: [
      {
        id: BigInt(1),
        title: "AWS Core Services",
        description: "EC2, S3, RDS, Lambda, and VPC",
      },
      {
        id: BigInt(2),
        title: "Docker & Containerization",
        description: "Container fundamentals and Docker Compose",
      },
      {
        id: BigInt(3),
        title: "Kubernetes Orchestration",
        description: "Pods, deployments, services, and Helm charts",
      },
      {
        id: BigInt(4),
        title: "Infrastructure as Code",
        description: "Terraform, Ansible, and CloudFormation",
      },
      {
        id: BigInt(5),
        title: "CI/CD with GitHub Actions",
        description: "Automated testing and deployment pipelines",
      },
    ],
  },
  {
    id: BigInt(5),
    title: "iOS & Android App Development",
    description:
      "Build cross-platform mobile apps with React Native and Flutter. Ship to both the App Store and Google Play from a single codebase with native-quality performance.",
    category: "Mobile Development",
    difficulty: "intermediate",
    duration: 70,
    price: 179,
    thumbnailUrl: "/assets/generated/course-mobile.dim_600x400.jpg",
    instructorId: BigInt(2),
    modules: [
      {
        id: BigInt(1),
        title: "React Native Fundamentals",
        description: "Components, navigation, and state management",
      },
      {
        id: BigInt(2),
        title: "Native APIs & Device Features",
        description: "Camera, GPS, push notifications, and storage",
      },
      {
        id: BigInt(3),
        title: "Offline-First Architecture",
        description: "Local databases and sync strategies",
      },
      {
        id: BigInt(4),
        title: "App Store Deployment",
        description: "Publishing to App Store and Google Play",
      },
    ],
  },
  {
    id: BigInt(6),
    title: "Database Engineering & SQL Mastery",
    description:
      "From relational fundamentals to advanced query optimization. Master PostgreSQL, MongoDB, Redis, and database design patterns for high-performance applications.",
    category: "Data Engineering",
    difficulty: "beginner",
    duration: 45,
    price: 0,
    thumbnailUrl: "/assets/generated/course-database.dim_600x400.jpg",
    instructorId: BigInt(3),
    modules: [
      {
        id: BigInt(1),
        title: "Relational Database Design",
        description: "Normalization, ERDs, and schema design",
      },
      {
        id: BigInt(2),
        title: "Advanced SQL Queries",
        description: "CTEs, window functions, and query optimization",
      },
      {
        id: BigInt(3),
        title: "MongoDB & NoSQL Patterns",
        description: "Document modeling and aggregation pipelines",
      },
      {
        id: BigInt(4),
        title: "Redis Caching Strategies",
        description: "Cache invalidation and session management",
      },
    ],
  },
];

export const sampleInstructors: Instructor[] = [
  {
    id: BigInt(1),
    name: "Dr. Sarah Chen",
    bio: "Former Google Senior Engineer with 12 years of experience in full-stack development and cloud architecture. PhD in Computer Science from MIT. Sarah has helped over 50,000 students launch their tech careers through her practical, project-based teaching approach.",
    expertise: [
      "Web Development",
      "Cloud Computing",
      "System Design",
      "TypeScript",
    ],
    avatarUrl: "/assets/generated/instructor-1.dim_300x300.jpg",
  },
  {
    id: BigInt(2),
    name: "Marcus Rodriguez",
    bio: "AI Research Scientist and ex-OpenAI engineer specializing in large language models and computer vision. Marcus bridges the gap between cutting-edge research and production-ready AI systems, making complex concepts accessible to all skill levels.",
    expertise: [
      "Machine Learning",
      "Deep Learning",
      "LLMs",
      "Python",
      "Mobile Dev",
    ],
    avatarUrl: "/assets/generated/instructor-2.dim_300x300.jpg",
  },
  {
    id: BigInt(3),
    name: "James Okafor",
    bio: "CISSP-certified security architect and penetration tester with 15 years in enterprise cybersecurity. Former NSA contractor who now dedicates his expertise to building the next generation of security professionals through hands-on, real-world training.",
    expertise: [
      "Cybersecurity",
      "Network Security",
      "Penetration Testing",
      "SQL",
      "Database Design",
    ],
    avatarUrl: "/assets/generated/instructor-3.dim_300x300.jpg",
  },
];

export const sampleTestimonials: Array<{
  name: string;
  role: string;
  comment: string;
  rating: number;
  courseTitle: string;
}> = [
  {
    name: "Amara Williams",
    role: "Junior Developer @ Shopify",
    comment:
      "NexXTechs transformed my career completely. The Full-Stack Bootcamp was exactly what I needed — practical, in-depth, and immediately applicable. I landed my first dev job three months after completing the course!",
    rating: 5,
    courseTitle: "Full-Stack Web Development Bootcamp",
  },
  {
    name: "Liam Park",
    role: "ML Engineer @ DeepMind",
    comment:
      "The AI Engineering course is phenomenal. Marcus doesn't just teach theory — he teaches you how AI is actually built and deployed in production. The LLM fine-tuning module alone is worth the entire price.",
    rating: 5,
    courseTitle: "Machine Learning & AI Engineering",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Security Analyst @ Deloitte",
    comment:
      "James's Cybersecurity course is the most comprehensive I've found online. The hands-on labs with real tools made all the difference. Passed my OSCP certification thanks to the skills I learned here.",
    rating: 5,
    courseTitle: "Cybersecurity & Ethical Hacking",
  },
  {
    name: "Chris Nakamura",
    role: "DevOps Engineer @ Netflix",
    comment:
      "The Cloud Architecture course covers everything you need to become a senior DevOps engineer. The Kubernetes section especially — nobody explains it this clearly. Absolutely worth every penny.",
    rating: 5,
    courseTitle: "Cloud Architecture & DevOps",
  },
  {
    name: "Sofia Mendoza",
    role: "Mobile Developer @ Airbnb",
    comment:
      "I tried three other React Native courses before finding NexXTechs. This one actually teaches you how to build production apps, not just toy projects. My portfolio app got me hired!",
    rating: 5,
    courseTitle: "iOS & Android App Development",
  },
  {
    name: "Kwame Johnson",
    role: "Backend Engineer @ Stripe",
    comment:
      "Database Engineering was one of the free courses and it's honestly better than paid alternatives I've seen. The query optimization section completely changed how I think about database performance.",
    rating: 5,
    courseTitle: "Database Engineering & SQL Mastery",
  },
];

export const categoryIcons: Record<string, string> = {
  "Web Development": "🌐",
  "Artificial Intelligence": "🤖",
  Cybersecurity: "🔒",
  "Cloud Computing": "☁️",
  "Mobile Development": "📱",
  "Data Engineering": "🗄️",
  DevOps: "⚙️",
  Blockchain: "⛓️",
};
