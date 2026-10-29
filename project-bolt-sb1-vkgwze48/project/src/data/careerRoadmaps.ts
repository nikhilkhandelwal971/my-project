import { RoadmapStep, JobOpportunity, EngineeringBranch, JobType } from "@/types";

export type YearTrack = "foundation" | "mid" | "placement";

export function getYearTrack(currentYear: number): YearTrack {
  if (currentYear <= 2) return "foundation";
  if (currentYear <= 6) return "mid";
  return "placement";
}

// ============================================================
// YEAR-SPECIFIC & BRANCH-TAILORED ROADMAPS
// ============================================================

// ---- 1st Year Foundation Track ----
function foundationRoadmap(branch: EngineeringBranch): RoadmapStep[] {
  const base: RoadmapStep[] = [
    { id: "f1", phase: "Semester 1", title: "Build Engineering Foundations", description: "Get comfortable with core maths, physics, and your branch's first-year subjects.", icon: "Compass", tasks: ["Master Engineering Mathematics-I (calculus, linear algebra)", "Strengthen physics/chemistry fundamentals", "Attend every lecture and form a study group"] },
    { id: "f2", phase: "Semester 1", title: "Pick Up Basic Programming", description: "Every branch benefits from coding — start now.", icon: "Code", tasks: ["Learn C or Python basics (syntax, loops, functions)", "Complete 20+ beginner problems on HackerRank", "Build one tiny tool (calculator, unit converter)"] },
    { id: "f3", phase: "Semester 1", title: "Join a Technical Club", description: "Clubs are the fastest way to find your interests and friends.", icon: "Network", tasks: ["Join 1-2 technical clubs (robotics, coding, IEEE, SAE, CSI)", "Attend your first hackathon or tech fest", "Find a senior mentor in your branch"] },
    { id: "f4", phase: "Semester 2", title: "Explore & Decide Direction", description: "Try different domains before locking in a career goal.", icon: "Lightbulb", tasks: ["Try 3 mini-explorations (web, ML, CAD, circuits, etc.)", "Watch 'day in the life' videos for 3 roles", "Set a tentative career goal — or pick 'Exploring'"] },
    { id: "f5", phase: "Semester 2", title: "Communication & Soft Skills", description: "Start building the skills that placements actually test.", icon: "Users", tasks: ["Give 2 class presentations confidently", "Practice aptitude (quant + logical reasoning)", "Write a short LinkedIn post about what you learned"] },
  ];

  // Branch-specific foundation tweaks
  if (branch === "CSE" || branch === "AIML" || branch === "Data Science") {
    base[1] = { id: "f2", phase: "Semester 1", title: "Pick Up Programming", description: "Coding is core to your branch — start with Python/C.", icon: "Code", tasks: ["Learn Python or C thoroughly (syntax, loops, functions)", "Complete 30+ problems on HackerRank/LeetCode Easy", "Build a tiny CLI tool or calculator"] };
  }
  if (branch === "ECE" || branch === "Electrical") {
    base.push({ id: "f6", phase: "Semester 2", title: "Hands-On with Circuits", description: "Get tactile with hardware early.", icon: "Hammer", tasks: ["Buy an Arduino/breadboard starter kit", "Build 3 simple LED/sensor circuits", "Learn Ohm's law, KCL/KVL intuitively"] });
  }
  if (branch === "Mechanical") {
    base.push({ id: "f6", phase: "Semester 2", title: "Hands-On with CAD & Machines", description: "Get comfortable with design tools and workshop basics.", icon: "Hammer", tasks: ["Complete a workshop training (lathe, welding, 3D printing)", "Install SolidWorks/AutoCAD and model one part", "Join SAE or a BAJA/Formula Student team"] });
  }
  if (branch === "Civil") {
    base.push({ id: "f6", phase: "Semester 2", title: "Site Visits & AutoCAD", description: "See real construction and learn the universal drafting tool.", icon: "Hammer", tasks: ["Visit one live construction site", "Learn AutoCAD 2D drafting basics", "Draft a simple residential floor plan"] });
  }

  return base;
}

