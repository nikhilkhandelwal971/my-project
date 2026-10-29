import {
  GitBranch,
  TrendingUp,
  Briefcase,
  Layers,
  Wrench,
  BadgeCheck,
  IndianRupee,
  Rocket,
  Building2,
  Compass,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { BranchInsight as BranchInsightType } from "@/data/branchInsights";

interface BranchInsightsProps {
  insight: BranchInsightType;
}

const demandStyles: Record<string, string> = {
  "Very High": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  High: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  Moderate: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Emerging: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
};

const trendStyles: Record<string, string> = {
  Explosive: "text-fuchsia-400",
  "Very High": "text-emerald-400",
  High: "text-cyan-400",
  "Stable & Growing": "text-emerald-400",
  Stable: "text-amber-400",
};

export function BranchInsights({ insight }: BranchInsightsProps) {
  const trendColor = trendStyles[insight.growthTrend] ?? "text-gray-300";

  return (
    <div className="glass-strong rounded-2xl p-6 sm:p-7 animate-fade-in-up stagger-2 relative overflow-hidden">
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-start gap-3 mb-5">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <GitBranch size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-bold text-white">{insight.branch} Branch Insights</h3>
            <span className="text-xs font-semibold rounded-lg px-2 py-0.5 border border-white/10 bg-white/5 inline-flex items-center gap-1">
              <TrendingUp size={12} />
              <span className={trendColor}>{insight.growthTrend}</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">{insight.tagline}</p>
        </div>
      </div>

      {/* Description + outlook */}
      <p className="relative text-sm text-gray-300 leading-relaxed mb-4">{insight.description}</p>
      <div className="relative glass rounded-xl p-4 mb-6 border border-violet-500/15">
        <p className="text-xs font-semibold text-violet-300 flex items-center gap-1.5 mb-1.5">
          <Rocket size={14} /> Future Growth Outlook
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">{insight.futureOutlook}</p>
      </div>

      {/* Salary stats */}
      <div className="relative grid grid-cols-3 gap-3 mb-6">
        <SalaryStat label="Fresher" value={insight.salaryRange.fresher} />
        <SalaryStat label="Mid-level" value={insight.salaryRange.mid} />
        <SalaryStat label="Senior" value={insight.salaryRange.senior} />
      </div>

      {/* Career paths */}
      <section className="relative mb-6">
        <SectionTitle icon={Compass} text="Top Career Paths" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {insight.careerPaths.map((path) => (
            <div
              key={path.title}
              className="glass rounded-xl p-4 hover:bg-white/[0.07] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h5 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                  {path.title}
                </h5>
                <span className={`text-[10px] font-semibold uppercase tracking-wide rounded-md px-2 py-0.5 border shrink-0 ${demandStyles[path.demand] ?? "bg-white/5 text-gray-400 border-white/10"}`}>
                  {path.demand}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{path.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* High-demand roles */}
      <section className="relative mb-6">
        <SectionTitle icon={Briefcase} text="High-Demand Core & Tech Roles" />
        <div className="flex flex-wrap gap-2 mt-3">
          {insight.highDemandRoles.map((role) => (
            <span
              key={role}
              className="text-xs rounded-lg px-2.5 py-1.5 font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20"
            >
              {role}
            </span>
          ))}
        </div>
      </section>

      {/* Core domains + tools grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <InsightBlock icon={Layers} title="Core Domains" items={insight.coreDomains} chipClass="bg-cyan-500/10 text-cyan-300 border-cyan-500/20" />
        <InsightBlock icon={Wrench} title="Essential Tools to Learn" items={insight.essentialTools} chipClass="bg-amber-500/10 text-amber-300 border-amber-500/20" />
      </div>

      {/* Certifications + recruiters grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
        <InsightBlock icon={BadgeCheck} title="Recommended Certifications" items={insight.certifications} chipClass="bg-emerald-500/10 text-emerald-300 border-emerald-500/20" />
        <div>
          <SectionTitle icon={Building2} text="Top Recruiters" />
          <div className="flex flex-wrap gap-2 mt-3">
            {insight.topRecruiters.map((recruiter) => (
              <span
                key={recruiter}
                className="text-xs rounded-lg px-2.5 py-1.5 font-medium bg-white/5 text-gray-300 border border-white/10 inline-flex items-center gap-1"
              >
                <ArrowUpRight size={12} className="text-gray-500" />
                {recruiter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SalaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3.5 text-center">
      <IndianRupee size={15} className="text-emerald-400 mx-auto mb-1" />
      <div className="text-sm font-bold text-white leading-tight">{value}</div>
      <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{label}</div>
    </div>
  );
}

function SectionTitle({ icon: Icon, text }: { icon: typeof Sparkles; text: string }) {
  return (
    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
      <Icon size={16} className="text-gray-400" />
      {text}
    </h4>
  );
}

function InsightBlock({
  icon: Icon,
  title,
  items,
  chipClass,
}: {
  icon: typeof Sparkles;
  title: string;
  items: string[];
  chipClass: string;
}) {
  return (
    <div>
      <SectionTitle icon={Icon} text={title} />
      <div className="flex flex-wrap gap-2 mt-3">
        {items.map((item) => (
          <span
            key={item}
            className={`text-xs rounded-lg border px-2.5 py-1.5 font-medium ${chipClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
