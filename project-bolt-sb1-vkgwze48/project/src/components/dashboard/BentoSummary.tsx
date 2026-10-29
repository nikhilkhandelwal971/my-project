import {
  GraduationCap,
  Target,
  Zap,
  GitBranch,
  Award,
  TrendingUp,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { OnboardingData, RoadmapStep } from "@/types";
import { ProgressRing } from "@/components/ui/ProgressRing";

interface BentoSummaryProps {
  data: OnboardingData;
  roadmap: RoadmapStep[];
  completedSteps: string[];
  appliedJobs: string[];
  savedCourses: string[];
  avgCgpa: number;
}

export function BentoSummary({
  data,
  roadmap,
  completedSteps,
  appliedJobs,
  savedCourses,
  avgCgpa,
}: BentoSummaryProps) {
  const completedCount = roadmap.filter((s) => completedSteps.includes(s.id)).length;
  const progress = roadmap.length > 0 ? Math.round((completedCount / roadmap.length) * 100) : 0;

  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in-up">
      {/* Profile card — spans 2 cols on mobile, 2 on desktop */}
      <div className="col-span-2 lg:col-span-2 gradient-border-violet rounded-2xl p-5 sm:p-6 relative overflow-hidden group">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/12 blur-3xl group-hover:bg-violet-500/18 transition-all duration-500" />
        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shrink-0 neon-glow-violet">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400">Welcome back,</p>
            <h1 className="text-2xl font-bold text-white truncate">{data.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <GitBranch size={11} className="text-violet-300" /> {data.branch}
              </span>
              <span className="text-gray-600">·</span>
              <span>Sem {data.currentYear}</span>
              {(data.boardPercentage || data.entranceExamRank) && (
                <>
                  <span className="text-gray-600">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Award size={11} className="text-amber-400" />
                    {data.entranceExamRank || data.boardPercentage}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-2">
          <span className="neon-tag-violet">{data.degree}</span>
          <span className="neon-tag-cyan">Goal: {data.careerGoal}</span>
          <span className="neon-tag-amber">{data.skills.length} Skills</span>
        </div>
      </div>

      {/* CGPA ring card */}
      <BentoKpi
        icon={GraduationCap}
        label="Avg CGPA"
        value={avgCgpa.toFixed(2)}
        subtext={data.targetCgpa ? `Target: ${data.targetCgpa}` : "Set a target"}
        color="text-cyan-400"
        accent="from-cyan-500/15 to-cyan-500/5"
        iconBg="bg-cyan-500/15"
      />

      {/* Progress ring card */}
      <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center glass-hover relative overflow-hidden">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-emerald-500/8 blur-2xl" />
        <ProgressRing percentage={progress} size={88} strokeWidth={6} label="Roadmap" />
        <p className="text-xs text-gray-500 mt-2">{completedCount}/{roadmap.length} steps done</p>
      </div>

      {/* Secondary KPIs row */}
      <BentoKpi
        icon={TrendingUp}
        label="Courses Saved"
        value={`${savedCourses.length}`}
        subtext="Bookmarked"
        color="text-fuchsia-400"
        accent="from-fuchsia-500/12 to-fuchsia-500/5"
        iconBg="bg-fuchsia-500/15"
      />
      <BentoKpi
        icon={Target}
        label="Jobs Applied"
        value={`${appliedJobs.length}`}
        subtext="Opportunities"
        color="text-amber-400"
        accent="from-amber-500/12 to-amber-500/5"
        iconBg="bg-amber-500/15"
      />
      <BentoKpi
        icon={Zap}
        label="Skills"
        value={`${data.skills.length}`}
        subtext="In your toolkit"
        color="text-violet-400"
        accent="from-violet-500/12 to-violet-500/5"
        iconBg="bg-violet-500/15"
      />
      <BentoKpi
        icon={Rocket}
        label="Career Goal"
        value={data.careerGoal}
        subtext="Your target"
        color="text-emerald-400"
        accent="from-emerald-500/12 to-emerald-500/5"
        iconBg="bg-emerald-500/15"
        truncate
      />
    </div>
  );
}

function BentoKpi({
  icon: Icon,
  label,
  value,
  subtext,
  color,
  accent,
  iconBg,
  truncate,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext: string;
  color: string;
  accent: string;
  iconBg: string;
  truncate?: boolean;
}) {
  return (
    <div className={`glass rounded-2xl p-5 glass-hover relative overflow-hidden bg-gradient-to-br ${accent}`}>
      <div className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
        <Icon size={18} className={color} />
      </div>
      <div className="text-2xl font-bold text-white leading-tight">
        <span className={truncate ? "block truncate" : ""}>{value}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      <div className="text-[10px] text-gray-600 mt-0.5">{subtext}</div>
    </div>
  );
}
