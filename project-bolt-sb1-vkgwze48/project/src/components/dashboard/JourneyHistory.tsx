import {
  CheckCircle2,
  Briefcase,
  BookmarkCheck,
  Trophy,
  GraduationCap,
  Target,
  Zap,
  TrendingUp,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { OnboardingData, RoadmapStep } from "@/types";
import { ProgressRing } from "@/components/ui/ProgressRing";

interface JourneyHistoryProps {
  data: OnboardingData;
  roadmap: RoadmapStep[];
  completedSteps: string[];
  appliedJobs: string[];
  savedCourses: string[];
  createdAt: string;
}

export function JourneyHistory({
  data,
  roadmap,
  completedSteps,
  appliedJobs,
  savedCourses,
  createdAt,
}: JourneyHistoryProps) {
  const totalSteps = roadmap.length;
  const stepsCompleted = completedSteps.length;
  const progressPct = totalSteps > 0 ? Math.round((stepsCompleted / totalSteps) * 100) : 0;

  const validCgpas = data.cgpaEntries.filter((e) => e.cgpa !== "");
  const avgCgpa = validCgpas.length > 0
    ? validCgpas.reduce((a, e) => a + parseFloat(e.cgpa), 0) / validCgpas.length
    : 0;

  const events: { icon: LucideIcon; label: string; detail: string; color: string }[] = [];

  events.push({
    icon: GraduationCap,
    label: "Profile Created",
    detail: `${data.name} started the journey toward ${data.careerGoal}`,
    color: "text-violet-400",
  });

  if (validCgpas.length > 0) {
    events.push({
      icon: TrendingUp,
      label: "Academic Record Added",
      detail: `${validCgpas.length} semesters logged · Avg CGPA ${avgCgpa.toFixed(2)}`,
      color: "text-cyan-400",
    });
  }

  if (data.skills.length > 0) {
    events.push({
      icon: Zap,
      label: "Skills Declared",
      detail: `${data.skills.length} skills: ${data.skills.map((s) => s.name).join(", ")}`,
      color: "text-amber-400",
    });
  }

  events.push({
    icon: Target,
    label: "Career Goal Set",
    detail: `Targeting: ${data.careerGoal}`,
    color: "text-fuchsia-400",
  });

  if (stepsCompleted > 0) {
    events.push({
      icon: CheckCircle2,
      label: "Roadmap Progress",
      detail: `${stepsCompleted} of ${totalSteps} steps completed (${progressPct}%)`,
      color: "text-emerald-400",
    });
  }

  if (appliedJobs.length > 0) {
    events.push({
      icon: Briefcase,
      label: "Jobs Applied",
      detail: `Applied to ${appliedJobs.length} opportunit${appliedJobs.length === 1 ? "y" : "ies"}`,
      color: "text-cyan-400",
    });
  }

  if (savedCourses.length > 0) {
    events.push({
      icon: BookmarkCheck,
      label: "Courses Saved",
      detail: `Bookmarked ${savedCourses.length} course${savedCourses.length === 1 ? "" : "s"} for later`,
      color: "text-red-400",
    });
  }

  return (
    <div className="glass-strong rounded-2xl p-6 animate-fade-in-up">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy size={20} className="text-amber-400" />
          My Journey
        </h3>
        <p className="text-sm text-gray-400">A record of everything you've done so far</p>
      </div>

      {/* Overall progress with circular ring */}
      <div className="glass rounded-xl p-5 mb-6 flex items-center gap-6 flex-wrap">
        <div className="shrink-0">
          <ProgressRing
            percentage={progressPct}
            size={110}
            strokeWidth={8}
            label="Progress"
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <div className="grid grid-cols-3 gap-3">
            <Metric label="Steps Done" value={`${stepsCompleted}/${totalSteps}`} />
            <Metric label="Jobs Applied" value={`${appliedJobs.length}`} />
            <Metric label="Courses Saved" value={`${savedCourses.length}`} />
          </div>
        </div>
      </div>

      {/* Timeline of events */}
      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-violet-500/40 via-indigo-500/20 to-transparent" />

        <div className="space-y-4">
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <div
                key={i}
                className="relative flex gap-3.5 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative z-10 shrink-0 mt-0.5">
                  <div className="h-8 w-8 rounded-lg glass flex items-center justify-center">
                    <Icon size={16} className={event.color} />
                  </div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{event.label}</h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{event.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-gray-500">
        <Calendar size={12} />
        Journey started on {new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center glass rounded-lg py-2.5 glass-hover">
      <div className="text-sm font-bold text-white">{value}</div>
      <div className="text-[10px] text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}
