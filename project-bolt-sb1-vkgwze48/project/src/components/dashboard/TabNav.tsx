import {
  LayoutDashboard,
  GitBranch,
  Map,
  BookOpen,
  Briefcase,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export type TabKey =
  | "overview"
  | "branch"
  | "roadmap"
  | "courses"
  | "opportunities"
  | "journey";

interface TabDef {
  key: TabKey;
  label: string;
  icon: LucideIcon;
}

const TABS: TabDef[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "branch", label: "Branch Insights", icon: GitBranch },
  { key: "roadmap", label: "Career Roadmap", icon: Map },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "opportunities", label: "Opportunities", icon: Briefcase },
  { key: "journey", label: "My Journey", icon: Trophy },
];

interface TabNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <div className="sticky top-16 z-30 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 bg-[#08080c]/80 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_18px_-5px_rgba(124,58,237,0.5)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={15} className={isActive ? "text-white" : "text-gray-500"} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
