interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="space-y-4">
        <div className="h-5 w-1/3 bg-white/[0.06] rounded-lg animate-shimmer" />
        <div className="h-4 w-2/3 bg-white/[0.04] rounded-lg animate-shimmer" />
        <div className="space-y-2.5 mt-4">
          <div className="h-3 w-full bg-white/[0.04] rounded-lg animate-shimmer" />
          <div className="h-3 w-5/6 bg-white/[0.04] rounded-lg animate-shimmer" />
          <div className="h-3 w-4/6 bg-white/[0.04] rounded-lg animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-xl overflow-hidden">
          <div className="aspect-video bg-white/[0.04] animate-shimmer" />
          <div className="p-4 space-y-2.5">
            <div className="h-4 w-3/4 bg-white/[0.06] rounded-lg animate-shimmer" />
            <div className="h-3 w-1/2 bg-white/[0.04] rounded-lg animate-shimmer" />
            <div className="h-8 w-full bg-white/[0.04] rounded-lg animate-shimmer mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
