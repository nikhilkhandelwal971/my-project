import { useState, FormEvent } from "react";
import { Mail, Lock, User, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { supabase } from "@/lib/supabase";

type AuthMode = "signin" | "signup";

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (signUpError) {
          if (signUpError.message.toLowerCase().includes("already")) {
            setError("An account with this email already exists. Try signing in instead.");
            setMode("signin");
          } else {
            setError(signUpError.message);
          }
          setLoading(false);
          return;
        }
        onAuthSuccess();
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setError("Incorrect email or password. Please try again.");
          setLoading(false);
          return;
        }
        onAuthSuccess();
      }
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-8 animate-fade-in">
        <Logo size="lg" />
      </div>

      <div className="w-full max-w-md">
        <div key={mode} className="glass-strong rounded-2xl p-6 sm:p-8 animate-fade-in-up shadow-2xl shadow-black/40">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-sm text-gray-400">
              {mode === "signup"
                ? "Join CareerPath AI and build your personalized career plan."
                : "Sign in to continue your career journey."}
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 animate-fade-in">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="glass-input !pl-11"
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="glass-input !pl-11"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {mode === "signup" ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                <>{mode === "signup" ? "Create Account" : "Sign In"}</>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              {mode === "signup" ? "Already have an account?" : "New to CareerPath AI?"}{" "}
              <button
                onClick={() => {
                  setMode(mode === "signup" ? "signin" : "signup");
                  setError(null);
                }}
                className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
              >
                {mode === "signup" ? "Sign in" : "Create one"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1.5">
          <User size={12} />
          Your data is private — only you can see your journey.
        </p>
      </div>
    </div>
  );
}