// ---- 2nd & 3rd Year Mid Track ----
function midTrackRoadmap(goal: string, branch: EngineeringBranch): RoadmapStep[] {
  const g = goal.toLowerCase();
  const isExploring = g === "" || g.includes("exploring") || g.includes("undecided");

  // Goal-specific software/AI tracks
  if (g.includes("data") || g.includes("ai") || g.includes("ml")) {
    return [
      { id: "m1", phase: "Year 2", title: "Data & ML Foundations", description: "Strengthen Python, stats, and your first ML project.", icon: "Code", tasks: ["Master Python + NumPy/Pandas", "Revise linear algebra & statistics", "Complete 2 Kaggle competitions"] },
      { id: "m2", phase: "Year 2", title: "First ML Project & GitHub", description: "Ship something real and put it online.", icon: "BrainCircuit", tasks: ["Build an EDA dashboard or regression project", "Learn scikit-learn & model evaluation", "Publish 2 projects on GitHub with READMEs"] },
      { id: "m3", phase: "Year 3", title: "Deep Learning & Deployment", description: "Go deeper and learn to deploy models.", icon: "Rocket", tasks: ["Study neural networks with PyTorch/TensorFlow", "Deploy a model as a REST API with FastAPI", "Write a technical blog on your project"] },
      { id: "m4", phase: "Year 3", title: "First Internship & Networking", description: "Apply to data/ML internships and grow your network.", icon: "Briefcase", tasks: ["Apply to 15+ data/ML internships", "Attend a data meetup or hackathon", "Optimize resume with project metrics"] },
      { id: "m5", phase: "Year 3", title: "Hackathons & Competitions", description: "Compete to sharpen skills and build credibility.", icon: "Trophy", tasks: ["Participate in 2+ ML hackathons", "Contribute to an open-source ML repo", "Publish one more portfolio project"] },
    ];
  }

  if (g.includes("full") || g.includes("stack") || g.includes("front") || g.includes("back") || g.includes("web") || g.includes("software")) {
    return [
      { id: "m1", phase: "Year 2", title: "HTML, CSS & JavaScript Core", description: "Nail the fundamentals that everything is built on.", icon: "Code", tasks: ["Master HTML5 & CSS Flexbox/Grid", "Learn ES6+ JavaScript deeply", "Build 2 interactive UI clones"] },
      { id: "m2", phase: "Year 2", title: "Framework & Real Projects", description: "Pick React and ship real apps.", icon: "Layers", tasks: ["Learn React hooks & component patterns", "Build a full CRUD app with routing", "Add Tailwind CSS for styling"] },
      { id: "m3", phase: "Year 3", title: "Backend & Database", description: "Connect the front to a server and database.", icon: "Server", tasks: ["Learn Node.js + Express", "Build REST APIs with CRUD", "Use PostgreSQL or MongoDB"] },
      { id: "m4", phase: "Year 3", title: "Deploy & First Internship", description: "Put apps online and start applying.", icon: "Rocket", tasks: ["Deploy a full-stack app on Vercel/Netlify", "Apply to 15+ developer internships", "Contribute to one open-source project"] },
      { id: "m5", phase: "Year 3", title: "DSA & Hackathons", description: "Build problem-solving speed and ship fast.", icon: "Trophy", tasks: ["Solve 80+ LeetCode problems", "Win/participate in 2 hackathons", "Build a portfolio site showcasing your work"] },
    ];
  }

  if (g.includes("product") || g.includes("pm")) {
    return [
      { id: "m1", phase: "Year 2", title: "Product Thinking Fundamentals", description: "Understand what makes great products.", icon: "Lightbulb", tasks: ["Read Inspired by Marty Cagan", "Analyze 3 products you love", "Write a 1-page product teardown"] },
      { id: "m2", phase: "Year 2", title: "Research & User Insights", description: "Learn to talk to users and use data.", icon: "Users", tasks: ["Conduct 5 user interviews", "Learn A/B testing basics", "Create user personas & journey maps"] },
      { id: "m3", phase: "Year 3", title: "Specs, Roadmaps & Analytics", description: "Practice writing PRDs and using metrics.", icon: "ClipboardList", tasks: ["Write a full PRD for an app idea", "Learn RICE/MoSCoW prioritization", "Learn SQL for product analytics"] },
      { id: "m4", phase: "Year 3", title: "PM Internships", description: "Land your first product internship.", icon: "Briefcase", tasks: ["Apply to 20+ PM/APM internships", "Practice product sense & estimation questions", "Build 3 product case studies"] },
      { id: "m5", phase: "Year 3", title: "Build a PM Portfolio", description: "Show your thinking publicly.", icon: "Trophy", tasks: ["Publish 3 product teardowns online", "Join a product community (Lenny's, Ravi's)", "Lead a small product initiative in a club"] },
    ];
  }

  // Branch-specific mid tracks for core branches
  if (branch === "ECE") {
    return [
      { id: "m1", phase: "Year 2", title: "Circuit & Electronics Core", description: "Strengthen analog & digital electronics.", icon: "Code", tasks: ["Revise analog & digital electronics", "Learn LTspice/Proteus simulation", "Build 2 small embedded circuits"] },
      { id: "m2", phase: "Year 2", title: "Microcontrollers & Embedded C", description: "Get hands-on with ARM/AVR.", icon: "Server", tasks: ["Learn Embedded C & RTOS basics", "Build an Arduino/STM32 sensor project", "Interface peripherals (LCD, UART, I2C)"] },
      { id: "m3", phase: "Year 3", title: "VLSI or IoT Track", description: "Pick VLSI design or IoT based on your goal.", icon: "Layers", tasks: ["Learn Verilog/VHDL or build an IoT app", "Complete a mini design project", "Document it on GitHub/Notion"] },
      { id: "m4", phase: "Year 3", title: "Internships & Hackathons", description: "Apply to ECE internships.", icon: "Briefcase", tasks: ["Apply to 15+ embedded/VLSI/IoT internships", "Attend a hardware hackathon", "Build a hardware portfolio"] },
      { id: "m5", phase: "Year 3", title: "Specialization Project", description: "Go deep in your chosen sub-field.", icon: "Trophy", tasks: ["Complete one capstone-style project", "Get certified (Cadence/Cisco/Embedded)", "Present your work at a symposium"] },
    ];
  }

  if (branch === "Electrical") {
    return [
      { id: "m1", phase: "Year 2", title: "Electrical Fundamentals", description: "Reinforce machines, circuits, power systems.", icon: "Code", tasks: ["Revise machines & power systems", "Learn MATLAB/Simulink basics", "Build a small power electronics circuit"] },
      { id: "m2", phase: "Year 2", title: "Simulation & Design", description: "Use ETAP/AutoCAD Electrical.", icon: "Layers", tasks: ["Learn AutoCAD Electrical & ETAP", "Simulate a power system in Simulink", "Design a small distribution board"] },
      { id: "m3", phase: "Year 3", title: "Specialization Track", description: "Pick renewable, EV, or control systems.", icon: "Rocket", tasks: ["Complete a project in your track", "Study solar/EV/PLC fundamentals", "Get certified in your specialization"] },
      { id: "m4", phase: "Year 3", title: "Internships & Networking", description: "Apply to electrical core and OEM roles.", icon: "Briefcase", tasks: ["Apply to 15+ electrical internships", "Visit a substation or manufacturing plant", "Build a technical project portfolio"] },
      { id: "m5", phase: "Year 3", title: "Industry 4.0 Exposure", description: "Modern electrical roles need software too.", icon: "Trophy", tasks: ["Learn basics of PLC programming", "Complete an IoT + energy monitoring mini-project", "Join an IEEE student chapter"] },
    ];
  }

  if (branch === "Mechanical") {
    return [
      { id: "m1", phase: "Year 2", title: "Design Fundamentals", description: "Strengthen machine design & manufacturing.", icon: "Code", tasks: ["Revise strength of materials & design", "Learn SolidWorks or CATIA basics", "Model 2 mechanical parts in CAD"] },
      { id: "m2", phase: "Year 2", title: "Simulation & Analysis", description: "Get into FEA/CFD with ANSYS.", icon: "Layers", tasks: ["Learn ANSYS Structural & Fluent", "Run an FEA simulation on a bracket", "Study GD&T and DFMA principles"] },
      { id: "m3", phase: "Year 3", title: "Specialization Project", description: "Pick automotive, robotics, or thermal.", icon: "Rocket", tasks: ["Complete a capstone-style project", "Build a BAJA/Formula Student or robotics project", "Document your design decisions"] },
      { id: "m4", phase: "Year 3", title: "Internships & Networking", description: "Apply to mechanical & automotive roles.", icon: "Briefcase", tasks: ["Apply to 15+ mechanical internships", "Join an SAE or robotics team", "Build a CAD + analysis portfolio"] },
      { id: "m5", phase: "Year 3", title: "Manufacturing & Industry 4.0", description: "Modern mechanical roles blend with automation.", icon: "Trophy", tasks: ["Learn CNC & lean manufacturing basics", "Complete a manufacturing automation mini-project", "Get a Six Sigma Green Belt"] },
    ];
  }

  if (branch === "Civil") {
    return [
      { id: "m1", phase: "Year 2", title: "Structural Fundamentals", description: "Reinforce structural analysis & concrete design.", icon: "Code", tasks: ["Revise structural analysis & RCC design", "Learn AutoCAD Civil basics", "Draft one small building plan"] },
      { id: "m2", phase: "Year 2", title: "Analysis & BIM Tools", description: "Get into STAAD.Pro and Revit.", icon: "Layers", tasks: ["Learn STAAD.Pro & Revit", "Analyze a small frame in STAAD", "Build a 3D BIM model of a building"] },
      { id: "m3", phase: "Year 3", title: "Specialization Project", description: "Pick structural, transportation, or geotechnical.", icon: "Rocket", tasks: ["Complete a capstone civil project", "Study estimation & costing basics", "Get familiar with Primavera P6"] },
      { id: "m4", phase: "Year 3", title: "Internships & Site Exposure", description: "Apply to civil internships and contractors.", icon: "Briefcase", tasks: ["Apply to 15+ civil internships", "Get site exposure on a live project", "Build a portfolio of drawings + reports"] },
      { id: "m5", phase: "Year 3", title: "BIM & Smart Cities", description: "Modern civil roles blend with BIM & GIS.", icon: "Trophy", tasks: ["Get certified in Revit/STAAD", "Complete a GIS/urban-planning mini-project", "Attend a construction-tech webinar"] },
    ];
  }

  // Exploring / undecided — generic mid track
  if (isExploring) {
    return [
      { id: "m1", phase: "Year 2", title: "Explore 3 Domains", description: "Sample different paths before committing.", icon: "Compass", tasks: ["Try a web dev, a data, and a core-branch mini-project", "Talk to 5 seniors about their paths", "Pick the one you enjoyed most"] },
      { id: "m2", phase: "Year 2", title: "Strengthen Core + One Skill", description: "Build fundamentals and a marketable skill.", icon: "Code", tasks: ["Keep your branch subjects strong", "Learn Python or Excel well", "Complete one online course"] },
      { id: "m3", phase: "Year 3", title: "Pick a Direction & Go Deep", description: "Convert exploration into a focused goal.", icon: "Target", tasks: ["Set a clear career goal", "Build 2 projects in that direction", "Update your roadmap accordingly"] },
      { id: "m4", phase: "Year 3", title: "First Internship", description: "Get real experience.", icon: "Briefcase", tasks: ["Apply to 15+ internships in your chosen area", "Tailor your resume", "Prepare for basic interviews"] },
      { id: "m5", phase: "Year 3", title: "Network & Compete", description: "Grow visibility.", icon: "Trophy", tasks: ["Attend 2 industry events", "Participate in 1 hackathon/competition", "Build a LinkedIn presence"] },
    ];
  }

  // Generic mid fallback
  return [
    { id: "m1", phase: "Year 2", title: "Strengthen Core & Explore", description: "Build branch fundamentals and explore interests.", icon: "Compass", tasks: ["Research 10 professionals in your target role", "Identify 3 core skills to develop", "Enroll in one online course"] },
    { id: "m2", phase: "Year 2", title: "Build Real Projects", description: "Apply your learning by building something tangible.", icon: "Hammer", tasks: ["Complete 2 portfolio-worthy projects", "Document your work on GitHub/Notion", "Get feedback from a mentor"] },
    { id: "m3", phase: "Year 3", title: "Internship & Networking", description: "Get real-world experience.", icon: "Briefcase", tasks: ["Apply to 15+ internships", "Reach out to 10 professionals on LinkedIn", "Join 3 relevant communities"] },
    { id: "m4", phase: "Year 3", title: "Specialize & Compete", description: "Go deeper and compete.", icon: "Target", tasks: ["Pick a specialization within your goal", "Participate in a competition/hackathon", "Build one standout project"] },
    { id: "m5", phase: "Year 3", title: "Pre-Placement Prep", description: "Start preparing for placements.", icon: "Trophy", tasks: ["Start aptitude & interview prep", "Polish your resume", "Do 2 mock interviews"] },
  ];
}

