import { useState } from "react";
import {
  Briefcase,
  BookmarkCheck,
  FileText,
  TrendingUp,
  X,
  ExternalLink,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface QuickActionsProps {
  savedCoursesCount: number;
  appliedJobsCount: number;
  completedStepsCount: number;
  totalSteps: number;
  careerGoal: string;
  avgCgpa: string;
  userName: string;
  onResume: () => void;
}

interface DrawerItem {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

export function QuickActions({
  savedCoursesCount,
  appliedJobsCount,
  completedStepsCount,
  totalSteps,
  careerGoal,
  avgCgpa,
  userName,
  onResume,
}: QuickActionsProps) {
  const [open, setOpen] = useState(false);
  const progressPct = totalSteps > 0 ? Math.round((completedStepsCount / totalSteps) * 100) : 0;

  const items: DrawerItem[] = [
    { icon: TrendingUp, label: "Avg CGPA", value: avgCgpa, color: "text-cyan-400" },
    { icon: FileText, label: "Career Goal", value: careerGoal, color: "text-violet-400" },
    { icon: CheckCircle2, label: "Roadmap Progress", value: `${progressPct}%`, color: "text-emerald-400" },
    { icon: BookmarkCheck, label: "Saved Courses", value: `${savedCoursesCount}`, color: "text-fuchsia-400" },
    { icon: Briefcase, label: "Jobs Applied", value: `${appliedJobsCount}`, color: "text-amber-400" },
  ];

  return (
    <>
      {/* Floating bottom bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-fade-in-up">
        <div className="glass-strong rounded-2xl px-3 py-2.5 flex items-center gap-1.5 shadow-2xl shadow-black/40 neon-glow-violet">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 px-3"
          >
            {items.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-1.5 px-1">
                  <Icon size={15} className={item.color} />
                  <span className="text-xs font-semibold text-white">{item.value}</span>
                </div>
              );
            })}
          </button>
          <div className="w-px h-6 bg-white/10" />
          <button
            onClick={onResume}
            className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl px-4 py-2 text-xs font-semibold hover:shadow-[0_0_20px_-4px_rgba(124,58,237,0.5)] transition-all"
          >
            <FileText size={14} />
            Resume
          </button>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 glass text-gray-300 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Quick View</span>
          </button>
        </div>
      </div>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg glass-strong rounded-t-3xl p-6 animate-fade-in-up shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Quick Overview</h3>
                <p className="text-sm text-gray-400">Your career snapshot, {userName}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="glass rounded-xl p-4 flex items-center gap-3 glass-hover">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Icon size={20} className={item.color} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</div>
                      <div className="text-sm font-bold text-white truncate">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-full mt-5 btn-primary flex items-center justify-center gap-2"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
}
