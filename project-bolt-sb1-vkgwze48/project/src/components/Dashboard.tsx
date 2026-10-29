import { RotateCcw, LogOut, ChevronDown, FileText, type LucideIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";
import { CgpaChart } from "@/components/dashboard/CgpaChart";
import { CareerRoadmap } from "@/components/dashboard/CareerRoadmap";
import { OpportunitiesHub } from "@/components/dashboard/OpportunitiesHub";
import { CourseRecommendations } from "@/components/dashboard/CourseRecommendations";
import { JourneyHistory } from "@/components/dashboard/JourneyHistory";
import { BranchInsights } from "@/components/dashboard/BranchInsights";
import { BentoSummary } from "@/components/dashboard/BentoSummary";
import { TabNav, type TabKey } from "@/components/dashboard/TabNav";
import { ResumeModal } from "@/components/dashboard/ResumeModal";
import { QuickActions } from "@/components/ui/QuickActions";
import { SkeletonCard, SkeletonGrid } from "@/components/ui/Skeleton";
import { getCareerRoadmap, getJobOpportunities } from "@/data/careerRoadmaps";
import { getRecommendedCourses } from "@/data/courses";
import { getBranchInsight } from "@/data/branchInsights";
import { OnboardingData, JourneyState } from "@/types";

interface DashboardProps {
  data: OnboardingData;
  journey: JourneyState;
  createdAt: string;
  userEmail: string | null;
  onToggleStep: (stepId: string) => void;
  onToggleApply: (jobId: string) => void;
  onToggleSaveCourse: (courseId: string) => void;
  onReset: () => void;
  onSignOut: () => void;
}

export function Dashboard({
  data,
  journey,
  createdAt,
  userEmail,
  onToggleStep,
  onToggleApply,
  onToggleSaveCourse,
  onReset,
  onSignOut,
}: DashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [resumeOpen, setResumeOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const roadmap = getCareerRoadmap(data.careerGoal, data.branch, data.currentYear);
  const jobs = getJobOpportunities(data.careerGoal, data.branch, data.currentYear);
  const courses = getRecommendedCourses(
    data.careerGoal,
    data.skills.map((s) => s.name),
    data.branch,
    data.currentYear
  );
  const branchInsight = getBranchInsight(data.branch);
  const validCgpas = data.cgpaEntries.filter((e) => e.cgpa !== "");
  const avgCgpa = validCgpas.length > 0
    ? validCgpas.reduce((a, e) => a + parseFloat(e.cgpa), 0) / validCgpas.length
    : data.targetCgpa != null && data.targetCgpa !== "" && !isNaN(parseFloat(data.targetCgpa))
    ? parseFloat(data.targetCgpa)
    : 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-white/[0.06] backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-xl px-4 py-2 transition-all hover:border-violet-500/40 hover:shadow-[0_0_15px_-4px_rgba(124,58,237,0.4)]"
            >
              <FileText size={15} className="text-violet-400" />
              <span className="hidden sm:inline">Resume</span>
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white glass rounded-xl px-4 py-2 transition-all hover:bg-white/10"
            >
              <RotateCcw size={15} />
              <span className="hidden sm:inline">Start Over</span>
            </button>

            {/* User menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 glass rounded-xl pl-2 pr-3 py-1.5 transition-all hover:bg-white/10"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {initials}
                </div>
                <span className="hidden sm:inline text-sm text-gray-300 max-w-[140px] truncate">{data.name}</span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-xl p-2 shadow-2xl shadow-black/40 animate-scale-in origin-top-right">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-sm font-medium text-white truncate">{data.name}</p>
                    {userEmail && <p className="text-xs text-gray-500 truncate">{userEmail}</p>}
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setResumeOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <FileText size={15} /> View Resume
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onReset();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <RotateCcw size={15} /> Start Over
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sticky tab navigation */}
      <TabNav active={activeTab} onChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">
        {showSkeleton ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Bento summary — always visible */}
            <BentoSummary
              data={data}
              roadmap={roadmap}
              completedSteps={journey.completedSteps}
              appliedJobs={journey.appliedJobs}
              savedCourses={journey.savedCourses}
              avgCgpa={avgCgpa}
            />

            {/* Tab content */}
            <div key={activeTab} className="animate-fade-in-up">
              {activeTab === "overview" && (
                <OverviewTab
                  data={data}
                  journey={journey}
                  roadmap={roadmap}
                  jobs={jobs}
                  onToggleStep={onToggleStep}
                />
              )}
              {activeTab === "branch" && <BranchInsights insight={branchInsight} />}
              {activeTab === "roadmap" && (
                <RoadmapTab
                  data={data}
                  journey={journey}
                  roadmap={roadmap}
                  onToggleStep={onToggleStep}
                />
              )}
              {activeTab === "courses" && (
                <CourseRecommendations
                  courses={courses}
                  savedCourses={journey.savedCourses}
                  onToggleSave={onToggleSaveCourse}
                />
              )}
              {activeTab === "opportunities" && (
                <OpportunitiesHub
                  jobs={jobs}
                  appliedJobs={journey.appliedJobs}
                  onToggleApply={onToggleApply}
                />
              )}
              {activeTab === "journey" && (
                <JourneyHistory
                  data={data}
                  roadmap={roadmap}
                  completedSteps={journey.completedSteps}
                  appliedJobs={journey.appliedJobs}
                  savedCourses={journey.savedCourses}
                  createdAt={createdAt}
                />
              )}
            </div>

            <footer className="text-center py-6">
              <p className="text-xs text-gray-600">
                CareerPath AI · Your personalized career counselor
              </p>
            </footer>
          </>
        )}
      </main>

      {/* Floating quick-action toolbar */}
      <QuickActions
        savedCoursesCount={journey.savedCourses.length}
        appliedJobsCount={journey.appliedJobs.length}
        completedStepsCount={journey.completedSteps.length}
        totalSteps={roadmap.length}
        careerGoal={data.careerGoal}
        avgCgpa={avgCgpa.toFixed(2)}
        userName={data.name}
        onResume={() => setResumeOpen(true)}
      />

      {/* Resume modal */}
      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        data={data}
        roadmap={roadmap}
        completedSteps={journey.completedSteps}
        savedCourses={journey.savedCourses}
        appliedJobs={journey.appliedJobs}
        avgCgpa={avgCgpa}
        userEmail={userEmail}
      />
    </div>
  );
}