// ---- 4th Year Placement Track ----
function placementRoadmap(branch: EngineeringBranch): RoadmapStep[] {
  const base: RoadmapStep[] = [
    { id: "p1", phase: "Semester 7", title: "Resume & LinkedIn Polish", description: "Your resume and online presence are your first impression.", icon: "ClipboardList", tasks: ["Build an ATS-friendly one-page resume", "Polish LinkedIn (headline, about, projects)", "Collect 2-3 recommendations"] },
    { id: "p2", phase: "Semester 7", title: "Aptitude & DSA Sprint", description: "Most placement rounds start here.", icon: "Target", tasks: ["Solve 100+ aptitude questions (quant + logical)", "Solve 100+ LeetCode problems (Easy/Medium)", "Practice SQL & verbal rounds"] },
    { id: "p3", phase: "Semester 7", title: "Core Subject Revision", description: "Revise your branch's core subjects for technical rounds.", icon: "Layers", tasks: ["Revise 5 core subjects of your branch", "Make short notes/cheat sheets", "Solve previous-year placement questions"] },
    { id: "p4", phase: "Semester 7-8", title: "Mock Interviews & System Design", description: "Practice the real thing before it counts.", icon: "Users", tasks: ["Do 8+ mock interviews with peers/seniors", "Learn system design / G.D basics", "Prepare behavioral answers (STAR method)"] },
    { id: "p5", phase: "Semester 8", title: "Apply: FTE, GET & Off-Campus Drives", description: "Cast a wide net across on-campus and off-campus.", icon: "Briefcase", tasks: ["Apply to 30+ Full-Time (FTE) roles", "Apply to GET programs (Tata, Mahindra, L&T, etc.)", "Register on off-campus portals (Unstop, Naukri, LinkedIn)"] },
    { id: "p6", phase: "Semester 8", title: "Offers, Negotiation & Beyond", description: "Close the deal and plan your start.", icon: "Trophy", tasks: ["Compare offers (CTC, role, growth, location)", "Negotiate politely where possible", "Accept, prepare for onboarding, and celebrate"] },
  ];

  if (branch === "CSE" || branch === "AIML" || branch === "Data Science") {
    base[3] = { id: "p4", phase: "Semester 7-8", title: "Mock Interviews & System Design", description: "Practice DSA, system design, and ML rounds.", icon: "Users", tasks: ["Do 8+ mock interviews", "Study LLD + HLD system design", "For ML roles: revise ML fundamentals + project walkthroughs"] };
  }

  return base;
}

