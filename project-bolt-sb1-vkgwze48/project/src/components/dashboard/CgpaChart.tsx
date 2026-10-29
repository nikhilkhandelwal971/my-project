import { TrendingUp, TrendingDown, Award, Target } from "lucide-react";
import { CgpaEntry } from "@/types";

interface CgpaChartProps {
  entries: CgpaEntry[];
  targetCgpa: string | null;
}

export function CgpaChart({ entries, targetCgpa }: CgpaChartProps) {
  const values = entries
    .filter((e) => e.cgpa !== "")
    .map((e) => parseFloat(e.cgpa));

  const targetNum = targetCgpa != null && targetCgpa !== "" ? parseFloat(targetCgpa) : null;

  if (values.length === 0 && targetNum == null) return null;

  const maxVal = 10;
  const minVal = 0;
  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = values.map((v, i) => {
    const x = padding.left + (values.length === 1 ? chartW / 2 : (i / (values.length - 1)) * chartW);
    const y = padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
    return { x, y, value: v, label: entries[i]?.label || `Sem ${i + 1}` };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath =
    points.length > 0
      ? `M ${points[0].x} ${padding.top + chartH} ${points.map((p) => `L ${p.x} ${p.y}`).join(" ")} L ${points[points.length - 1].x} ${padding.top + chartH} Z`
      : "";

  const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : targetNum ?? 0;
  const trend = values.length > 1 ? values[values.length - 1] - values[0] : 0;
  const isUp = trend >= 0;

  const isTargetOnly = values.length === 0 && targetNum != null;

  const yFor = (v: number) => padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  return (
    <div className="glass-strong rounded-2xl p-6 animate-fade-in-up stagger-1">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            {isTargetOnly ? "Target CGPA Benchmark" : "CGPA Trend"}
          </h3>
          <p className="text-sm text-gray-400">
            {isTargetOnly
              ? "Set a goal for your first semester — log real results to see progress."
              : "Your academic progress over time"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            <div>
              <div className="text-xs text-gray-400">{isTargetOnly ? "Target" : "Average"}</div>
              <div className="text-sm font-bold text-white">{avg.toFixed(2)}</div>
            </div>
          </div>
          {!isTargetOnly && values.length > 1 && (
            <div className={`glass rounded-xl px-4 py-2 flex items-center gap-2 ${isUp ? "text-emerald-400" : "text-red-400"}`}>
              {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <div>
                <div className="text-xs text-gray-400">Trend</div>
                <div className="text-sm font-bold">{isUp ? "+" : ""}{trend.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[400px]" style={{ height: "auto" }}>
          <defs>
            <linearGradient id="cgpaArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cgpaLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 2.5, 5, 7.5, 10].map((v) => {
            const y = yFor(v);
            return (
              <g key={v}>
                <line x1={padding.left} y1={y} x2={padding.left + chartW} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.3)">
                  {v}
                </text>
              </g>
            );
          })}

          {/* Target CGPA dashed line */}
          {targetNum != null && (
            <g>
              <line
                x1={padding.left}
                y1={yFor(targetNum)}
                x2={padding.left + chartW}
                y2={yFor(targetNum)}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.8"
              />
              <text
                x={padding.left + chartW}
                y={yFor(targetNum) - 6}
                textAnchor="end"
                fontSize="10"
                fill="#f59e0b"
                fontWeight="600"
              >
                Target {targetNum.toFixed(2)}
              </text>
            </g>
          )}

          {/* Area + line only if we have actual values */}
          {points.length > 0 && (
            <>
              <path d={areaPath} fill="url(#cgpaArea)" />
              <path d={linePath} fill="none" stroke="url(#cgpaLine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}

          {/* Target-only placeholder point */}
          {isTargetOnly && targetNum != null && (
            <g>
              <circle cx={padding.left + chartW / 2} cy={yFor(targetNum)} r="6" fill="#0a0a0f" stroke="#f59e0b" strokeWidth="2.5" />
              <text x={padding.left + chartW / 2} y={yFor(targetNum) - 14} textAnchor="middle" fontSize="11" fontWeight="600" fill="#f59e0b">
                Target {targetNum.toFixed(2)}
              </text>
              <text x={padding.left + chartW / 2} y={height - 12} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">
                Sem 1
              </text>
            </g>
          )}

          {/* Actual points */}
          {points.map((p, i) => (
            <g key={i} className="animate-scale-in" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <circle cx={p.x} cy={p.y} r="5" fill="#0a0a0f" stroke="url(#cgpaLine)" strokeWidth="2.5" />
              <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="11" fontWeight="600" fill="#e5e7eb">
                {p.value.toFixed(2)}
              </text>
              <text x={p.x} y={height - 12} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">
                {p.label.replace("Semester ", "S")}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {isTargetOnly && (
        <div className="mt-4 flex items-center gap-2 text-xs text-amber-400/80">
          <Target size={14} />
          You're a fresher with no results yet — this benchmark will move to your trend line once you log Semester 1.
        </div>
      )}
    </div>
  );
}
