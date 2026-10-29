import { useState } from "react";
import { MapPin, ExternalLink, Briefcase, Building2, CheckCircle2 } from "lucide-react";
import { JobOpportunity, JobType } from "@/types";

interface OpportunitiesHubProps {
  jobs: JobOpportunity[];
  appliedJobs: string[];
  onToggleApply: (jobId: string) => void;
}

type Filter = "all" | JobType;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Internship", label: "Internships" },
  { key: "Fresher Job", label: "Fresher Jobs" },
  { key: "Full-Time (FTE)", label: "Full-Time (FTE)" },
  { key: "Graduate Engineer Trainee", label: "GET" },
  { key: "Off-Campus Drive", label: "Off-Campus" },
];

const typeStyles: Record<JobType, string> = {
  Internship: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
  "Fresher Job": "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  "Full-Time (FTE)": "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  "Graduate Engineer Trainee": "bg-violet-500/15 text-violet-400 border border-violet-500/20",
  "Off-Campus Drive": "bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/20",
};

export function OpportunitiesHub({ jobs, appliedJobs, onToggleApply }: OpportunitiesHubProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.type === filter);

  // Only show filter chips for types that actually exist in the current job set
  const availableTypes = new Set(jobs.map((j) => j.type));
  const visibleFilters = FILTERS.filter((f) => f.key === "all" || availableTypes.has(f.key));

  return (
    <div className="glass-strong rounded-2xl p-6 animate-fade-in-up stagger-3">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">Opportunities Hub</h3>
          <p className="text-sm text-gray-400">Internships, FTE, GET & off-campus drives matched to you</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {visibleFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`text-xs font-medium rounded-lg px-3 py-1.5 transition-all ${
                filter === f.key
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-sm text-gray-400">No opportunities in this category right now.</p>
          <p className="text-xs text-gray-500 mt-1">Try a different filter or check back as new drives open.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job, i) => {
            const isApplied = appliedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                className="glass rounded-xl p-5 hover:bg-white/[0.07] hover:border-violet-500/20 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">{job.role}</h4>
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-0.5">
                      <Building2 size={14} />
                      {job.company}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide rounded-lg px-2 py-1 ${typeStyles[job.type] ?? "bg-white/5 text-gray-400 border border-white/10"}`}
                  >
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={14} className="text-gray-500" />
                    {job.compensation}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-500" />
                    {job.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/10 text-gray-400 rounded-md px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onToggleApply(job.id)}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isApplied
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-violet-500/20 hover:scale-[1.01]"
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={16} /> Applied
                    </>
                  ) : (
                    <>
                      Apply Now <ExternalLink size={14} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
