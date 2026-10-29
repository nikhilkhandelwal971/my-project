import { Compass } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = {
    sm: { box: "h-8 w-8", icon: 18, text: "text-lg" },
    md: { box: "h-10 w-10", icon: 22, text: "text-xl" },
    lg: { box: "h-12 w-12", icon: 26, text: "text-2xl" },
  };
  const d = dims[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${d.box} rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20`}>
        <Compass size={d.icon} className="text-white" />
      </div>
      <span className={`${d.text} font-bold tracking-tight text-white`}>
        CareerPath<span className="text-gradient"> AI</span>
      </span>
    </div>
  );
}
