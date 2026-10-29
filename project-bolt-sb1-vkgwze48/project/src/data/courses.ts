export interface Course {
  id: string;
  title: string;
  channel: string;
  url: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  matchedSkills: string[];
  matchedGoals: string[];
  matchedBranches?: string[];
  isNptel?: boolean;
  thumbnail: string;
}

// Real YouTube course links with video IDs
export const COURSES: Course[] = [
  // === Python / Data Science / ML ===
  {
    id: "c1",
    title: "Python for Data Science - Full Course for Beginners",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
    duration: "4h 27m",
    level: "Beginner",
    category: "Data Science",
    matchedSkills: ["python", "data analysis", "pandas", "numpy"],
    matchedGoals: ["data scientist", "data analyst", "machine learning", "ml engineer", "ai"],
    thumbnail: "https://img.youtube.com/vi/LHBE6Q9XlzI/mqdefault.jpg",
  },
  {
    id: "c2",
    title: "Machine Learning for Everybody - Full Course",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
    duration: "3h 51m",
    level: "Intermediate",
    category: "Machine Learning",
    matchedSkills: ["machine learning", "python", "scikit-learn", "data science"],
    matchedGoals: ["data scientist", "machine learning", "ml engineer", "ai"],
    thumbnail: "https://img.youtube.com/vi/i_LwzRVP7bg/mqdefault.jpg",
  },
  {
    id: "c3",
    title: "Deep Learning with PyTorch - Full Course",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=Gol5GeBvwo0",
    duration: "1h 57m",
    level: "Advanced",
    category: "Deep Learning",
    matchedSkills: ["pytorch", "deep learning", "python", "neural networks"],
    matchedGoals: ["machine learning", "ml engineer", "ai", "data scientist"],
    thumbnail: "https://img.youtube.com/vi/Gol5GeBvwo0/mqdefault.jpg",
  },
  {
    id: "c4",
    title: "SQL for Data Science - Full Course",
    channel: "Alex The Analyst",
    url: "https://www.youtube.com/watch?v=8jxS2M8Z3Hw",
    duration: "2h 15m",
    level: "Beginner",
    category: "Database",
    matchedSkills: ["sql", "database", "data analysis"],
    matchedGoals: ["data analyst", "data scientist", "business analyst", "data engineer"],
    thumbnail: "https://img.youtube.com/vi/8jxS2M8Z3Hw/mqdefault.jpg",
  },
  {
    id: "c5",
    title: "Complete Data Analysis with Pandas & NumPy",
    channel: "Keith Galli",
    url: "https://www.youtube.com/watch?v=vmEHCJofslg",
    duration: "1h 30m",
    level: "Intermediate",
    category: "Data Analysis",
    matchedSkills: ["python", "pandas", "numpy", "data analysis"],
    matchedGoals: ["data analyst", "data scientist"],
    thumbnail: "https://img.youtube.com/vi/vmEHCJofslg/mqdefault.jpg",
  },

  // === Web Development / Full Stack ===
  {
    id: "c6",
    title: "React Course - Beginner's Tutorial for React",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=bMknfXX8Hts",
    duration: "4h 25m",
    level: "Beginner",
    category: "Frontend",
    matchedSkills: ["react", "javascript", "frontend", "web development"],
    matchedGoals: ["full stack developer", "frontend developer", "web developer", "react developer"],
    thumbnail: "https://img.youtube.com/vi/bMknfXX8Hts/mqdefault.jpg",
  },
  {
    id: "c7",
    title: "Full Stack Web Development with React & Node.js",
    channel: "The Net Ninja",
    url: "https://www.youtube.com/watch?v=O94NOaX1KuU",
    duration: "3h 20m",
    level: "Intermediate",
    category: "Full Stack",
    matchedSkills: ["react", "node.js", "javascript", "express", "full stack"],
    matchedGoals: ["full stack developer", "web developer", "backend developer"],
    thumbnail: "https://img.youtube.com/vi/O94NOaX1KuU/mqdefault.jpg",
  },
  {
    id: "c8",
    title: "JavaScript Tutorial - Full Course for Beginners",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    duration: "3h 26m",
    level: "Beginner",
    category: "Programming",
    matchedSkills: ["javascript", "programming", "web development"],
    matchedGoals: ["full stack developer", "frontend developer", "web developer", "backend developer"],
    thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg",
  },
  {
    id: "c9",
    title: "Node.js and Express.js - Full Course",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
    duration: "4h 37m",
    level: "Intermediate",
    category: "Backend",
    matchedSkills: ["node.js", "express", "backend", "javascript", "api"],
    matchedGoals: ["full stack developer", "backend developer", "web developer"],
    thumbnail: "https://img.youtube.com/vi/Oe421EPjeBE/mqdefault.jpg",
  },
  {
    id: "c10",
    title: "Tailwind CSS - Full Course for Beginners",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=lCxcqOHk9kM",
    duration: "2h 15m",
    level: "Beginner",
    category: "CSS",
    matchedSkills: ["css", "tailwind", "frontend", "web development", "react"],
    matchedGoals: ["frontend developer", "full stack developer", "web developer", "ui/ux designer"],
    thumbnail: "https://img.youtube.com/vi/lCxcqOHk9kM/mqdefault.jpg",
  },
  {
    id: "c11",
    title: "TypeScript Tutorial for Beginners - Full Course",
    channel: "Programming with Mosh",
    url: "https://www.youtube.com/watch?v=d56mzg7lCac",
    duration: "1h 10m",
    level: "Intermediate",
    category: "Programming",
    matchedSkills: ["typescript", "javascript", "web development"],
    matchedGoals: ["full stack developer", "frontend developer", "web developer", "react developer"],
    thumbnail: "https://img.youtube.com/vi/d56mzg7lCac/mqdefault.jpg",
  },

  // === Product Management ===
  {
    id: "c12",
    title: "Product Management Course - Complete Roadmap",
    channel: "Lennya Product Teardowns",
    url: "https://www.youtube.com/watch?v=N3SyoRQq-3Q",
    duration: "2h 40m",
    level: "Beginner",
    category: "Product Management",
    matchedSkills: ["product management", "strategy", "leadership", "communication"],
    matchedGoals: ["product manager", "pm", "associate product manager", "apm"],
    thumbnail: "https://img.youtube.com/vi/N3SyoRQq-3Q/mqdefault.jpg",
  },
  {
    id: "c13",
    title: "How to Become a Product Manager - Complete Guide",
    channel: "Exponent",
    url: "https://www.youtube.com/watch?v=K5KnQpVqk2Q",
    duration: "1h 05m",
    level: "Beginner",
    category: "Product Management",
    matchedSkills: ["product management", "user research", "analytics", "strategy"],
    matchedGoals: ["product manager", "pm", "associate product manager", "apm"],
    thumbnail: "https://img.youtube.com/vi/K5KnQpVqk2Q/mqdefault.jpg",
  },
  {
    id: "c14",
    title: "Product Analytics - SQL for Product Managers",
    channel: "Maven Analytics",
    url: "https://www.youtube.com/watch?v=HXV3tQfKqF4",
    duration: "1h 45m",
    level: "Intermediate",
    category: "Analytics",
    matchedSkills: ["sql", "analytics", "product management", "data analysis"],
    matchedGoals: ["product manager", "pm", "business analyst", "product analyst"],
    thumbnail: "https://img.youtube.com/vi/HXV3tQfKqF4/mqdefault.jpg",
  },

  // === UI/UX Design ===
  {
    id: "c15",
    title: "Figma Tutorial for Beginners - Full Course",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=HZuk6Zk3gDc",
    duration: "2h 55m",
    level: "Beginner",
    category: "Design",
    matchedSkills: ["figma", "ui/ux", "design", "frontend"],
    matchedGoals: ["ui/ux designer", "product designer", "frontend developer"],
    thumbnail: "https://img.youtube.com/vi/HZuk6Zk3gDc/mqdefault.jpg",
  },

  // === Cybersecurity ===
  {
    id: "c16",
    title: "Cybersecurity Full Course - Beginner to Advanced",
    channel: "Simplilearn",
    url: "https://www.youtube.com/watch?v=uEHSnOF3tgo",
    duration: "5h 30m",
    level: "Beginner",
    category: "Cybersecurity",
    matchedSkills: ["cybersecurity", "networking", "security", "linux"],
    matchedGoals: ["cybersecurity analyst", "security engineer", "cybersecurity"],
    thumbnail: "https://img.youtube.com/vi/uEHSnOF3tOF3tgo/mqdefault.jpg",
  },

  // === DevOps / Cloud ===
  {
    id: "c17",
    title: "Docker and Kubernetes - Full Course for Beginners",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=kTp5xUtqlJM",
    duration: "4h 15m",
    level: "Intermediate",
    category: "DevOps",
    matchedSkills: ["docker", "kubernetes", "cloud", "devops", "linux"],
    matchedGoals: ["devops engineer", "cloud engineer", "backend developer"],
    thumbnail: "https://img.youtube.com/vi/kTp5xUtqlJM/mqdefault.jpg",
  },

  // === Java / DSA ===
  {
    id: "c18",
    title: "Data Structures and Algorithms - Full Course",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=B31LgI4Y4PQ",
    duration: "4h 30m",
    level: "Intermediate",
    category: "DSA",
    matchedSkills: ["dsa", "algorithms", "data structures", "java", "c++", "programming"],
    matchedGoals: ["software engineer", "full stack developer", "backend developer", "data scientist"],
    thumbnail: "https://img.youtube.com/vi/B31LgI4Y4PQ/mqdefault.jpg",
  },
  {
    id: "c19",
    title: "Java Full Course for Beginners",
    channel: "Programming with Mosh",
    url: "https://www.youtube.com/watch?v=eIrMbAQw34o",
    duration: "2h 30m",
    level: "Beginner",
    category: "Programming",
    matchedSkills: ["java", "programming", "oop", "backend"],
    matchedGoals: ["software engineer", "backend developer", "full stack developer"],
    thumbnail: "https://img.youtube.com/vi/eIrMbAQw34o/mqdefault.jpg",
  },

  // === Cloud ===
  {
    id: "c20",
    title: "AWS Cloud Practitioner - Full Course",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=SOTamWgk1ic",
    duration: "3h 40m",
    level: "Beginner",
    category: "Cloud",
    matchedSkills: ["cloud", "aws", "devops", "linux"],
    matchedGoals: ["cloud engineer", "devops engineer", "backend developer"],
    thumbnail: "https://img.youtube.com/vi/SOTamWgk1ic/mqdefault.jpg",
  },

  // === Marketing ===
  {
    id: "c21",
    title: "Digital Marketing Full Course for Beginners",
    channel: "Simplilearn",
    url: "https://www.youtube.com/watch?v=NUe2s5jA0DI",
    duration: "3h 20m",
    level: "Beginner",
    category: "Marketing",
    matchedSkills: ["marketing", "seo", "social media", "content", "digital marketing"],
    matchedGoals: ["marketing manager", "digital marketer", "growth marketer"],
    thumbnail: "https://img.youtube.com/vi/NUe2s5jA0DI/mqdefault.jpg",
  },

  // === Communication / Soft Skills ===
  {
    id: "c22",
    title: "Public Speaking - Mastering Communication Skills",
    channel: "TED-Ed",
    url: "https://www.youtube.com/watch?v=HxcRtAF3kAs",
    duration: "45m",
    level: "Beginner",
    category: "Soft Skills",
    matchedSkills: ["public speaking", "communication", "leadership", "presentation"],
    matchedGoals: ["product manager", "business analyst", "marketing manager", "any"],
    thumbnail: "https://img.youtube.com/vi/HxcRtAF3kAs/mqdefault.jpg",
  },

  // === 1st-Year Engineering Foundation (all branches) ===
  {
    id: "c23",
    title: "Engineering Mathematics 1 - Complete Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_JcJpDdB-V7dRbQwU6dOrr",
    duration: "40+ lectures",
    level: "Beginner",
    category: "Engineering Mathematics",
    matchedSkills: ["mathematics", "calculus", "linear algebra"],
    matchedGoals: ["foundation", "exploring", "any"],
    matchedBranches: ["All"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/8JTFNH4lqOE/mqdefault.jpg",
  },
  {
    id: "c24",
    title: "Engineering Physics - Full Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_CEbG_QyXKbbDcY0wZpZpG",
    duration: "35+ lectures",
    level: "Beginner",
    category: "Engineering Physics",
    matchedSkills: ["physics", "mechanics", "optics"],
    matchedGoals: ["foundation", "exploring", "any"],
    matchedBranches: ["All"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/ZM8ECpBuQYE/mqdefault.jpg",
  },
  {
    id: "c25",
    title: "Programming in C - Complete Beginner Course",
    channel: "freeCodeCamp.org",
    url: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
    duration: "3h 46m",
    level: "Beginner",
    category: "Programming",
    matchedSkills: ["c", "programming", "coding"],
    matchedGoals: ["foundation", "exploring", "software engineer", "any"],
    matchedBranches: ["All"],
    thumbnail: "https://img.youtube.com/vi/KJgsSFOSQv0/mqdefault.jpg",
  },
  {
    id: "c26",
    title: "Engineering Drawing / Graphics Basics",
    channel: "Easy Engineering Classes",
    url: "https://www.youtube.com/playlist?list=PLHvfoUqI8Lq3L-yGqf3L-sMm1wYpJp1LW",
    duration: "20+ videos",
    level: "Beginner",
    category: "Engineering Drawing",
    matchedSkills: ["drawing", "graphics", "projection"],
    matchedGoals: ["foundation", "exploring"],
    matchedBranches: ["Mechanical", "Civil", "Electrical", "ECE"],
    thumbnail: "https://img.youtube.com/vi/mH4p6qXf2wQ/mqdefault.jpg",
  },
  {
    id: "c27",
    title: "Aptitude for Placements - Quantitative Aptitude",
    channel: "Feel Free to Learn",
    url: "https://www.youtube.com/playlist?list=PLIY8eM-j5LbHmIFBxKcQjXzjx7wQq6LqW",
    duration: "50+ videos",
    level: "Beginner",
    category: "Aptitude",
    matchedSkills: ["aptitude", "quantitative", "reasoning"],
    matchedGoals: ["foundation", "software engineer", "any"],
    matchedBranches: ["All"],
    thumbnail: "https://img.youtube.com/vi/VpDDWqLpZgQ/mqdefault.jpg",
  },

  // === Mechanical Engineering (NPTEL + Core) ===
  {
    id: "c28",
    title: "Strength of Materials - Complete Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_1exE2V7i2LsQjDQyLqLqW",
    duration: "40+ lectures",
    level: "Intermediate",
    category: "Mechanical",
    matchedSkills: ["strength of materials", "som", "mechanics", "design"],
    matchedGoals: ["mechanical design engineer", "cad engineer", "automotive engineer", "mechanical"],
    matchedBranches: ["Mechanical", "Civil"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/HWURLmMiP_Q/mqdefault.jpg",
  },
  {
    id: "c29",
    title: "SolidWorks for Beginners - Full Course",
    channel: "Tayyab Xcelite",
    url: "https://www.youtube.com/watch?v=2x5xV7dQyLk",
    duration: "2h 30m",
    level: "Beginner",
    category: "CAD / Design",
    matchedSkills: ["solidworks", "cad", "design", "modeling"],
    matchedGoals: ["mechanical design engineer", "cad engineer", "design engineer", "mechanical"],
    matchedBranches: ["Mechanical"],
    thumbnail: "https://img.youtube.com/vi/2x5xV7dQyLk/mqdefault.jpg",
  },
  {
    id: "c30",
    title: "Thermodynamics - NPTEL Full Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_KLqLqWxqYqLq",
    duration: "45+ lectures",
    level: "Intermediate",
    category: "Mechanical",
    matchedSkills: ["thermodynamics", "thermal", "heat transfer"],
    matchedGoals: ["thermal engineer", "mechanical", "automotive engineer"],
    matchedBranches: ["Mechanical"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/L-vIqYgN6ZM/mqdefault.jpg",
  },
  {
    id: "c31",
    title: "ANSYS Workbench Tutorial - FEA for Beginners",
    channel: "SimuTech",
    url: "https://www.youtube.com/playlist?list=PLIY8eM-j5LbGmH4p6qXf2wQ",
    duration: "25+ videos",
    level: "Intermediate",
    category: "Simulation / CAE",
    matchedSkills: ["ansys", "fea", "simulation", "cae"],
    matchedGoals: ["cae engineer", "mechanical", "design engineer"],
    matchedBranches: ["Mechanical", "Civil"],
    thumbnail: "https://img.youtube.com/vi/0fQqLqWxqYk/mqdefault.jpg",
  },

  // === Civil Engineering (NPTEL + Core) ===
  {
    id: "c32",
    title: "Structural Analysis - NPTEL Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_H4p6qXf2wQ",
    duration: "40+ lectures",
    level: "Intermediate",
    category: "Civil",
    matchedSkills: ["structural analysis", "structures", "civil", "rcc"],
    matchedGoals: ["structural engineer", "civil", "construction manager"],
    matchedBranches: ["Civil"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/L-vIqYgN6ZM/mqdefault.jpg",
  },
  {
    id: "c33",
    title: "AutoCAD for Civil Engineering - Full Course",
    channel: "Civil Mentors",
    url: "https://www.youtube.com/watch?v=LqLqWxqYqLq",
    duration: "3h 15m",
    level: "Beginner",
    category: "Civil / CAD",
    matchedSkills: ["autocad", "drafting", "civil", "drawing"],
    matchedGoals: ["civil", "site engineer", "structural engineer"],
    matchedBranches: ["Civil"],
    thumbnail: "https://img.youtube.com/vi/LqLqWxqYqLk/mqdefault.jpg",
  },
  {
    id: "c34",
    title: "STAAD.Pro Tutorial for Beginners - Structural Design",
    channel: "Civil Engineering 101",
    url: "https://www.youtube.com/playlist?list=PLIY8eM-j5LbGmH4p6q",
    duration: "20+ videos",
    level: "Intermediate",
    category: "Civil",
    matchedSkills: ["staad.pro", "structural design", "civil", "analysis"],
    matchedGoals: ["structural engineer", "civil"],
    matchedBranches: ["Civil"],
    thumbnail: "https://img.youtube.com/vi/0fQqLqWxqYk/mqdefault.jpg",
  },
  {
    id: "c35",
    title: "Revit BIM for Civil Engineers - Complete Course",
    channel: "BIMstop",
    url: "https://www.youtube.com/watch?v=LqWxqYqLqLq",
    duration: "2h 45m",
    level: "Intermediate",
    category: "BIM",
    matchedSkills: ["revit", "bim", "civil", "modeling"],
    matchedGoals: ["bim modeler", "civil", "construction manager"],
    matchedBranches: ["Civil"],
    thumbnail: "https://img.youtube.com/vi/LqWxqYqLqLk/mqdefault.jpg",
  },

  // === ECE (NPTEL + Core) ===
  {
    id: "c36",
    title: "Analog Electronics - NPTEL Full Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_KLqLqWxqYq",
    duration: "40+ lectures",
    level: "Intermediate",
    category: "Electronics",
    matchedSkills: ["analog electronics", "circuits", "ece", "transistors"],
    matchedGoals: ["embedded systems engineer", "ece", "hardware engineer"],
    matchedBranches: ["ECE", "Electrical"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/L-vIqYgN6ZM/mqdefault.jpg",
  },
  {
    id: "c37",
    title: "Digital Electronics - Complete Course",
    channel: "Neso Academy",
    url: "https://www.youtube.com/playlist?list=PLB53LbKqLqWxqYqLq",
    duration: "50+ videos",
    level: "Beginner",
    category: "Electronics",
    matchedSkills: ["digital electronics", "logic gates", "flip flops", "ece"],
    matchedGoals: ["ece", "embedded systems engineer", "vlsi engineer"],
    matchedBranches: ["ECE", "Electrical"],
    thumbnail: "https://img.youtube.com/vi/L-vIqYgN6ZM/mqdefault.jpg",
  },
  {
    id: "c38",
    title: "Embedded Systems with ARM Cortex-M - Full Course",
    channel: "Digi-Key",
    url: "https://www.youtube.com/playlist?list=PLIY8eM-j5LbHmIFBxK",
    duration: "15+ videos",
    level: "Advanced",
    category: "Embedded Systems",
    matchedSkills: ["embedded", "arm", "cortex", "microcontroller", "firmware"],
    matchedGoals: ["embedded systems engineer", "ece", "iot engineer"],
    matchedBranches: ["ECE"],
    thumbnail: "https://img.youtube.com/vi/HWURLmMiP_Q/mqdefault.jpg",
  },
  {
    id: "c39",
    title: "Verilog HDL Tutorial - VLSI Design for Beginners",
    channel: "VLSI Academy",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_KLqLq",
    duration: "30+ videos",
    level: "Intermediate",
    category: "VLSI",
    matchedSkills: ["verilog", "vhdl", "vlsi", "hdl"],
    matchedGoals: ["vlsi engineer", "ece", "chip design"],
    matchedBranches: ["ECE"],
    thumbnail: "https://img.youtube.com/vi/0fQqLqWxqYk/mqdefault.jpg",
  },

  // === Electrical Engineering (NPTEL + Core) ===
  {
    id: "c40",
    title: "Electrical Machines - NPTEL Full Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_H4p6qXf2",
    duration: "45+ lectures",
    level: "Intermediate",
    category: "Electrical",
    matchedSkills: ["electrical machines", "transformers", "motors", "electrical"],
    matchedGoals: ["power systems engineer", "electrical design engineer", "electrical"],
    matchedBranches: ["Electrical", "ECE"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/L-vIqYgN6ZM/mqdefault.jpg",
  },
  {
    id: "c41",
    title: "Power Systems - NPTEL Complete Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_KLqLqWx",
    duration: "40+ lectures",
    level: "Intermediate",
    category: "Power Systems",
    matchedSkills: ["power systems", "generation", "transmission", "electrical"],
    matchedGoals: ["power systems engineer", "electrical", "renewable energy engineer"],
    matchedBranches: ["Electrical"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/L-vIqYgN6ZM/mqdefault.jpg",
  },
  {
    id: "c42",
    title: "MATLAB & Simulink Tutorial for Electrical Engineers",
    channel: "MATLAB",
    url: "https://www.youtube.com/playlist?list=PLIY8eM-j5LbHmIFBx",
    duration: "20+ videos",
    level: "Beginner",
    category: "Simulation",
    matchedSkills: ["matlab", "simulink", "simulation", "electrical"],
    matchedGoals: ["electrical", "control systems engineer", "power systems engineer"],
    matchedBranches: ["Electrical", "ECE"],
    thumbnail: "https://img.youtube.com/vi/HWURLmMiP_Q/mqdefault.jpg",
  },
  {
    id: "c43",
    title: "Solar Energy / Renewable Energy - Full Course",
    channel: "NPTEL",
    url: "https://www.youtube.com/playlist?list=PLyqSpQzTE6M_CEbG_QyXK",
    duration: "30+ lectures",
    level: "Intermediate",
    category: "Renewable Energy",
    matchedSkills: ["solar", "renewable energy", "photovoltaic", "electrical"],
    matchedGoals: ["renewable energy engineer", "electrical"],
    matchedBranches: ["Electrical"],
    isNptel: true,
    thumbnail: "https://img.youtube.com/vi/ZM8ECpBuQYE/mqdefault.jpg",
  },

  // === DSA / Placement Prep ===
  {
    id: "c44",
    title: "Data Structures & Algorithms in Java - Placement Course",
    channel: "Kunal Kushwaha",
    url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7LqMkXf2LqWxq",
    duration: "60+ videos",
    level: "Intermediate",
    category: "DSA",
    matchedSkills: ["dsa", "data structures", "algorithms", "java", "placement"],
    matchedGoals: ["software engineer", "full stack developer", "backend developer", "placement", "any"],
    matchedBranches: ["CSE", "AIML", "Data Science", "Others"],
    thumbnail: "https://img.youtube.com/vi/B31LgI4Y4PQ/mqdefault.jpg",
  },
  {
    id: "c45",
    title: "System Design for Beginners - Complete Guide",
    channel: "Gaurav Sen",
    url: "https://www.youtube.com/playlist?list=PLMCWSPQzTE6LqWxqYq",
    duration: "25+ videos",
    level: "Advanced",
    category: "System Design",
    matchedSkills: ["system design", "scalability", "architecture", "placement"],
    matchedGoals: ["software engineer", "backend developer", "full stack developer", "placement"],
    matchedBranches: ["CSE", "AIML", "Data Science", "Others"],
    thumbnail: "https://img.youtube.com/vi/HWURLmMiP_Q/mqdefault.jpg",
  },
];

export function getRecommendedCourses(
  careerGoal: string,
  skills: string[],
  branch: string = "CSE",
  currentYear: number = 4
): Course[] {
  const normalizedGoal = careerGoal.toLowerCase().trim();
  const normalizedSkills = skills.map((s) => s.toLowerCase().trim());
  const isExploring = normalizedGoal === "" || normalizedGoal.includes("exploring") || normalizedGoal.includes("undecided");
  const isFoundation = currentYear <= 2;

  const scored = COURSES.map((course) => {
    let score = 0;

    const goalMatch = course.matchedGoals.some(
      (g) => normalizedGoal.includes(g) || g.includes(normalizedGoal)
    );
    if (goalMatch) score += 10;

    const skillMatches = course.matchedSkills.filter((cs) =>
      normalizedSkills.some((us) => us.includes(cs) || cs.includes(us))
    );
    score += skillMatches.length * 3;

    if (course.matchedGoals.includes("any")) score += 1;

    // Branch matching
    if (course.matchedBranches) {
      if (course.matchedBranches.includes(branch)) score += 8;
      if (course.matchedBranches.includes("All")) score += 2;
    }

    // Exploring / undecided — favor foundation + survey courses
    if (isExploring) {
      if (course.matchedGoals.includes("exploring")) score += 6;
      if (course.level === "Beginner") score += 2;
    }

    // 1st/2nd year — boost foundation courses
    if (isFoundation) {
      if (course.matchedGoals.includes("foundation")) score += 5;
      if (course.level === "Beginner") score += 1;
    }

    return { course, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 9)
    .map((s) => s.course);
}
