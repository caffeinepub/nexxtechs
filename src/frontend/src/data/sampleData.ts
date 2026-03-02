import type { Course, Instructor, Testimonial } from "../backend.d";

// Sample courses for initial display
export const sampleCourses: Course[] = [
  {
    id: BigInt(1),
    title: "Cloud Computing",
    description:
      "Master cloud platforms including AWS, Azure, and GCP. Learn to design scalable, resilient cloud infrastructure, manage virtual machines, storage, networking, and deploy enterprise-grade applications on the cloud.",
    category: "Cloud Computing",
    difficulty: "intermediate",
    duration: 60,
    price: 199,
    thumbnailUrl: "/assets/generated/course-cloud.dim_800x500.jpg",
    instructorId: BigInt(1),
    modules: [
      {
        id: BigInt(1),
        title: "Cloud Fundamentals & Architecture",
        description: "IaaS, PaaS, SaaS and cloud deployment models",
      },
      {
        id: BigInt(2),
        title: "AWS Core Services",
        description: "EC2, S3, RDS, Lambda, and VPC",
      },
      {
        id: BigInt(3),
        title: "Azure & GCP Essentials",
        description: "Microsoft and Google cloud platform services",
      },
      {
        id: BigInt(4),
        title: "Cloud Security & Compliance",
        description: "IAM, encryption, and cloud security best practices",
      },
      {
        id: BigInt(5),
        title: "Cost Optimization & Monitoring",
        description: "Cloud billing, auto-scaling, and observability",
      },
    ],
  },
  {
    id: BigInt(2),
    title: "DevOps Engineering",
    description:
      "Learn end-to-end DevOps practices including CI/CD pipelines, containerization with Docker, Kubernetes orchestration, Infrastructure as Code with Terraform, and GitOps for modern software delivery.",
    category: "DevOps",
    difficulty: "intermediate",
    duration: 70,
    price: 229,
    thumbnailUrl: "/assets/generated/course-devops.dim_800x500.jpg",
    instructorId: BigInt(1),
    modules: [
      {
        id: BigInt(1),
        title: "DevOps Culture & Agile Practices",
        description: "Principles, workflows, and team collaboration",
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
        title: "CI/CD with GitHub Actions & Jenkins",
        description: "Automated testing and deployment pipelines",
      },
      {
        id: BigInt(5),
        title: "Infrastructure as Code (Terraform)",
        description: "Provision and manage infrastructure with code",
      },
    ],
  },
  {
    id: BigInt(3),
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights. Master Excel, SQL, Power BI, and Tableau for data visualization. Learn statistical analysis, data cleaning, and dashboard creation for business decision-making.",
    category: "Data Analytics",
    difficulty: "beginner",
    duration: 50,
    price: 0,
    thumbnailUrl: "/assets/generated/course-da.dim_800x500.jpg",
    instructorId: BigInt(2),
    modules: [
      {
        id: BigInt(1),
        title: "Data Analysis Fundamentals",
        description: "Introduction to data types, sources, and processes",
      },
      {
        id: BigInt(2),
        title: "SQL for Data Analysis",
        description: "Queries, aggregations, and data extraction",
      },
      {
        id: BigInt(3),
        title: "Excel & Google Sheets Mastery",
        description: "Pivot tables, formulas, and advanced functions",
      },
      {
        id: BigInt(4),
        title: "Power BI & Tableau",
        description: "Interactive dashboards and data storytelling",
      },
      {
        id: BigInt(5),
        title: "Statistical Analysis",
        description: "Descriptive statistics, trends, and forecasting",
      },
    ],
  },
  {
    id: BigInt(4),
    title: "Data Science",
    description:
      "Become a data scientist with Python, Pandas, NumPy, and Scikit-learn. Master data wrangling, exploratory data analysis, feature engineering, and predictive modeling for real-world datasets.",
    category: "Data Science",
    difficulty: "intermediate",
    duration: 90,
    price: 249,
    thumbnailUrl: "/assets/generated/course-ds.dim_800x500.jpg",
    instructorId: BigInt(2),
    modules: [
      {
        id: BigInt(1),
        title: "Python for Data Science",
        description: "Python basics, Pandas, and NumPy",
      },
      {
        id: BigInt(2),
        title: "Exploratory Data Analysis",
        description: "Data cleaning, visualization, and pattern discovery",
      },
      {
        id: BigInt(3),
        title: "Machine Learning with Scikit-learn",
        description: "Supervised and unsupervised learning algorithms",
      },
      {
        id: BigInt(4),
        title: "Feature Engineering & Model Tuning",
        description: "Feature selection, cross-validation, and optimization",
      },
      {
        id: BigInt(5),
        title: "Data Science Projects & Portfolio",
        description: "End-to-end real-world data science projects",
      },
    ],
  },
  {
    id: BigInt(5),
    title: "Machine Learning",
    description:
      "Deep dive into machine learning algorithms, neural networks, and model deployment. Master supervised and unsupervised learning, deep learning with TensorFlow/PyTorch, and build production-ready ML systems.",
    category: "Machine Learning",
    difficulty: "advanced",
    duration: 100,
    price: 279,
    thumbnailUrl: "/assets/generated/course-ml.dim_800x500.jpg",
    instructorId: BigInt(2),
    modules: [
      {
        id: BigInt(1),
        title: "Mathematical Foundations",
        description: "Linear algebra, calculus, and probability",
      },
      {
        id: BigInt(2),
        title: "Supervised Learning Algorithms",
        description: "Regression, classification, and SVMs",
      },
      {
        id: BigInt(3),
        title: "Neural Networks & Deep Learning",
        description: "CNNs, RNNs, and transformer architectures",
      },
      {
        id: BigInt(4),
        title: "Unsupervised & Reinforcement Learning",
        description: "Clustering, dimensionality reduction, and RL basics",
      },
      {
        id: BigInt(5),
        title: "MLOps & Model Deployment",
        description: "Deploy and monitor ML models in production",
      },
    ],
  },
  {
    id: BigInt(6),
    title: "Artificial Intelligence",
    description:
      "Explore the full spectrum of AI — from symbolic AI to modern generative models. Learn NLP, computer vision, LLM fine-tuning, and AI ethics to build intelligent applications for the real world.",
    category: "Artificial Intelligence",
    difficulty: "advanced",
    duration: 120,
    price: 299,
    thumbnailUrl: "/assets/generated/course-ai.dim_800x500.jpg",
    instructorId: BigInt(2),
    modules: [
      {
        id: BigInt(1),
        title: "Foundations of AI",
        description: "History, types, and ethics of artificial intelligence",
      },
      {
        id: BigInt(2),
        title: "Natural Language Processing",
        description: "Text classification, NER, and sentiment analysis",
      },
      {
        id: BigInt(3),
        title: "Computer Vision",
        description: "Image recognition, object detection, and segmentation",
      },
      {
        id: BigInt(4),
        title: "Large Language Models & Prompt Engineering",
        description: "LLM fine-tuning and advanced prompting techniques",
      },
      {
        id: BigInt(5),
        title: "Generative AI Applications",
        description: "Build AI-powered products with GPT and diffusion models",
      },
    ],
  },
  {
    id: BigInt(7),
    title: "Web Development",
    description:
      "Build modern, responsive websites and web applications from scratch. Master HTML, CSS, JavaScript, React, Node.js, and databases. Deploy production-ready apps with best practices.",
    category: "Web Development",
    difficulty: "beginner",
    duration: 80,
    price: 0,
    thumbnailUrl: "/assets/generated/course-webdev.dim_800x500.jpg",
    instructorId: BigInt(1),
    modules: [
      {
        id: BigInt(1),
        title: "HTML5 & CSS3 Fundamentals",
        description: "Build the foundation of modern web pages",
      },
      {
        id: BigInt(2),
        title: "JavaScript & ES2024",
        description: "Modern JavaScript syntax, DOM, and async patterns",
      },
      {
        id: BigInt(3),
        title: "React & Frontend Frameworks",
        description: "Component-based UI with React and Tailwind CSS",
      },
      {
        id: BigInt(4),
        title: "Node.js & Backend APIs",
        description: "RESTful APIs with Node.js and Express",
      },
      {
        id: BigInt(5),
        title: "Databases & Deployment",
        description: "SQL, MongoDB, and cloud deployment",
      },
    ],
  },
  {
    id: BigInt(8),
    title: "Digital Marketing",
    description:
      "Master the complete digital marketing ecosystem — SEO, Google Ads, social media marketing, email campaigns, content strategy, and analytics. Learn to grow brands and drive results online.",
    category: "Digital Marketing",
    difficulty: "beginner",
    duration: 40,
    price: 149,
    thumbnailUrl: "/assets/generated/course-digitalmarketing.dim_800x500.jpg",
    instructorId: BigInt(3),
    modules: [
      {
        id: BigInt(1),
        title: "Digital Marketing Fundamentals",
        description: "Overview of channels, funnels, and strategy",
      },
      {
        id: BigInt(2),
        title: "SEO & Content Marketing",
        description: "On-page, off-page SEO, and keyword strategy",
      },
      {
        id: BigInt(3),
        title: "Social Media Marketing",
        description: "Instagram, LinkedIn, Facebook, and YouTube strategy",
      },
      {
        id: BigInt(4),
        title: "Google Ads & PPC Campaigns",
        description: "Search, display, and shopping ad campaigns",
      },
      {
        id: BigInt(5),
        title: "Analytics & Performance Tracking",
        description: "Google Analytics, A/B testing, and ROI measurement",
      },
    ],
  },
  {
    id: BigInt(9),
    title: "Graphic Designing",
    description:
      "Become a professional graphic designer. Learn Adobe Photoshop, Illustrator, Canva, and Figma. Master typography, color theory, branding, logo design, and create stunning visual content.",
    category: "Graphic Designing",
    difficulty: "beginner",
    duration: 45,
    price: 129,
    thumbnailUrl: "/assets/generated/course-graphicdesign.dim_800x500.jpg",
    instructorId: BigInt(3),
    modules: [
      {
        id: BigInt(1),
        title: "Design Principles & Theory",
        description: "Color theory, typography, and visual hierarchy",
      },
      {
        id: BigInt(2),
        title: "Adobe Photoshop Mastery",
        description: "Photo editing, compositing, and retouching",
      },
      {
        id: BigInt(3),
        title: "Adobe Illustrator & Vector Design",
        description: "Logo creation and vector illustration",
      },
      {
        id: BigInt(4),
        title: "UI/UX Design with Figma",
        description: "Wireframing, prototyping, and user interfaces",
      },
      {
        id: BigInt(5),
        title: "Branding & Portfolio Building",
        description: "Brand identity systems and professional portfolio",
      },
    ],
  },
  {
    id: BigInt(10),
    title: "Cyber Security",
    description:
      "Learn ethical hacking, penetration testing, network security, and cyber forensics. Master the tools and techniques used by top security professionals to protect systems and organizations from cyber threats.",
    category: "Cybersecurity",
    difficulty: "intermediate",
    duration: 65,
    price: 199,
    thumbnailUrl: "/assets/generated/course-cybersecurity.dim_800x500.jpg",
    instructorId: BigInt(3),
    modules: [
      {
        id: BigInt(1),
        title: "Cybersecurity Fundamentals",
        description: "CIA triad, threat landscape, and attack types",
      },
      {
        id: BigInt(2),
        title: "Network Security",
        description: "TCP/IP, firewalls, VPNs, and IDS/IPS",
      },
      {
        id: BigInt(3),
        title: "Ethical Hacking & Penetration Testing",
        description: "OWASP Top 10, Kali Linux, and vulnerability scanning",
      },
      {
        id: BigInt(4),
        title: "Cryptography & PKI",
        description: "Symmetric, asymmetric encryption, and certificates",
      },
      {
        id: BigInt(5),
        title: "Incident Response & Cyber Forensics",
        description: "Breach detection, evidence collection, and recovery",
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
  "Data Analytics": "📊",
  "Data Science": "🔬",
  "Machine Learning": "🧠",
  "Digital Marketing": "📣",
  "Graphic Designing": "🎨",
};
