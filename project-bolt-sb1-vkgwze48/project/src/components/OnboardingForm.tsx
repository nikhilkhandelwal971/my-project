import { useState } from "react";
import {
  User,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  Trash2,
  Target,
  GitBranch,
  Award,
  SkipForward,
} from "lucide-react";
import { TagInput } from "@/components/ui/TagInput";
import { Logo } from "@/components/ui/Logo";
import {
  OnboardingData,
  CgpaEntry,
  SkillTag,
  EngineeringBranch,
  ENGINEERING_BRANCHES,
} from "@/types";

const CAREER_SUGGESTIONS: Record<EngineeringBranch, string[]> = {
  CSE: ["Full Stack Developer", "Software Engineer", "Backend Developer", "DevOps Engineer", "Cybersecurity Analyst"],
  AIML: ["Machine Learning Engineer", "Data Scientist", "AI Researcher", "NLP Engineer", "MLOps Engineer"],
  "Data Science": ["Data Scientist", "Data Analyst", "Business Analyst", "Data Engineer", "ML Engineer"],
  ECE: ["Embedded Systems Engineer", "VLSI Engineer", "IoT Engineer", "Network Engineer", "Signal Processing Engineer"],
  Electrical: ["Power Systems Engineer", "Electrical Design Engineer", "Renewable Energy Engineer", "Control Systems Engineer"],
  Mechanical: ["Mechanical Design Engineer", "CAD Engineer", "Automotive Engineer", "Manufacturing Engineer", "Thermal Engineer"],
  Civil: ["Structural Engineer", "Construction Manager", "Urban Planner", "Geotechnical Engineer", "Transportation Engineer"],
  Others: ["Product Manager", "UI/UX Designer", "Business Analyst", "Full Stack Developer", "Data Scientist"],
};