function OverviewTab({
  data,
  journey,
  roadmap,
  jobs,
  onToggleStep,
}: {
  data: OnboardingData;
  journey: JourneyState;
  roadmap: ReturnType<typeof getCareerRoadmap>;
  jobs: ReturnType<typeof getJobOpportunities>;
  onToggleStep: (stepId: string) => void;
}) {
  return (
    <>
      <CgpaChart entries={data.cgpaEntries} targetCgpa={data.targetCgpa} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CareerRoadmap
            steps={roadmap.slice(0, 4)}
            completedSteps={journey.completedSteps}
            onToggleStep={onToggleStep}
          />
        </div>
        <div className="space-y-6">
          <SkillsCard data={data} />
          <QuickStatsCard
            roadmapCount={roadmap.length}
            jobsCount={jobs.length}
            completedCount={journey.completedSteps.length}
            savedCoursesCount={journey.savedCourses.length}
          />
        </div>
      </div>
    </>
  );
}

function RoadmapTab({
  data,
  journey,
  roadmap,
  onToggleStep,
}: {
  data: OnboardingData;
  journey: JourneyState;
  roadmap: ReturnType<typeof getCareerRoadmap>;
  onToggleStep: (stepId: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <CareerRoadmap
          steps={roadmap}
          completedSteps={journey.completedSteps}
          onToggleStep={onToggleStep}
        />
      </div>
      <div className="space-y-6">
        <SkillsCard data={data} />
        <QuickStatsCard
          roadmapCount={roadmap.length}
          jobsCount={0}
          completedCount={journey.completedSteps.length}
          savedCoursesCount={journey.savedCourses.length}
        />
      </div>
    </div>
  );
}

function SkillsCard({ data }: { data: OnboardingData }) {
  return (
    <div className="glass-strong rounded-2xl p-6 animate-fade-in-up stagger-2">
      <h3 className="text-lg font-bold text-white mb-1">Your Skills</h3>
      <p className="text-sm text-gray-400 mb-4">What you bring to the table</p>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, i) => (
          <span
            key={skill.id}
            className="tag-chip animate-scale-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuickStatsCard({
  roadmapCount,
  jobsCount,
  completedCount,
  savedCoursesCount,
}: {
  roadmapCount: number;
  jobsCount: number;
  completedCount: number;
  savedCoursesCount: number;
}) {
  return (
    <div className="glass-strong rounded-2xl p-6 animate-fade-in-up stagger-3">
      <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
      <div className="space-y-3">
        <QuickStat label="Roadmap Steps" value={`${roadmapCount}`} />
        <QuickStat label="Steps Completed" value={`${completedCount}`} />
        {jobsCount > 0 && <QuickStat label="Matched Opportunities" value={`${jobsCount}`} />}
        <QuickStat label="Courses Saved" value={`${savedCoursesCount}`} />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in">
        <div className="col-span-2 glass-strong rounded-2xl p-6">
          <div className="h-14 w-14 bg-white/[0.06] rounded-2xl animate-shimmer mb-3" />
          <div className="h-4 w-24 bg-white/[0.06] rounded-lg animate-shimmer mb-2" />
          <div className="h-7 w-40 bg-white/[0.08] rounded-xl animate-shimmer" />
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="glass-strong rounded-2xl p-5">
            <div className="h-10 w-10 bg-white/[0.06] rounded-xl animate-shimmer mb-3" />
            <div className="h-6 w-16 bg-white/[0.08] rounded-lg animate-shimmer mb-2" />
            <div className="h-3 w-20 bg-white/[0.04] rounded-lg animate-shimmer" />
          </div>
        ))}
      </div>
      <SkeletonCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><SkeletonCard /></div>
        <div className="space-y-6"><SkeletonCard /><SkeletonCard /></div>
      </div>
      <SkeletonGrid count={3} />
    </>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}
