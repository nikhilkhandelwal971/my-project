import { useState, useCallback, useEffect, useRef } from "react";
import type { Session } from "@supabase/supabase-js";
import { Background } from "@/components/ui/Background";
import { AuthScreen } from "@/components/AuthScreen";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Dashboard } from "@/components/Dashboard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { supabase } from "@/lib/supabase";
import { OnboardingData, JourneyState } from "@/types";

type AppState = "auth" | "checking" | "form" | "loading" | "dashboard";

function createEmptyJourney(): JourneyState {
  return {
    journeyId: null,
    completedSteps: [],
    appliedJobs: [],
    savedCourses: [],
  };
}

export default function App() {
  const [state, setState] = useState<AppState>("checking");
  const [data, setData] = useState<OnboardingData | null>(null);
  const [journey, setJourney] = useState<JourneyState>(createEmptyJourney());
  const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString());
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Track the current user ID so we only reload journey data when the
  // actual signed-in user changes — not on every token refresh.
  const currentUserIdRef = useRef<string | null>(null);

  // Check for existing session on mount and subscribe to auth changes
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session) {
        currentUserIdRef.current = session.user.id;
        setUserEmail(session.user.email ?? null);
        loadJourney(session);
      } else {
        currentUserIdRef.current = null;
        setState("auth");
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (!mounted) return;

        const userId = session?.user.id ?? null;

        // Skip TOKEN_REFRESHED — the user hasn't changed, session is already
        // persisted, and re-running loadJourney would race with the initial
        // getSession call and cause unnecessary DB queries.
        if (event === "TOKEN_REFRESHED") {
          if (session && userId !== currentUserIdRef.current) {
            currentUserIdRef.current = userId;
            setUserEmail(session.user.email ?? null);
            await loadJourney(session);
          }
          return;
        }

        if (session) {
          if (userId === currentUserIdRef.current && event !== "SIGNED_IN") return;
          currentUserIdRef.current = userId;
          setUserEmail(session.user.email ?? null);
          await loadJourney(session);
        } else {
          currentUserIdRef.current = null;
          setUserEmail(null);
          setData(null);
          setJourney(createEmptyJourney());
          setState("auth");
        }
      })();
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadJourney = async (session: Session) => {
    const { data: row, error } = await supabase
      .from("student_journeys")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error || !row) {
      setData(null);
      setJourney(createEmptyJourney());
      setState("form");
      return;
    }

    const loadedData: OnboardingData = {
      name: row.name,
      degree: row.degree,
      branch: row.branch ?? "Others",
      currentYear: row.current_year,
      careerGoal: row.career_goal,
      skills: row.skills ?? [],
      cgpaEntries: row.cgpa_entries ?? [],
      targetCgpa: row.target_cgpa != null ? String(row.target_cgpa) : null,
      boardPercentage: row.board_percentage ?? null,
      entranceExamRank: row.entrance_exam_rank ?? null,
    };

    setData(loadedData);
    setCreatedAt(row.created_at ?? new Date().toISOString());
    setJourney({
      journeyId: row.id,
      completedSteps: row.completed_steps ?? [],
      appliedJobs: row.applied_jobs ?? [],
      savedCourses: row.saved_courses ?? [],
    });
    setState("dashboard");
  };

  const persistJourney = useCallback(
    async (
      journeyId: string | null,
      updates: {
        completedSteps: string[];
        appliedJobs: string[];
        savedCourses: string[];
      }
    ) => {
      if (!journeyId) return;
      await supabase
        .from("student_journeys")
        .update({
          completed_steps: updates.completedSteps,
          applied_jobs: updates.appliedJobs,
          saved_courses: updates.savedCourses,
          updated_at: new Date().toISOString(),
        })
        .eq("id", journeyId);
    },
    []
  );

  const handleAuthSuccess = () => {
    // onAuthStateChange will handle the state transition
  };

  const handleFormComplete = async (formData: OnboardingData) => {
    setData(formData);

    const { data: row, error } = await supabase
      .from("student_journeys")
      .insert({
        name: formData.name,
        degree: formData.degree,
        branch: formData.branch,
        current_year: formData.currentYear,
        career_goal: formData.careerGoal,
        skills: formData.skills,
        cgpa_entries: formData.cgpaEntries,
        target_cgpa: formData.targetCgpa != null && formData.targetCgpa !== "" ? parseFloat(formData.targetCgpa) : null,
        board_percentage: formData.boardPercentage,
        entrance_exam_rank: formData.entranceExamRank,
        completed_steps: [],
        applied_jobs: [],
        saved_courses: [],
      })
      .select()
      .single();

    if (!error && row) {
      setJourney({
        journeyId: row.id,
        completedSteps: [],
        appliedJobs: [],
        savedCourses: [],
      });
      setCreatedAt(row.created_at);
    }

    setState("loading");
  };

  const handleLoadingComplete = () => {
    setState("dashboard");
  };

  const handleToggleStep = (stepId: string) => {
    setJourney((prev) => {
      const completedSteps = prev.completedSteps.includes(stepId)
        ? prev.completedSteps.filter((s) => s !== stepId)
        : [...prev.completedSteps, stepId];
      const next = { ...prev, completedSteps };
      persistJourney(next.journeyId, next);
      return next;
    });
  };

  const handleToggleApply = (jobId: string) => {
    setJourney((prev) => {
      const appliedJobs = prev.appliedJobs.includes(jobId)
        ? prev.appliedJobs.filter((j) => j !== jobId)
        : [...prev.appliedJobs, jobId];
      const next = { ...prev, appliedJobs };
      persistJourney(next.journeyId, next);
      return next;
    });
  };

  const handleToggleSaveCourse = (courseId: string) => {
    setJourney((prev) => {
      const savedCourses = prev.savedCourses.includes(courseId)
        ? prev.savedCourses.filter((c) => c !== courseId)
        : [...prev.savedCourses, courseId];
      const next = { ...prev, savedCourses };
      persistJourney(next.journeyId, next);
      return next;
    });
  };

  const handleReset = async () => {
    if (journey.journeyId) {
      await supabase.from("student_journeys").delete().eq("id", journey.journeyId);
    }
    setData(null);
    setJourney(createEmptyJourney());
    setState("form");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // onAuthStateChange will reset state to "auth"
  };

  if (state === "checking") {
    return (
      <>
        <Background />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-fade-in text-gray-400 flex items-center gap-3">
            <div className="h-5 w-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Background />

      {state === "auth" && <AuthScreen onAuthSuccess={handleAuthSuccess} />}

      {state === "form" && <OnboardingForm onComplete={handleFormComplete} />}

      {state === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}

      {state === "dashboard" && data && (
        <div className="animate-fade-in">
          <Dashboard
            data={data}
            journey={journey}
            createdAt={createdAt}
            userEmail={userEmail}
            onToggleStep={handleToggleStep}
            onToggleApply={handleToggleApply}
            onToggleSaveCourse={handleToggleSaveCourse}
            onReset={handleReset}
            onSignOut={handleSignOut}
          />
        </div>
      )}
    </>
  );
}