const SKILL_SUGGESTIONS: Record<EngineeringBranch, string[]> = {
  CSE: ["Python", "Java", "C++", "JavaScript", "React", "Node.js", "SQL", "DSA", "DBMS", "OS", "Networking"],
  AIML: ["Python", "Machine Learning", "Deep Learning", "PyTorch", "TensorFlow", "NumPy", "Pandas", "Scikit-learn", "NLP", "Computer Vision"],
  "Data Science": ["Python", "SQL", "R", "Statistics", "Pandas", "NumPy", "Power BI", "Tableau", "Excel", "Machine Learning"],
  ECE: ["C", "Embedded C", "Verilog", "VHDL", "Arduino", "MATLAB", "IoT", "PCB Design", "Signal Processing", "Microcontrollers"],
  Electrical: ["MATLAB", "Power Systems", "Circuit Design", "AutoCAD Electrical", "PLC", "SCADA", "Renewable Energy", "Control Systems"],
  Mechanical: ["AutoCAD", "SolidWorks", "CATIA", "ANSYS", "Creo", "Manufacturing", "Thermodynamics", "Fluid Mechanics", "GD&T", "FEA"],
  Civil: ["AutoCAD", "Revit", "STAAD.Pro", "Surveying", "Structural Analysis", "Concrete Design", "Estimation", "BIM", "GIS"],
  Others: ["Python", "JavaScript", "React", "Public Speaking", "Leadership", "Marketing", "Figma", "SQL", "Communication", "Project Management"],
};

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState<EngineeringBranch>("CSE");
  const [currentYear, setCurrentYear] = useState(1);
  const [totalSemesters, setTotalSemesters] = useState(8);
  const [cgpaEntries, setCgpaEntries] = useState<CgpaEntry[]>([
    { id: crypto.randomUUID(), label: "Semester 1", cgpa: "" },
  ]);
  const [cgpaMode, setCgpaMode] = useState<"actual" | "target">("actual");
  const [targetCgpa, setTargetCgpa] = useState("");
  const [boardPercentage, setBoardPercentage] = useState("");
  const [entranceExamRank, setEntranceExamRank] = useState("");
  const [skills, setSkills] = useState<SkillTag[]>([]);
  const [careerGoal, setCareerGoal] = useState("");

  const steps = [
    { title: "Personal Details", icon: User, desc: "Tell us about yourself" },
    { title: "Academic Record", icon: GraduationCap, desc: "Your CGPA journey" },
    { title: "Skills & Interests", icon: Sparkles, desc: "What you bring to the table" },
  ];

  const isFresher = currentYear === 1 && cgpaEntries.every((e) => e.cgpa === "");

  const canProceed = () => {
    if (step === 0) return name.trim() !== "" && degree.trim() !== "";
    if (step === 1) {
      if (cgpaMode === "target") {
        const t = parseFloat(targetCgpa);
        return targetCgpa !== "" && !isNaN(t) && t >= 0 && t <= 10;
      }
      return cgpaEntries.every((e) => e.cgpa === "" || (parseFloat(e.cgpa) >= 0 && parseFloat(e.cgpa) <= 10));
    }
    if (step === 2) return skills.length > 0 && careerGoal.trim() !== "";
    return false;
  };

  const handleSubmit = () => {
    onComplete({
      name: name.trim(),
      degree: degree.trim(),
      branch,
      currentYear,
      cgpaEntries: cgpaMode === "target" ? [] : cgpaEntries.filter((e) => e.cgpa !== ""),
      targetCgpa: cgpaMode === "target" ? targetCgpa : null,
      boardPercentage: boardPercentage.trim() || null,
      entranceExamRank: entranceExamRank.trim() || null,
      skills,
      careerGoal: careerGoal.trim(),
    });
  };

  const generateCgpaEntries = (count: number) => {
    const existing = [...cgpaEntries];
    if (count > existing.length) {
      for (let i = existing.length; i < count; i++) {
        existing.push({ id: crypto.randomUUID(), label: `Semester ${i + 1}`, cgpa: "" });
      }
    } else {
      existing.length = count;
    }
    setCgpaEntries(existing);
  };

  const updateCgpa = (id: string, value: string) => {
    setCgpaEntries((prev) => prev.map((e) => (e.id === id ? { ...e, cgpa: value } : e)));
  };

  const updateLabel = (id: string, value: string) => {
    setCgpaEntries((prev) => prev.map((e) => (e.id === id ? { ...e, label: value } : e)));
  };

  const addCgpaEntry = () => {
    setCgpaEntries([...cgpaEntries, { id: crypto.randomUUID(), label: `Semester ${cgpaEntries.length + 1}`, cgpa: "" }]);
  };

  const removeCgpaEntry = (id: string) => {
    if (cgpaEntries.length > 1) {
      setCgpaEntries(cgpaEntries.filter((e) => e.id !== id));
    }
  };

  const careerSuggestions = CAREER_SUGGESTIONS[branch] ?? CAREER_SUGGESTIONS.Others;
  const skillSuggestions = SKILL_SUGGESTIONS[branch] ?? SKILL_SUGGESTIONS.Others;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-8 animate-fade-in-down">
        <Logo size="lg" />
      </div>

      <div className="w-full max-w-2xl">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/30 scale-110"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/5 text-gray-500 border border-white/10"
                    }`}
                  >
                    {isDone ? <Check size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-white" : isDone ? "text-emerald-400" : "text-gray-500"}`}>
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 rounded-full bg-white/10 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform duration-500 origin-left ${
                        isDone ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form card */}
        <div key={step} className="glass-strong rounded-2xl p-6 sm:p-8 animate-fade-in-up shadow-2xl shadow-black/40">
          {/* Step 0: Personal Details */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Let's get to know you</h2>
                <p className="text-gray-400 text-sm">We'll personalize your career roadmap based on this.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="glass-input"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Course / Degree</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. B.Tech in Computer Science"
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <GitBranch size={16} className="text-violet-400" />
                  Engineering Branch
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ENGINEERING_BRANCHES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBranch(b)}
                      className={`text-sm rounded-xl px-3 py-2.5 border transition-all font-medium ${
                        branch === b
                          ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-violet-500/30 hover:text-violet-300"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Semester / Year</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min={1}
                      max={8}
                      value={currentYear}
                      onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                      className="w-full accent-violet-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Sem 1</span>
                      <span>Sem 8</span>
                    </div>
                  </div>
                  <div className="glass rounded-xl px-4 py-2 min-w-[80px] text-center">
                    <span className="text-lg font-bold text-gradient">{currentYear}</span>
                    <span className="text-xs text-gray-400 block">Semester</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Academic Record */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Your academic journey</h2>
                <p className="text-gray-400 text-sm">
                  Add CGPA for completed semesters. Freshers can set a target instead.
                </p>
              </div>

              {/* Mode toggle for freshers */}
              {isFresher && (
                <div className="flex items-center gap-2 p-1 glass rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setCgpaMode("actual")}
                    className={`text-sm rounded-lg px-4 py-1.5 font-medium transition-all ${
                      cgpaMode === "actual" ? "bg-violet-500/20 text-violet-300" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Enter CGPA
                  </button>
                  <button
                    type="button"
                    onClick={() => setCgpaMode("target")}
                    className={`text-sm rounded-lg px-4 py-1.5 font-medium transition-all ${
                      cgpaMode === "target" ? "bg-violet-500/20 text-violet-300" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Set Target CGPA
                  </button>
                </div>
              )}

              {cgpaMode === "target" ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="glass rounded-xl p-5 border border-violet-500/20">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Target size={16} className="text-violet-400" />
                      Target CGPA for Semester 1
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          value={targetCgpa}
                          onChange={(e) => setTargetCgpa(e.target.value)}
                          placeholder="e.g. 8.5"
                          className="glass-input !py-3"
                          autoFocus
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">/ 10</span>
                      </div>
                      <div className="glass rounded-xl px-4 py-3 min-w-[70px] text-center">
                        <span className="text-lg font-bold text-gradient">
                          {targetCgpa && !isNaN(parseFloat(targetCgpa)) ? parseFloat(targetCgpa).toFixed(2) : "--"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      We'll show your target as a benchmark on your CGPA chart until you log real results.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">How many semesters to track?</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={1}
                        max={8}
                        value={totalSemesters}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setTotalSemesters(val);
                          generateCgpaEntries(val);
                        }}
                        className="flex-1 accent-violet-500"
                      />
                      <div className="glass rounded-xl px-4 py-2 min-w-[60px] text-center">
                        <span className="text-lg font-bold text-gradient">{totalSemesters}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {cgpaEntries.map((entry, i) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-3 animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        <div className="glass rounded-xl px-3 py-3 min-w-[120px]">
                          <input
                            type="text"
                            value={entry.label}
                            onChange={(e) => updateLabel(entry.id, e.target.value)}
                            className="bg-transparent outline-none text-sm text-gray-300 w-full"
                          />
                        </div>
                        <div className="flex-1 relative">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            value={entry.cgpa}
                            onChange={(e) => updateCgpa(entry.id, e.target.value)}
                            placeholder="0.00 (optional)"
                            className="glass-input !py-3"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">/ 10</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCgpaEntry(entry.id)}
                          disabled={cgpaEntries.length <= 1}
                          className="p-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addCgpaEntry}
                    disabled={cgpaEntries.length >= 8}
                    className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-30"
                  >
                    <Plus size={16} /> Add another semester
                  </button>

                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <SkipForward size={12} />
                    CGPA is optional for 1st-year freshers — leave fields blank if you don't have results yet.
                  </p>
                </>
              )}

              {/* Optional academic background — NOT mandatory */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                  <Award size={16} className="text-amber-400" />
                  Pre-College Background
                  <span className="text-xs text-gray-500 font-normal">(optional)</span>
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Add 12th Board percentage or an entrance exam rank if you'd like them on your profile.
                  Not required.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">12th Board Percentage</label>
                    <input
                      type="text"
                      value={boardPercentage}
                      onChange={(e) => setBoardPercentage(e.target.value)}
                      placeholder="e.g. 92.5% or Skip"
                      className="glass-input !py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Entrance Exam Rank (JEE / CET)</label>
                    <input
                      type="text"
                      value={entranceExamRank}
                      onChange={(e) => setEntranceExamRank(e.target.value)}
                      placeholder="e.g. JEE Rank 12000 or N/A"
                      className="glass-input !py-2.5 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBoardPercentage("");
                    setEntranceExamRank("");
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <SkipForward size={12} /> Skip / Not Applicable
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Skills & Interests */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Skills & career goals</h2>
                <p className="text-gray-400 text-sm">Add your skills and tell us where you want to go.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Skills <span className="text-xs text-gray-500">· suggested for {branch}</span>
                </label>
                <TagInput
                  tags={skills}
                  onChange={setSkills}
                  placeholder="Type a skill and press Enter..."
                  suggestions={skillSuggestions}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Target size={16} className="text-violet-400" />
                  Your Ultimate Career Goal
                </label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g. Data Scientist"
                  className="glass-input"
                  list="career-suggestions"
                />
                <datalist id="career-suggestions">
                  {careerSuggestions.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
                <div className="mt-3 flex flex-wrap gap-2">
                  {careerSuggestions.slice(0, 5).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setCareerGoal(s)}
                      className={`text-xs rounded-lg px-3 py-1.5 border transition-all ${
                        careerGoal === s
                          ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-violet-500/30 hover:text-violet-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCareerGoal("Exploring / Undecided")}
                    className={`text-xs rounded-lg px-3 py-1.5 border transition-all ${
                      careerGoal === "Exploring / Undecided"
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-amber-500/30 hover:text-amber-300"
                    }`}
                  >
                    Exploring / Undecided
                  </button>
                </div>
                {careerGoal === "Exploring / Undecided" && (
                  <p className="text-xs text-amber-300/80 mt-2 flex items-center gap-1.5">
                    <Sparkles size={12} />
                    Perfect for 1st-year students — we'll give you an exploration roadmap to try different domains before you commit.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="btn-ghost inline-flex items-center gap-1.5 disabled:opacity-0"
            >
              <ChevronLeft size={18} /> Back
            </button>
            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="btn-primary inline-flex items-center gap-1.5"
              >
                Continue <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="btn-primary inline-flex items-center gap-2"
              >
                Generate My Dashboard <Sparkles size={18} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          Step {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
