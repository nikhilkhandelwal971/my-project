import { useState, useMemo } from "react";
import { Bookmark, BookmarkCheck, Play, Clock, BarChart, Youtube, BookOpen, Search } from "lucide-react";
import { Course } from "@/types";
import { ConfettiBurst } from "@/components/ui/Confetti";
import { EmptyState } from "@/components/ui/EmptyState";

type CourseFilter = "all" | "nptel" | "youtube" | "beginner" | "intermediate" | "advanced";

const FILTERS: { key: CourseFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "nptel", label: "NPTEL" },
  { key: "youtube", label: "YouTube" },
  { key: "beginner", label: "Beginner" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
];

interface CourseRecommendationsProps {
  courses: Course[];
  savedCourses: string[];
  onToggleSave: (courseId: string) => void;
}

export function CourseRecommendations({
  courses,
  savedCourses,
  onToggleSave,
}: CourseRecommendationsProps) {
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [confettiCourse, setConfettiCourse] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CourseFilter>("all");

  const levelColors: Record<Course["level"], string> = {
    Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Advanced: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  const handleSave = (courseId: string) => {
    const wasAlreadySaved = savedCourses.includes(courseId);
    onToggleSave(courseId);
    if (!wasAlreadySaved) {
      setConfettiCourse(courseId);
      setConfettiTrigger((t) => t + 1);
      setTimeout(() => setConfettiCourse(null), 1000);
    }
  };

  const availableFilters = useMemo(() => {
    const has = new Set<string>();
    courses.forEach((c) => {
      if (c.isNptel) has.add("nptel");
      else has.add("youtube");
      has.add(c.level.toLowerCase());
    });
    return FILTERS.filter((f) => f.key === "all" || has.has(f.key));
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        search.trim() === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.channel.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "nptel" && c.isNptel) ||
        (filter === "youtube" && !c.isNptel) ||
        (filter === "beginner" && c.level === "Beginner") ||
        (filter === "intermediate" && c.level === "Intermediate") ||
        (filter === "advanced" && c.level === "Advanced");
      return matchesSearch && matchesFilter;
    });
  }, [courses, search, filter]);

  return (
    <div className="glass-strong rounded-2xl p-6 animate-fade-in-up stagger-3">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Youtube size={20} className="text-red-500" />
          Recommended Courses
        </h3>
        <p className="text-sm text-gray-400">YouTube & NPTEL courses matched to your goal and skills</p>
      </div>

      {/* Search + pill filters */}
      {courses.length > 0 && (
        <div className="mb-5 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, channels, or categories..."
              className="glass-input !pl-11 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {availableFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`pill-filter ${filter === f.key ? "pill-filter-active" : "pill-filter-inactive"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No course recommendations yet"
          description="Add more skills or a career goal to get personalized course suggestions."
        />
      ) : filtered.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-sm text-gray-400">No courses match your search.</p>
          <button
            onClick={() => { setSearch(""); setFilter("all"); }}
            className="mt-3 text-sm text-violet-400 hover:text-violet-300 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course, i) => {
            const isSaved = savedCourses.includes(course.id);
            return (
              <div
                key={course.id}
                className="glass rounded-xl overflow-hidden glass-hover transition-all duration-300 group animate-fade-in-up relative"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                {/* Thumbnail */}
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-video overflow-hidden bg-black/40"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-12 w-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg neon-glow-violet">
                      <Play size={20} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <span className={`absolute top-2 right-2 text-[10px] font-semibold rounded-md px-2 py-1 border ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                  {course.isNptel && (
                    <span className="absolute top-2 left-2 text-[10px] font-semibold rounded-md px-2 py-1 border bg-indigo-500/80 text-white border-indigo-400/50">
                      NPTEL
                    </span>
                  )}
                </a>

                {/* Content */}
                <div className="p-4">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-violet-300 transition-colors line-clamp-2 leading-snug"
                  >
                    {course.title}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">{course.channel}</p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart size={12} /> {course.category}
                    </span>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleSave(course.id)}
                      className={`w-full mt-3 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all duration-300 ${
                        isSaved
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-gray-300 border border-white/[0.08] hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-500/30"
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck size={14} className="animate-checkmark" /> Saved
                        </>
                      ) : (
                        <>
                          <Bookmark size={14} /> Save Course
                        </>
                      )}
                    </button>
                    {confettiCourse === course.id && (
                      <ConfettiBurst trigger={confettiTrigger} origin="bottom" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
