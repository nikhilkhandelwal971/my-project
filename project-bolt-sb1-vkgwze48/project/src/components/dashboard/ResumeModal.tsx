import {
  X,
  Printer,
  Download,
  GraduationCap,
  Target,
  Zap,
  CheckCircle2,
  Mail,
  GitBranch,
  Award,
  type LucideIcon,
} from "lucide-react";
import { OnboardingData, RoadmapStep } from "@/types";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  data: OnboardingData;
  roadmap: RoadmapStep[];
  completedSteps: string[];
  savedCourses: string[];
  appliedJobs: string[];
  avgCgpa: number;
  userEmail: string | null;
}

export function ResumeModal({
  open,
  onClose,
  data,
  roadmap,
  completedSteps,
  savedCourses,
  appliedJobs,
  avgCgpa,
  userEmail,
}: ResumeModalProps) {
  if (!open) return null;

  const completedStepsData = roadmap.filter((s) => completedSteps.includes(s.id));

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const text = buildResumeText(data, avgCgpa, completedStepsData, savedCourses, appliedJobs, userEmail);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4 no-print"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-hidden glass-strong rounded-3xl animate-scale-in shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06] shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white">Resume Preview</h3>
            <p className="text-sm text-gray-400">Auto-generated from your CareerPath profile</p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Printable resume body */}
        <div className="overflow-y-auto p-6">
          <div className="print-area bg-white text-gray-900 rounded-2xl p-8 shadow-xl">
            {/* Header */}
            <div className="border-b-2 border-violet-600 pb-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
              <p className="text-violet-600 font-medium mt-1">
                {data.degree} · {data.branch}
              </p>
              {userEmail && (
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Mail size={12} /> {userEmail}
                </p>
              )}
            </div>

            {/* Education */}
            <ResumeSection icon={GraduationCap} title="Education">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-800">{data.degree}, {data.branch}</span>
                <span className="text-gray-500">Semester {data.currentYear}</span>
              </div>
              {data.cgpaEntries.filter((e) => e.cgpa !== "").length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    CGPA: <span className="font-semibold text-gray-800">{avgCgpa.toFixed(2)}</span> / 10
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                    {data.cgpaEntries
                      .filter((e) => e.cgpa !== "")
                      .map((e) => (
                        <span key={e.id}>{e.label}: {e.cgpa}</span>
                      ))}
                  </div>
                </div>
              )}
              {data.targetCgpa && (
                <p className="text-sm text-gray-600 mt-1">Target CGPA: {data.targetCgpa}</p>
              )}
              {(data.boardPercentage || data.entranceExamRank) && (
                <div className="mt-2 flex flex-wrap gap-x-4 text-xs text-gray-500">
                  {data.boardPercentage && (
                    <span className="inline-flex items-center gap-1">
                      <Award size={11} /> 12th: {data.boardPercentage}
                    </span>
                  )}
                  {data.entranceExamRank && <span>Entrance Rank: {data.entranceExamRank}</span>}
                </div>
              )}
            </ResumeSection>

            {/* Career Goal */}
            <ResumeSection icon={Target} title="Career Objective">
              <p className="text-sm text-gray-700 leading-relaxed">
                Aspiring {data.careerGoal} with a strong academic foundation in {data.branch}.
                Seeking opportunities to apply technical skills and grow in a dynamic environment.
              </p>
            </ResumeSection>

            {/* Skills */}
            {data.skills.length > 0 && (
              <ResumeSection icon={Zap} title="Skills">
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200 rounded-md px-2.5 py-1"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </ResumeSection>
            )}

            {/* Roadmap achievements */}
            {completedStepsData.length > 0 && (
              <ResumeSection icon={CheckCircle2} title="Key Achievements & Milestones">
                <ul className="space-y-1.5">
                  {completedStepsData.map((step) => (
                    <li key={step.id} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-violet-600 font-bold mt-0.5">•</span>
                      <span>
                        <span className="font-medium text-gray-800">{step.title}</span>
                        {" — "}
                        {step.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>
            )}

            {/* Activity summary */}
            <ResumeSection icon={GitBranch} title="Activity Summary">
              <div className="grid grid-cols-3 gap-3">
                <SummaryStat label="Roadmap Steps Done" value={`${completedStepsData.length}`} />
                <SummaryStat label="Courses Saved" value={`${savedCourses.length}`} />
                <SummaryStat label="Jobs Applied" value={`${appliedJobs.length}`} />
              </div>
            </ResumeSection>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 p-5 border-t border-white/[0.06] shrink-0">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl py-3 transition-all hover:shadow-[0_0_20px_-4px_rgba(124,58,237,0.5)]"
          >
            <Printer size={18} /> Print / Save as PDF
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 glass text-gray-300 font-semibold rounded-xl px-5 py-3 transition-all hover:bg-white/10 hover:text-white"
          >
            <Download size={18} /> <span className="hidden sm:inline">.TXT</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ResumeSection({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wide flex items-center gap-2 mb-2.5">
        <Icon size={15} /> {title}
      </h2>
      {children}
    </section>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <div className="text-lg font-bold text-gray-800">{value}</div>
      <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{label}</div>
    </div>
  );
}

function buildResumeText(
  data: OnboardingData,
  avgCgpa: number,
  completedSteps: RoadmapStep[],
  savedCourses: string[],
  appliedJobs: string[],
  userEmail: string | null
): string {
  const lines: string[] = [];
  lines.push(`${data.name}`.toUpperCase());
  lines.push(`${data.degree}, ${data.branch}`);
  lines.push(`Semester ${data.currentYear}`);
  if (userEmail) lines.push(`Email: ${userEmail}`);
  lines.push("");
  lines.push("EDUCATION");
  lines.push("=".repeat(40));
  lines.push(`Degree: ${data.degree}, ${data.branch}`);
  lines.push(`Current Semester: ${data.currentYear}`);
  lines.push(`Average CGPA: ${avgCgpa.toFixed(2)} / 10`);
  if (data.targetCgpa) lines.push(`Target CGPA: ${data.targetCgpa}`);
  const validCgpas = data.cgpaEntries.filter((e) => e.cgpa !== "");
  if (validCgpas.length > 0) {
    lines.push("Semester-wise CGPA:");
    validCgpas.forEach((e) => lines.push(`  ${e.label}: ${e.cgpa}`));
  }
  if (data.boardPercentage) lines.push(`12th Board: ${data.boardPercentage}`);
  if (data.entranceExamRank) lines.push(`Entrance Exam Rank: ${data.entranceExamRank}`);
  lines.push("");
  lines.push("CAREER OBJECTIVE");
  lines.push("=".repeat(40));
  lines.push(`Aspiring ${data.careerGoal} with a strong academic foundation in ${data.branch}.`);
  lines.push("Seeking opportunities to apply technical skills and grow in a dynamic environment.");
  lines.push("");
  if (data.skills.length > 0) {
    lines.push("SKILLS");
    lines.push("=".repeat(40));
    lines.push(data.skills.map((s) => s.name).join(", "));
    lines.push("");
  }
  if (completedSteps.length > 0) {
    lines.push("KEY ACHIEVEMENTS & MILESTONES");
    lines.push("=".repeat(40));
    completedSteps.forEach((s) => {
      lines.push(`• ${s.title}`);
      lines.push(`  ${s.description}`);
    });
    lines.push("");
  }
  lines.push("ACTIVITY SUMMARY");
  lines.push("=".repeat(40));
  lines.push(`Roadmap Steps Completed: ${completedSteps.length}`);
  lines.push(`Courses Saved: ${savedCourses.length}`);
  lines.push(`Jobs Applied: ${appliedJobs.length}`);
  lines.push("");
  lines.push("---");
  lines.push("Generated by CareerPath AI");
  return lines.join("\n");
}
