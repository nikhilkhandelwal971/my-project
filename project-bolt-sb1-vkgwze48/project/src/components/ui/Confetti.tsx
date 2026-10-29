import { useEffect, useRef, useState } from "react";

interface ConfettiBurstProps {
  trigger: number; // increment to fire
  origin?: "top-right" | "center" | "bottom";
}

interface Particle {
  id: number;
  tx: number;
  ty: number;
  color: string;
  delay: number;
  size: number;
}

const COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#6366f1"];

export function ConfettiBurst({ trigger, origin = "top-right" }: ConfettiBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (trigger === 0) return;
    const newParticles: Particle[] = Array.from({ length: 24 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.3;
      const distance = 60 + Math.random() * 80;
      return {
        id: idRef.current++,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.1,
        size: 4 + Math.random() * 6,
      };
    });
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 1000);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (particles.length === 0) return null;

  const originClass =
    origin === "center" ? "left-1/2 top-1/2" : origin === "bottom" ? "left-1/2 bottom-0" : "right-0 top-0";

  return (
    <div className={`absolute ${originClass} pointer-events-none z-50`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-confetti"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            ["--tx" as string]: `${p.tx}px`,
            ["--ty" as string]: `${p.ty}px`,
          }}
        />
      ))}
    </div>
  );
}
