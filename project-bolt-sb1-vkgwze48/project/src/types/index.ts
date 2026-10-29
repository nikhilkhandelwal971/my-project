export type EngineeringBranch =
  | "CSE"
  | "AIML"
  | "Data Science"
  | "ECE"
  | "Electrical"
  | "Mechanical"
  | "Civil"
  | "Others";

export const ENGINEERING_BRANCHES: EngineeringBranch[] = [
  "CSE",
  "AIML",
  "Data Science",
  "ECE",
  "Electrical",
  "Mechanical",
  "Civil",
  "Others",
];

export interface CgpaEntry {
  id: string;
  label: string;
  cgpa: string;
}

export interface SkillTag {
  id: string;
  name: string;
}

export interface OnboardingData {
  name: string;
  degree: string;
  branch: EngineeringBranch;
  currentYear: number;
  cgpaEntries: CgpaEntry[];
  targetCgpa: string | null;
  boardPercentage: string | null;
  entranceExamRank: string | null;
  skills: SkillTag[];
  careerGoal: string;
}

export interface RoadmapStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  tasks: string[];
  icon: string;
}

export type JobType = "Internship" | "Fresher Job" | "Full-Time (FTE)" | "Graduate Engineer Trainee" | "Off-Campus Drive";

export const JOB_TYPE_FILTERS: ("all" | JobType)[] = [
  "all",
  "Internship",
  "Fresher Job",
  "Full-Time (FTE)",
  "Graduate Engineer Trainee",
  "Off-Campus Drive",
];

export interface JobOpportunity {
  id: string;
  role: string;
  company: string;
  type: JobType;
  compensation: string;
  location: string;
  tags: string[];
}

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

export interface JourneyState {
  journeyId: string | null;
  completedSteps: string[];
  appliedJobs: string[];
  savedCourses: string[];
}
