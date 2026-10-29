import { EngineeringBranch } from "@/types";

export interface CareerPath {
  title: string;
  description: string;
  demand: "Very High" | "High" | "Moderate" | "Emerging";
}

export interface BranchInsight {
  branch: EngineeringBranch;
  tagline: string;
  description: string;
  futureOutlook: string;
  growthTrend: "Explosive" | "Very High" | "High" | "Stable & Growing" | "Stable";
  salaryRange: {
    fresher: string;
    mid: string;
    senior: string;
  };
  careerPaths: CareerPath[];
  highDemandRoles: string[];
  coreDomains: string[];
  essentialTools: string[];
  certifications: string[];
  topRecruiters: string[];
}

export const BRANCH_INSIGHTS: Record<EngineeringBranch, BranchInsight> = {
  CSE: {
    branch: "CSE",
    tagline: "The classic path into software & systems",
    description:
      "Computer Science Engineering covers programming, algorithms, databases, operating systems, and software architecture. It remains the most in-demand branch and opens doors to nearly every technology role.",
    futureOutlook:
      "Demand stays very high as every industry digitizes. AI, cloud, and cybersecurity are expanding the field, and system design skills are now table-stakes for senior roles.",
    growthTrend: "Very High",
    salaryRange: { fresher: "₹6–12 LPA", mid: "₹15–35 LPA", senior: "₹40–80+ LPA" },
    careerPaths: [
      { title: "Software Development Engineer", description: "Build and maintain apps, services, and platforms across web, mobile, and backend.", demand: "Very High" },
      { title: "Cloud / DevOps Engineer", description: "Automate infrastructure, CI/CD pipelines, and scale systems on AWS, Azure, or GCP.", demand: "Very High" },
      { title: "Backend Engineer", description: "Design APIs, databases, and distributed systems that power products.", demand: "High" },
      { title: "Cybersecurity Engineer", description: "Protect systems via pentesting, secure architecture, and SOC work.", demand: "High" },
      { title: "Full Stack Developer", description: "Own end-to-end product features across frontend and backend.", demand: "High" },
    ],
    highDemandRoles: ["SDE-1", "Backend Engineer", "Cloud Engineer", "DevOps Engineer", "Full Stack Developer", "Site Reliability Engineer"],
    coreDomains: ["Software Development", "Systems Design", "Algorithms & DSA", "Databases", "Cloud Computing", "Operating Systems"],
    essentialTools: ["Git", "Docker", "Kubernetes", "AWS / Azure", "PostgreSQL", "VS Code", "Linux", "Jenkins"],
    certifications: ["AWS Solutions Architect", "Google Cloud Associate", "Certified Kubernetes Administrator (CKA)", "Meta Frontend Developer"],
    topRecruiters: ["Google", "Microsoft", "Amazon", "Atlassian", "Razorpay", "Swiggy", "Zomato", "Flipkart"],
  },
  AIML: {
    branch: "AIML",
    tagline: "Building the intelligent future",
    description:
      "Artificial Intelligence & Machine Learning focuses on building systems that learn from data — from recommendation engines and forecasting to LLMs, computer vision, and autonomous agents.",
    futureOutlook:
      "Generative AI and LLMs are reshaping the field. Companies are hiring aggressively for ML engineers, MLOps, and applied AI roles across product, research, and enterprise AI.",
    growthTrend: "Explosive",
    salaryRange: { fresher: "₹7–15 LPA", mid: "₹18–45 LPA", senior: "₹50–120+ LPA" },
    careerPaths: [
      { title: "Machine Learning Engineer", description: "Build, train, and deploy ML models in production at scale.", demand: "Very High" },
      { title: "AI / LLM Engineer", description: "Fine-tune and ship LLM-powered applications, RAG pipelines, and agents.", demand: "Very High" },
      { title: "MLOps Engineer", description: "Automate the ML lifecycle — training, deployment, monitoring, versioning.", demand: "High" },
      { title: "Computer Vision Engineer", description: "Build vision systems for manufacturing, medical, and autonomous use cases.", demand: "High" },
      { title: "AI Research Scientist", description: "Push the frontier of ML through research and publications.", demand: "Emerging" },
    ],
    highDemandRoles: ["ML Engineer", "AI Engineer", "MLOps Engineer", "NLP Engineer", "Data Scientist", "LLM Application Engineer"],
    coreDomains: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps", "Statistics"],
    essentialTools: ["Python", "PyTorch", "TensorFlow", "Hugging Face", "scikit-learn", "MLflow", "Vector DBs", "Docker"],
    certifications: ["TensorFlow Developer", "AWS Machine Learning Specialty", "DeepLearning.AI Specialization", "NVIDIA Deep Learning"],
    topRecruiters: ["OpenAI", "Google DeepMind", "Nvidia", "Microsoft", "Anthropic", "Sarvam AI", "Krutrim", "Mu Sigma"],
  },
  "Data Science": {
    branch: "Data Science",
    tagline: "Turning data into decisions",
    description:
      "Data Science blends statistics, programming, and business sense to extract insights from data. It's ideal for students who love analysis, modeling, and storytelling with numbers.",
    futureOutlook:
      "Every company is becoming data-driven. Demand for analysts, data engineers, and analytics-minded scientists is steady and growing, especially in fintech, e-commerce, and SaaS.",
    growthTrend: "High",
    salaryRange: { fresher: "₹5–11 LPA", mid: "₹12–30 LPA", senior: "₹35–70 LPA" },
    careerPaths: [
      { title: "Data Analyst", description: "Analyze data, build dashboards, and communicate insights.", demand: "Very High" },
      { title: "Data Scientist", description: "Build predictive models and run experiments that shape strategy.", demand: "High" },
      { title: "Data Engineer", description: "Design pipelines and warehouses that make data reliable.", demand: "Very High" },
      { title: "Business Analyst", description: "Bridge business problems and data solutions.", demand: "High" },
      { title: "Analytics Consultant", description: "Advise multiple clients on data strategy.", demand: "Moderate" },
    ],
    highDemandRoles: ["Data Analyst", "Data Engineer", "Data Scientist", "Business Analyst", "Analytics Engineer", "BI Developer"],
    coreDomains: ["Statistics", "Data Analysis", "Business Intelligence", "Predictive Modeling", "SQL & Warehousing", "Experimentation"],
    essentialTools: ["Python", "SQL", "Pandas", "Power BI", "Tableau", "Excel", "dbt", "Snowflake"],
    certifications: ["Google Data Analytics", "Microsoft Power BI (PL-300)", "SAS Data Science", "Databricks Data Engineer"],
    topRecruiters: ["Mu Sigma", "Fractal", "Tiger Analytics", "ZS Associates", "PayPal", "Myntra", "Meesho", "Cred"],
  },
  ECE: {
    branch: "ECE",
    tagline: "Where hardware meets software",
    description:
      "Electronics & Communication Engineering bridges circuits and code. It powers IoT, embedded systems, VLSI design, and modern connectivity (5G/6G), and increasingly overlaps with edge AI and robotics.",
    futureOutlook:
      "India's semiconductor and electronics manufacturing push is creating strong demand in VLSI, embedded systems, and IoT. 5G rollout and EV/autonomous systems are opening new roles.",
    growthTrend: "High",
    salaryRange: { fresher: "₹4–9 LPA", mid: "₹10–25 LPA", senior: "₹28–55 LPA" },
    careerPaths: [
      { title: "Embedded Systems Engineer", description: "Program microcontrollers and build firmware for devices and IoT.", demand: "High" },
      { title: "VLSI / Chip Design Engineer", description: "Design and verify integrated circuits using Verilog/VHDL and EDA tools.", demand: "Very High" },
      { title: "IoT Engineer", description: "Build connected device systems spanning sensors, edge, and cloud.", demand: "High" },
      { title: "Network / Telecom Engineer", description: "Design and operate wireless and wired communication networks.", demand: "Moderate" },
      { title: "Signal Processing Engineer", description: "Work on DSP for audio, radar, imaging, and communications.", demand: "Emerging" },
    ],
    highDemandRoles: ["Embedded Engineer", "VLSI Design Engineer", "Verification Engineer", "IoT Engineer", "Hardware Engineer", "Network Engineer"],
    coreDomains: ["Embedded Systems", "VLSI Design", "IoT", "Signal Processing", "Telecommunications", "PCB Design"],
    essentialTools: ["Verilog/VHDL", "Embedded C", "MATLAB", "LTspice", "Altium Designer", "Cadence", "Arduino", "STM32Cube"],
    certifications: ["Cisco CCNA", "Cadence VLSI", "Embedded Systems (Coursera)", "ARM Accredited Engineer"],
    topRecruiters: ["Intel", "Qualcomm", "Texas Instruments", "Tata Electronics", "Micron", "ISRO", "BEL", "Nvidia"],
  },
  Electrical: {
    branch: "Electrical",
    tagline: "Powering the world and the grid",
    description:
      "Electrical Engineering deals with power generation, transmission, machines, and control systems. It's central to the renewable energy transition, EV revolution, and smart grid modernization.",
    futureOutlook:
      "Renewables, EVs, and grid modernization are driving strong growth. Power electronics and battery systems are particularly hot, with both core and EV OEMs hiring aggressively.",
    growthTrend: "Stable & Growing",
    salaryRange: { fresher: "₹4–8 LPA", mid: "₹9–22 LPA", senior: "₹25–50 LPA" },
    careerPaths: [
      { title: "Power Systems Engineer", description: "Design and operate generation, transmission, and distribution systems.", demand: "High" },
      { title: "Electrical Design Engineer", description: "Design electrical systems for buildings, plants, and infrastructure.", demand: "High" },
      { title: "Renewable Energy Engineer", description: "Work on solar, wind, and storage systems and grid integration.", demand: "Very High" },
      { title: "EV / Battery Engineer", description: "Design BMS, power electronics, and drivetrains for electric vehicles.", demand: "Very High" },
      { title: "Control Systems Engineer", description: "Build automation and control systems for industrial processes.", demand: "Moderate" },
    ],
    highDemandRoles: ["Electrical Design Engineer", "Power Systems Engineer", "EV Battery Engineer", "Renewable Energy Engineer", "Control Engineer", "PLC Engineer"],
    coreDomains: ["Power Systems", "Control Systems", "Electrical Machines", "Renewable Energy", "Power Electronics", "Smart Grids"],
    essentialTools: ["MATLAB/Simulink", "ETAP", "AutoCAD Electrical", "PLC / SCADA", "LabVIEW", "PSCAD", "DIgSILENT", "Keil"],
    certifications: ["NI LabVIEW", "AutoCAD Electrical", "NABCEP Solar", "Siemens PLC (TIA Portal)"],
    topRecruiters: ["Siemens", "ABB", "Schneider Electric", "Tata Power", "Ather", "Ola Electric", "L&T", "BHEL"],
  },
  Mechanical: {
    branch: "Mechanical",
    tagline: "Designing the physical world",
    description:
      "Mechanical Engineering covers machine design, manufacturing, automotive, thermal systems, and robotics. It's increasingly merging with CAD/CAE, simulation, and mechatronics.",
    futureOutlook:
      "EVs, robotics, and Industry 4.0 are revitalizing mechanical hiring. Roles in CAE simulation, automotive design, and manufacturing automation are particularly strong.",
    growthTrend: "Stable & Growing",
    salaryRange: { fresher: "₹4–8 LPA", mid: "₹9–22 LPA", senior: "₹24–50 LPA" },
    careerPaths: [
      { title: "Mechanical Design Engineer", description: "Design machines, parts, and assemblies using CAD tools.", demand: "High" },
      { title: "CAE / Simulation Engineer", description: "Run FEA/CFD analyses to validate designs before manufacturing.", demand: "High" },
      { title: "Automotive Engineer", description: "Design and validate vehicle systems — powertrain, chassis, EV components.", demand: "Very High" },
      { title: "Manufacturing / Industry 4.0 Engineer", description: "Optimize production lines and implement automation and IoT.", demand: "High" },
      { title: "Robotics / Mechatronics Engineer", description: "Build robotic systems blending mechanical design, electronics, and code.", demand: "Emerging" },
    ],
    highDemandRoles: ["Design Engineer", "CAE Engineer", "Manufacturing Engineer", "Automotive Engineer", "Robotics Engineer", "HVAC Engineer"],
    coreDomains: ["Machine Design", "Thermal Engineering", "Manufacturing", "Robotics", "Automotive", "CAE/CFD"],
    essentialTools: ["SolidWorks", "CATIA", "ANSYS", "Creo", "AutoCAD", "GD&T", "MATLAB", "RobotStudio"],
    certifications: ["SolidWorks Associate", "ANSYS Simulation", "Six Sigma Green Belt", "Siemens NX"],
    topRecruiters: ["Tata Motors", "Mahindra", "Bosch", "L&T", "Siemens", "Maruti Suzuki", "Hyundai", "GE"],
  },
  Civil: {
    branch: "Civil",
    tagline: "Building the infrastructure around us",
    description:
      "Civil Engineering shapes the cities we live in — from structures and transportation to water systems and sustainable urban planning. BIM, smart cities, and green building are modernizing the field.",
    futureOutlook:
      "Infrastructure investment, smart cities, and sustainable construction are driving steady growth. BIM-skilled engineers and construction-tech roles are in particular demand.",
    growthTrend: "Stable & Growing",
    salaryRange: { fresher: "₹3–7 LPA", mid: "₹8–18 LPA", senior: "₹20–45 LPA" },
    careerPaths: [
      { title: "Structural Engineer", description: "Design safe, economical structures for buildings and bridges.", demand: "High" },
      { title: "Construction Manager", description: "Plan and oversee construction projects, timelines, and budgets.", demand: "High" },
      { title: "BIM Engineer / Modeler", description: "Build 3D building information models for modern projects.", demand: "Very High" },
      { title: "Transportation / Highway Engineer", description: "Design roads, metro, and transport infrastructure.", demand: "Moderate" },
      { title: "Geotechnical Engineer", description: "Investigate soil and foundations for safe construction.", demand: "Moderate" },
    ],
    highDemandRoles: ["Structural Engineer", "Site Engineer", "BIM Modeler", "Construction Manager", "Geotechnical Engineer", "Planning Engineer"],
    coreDomains: ["Structural Engineering", "Construction Management", "Geotechnical", "Transportation", "Environmental", "BIM"],
    essentialTools: ["AutoCAD Civil", "Revit", "STAAD.Pro", "Primavera P6", "BIM 360", "GIS", "MX Road", "ETABS"],
    certifications: ["Autodesk Revit", "Primavera P6", "STAAD.Pro", "LEED Green Associate"],
    topRecruiters: ["L&T Construction", "Tata Projects", "Shapoorji Pallonji", "GMR", "DLF", "NCC", "Afcons", "Lodha"],
  },
  Others: {
    branch: "Others",
    tagline: "Your unique engineering path",
    description:
      "From interdisciplinary branches like Biotech and Chemical to emerging fields like Aerospace and Energy — this category captures everything else. Tech + domain expertise is a powerful combo.",
    futureOutlook:
      "Cross-disciplinary engineers who pair their domain with software, data, or product skills are increasingly valuable across industries.",
    growthTrend: "Stable",
    salaryRange: { fresher: "₹5–10 LPA", mid: "₹11–28 LPA", senior: "₹30–60 LPA" },
    careerPaths: [
      { title: "Software / Product Engineer", description: "Apply engineering thinking to build software products.", demand: "Very High" },
      { title: "Product Manager", description: "Own product strategy at the intersection of tech and business.", demand: "High" },
      { title: "Business / Operations Analyst", description: "Use data and process thinking to improve operations.", demand: "High" },
      { title: "Research / Domain Specialist", description: "Go deep in your branch's specialized research roles.", demand: "Emerging" },
      { title: "Consultant", description: "Advise organizations on technology, process, or domain problems.", demand: "Moderate" },
    ],
    highDemandRoles: ["Software Engineer", "Product Manager", "Business Analyst", "Operations Engineer", "Consultant", "Research Associate"],
    coreDomains: ["Interdisciplinary", "Research", "Product", "Operations", "Data", "Consulting"],
    essentialTools: ["Python", "Excel", "SQL", "Power BI", "Jira", "Notion", "Git", "Tableau"],
    certifications: ["Google Project Management", "PMP", "Google Data Analytics", "Domain-specific certs"],
    topRecruiters: ["Deloitte", "Accenture", "McKinsey", "Bain", "EY", "Google", "Microsoft", "Startups"],
  },
};

export function getBranchInsight(branch: EngineeringBranch): BranchInsight {
  return BRANCH_INSIGHTS[branch] ?? BRANCH_INSIGHTS.Others;
}
