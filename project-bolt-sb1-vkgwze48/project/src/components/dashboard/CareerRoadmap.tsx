import { useState } from "react";
import {
  Code,
  BrainCircuit,
  Rocket,
  Briefcase,
  Target,
  Layers,
  Server,
  Lightbulb,
  Users,
  ClipboardList,
  BarChart,
  Compass,
  Hammer,
  Network,
  Trophy,
  CheckCircle2,
  Circle,
  Clock,
  Loader,
  type LucideIcon,
} from "lucide-react";
import { RoadmapStep } from "@/types";
import { ConfettiBurst } from "@/components/ui/Confetti";
import { EmptyState } from "@/components/ui/EmptyState";

const iconMap: Record<string, LucideIcon> = {
  Code,
  BrainCircuit,
  Rocket,
  Briefcase,
  Target,
  Layers,
  Server,
  Lightbulb,
  Users,
  ClipboardList,
  BarChart,
  Compass,
  Hammer,
  Network,
  Trophy,
};

interface CareerRoadmapProps {
  steps: RoadmapStep[];
  completedSteps: string[];
  onToggleStep: (stepId: string) => void;
}

export function CareerRoadmap({ steps, completedSteps, onToggleStep }: CareerRoadmapProps) {
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [confettiStep, setConfettiStep] = useState<string | null>(null);

  const completedCount = steps.filter((s) => completedSteps.includes(s.id)).length;
  const progress = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  const inProgressIndex = steps.findIndex((s) => !completedSteps.includes(s.id));

  const getStepStatus = (index: number): "completed" | "in-progress" | "upcoming" => {
    if (completedSteps.includes(steps[index].id)) return "completed";
    if (index === inProgressIndex) return "in-progress";
    return "upcoming";
  };

  const handleToggle = (stepId: string) => {
    const wasAlreadyDone = completedSteps.includes(stepId);
    onToggleStep(stepId);
    if (!wasAlreadyDone) {
      setConfettiStep(stepId);
      setConfettiTrigger((t) => t + 1);
      setTimeout(() => setConfettiStep(null), 1000);
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-6 animate-fade-in-up stagger-2">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-white">Your Career Roadmap</h3>
          <span className="text-sm font-bold text-gradient">{progress}%</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">A step-by-step plan tailored to your goal</p>
          <span className="text-xs text-gray-500">{completedCount}/{steps.length} done</span>
        </div>
        {/* Multi-segment glowing progress bar */}
        <div className="mt-3 flex gap-1 h-1.5">
          {steps.map((step, i) => {
            const isDone = completedSteps.includes(step.id);
            return (
              <div key={step.id} className="flex-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isDone
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-400 neon-glow-emerald"
                      : i === 0
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                      : "bg-transparent"
                  }`}
                  style={{
                    width: isDone ? "100%" : "0%",
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {steps.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No roadmap steps yet"
          description="Complete your onboarding to generate a personalized career roadmap."
        />
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-violet-500/40 via-indigo-500/20 to-transparent" />

          <div className="space-y-5">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon] || Target;
              const isDone = completedSteps.includes(step.id);
              const status = getStepStatus(i);
              return (
                <div
                  key={step.id}
                  className="relative flex gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isDone
                          ? "bg-emerald-500/20 border-emerald-500/40 neon-glow-emerald"
                          : status === "in-progress"
                          ? "bg-gradient-to-br from-amber-500/80 to-orange-600/80 border-amber-500/30 shadow-lg shadow-amber-500/20 animate-pulse-glow"
                          : "bg-gradient-to-br from-violet-600/60 to-indigo-600/60 border-white/10"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={18} className="text-emerald-400 animate-checkmark" key={step.id} />
                      ) : status === "in-progress" ? (
                        <Loader size={18} className="text-white animate-spin-slow" />
                      ) : (
                        <Icon size={18} className="text-white" />
                      )}
                    </div>
                    {confettiStep === step.id && (
                      <ConfettiBurst trigger={confettiTrigger} origin="center" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 glass rounded-xl p-4 glass-hover group ${status === "in-progress" ? "border-amber-500/20" : ""}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono text-violet-400 uppercase tracking-wide">{step.phase}</span>
                          {status === "completed" && (
                            <span className="neon-tag-emerald">Completed</span>
                          )}
                          {status === "in-progress" && (
                            <span className="neon-tag-amber">In Progress</span>
                          )}
                          {status === "upcoming" && (
                            <span className="neon-tag-neutral">Upcoming</span>
                          )}
                        </div>
                        <h4 className={`text-base font-bold mt-0.5 transition-colors ${isDone ? "text-gray-500 line-through" : status === "in-progress" ? "text-white" : "text-gray-300"}`}>
                          {step.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleToggle(step.id)}
                        className={`shrink-0 flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 transition-all duration-300 ${
                          isDone
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/5 text-gray-400 border border-white/[0.08] hover:text-violet-300 hover:border-violet-500/30 hover:bg-violet-500/10"
                        }`}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 size={14} className="animate-checkmark" /> Done
                          </>
                        ) : (
                          <>
                            <Circle size={14} /> Mark Done
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{step.description}</p>
                    <div className="space-y-2">
                      {step.tasks.map((task, ti) => (
                        <div key={ti} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 size={16} className="text-cyan-400/80 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
