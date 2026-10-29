import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ProgressRing } from "./ProgressRing";

const messages = [
  "Analyzing your academic profile...",
  "Mapping skills to career pathways...",
  "Generating your personalized roadmap...",
  "Curating matched opportunities...",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        setMsgIndex(Math.min(Math.floor(next / 25), messages.length - 1));
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080c] animate-fade-in">
      <div className="animate-float mb-10">
        <Logo size="lg" />
      </div>

      <div className="flex flex-col items-center gap-6">
        <ProgressRing percentage={progress} size={110} strokeWidth={7} label="Loading" />

        <div className="w-64 max-w-[80vw] text-center">
          <span className="text-sm text-gray-400 animate-fade-in block" key={msgIndex}>
            {messages[msgIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