// ============================================================
// PUBLIC API
// ============================================================

export function getCareerRoadmap(goal: string, branch: EngineeringBranch, currentYear: number = 4): RoadmapStep[] {
  const track = getYearTrack(currentYear);
  if (track === "foundation") return foundationRoadmap(branch);
  if (track === "placement") return placementRoadmap(branch);
  return midTrackRoadmap(goal, branch);
}

// ============================================================
// JOB OPPORTUNITIES — includes FTE, GET, Off-Campus
// ============================================================

function withPlacementJobs(jobs: JobOpportunity[], branch: EngineeringBranch): JobOpportunity[] {
  const getPrograms: Record<EngineeringBranch, JobOpportunity[]> = {
    CSE: [
      { id: "fte-c1", role: "Software Engineer (FTE)", company: "Razorpay", type: "Full-Time (FTE)", compensation: "₹18 LPA", location: "Bangalore", tags: ["Java", "DSA", "System Design"] },
      { id: "get-c1", role: "Graduate Engineer Trainee", company: "TCS Digital", type: "Graduate Engineer Trainee", compensation: "₹7 LPA", location: "Pan India", tags: ["Training", "Programming", "Aptitude"] },
      { id: "off-c1", role: "Off-Campus SDE Drive", company: "Swiggy", type: "Off-Campus Drive", compensation: "₹15 LPA", location: "Bangalore", tags: ["DSA", "System Design", "Off-Campus"] },
    ],
    AIML: [
      { id: "fte-a1", role: "ML Engineer (FTE)", company: "Krutrim", type: "Full-Time (FTE)", compensation: "₹20 LPA", location: "Bangalore", tags: ["PyTorch", "LLMs", "Python"] },
      { id: "get-a1", role: "AI Graduate Engineer Trainee", company: "Mu Sigma", type: "Graduate Engineer Trainee", compensation: "₹8 LPA", location: "Bangalore", tags: ["Analytics", "ML", "Training"] },
      { id: "off-a1", role: "Off-Campus ML Drive", company: "Sarvam AI", type: "Off-Campus Drive", compensation: "₹16 LPA", location: "Remote", tags: ["NLP", "LLMs", "Off-Campus"] },
    ],
    "Data Science": [
      { id: "fte-d1", role: "Data Scientist (FTE)", company: "Tiger Analytics", type: "Full-Time (FTE)", compensation: "₹14 LPA", location: "Chennai", tags: ["Python", "SQL", "ML"] },
      { id: "get-d1", role: "Data Analyst GET", company: "ZS Associates", type: "Graduate Engineer Trainee", compensation: "₹7 LPA", location: "Pune", tags: ["Analytics", "SQL", "Excel"] },
      { id: "off-d1", role: "Off-Campus Data Drive", company: "Meesho", type: "Off-Campus Drive", compensation: "₹12 LPA", location: "Bangalore", tags: ["SQL", "Python", "Analytics"] },
    ],
    ECE: [
      { id: "fte-e1", role: "Embedded Engineer (FTE)", company: "Texas Instruments", type: "Full-Time (FTE)", compensation: "₹12 LPA", location: "Bangalore", tags: ["Embedded C", "Firmware", "ARM"] },
      { id: "get-e1", role: "Graduate Engineer Trainee", company: "BEL", type: "Graduate Engineer Trainee", compensation: "₹6 LPA", location: "Bangalore", tags: ["Electronics", "Training", "Core"] },
      { id: "off-e1", role: "Off-Campus VLSI Drive", company: "Micron", type: "Off-Campus Drive", compensation: "₹10 LPA", location: "Hyderabad", tags: ["VLSI", "Verilog", "Off-Campus"] },
    ],
    Electrical: [
      { id: "fte-el1", role: "Electrical Engineer (FTE)", company: "Schneider Electric", type: "Full-Time (FTE)", compensation: "₹8 LPA", location: "Hyderabad", tags: ["Power Systems", "Design", "Electrical"] },
      { id: "get-el1", role: "Graduate Engineer Trainee", company: "BHEL", type: "Graduate Engineer Trainee", compensation: "₹6 LPA", location: "Pan India", tags: ["Core", "Training", "Electrical"] },
      { id: "off-el1", role: "Off-Campus EV Drive", company: "Ather Energy", type: "Off-Campus Drive", compensation: "₹9 LPA", location: "Bangalore", tags: ["EV", "BMS", "Off-Campus"] },
    ],
    Mechanical: [
      { id: "fte-m1", role: "Design Engineer (FTE)", company: "Bosch", type: "Full-Time (FTE)", compensation: "₹8 LPA", location: "Bangalore", tags: ["SolidWorks", "Design", "GD&T"] },
      { id: "get-m1", role: "Graduate Engineer Trainee", company: "Tata Motors", type: "Graduate Engineer Trainee", compensation: "₹6.5 LPA", location: "Pune", tags: ["Automotive", "Training", "Core"] },
      { id: "off-m1", role: "Off-Campus Manufacturing Drive", company: "L&T", type: "Off-Campus Drive", compensation: "₹7 LPA", location: "Mumbai", tags: ["Manufacturing", "Off-Campus", "Core"] },
    ],
    Civil: [
      { id: "fte-ci1", role: "Structural Engineer (FTE)", company: "L&T Construction", type: "Full-Time (FTE)", compensation: "₹6 LPA", location: "Mumbai", tags: ["STAAD.Pro", "Structural", "Design"] },
      { id: "get-ci1", role: "Graduate Engineer Trainee", company: "Tata Projects", type: "Graduate Engineer Trainee", compensation: "₹5 LPA", location: "Pan India", tags: ["Construction", "Training", "Core"] },
      { id: "off-ci1", role: "Off-Campus BIM Drive", company: "Afcons", type: "Off-Campus Drive", compensation: "₹5.5 LPA", location: "Hyderabad", tags: ["BIM", "Revit", "Off-Campus"] },
    ],
    Others: [
      { id: "fte-o1", role: "Software Engineer (FTE)", company: "Accenture", type: "Full-Time (FTE)", compensation: "₹7 LPA", location: "Pan India", tags: ["Programming", "Training", "Aptitude"] },
      { id: "get-o1", role: "Graduate Engineer Trainee", company: "Deloitte", type: "Graduate Engineer Trainee", compensation: "₹8 LPA", location: "Bangalore", tags: ["Consulting", "Analytics", "Training"] },
      { id: "off-o1", role: "Off-Campus Analyst Drive", company: "EY", type: "Off-Campus Drive", compensation: "₹7.5 LPA", location: "Mumbai", tags: ["Analytics", "Consulting", "Off-Campus"] },
    ],
  };
  return [...jobs, ...(getPrograms[branch] ?? getPrograms.Others)];
}

export function getJobOpportunities(goal: string, branch: EngineeringBranch, currentYear: number = 4): JobOpportunity[] {
  const g = goal.toLowerCase();
  let base: JobOpportunity[] = [];

  if (g.includes("data") || g.includes("ai") || g.includes("ml")) {
    base = [
      { id: "j1", role: "Data Science Intern", company: "Quantilytic", type: "Internship", compensation: "₹25,000/mo", location: "Remote", tags: ["Python", "SQL", "ML"] },
      { id: "j2", role: "ML Engineering Intern", company: "NeuraForge", type: "Internship", compensation: "₹30,000/mo", location: "Bangalore", tags: ["PyTorch", "MLOps"] },
      { id: "j3", role: "Junior Data Analyst", company: "InsightLab", type: "Fresher Job", compensation: "₹6 LPA", location: "Hyderabad", tags: ["SQL", "Power BI", "Excel"] },
      { id: "j4", role: "AI Research Intern", company: "Cognitivex", type: "Internship", compensation: "₹35,000/mo", location: "Remote", tags: ["NLP", "Research"] },
      { id: "j5", role: "Data Engineer Trainee", company: "StreamWorks", type: "Fresher Job", compensation: "₹5.5 LPA", location: "Pune", tags: ["Spark", "ETL", "Python"] },
      { id: "j6", role: "Business Analyst (Fresher)", company: "Corelytics", type: "Fresher Job", compensation: "₹7 LPA", location: "Mumbai", tags: ["Analytics", "SQL", "Tableau"] },
    ];
  } else if (g.includes("full") || g.includes("stack") || g.includes("front") || g.includes("back") || g.includes("web") || g.includes("software")) {
    base = [
      { id: "j1", role: "Full Stack Developer Intern", company: "ByteCraft", type: "Internship", compensation: "₹20,000/mo", location: "Remote", tags: ["React", "Node.js", "MongoDB"] },
      { id: "j2", role: "Frontend Developer Intern", company: "PixelNest", type: "Internship", compensation: "₹18,000/mo", location: "Remote", tags: ["React", "TypeScript", "CSS"] },
      { id: "j3", role: "Junior Software Engineer", company: "CodeNova", type: "Fresher Job", compensation: "₹8 LPA", location: "Bangalore", tags: ["Java", "Spring", "MySQL"] },
      { id: "j4", role: "Backend Engineering Intern", company: "API Forge", type: "Internship", compensation: "₹25,000/mo", location: "Bangalore", tags: ["Node.js", "PostgreSQL", "Docker"] },
      { id: "j5", role: "Web Developer (Fresher)", company: "Cloudpeak", type: "Fresher Job", compensation: "₹6 LPA", location: "Hyderabad", tags: ["JavaScript", "Vue", "Firebase"] },
      { id: "j6", role: "React Developer Trainee", company: "UIwave", type: "Fresher Job", compensation: "₹7 LPA", location: "Remote", tags: ["React", "Redux", "Tailwind"] },
    ];
  } else if (g.includes("product") || g.includes("pm")) {
    base = [
      { id: "j1", role: "Product Management Intern", company: "Prodcatalyst", type: "Internship", compensation: "₹30,000/mo", location: "Bangalore", tags: ["PRD", "Analytics", "UX"] },
      { id: "j2", role: "Associate Product Manager", company: "NorthStar", type: "Fresher Job", compensation: "₹12 LPA", location: "Bangalore", tags: ["Strategy", "Roadmapping"] },
      { id: "j3", role: "PM Intern (B2B SaaS)", company: "Saasify Labs", type: "Internship", compensation: "₹28,000/mo", location: "Remote", tags: ["SaaS", "User Research"] },
      { id: "j4", role: "Product Analyst (Fresher)", company: "Metrica", type: "Fresher Job", compensation: "₹9 LPA", location: "Mumbai", tags: ["SQL", "Analytics", "A/B Testing"] },
      { id: "j5", role: "APM — Consumer Apps", company: "Flowstate", type: "Fresher Job", compensation: "₹11 LPA", location: "Gurgaon", tags: ["Mobile", "Growth"] },
      { id: "j6", role: "Product Strategy Intern", company: "Visary", type: "Internship", compensation: "₹25,000/mo", location: "Remote", tags: ["Strategy", "Market Research"] },
    ];
  } else if (branch === "ECE") {
    base = [
      { id: "j1", role: "Embedded Systems Intern", company: "Chiplogic", type: "Internship", compensation: "₹22,000/mo", location: "Bangalore", tags: ["Embedded C", "ARM", "RTOS"] },
      { id: "j2", role: "VLSI Design Intern", company: "SiliconCore", type: "Internship", compensation: "₹30,000/mo", location: "Hyderabad", tags: ["Verilog", "VLSI", "Cadence"] },
      { id: "j3", role: "IoT Engineer Trainee", company: "Connectix", type: "Fresher Job", compensation: "₹5.5 LPA", location: "Pune", tags: ["IoT", "Arduino", "MQTT"] },
      { id: "j4", role: "Hardware Engineer Intern", company: "VoltEdge", type: "Internship", compensation: "₹20,000/mo", location: "Remote", tags: ["PCB", "Altium", "Circuits"] },
      { id: "j5", role: "Network Engineer (Fresher)", company: "FiberLink", type: "Fresher Job", compensation: "₹6 LPA", location: "Chennai", tags: ["Networking", "Cisco", "5G"] },
      { id: "j6", role: "Signal Processing Intern", company: "WaveLab", type: "Internship", compensation: "₹25,000/mo", location: "Remote", tags: ["DSP", "MATLAB", "Signals"] },
    ];
  } else if (branch === "Electrical") {
    base = [
      { id: "j1", role: "Electrical Design Intern", company: "VoltEdge", type: "Internship", compensation: "₹18,000/mo", location: "Pune", tags: ["AutoCAD Electrical", "Design", "ETAP"] },
      { id: "j2", role: "Power Systems Intern", company: "GridFlow", type: "Internship", compensation: "₹22,000/mo", location: "Mumbai", tags: ["Power Systems", "MATLAB", "Protection"] },
      { id: "j3", role: "Renewable Energy Trainee", company: "Solarix", type: "Fresher Job", compensation: "₹5 LPA", location: "Jaipur", tags: ["Solar", "Renewable", "Inverters"] },
      { id: "j4", role: "EV Battery Intern", company: "VoltMotive", type: "Internship", compensation: "₹28,000/mo", location: "Bangalore", tags: ["EV", "BMS", "Batteries"] },
      { id: "j5", role: "Control Systems Engineer", company: "AutoControl", type: "Fresher Job", compensation: "₹6.5 LPA", location: "Chennai", tags: ["PLC", "SCADA", "Control"] },
      { id: "j6", role: "Electrical Maintenance Intern", company: "PowerGrid Co", type: "Internship", compensation: "₹15,000/mo", location: "Delhi", tags: ["Maintenance", "Substation", "Relays"] },
    ];
  } else if (branch === "Mechanical") {
    base = [
      { id: "j1", role: "Mechanical Design Intern", company: "GearWorks", type: "Internship", compensation: "₹18,000/mo", location: "Pune", tags: ["SolidWorks", "Design", "GD&T"] },
      { id: "j2", role: "CAE/FEA Intern", company: "SimuMech", type: "Internship", compensation: "₹25,000/mo", location: "Bangalore", tags: ["ANSYS", "FEA", "Simulation"] },
      { id: "j3", role: "Automotive Engineer Trainee", company: "Drive Motors", type: "Fresher Job", compensation: "₹6 LPA", location: "Chennai", tags: ["Automotive", "CATIA", "Powertrain"] },
      { id: "j4", role: "Manufacturing Intern", company: "ForgeLine", type: "Internship", compensation: "₹16,000/mo", location: "Gurgaon", tags: ["Manufacturing", "Lean", "CNC"] },
      { id: "j5", role: "Robotics Engineer (Fresher)", company: "AutoBotix", type: "Fresher Job", compensation: "₹7 LPA", location: "Bangalore", tags: ["Robotics", "ROS", "Automation"] },
      { id: "j6", role: "HVAC Intern", company: "ClimateCorp", type: "Internship", compensation: "₹20,000/mo", location: "Mumbai", tags: ["HVAC", "Thermal", "CFD"] },
    ];
  } else if (branch === "Civil") {
    base = [
      { id: "j1", role: "Structural Engineer Intern", company: "BuildRight", type: "Internship", compensation: "₹15,000/mo", location: "Mumbai", tags: ["STAAD.Pro", "RCC", "Design"] },
      { id: "j2", role: "Site Engineer Trainee", company: "ConcreteCo", type: "Fresher Job", compensation: "₹4.5 LPA", location: "Delhi", tags: ["Site", "Execution", "Surveying"] },
      { id: "j3", role: "BIM Modeler Intern", company: "ModelBuild", type: "Internship", compensation: "₹18,000/mo", location: "Bangalore", tags: ["Revit", "BIM", "Modeling"] },
      { id: "j4", role: "Construction Manager (Fresher)", company: "UrbanBuild", type: "Fresher Job", compensation: "₹5.5 LPA", location: "Hyderabad", tags: ["Construction", "Planning", "Primavera"] },
      { id: "j5", role: "Geotechnical Intern", company: "SoilSolve", type: "Internship", compensation: "₹16,000/mo", location: "Pune", tags: ["Geotech", "Foundation", "Soil"] },
      { id: "j6", role: "Urban Planning Intern", company: "PlanCity", type: "Internship", compensation: "₹20,000/mo", location: "Remote", tags: ["GIS", "Planning", "Urban"] },
    ];
  } else {
    base = [
      { id: "j1", role: "Software Engineering Intern", company: "TechVantage", type: "Internship", compensation: "₹20,000/mo", location: "Remote", tags: ["Programming", "Problem Solving"] },
      { id: "j2", role: "Business Analyst Intern", company: "DataDive", type: "Internship", compensation: "₹18,000/mo", location: "Mumbai", tags: ["Excel", "Analytics"] },
      { id: "j3", role: "Graduate Trainee", company: "GlobalEdge", type: "Fresher Job", compensation: "₹6 LPA", location: "Bangalore", tags: ["Training", "Development"] },
      { id: "j4", role: "Marketing Intern", company: "Brandly", type: "Internship", compensation: "₹15,000/mo", location: "Remote", tags: ["Social Media", "Content"] },
      { id: "j5", role: "Operations Analyst", company: "Smoothflow", type: "Fresher Job", compensation: "₹5.5 LPA", location: "Pune", tags: ["Logistics", "Optimization"] },
      { id: "j6", role: "UI/UX Design Intern", company: "DesignHub", type: "Internship", compensation: "₹20,000/mo", location: "Remote", tags: ["Figma", "User Research"] },
    ];
  }

  // Add FTE / GET / Off-Campus drives for placement-track (4th-year) students
  const track = getYearTrack(currentYear);
  if (track === "placement") {
    return withPlacementJobs(base, branch);
  }
  return base;
}
